import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('dadup_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, prenom, dpa, dpa_originale, actif, created_at, stripe_subscription_id, valise_checked, missions_checked, achats_checked, rdv_dates, next_rdv')
      .eq('id', sessionId)
      .single();

    if (error || !user || !user.actif) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Récupérer la date de fin d'abonnement depuis Stripe si subscription_id disponible
    let subscriptionEndDate: string | null = null;

    if (user.stripe_subscription_id) {
      try {
        const stripeRes = await fetch(
          `https://api.stripe.com/v1/subscriptions/${user.stripe_subscription_id}`,
          { headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } }
        );
        if (stripeRes.ok) {
          const sub = await stripeRes.json();
          // current_period_end = timestamp Unix de fin de période en cours
          if (sub.current_period_end) {
            subscriptionEndDate = new Date(sub.current_period_end * 1000).toISOString();
          }
        }
      } catch (e) {
        console.error('Stripe subscription fetch error:', e);
      }
    }

    return NextResponse.json({ user: { ...user, subscriptionEndDate } });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
