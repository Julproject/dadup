import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id) return NextResponse.json({ error: 'session_id requis' }, { status: 400 });

    // Récupérer la session Stripe pour avoir l'email
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session_id}`,
      { headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } }
    );

    if (!stripeRes.ok) {
      console.error('Stripe session fetch error:', stripeRes.status);
      return NextResponse.json({ error: 'Session Stripe introuvable' }, { status: 404 });
    }

    const session = await stripeRes.json();
    const email   = session.customer_email || session.customer_details?.email;

    if (!email) return NextResponse.json({ error: 'Email introuvable dans la session' }, { status: 400 });

    console.log('Resend welcome check for:', email);

    // Vérifier si le compte existe dans Supabase
    const { data: user } = await supabase
      .from('users')
      .select('id, actif, reset_token, reset_token_expires')
      .eq('email', email.toLowerCase())
      .single();

    if (!user) {
      // Le webhook n'a pas encore tourné — on renvoie juste un message d'attente
      console.log('User not found yet for:', email, '— webhook probablement en cours');
      return NextResponse.json({ status: 'pending' });
    }

    if (!user.actif) {
      // Compte créé mais pas activé
      await supabase.from('users').update({ actif: true }).eq('id', user.id);
    }

    // Vérifier si le token de reset est encore valide
    const tokenValide = user.reset_token && user.reset_token_expires
      && new Date(user.reset_token_expires) > new Date();

    let resetToken = user.reset_token;

    if (!tokenValide) {
      // Générer un nouveau token (cas où le webhook a tourné mais l'email n'est pas arrivé)
      resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      await supabase.from('users').update({
        reset_token: resetToken,
        reset_token_expires: resetExpires,
      }).eq('id', user.id);
      console.log('Nouveau token généré pour:', email);
    }

    const createPasswordUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`;

    // Envoyer (ou renvoyer) l'email de bienvenue
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY! },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email }],
        subject: 'Bienvenue sur DadUp - Cree ton mot de passe',
        htmlContent: `
<div style="font-family:-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:40px 32px;background:#f7f5f0;border-radius:20px;">
  <div style="text-align:center;margin-bottom:28px;">
    <h1 style="color:#1e2535;font-size:28px;margin:0;font-weight:900;">DadUp</h1>
  </div>
  <h2 style="color:#1e2535;font-size:22px;margin:0 0 16px;font-weight:800;">Bienvenue, papa !</h2>
  <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 24px;">
    Ton acces DadUp est pret. Il ne te reste qu'une etape : creer ton mot de passe pour acceder a ton espace.
  </p>
  <div style="text-align:center;margin-bottom:32px;">
    <a href="${createPasswordUrl}" style="display:inline-block;background:#1e2535;color:#fff;padding:16px 36px;border-radius:32px;font-size:16px;font-weight:700;text-decoration:none;">
      Creer mon mot de passe
    </a>
  </div>
  <p style="color:#9aa0a8;font-size:13px;line-height:1.6;margin:0 0 8px;">Ce lien est valable 7 jours.</p>
  <p style="color:#9aa0a8;font-size:12px;margin:0;">Ton email de connexion : <strong style="color:#1e2535;">${email}</strong></p>
  <hr style="border:none;border-top:1px solid #e8e0d0;margin:24px 0;"/>
  <p style="color:#9aa0a8;font-size:11px;margin:0;">DadUp · Il ne remplace pas l'avis d'un medecin.</p>
</div>`,
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
