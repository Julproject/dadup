import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email requis' }, { status: 400 });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await supabase.from('auth_codes').delete().eq('email', email);
    await supabase.from('auth_codes').insert({ email, code, expires_at });

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email }],
        subject: 'Ton code de connexion DadUp',
        htmlContent: `
          <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#f8f8f5;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="font-size:28px;color:#1e2820;margin:0;">DadUp</h1>
              <p style="color:#888;font-size:14px;margin:8px 0 0;">Le guide du pere</p>
            </div>
            <div style="background:#ffffff;border-radius:20px;padding:32px;text-align:center;">
              <p style="color:#1e2820;font-size:16px;margin:0 0 24px;">Ton code de connexion :</p>
              <div style="background:#1e2820;border-radius:16px;padding:24px;display:inline-block;">
                <p style="color:#f5c842;font-size:42px;font-weight:700;letter-spacing:12px;margin:0;">${code}</p>
              </div>
              <p style="color:#888;font-size:13px;margin:24px 0 0;">Ce code expire dans 10 minutes.</p>
            </div>
            <p style="color:#aaa;font-size:11px;text-align:center;margin-top:24px;">Si tu nes pas a lorigine de cette demande, ignore cet email.</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Brevo error:', err);
      return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
