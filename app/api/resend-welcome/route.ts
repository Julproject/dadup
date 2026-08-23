import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const EMAIL_HTML = (createPasswordUrl: string, email: string) => `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f0ede8;font-family:-apple-system,sans-serif;"><div style="max-width:560px;margin:40px auto;padding:0 16px 40px;"><div style="text-align:center;padding:32px 0 24px;"><div style="display:inline-block;background:#1e2535;border-radius:16px;padding:12px 24px;"><span style="color:#c8a060;font-size:22px;font-weight:800;">DadUp</span></div></div><div style="background:#ffffff;border-radius:24px;padding:40px 36px;border:1px solid #e8e0d0;"><h1 style="color:#1e2535;font-size:24px;font-weight:800;margin:0 0 8px;">Bienvenue sur DadUp.</h1><p style="color:#9aa0a8;font-size:14px;margin:0 0 28px;">Ton paiement a bien ete recu. Ton espace est pret.</p><p style="color:#4a5568;font-size:15px;line-height:1.75;margin:0 0 28px;">Pour acceder a ton espace, il te reste une etape : creer ton mot de passe. Clique sur le bouton ci-dessous.</p><div style="text-align:center;margin-bottom:32px;"><a href="${createPasswordUrl}" style="display:inline-block;background:#1e2535;color:#ffffff;padding:16px 40px;border-radius:32px;font-size:16px;font-weight:700;text-decoration:none;">Creer mon mot de passe</a></div><div style="background:#faf6f0;border-radius:16px;padding:24px;margin-bottom:28px;"><p style="color:#1e2535;font-size:13px;font-weight:700;margin:0 0 14px;text-transform:uppercase;letter-spacing:1.5px;">Ce qui vous attend</p><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:6px 0;color:#4a5568;font-size:14px;">Suivi bebe semaine par semaine</td><td style="padding:6px 0;color:#2E5F8A;font-size:13px;font-weight:600;text-align:right;">SA 3 a SA 41</td></tr><tr><td style="padding:6px 0;color:#4a5568;font-size:14px;border-top:1px solid #e8e0d0;">Calendrier des rendez-vous</td><td style="padding:6px 0;color:#2E5F8A;font-size:13px;font-weight:600;text-align:right;border-top:1px solid #e8e0d0;">8 RDV</td></tr><tr><td style="padding:6px 0;color:#4a5568;font-size:14px;border-top:1px solid #e8e0d0;">Guide accouchement, valise, post-partum</td><td style="padding:6px 0;color:#2E5F8A;font-size:13px;font-weight:600;text-align:right;border-top:1px solid #e8e0d0;">Inclus</td></tr><tr><td style="padding:6px 0;color:#4a5568;font-size:14px;border-top:1px solid #e8e0d0;">Premiere annee de bebe</td><td style="padding:6px 0;color:#2E5F8A;font-size:13px;font-weight:600;text-align:right;border-top:1px solid #e8e0d0;">Jusqu'au 1er anniversaire de bébé</td></tr></table></div><div style="border-top:1px solid #e8e0d0;padding-top:20px;"><p style="color:#9aa0a8;font-size:13px;margin:0 0 6px;">Ton email de connexion :</p><p style="color:#1e2535;font-size:14px;font-weight:700;margin:0 0 16px;">${email}</p><p style="color:#9aa0a8;font-size:12px;margin:0;line-height:1.6;">Ce lien est valable 7 jours.</p></div></div><div style="text-align:center;padding:24px 0 0;"><p style="color:#c8c0b8;font-size:11px;margin:0;">DadUp - hello@dadup.fr - Il ne remplace pas un medecin.</p></div></div></body></html>`;

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id) return NextResponse.json({ error: 'session_id requis' }, { status: 400 });

    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session_id}`,
      { headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } }
    );

    if (!stripeRes.ok) {
      return NextResponse.json({ error: 'Session Stripe introuvable' }, { status: 404 });
    }

    const session = await stripeRes.json();
    const email = session.customer_email || session.customer_details?.email;
    if (!email) return NextResponse.json({ error: 'Email introuvable' }, { status: 400 });

    console.log('Resend welcome check for:', email);

    const { data: user } = await supabase
      .from('users')
      .select('id, actif, reset_token, reset_token_expires')
      .eq('email', email.toLowerCase())
      .single();

    if (!user) {
      return NextResponse.json({ status: 'pending' });
    }

    if (!user.actif) {
      await supabase.from('users').update({ actif: true }).eq('id', user.id);
    }

    const tokenValide = user.reset_token && user.reset_token_expires
      && new Date(user.reset_token_expires) > new Date();

    let resetToken = user.reset_token;

    if (!tokenValide) {
      resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      await supabase.from('users').update({
        reset_token: resetToken,
        reset_token_expires: resetExpires,
      }).eq('id', user.id);
    }

    const createPasswordUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`;

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY! },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email }],
        subject: 'Bienvenue sur DadUp : Cree ton mot de passe',
        htmlContent: EMAIL_HTML(createPasswordUrl, email),
      }),
    });

    const brevoText = await brevoRes.text();
    console.log('Brevo resend:', brevoRes.status, brevoText);

    return NextResponse.json({ status: 'sent', email });

  } catch (err) {
    console.error('Resend welcome error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
