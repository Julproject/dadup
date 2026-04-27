import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId || process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      }],

      // Abonnement annuel — annulé automatiquement après 1 cycle
      // Conforme aux CGV : "sans reconduction tacite"
      mode: 'subscription',
      subscription_data: {
        metadata: { cancel_after_first_period: 'true' },
      },

      // URLs
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_URL}/paiement-annule`,
      allow_promotion_codes: true,

      // Consentement exprès requis par la loi française
      consent_collection: {
        terms_of_service: 'required',  // Case CGV obligatoire
      },

      // Informations légales affichées sur la page Stripe
      custom_text: {
        terms_of_service_acceptance: {
          message: `En cochant cette case, j'accepte les [Conditions Générales de Vente](${process.env.NEXT_PUBLIC_URL}/cgv) de DadUp et je demande expressément l'accès immédiat au Service, reconnaissant ainsi renoncer à mon droit de rétractation de 14 jours dès que le Service est activé (art. L.221-28 13° Code de la consommation).`,
        },
        submit: {
          message: 'Abonnement annuel · 35,99 € TTC · Sans renouvellement automatique',
        },
      },

      // Informations sur le vendeur (SIRET, adresse)
      // Ces infos s'affichent dans le récapitulatif Stripe
      metadata: {
        vendor_siret: '10349796200011',
        vendor_name: 'DadUp — Julie Maillot EI',
        vendor_address: '19 avenue de la préservation, 33000 Bordeaux',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Erreur lors de la création du paiement.' }, { status: 500 });
  }
}
