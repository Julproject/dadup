import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { utilisateurDeSession, effacerSession } from '../../../../lib/session';
import { accesTermine } from '../../../../lib/acces';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function noUser(status: number, extra: Record<string, unknown> = {}) {
  // On efface le cookie : sinon /dashboard renvoie vers /login,
  // et proxy.ts renvoie /login vers /dashboard (cookie présent) : boucle infinie
  const res = NextResponse.json({ user: null, ...extra }, { status });
  effacerSession(res);
  return res;
}

type Utilisateur = { actif?: boolean; access_until?: string | null };

export async function GET(req: NextRequest) {
  try {
    const { user, erreurBase, renouveler } = await utilisateurDeSession<Utilisateur>(
      req,
      supabase,
      'id, email, prenom, dpa, dpa_originale, actif, access_until, valise_checked, missions_checked, achats_checked, rdv_dates, next_rdv',
    );

    // Base injoignable : on garde la session (l'app affiche ses données locales et réessaie)
    if (erreurBase) {
      console.error('Supabase me error');
      return NextResponse.json({ user: null, indisponible: true }, { status: 503 });
    }
    if (!user || !user.actif) return noUser(401);

    if (accesTermine(user as { access_until?: string | null; dpa?: string | null; dpa_originale?: string | null })) {
      return noUser(403, { expired: true });
    }

    const res = NextResponse.json({ user });
    renouveler(res);
    return res;
  } catch (err) {
    console.error('Me error:', err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
