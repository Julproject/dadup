import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
  }

  // ── Paiement confirmé ────────────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email   = session.customer_email || (session.customer_details?.email ?? '');

    if (!email) return NextResponse.json({ ok: true });

    // Annuler l'abonnement à la fin de la période (= sans reconduction tacite)
    if (session.subscription) {
      try {
        await stripe.subscriptions.update(session.subscription as string, {
          cancel_at_period_end: true,
        });
      } catch (e) {
        console.error('Erreur annulation fin période:', e);
      }
    }

    // Vérifier si le user existe déjà
    const { data: existing } = await supabase
      .from('users')
      .select('id, actif')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      if (!existing.actif) {
        await supabase.from('users').update({ actif: true }).eq('id', existing.id);
      }
      // Sauvegarder les IDs Stripe
      await supabase.from('users').update({
        stripe_customer_id:      session.customer as string,
        stripe_subscription_id:  session.subscription as string,
      }).eq('id', existing.id);
      return NextResponse.json({ ok: true });
    }

    // Créer le user
    const tempPassword  = crypto.randomBytes(8).toString('hex');
    const password_hash = await bcrypt.hash(tempPassword, 12);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email:                  email.toLowerCase(),
        password_hash,
        actif:                  true,
        stripe_customer_id:     session.customer as string,
        stripe_subscription_id: session.subscription as string,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    // Token pour créer le mot de passe (7 jours)
    const resetToken   = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await supabase.from('users').update({
      reset_token:         resetToken,
      reset_token_expires: resetExpires,
    }).eq('id', newUser.id);

    const createPasswordUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`;

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email }],
        subject: 'Bienvenue sur DadUp — Crée ton mot de passe',
        htmlContent: `
<div style="font-family:-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:40px 32px;background:#f7f5f0;border-radius:20px;">
  <div style="text-align:center;margin-bottom:28px;">
    <h1 style="color:#1e2535;font-size:28px;margin:0;">DadUp</h1>
  </div>
  <h2 style="color:#1e2535;font-size:22px;margin:0 0 16px;">Bienvenue, papa !</h2>
  <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 24px;">
    Ton accès DadUp est prêt. Il ne te reste qu'une étape : créer ton mot de passe pour accéder à ton espace.
  </p>
  <div style="text-align:center;margin-bottom:32px;">
    <a href="${createPasswordUrl}" style="display:inline-block;background:#1e2535;color:#fff;padding:16px 36px;border-radius:32px;font-size:16px;font-weight:700;text-decoration:none;">
      Créer mon mot de passe
    </a>
  </div>
  <p style="color:#9aa0a8;font-size:13px;line-height:1.6;margin:0 0 8px;">Ce lien est valable 7 jours.</p>
  <p style="color:#9aa0a8;font-size:12px;margin:0;">Ton email de connexion : <strong style="color:#1e2535;">${email}</strong></p>
  <hr style="border:none;border-top:1px solid #e8e0d0;margin:24px 0;"/>
  <p style="color:#9aa0a8;font-size:11px;margin:0;">DadUp · Ce service ne remplace pas l'avis d'un médecin.</p>
</div>`,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
