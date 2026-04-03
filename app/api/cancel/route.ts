import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('dadup_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Non connecte.' }, { status: 401 });

    // Récupérer l'utilisateur
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, actif, created_at, stripe_customer_id, stripe_subscription_id')
      .eq('id', sessionId)
      .single();

    if (error || !user) return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    if (!user.actif)    return NextResponse.json({ error: 'Compte deja desactive.' },    { status: 400 });

    const joursDepuisInscription = Math.floor(
      (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    const eligibleRemboursement = joursDepuisInscription <= 14;

    console.log(`Resiliation: ${user.email}, ${joursDepuisInscription}j, remboursement: ${eligibleRemboursement}`);

    let remboursementEffectue = false;
    let subscriptionAnnulee   = false;

    // ── Remboursement automatique si <= 14 jours ──────────────────────────────
    if (eligibleRemboursement && user.stripe_customer_id) {
      try {
        // Chercher la dernière charge du customer
        const charges = await stripe.charges.list({
          customer: user.stripe_customer_id,
          limit: 1,
        });

        if (charges.data.length > 0) {
          const charge = charges.data[0];
          if (charge.amount_refunded === 0 && charge.refunded === false) {
            await stripe.refunds.create({ charge: charge.id });
            remboursementEffectue = true;
            console.log(`Remboursement effectue pour ${user.email}: charge ${charge.id}`);
          }
        }
      } catch (stripeErr) {
        console.error('Stripe refund error:', stripeErr);
      }
    }

    // ── Annuler l'abonnement Stripe ───────────────────────────────────────────
    if (user.stripe_subscription_id) {
      try {
        await stripe.subscriptions.cancel(user.stripe_subscription_id);
        subscriptionAnnulee = true;
        console.log(`Subscription annulee: ${user.stripe_subscription_id}`);
      } catch (stripeErr) {
        console.error('Stripe cancel subscription error:', stripeErr);
      }
    }

    // ── Désactiver le compte Supabase ─────────────────────────────────────────
    await supabase
      .from('users')
      .update({ actif: false })
      .eq('id', user.id);

    // ── Email de confirmation à l'utilisateur ─────────────────────────────────
    const sujetEmail = remboursementEffectue
      ? 'Ton compte DadUp a ete resilie et rembourse'
      : 'Ton compte DadUp a ete resilie';

    const corpsEmail = remboursementEffectue
      ? `<p>Ton abonnement a ete annule et tu as ete rembourse integralement. Le remboursement apparaitra sur ton compte sous 5 a 10 jours ouvres.</p>`
      : `<p>Ton abonnement a ete annule. Tu conserves l'acces a DadUp jusqu'a la fin de ta periode annuelle.</p>`;

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY! },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email: user.email }],
        subject: sujetEmail,
        htmlContent: `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#f7f5f0;">
  <h2 style="color:#1e2535;">Resiliation confirmee</h2>
  ${corpsEmail}
  <p style="color:#9aa0a8;font-size:12px;margin-top:24px;">DadUp · hello@dadup.fr<br/>Si tu as des questions, reponds directement a cet email.</p>
</div>`,
      }),
    });

    // ── Email de notification interne ─────────────────────────────────────────
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY! },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email: 'hello@dadup.fr' }],
        subject: `[Resiliation] ${user.email} - J+${joursDepuisInscription}${remboursementEffectue ? ' - REMBOURSE' : ''}`,
        htmlContent: `
<div style="font-family:sans-serif;padding:24px;background:#f7f5f0;">
  <h2 style="color:#1e2535;">Resiliation DadUp</h2>
  <p><strong>Email :</strong> ${user.email}</p>
  <p><strong>Inscrit il y a :</strong> ${joursDepuisInscription} jours</p>
  <p><strong>Remboursement :</strong> ${remboursementEffectue ? 'OUI - effectue automatiquement' : 'NON - hors delai 14 jours'}</p>
  <p><strong>Abonnement annule :</strong> ${subscriptionAnnulee ? 'OUI' : 'NON (pas de subscription_id)'}</p>
</div>`,
      }),
    });

    return NextResponse.json({
      ok: true,
      remboursement: remboursementEffectue,
      joursDepuisInscription,
    });

  } catch (err) {
    console.error('Cancel error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
