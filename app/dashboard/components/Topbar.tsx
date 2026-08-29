'use client';

const C = {
  dark: '#1e2535', blue: '#2E5F8A', blueDark: '#1A3D5C', gold: '#c8a060',
  white: '#ffffff', border: '#ede8e0', muted: '#9aa0a8', cream: '#faf6f0',
};

export default function Topbar({ prenom, dpa, saReelle, tri, prog, isPost, moisBebe, activeTab, setActiveTab, onDeclareNaissance }: {
  prenom: string; dpa: string; saReelle: number | null; tri: string; prog: number;
  isPost: boolean; moisBebe: number;
  activeTab: string; setActiveTab: (t: string) => void;
  onDeclareNaissance: () => void;
}) {
  const navGrossesse = [
    { id: 'home',     label: 'Accueil',    bg: '#FFE8D6', tc: '#A03020' },
    { id: 'bebe',     label: 'Bébé',       bg: '#B8F0D8', tc: '#0A2E1A' },
    { id: 'rdv',      label: 'RDV',        bg: '#C8E8FF', tc: '#0A2847' },
    { id: 'pratique', label: 'À préparer', bg: '#FFE8A0', tc: '#3A2000' },
    { id: 'psycho',   label: 'Psycho',     bg: '#DDD0FF', tc: '#1A0A4A' },
    { id: 'jourj',    label: 'Jour J',     bg: '#FFD0D0', tc: '#4A0A0A' },
    { id: 'dico',     label: 'Dico',       bg: '#B8F0D8', tc: '#0A2E1A' },
  ];

  const navPost = [
    { id: 'home',    label: 'Ce mois-ci',  bg: '#B8F0D8', tc: '#0A2E1A' },
    { id: 'bebe',    label: 'Mon bébé',    bg: '#C8E8FF', tc: '#0A2847' },
    { id: 'rdv',     label: 'Santé & RDV', bg: '#FFE8D6', tc: '#A03020' },
    { id: 'suivi',   label: 'Suivi J7',    bg: '#DDD0FF', tc: '#1A0A4A' },
    { id: 'atelier', label: 'Atelier',     bg: '#FFE8A0', tc: '#3A2000' },
    { id: 'dico',    label: 'Dico',        bg: '#B8F0D8', tc: '#0A2E1A' },
  ];

  const tabs = isPost ? navPost : navGrossesse;

  return (
    <div style={{ background: C.cream, position: 'sticky', top: 0, zIndex: 40 }}>
      <style>{`
        .dd-tabs::-webkit-scrollbar{display:none;}
        @media(max-width:640px){.tb-prenom{display:none!important;}}
        .tab-btn{transition:transform .15s ease,box-shadow .15s ease;}
        .tab-btn:hover{transform:translateY(-1px);}
      `}</style>

      {/* Ligne 1 : logo + profil */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 300 300" width="36" height="36">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C" />
            <circle cx="150" cy="150" r="122" fill="#2E5F8A" />
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060" />
            <circle cx="150" cy="112" r="40" fill="#c8a060" />
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0" />
            <circle cx="150" cy="128" r="26" fill="#faf6f0" />
          </svg>
          <span style={{ fontSize: '20px', fontWeight: 900, color: C.dark, letterSpacing: '-0.3px' }}>DadUp</span>
        </div>

        <a href="/compte" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #e8e0d0', padding: '7px 14px', borderRadius: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <span className="tb-prenom" style={{ fontSize: '13px', fontWeight: 700, color: C.dark }}>
            {prenom || 'Mon compte'}
          </span>
          {saReelle && (
            <span style={{ fontSize: '11px', background: 'linear-gradient(135deg,#c8a060,#e8c070)', color: '#1c1510', padding: '3px 8px', borderRadius: '20px', fontWeight: 800, boxShadow: '0 2px 6px rgba(200,160,96,0.3)' }}>
              {isPost ? `Mois ${moisBebe + 1}` : `SA ${saReelle}`}
            </span>
          )}
        </a>
      </div>

      {/* Ligne 2 : onglets */}
      <div style={{ position: 'relative', paddingBottom: '2px' }}>
        <div className="dd-tabs" style={{ display: 'flex', gap: '6px', padding: '0 20px 14px', overflowX: 'auto' as const, maxWidth: '1180px', margin: '0 auto', scrollbarWidth: 'none' as const }}>
          {tabs.map(n => {
            const on = activeTab === n.id;
            return (
              <button key={n.id} onClick={() => setActiveTab(n.id)} className="tab-btn" style={{
                padding: '9px 20px', fontSize: '13px', fontWeight: 800, border: 'none',
                borderRadius: '24px', cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0,
                background: on ? 'linear-gradient(135deg,#0a1f32,#1A3D5C)' : n.bg,
                color: on ? '#fff' : n.tc,
                boxShadow: on ? '0 4px 16px rgba(26,61,92,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
              }}>{n.label}</button>
            );
          })}
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: '12px', width: '60px', background: `linear-gradient(to right, transparent, ${C.cream})`, pointerEvents: 'none' }} />
      </div>
    </div>
  );
}
