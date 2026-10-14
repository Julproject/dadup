import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { utilisateurDeSession } from '../../../lib/session';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { user } = await utilisateurDeSession<{ stripe_subscription_id: string | null }>(req, supabase, 'id, stripe_subscription_id');
    if (!user) return NextResponse.json({ endDate: null }, { status: 401 });

    if (!user?.stripe_subscription_id) {
      return NextResponse.json({ endDate: null });
    }

    const stripeRes = await fetch(
      `https://api.stripe.com/v1/subscriptions/${user.stripe_subscription_id}`,
      { headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } }
    );

    if (!stripeRes.ok) return NextResponse.json({ endDate: null });

    const sub = await stripeRes.json();
    const endDate = sub.current_period_end
      ? new Date(sub.current_period_end * 1000).toISOString()
      : null;

    return NextResponse.json({ endDate });

  } catch (err) {
    console.error('Subscription error:', err);
    return NextResponse.json({ endDate: null });
  }
}
