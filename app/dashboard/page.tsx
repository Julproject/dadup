'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ── Data ──────────────────────────────────────────────────────────────────────
import { SD }                  from './data/semaines';
import { MISSIONS }            from './data/missions';
import { RDV_LIST }            from './data/rdv';
import { PARTENAIRES }         from './data/partenaires';
import { MOIS_DATA, getIdee }  from './data/mois';
import { getSA }               from './data/utils';

// ── Components ────────────────────────────────────────────────────────────────
import Onboarding    from './components/Onboarding';
import Topbar        from './components/Topbar';
import Accueil       from './components/Accueil';
import BebePage      from './components/BebePage';
import RDVPage       from './components/RDVPage';
import PreparerPage  from './components/PreparerPage';
import BonsPlansPage from './components/BonsPlansPage';
import PostAccueil   from './components/PostAccueil';
import PostBebe      from './components/PostBebe';
import PostRDV       from './components/PostRDV';

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

  const [activeTab,       setActiveTabRaw]    = useState('home');
  const [dpa,             setDpa]             = useState('');
  const [prenom,          setPrenom]          = useState('');
  const [showOnboarding,  setShowOnboarding]  = useState(false);
  const [valiseChecked,   setValiseChecked]   = useState<Record<string,boolean>>({});
  const [missionsChecked, setMissionsChecked] = useState<Record<string,boolean>>({});
  const [rdvDates,        setRdvDates]        = useState<Record<number,string>>({});
  const [avance,          setAvance]          = useState(false);
  const [nextRdvDate,     setNextRdvDate]     = useState('');
  const [rdvOuvert,       setRdvOuvert]       = useState<number|null>(null);

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
        setValiseChecked(user.valise_checked   || {});
        setMissionsChecked(user.missions_checked || {});
        setRdvDates(user.rdv_dates             || {});
        setNextRdvDate(user.next_rdv           || '');
        if (p) localStorage.setItem('dadup_prenom', p);
        if (d) localStorage.setItem('dadup_dpa',    d);
        if (!d) setShowOnboarding(true);
      })
      .catch(() => { window.location.href = '/login'; });
  }, []);

  // Sync Supabase
  const sync = (data: Record<string,any>) => {
    fetch('/api/auth/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  const toggleV   = (id: string)          => { const u = {...valiseChecked,   [id]: !valiseChecked[id]};   setValiseChecked(u);   localStorage.setItem('dadup_valise',    JSON.stringify(u)); sync({ valise_checked:   u }); };
  const toggleM   = (id: string)          => { const u = {...missionsChecked, [id]: !missionsChecked[id]}; setMissionsChecked(u); localStorage.setItem('dadup_missions',  JSON.stringify(u)); sync({ missions_checked: u }); };
  const saveRdv   = (v: string)           => { setNextRdvDate(v); localStorage.setItem('dadup_next_rdv', v); sync({ next_rdv: v }); };
  const saveRdvI  = (s: number, v: string)=> { const u = {...rdvDates, [s]: v}; setRdvDates(u); localStorage.setItem('dadup_rdv_dates', JSON.stringify(u)); sync({ rdv_dates: u }); };
  const saveOnb   = (d: string, p: string)=> { localStorage.setItem('dadup_dpa', d); localStorage.setItem('dadup_prenom', p); setDpa(d); setPrenom(p); setShowOnboarding(false); sync({ dpa: d, prenom: p }); };

  if (showOnboarding) return <Onboarding onSave={saveOnb}/>;

  // Calculs
  const sa        = getSA(avance ? 1 : 0);
  const saReelle  = getSA();
  const data      = sa      ? (SD[sa]      || SD[20]) : null;
  const dataR     = saReelle ? (SD[saReelle] || SD[20]) : null;
  const dpaDate   = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.ceil((dpaDate.getTime() - new Date().getTime()) / (1000*60*60*24)) : null;
  const isPost    = joursRestants !== null && joursRestants < 0;
  const prog      = isPost ? 100 : Math.min(100, Math.round(((saReelle||0)/40)*100));
  const tri       = (saReelle||0) <= 14 ? 'T1' : (saReelle||0) <= 27 ? 'T2' : 'T3';
  const moisG     = saReelle ? Math.ceil(saReelle / 4.3) : 1;
  const idee      = getIdee(moisG);
  const missions  = saReelle ? (MISSIONS[saReelle] || MISSIONS[20] || []) : [];
  const nextRdv   = RDV_LIST.filter(r => saReelle && r.sa >= saReelle)[0];
  const moisBebe  = isPost && dpaDate ? Math.min(11, Math.floor(Math.abs(joursRestants||0) / 30)) : 0;
  const dataBebe  = MOIS_DATA[moisBebe];

  // Props partagées entre tous les composants
  const shared = {
    C, isPost, dpa, prenom, saReelle, joursRestants, prog, tri,
    moisBebe, dataBebe, idee, missions, missionsChecked, toggleM,
    nextRdv, nextRdvDate, saveRdv, dataR, data, sa, avance, setAvance,
    valiseChecked, toggleV, rdvDates, saveRdvI, rdvOuvert, setRdvOuvert,
    MOIS_DATA, PARTENAIRES, RDV_LIST, SD,
  };

  return (
    <div style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
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
        prenom={prenom} saReelle={saReelle} tri={tri} prog={prog}
        isPost={isPost} moisBebe={moisBebe}
        activeTab={activeTab} setActiveTab={setActiveTab}
      />

      <div className="dd-c">
        {activeTab === 'home' && (isPost ? <PostAccueil {...shared}/> : <Accueil    {...shared}/>)}
        {activeTab === 'bebe' && (isPost ? <PostBebe    {...shared}/> : <BebePage   {...shared}/>)}
        {activeTab === 'rdv'  && (isPost ? <PostRDV     {...shared}/> : <RDVPage    {...shared}/>)}
        {!isPost && activeTab === 'pratique'  && <PreparerPage  {...shared}/>}
        {!isPost && activeTab === 'bonsplans' && <BonsPlansPage {...shared}/>}
        {!isPost && activeTab === 'psycho'    && <PsychoPage    C={C}/>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{minHeight:'100vh',background:'#f7f5f0',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <p style={{color:'#9aa0a8',fontSize:'14px'}}>Chargement...</p>
      </div>
    }>
      <DashboardContent/>
    </Suspense>
  );
}
