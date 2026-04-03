'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus]   = useState<'loading' | 'sent' | 'pending' | 'error'>('loading');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setStatus('sent'); // Pas de session_id = accès direct, on affiche juste la page
      return;
    }

    const tryResend = async (attempt: number) => {
      try {
        const res  = await fetch('/api/resend-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        const data = await res.json();

        if (data.status === 'sent') {
          setStatus('sent');
        } else if (data.status === 'pending' && attempt < 5) {
          // Webhook pas encore passé — retry dans 3 secondes
          setAttempts(attempt + 1);
          setTimeout(() => tryResend(attempt + 1), 3000);
        } else {
          // Après 5 essais, afficher quand même la page avec message d'attente
          setStatus('pending');
        }
      } catch {
        setStatus('error');
      }
    };

    tryResend(0);
  }, [searchParams]);

  return (
    <main style={{
      minHeight: '100vh', background: '#f7f5f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>

        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <svg viewBox="0 0 300 300" width="64" height="64" style={{ margin: '0 auto', display: 'block' }}>
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
        </div>

        <div style={{ background: '#fff', borderRadius: '28px', padding: '40px 36px', border: '1px solid #f0ede8', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>

          {status === 'loading' && (
            <>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E6F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2E5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              </div>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              <h1 style={{ color: '#1e2535', fontSize: '22px', fontWeight: 900, margin: '0 0 10px' }}>Activation en cours...</h1>
              <p style={{ color: '#9aa0a8', fontSize: '14px', margin: 0 }}>
                On prépare ton espace{attempts > 0 ? ` (tentative ${attempts}/5)` : ''}...
              </p>
            </>
          )}

          {(status === 'sent' || status === 'pending') && (
            <>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E4F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D6B40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h1 style={{ color: '#1e2535', fontSize: '24px', fontWeight: 900, margin: '0 0 12px' }}>Bienvenue sur DadUp !</h1>
              <p style={{ color: '#4a5568', fontSize: '15px', lineHeight: 1.7, margin: '0 0 28px' }}>
                {status === 'sent'
                  ? "Ton acces est active. Un email vient d'etre envoye avec un lien pour creer ton mot de passe."
                  : "Ton paiement est confirme. L'email d'activation est en route — verifie ta boite dans quelques minutes."}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', textAlign: 'left' }}>
                {[
                  { n: '1', texte: 'Verifie ta boite mail (et tes spams)' },
                  { n: '2', texte: 'Clique sur le lien pour creer ton mot de passe' },
                  { n: '3', texte: 'Connecte-toi et commence ton parcours' },
                ].map(step => (
                  <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: '#f7f5f0', borderRadius: '14px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1e2535', color: '#fff', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {step.n}
                    </div>
                    <p style={{ color: '#1e2535', fontSize: '14px', fontWeight: 600, margin: 0 }}>{step.texte}</p>
                  </div>
                ))}
              </div>

              <a href="/login" style={{ display: 'block', background: '#1e2535', color: '#fff', padding: '14px', borderRadius: '32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
                Aller a la connexion
              </a>
            </>
          )}

          {status === 'error' && (
            <>
              <h1 style={{ color: '#1e2535', fontSize: '22px', fontWeight: 900, margin: '0 0 12px' }}>Paiement confirme !</h1>
              <p style={{ color: '#4a5568', fontSize: '15px', lineHeight: 1.7, margin: '0 0 24px' }}>
                Ton paiement a bien ete recu. L'email d'activation peut prendre quelques minutes. Si tu ne le recois pas, ecris-nous.
              </p>
              <a href="mailto:hello@dadup.fr" style={{ display: 'block', background: '#1e2535', color: '#fff', padding: '14px', borderRadius: '32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
                Contacter le support
              </a>
            </>
          )}

        </div>

        <p style={{ color: '#9aa0a8', fontSize: '13px', marginTop: '20px', lineHeight: 1.6 }}>
          Le lien expire dans 7 jours.<br/>
          Un probleme ? <a href="mailto:hello@dadup.fr" style={{ color: '#2E5F8A', fontWeight: 600 }}>hello@dadup.fr</a>
        </p>

      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#f7f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#9aa0a8', fontSize: '14px' }}>Chargement...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
