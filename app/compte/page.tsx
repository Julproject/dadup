'use client';

import { useState, useEffect } from 'react';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', blueDark: '#1A3D5C',
  green: '#E4F5EC', greenDark: '#0D6B40',
  red: '#FDECEA', redDark: '#A03030',
};

function parseLocalDate(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export default function ComptePage() {
  const [user, setUser]           = useState<any>(null);
  const [loading, setLoading]     = useState(true);
  const [endDate, setEndDate]     = useState<string | null>(null);

  // Champs éditables
  const [prenom, setPrenom]       = useState('');
  const [email,  setEmail]         = useState('');
  const [dpa,    setDpa]          = useState('');
  const [saving, setSaving]       = useState(false);
  const [saved,  setSaved]        = useState(false);

  // Mot de passe
  const [oldPwd,  setOldPwd]      = useState('');
  const [newPwd,  setNewPwd]      = useState('');
  const [newPwd2, setNewPwd2]     = useState('');
  const [pwdMsg,  setPwdMsg]      = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(({ user }) => {
        if (!user) { window.location.href = '/login'; return; }
        setUser(user);
        setPrenom(user.prenom || '');
        setDpa(user.dpa || '');
        setEmail(user.email || '');
        setLoading(false);
        // Récupérer la date de fin Stripe séparément
        fetch('/api/subscription')
          .then(r => r.json())
          .then(data => { if (data.endDate) setEndDate(data.endDate); })
          .catch(() => {});
      })
      .catch(() => { window.location.href = '/login'; });
  }, []);

  const saveInfos = async () => {
    setSaving(true);
    await fetch('/api/auth/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prenom, dpa, email }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const changePassword = async () => {
    if (newPwd !== newPwd2) { setPwdMsg('Les mots de passe ne correspondent pas.'); return; }
    if (newPwd.length < 8)  { setPwdMsg('Minimum 8 caractères.'); return; }
    setPwdLoading(true);
    setPwdMsg('');
    try {
      const res  = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd }),
      });
      const data = await res.json();
      if (!res.ok) { setPwdMsg(data.error || 'Erreur.'); }
      else { setPwdMsg('Mot de passe mis à jour.'); setOldPwd(''); setNewPwd(''); setNewPwd2(''); }
    } catch { setPwdMsg('Erreur serveur.'); }
    setPwdLoading(false);
  };

  // Calculs
  const joursRestants = dpa ? Math.ceil((parseLocalDate(dpa).getTime() - new Date().setHours(0,0,0,0)) / (1000*60*60*24)) : null;
  const isPost        = joursRestants !== null && joursRestants < 0;
  const saReelle      = !isPost && dpa ? Math.max(3, Math.min(42, Math.round(40 - (joursRestants ?? 0) / 7))) : null;

  const input = (value: string, onChange: (v: string) => void, props: any = {}) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: C.cream, border: `1.5px solid ${C.border}`, borderRadius: '12px', padding: '11px 14px', fontSize: '15px', color: C.dark, outline: 'none', boxSizing: 'border-box' as const }}
      onFocus={e => (e.target as HTMLInputElement).style.borderColor = C.blue}
      onBlur={e  => (e.target as HTMLInputElement).style.borderColor = C.border}
      {...props}
    />
  );

  const label = (text: string) => (
    <label style={{ display: 'block', color: C.dark, fontSize: '12px', fontWeight: 700, marginBottom: '7px', letterSpacing: '0.3px' }}>{text}</label>
  );

  const card = (children: React.ReactNode) => (
    <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>
      {children}
    </div>
  );

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: C.textLight, fontSize: '14px' }}>Chargement...</p>
    </div>
  );

  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* Nav */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 28px', display: 'flex', alignItems: 'center', height: '60px' }}>
        <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: C.textLight, fontSize: '14px', fontWeight: 600 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Retour à mon espace
        </a>
      </nav>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 20px' }}>

        <h1 style={{ color: C.dark, fontSize: '26px', fontWeight: 800, margin: '0 0 32px' }}>Mon compte</h1>

        {/* Mode actuel — en premier */}
        {card(
          <>
            <p style={{ color: C.dark, fontSize: '15px', fontWeight: 700, margin: '0 0 8px' }}>Mode actuel</p>
            <div style={{ background: isPost ? '#E6F0FA' : '#E4F5EC', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: isPost ? '#1A4A7A' : C.greenDark, fontSize: '14px', fontWeight: 700, margin: '0 0 2px' }}>
                  {isPost ? 'Post-partum' : 'Grossesse'}
                </p>
                <p style={{ color: isPost ? '#2E5F8A' : '#0A5030', fontSize: '12px', margin: 0 }}>
                  {isPost ? `Mois ${Math.min(11, Math.floor(Math.abs(joursRestants ?? 0) / 30)) + 1} avec bébé` : `Semaine ${saReelle} · ${joursRestants} jours avant la DPA`}
                </p>
              </div>
              <a href="/dashboard" style={{ background: isPost ? '#1A4A7A' : C.greenDark, color: C.white, padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                Mon espace
              </a>
            </div>
          </>
        )}

        {/* Informations personnelles */}
        {card(
          <>
            <p style={{ color: C.dark, fontSize: '15px', fontWeight: 700, margin: '0 0 20px' }}>Informations personnelles</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                {label('Prénom')}
                {input(prenom, setPrenom, { placeholder: 'Ton prénom' })}
              </div>
              <div>
                {label('Date prévue d\'accouchement')}
                {input(dpa, setDpa, { type: 'date' })}
              </div>
              <div>
                {label('Adresse email')}
                {input(email, setEmail, { type: 'email', placeholder: 'ton@email.fr' })}
              </div>
              <button
                onClick={saveInfos}
                disabled={saving}
                style={{ background: saved ? C.greenDark : C.dark, color: C.white, border: 'none', padding: '13px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
              >
                {saved ? 'Enregistré !' : saving ? 'Sauvegarde...' : 'Enregistrer'}
              </button>
            </div>
          </>
        )}

        {/* Mot de passe */}
        {card(
          <>
            <p style={{ color: C.dark, fontSize: '15px', fontWeight: 700, margin: '0 0 20px' }}>Mot de passe</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                {label('Mot de passe actuel')}
                {input(oldPwd, setOldPwd, { type: 'password', placeholder: '••••••••' })}
              </div>
              <div>
                {label('Nouveau mot de passe')}
                {input(newPwd, setNewPwd, { type: 'password', placeholder: 'Minimum 8 caractères' })}
              </div>
              <div>
                {label('Confirmer le nouveau mot de passe')}
                {input(newPwd2, setNewPwd2, { type: 'password', placeholder: '••••••••' })}
              </div>
              {pwdMsg && (
                <p style={{ color: pwdMsg.includes('jour') ? C.greenDark : C.redDark, fontSize: '13px', margin: 0, fontWeight: 600 }}>{pwdMsg}</p>
              )}
              <button
                onClick={changePassword}
                disabled={pwdLoading || !oldPwd || !newPwd || !newPwd2}
                style={{ background: pwdLoading || !oldPwd || !newPwd || !newPwd2 ? '#ccc' : C.blue, color: C.white, border: 'none', padding: '13px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: pwdLoading || !oldPwd || !newPwd || !newPwd2 ? 'not-allowed' : 'pointer' }}
              >
                {pwdLoading ? 'Mise à jour...' : 'Changer le mot de passe'}
              </button>
            </div>
          </>
        )}

        {/* Abonnement */}
        {card(
          <>
            <p style={{ color: C.dark, fontSize: '15px', fontWeight: 700, margin: '0 0 16px' }}>Abonnement</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: C.cream, borderRadius: '12px', marginBottom: '12px' }}>
              <div>
                <p style={{ color: C.dark, fontSize: '14px', fontWeight: 600, margin: '0 0 4px' }}>DadUp Annuel</p>
                <p style={{ color: C.textLight, fontSize: '12px', margin: 0 }}>
                  {'35,99€/an · Accès complet'}
                  {endDate && (
                    <> jusqu&apos;au {new Date(endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</>
                  )}
                </p>
              </div>
              <span style={{ background: '#E4F5EC', color: C.greenDark, fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>Actif</span>
            </div>
            <a href="/contact-app" style={{ display: 'block', color: C.textLight, fontSize: '13px', textDecoration: 'none', margin: '0 0 8px' }}>
              Un problème avec ton abonnement ? <span style={{ color: C.blue, fontWeight: 600 }}>Contacte-nous</span>
            </a>
          </>
        )}

        {/* Zone danger */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '20px', textAlign: 'center' }}>
          <a href="/cancel" style={{ color: '#c8c4bc', fontSize: '12px', textDecoration: 'none' }}>Se désinscrire</a>
        </div>

      </div>
    </main>
  );
}
