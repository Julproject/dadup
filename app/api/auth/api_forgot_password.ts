import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email requis.' }, { status: 400 });

    const { data: user } = await supabase
      .from('users')
      .select('id, email, prenom')
      .eq('email', email.toLowerCase().trim())
      .single();

    // Toujours répondre OK pour ne pas révéler si l'email existe
    if (!user) return NextResponse.json({ ok: true });

    // Générer un token sécurisé valable 1h
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await supabase.from('users').update({
      reset_token: token,
      reset_token_expires: expires,
    }).eq('id', user.id);

    // Envoyer l'email via Brevo
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email: user.email, name: user.prenom || 'Papa' }],
        subject: 'Réinitialisation de ton mot de passe DadUp',
        htmlContent: `
          <div style="font-family:-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f7f5f0;border-radius:16px;">
            <h1 style="color:#1e2535;font-size:22px;margin:0 0 16px;">Réinitialiser ton mot de passe</h1>
            <p style="color:#4a5568;font-size:15px;line-height:1.6;margin:0 0 24px;">Bonjour ${user.prenom || 'Papa'},<br/>Tu as demandé à réinitialiser ton mot de passe DadUp. Ce lien est valable 1 heure.</p>
            <a href="${resetUrl}" style="display:inline-block;background:#1e2535;color:#fff;padding:14px 28px;border-radius:32px;font-size:15px;font-weight:700;text-decoration:none;">Réinitialiser mon mot de passe</a>
            <p style="color:#9aa0a8;font-size:12px;margin:24px 0 0;">Si tu n'es pas à l'origine de cette demande, ignore cet email. Ton mot de passe ne changera pas.</p>
          </div>
        `,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Reset error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
