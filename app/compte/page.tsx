'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '../components/Logo';

const C = {
  dark: '#15263A', gold: '#B4593A', cream: '#F6F1E9', white: '#ffffff',
  border: '#E6E0D5', text: '#15263A', textLight: '#56616B',
  blue: '#1A3D5C', blueDark: '#1A3D5C', green: '#2F4F3E', greenPale: '#E4F5EC',
};

function parseLocalDate(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function inputStyle(disabled = false) {
  return {
    width: '100%', background: disabled ? '#EDE8E0' : C.cream,
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
  const [saReelle, setSaReelle]   = useState<number | null>(null);
  const [joursRestants, setJoursRestants] = useState<number | null>(null);
  const [isPost, setIsPost]   = useState(() => typeof window !== 'undefined' ? localStorage.getItem('dadup_is_post') === '1' : false);
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
      // Naissance déclarée = dpa_originale renseignée en base
      setIsPost(!!user.dpa_originale);



      if (user.dpa) {
        const jr = Math.round((parseLocalDate(user.dpa).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / (1000*60*60*24));
        setJoursRestants(jr);
        if (!user.dpa_originale) setSaReelle(Math.max(3, Math.min(41, Math.round(41 - jr / 7))));
      }

      const missions = JSON.parse(localStorage.getItem('dadup_missions') || '{}');
      setMissionsCount(Object.values(missions).filter(Boolean).length);

      const rdvDates = JSON.parse(localStorage.getItem('dadup_rdv_dates') || '{}');
      setRdvCount(Object.keys(rdvDates).length);

      // isPost vient du compte (dpa_originale), voir plus haut
      setLoading(false);
    }).catch(() => router.push('/login'));
  }, []);

  const tri = (saReelle || 0) <= 14 ? 'T1' : (saReelle || 0) <= 27 ? 'T2' : 'T3';
  const prog = isPost ? 100 : Math.min(100, Math.round(((saReelle || 0) / 41) * 100));

  const saveInfos = async () => {
    setSaving(true);
    setInfoMsg('');
    try {
      const body: Record<string, string> = { prenom };
      if (dpa) {
        // Grossesse : DPA dans les 10 prochains mois (1 mois de marge) ; post-partum : date de naissance des 13 derniers mois
        const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        const decaler = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return iso(d); };
        const [min, max] = isPost ? [decaler(-13), iso(new Date())] : [decaler(-1), decaler(10)];
        if (dpa < min || dpa > max) {
          setInfoMsg(isPost ? 'La date de naissance doit se situer dans les 13 derniers mois.' : 'La DPA doit se situer dans les 10 prochains mois.');
          return;
        }
        body.dpa = dpa;
        body.dpa_modif_increment = 'true';
      }
      const res = await fetch('/api/auth/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) { setInfoMsg('Erreur lors de la sauvegarde.'); return; }
      if (prenom) localStorage.setItem('dadup_prenom', prenom);
      if (dpa) {
        localStorage.setItem('dadup_dpa', dpa);

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

  // La déclaration (et le retour en mode grossesse) se fait dans la fenêtre du tableau de bord
  const declareNaissance = () => {
    window.location.href = '/dashboard?tab=home&naissance=1';
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
    <div style={{ minHeight: '100vh', background: C.cream, fontFamily: 'inherit' }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;} .g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;} @media(max-width:600px){.g2{grid-template-columns:1fr!important;}}`}</style>

      {/* NAV */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Logo fond="creme" hauteur={30} />
        </a>
        <a href="/dashboard" style={{ color: C.textLight, fontSize: '14px', fontWeight: 700, textDecoration: 'none', minHeight: '44px', display: 'flex', alignItems: 'center' }}>← Retour à l'accueil</a>
      </nav>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 20px 60px' }}>

        {/* HEADER AVATAR */}
        <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, color: '#ffffff', flexShrink: 0 }}>
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
            <p style={{ color: C.textLight, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 16px' }}>Progression</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
              <div>
                <p style={{ fontSize: '32px', fontWeight: 800, color: C.dark, margin: 0, lineHeight: 1 }}>{isPost ? 'Post-partum' : `SA ${saReelle}`}</p>
                <p style={{ fontSize: '12px', color: C.textLight, margin: '4px 0 0' }}>{isPost ? 'Bébé est né' : `Trimestre ${tri}`}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="tabular" style={{ fontSize: '22px', fontWeight: 800, color: C.dark, margin: 0 }}>{isPost ? 'Terminé' : `${joursRestants} jours`}</p>
                <p style={{ fontSize: '12px', color: C.textLight, margin: '4px 0 0' }}>{isPost ? '' : 'avant la DPA'}</p>
              </div>
            </div>
            <div style={{ background: '#E8EEE5', borderRadius: '99px', height: '10px', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(90deg,#1A3D5C,#24507A)', width: `${prog}%`, height: '100%', borderRadius: '99px', transition: 'width 0.5s' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '12px', color: C.textLight }}>SA 3</span>
              <span style={{ fontSize: '12px', color: C.dark, fontWeight: 800 }}>{prog} %</span>
              <span style={{ fontSize: '12px', color: C.textLight }}>SA 41</span>
            </div>
          </div>
        )}

        {/* STATS RAPIDES */}
        <div className="g2" style={{ marginBottom: '16px' }}>
          <div style={{ background: C.white, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}`, textAlign: 'center' }}>
            <p style={{ fontSize: '28px', fontWeight: 800, color: C.green, margin: 0 }}>{missionsCount}</p>
            <p style={{ fontSize: '12px', color: C.textLight, margin: '4px 0 0' }}>missions complétées</p>
          </div>
          <div style={{ background: C.white, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}`, textAlign: 'center' }}>
            <p style={{ fontSize: '28px', fontWeight: 800, color: C.blueDark, margin: 0 }}>{rdvCount}</p>
            <p style={{ fontSize: '12px', color: C.textLight, margin: '4px 0 0' }}>rendez-vous notés</p>
          </div>
        </div>

        {/* INFORMATIONS PERSONNELLES */}
        <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>
          <p style={{ color: C.textLight, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 20px' }}>Informations personnelles</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Prénom</label>
              <input type="text" aria-label="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} style={inputStyle()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Adresse email</label>
              <input type="email" aria-label="Email" value={email} readOnly disabled style={inputStyle(true)} />
              <p style={{ color: C.textLight, fontSize: '12px', margin: '6px 0 0', lineHeight: 1.5 }}>Pour changer d&apos;adresse email, écris-nous à <a href="mailto:hello@dadup.fr" style={{ color: C.blue }}>hello@dadup.fr</a>.</p>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>
                Date prévue d'accouchement
                
              </label>
              {false ? (
                <div>
                  <input type="date" aria-label="Date prévue d'accouchement" value={dpa} disabled style={inputStyle(true)} />
                  <p style={{ color: C.textLight, fontSize: '12px', margin: '6px 0 0', lineHeight: 1.5 }}>
                    Tu as déjà modifié ta DPA. Pour toute correction, écris-nous à <a href="mailto:hello@dadup.fr" style={{ color: C.blue }}>hello@dadup.fr</a>
                  </p>
                </div>
              ) : (
                <input type="date" aria-label="Date prévue d'accouchement" value={dpa} onChange={e => setDpa(e.target.value)} style={inputStyle()} />
              )}
            </div>
          </div>

          {infoMsg && <p style={{ color: '#B42318', fontSize: '13px', margin: '12px 0 0' }}>{infoMsg}</p>}

          <button onClick={saveInfos} disabled={saving} style={{ marginTop: '20px', background: 'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)', color: C.white, border: 'none', minHeight: '48px', padding: '14px', borderRadius:'14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            {saving ? 'Sauvegarde...' : saved ? 'Sauvegardé ✓' : 'Enregistrer'}
          </button>
        </div>

        {/* MOT DE PASSE */}
        <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>
          <p style={{ color: C.textLight, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 20px' }}>Changer le mot de passe</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Mot de passe actuel</label>
              <input type="password" aria-label="Mot de passe actuel" value={oldPwd} onChange={e => setOldPwd(e.target.value)} style={inputStyle()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Nouveau mot de passe</label>
              <input type="password" aria-label="Nouveau mot de passe" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="8 caractères minimum" style={inputStyle()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>Confirmer le nouveau mot de passe</label>
              <input type="password" aria-label="Confirme le nouveau mot de passe" value={newPwd2} onChange={e => setNewPwd2(e.target.value)} style={inputStyle()} />
            </div>
          </div>
          {pwdMsg && <p style={{ color: pwdMsg.includes('jour') ? C.green : '#B42318', fontSize: '13px', margin: '12px 0 0' }}>{pwdMsg}</p>}
          <button onClick={changePassword} disabled={pwdLoading} style={{ marginTop: '20px', background: 'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)', color: C.white, border: 'none', minHeight: '48px', padding: '14px', borderRadius:'14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            {pwdLoading ? 'Mise à jour...' : 'Changer le mot de passe'}
          </button>
        </div>


        {/* DÉCLARER LA NAISSANCE */}
        <div style={{ background: C.white, borderRadius: '20px', padding: '24px', border: `1px solid ${C.border}`, marginBottom: '16px' }}>
          <p style={{ color: C.textLight, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>Étape importante</p>
          <p style={{ color: C.dark, fontSize: '14px', margin: '0 0 16px', lineHeight: 1.6 }}>
            {isPost ? 'Tu es en mode post-partum. Tu peux revenir en mode grossesse si besoin.' : 'Quand bébé arrive, indique-le ici pour accéder au contenu de la première année.'}
          </p>
          <button
            onClick={declareNaissance}
            style={{ background: '#F6F1E9', color: '#15263A', border: '1px solid #E6E0D5', minHeight: '48px', padding: '14px', borderRadius:'14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', width: '100%' }}
          >
            {isPost ? 'Revenir en mode grossesse' : 'Bébé est né'}
          </button>
        </div>
        {/* DECONNEXION */}
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <button onClick={logout} style={{ background: 'none', border: 'none', color: C.textLight, fontSize: '14px', cursor: 'pointer', minHeight: '44px', padding: '10px 16px' }}>
            Se déconnecter
          </button>
        </div>

      </div>
    </div>
  );
}
