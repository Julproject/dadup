// ── Contrôle de santé ──
// Appelé chaque jour par GitHub (.github/workflows/sante.yml) :
// - garde la base Supabase active (un projet gratuit sans activité est mis en pause au bout de 7 jours) ;
// - prévient par email (échec de la tâche GitHub) si le site ou la base ne répond plus.
// Ne renvoie aucune donnée.
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const entetes = { 'Cache-Control': 'no-store' };
  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    if (error) {
      console.error('Santé : base indisponible', error.message);
      return NextResponse.json({ ok: false }, { status: 503, headers: entetes });
    }
    return NextResponse.json({ ok: true }, { headers: entetes });
  } catch (e) {
    console.error('Santé :', e);
    return NextResponse.json({ ok: false }, { status: 503, headers: entetes });
  }
}
