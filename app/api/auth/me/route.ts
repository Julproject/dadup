import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { utilisateurDeSession, effacerSession } from '../../../../lib/session';

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

    if (erreurBase) {
      // Comportement inchangé pour l'instant (évite une boucle /login ↔ /dashboard) ; à revoir au lot D
      console.error('Supabase me error');
      return noUser(401);
    }
    if (!user || !user.actif) return noUser(401);

    if (user.access_until && new Date() > new Date(user.access_until)) {
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
