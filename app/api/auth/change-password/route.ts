import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('dadup_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 });

    const { oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword) return NextResponse.json({ error: 'Champs requis.' }, { status: 400 });
    if (newPassword.length < 8) return NextResponse.json({ error: 'Minimum 8 caractères.' }, { status: 400 });

    const { data: user } = await supabase
      .from('users')
      .select('id, password_hash')
      .eq('id', sessionId)
      .single();

    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });

    const valid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 });

    const newHash = await bcrypt.hash(newPassword, 12);
    await supabase.from('users').update({ password_hash: newHash }).eq('id', user.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Change password error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
