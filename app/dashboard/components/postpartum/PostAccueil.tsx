'use client';
import { NAVY, NAVY_GRAD, SAUGE, SAUGE_BORD, FORET, TERRA, TERRA_CLAIR, GRIS, BORD, LABEL, TEXTE, CARTE, STYLES, Section, Accordeons, CarteInfo } from './ui';

export default function PostAccueil({ moisBebe, dataBebe, joursRestants, prenom, setActiveTab }: any) {
  if (!dataBebe) return null;
  const jours = Math.abs(joursRestants || 0);
  const mois = (moisBebe || 0) + 1;
  const progAnnee = Math.min(100, Math.round((jours / 365) * 100));
  const papa = dataBebe.papa || [];
  const activites = dataBebe.activites || [];
  const nom = prenom || 'jeune papa';
  const initiale = (prenom || 'D').trim().charAt(0).toUpperCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style>{STYLES}</style>

      {/* SALUTATION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: GRIS }}>Bonjour</span>
          <span style={{ fontSize: '26px', fontWeight: 800, color: NAVY, letterSpacing: '-0.5px', lineHeight: 1.15 }}>{nom}</span>
        </div>
        <a href="/compte" aria-label="Mon compte" style={{ width: '46px', height: '46px', borderRadius: '50%', background: NAVY_GRAD, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, textDecoration: 'none', flexShrink: 0 }}>{initiale}</a>
      </div>

      {/* TUILES */}
      <div className="pp-tiles">
        <div className="pp-tile" style={{ borderRadius: '22px', padding: '22px', background: NAVY_GRAD, boxShadow: '0 10px 26px rgba(12,29,46,0.22)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ ...LABEL, color: SAUGE_BORD }}>Bébé a</p>
          <span className="pp-big" style={{ fontSize: '44px', fontWeight: 800, color: '#ffffff', letterSpacing: '-1.5px', lineHeight: 1 }}>{jours}</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{jours > 1 ? 'jours de vie' : 'jour de vie'}</span>
        </div>
        <div className="pp-tile" style={{ borderRadius: '22px', padding: '22px', background: SAUGE, border: `1px solid ${SAUGE_BORD}`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ ...LABEL, color: FORET }}>Ce mois-ci</p>
          <span className="pp-big" style={{ fontSize: '44px', fontWeight: 800, color: NAVY, letterSpacing: '-1.5px', lineHeight: 1 }}>Mois {mois}</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: FORET }}>{dataBebe.titre}</span>
        </div>
        <div className="pp-tile pp-prog" style={{ borderRadius: '22px', padding: '22px', background: '#ffffff', border: `1px solid ${BORD}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
          <p className="pp-prog-label" style={{ ...LABEL, color: TERRA }}>Première année</p>
          <div className="pp-bar" style={{ width: '100%', height: '10px', borderRadius: '99px', background: '#E8EEE5' }}>
            <div style={{ width: `${progAnnee}%`, height: '10px', borderRadius: '99px', background: 'linear-gradient(90deg,#1A3D5C,#24507a)' }}></div>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 800, color: NAVY, whiteSpace: 'nowrap' }}>{progAnnee} % de la 1re année</span>
        </div>
      </div>

      {/* LE MOIS DE BÉBÉ */}
      <div style={{ ...CARTE, padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: TERRA_CLAIR, boxShadow: 'inset 0 0 0 7px #F8E9DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0" /></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ ...LABEL, color: FORET, marginBottom: '4px' }}>Bébé ce mois-ci</p>
            <p style={{ fontSize: '20px', fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.25 }}>{dataBebe.titre}</p>
          </div>
        </div>
        {dataBebe.intro && <p style={TEXTE}>{dataBebe.intro}</p>}
        {setActiveTab && (
          <button onClick={() => setActiveTab('bebe')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '46px', background: '#1A3D5C', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
            Voir son développement
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        )}
      </div>

      {/* POUR TOI */}
      {papa.length > 0 && (
        <Section titre="Pour toi ce mois-ci">
          <Accordeons items={papa} icone="coeur" />
        </Section>
      )}

      {/* ACTIVITÉS */}
      {activites.length > 0 && (
        <Section titre="Activités avec bébé">
          <div className="pp-grid">
            {activites.map((a: any, i: number) => (
              <div key={i} style={{ ...CARTE, padding: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontSize: '15px', fontWeight: 800, color: NAVY, margin: 0 }}>{a.titre}</p>
                <p style={{ ...TEXTE, color: '#3d4a55' }}>{a.contenu}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* RENDEZ-VOUS */}
      {dataBebe.rdv && <CarteInfo icone="rdv" label="Rendez-vous ce mois-ci" texte={dataBebe.rdv} />}

      {/* MENTION */}
      <div style={{ background: '#ffffff', borderRadius: '14px', padding: '12px 16px', border: `1px solid ${BORD}` }}>
        <p style={{ color: GRIS, fontSize: '13px', lineHeight: 1.6, margin: 0 }}>DadUp ne remplace pas l&apos;avis d&apos;un médecin. En cas de doute, appelle ton médecin ou le 15 en urgence.</p>
      </div>
    </div>
  );
}
