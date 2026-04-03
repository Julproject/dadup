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

// ── Components ────────────────────────────────────────────────────────────────
import dynamic       from 'next/dynamic';
import Onboarding    from './components/Onboarding';
import Topbar        from './components/Topbar';
import Accueil       from './components/Accueil';

// Chargement différé — réduit le bundle initial et accélère le démarrage
const BebePage     = dynamic(() => import('./components/BebePage'));
const RDVPage      = dynamic(() => import('./components/RDVPage'));
const PreparerPage = dynamic(() => import('./components/PreparerPage'));
const PsychoPage   = dynamic(() => import('./components/PsychoPage'));
const PostAccueil  = dynamic(() => import('./components/postpartum/PostAccueil'));
const PostBebe     = dynamic(() => import('./components/postpartum/PostBebe'));
const PostRDV      = dynamic(() => import('./components/postpartum/PostRDV'));
const SuiviBebe      = dynamic(() => import('./components/postpartum/SuiviBebe'));
const PrepaNaissance = dynamic(() => import('./components/PrepaNaissance'));
const AtelierBebe    = dynamic(() => import('./components/postpartum/AtelierBebe'));

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  dark:'#1e2535', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#c8a060',
  white:'#ffffff', border:'#f0ede8', text:'#1e2535', textLight:'#6B8FA8',
  muted:'#9aa0a8', orange:'#FFF0E6', green:'#E4F5EC', amber:'#FFF7E0',
  teal:'#E0F5F0', coral:'#FDECEA', blueLight:'#E6F0FA', cream:'#f7f5f0',
};

// Parse une date "YYYY-MM-DD" en heure LOCALE (pas UTC)
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d); // mois 0-indexé, heure locale
}

// Nombre de jours entre aujourd'hui (minuit local) et la DPA (minuit local)
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

  // Initialisation immédiate depuis localStorage → affichage instantané à chaque refresh
  const [activeTab,            setActiveTabRaw]       = useState('home');
  const [dpa,                  setDpa]                = useState(() => readLS('dadup_dpa'));
  const [prenom,               setPrenom]             = useState(() => readLS('dadup_prenom'));
  const [showOnboarding,       setShowOnboarding]     = useState(false);
  const [valiseChecked,        setValiseChecked]      = useState<Record<string,boolean>>(() => readLSJson('dadup_valise', {}));
  const [missionsChecked,      setMissionsChecked]    = useState<Record<string,boolean>>(() => readLSJson('dadup_missions', {}));
  const [rdvDates,             setRdvDates]           = useState<Record<number,string>>(() => readLSJson('dadup_rdv_dates', {}));
  const [avance,               setAvance]             = useState(false);
  const [nextRdvDate,          setNextRdvDate]        = useState(() => readLS('dadup_next_rdv'));
  const [rdvOuvert,            setRdvOuvert]          = useState<number|null>(null);
  const [achatChecked,         setAchatChecked]       = useState<Record<string,boolean>>(() => readLSJson('dadup_achats', {}));
  const [showConfirmNaissance, setShowConfirmNaissance] = useState(false);
  const [dpaOriginale,         setDpaOriginale]       = useState(() => readLS('dadup_dpa_originale'));

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

        if (user.dpa_originale) {
          setDpaOriginale(user.dpa_originale);
          localStorage.setItem('dadup_dpa_originale', user.dpa_originale);
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
        // Sinon on garde ce qu'on a en local — l'utilisateur voit son contenu
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

    // On recalcule isPost localement ici pour être sûr
    const isPostNow = dpa ? joursAvantDpa(dpa) < 0 : false;

    if (isPostNow) {
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
      localStorage.removeItem('dadup_dpa_originale');
      localStorage.removeItem('dadup_dpa_backup');
      await saveData({ dpa: dpaRestore, dpa_originale: null });
      setActiveTab('home');

    } else {
      // ── BASCULE EN POST-PARTUM ────────────────────────────────────────────
      const dpaCourante = dpa;
      setDpaOriginale(dpaCourante);
      localStorage.setItem('dadup_dpa_originale', dpaCourante);
      localStorage.setItem('dadup_dpa_backup', dpaCourante);

      // DPA = il y a 2 jours → joursAvantDpa = -2 → isPost = true à coup sûr
      const ilYa2Jours = new Date();
      ilYa2Jours.setDate(ilYa2Jours.getDate() - 2);
      const dpaPostPartum = `${ilYa2Jours.getFullYear()}-${String(ilYa2Jours.getMonth()+1).padStart(2,'0')}-${String(ilYa2Jours.getDate()).padStart(2,'0')}`;

      setDpa(dpaPostPartum);
      localStorage.setItem('dadup_dpa', dpaPostPartum);
      await saveData({ dpa: dpaPostPartum, dpa_originale: dpaCourante });
      setActiveTab('home');
    }
  };

  // ── Calculs dérivés — tout depuis le state `dpa` en heure locale ──────────
  const joursRestants = dpa ? joursAvantDpa(dpa) : null;
  const isPost        = joursRestants !== null && joursRestants < 0;

  const saReelle = !isPost && dpa
    ? Math.max(3, Math.min(42, Math.round(40 - (joursRestants ?? 0) / 7)))
    : null;
  const sa = !isPost && dpa
    ? Math.max(3, Math.min(42, Math.round(40 - (joursRestants ?? 0) / 7) + (avance ? 1 : 0)))
    : null;

  const data      = sa       ? (SD[sa]       || SD[20]) : null;
  const dataR     = saReelle ? (SD[saReelle] || SD[20]) : null;
  const prog      = isPost ? 100 : Math.min(100, Math.round(((saReelle||0)/40)*100));
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
        onDeclareNaissance={() => setShowConfirmNaissance(true)}
      />

      <div className="dd-c">
        {activeTab === 'home'    && (isPost ? <PostAccueil  {...shared}/> : <Accueil      {...shared}/>)}
        {activeTab === 'bebe'    && (isPost ? <PostBebe     {...shared}/> : <BebePage     {...shared}/>)}
        {activeTab === 'rdv'     && (isPost ? <PostRDV      {...shared}/> : <RDVPage      {...shared}/>)}
        {isPost  && activeTab === 'suivi'     && <SuiviBebe    C={C}/>}
        {!isPost && activeTab === 'pratique'  && <PreparerPage  {...shared}/>}
        {!isPost && activeTab === 'psycho'    && <PsychoPage    C={C} saReelle={saReelle}/>}
        {!isPost && activeTab === 'jourj'     && <PrepaNaissance C={C} saReelle={saReelle || 40}/>}
        {isPost  && activeTab === 'atelier'   && <AtelierBebe   C={C}/>}
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
