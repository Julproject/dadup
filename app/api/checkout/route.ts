import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dpa, ville, premierEnfant } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'DadUp — Checklist PDF Premium',
              description: `Checklist personnalisée pour ${ville} · DPA: ${dpa}`,
              images: ['https://dadup.fr/og-image.png'],
            },
            unit_amount: 999, // 9.99€ en centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}&dpa=${dpa}&ville=${encodeURIComponent(ville)}&premier=${premierEnfant}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
      metadata: { dpa, ville, premierEnfant: String(premierEnfant) },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Erreur paiement' }, { status: 500 });
  }
}
