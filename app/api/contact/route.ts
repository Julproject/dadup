import { NextRequest, NextResponse } from 'next/server';
import { limiteAtteinte, compter, ipDe } from '../../../lib/limite';

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

function echapper(s: unknown): string {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

async function envoyer(to: string, subject: string, html: string, replyTo?: string) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY! },
    body: JSON.stringify({
      sender: { name: 'DadUp', email: 'hello@dadup.fr' },
      to: [{ email: to }],
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      subject,
      htmlContent: html,
    }),
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  try {
    // 5 messages par heure et par adresse IP
    const cleIp = 'contact-ip:' + ipDe(req);
    if (limiteAtteinte(cleIp, 5, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Trop de messages envoyés. Réessaie dans un moment ou écris à hello@dadup.fr.' }, { status: 429 });
    }

    const { prenom, email, sujet, message } = await req.json();

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > 200) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message vide.' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message trop long (5 000 caractères maximum).' }, { status: 400 });
    }
    compter(cleIp, 60 * 60 * 1000);

    const adresse = email.trim();
    const sujetFinal = (typeof sujet === 'string' && sujet.trim() ? sujet.trim() : 'Autre').slice(0, 120);
    const nom = typeof prenom === 'string' ? prenom.trim().slice(0, 60) : '';
    const expediteur = nom ? `${nom} (${adresse})` : adresse;
    const dateHeure = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    // Email interne : tout le contenu est échappé
    const okInterne = await envoyer(
      'hello@dadup.fr',
      `[Contact DadUp] ${sujetFinal} - ${expediteur}`,
      `<div style="font-family:sans-serif;padding:24px;background:#F6F1E9;">
        <h2 style="color:#15263A;">Nouveau message DadUp</h2>
        <p><strong>De :</strong> ${echapper(expediteur)}</p>
        <p><strong>Sujet :</strong> ${echapper(sujetFinal)}</p>
        <p><strong>Date :</strong> ${echapper(dateHeure)}</p>
        <hr/>
        <p style="white-space:pre-wrap;">${echapper(message.trim())}</p>
      </div>`,
      adresse,
    );
    if (!okInterne) {
      return NextResponse.json({ error: "Le message n'a pas pu être envoyé. Réessaie ou écris à hello@dadup.fr." }, { status: 502 });
    }

    // Accusé de réception : texte fixe, sans recopier le contenu saisi
    // (évite que le formulaire serve à envoyer des messages à n'importe qui)
    await envoyer(
      adresse,
      'Ton message a bien été reçu - DadUp',
      `<div style="font-family:sans-serif;padding:24px;background:#F6F1E9;">
        <h2 style="color:#15263A;">Message reçu</h2>
        <p>Bonjour,</p>
        <p>On a bien reçu ton message et on te répond au plus vite.</p>
        <p style="color:#56616B;font-size:12px;">DadUp, hello@dadup.fr</p>
      </div>`,
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
