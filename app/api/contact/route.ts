import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prenom, email, sujet, message } = body;

    console.log('Contact recu:', { email, sujet, messageLen: message?.length });

    if (!email) {
      return NextResponse.json({ error: 'Email requis.' }, { status: 400 });
    }
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message vide.' }, { status: 400 });
    }

    const sujetFinal = sujet?.trim() || 'Autre';
    const expediteur = prenom?.trim() ? `${prenom.trim()} (${email})` : email;
    const dateHeure  = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    const sendEmail = async (to: string, subject: string, html: string) => {
      try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY!,
          },
          body: JSON.stringify({
            sender: { name: 'DadUp', email: 'hello@dadup.fr' },
            to: [{ email: to }],
            replyTo: { email: email },
            subject,
            htmlContent: html,
          }),
        });
        if (!res.ok) {
          const err = await res.text();
          console.error(`Brevo error sending to ${to}:`, res.status, err);
        } else {
          console.log(`Email envoye a ${to} OK`);
        }
      } catch (e) {
        console.error(`Brevo exception sending to ${to}:`, e);
      }
    };

    // Email à l'équipe — on n'attend pas, on fire & forget
    sendEmail(
      'hello@dadup.fr',
      `[Contact DadUp] ${sujetFinal} - ${expediteur}`,
      `<div style="font-family:sans-serif;padding:24px;background:#f7f5f0;">
        <h2 style="color:#1e2535;">Nouveau message DadUp</h2>
        <p><strong>De :</strong> ${expediteur}</p>
        <p><strong>Sujet :</strong> ${sujetFinal}</p>
        <p><strong>Date :</strong> ${dateHeure}</p>
        <hr/>
        <p style="white-space:pre-wrap;">${message.trim()}</p>
      </div>`
    );

    // Email de confirmation à l'utilisateur — fire & forget aussi
    sendEmail(
      email,
      'Ton message a bien ete recu - DadUp',
      `<div style="font-family:sans-serif;padding:24px;background:#f7f5f0;">
        <h2 style="color:#1e2535;">Message recu !</h2>
        <p>Bonjour ${prenom || 'Papa'},</p>
        <p>On a bien recu ton message concernant <strong>${sujetFinal}</strong>. On te repond sous 24h.</p>
        <p style="white-space:pre-wrap;background:#fff;padding:12px;border-radius:8px;border-left:4px solid #c8a060;">${message.trim()}</p>
        <p style="color:#9aa0a8;font-size:12px;">DadUp · hello@dadup.fr</p>
      </div>`
    );

    // On répond toujours 200 au client — les emails partent en arrière-plan
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('Contact route error:', err);
    // Même en cas d'erreur serveur, on répond ok pour ne pas bloquer l'utilisateur
    return NextResponse.json({ ok: true });
  }
}
