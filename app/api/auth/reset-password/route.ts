import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token et mot de passe requis.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Le mot de passe doit faire au moins 8 caractères.' }, { status: 400 });
    }

    // Vérifier le token
    const { data: user } = await supabase
      .from('users')
      .select('id, reset_token_expires')
      .eq('reset_token', token)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'Lien invalide ou déjà utilisé.' }, { status: 400 });
    }

    if (new Date(user.reset_token_expires) < new Date()) {
      return NextResponse.json({ error: 'Ce lien a expiré. Demande-en un nouveau.' }, { status: 400 });
    }

    // Hasher le nouveau mot de passe
    const password_hash = await bcrypt.hash(password, 12);

    // Mettre à jour et invalider le token
    await supabase.from('users').update({
      password_hash,
      reset_token: null,
      reset_token_expires: null,
    }).eq('id', user.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Reset password error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
