'use client';
import dynamic from 'next/dynamic';

const RDVPage        = dynamic(() => import('./RDVPage'));
const PreparerPage   = dynamic(() => import('./PreparerPage'));
const PrepaNaissance = dynamic(() => import('./PrepaNaissance'));

// Onglet « Préparer » : rendez-vous en premier, puis les checklists et le jour J
const SOUS_ONGLETS = [
  { id: 'rdv',    label: 'Rendez-vous',   court: 'RDV'    },
  { id: 'valise', label: 'Valise',        court: 'Valise' },
  { id: 'maison', label: 'Maison',        court: 'Maison' },
  { id: 'admin',  label: 'Administratif', court: 'Admin'  },
  { id: 'jourj',  label: 'Jour J',        court: 'Jour J' },
];

export default function PreparerHub(props: any) {
  const { activeTab, setActiveTab, C, saReelle } = props;
  // Ancien lien « pratique » : ouvre la valise
  const sub = activeTab === 'pratique' ? 'valise' : activeTab;
  const ongletForce = sub === 'valise' ? 'valise' : sub === 'maison' ? 'maison' : sub === 'admin' ? 'conge' : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style>{`
        .ph-tabs::-webkit-scrollbar{display:none;}
        .ph-tab{transition:transform .15s ease,box-shadow .15s ease;}
        .ph-tab:hover{transform:translateY(-1px);}
        .ph-court{display:none;}
        @media(max-width:640px){
          .ph-long{display:none;} .ph-court{display:inline;}
          .ph-tab{flex:1 1 0!important;padding:10px 6px!important;font-size:13px!important;}
          .ph-tabs{gap:6px!important;}
        }
      `}</style>

      <div style={{ position: 'relative' }}>
        <div role="tablist" aria-label="Préparer" className="ph-tabs" style={{ display: 'flex', gap: '8px', overflowX: 'auto' as const, scrollbarWidth: 'none' as const, paddingBottom: '4px' }}>
          {SOUS_ONGLETS.map(t => {
            const on = sub === t.id;
            return (
              <button key={t.id} role="tab" aria-selected={on} onClick={() => setActiveTab(t.id)} className="ph-tab" style={{
                flexShrink: 0, minHeight: '44px', padding: '10px 18px', border: 'none', borderRadius: '24px', cursor: 'pointer',
                fontSize: '14px', fontWeight: 800, whiteSpace: 'nowrap' as const,
                background: on ? 'linear-gradient(135deg,#0a1f32,#1A3D5C)' : '#ffffff',
                color: on ? '#ffffff' : '#1e2535',
                boxShadow: on ? '0 4px 16px rgba(26,61,92,0.25)' : '0 1px 4px rgba(0,0,0,0.08)',
              }}><span className="ph-long">{t.label}</span><span className="ph-court">{t.court}</span></button>
            );
          })}
        </div>
      </div>

      {sub === 'rdv'   && <RDVPage {...props} />}
      {ongletForce     && <PreparerPage {...props} ongletForce={ongletForce} />}
      {sub === 'jourj' && <PrepaNaissance C={C} saReelle={saReelle || 41} />}
    </div>
  );
}
