'use client';

const C = {
  dark: '#1e2535', blue: '#2E5F8A', blueDark: '#1A3D5C', gold: '#c8a060',
  white: '#ffffff', border: '#ede8e0', muted: '#9aa0a8', cream: '#faf6f0',
};

// Onglets regroupés : chaque onglet de navigation couvre plusieurs écrans internes
const PREPARER_TABS = ['rdv', 'pratique', 'valise', 'maison', 'admin', 'jourj'];

type NavItem = { id: string; label: string; short: string; target: string; covers: string[]; icon: string };

const ICONS: Record<string, string> = {
  home:    'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  bebe:    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0',
  prep:    'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9',
  toi:     'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  plus:    'M5 12h.01M12 12h.01M19 12h.01',
  sante:   'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10zM12 9v5M9.5 11.5h5',
  suivi:   'M4 19V5M4 19h16M8 15l3-4 3 2 5-6',
  atelier: 'M14 6l4 4M4 20l4-1 10-10-3-3L5 16z',
};

const NAV_GROSSESSE: NavItem[] = [
  { id: 'home', label: 'Accueil',  short: 'Accueil',  target: 'home', covers: ['home'],            icon: 'home' },
  { id: 'bebe', label: 'Bébé',     short: 'Bébé',     target: 'bebe', covers: ['bebe'],            icon: 'bebe' },
  { id: 'prep', label: 'Préparer', short: 'Préparer', target: 'rdv',  covers: PREPARER_TABS,       icon: 'prep' },
  { id: 'toi',  label: 'Toi',      short: 'Toi',      target: 'toi',  covers: ['toi', 'psycho'],   icon: 'toi'  },
  { id: 'plus', label: 'Plus',     short: 'Plus',     target: 'plus', covers: ['plus', 'dico'],    icon: 'plus' },
];

const NAV_POST: NavItem[] = [
  { id: 'home',    label: 'Ce mois-ci',  short: 'Ce mois',  target: 'home',    covers: ['home'],         icon: 'home'    },
  { id: 'bebe',    label: 'Mon bébé',    short: 'Bébé',     target: 'bebe',    covers: ['bebe'],         icon: 'bebe'    },
  { id: 'rdv',     label: 'Santé & RDV', short: 'Santé',    target: 'rdv',     covers: ['rdv'],          icon: 'sante'   },
  { id: 'suivi',   label: 'Suivi J7',    short: 'Suivi',    target: 'suivi',   covers: ['suivi'],        icon: 'suivi'   },
  { id: 'atelier', label: 'Atelier',     short: 'Atelier',  target: 'atelier', covers: ['atelier'],      icon: 'atelier' },
  { id: 'plus',    label: 'Plus',        short: 'Plus',     target: 'plus',    covers: ['plus', 'dico'], icon: 'plus'    },
];

function Icon({ name, color }: { name: string; color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export default function Topbar({ prenom, dpa, saReelle, tri, prog, isPost, moisBebe, activeTab, setActiveTab, onDeclareNaissance }: {
  prenom: string; dpa: string; saReelle: number | null; tri: string; prog: number;
  isPost: boolean; moisBebe: number;
  activeTab: string; setActiveTab: (t: string) => void;
  onDeclareNaissance: () => void;
}) {
  const tabs = isPost ? NAV_POST : NAV_GROSSESSE;
  const isOn = (n: NavItem) => n.covers.includes(activeTab);

  return (
    <>
      <div style={{ background: C.cream, position: 'sticky', top: 0, zIndex: 40 }}>
        <style>{`
          .dd-tabs::-webkit-scrollbar{display:none;}
          .tab-btn{transition:transform .15s ease,box-shadow .15s ease;}
          .tab-btn:hover{transform:translateY(-1px);}
          .dd-bottomnav{display:none;}
          @media(max-width:640px){.tb-prenom{display:none!important;}}
          @media(max-width:860px){
            .dd-toptabs{display:none!important;}
            .dd-bottomnav{display:flex;}
          }
        `}</style>

        {/* Ligne 1 : logo + profil */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg viewBox="0 0 300 300" width="36" height="36" aria-hidden="true">
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

        {/* Ligne 2 : onglets (ordinateur et tablette) */}
        <div className="dd-toptabs" style={{ position: 'relative', paddingBottom: '2px' }}>
          <nav aria-label="Navigation principale" className="dd-tabs" style={{ display: 'flex', gap: '6px', padding: '0 20px 14px', overflowX: 'auto' as const, maxWidth: '1180px', margin: '0 auto', scrollbarWidth: 'none' as const }}>
            {tabs.map(n => {
              const on = isOn(n);
              return (
                <button key={n.id} onClick={() => setActiveTab(n.target)} aria-current={on ? 'page' : undefined} className="tab-btn" style={{
                  padding: '9px 20px', fontSize: '13px', fontWeight: 800, border: 'none',
                  borderRadius: '24px', cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0,
                  background: on ? 'linear-gradient(135deg,#0a1f32,#1A3D5C)' : '#ffffff',
                  color: on ? '#fff' : '#1e2535',
                  boxShadow: on ? '0 4px 16px rgba(26,61,92,0.3)' : '0 1px 4px rgba(0,0,0,0.08)',
                }}>{n.label}</button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Barre de navigation du bas (mobile) */}
      <nav aria-label="Navigation principale" className="dd-bottomnav" style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60,
        background: '#ffffff', borderTop: '1px solid rgba(26,61,92,0.08)',
        boxShadow: '0 -4px 20px rgba(26,61,92,0.06)',
        padding: '8px 6px calc(8px + env(safe-area-inset-bottom))',
        justifyContent: 'space-around',
      }}>
        {tabs.map(n => {
          const on = isOn(n);
          return (
            <button key={n.id} onClick={() => setActiveTab(n.target)} aria-current={on ? 'page' : undefined} style={{
              flex: 1, minWidth: 0, minHeight: '48px', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px', padding: '2px 0',
            }}>
              <span style={{
                width: '40px', height: '26px', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: on ? 'linear-gradient(135deg,#0a1f32,#1d4d72)' : 'transparent',
              }}>
                <Icon name={n.icon} color={on ? '#e8c070' : '#6a7585'} />
              </span>
              <span style={{ fontSize: '11px', fontWeight: on ? 800 : 700, color: on ? C.blueDark : '#6a7585', whiteSpace: 'nowrap' as const }}>{n.short}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
