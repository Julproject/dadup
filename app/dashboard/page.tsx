'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ── Data ──────────────────────────────────────────────────────────────────────
import { SD }                  from './data/semaines';
import { MISSIONS }            from './data/missions';
import { RDV_LIST }            from './data/rdv';
import { PARTENAIRES }         from './data/partenaires';
import { MOIS_DATA }           from './components/postpartum/data/mois';
import { getIdee }             from './data/mois';
import { getSA }               from './data/utils';

// ── Components ────────────────────────────────────────────────────────────────
import Onboarding    from './components/Onboarding';
import Topbar        from './components/Topbar';
import Accueil       from './components/Accueil';
import BebePage      from './components/BebePage';
import RDVPage       from './components/RDVPage';
import PreparerPage  from './components/PreparerPage';
import BonsPlansPage from './components/BonsPlansPage';
import PostAccueil   from './components/postpartum/PostAccueil';
import PostBebe      from './components/postpartum/PostBebe';
import PostRDV       from './components/postpartum/PostRDV';
import PsychoPage    from './components/PsychoPage';
import SuiviBebe     from './components/postpartum/SuiviBebe';

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  dark:'#1e2535', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#c8a060',
  white:'#ffffff', border:'#f0ede8', text:'#1e2535', textLight:'#6B8FA8',
  muted:'#9aa0a8', orange:'#FFF0E6', green:'#E4F5EC', amber:'#FFF7E0',
  teal:'#E0F5F0', coral:'#FDECEA', blueLight:'#E6F0FA', cream:'#f7f5f0',
};

// ── DashboardContent ──────────────────────────────────────────────────────────
function DashboardContent() {
  const searchParams = useSearchParams();

  const [activeTab,            setActiveTabRaw]       = useState('home');
  const [dpa,                  setDpa]                = useState('');
  const [prenom,               setPrenom]             = useState('');
  const [showOnboarding,       setShowOnboarding]     = useState(false);
  const [valiseChecked,        setValiseChecked]      = useState<Record<string,boolean>>({});
  const [missionsChecked,      setMissionsChecked]    = useState<Record<string,boolean>>({});
  const [rdvDates,             setRdvDates]           = useState<Record<number,string>>({});
  const [avance,               setAvance]             = useState(false);
  const [nextRdvDate,          setNextRdvDate]        = useState('');
  const [rdvOuvert,            setRdvOuvert]          = useState<number|null>(null);
  const [achatChecked,         setAchatChecked]       = useState<Record<string,boolean>>({});
  const [showConfirmNaissance, setShowConfirmNaissance] = useState(false);
  const [dpaOriginale,         setDpaOriginale]       = useState('');

  // Routing par URL
  const setActiveTab = (tab: string) => {
    setActiveTabRaw(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // Chargement depuis Supabase
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get('tab');
    if (tabFromUrl) setActiveTabRaw(tabFromUrl);

    fetch('/api/auth/me')
      .then(r => r.json())
      .then(({ user }) => {
        if (!user) { window.location.href = '/login'; return; }
        const p = user.prenom || '';
        const d = user.dpa    || '';
        setPrenom(p); setDpa(d);
        setValiseChecked(user.valise_checked    || {});
        setMissionsChecked(user.missions_checked || {});
        setRdvDates(user.rdv_dates              || {});
        setNextRdvDate(user.next_rdv            || '');
        if (user.dpa_originale) setDpaOriginale(user.dpa_originale);
        if (user.achats_checked) setAchatChecked(user.achats_checked);
        if (p) localStorage.setItem('dadup_prenom', p);
        if (d) localStorage.setItem('dadup_dpa',    d);
        if (!d) setShowOnboarding(true);
      })
      .catch(() => { window.location.href = '/login'; });
  }, []);

  // Sync Supabase
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
      const dpaRestore = dpaOriginale
        || localStorage.getItem('dadup_dpa_originale')
        || localStorage.getItem('dadup_dpa_backup')
        || '';
      if (!dpaRestore) {
        alert('Saisis ta date d\'accouchement dans les réglages pour revenir en mode grossesse.');
        return;
      }
      setDpa(dpaRestore);
      localStorage.setItem('dadup_dpa', dpaRestore);
      await saveData({ dpa: dpaRestore });
    } else {
      // Déclarer la naissance : passer en post-partum (DPA = aujourd'hui)
      localStorage.setItem('dadup_dpa_originale', dpa);
      localStorage.setItem('dadup_dpa_backup', dpa);
      const today = new Date().toISOString().split('T')[0];
      setDpa(today);
      localStorage.setItem('dadup_dpa', today);
      await saveData({ dpa: today, dpa_originale: dpa });
      setDpaOriginale(dpa);
    }
    setActiveTab('home');
  };

  // Calculs dérivés
  const sa          = getSA(avance ? 1 : 0);
  const saReelle    = getSA();
  const data        = sa       ? (SD[sa]       || SD[20]) : null;
  const dataR       = saReelle ? (SD[saReelle] || SD[20]) : null;
  const dpaDate     = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.ceil((dpaDate.getTime() - new Date().getTime()) / (1000*60*60*24)) : null;
  const isPost      = joursRestants !== null && joursRestants < 0;
  const prog        = isPost ? 100 : Math.min(100, Math.round(((saReelle||0)/40)*100));
  const tri         = (saReelle||0) <= 14 ? 'T1' : (saReelle||0) <= 27 ? 'T2' : 'T3';
  const idee        = getIdee(saReelle || 20);
  const missions    = saReelle ? (MISSIONS[saReelle] || MISSIONS[20] || []) : [];
  const nextRdv     = RDV_LIST.filter(r => saReelle && r.sa >= saReelle)[0];
  const moisBebe    = isPost && dpaDate ? Math.min(11, Math.floor(Math.abs(joursRestants||0) / 30)) : 0;
  const dataBebe    = MOIS_DATA[moisBebe];

  // Props partagées entre tous les composants
  const shared = {
    C, isPost, dpa, prenom, saReelle, joursRestants, prog, tri,
    moisBebe, dataBebe, idee, missions, missionsChecked, toggleM,
    nextRdv, nextRdvDate, saveRdv, dataR, data, sa, avance, setAvance,
    valiseChecked, toggleV, achatChecked, toggleA, rdvDates, saveRdvI, rdvOuvert, setRdvOuvert,
    MOIS_DATA, PARTENAIRES, RDV_LIST, SD,
  };

  if (showOnboarding) {
    return <Onboarding onSave={(d, p) => { localStorage.setItem('dadup_dpa', d); localStorage.setItem('dadup_prenom', p); setDpa(d); setPrenom(p); setShowOnboarding(false); saveData({ dpa: d, prenom: p }); }} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: C.white, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{-webkit-font-smoothing:antialiased;}
        .dd-c{max-width:1080px;margin:0 auto;padding:32px 36px;}
        .dd-g2col{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .dd-mg{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        @media(max-width:860px){
          .dd-c{padding:16px!important;}
          .dd-g2col,.dd-mg{grid-template-columns:1fr!important;}
        }
      `}</style>

      <Topbar
        prenom={prenom} dpa={dpa} saReelle={saReelle} tri={tri} prog={prog}
        isPost={isPost} moisBebe={moisBebe}
        activeTab={activeTab} setActiveTab={setActiveTab}
        onUpdateInfos={(p, d) => { setPrenom(p); setDpa(d); localStorage.setItem('dadup_prenom', p); localStorage.setItem('dadup_dpa', d); }}
        onDeclareNaissance={() => setShowConfirmNaissance(true)}
      />

      <div className="dd-c">
        {activeTab === 'home'    && (isPost ? <PostAccueil  {...shared}/> : <Accueil      {...shared}/>)}
        {activeTab === 'bebe'    && (isPost ? <PostBebe     {...shared}/> : <BebePage     {...shared}/>)}
        {activeTab === 'rdv'     && (isPost ? <PostRDV      {...shared}/> : <RDVPage      {...shared}/>)}
        {isPost  && activeTab === 'suivi'     && <SuiviBebe    C={C}/>}
        {!isPost && activeTab === 'pratique'  && <PreparerPage  {...shared}/>}
        {!isPost && activeTab === 'bonsplans' && <BonsPlansPage {...shared}/>}
        {!isPost && activeTab === 'psycho'    && <PsychoPage    C={C} saReelle={saReelle}/>}
      </div>

      {/* MODALE CONFIRMATION NAISSANCE */}
      {showConfirmNaissance && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowConfirmNaissance(false)}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '360px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <p style={{ fontSize: '48px', margin: '0 0 16px' }}>{isPost ? '🤰' : '👶'}</p>
            <h3 style={{ color: '#1e2535', fontSize: '20px', fontWeight: 800, margin: '0 0 10px' }}>{isPost ? 'Retour en mode grossesse ?' : 'Félicitations !'}</h3>
            <p style={{ color: '#6a7585', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px' }}>{isPost ? 'Tu reviendras à la dernière semaine de grossesse enregistrée. Ton suivi post-partum sera conservé.' : 'En confirmant, ton application bascule en mode post-naissance. Tu pourras suivre le développement de bébé mois par mois.'}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowConfirmNaissance(false)} style={{ flex: 1, padding: '13px', background: '#f7f5f0', border: 'none', borderRadius: '32px', fontSize: '14px', fontWeight: 700, color: '#9aa0a8', cursor: 'pointer' }}>Annuler</button>
              <button onClick={declareNaissance} style={{ flex: 2, padding: '13px', background: '#1e2535', border: 'none', borderRadius: '32px', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>{isPost ? 'Revenir en mode grossesse' : 'Bébé est né !'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#f7f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#9aa0a8', fontSize: '14px' }}>Chargement...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
