import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prenom, email, sujet, message } = await req.json();

    if (!email || !sujet || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    // Validation email basique
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    // Limite anti-spam : message min 10 caractères
    if (message.trim().length < 10) {
      return NextResponse.json({ error: 'Message trop court.' }, { status: 400 });
    }

    const expediteur = prenom ? `${prenom} (${email})` : email;
    const dateHeure  = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    // ── Email à l'équipe DadUp ──────────────────────────────────────────────
    const emailEquipe = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: 'DadUp Contact', email: 'hello@dadup.fr' },
        to: [{ email: 'hello@dadup.fr', name: 'DadUp' }],
        replyTo: { email, name: prenom || email },
        subject: `[Contact] ${sujet} - ${expediteur}`,
        htmlContent: `
          <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f7f5f0;border-radius:16px;">
            <h2 style="color:#1e2535;font-size:20px;margin:0 0 24px;border-bottom:2px solid #e8e0d0;padding-bottom:16px;">
              Nouveau message de contact DadUp
            </h2>

            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:8px 0;color:#9aa0a8;font-size:13px;font-weight:700;width:100px;">De</td>
                <td style="padding:8px 0;color:#1e2535;font-size:14px;">${expediteur}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#9aa0a8;font-size:13px;font-weight:700;">Sujet</td>
                <td style="padding:8px 0;color:#1e2535;font-size:14px;font-weight:600;">${sujet}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#9aa0a8;font-size:13px;font-weight:700;">Date</td>
                <td style="padding:8px 0;color:#1e2535;font-size:14px;">${dateHeure}</td>
              </tr>
            </table>

            <div style="background:#ffffff;border-radius:12px;padding:20px 24px;border-left:4px solid #c8a060;">
              <p style="color:#1e2535;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message.trim()}</p>
            </div>

            <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e8e0d0;">
              <a href="mailto:${email}" style="display:inline-block;background:#1e2535;color:#fff;padding:12px 24px;border-radius:32px;font-size:14px;font-weight:700;text-decoration:none;">
                Répondre à ${prenom || email}
              </a>
            </div>
          </div>
        `,
      }),
    });

    if (!emailEquipe.ok) {
      let errBody = '';
      try { errBody = JSON.stringify(await emailEquipe.json()); } catch {}
      console.error('Brevo error (equipe):', emailEquipe.status, errBody);
      return NextResponse.json({ error: 'Erreur envoi email.', detail: errBody }, { status: 500 });
    }

    // ── Email de confirmation à l'utilisateur ───────────────────────────────
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email, name: prenom || 'Papa' }],
        subject: 'On a bien recu ton message - DadUp',
        htmlContent: `
          <div style="font-family:-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:40px 32px;background:#f7f5f0;border-radius:20px;">

            <div style="text-align:center;margin-bottom:32px;">
              <div style="width:56px;height:56px;border-radius:50%;background:#E4F5EC;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                <span style="font-size:24px;">✓</span>
              </div>
              <h1 style="color:#1e2535;font-size:22px;margin:0;">Message reçu !</h1>
            </div>

            <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 20px;">
              Bonjour ${prenom || 'Papa'},<br/><br/>
              On a bien reçu ton message concernant <strong>${sujet}</strong>.
              On te répond en général sous 24h, souvent bien moins.
            </p>

            <div style="background:#ffffff;border-radius:12px;padding:16px 20px;border-left:4px solid #c8a060;margin-bottom:24px;">
              <p style="color:#9aa0a8;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Ton message</p>
              <p style="color:#1e2535;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${message.trim()}</p>
            </div>

            <p style="color:#9aa0a8;font-size:13px;line-height:1.6;margin:0 0 24px;">
              Si tu as une urgence, tu peux aussi répondre directement à cet email.
            </p>

            <p style="color:#9aa0a8;font-size:12px;margin:0;text-align:center;">
              DadUp · hello@dadup.fr · Il ne remplace pas l'avis d'un médecin.
            </p>
          </div>
        `,
      }),
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('Contact error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
