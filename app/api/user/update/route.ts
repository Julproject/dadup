import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { dpa, prenom } = await req.json();
    const token = req.cookies.get('dadup_token')?.value;
    if (!token) return NextResponse.json({ error: 'Non connecte' }, { status: 401 });

    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    const email = payload.email;

    await supabase.from('users').update({ dpa, prenom }).eq('email', email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
