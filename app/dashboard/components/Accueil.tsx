'use client';
import { useState } from 'react';

// ── Palette du tableau de bord ────────────────────────────────────────────────
const NAVY = '#15263A';
const NAVY_GRAD = 'linear-gradient(160deg,#0c1d2e,#1A3D5C 70%,#24507a)';
const SAUGE = '#DCE5D7';
const SAUGE_BORD = '#C9D8C4';
const FORET = '#2F4F3E';
const TERRA = '#B4593A';
const TERRA_CLAIR = '#F2DACB';
const GRIS = '#5f6b72';

const LABEL = { fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: 0 };

const ICONES: Record<string, string> = {
  rdv:    'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M8 3v4M16 3v4',
  maman:  'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  savoir: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h5',
  idee:   'M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3zM9 21h6',
};

function TuileIcone({ nom }: { nom: string }) {
  return (
    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: NAVY_GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SAUGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONES[nom]} /></svg>
    </div>
  );
}

function Chevron({ ouvert }: { ouvert: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3D5C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0, transform: ouvert ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="M6 9l6 6 6-6" /></svg>
  );
}

export default function Accueil({C,dpa,prenom,saReelle,joursRestants,prog,tri,idee,missions,missionsChecked,toggleM,nextRdv,nextRdvDate,saveRdv,saveRdvI,dataR,setActiveTab}:any) {
  const [open, setOpen] = useState<string|null>(null);
  const toggle = (id: string) => setOpen(open === id ? null : id);

  const missionsDone = missions.filter((_:string, i:number) => missionsChecked[`m${saReelle}_${i}`]).length;
  const sg = Math.max(1, (saReelle || 0) - 2);
  const sgTexte = sg === 1 ? '1re' : `${sg}e`;
  const nom = prenom || 'futur papa';
  const initiale = (prenom || 'D').trim().charAt(0).toUpperCase();
  const jours = typeof joursRestants === 'number' ? joursRestants : null;

  const carteBlanche = { background: '#ffffff', borderRadius: '20px', boxShadow: '0 6px 20px rgba(21,38,58,0.06)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
      <style>{`
        .acc-card{transition:transform .15s ease,box-shadow .15s ease;}
        .acc-card:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(21,38,58,0.10)!important;}
        .acc-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}
        .acc-tile{min-height:150px;}
        @media(max-width:640px){
          .acc-tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
          .acc-tile{min-height:128px;padding:18px!important;}
          .acc-big{font-size:34px!important;}
          .acc-prog{grid-column:1/-1;min-height:0!important;flex-direction:row!important;align-items:center!important;padding:12px 14px!important;gap:12px!important;}
          .acc-prog .acc-prog-label{display:none;}
          .acc-bar{flex:1;}
        }
      `}</style>

      {/* SALUTATION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: GRIS }}>Bonjour</span>
          <span style={{ fontSize: '26px', fontWeight: 800, color: NAVY, letterSpacing: '-0.5px', lineHeight: 1.15 }}>{nom}</span>
        </div>
        <a href="/compte" aria-label="Mon compte" style={{ width: '46px', height: '46px', borderRadius: '50%', background: NAVY_GRAD, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, textDecoration: 'none', flexShrink: 0 }}>{initiale}</a>
      </div>

      {/* TUILES : compte à rebours, semaine, progression */}
      {saReelle && (
        <div className="acc-tiles">
          <div className="acc-tile" style={{ borderRadius: '22px', padding: '22px', background: NAVY_GRAD, boxShadow: '0 10px 26px rgba(12,29,46,0.22)', display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
            <p style={{ ...LABEL, color: SAUGE_BORD }}>Compte à rebours</p>
            {jours !== null && jours > 0 ? (
              <>
                <span className="acc-big" style={{ fontSize: '44px', fontWeight: 800, color: '#ffffff', letterSpacing: '-1.5px', lineHeight: 1 }}>{jours}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{jours === 1 ? 'jour avant bébé' : 'jours avant bébé'}</span>
              </>
            ) : (
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginTop: '6px' }}>Le terme est là</span>
            )}
          </div>

          <div className="acc-tile" style={{ borderRadius: '22px', padding: '22px', background: SAUGE, border: `1px solid ${SAUGE_BORD}`, display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
            <p style={{ ...LABEL, color: FORET }}>Cette semaine</p>
            <span className="acc-big" style={{ fontSize: '44px', fontWeight: 800, color: NAVY, letterSpacing: '-1.5px', lineHeight: 1 }}>SA {saReelle}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: FORET }}>{sgTexte} semaine de grossesse</span>
          </div>

          <div className="acc-tile acc-prog" style={{ borderRadius: '22px', padding: '22px', background: '#ffffff', border: '1px solid #E6E0D5', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', gap: '12px' }}>
            <p className="acc-prog-label" style={{ ...LABEL, color: TERRA }}>Progression</p>
            <div className="acc-bar" style={{ width: '100%', height: '10px', borderRadius: '99px', background: '#E8EEE5' }}>
              <div style={{ width: `${prog}%`, height: '10px', borderRadius: '99px', background: 'linear-gradient(90deg,#1A3D5C,#24507a)', transition: 'width .5s' }}></div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: NAVY, whiteSpace: 'nowrap' as const }}>{prog} % du chemin</span>
          </div>
        </div>
      )}

      {/* BÉBÉ CETTE SEMAINE */}
      {dataR && saReelle && (
        <div style={{ ...carteBlanche, padding: '18px', display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: TERRA_CLAIR, boxShadow: 'inset 0 0 0 8px #F8E9DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 100 100" width="48" height="48" role="img" aria-label={`Bébé à ${saReelle} SA`}>
                <path d="M50 22 C68 22 76 36 74 50 C72 64 62 72 52 75 C42 78 34 74 32 66 C30 58 36 52 42 50" stroke="#B4593A" strokeWidth="11" strokeLinecap="round" fill="none"/>
                <circle cx="52" cy="28" r="13" fill="#B4593A"/>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '4px', minWidth: 0 }}>
              <p style={{ ...LABEL, color: FORET }}>Bébé cette semaine</p>
              <p style={{ fontSize: '20px', fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.25, letterSpacing: '-0.3px' }}>{dataR.titre}</p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: GRIS, margin: 0 }}>{dataR.taille} · {dataR.poids}</p>
            </div>
          </div>
          {setActiveTab && (
            <button onClick={() => setActiveTab('bebe')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '46px', background: '#1A3D5C', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
              Voir cette semaine
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          )}
        </div>
      )}

      {/* TON RÔLE ET TES MISSIONS */}
      {dataR && (
        <div style={{ ...carteBlanche, padding: '20px' }}>
          <p style={{ ...LABEL, color: TERRA, marginBottom: '10px' }}>Ton rôle cette semaine</p>
          <p style={{ color: NAVY, fontSize: '16px', fontWeight: 700, lineHeight: 1.55, margin: '0 0 16px' }}>{dataR.maman_aide}</p>
          {missions.length > 0 && (
            <div style={{ borderTop: '1px solid #EEE7DC', paddingTop: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p style={{ ...LABEL, color: GRIS }}>Tes missions</p>
                <span style={{ fontSize: '12px', fontWeight: 800, color: missionsDone === missions.length ? FORET : TERRA }}>{missionsDone} / {missions.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
                {missions.map((m:string, i:number) => {
                  const id = `m${saReelle}_${i}`;
                  const done = missionsChecked[id];
                  return (
                    <button key={id} onClick={() => toggleM(id)} aria-pressed={!!done} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: done ? 'rgba(220,229,215,0.5)' : '#F6F1E9', borderRadius: '12px', padding: '11px 12px', border: 'none', cursor: 'pointer', textAlign: 'left' as const, width: '100%', minHeight: '44px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '7px', border: done ? 'none' : '2px solid #C9D3C4', background: done ? FORET : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxSizing: 'border-box' as const }}>
                        {done && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>}
                      </span>
                      <span style={{ color: done ? GRIS : NAVY, fontSize: '14px', fontWeight: 600, lineHeight: 1.5, textDecoration: done ? 'line-through' : 'none' }}>{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PROCHAIN RDV */}
      {nextRdv && (
        <div className="acc-card" style={{ ...carteBlanche, overflow: 'hidden' }}>
          <button onClick={() => toggle('rdv')} aria-expanded={open === 'rdv'} style={{ width: '100%', background: 'none', border: 'none', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' as const }}>
            <TuileIcone nom="rdv" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ ...LABEL, color: GRIS, marginBottom: '2px' }}>Prochain RDV{dpa && joursRestants ? ` · J-${Math.max(0,Math.ceil((new Date(new Date(dpa).getTime()-(41-nextRdv.sa)*7*24*60*60*1000).getTime()-new Date().getTime())/(1000*60*60*24)))}` : ''}</p>
              <p style={{ color: NAVY, fontSize: '15px', fontWeight: 800, margin: 0 }}>{nextRdv.titre}</p>
            </div>
            <Chevron ouvert={open === 'rdv'} />
          </button>
          {open === 'rdv' && (
            <div style={{ padding: '0 18px 18px', borderTop: '1px solid #EEE7DC' }}>
              <p style={{ color: NAVY, fontSize: '14px', lineHeight: 1.7, margin: '14px 0 12px' }}>{nextRdv.desc}</p>
              <p style={{ ...LABEL, color: GRIS, marginBottom: '6px' }}>Ma date de RDV</p>
              <input type="date" aria-label="Date de mon rendez-vous" value={nextRdvDate} onChange={e=>{saveRdv(e.target.value);saveRdvI(nextRdv.sa,e.target.value);}} style={{ background: '#F6F1E9', border: '1px solid #E6E0D5', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: NAVY, width: '100%', outline: 'none' }}/>
              {nextRdvDate && <p style={{ color: FORET, fontSize: '13px', margin: '8px 0 0', fontWeight: 700 }}>✓ Noté le {new Date(nextRdvDate).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
            </div>
          )}
        </div>
      )}

      {/* CE QUE VIT MAMAN */}
      {dataR && (
        <div className="acc-card" style={{ ...carteBlanche, overflow: 'hidden' }}>
          <button onClick={() => toggle('maman')} aria-expanded={open === 'maman'} style={{ width: '100%', background: 'none', border: 'none', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' as const }}>
            <TuileIcone nom="maman" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ ...LABEL, color: GRIS, marginBottom: '2px' }}>Ce que vit maman</p>
              <p style={{ color: NAVY, fontSize: '15px', fontWeight: 800, margin: 0 }}>{dataR.maman_titre}</p>
            </div>
            <Chevron ouvert={open === 'maman'} />
          </button>
          {open === 'maman' && (
            <div style={{ padding: '0 18px 18px', borderTop: '1px solid #EEE7DC' }}>
              <p style={{ color: NAVY, fontSize: '14px', lineHeight: 1.7, margin: '14px 0 14px' }}>{dataR.maman}</p>
              <div style={{ background: SAUGE, borderRadius: '12px', padding: '12px 14px' }}>
                <p style={{ ...LABEL, color: FORET, marginBottom: '4px' }}>Conseil</p>
                <p style={{ color: NAVY, fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{dataR.conseil}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* À SAVOIR */}
      {dataR && (
        <div className="acc-card" style={{ ...carteBlanche, overflow: 'hidden' }}>
          <button onClick={() => toggle('savoir')} aria-expanded={open === 'savoir'} style={{ width: '100%', background: 'none', border: 'none', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' as const }}>
            <TuileIcone nom="savoir" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ ...LABEL, color: GRIS, marginBottom: '2px' }}>À savoir cette semaine</p>
              <p style={{ color: NAVY, fontSize: '15px', fontWeight: 800, margin: 0 }}>{dataR.doc_titre}</p>
            </div>
            <Chevron ouvert={open === 'savoir'} />
          </button>
          {open === 'savoir' && (
            <div style={{ padding: '0 18px 18px', borderTop: '1px solid #EEE7DC' }}>
              <p style={{ color: NAVY, fontSize: '14px', lineHeight: 1.7, margin: '14px 0 14px' }}>{dataR.doc}</p>
              <div style={{ background: NAVY_GRAD, borderRadius: '12px', padding: '14px 16px' }}>
                <p style={{ ...LABEL, color: SAUGE_BORD, marginBottom: '6px' }}>Le savais-tu ?</p>
                <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{dataR.savistu}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* IDÉE DU MOIS */}
      <div className="acc-card" style={{ ...carteBlanche, overflow: 'hidden' }}>
        <button onClick={() => toggle('idee')} aria-expanded={open === 'idee'} style={{ width: '100%', background: 'none', border: 'none', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' as const }}>
          <TuileIcone nom="idee" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ ...LABEL, color: GRIS, marginBottom: '2px' }}>Idée du mois</p>
            <p style={{ color: NAVY, fontSize: '15px', fontWeight: 800, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{idee}</p>
          </div>
          <Chevron ouvert={open === 'idee'} />
        </button>
        {open === 'idee' && (
          <div style={{ padding: '0 18px 18px', borderTop: '1px solid #EEE7DC' }}>
            <p style={{ color: NAVY, fontSize: '14px', lineHeight: 1.7, margin: '14px 0 0' }}>{idee}</p>
          </div>
        )}
      </div>

      {/* MENTION MÉDICALE */}
      <div style={{ background: '#ffffff', borderRadius: '14px', padding: '12px 16px', border: '1px solid #E6E0D5' }}>
        <p style={{ color: GRIS, fontSize: '13px', lineHeight: 1.6, margin: 0 }}>DadUp ne remplace pas l&apos;avis d&apos;un médecin. En cas de doute, appelle ta sage-femme ou ton médecin.</p>
      </div>
    </div>
  );
}
