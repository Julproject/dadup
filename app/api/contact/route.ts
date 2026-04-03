import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prenom, email, sujet, message } = body;

    console.log('Contact recu:', { email, sujet, messageLen: message?.length });

    if (!email || !message) {
      return NextResponse.json({ error: 'Email et message requis.' }, { status: 400 });
    }
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }
    if (message.trim().length < 5) {
      return NextResponse.json({ error: 'Message trop court.' }, { status: 400 });
    }

    const sujetFinal = sujet?.trim() || 'Autre';
    const expediteur = prenom?.trim() ? `${prenom.trim()} (${email})` : email;
    const dateHeure  = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    // Email notification vers l'équipe
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: 'DadUp Contact', email: 'hello@dadup.fr' },
        to: [{ email: 'hello@dadup.fr', name: 'DadUp' }],
        replyTo: { email: email, name: prenom || email },
        subject: `[Contact DadUp] ${sujetFinal} - ${expediteur}`,
        htmlContent: `
<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f7f5f0;">
  <h2 style="color:#1e2535;font-size:18px;margin:0 0 20px;">Nouveau message DadUp</h2>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px;">
    <tr><td style="padding:6px 0;color:#9aa0a8;width:80px;">De</td><td style="color:#1e2535;">${expediteur}</td></tr>
    <tr><td style="padding:6px 0;color:#9aa0a8;">Sujet</td><td style="color:#1e2535;font-weight:700;">${sujetFinal}</td></tr>
    <tr><td style="padding:6px 0;color:#9aa0a8;">Date</td><td style="color:#1e2535;">${dateHeure}</td></tr>
  </table>
  <div style="background:#fff;border-radius:10px;padding:16px 20px;border-left:4px solid #c8a060;">
    <p style="color:#1e2535;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message.trim()}</p>
  </div>
  <div style="margin-top:20px;">
    <a href="mailto:${email}" style="background:#1e2535;color:#fff;padding:10px 22px;border-radius:32px;font-size:13px;font-weight:700;text-decoration:none;">Repondre a ${prenom || email}</a>
  </div>
</div>`,
      }),
    });

    if (!brevoRes.ok) {
      const brevoErr = await brevoRes.json().catch(() => ({}));
      console.error('Brevo error:', brevoRes.status, JSON.stringify(brevoErr));
      // On continue quand meme pour envoyer la confirmation
      // mais on log l'erreur
    }

    // Email de confirmation a l'utilisateur
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email: email, name: prenom || 'Papa' }],
        subject: 'Ton message a bien ete recu - DadUp',
        htmlContent: `
<div style="font-family:-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:40px 32px;background:#f7f5f0;border-radius:20px;">
  <h1 style="color:#1e2535;font-size:20px;margin:0 0 16px;">Message recu !</h1>
  <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 16px;">
    Bonjour ${prenom || 'Papa'},<br/>
    On a bien recu ton message. On te repond en general sous 24h.
  </p>
  <div style="background:#fff;border-radius:10px;padding:14px 18px;border-left:4px solid #c8a060;margin-bottom:20px;">
    <p style="color:#9aa0a8;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Ton message</p>
    <p style="color:#1e2535;font-size:13px;line-height:1.6;margin:0;white-space:pre-wrap;">${message.trim()}</p>
  </div>
  <p style="color:#9aa0a8;font-size:12px;margin:0;">DadUp · hello@dadup.fr</p>
</div>`,
      }),
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
