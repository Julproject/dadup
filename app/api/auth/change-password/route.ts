import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { utilisateurDeSession, poserSession } from '../../../../lib/session';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { user } = await utilisateurDeSession<{ password_hash: string }>(req, supabase, 'id, password_hash');
    if (!user) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 });

    const { oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword) return NextResponse.json({ error: 'Champs requis.' }, { status: 400 });
    if (newPassword.length < 8) return NextResponse.json({ error: 'Minimum 8 caractères.' }, { status: 400 });

    const valid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 });

    const newHash = await bcrypt.hash(newPassword, 12);
    await supabase.from('users').update({ password_hash: newHash }).eq('id', user.id);

    // Les autres appareils sont déconnectés ; celui-ci reçoit une nouvelle session
    const res = NextResponse.json({ ok: true });
    poserSession(res, { id: user.id, password_hash: newHash });
    return res;
  } catch (err) {
    console.error('Change password error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
