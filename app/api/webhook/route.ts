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
    const email   = session.customer_email || session.customer_details?.email || '';

    if (!email) return NextResponse.json({ ok: true });

    // Annuler l'abonnement à la fin de la période (= sans reconduction tacite)
    // Mode payment one-time : pas de subscription, on ignore
    if (session.subscription) {
      try {
        await stripe.subscriptions.update(session.subscription as string, {
          cancel_at_period_end: true,
        });
      } catch (e) {
        console.error('Erreur annulation fin période:', e);
        // On continue même si ça échoue, ne pas bloquer la création du compte
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
        subject: 'Bienvenue sur DadUp : Crée ton mot de passe',
        htmlContent: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ede8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;padding:0 16px 40px;">

    <!-- HEADER -->
    <div style="text-align:center;padding:32px 0 24px;">
      <div style="display:inline-block;background:#1e2535;border-radius:16px;padding:12px 24px;">
        <span style="color:#c8a060;font-size:22px;font-weight:800;letter-spacing:1px;">DadUp</span>
      </div>
    </div>

    <!-- CARTE PRINCIPALE -->
    <div style="background:#ffffff;border-radius:24px;padding:40px 36px;border:1px solid #e8e0d0;">

      <h1 style="color:#1e2535;font-size:24px;font-weight:800;margin:0 0 8px;line-height:1.3;">
        Bienvenue sur DadUp.
      </h1>
      <p style="color:#9aa0a8;font-size:14px;margin:0 0 28px;">
        Ton paiement a bien été reçu. Ton espace est prêt.
      </p>

      <p style="color:#4a5568;font-size:15px;line-height:1.75;margin:0 0 28px;">
        Pour accéder à ton espace, il te reste une étape : créer ton mot de passe. Clique sur le bouton ci-dessous.
      </p>

      <div style="text-align:center;margin-bottom:32px;">
        <a href="${createPasswordUrl}"
           style="display:inline-block;background:#1e2535;color:#ffffff;padding:16px 40px;border-radius:32px;font-size:16px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">
          Créer mon mot de passe
        </a>
      </div>

      <!-- CE QUI T'ATTEND -->
      <div style="background:#faf6f0;border-radius:16px;padding:24px;margin-bottom:28px;">
        <p style="color:#1e2535;font-size:13px;font-weight:700;margin:0 0 14px;text-transform:uppercase;letter-spacing:1.5px;">Ce qui t'attend</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#4a5568;font-size:14px;">Suivi bébé semaine par semaine</td>
            <td style="padding:6px 0;color:#2E5F8A;font-size:13px;font-weight:600;text-align:right;">SA 3 à SA 41</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#4a5568;font-size:14px;border-top:1px solid #e8e0d0;">Calendrier des rendez-vous personnalisé</td>
            <td style="padding:6px 0;color:#2E5F8A;font-size:13px;font-weight:600;text-align:right;border-top:1px solid #e8e0d0;"></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#4a5568;font-size:14px;border-top:1px solid #e8e0d0;">Guide accouchement, valise, post-partum</td>
            <td style="padding:6px 0;color:#2E5F8A;font-size:13px;font-weight:600;text-align:right;border-top:1px solid #e8e0d0;">Inclus</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#4a5568;font-size:14px;border-top:1px solid #e8e0d0;">Première année de bébé</td>
            <td style="padding:6px 0;color:#2E5F8A;font-size:13px;font-weight:600;text-align:right;border-top:1px solid #e8e0d0;">Jusqu'au 1er anniversaire de bébé</td>
          </tr>
        </table>
      </div>

      <!-- INFOS CONNEXION -->
      <div style="border-top:1px solid #e8e0d0;padding-top:20px;">
        <p style="color:#9aa0a8;font-size:13px;margin:0 0 6px;">Ton email de connexion :</p>
        <p style="color:#1e2535;font-size:14px;font-weight:700;margin:0 0 16px;">${email}</p>
        <p style="color:#9aa0a8;font-size:12px;margin:0;line-height:1.6;">
          Ce lien est valable 7 jours. Si tu ne l'utilises pas, tu pourras en demander un nouveau depuis la page de connexion.
        </p>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="text-align:center;padding:24px 0 0;">
      <p style="color:#9aa0a8;font-size:12px;margin:0 0 6px;">
        Une question ? Réponds directement à cet email.
      </p>
      <p style="color:#c8c0b8;font-size:11px;margin:0;">
        DadUp · hello@dadup.fr · Il ne remplace pas l'avis d'un médecin.
      </p>
    </div>

  </div>
</body>
</html>`,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
