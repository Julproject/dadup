import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { poserSession } from '../../../../lib/session';
import { accesTermine, dateFinLisible } from '../../../../lib/acces';
import { limiteAtteinte, compter, effacer, ipDe } from '../../../../lib/limite';

// Après 5 échecs pour un même compte (ou 20 depuis une même adresse IP), pause de 15 minutes
const FENETRE = 15 * 60 * 1000;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
    }

    const cleCompte = 'login:' + email.toLowerCase().trim();
    const cleIp = 'login-ip:' + ipDe(req);
    if (limiteAtteinte(cleCompte, 5, FENETRE) || limiteAtteinte(cleIp, 20, FENETRE)) {
      return NextResponse.json({ error: 'Trop de tentatives. Réessaie dans 15 minutes, ou utilise « Mot de passe oublié ».' }, { status: 429 });
    }
    const echec = () => {
      compter(cleCompte, FENETRE);
      compter(cleIp, FENETRE);
      return NextResponse.json({ error: 'Email ou mot de passe incorrect.' }, { status: 401 });
    };

    // Chercher l'utilisateur
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();

    // Base injoignable : on le dit, plutôt que « mot de passe incorrect »
    if (error) {
      console.error('Login DB error:', JSON.stringify(error));
      return NextResponse.json({ error: 'DadUp est momentanément indisponible. Réessaie dans quelques minutes.' }, { status: 503 });
    }

    if (!user) return echec();

    // Vérifier le mot de passe
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return echec();
    effacer(cleCompte);

    // Vérifier que le compte est actif (paiement validé)
    if (!user.actif) {
      return NextResponse.json({ error: 'Ton compte n\'est pas encore activé. Vérifie ton email ou contacte le support.' }, { status: 403 });
    }

    // Accès terminé (CGV : jusqu'au premier anniversaire de bébé)
    if (accesTermine(user)) {
      return NextResponse.json({ error: `Ton accès DadUp est terminé depuis le ${dateFinLisible(user)}. Pour toute question, écris-nous à hello@dadup.fr.`, expired: true }, { status: 403 });
    }

    // Mettre à jour last_login
    await supabase.from('users').update({ last_login: new Date().toISOString() }).eq('id', user.id);

    // Créer la réponse avec cookie de session permanent
    const res = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        dpa: user.dpa,
        valise_checked: user.valise_checked,
        missions_checked: user.missions_checked,
        rdv_dates: user.rdv_dates,
        next_rdv: user.next_rdv,
      }
    });

    // Session signée (90 jours, renouvelée tant que l'utilisateur revient)
    poserSession(res, user);

    return res;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
