'use client';
import { useState } from 'react';
import { COULEURS } from '../../../theme';

// ── Système visuel partagé du post-partum (identique à la partie grossesse) ──
export const NAVY = COULEURS.navy800;
export const NAVY_GRAD = COULEURS.navyGrad;
export const SAUGE = COULEURS.sauge;
export const SAUGE_BORD = COULEURS.saugeBord;
export const FORET = COULEURS.foret;
export const TERRA = COULEURS.terra;
export const TERRA_CLAIR = COULEURS.terraClair;
export const TERRA_TEXTE = COULEURS.terraTexte;
export const GRIS = COULEURS.texte2;
export const BORD = COULEURS.bord;

export const LABEL = { fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: 0 };
export const TEXTE = { fontSize: '14px', color: NAVY, lineHeight: 1.7, margin: 0 };
export const CARTE = { background: '#ffffff', borderRadius: '20px', boxShadow: '0 6px 20px rgba(21,38,58,0.06)' };

export const ICONES: Record<string, string> = {
  coeur:    'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  bebe:     'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0',
  jeu:      'M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8z',
  rdv:      'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M8 3v4M16 3v4',
  vaccin:   'M18 2l4 4M17 7l-9.5 9.5-3 1 1-3L15 5M14 4l6 6M6 18l-3 3',
  sante:    'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10zM12 9v5M9.5 11.5h5',
  alerte:   'M12 3l9 16H3zM12 10v4M12 17h.01',
  idee:     'M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3zM9 21h6',
  livre:    'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h5',
  chrono:   'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  valise:   'M4 8h16v12H4zM9 8V5h6v3M4 13h16',
  tel:      'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  naissance:'M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
};

export function TuileIcone({ nom, taille = 44 }: { nom: string; taille?: number }) {
  return (
    <span style={{ width: `${taille}px`, height: `${taille}px`, borderRadius: '12px', background: NAVY_GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SAUGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONES[nom] || ICONES.coeur} /></svg>
    </span>
  );
}

export function EnTete({ label, titre }: { label: string; titre: string }) {
  return (
    <div>
      <p style={{ ...LABEL, color: GRIS, marginBottom: '6px' }}>{label}</p>
      <h2 style={{ fontSize: '24px', fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.25, letterSpacing: '-0.4px' }}>{titre}</h2>
    </div>
  );
}

export function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <p style={{ ...LABEL, color: GRIS, margin: '6px 0 0' }}>{titre}</p>
      {children}
    </div>
  );
}

// Case à cocher commune (missions, valise, maison, administratif)
export function Case({ coche }: { coche: boolean }) {
  return (
    <span aria-hidden="true" style={{ width: '22px', height: '22px', borderRadius: '7px', border: coche ? 'none' : '2px solid #8A9298', background: coche ? FORET : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxSizing: 'border-box' as const, transition: 'background .15s ease' }}>
      {coche && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>}
    </span>
  );
}

// Chevron commun des cartes dépliables
export function Chevron({ ouvert }: { ouvert: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3D5C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0, transform: ouvert ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="M6 9l6 6 6-6" /></svg>
  );
}

type Item = { titre: string; contenu: React.ReactNode; icone?: string };

// Liste de cartes dépliables : la première est ouverte par défaut
export function Accordeons({ items, icone, premierOuvert = true }: { items: Item[]; icone: string; premierOuvert?: boolean }) {
  const [ouvert, setOuvert] = useState<number | null>(premierOuvert ? 0 : null);
  return (
    <>
      {items.map((it, i) => {
        const open = ouvert === i;
        return (
          <div key={i} className="pp-card" style={{ ...CARTE, overflow: 'hidden' }}>
            <button onClick={() => setOuvert(open ? null : i)} aria-expanded={open} style={{ width: '100%', minHeight: '64px', background: 'none', border: 'none', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' as const }}>
              <TuileIcone nom={it.icone || icone} />
              <span style={{ flex: 1, fontSize: '15px', fontWeight: 800, color: NAVY, lineHeight: 1.35 }}>{it.titre}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3D5C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {open && (
              <div style={{ padding: '0 18px 18px', borderTop: '1px solid #EEE7DC' }}>
                {typeof it.contenu === 'string'
                  ? <p style={{ ...TEXTE, marginTop: '14px' }}>{it.contenu}</p>
                  : <div style={{ marginTop: '14px' }}>{it.contenu}</div>}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

// Carte simple avec icône, libellé et texte
export function CarteInfo({ icone, label, texte, ton = 'blanc' }: { icone: string; label: string; texte: string; ton?: 'blanc' | 'sauge' | 'terra' }) {
  const fond = ton === 'sauge' ? SAUGE : ton === 'terra' ? '#F8E9DF' : '#ffffff';
  const bord = ton === 'sauge' ? SAUGE_BORD : ton === 'terra' ? TERRA_CLAIR : BORD;
  const couleurLabel = ton === 'sauge' ? FORET : ton === 'terra' ? TERRA_TEXTE : GRIS;
  return (
    <div style={{ background: fond, border: `1px solid ${bord}`, borderRadius: '20px', padding: '18px', display: 'flex', gap: '14px', alignItems: 'flex-start', boxShadow: ton === 'blanc' ? '0 6px 20px rgba(21,38,58,0.06)' : 'none' }}>
      <TuileIcone nom={icone} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0, flex: 1 }}>
        <p style={{ ...LABEL, color: couleurLabel }}>{label}</p>
        <p style={TEXTE}>{texte}</p>
      </div>
    </div>
  );
}

export const STYLES = `
  .pp-card{transition:transform .15s ease,box-shadow .15s ease;}
  .pp-card:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(21,38,58,0.10)!important;}
  .pp-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}
  .pp-tile{min-height:150px;}
  .pp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
  @media(max-width:640px){
    .pp-tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
    .pp-tile{min-height:128px;padding:18px!important;}
    .pp-big{font-size:34px!important;}
    .pp-prog{grid-column:1/-1;min-height:0!important;flex-direction:row!important;align-items:center!important;padding:12px 14px!important;gap:12px!important;}
    .pp-prog .pp-prog-label{display:none;}
    .pp-bar{flex:1;}
    .pp-grid{grid-template-columns:1fr;}
  }
`;
