import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('dadup_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, prenom, dpa, actif, valise_checked, missions_checked, rdv_dates, next_rdv')
      .eq('id', sessionId)
      .single();

    if (error || !user || !user.actif) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
