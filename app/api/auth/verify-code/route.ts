import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { email, code } = await req.json();
    if (!email || !code) return NextResponse.json({ error: 'Email et code requis' }, { status: 400 });

    const { data: authCode } = await supabase
      .from('auth_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (!authCode) return NextResponse.json({ error: 'Code invalide ou expire' }, { status: 401 });

    await supabase.from('auth_codes').delete().eq('email', email);

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!existingUser) {
      await supabase.from('users').insert({ email, actif: true });
    }

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    const token = Buffer.from(JSON.stringify({
      email,
      id: user.id,
      exp: Date.now() + 30 * 24 * 60 * 60 * 1000
    })).toString('base64');

    const response = NextResponse.json({ success: true, user });
    response.cookies.set('dadup_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
