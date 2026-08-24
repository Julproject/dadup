'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', blueDark: '#1A3D5C', green: '#0D6B40', greenPale: '#E4F5EC',
};

function parseLocalDate(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function inputStyle(disabled = false) {
  return {
    width: '100%', background: disabled ? '#f0ede8' : C.cream,
    border: `1.5px solid ${C.border}`, borderRadius: '12px',
    padding: '12px 16px', fontSize: '14px', color: disabled ? C.textLight : C.dark,
    outline: 'none', fontFamily: 'inherit', cursor: disabled ? 'not-allowed' : 'text',
  };
}

export default function ComptePage() {
  const router = useRouter();

  const [prenom, setPrenom]   = useState('');
  const [email, setEmail]     = useState('');
  const [dpa, setDpa]         = useState('');
  const [dpaOriginale, setDpaOriginale] = useState('');
  const [dpaModifiee, setDpaModifiee]   = useState(false);
  const [saReelle, setSaReelle]   = useState<number | null>(null);
  const [joursRestants, setJoursRestants] = useState<number | null>(null);
  const [isPost, setIsPost]   = useState(() => typeof window !== 'undefined' ? localStorage.getItem('dadup_is_post') === '1' : false);
  const [retourCount] = useState(() => typeof window !== 'undefined' ? parseInt(localStorage.getItem('dadup_retour_count') || '0') : 0);
  const [missionsCount, setMissionsCount] = useState(0);
  const [rdvCount, setRdvCount] = useState(0);

  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [infoMsg, setInfoMsg] = useState('');

  const [oldPwd, setOldPwd]   = useState('');
  const [newPwd, setNewPwd]   = useState('');
  const [newPwd2, setNewPwd2] = useState('');
  const [pwdMsg, setPwdMsg]   = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(({ user }) => {
      if (!user) { router.push('/login'); return; }
      setPrenom(user.prenom || '');
      setEmail(user.email || '');
      setDpa(user.dpa || '');
      setDpaOriginale(user.dpa_originale || '');

      const dpaModifCount = parseInt(localStorage.getItem('dadup_dpa_modif_count') || '0');
      const dpaModif = dpaModifCount >= 3;
      setDpaModifiee(dpaModif);

      if (user.dpa) {
        const jr = Math.round((parseLocalDate(user.dpa).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / (1000*60*60*24));
        setJoursRestants(jr);
        const post = jr < 0;
        setIsPost(post);
        if (!post) setSaReelle(Math.max(3, Math.min(42, Math.round(40 - jr / 7))));
      }

      const missions = JSON.parse(localStorage.getItem('dadup_missions') || '{}');
      setMissionsCount(Object.values(missions).filter(Boolean).length);

      const rdvDates = JSON.parse(localStorage.getItem('dadup_rdv_dates') || '{}');
      setRdvCount(Object.keys(rdvDates).length);

      // isPost basé sur flag localStorage, pas sur la DPA
      setLoading(false);
    }).catch(() => router.push('/login'));
  }, []);

  const tri = (saReelle || 0) <= 14 ? 'T1' : (saReelle || 0) <= 27 ? 'T2' : 'T3';
  const prog = isPost ? 100 : Math.min(100, Math.round(((saReelle || 0) / 40) * 100));

  const saveInfos = async () => {
    setSaving(true);
    setInfoMsg('');
    try {
      const body: Record<string, string> = { prenom, email };
      if (!dpaModifiee && dpa) {
        body.dpa = dpa;
        body.dpa_originale = dpa;
      }
      const res = await fetch('/api/auth/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) { setInfoMsg('Erreur lors de la sauvegarde.'); return; }
      if (prenom) localStorage.setItem('dadup_prenom', prenom);
      if (!dpaModifiee && dpa) {
        localStorage.setItem('dadup_dpa', dpa);
        const newCount = parseInt(localStorage.getItem('dadup_dpa_modif_count') || '0') + 1;
        localStorage.setItem('dadup_dpa_modif_count', String(newCount));
        if (newCount >= 3) setDpaModifiee(true);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setInfoMsg('Erreur. Réessaie.');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (newPwd !== newPwd2) { setPwdMsg('Les mots de passe ne correspondent pas.'); return; }
    if (newPwd.length < 8) { setPwdMsg('Minimum 8 caractères.'); return; }
    setPwdLoading(true); setPwdMsg('');
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd }),
      });
      const data = await res.json();
      if (!res.ok) setPwdMsg(data.error || 'Erreur.');
      else { setPwdMsg('Mot de passe mis à jour.'); setOldPwd(''); setNewPwd(''); setNewPwd2(''); }
    } catch { setPwdMsg('Erreur serveur.'); }
    finally { setPwdLoading(false); }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.clear();
    router.push('/login');
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: C.textLight, fontSize: '14px' }}>Chargement...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;} .g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;} @media(max-width:600px){.g2{grid-template-columns:1fr!important;}}`}</style>

      {/* NAV */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg viewBox="0 0 300 300" width="30" height="30"><circle cx="150" cy="150" r="145" fill="#1A3D5C"/><circle cx="150" cy="150" r="122" fill="#2E5F8A"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/><circle cx="150" cy="128" r="26" fill="#F7FAFC"/></svg>
          <span style={{ fontWeight: 800, color: C.dark, fontSize: '18px' }}>DadUp</span>
        </a>
        <a href="/dashboard" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>← Retour à l'accueil</a>
      </nav>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 20px 60px' }}>

        {/* HEADER AVATAR */}
        <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: C.blueDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700, color: C.gold, flexShrink: 0 }}>
            {prenom ? prenom[0].toUpperCase() : 'D'}
          </div>
          <div>
            <p style={{ fontSize: '18px', fontWeight: 800, color: C.dark, margin: '0 0 2px' }}>{prenom || 'Mon compte'}</p>
            <p style={{ fontSize: '13px', color: C.textLight, margin: 0 }}>{email}</p>
          </div>
        </div>

        {/* PROGRESSION */}
        {dpa && (
          <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>
            <p style={{ color: C.textLight, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 16px' }}>Progression</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
              <div>
                <p style={{ fontSize: '32px', fontWeight: 800, color: C.dark, margin: 0, lineHeight: 1 }}>{isPost ? 'Post-partum' : `SA ${saReelle}`}</p>
                <p style={{ fontSize: '12px', color: C.textLight, margin: '4px 0 0' }}>{isPost ? 'Bébé est né' : `Trimestre ${tri}`}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: C.gold, margin: 0 }}>{isPost ? 'Terminé' : `${joursRestants} jours`}</p>
                <p style={{ fontSize: '12px', color: C.textLight, margin: '4px 0 0' }}>{isPost ? '' : 'avant la DPA'}</p>
              </div>
            </div>
            <div style={{ background: '#f0ede8', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
              <div style={{ background: C.gold, width: `${prog}%`, height: '100%', borderRadius: '99px', transition: 'width 0.5s' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '11px', color: C.textLight }}>SA 3</span>
              <span style={{ fontSize: '11px', color: C.gold, fontWeight: 700 }}>{prog}%</span>
              <span style={{ fontSize: '11px', color: C.textLight }}>SA 41</span>
            </div>
          </div>
        )}

        {/* STATS RAPIDES */}
        <div className="g2" style={{ marginBottom: '16px' }}>
          <div style={{ background: C.white, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}`, textAlign: 'center' }}>
            <p style={{ fontSize: '28px', fontWeight: 800, color: C.green, margin: 0 }}>{missionsCount}</p>
            <p style={{ fontSize: '11px', color: C.textLight, margin: '4px 0 0' }}>missions complétées</p>
          </div>
          <div style={{ background: C.white, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}`, textAlign: 'center' }}>
            <p style={{ fontSize: '28px', fontWeight: 800, color: C.blue, margin: 0 }}>{rdvCount}</p>
            <p style={{ fontSize: '11px', color: C.textLight, margin: '4px 0 0' }}>rendez-vous notés</p>
          </div>
        </div>

        {/* INFORMATIONS PERSONNELLES */}
        <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>
          <p style={{ color: C.textLight, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 20px' }}>Informations personnelles</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Prénom</label>
              <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} style={inputStyle()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Adresse email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>
                Date prévue d'accouchement
                {dpaModifiee ? <span style={{ color: C.textLight, fontWeight: 400, marginLeft: '8px' }}>· limite atteinte</span> : dpa !== dpaOriginale && <span style={{ color: C.textLight, fontWeight: 400, marginLeft: '8px' }}>· modifiable encore {3 - (parseInt(localStorage.getItem('dadup_dpa_modif_count') || '0'))} fois</span>}
              </label>
              {dpaModifiee ? (
                <div>
                  <input type="date" value={dpa} disabled style={inputStyle(true)} />
                  <p style={{ color: C.textLight, fontSize: '12px', margin: '6px 0 0', lineHeight: 1.5 }}>
                    Tu as déjà modifié ta DPA. Pour toute correction, écris-nous à <a href="mailto:hello@dadup.fr" style={{ color: C.blue }}>hello@dadup.fr</a>
                  </p>
                </div>
              ) : (
                <input type="date" value={dpa} onChange={e => setDpa(e.target.value)} style={inputStyle()} />
              )}
            </div>
          </div>

          {infoMsg && <p style={{ color: '#c04a1a', fontSize: '13px', margin: '12px 0 0' }}>{infoMsg}</p>}

          <button onClick={saveInfos} disabled={saving} style={{ marginTop: '20px', background: C.dark, color: C.white, border: 'none', padding: '14px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            {saving ? 'Sauvegarde...' : saved ? 'Sauvegardé ✓' : 'Enregistrer'}
          </button>
        </div>

        {/* MOT DE PASSE */}
        <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>
          <p style={{ color: C.textLight, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 20px' }}>Changer le mot de passe</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Mot de passe actuel</label>
              <input type="password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} style={inputStyle()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Nouveau mot de passe</label>
              <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="8 caractères minimum" style={inputStyle()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Confirmer le nouveau mot de passe</label>
              <input type="password" value={newPwd2} onChange={e => setNewPwd2(e.target.value)} style={inputStyle()} />
            </div>
          </div>
          {pwdMsg && <p style={{ color: pwdMsg.includes('jour') ? C.green : '#c04a1a', fontSize: '13px', margin: '12px 0 0' }}>{pwdMsg}</p>}
          <button onClick={changePassword} disabled={pwdLoading} style={{ marginTop: '20px', background: C.dark, color: C.white, border: 'none', padding: '14px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            {pwdLoading ? 'Mise à jour...' : 'Changer le mot de passe'}
          </button>
        </div>


        {/* DÉCLARER LA NAISSANCE */}
        <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>
          <p style={{ color: C.textLight, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>Étape importante</p>
          <p style={{ color: C.dark, fontSize: '14px', margin: '0 0 16px', lineHeight: 1.6 }}>
            {isPost ? 'Tu es en mode post-partum. Tu peux revenir en mode grossesse si besoin.' : 'Quand bébé arrive, indique-le ici pour accéder au contenu de la première année.'}
          </p>
          <button
            onClick={() => { if (!(isPost && retourCount >= 2)) window.dispatchEvent(new CustomEvent('dadup:declareNaissance')); }}
            style={{ background: isPost ? '#E4F5EC' : '#EDE8FF', color: isPost ? '#0D6B40' : '#6B4FBB', border: 'none', padding: '14px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', width: '100%' }}
          >
            {isPost ? (retourCount < 2 ? 'Revenir en mode grossesse' : 'Accès post-partum actif') : 'Bébé est né !'}
          </button>
        </div>
        {/* DECONNEXION */}
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <button onClick={logout} style={{ background: 'none', border: 'none', color: C.textLight, fontSize: '13px', cursor: 'pointer' }}>
            Se déconnecter
          </button>
        </div>

      </div>
    </div>
  );
}
