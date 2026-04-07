import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('dadup_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Non connecté.' }, { status: 401 });
    }

    const body = await req.json();
    const {
      prenom, email, dpa, dpa_originale,
      valise_checked, missions_checked,
      rdv_dates, next_rdv, achats_checked,
    } = body;

    const update: Record<string, any> = {};
    if (prenom           !== undefined) update.prenom           = prenom;
    if (email            !== undefined) update.email            = email.toLowerCase().trim();
    if (dpa              !== undefined) update.dpa              = dpa || null;
    if (dpa_originale    !== undefined) update.dpa_originale    = dpa_originale || null;
    if (achats_checked   !== undefined) update.achats_checked   = achats_checked;
    if (valise_checked   !== undefined) update.valise_checked   = valise_checked;
    if (missions_checked !== undefined) update.missions_checked = missions_checked;
    if (rdv_dates        !== undefined) update.rdv_dates        = rdv_dates;
    if (next_rdv         !== undefined) update.next_rdv         = next_rdv;

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ ok: true }); // rien à mettre à jour
    }

    const { error } = await supabase
      .from('users')
      .update(update)
      .eq('id', sessionId);

    if (error) {
      console.error('Save error:', JSON.stringify(error));
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Save error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
