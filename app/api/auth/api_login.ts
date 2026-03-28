import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
    }

    // Chercher l'utilisateur
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect.' }, { status: 401 });
    }

    // Vérifier le mot de passe
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect.' }, { status: 401 });
    }

    // Vérifier que le compte est actif (paiement validé)
    if (!user.actif) {
      return NextResponse.json({ error: 'Ton compte n\'est pas encore activé. Vérifie ton email ou contacte le support.' }, { status: 403 });
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

    // Cookie permanent (10 ans) — l'utilisateur reste connecté jusqu'à déconnexion manuelle
    res.cookies.set('dadup_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 ans
    });

    return res;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
