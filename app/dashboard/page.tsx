'use client';

import { useState, useEffect, Suspense } from 'react';
import ChatBubble from './components/ChatBubble';
import CelebrationNaissance from './components/CelebrationNaissance';
import { useSearchParams } from 'next/navigation';

// ── Data ──────────────────────────────────────────────────────────────────────
import { SD }                  from './data/semaines';
import { MISSIONS }            from './data/missions';
import { RDV_LIST }            from './data/rdv';
import { PARTENAIRES }         from './data/partenaires';
import { MOIS_DATA }           from './components/postpartum/data/mois';
import { getIdee }             from './data/mois';

// ── Components ────────────────────────────────────────────────────────────────
import dynamic       from 'next/dynamic';
import Onboarding    from './components/Onboarding';
import Topbar        from './components/Topbar';
import PWABanner     from './components/PWABanner';
import Accueil       from './components/Accueil';

// Chargement différé, réduit le bundle initial et accélère le démarrage
const BebePage     = dynamic(() => import('./components/BebePage'));
const PreparerHub  = dynamic(() => import('./components/PreparerHub'));
const ToiPage      = dynamic(() => import('./components/ToiPage'));
const PlusPage     = dynamic(() => import('./components/PlusPage'));
const PostAccueil  = dynamic(() => import('./components/postpartum/PostAccueil'));
const PostBebe     = dynamic(() => import('./components/postpartum/PostBebe'));
const PostRDV      = dynamic(() => import('./components/postpartum/PostRDV'));
const SuiviBebe      = dynamic(() => import('./components/postpartum/SuiviBebe'));
const AtelierBebe    = dynamic(() => import('./components/postpartum/AtelierBebe'));
const DicoPapa       = dynamic(() => import('./components/DicoPapa'));

// Écrans regroupés sous l'onglet « Préparer » (grossesse)
const PREPARER_TABS = ['rdv', 'pratique', 'valise', 'maison', 'admin', 'jourj'];

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  dark:'#15263A', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#C9D8C4',
  white:'#ffffff', border:'#E6E0D5', text:'#15263A', textLight:'#56616B',
  muted:'#56616B', orange:'#FFF0E6', green:'#E4F5EC', amber:'#FFF7E0',
  teal:'#E0F5F0', coral:'#FDECEA', blueLight:'#E6F0FA', cream:'#F6F1E9',
};

// Parse une date "YYYY-MM-DD" en heure LOCALE (pas UTC)
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d); // mois 0-indexé, heure locale
}

// Nombre de jours entre aujourd'hui (minuit local) et la DPA (minuit local)
// Date du jour (ou donnée) au format AAAA-MM-JJ, en heure locale
function isoLocal(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function joursAvantDpa(dateStr: string): number {
  const dpaLocal = parseLocalDate(dateStr);
  const aujourdhuiLocal = new Date();
  aujourdhuiLocal.setHours(0, 0, 0, 0);
  dpaLocal.setHours(0, 0, 0, 0);
  return Math.round((dpaLocal.getTime() - aujourdhuiLocal.getTime()) / (1000 * 60 * 60 * 24));
}

// Lire le localStorage de façon sécurisée (SSR safe)
function readLS(key: string): string {
  try { return localStorage.getItem(key) || ''; } catch { return ''; }
}
function readLSJson<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

// ── DashboardContent ──────────────────────────────────────────────────────────
function DashboardContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const handler = () => setShowConfirmNaissance(true);
    window.addEventListener('dadup:declareNaissance', handler);
    return () => window.removeEventListener('dadup:declareNaissance', handler);
  }, []);


  // Initialisation immédiate depuis localStorage → affichage instantané à chaque refresh
  const [activeTab,            setActiveTabRaw]       = useState('home');
  const [dpa,                  setDpa]                = useState(() => readLS('dadup_dpa'));
  const [prenom,               setPrenom]             = useState(() => readLS('dadup_prenom'));
  const [showOnboarding,       setShowOnboarding]     = useState(false);
  const [valiseChecked,        setValiseChecked]      = useState<Record<string,boolean>>(() => readLSJson('dadup_valise', {}));
  const [missionsChecked,      setMissionsChecked]    = useState<Record<string,boolean>>(() => readLSJson('dadup_missions', {}));
  const [rdvDates,             setRdvDates]           = useState<Record<number,string>>(() => readLSJson('dadup_rdv_dates', {}));
  const [avance,               setAvance]             = useState(0);
  const [nextRdvDate,          setNextRdvDate]        = useState(() => readLS('dadup_next_rdv'));
  const [rdvOuvert,            setRdvOuvert]          = useState<number|null>(null);
  const [achatChecked,         setAchatChecked]       = useState<Record<string,boolean>>(() => readLSJson('dadup_achats', {}));
  const [showConfirmNaissance, setShowConfirmNaissance] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [dpaOriginale,         setDpaOriginale]       = useState(() => readLS('dadup_dpa_originale'));
  const [dateNaissance,        setDateNaissance]      = useState(() => isoLocal(new Date()));

  // Routing par URL
  const setActiveTab = (tab: string) => {
    setActiveTabRaw(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // Validation + sync depuis Supabase (source de vérité)
  // Le localStorage affiche immédiatement, Supabase corrige si besoin
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get('tab');
    if (tabFromUrl) setActiveTabRaw(tabFromUrl);
    if (params.get('naissance') === '1') setShowConfirmNaissance(true);

    fetch('/api/auth/me')
      .then(r => r.json())
      .then(({ user }) => {
        if (!user) { window.location.href = '/login'; return; }
        const p = user.prenom || '';
        const d = user.dpa    || '';

        // Mettre à jour l'état ET le localStorage avec les données Supabase (source de vérité)
        setPrenom(p);
        setDpa(d);
        if (p) localStorage.setItem('dadup_prenom', p);
        if (d) localStorage.setItem('dadup_dpa', d);
        else   localStorage.removeItem('dadup_dpa');

        // Données étendues
        const vc = user.valise_checked    || {};
        const mc = user.missions_checked  || {};
        const rd = user.rdv_dates         || {};
        const nr = user.next_rdv          || '';
        const ac = user.achats_checked    || {};
        setValiseChecked(vc);
        setMissionsChecked(mc);
        setRdvDates(rd);
        setNextRdvDate(nr);
        setAchatChecked(ac);
        localStorage.setItem('dadup_valise',    JSON.stringify(vc));
        localStorage.setItem('dadup_missions',  JSON.stringify(mc));
        localStorage.setItem('dadup_rdv_dates', JSON.stringify(rd));
        localStorage.setItem('dadup_next_rdv',  nr);
        localStorage.setItem('dadup_achats',    JSON.stringify(ac));

        // Naissance déclarée = dpa_originale renseignée en base (source de vérité, tous appareils)
        const naissanceDeclaree = !!user.dpa_originale;
        setDpaOriginale(user.dpa_originale || '');
        setIsPostFlag(naissanceDeclaree);
        if (naissanceDeclaree) {
          localStorage.setItem('dadup_dpa_originale', user.dpa_originale);
          localStorage.setItem('dadup_is_post', '1');
        } else {
          localStorage.removeItem('dadup_dpa_originale');
          localStorage.removeItem('dadup_is_post');
        }

        // Onboarding seulement si vraiment pas de DPA en base ET pas en local
        if (!d && !readLS('dadup_dpa')) setShowOnboarding(true);
      })
      .catch(() => {
        // Si Supabase échoue mais qu'on a des données en local, on reste connecté
        const localDpa    = readLS('dadup_dpa');
        const localPrenom = readLS('dadup_prenom');
        if (!localDpa && !localPrenom) {
          window.location.href = '/login';
        }
        // Sinon on garde ce qu'on a en local, l'utilisateur voit son contenu
      });
  }, []);

  const saveData = async (patch: Record<string, unknown>) => {
    await fetch('/api/auth/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
  };

  const toggleV = (id: string) => {
    const next = { ...valiseChecked, [id]: !valiseChecked[id] };
    setValiseChecked(next);
    saveData({ valise_checked: next });
  };

  const toggleM = (id: string) => {
    const next = { ...missionsChecked, [id]: !missionsChecked[id] };
    setMissionsChecked(next);
    saveData({ missions_checked: next });
  };

  const toggleA = (id: string) => {
    const next = { ...achatChecked, [id]: !achatChecked[id] };
    setAchatChecked(next);
    saveData({ achats_checked: next });
  };

  const saveRdv = (date: string) => {
    setNextRdvDate(date);
    saveData({ next_rdv: date });
  };

  const saveRdvI = (sa: number, date: string) => {
    const next = { ...rdvDates, [sa]: date };
    setRdvDates(next);
    saveData({ rdv_dates: next });
  };

  const declareNaissance = async () => {
    setShowConfirmNaissance(false);

    if (isPost) {
      // ── RETOUR EN MODE GROSSESSE ──────────────────────────────────────────
      const dpaRestore = dpaOriginale
        || localStorage.getItem('dadup_dpa_originale')
        || localStorage.getItem('dadup_dpa_backup')
        || '';
      if (!dpaRestore) {
        alert('Impossible de retrouver ta date d\'accouchement. Saisis-la dans les réglages.');
        return;
      }
      setDpa(dpaRestore);
      setDpaOriginale('');
      localStorage.setItem('dadup_dpa', dpaRestore);
      localStorage.removeItem('dadup_is_post');
      setIsPostFlag(false);
      localStorage.removeItem('dadup_dpa_originale');
      localStorage.removeItem('dadup_dpa_backup');
      await saveData({ dpa: dpaRestore, dpa_originale: null });
      setActiveTab('home');

    } else {
      // ── BASCULE EN POST-PARTUM ────────────────────────────────────────────
      // La date de naissance devient la référence du post-partum ;
      // la DPA est gardée dans dpa_originale (ce qui marque aussi la naissance comme déclarée)
      const aujourdhui = isoLocal(new Date());
      const dpaPostPartum = dateNaissance && dateNaissance <= aujourdhui ? dateNaissance : aujourdhui;
      const dpaCourante = dpa || dpaPostPartum;
      setDpaOriginale(dpaCourante);
      localStorage.setItem('dadup_dpa_originale', dpaCourante);
      localStorage.setItem('dadup_dpa_backup', dpaCourante);

      setDpa(dpaPostPartum);
      localStorage.setItem('dadup_dpa', dpaPostPartum);
      localStorage.setItem('dadup_is_post', '1');
      setIsPostFlag(true);
      await saveData({ dpa: dpaPostPartum, dpa_originale: dpaCourante, naissance_count_increment: true });
      setShowCelebration(true);
      setActiveTab('home');
    }
  };

  // ── Calculs dérivés, tout depuis le state `dpa` en heure locale ──────────
  const joursRestants = dpa ? joursAvantDpa(dpa) : null;
  const [isPostFlag, setIsPostFlag] = useState(() => readLS('dadup_is_post') === '1');
  const isPost = isPostFlag;

  const saReelle = !isPost && dpa
    ? Math.max(3, Math.min(41, Math.round(41 - (joursRestants ?? 0) / 7)))
    : null;
  const sa = !isPost && dpa
    ? Math.max(3, Math.min(41, Math.round(41 - (joursRestants ?? 0) / 7) + avance))
    : null;

  const data      = sa       ? (SD[sa]       || SD[20]) : null;
  const dataR     = saReelle ? (SD[saReelle] || SD[20]) : null;
  const prog      = isPost ? 100 : Math.min(100, Math.round(((saReelle||0)/41)*100));
  const tri       = (saReelle||0) <= 14 ? 'T1' : (saReelle||0) <= 27 ? 'T2' : 'T3';
  const idee      = getIdee(saReelle || 20);
  const missions  = saReelle ? (MISSIONS[saReelle] || MISSIONS[20] || []) : [];
  const nextRdv   = RDV_LIST.filter(r => saReelle && r.sa >= saReelle)[0];
  const moisBebe  = isPost ? Math.min(11, Math.floor(Math.abs(joursRestants||0) / 30)) : 0;
  const dataBebe  = MOIS_DATA[moisBebe];

  // Props partagées entre tous les composants
  const shared = {
    C, isPost, dpa, prenom, saReelle, joursRestants, prog, tri,
    moisBebe, dataBebe, idee, missions, missionsChecked, toggleM,
    nextRdv, nextRdvDate, saveRdv, dataR, data, sa, avance, setAvance,
    valiseChecked, toggleV, achatChecked, toggleA, rdvDates, saveRdvI, rdvOuvert, setRdvOuvert,
    MOIS_DATA, PARTENAIRES, RDV_LIST, SD,
  };

  if (showOnboarding) {
    return <Onboarding onSave={(d, p) => {
      localStorage.setItem('dadup_dpa', d);
      localStorage.setItem('dadup_prenom', p);
      setDpa(d); setPrenom(p);
      setShowOnboarding(false);
      saveData({ dpa: d, prenom: p });
    }} />;
  }

  return (
    <>
    <div style={{ minHeight: '100vh', background: '#F6F1E9', color: '#15263A', fontFamily: 'inherit' }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        input[type=date]{-webkit-appearance:none;appearance:none;display:block;width:100%;max-width:100%;min-width:0;min-height:44px;text-align:left;}
        input[type=date]::-webkit-date-and-time-value{text-align:left;}
        body{-webkit-font-smoothing:antialiased;}
        .dd-c{max-width:1080px;margin:0 auto;padding:32px 36px;}
        .dd-g2col{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .dd-mg{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .dd-g3col{display:grid;grid-template-columns:1fr 1fr 1fr;}
        .dd-stats{display:grid;grid-template-columns:1fr 1fr 1fr;}
        @media(max-width:860px){
          .dd-g2col,.dd-mg{grid-template-columns:1fr!important;}
          .dd-g3col{grid-template-columns:1fr 1fr!important;}
          .dd-stats{display:flex!important;flex-direction:row!important;border-radius:12px!important;overflow:hidden!important;}
          .dd-c{padding:16px 16px 110px!important;}
          .dd-g2col,.dd-mg{grid-template-columns:1fr!important;}
        }
      `}</style>

      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <Topbar
        prenom={prenom} dpa={dpa} saReelle={saReelle} tri={tri} prog={prog}
        isPost={isPost} moisBebe={moisBebe}
        activeTab={activeTab} setActiveTab={setActiveTab}
        onDeclareNaissance={() => setShowConfirmNaissance(true)}
      />

      <div className="dd-c" id="contenu" tabIndex={-1}>
        {activeTab === 'home'    && (isPost ? <PostAccueil  {...shared} setActiveTab={setActiveTab}/> : <Accueil      {...shared} setActiveTab={setActiveTab}/>)}
        {activeTab === 'bebe'    && (isPost ? <PostBebe     {...shared}/> : <BebePage     {...shared}/>)}
        {isPost  && activeTab === 'rdv'       && <PostRDV      {...shared}/>}
        {!isPost && PREPARER_TABS.includes(activeTab) && <PreparerHub {...shared} activeTab={activeTab} setActiveTab={setActiveTab}/>}
        {isPost  && activeTab === 'suivi'     && <SuiviBebe    C={C}/>}
        {!isPost && (activeTab === 'toi' || activeTab === 'psycho') && <ToiPage C={C} saReelle={saReelle}/>}
        {isPost  && activeTab === 'atelier'   && <AtelierBebe   C={C}/>}
        {activeTab === 'plus' && <PlusPage setActiveTab={setActiveTab}/>}
        {activeTab === 'dico' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button onClick={() => setActiveTab('plus')} style={{ alignSelf: 'flex-start', minHeight: '44px', background: '#ffffff', border: 'none', borderRadius: '24px', padding: '10px 18px', fontSize: '14px', fontWeight: 800, color: '#1A3D5C', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>← Plus</button>
            <DicoPapa C={C} isPost={isPost}/>
          </div>
        )}
      </div>

      {/* MODALE CONFIRMATION NAISSANCE */}
      {showConfirmNaissance && (
        <div role="dialog" aria-modal="true" aria-labelledby="dlg-naissance" style={{ position: 'fixed', inset: 0, background: 'rgba(12,29,46,0.6)', zIndex: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowConfirmNaissance(false)}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '360px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#DCE5D7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={isPost ? 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5' : 'M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z'} /></svg>
            </div>
            <h3 id="dlg-naissance" style={{ color: '#15263A', fontSize: '20px', fontWeight: 800, margin: '0 0 10px' }}>{isPost ? 'Retour en mode grossesse ?' : 'Bébé est né ?'}</h3>
            <p style={{ color: '#56616B', fontSize: '14px', lineHeight: 1.7, margin: isPost ? '0 0 24px' : '0 0 16px' }}>{isPost ? 'Tu reviendras à la dernière semaine de grossesse enregistrée. Ton suivi post-partum sera conservé.' : 'En confirmant, ton application bascule en mode post-naissance. Tu pourras suivre le développement de bébé mois par mois.'}</p>
            {!isPost && (
              <div style={{ textAlign: 'left', margin: '0 0 22px' }}>
                <label htmlFor="date-naissance" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#15263A', marginBottom: '6px' }}>Date de naissance</label>
                <input id="date-naissance" type="date" value={dateNaissance} max={isoLocal(new Date())} onChange={e => setDateNaissance(e.target.value)}
                  style={{ width: '100%', background: '#F6F1E9', border: '1px solid #E6E0D5', borderRadius: '12px', padding: '12px 14px', fontSize: '16px', color: '#15263A' }} />
              </div>
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowConfirmNaissance(false)} style={{ flex: 1, minHeight: '48px', padding: '13px', background: '#F6F1E9', border: '1px solid #E6E0D5', borderRadius: '14px', fontSize: '14px', fontWeight: 700, color: '#15263A', cursor: 'pointer' }}>Annuler</button>
              <button onClick={declareNaissance} style={{ flex: 2, minHeight: '48px', padding: '13px', background: 'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: 800, color: '#fff', cursor: 'pointer' }}>{isPost ? 'Revenir en mode grossesse' : 'Oui, bébé est né'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
    <ChatBubble />
    {showCelebration && <CelebrationNaissance prenom={prenom} onClose={() => setShowCelebration(false)} />}
    </>
  );
}

export default function DashboardPage() {
  return (
    <>
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#F6F1E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#5f6b72', fontSize: '14px' }}>Chargement...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  </>
  );
}
