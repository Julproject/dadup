'use client';
import { Logo } from '../../components/Logo';

const C = {
  dark: '#1e2535', blue: '#2E5F8A', blueDark: '#1A3D5C', gold:'#C9D8C4',
  white: '#ffffff', border: '#E6E0D5', muted: '#5f6b72', cream: '#F6F1E9',
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={name === 'plus' ? 3.2 : 2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  const tabs = isPost ? NAV_POST.filter(n => n.id !== 'suivi' || (moisBebe || 0) === 0) : NAV_GROSSESSE;
  const isOn = (n: NavItem) => n.covers.includes(activeTab);

  return (
    <>
      <div className="dd-topbar" style={{ background: C.cream, position: 'sticky', top: 0, zIndex: 40, borderBottom: '1px solid #E6E0D5' }}>
        <style>{`
          .dd-tabs::-webkit-scrollbar{display:none;}
          .tab-btn{transition:transform .15s ease,box-shadow .15s ease;}
          .tab-btn:hover{color:#15263A!important;}
          .dd-bottomnav{display:none;}
          @media (display-mode: standalone){.dd-topbar{padding-top:env(safe-area-inset-top,0px);}}
          .dd-bn-btn{transition:color .15s ease;}
          .dd-bn-btn:active .dd-bn-ic{transform:scale(.9);}
          .dd-bn-ic{display:flex;transition:transform .12s ease;}
          @media(max-width:640px){.tb-prenom{display:none!important;}}
          @media(max-width:860px){
            .dd-toptabs{display:none!important;}
            .dd-bottomnav{display:flex;}
          }
        `}</style>

        {/* Ligne 1 : logo + profil */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Logo fond="creme" hauteur={22} />
          </div>

        </div>

        {/* Ligne 2 : onglets (ordinateur et tablette) */}
        <div className="dd-toptabs" style={{ position: 'relative', paddingBottom: '2px' }}>
          <nav aria-label="Navigation principale" className="dd-tabs" style={{ display: 'flex', gap: '4px', padding: '0 20px', overflowX: 'auto' as const, maxWidth: '1180px', margin: '0 auto', scrollbarWidth: 'none' as const }}>
            {tabs.map(n => {
              const on = isOn(n);
              return (
                <button key={n.id} onClick={() => setActiveTab(n.target)} aria-current={on ? 'page' : undefined} className="tab-btn" style={{
                  padding: '12px 16px 11px', fontSize: '14px', fontWeight: on ? 800 : 700, border: 'none',
                  borderBottom: on ? '3px solid #B4593A' : '3px solid transparent',
                  cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0, background: 'transparent',
                  color: on ? '#15263A' : '#5f6b72',
                }}>{n.label}</button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Barre de navigation du bas (mobile) */}
      <nav aria-label="Navigation principale" className="dd-bottomnav" style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60,
        background: '#ffffff', borderTop: '1px solid #E6E0D5',
        boxShadow: '0 -4px 20px rgba(26,61,92,0.06)',
        height: 'calc(var(--nav-h) + var(--safe-bas))',
        padding: '0 max(4px, env(safe-area-inset-right)) var(--safe-bas) max(4px, env(safe-area-inset-left))',
        justifyContent: 'space-around', alignItems: 'stretch',
      }}>
        {tabs.map(n => {
          const on = isOn(n);
          return (
            <button key={n.id} onClick={() => setActiveTab(n.target)} aria-current={on ? 'page' : undefined} className="dd-bn-btn" style={{
              flex: 1, minWidth: 0, height: '100%', background: 'none', border: 'none', cursor: 'pointer',
              borderTop: on ? '3px solid #B4593A' : '3px solid transparent',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '2px 0 4px',
            }}>
              <span className="dd-bn-ic"><Icon name={n.icon} color={on ? '#15263A' : '#6b757b'} /></span>
              <span style={{ fontSize: '12px', lineHeight: 1.1, fontWeight: on ? 800 : 700, color: on ? '#15263A' : '#56616B', whiteSpace: 'nowrap' as const }}>{n.short}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
