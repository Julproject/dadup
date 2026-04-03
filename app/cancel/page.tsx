'use client';

import { useState, useEffect } from 'react';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', red: '#FDECEA', redDark: '#A03030',
  green: '#E4F5EC', greenDark: '#0D6B40',
};

export default function CancelPage() {
  const [step, setStep]           = useState<'info' | 'confirm' | 'done'>('info');
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState<{ remboursement: boolean; joursDepuisInscription: number } | null>(null);
  const [error, setError]         = useState('');
  const [joursClient, setJoursClient] = useState<number | null>(null);

  // Estimer les jours depuis l'inscription via l'API me
  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(({ user }) => {
        if (user?.created_at) {
          const jours = Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24));
          setJoursClient(jours);
        }
      })
      .catch(() => {});
  }, []);

  const handleCancel = async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/cancel', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setResult(data);
      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Ecris-nous a hello@dadup.fr');
    } finally {
      setLoading(false);
    }
  };

  const eligibleRemboursement = joursClient !== null && joursClient <= 14;

  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 28px', display: 'flex', alignItems: 'center', height: '60px' }}>
        <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: C.textLight, fontSize: '14px', fontWeight: 600 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Retour a mon espace
        </a>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>

          {step === 'done' && result ? (
            /* Confirmation finale */
            <div style={{ background: C.white, borderRadius: '24px', padding: '40px', textAlign: 'center', border: `1px solid ${C.border}` }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.greenDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h1 style={{ color: C.dark, fontSize: '22px', fontWeight: 800, margin: '0 0 12px' }}>
                {result.remboursement ? 'Resiliation et remboursement confirmes' : 'Resiliation confirmee'}
              </h1>
              <p style={{ color: C.text, fontSize: '15px', lineHeight: 1.7, margin: '0 0 24px' }}>
                {result.remboursement
                  ? 'Ton abonnement a ete annule et tu as ete rembourse integralement. Le remboursement apparait sur ton compte sous 5 a 10 jours ouvrés.'
                  : "Ton abonnement est annule. Tu conserves l'acces jusqu'a la fin de ta periode annuelle."}
              </p>
              <p style={{ color: C.textLight, fontSize: '13px', margin: '0 0 28px' }}>Un email de confirmation a ete envoye.</p>
              <a href="/" style={{ display: 'inline-block', background: C.dark, color: C.white, padding: '12px 28px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
                Retour a l'accueil
              </a>
            </div>

          ) : step === 'confirm' ? (
            /* Etape confirmation */
            <div style={{ background: C.white, borderRadius: '24px', padding: '36px', border: `1px solid ${C.border}` }}>
              <div style={{ background: C.red, borderRadius: '14px', padding: '16px 18px', marginBottom: '24px' }}>
                <p style={{ color: C.redDark, fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>
                  {eligibleRemboursement ? 'Remboursement automatique inclus' : 'Aucun remboursement'}
                </p>
                <p style={{ color: C.redDark, fontSize: '13px', margin: 0, opacity: 0.8 }}>
                  {eligibleRemboursement
                    ? `Tu es client depuis ${joursClient} jours — sous les 14 jours. Tu seras rembourse integralement.`
                    : `Tu es client depuis ${joursClient ?? '?'} jours — au-dela des 14 jours. Pas de remboursement, mais tu gardes l'acces jusqu'a la fin de ta periode.`}
                </p>
              </div>

              <h2 style={{ color: C.dark, fontSize: '18px', fontWeight: 800, margin: '0 0 10px' }}>Tu es sur ?</h2>
              <p style={{ color: C.text, fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px' }}>
                Cette action est irreversible. Ton compte sera desactive immediatement.
              </p>

              {error && (
                <div style={{ background: C.red, borderRadius: '10px', padding: '10px 14px', marginBottom: '16px' }}>
                  <p style={{ color: C.redDark, fontSize: '13px', margin: 0 }}>{error}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setStep('info')}
                  style={{ flex: 1, padding: '13px', background: '#f7f5f0', border: 'none', borderRadius: '32px', fontSize: '14px', fontWeight: 700, color: C.textLight, cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  style={{ flex: 2, padding: '13px', background: loading ? '#ccc' : C.redDark, border: 'none', borderRadius: '32px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? 'Traitement...' : 'Confirmer la resiliation'}
                </button>
              </div>
            </div>

          ) : (
            /* Etape info */
            <div>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ color: C.dark, fontSize: '28px', fontWeight: 800, margin: '0 0 10px' }}>Resilier mon abonnement</h1>
                <p style={{ color: C.textLight, fontSize: '15px', margin: 0, lineHeight: 1.6 }}>
                  Avant de partir, voici ce qui se passe.
                </p>
              </div>

              <div style={{ background: C.white, borderRadius: '20px', padding: '28px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>

                {/* Remboursement 14 jours */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', paddingBottom: '20px', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: joursClient !== null && joursClient <= 14 ? C.green : '#f7f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={joursClient !== null && joursClient <= 14 ? C.greenDark : C.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: C.dark, fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>Remboursement sous 14 jours</p>
                    <p style={{ color: C.text, fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                      {joursClient !== null
                        ? joursClient <= 14
                          ? `Tu es client depuis ${joursClient} jours. Tu es eligible au remboursement integral automatique.`
                          : `Tu es client depuis ${joursClient} jours. La periode de remboursement (14 jours) est depassee.`
                        : 'Si tu es client depuis moins de 14 jours, tu es rembourse integralement et automatiquement.'}
                    </p>
                  </div>
                </div>

                {/* Acces conserve */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', paddingBottom: '20px', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FFF7E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: C.dark, fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>Acces jusqu'a la fin de la periode</p>
                    <p style={{ color: C.text, fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                      Sans remboursement, tu gardes l'acces complet jusqu'a la date de renouvellement annuel.
                    </p>
                  </div>
                </div>

                {/* Données supprimées */}
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.redDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: C.dark, fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>Compte desactive</p>
                    <p style={{ color: C.text, fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                      Ton compte sera desactive immediatement. Tes donnees (prenom, DPA) sont supprimees.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('confirm')}
                style={{ width: '100%', padding: '14px', background: C.dark, border: 'none', borderRadius: '32px', fontSize: '15px', fontWeight: 700, color: C.white, cursor: 'pointer' }}
              >
                Continuer vers la resiliation
              </button>

              <p style={{ textAlign: 'center', color: C.textLight, fontSize: '13px', margin: '16px 0 0' }}>
                Tu as une question ?{' '}
                <a href="/contact-app" style={{ color: C.blue, fontWeight: 700, textDecoration: 'none' }}>Contacte-nous</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
