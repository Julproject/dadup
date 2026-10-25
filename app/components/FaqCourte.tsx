'use client';
// ── FAQ courte de l'accueil : les questions qu'on se pose avant d'acheter ──
// Mêmes réponses que la FAQ complète de la page Tarifs.
import { useId, useState } from 'react';

const QUESTIONS: { q: string; r: string }[] = [
  {
    q: 'Combien de temps dure l’accès ?',
    r: 'Jusqu’au 1er anniversaire de bébé. Quand tu déclares la naissance dans l’app, la fin de l’accès est calée sur la vraie date de naissance. Si la naissance n’est pas déclarée, l’accès court jusqu’à 15 mois après la date prévue d’accouchement.',
  },
  {
    q: 'Je suis déjà bien avancé dans la grossesse, c’est encore utile ?',
    r: 'Oui. DadUp se cale sur ta date prévue d’accouchement : tu arrives directement sur ta semaine en cours, avec la valise, le Jour J et l’après-naissance.',
  },
  {
    q: 'Que se passe-t-il après le paiement ?',
    r: 'Tu reçois un email pour créer ton mot de passe. Ton espace s’ouvre dès que c’est fait. Si l’email n’arrive pas, regarde dans tes spams ou écris-nous à hello@dadup.fr.',
  },
  {
    q: 'Et si ça ne me convient pas ?',
    r: 'Écris-nous à hello@dadup.fr dans les 14 jours suivant ton achat. On te rembourse intégralement, sans condition et sans question.',
  },
];

function Question({ q, r }: { q: string; r: string }) {
  const [ouvert, setOuvert] = useState(false);
  const id = useId();
  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #E6E0D5', overflow: 'hidden' }}>
      <button
        onClick={() => setOuvert(!ouvert)}
        aria-expanded={ouvert}
        aria-controls={`faqc-${id}`}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '18px 22px', minHeight: '56px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ color: '#15263A', fontSize: '15px', fontWeight: 700, lineHeight: 1.45 }}>{q}</span>
        <span aria-hidden="true" style={{ color: '#9C4A2E', fontSize: '22px', flexShrink: 0, fontWeight: 400 }}>{ouvert ? '−' : '+'}</span>
      </button>
      {ouvert && (
        <div id={`faqc-${id}`} role="region" aria-label={q} style={{ padding: '0 22px 18px' }}>
          <p style={{ color: '#3d4a55', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>{r}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqCourte() {
  return (
    <div style={{ textAlign: 'left', marginBottom: '72px' }}>
      <p style={{ color: '#9C4A2E', fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 14px', textAlign: 'center' }}>Avant de te lancer</p>
      <h2 style={{ color: '#15263A', fontSize: '32px', fontWeight: 800, lineHeight: 1.2, margin: '0 0 28px', textAlign: 'center' }}>Tes questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {QUESTIONS.map(x => <Question key={x.q} q={x.q} r={x.r} />)}
      </div>
      <p style={{ textAlign: 'center', margin: '20px 0 0' }}>
        <a href="/tarifs" style={{ color: '#15263A', fontSize: '14px', fontWeight: 700, textDecoration: 'none', borderBottom: '2px solid #B4593A', paddingBottom: '2px' }}>Toutes les questions →</a>
      </p>
    </div>
  );
}
