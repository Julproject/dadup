'use client';
import { useState } from 'react';

const C = {
  dark: '#1e2535', blue: '#2E5F8A', blueDark: '#1A3D5C', gold: '#c8a060',
  white: '#ffffff', border: '#f0ede8', muted: '#9aa0a8',
};

export default function Topbar({ prenom, dpa, saReelle, tri, prog, isPost, moisBebe, activeTab, setActiveTab, onDeclareNaissance }: {
  prenom: string; dpa: string; saReelle: number | null; tri: string; prog: number;
  isPost: boolean; moisBebe: number;
  activeTab: string; setActiveTab: (t: string) => void;
  onDeclareNaissance: () => void;
}) {
  const navGrossesse = [
    { id: 'home',     label: 'Accueil',    bg: '#FFF0E6', tc: '#C04A1A' },
    { id: 'bebe',     label: 'Bébé',       bg: '#E4F5EC', tc: '#0D6B40' },
    { id: 'rdv',      label: 'RDV',        bg: '#E6F0FA', tc: '#1A4A7A' },
    { id: 'pratique', label: 'À préparer', bg: '#FFF7E0', tc: '#8A6010' },
    { id: 'psycho',   label: 'Psycho',     bg: '#F0EEFF', tc: '#5050B0' },
    { id: 'jourj',    label: 'Jour J',     bg: '#FDECEA', tc: '#C04A1A' },
    { id: 'dico',     label: 'Dico',       bg: '#E0F5F0', tc: '#0A5040' },
    { id: 'dico',     label: 'Dico',       bg: '#E0F5F0', tc: '#085041' },
  ];

  const navPost = [
    { id: 'home',    label: 'Ce mois-ci',  bg: '#E4F5EC', tc: '#0D6B40' },
    { id: 'bebe',    label: 'Mon bébé',    bg: '#E6F0FA', tc: '#2E5F8A' },
    { id: 'rdv',     label: 'Santé & RDV', bg: '#FFF0E6', tc: '#C04A1A' },
    { id: 'suivi',   label: 'Suivi J7',    bg: '#F0EEFF', tc: '#5050B0' },
    { id: 'atelier', label: 'Atelier',     bg: '#FFF7E0', tc: '#8A6010' },
    { id: 'dico',    label: 'Dico',       bg: '#E0F5F0', tc: '#0A5040' },
    { id: 'dico',    label: 'Dico',        bg: '#E0F5F0', tc: '#085041' },
  ];

  const tabs = isPost ? navPost : navGrossesse;

  return (
    <>
      <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, position: 'sticky', top: 0, zIndex: 40 }}>
        {/* Ligne 1 : logo + profil */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 28px', maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg viewBox="0 0 300 300" width="34" height="34">
              <circle cx="150" cy="150" r="145" fill="#1A3D5C" />
              <circle cx="150" cy="150" r="122" fill="#2E5F8A" />
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060" />
              <circle cx="150" cy="112" r="40" fill="#c8a060" />
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC" />
              <circle cx="150" cy="128" r="26" fill="#F7FAFC" />
            </svg>
            <span style={{ fontSize: '20px', fontWeight: 900, color: C.dark, letterSpacing: '-0.3px' }}>DadUp</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Avatar initiale + badge SA */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#1A3D5C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#c8a060' }}>
              {prenom ? prenom[0].toUpperCase() : 'D'}
            </div>
            {saReelle && (
              <div style={{ position: 'absolute', bottom: '-4px', right: '-6px', background: '#c8a060', borderRadius: '10px', padding: '1px 5px', fontSize: '9px', fontWeight: 700, color: '#1c1510', border: '1.5px solid #ffffff', whiteSpace: 'nowrap' as const }}>
                {isPost ? `M${moisBebe + 1}` : `${saReelle}SA`}
              </div>
            )}
          </div>

          {/* Séparateur */}
          <div style={{ width: '1px', height: '22px', background: '#f0ede8' }} />

          {/* Icônes nues */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <a href="/contact-app" title="Nous contacter" style={{ display: 'flex', alignItems: 'center', opacity: 0.4, textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" />
              </svg>
            </a>
            <a href="/compte" title="Mon compte" style={{ display: 'flex', alignItems: 'center', opacity: 0.4, textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </a>
            <button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); localStorage.clear(); window.location.href = '/login'; }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', opacity: 0.4 }} title="Se déconnecter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </button>
          </div>

          </div>
        </div>

        {/* Ligne 2 : onglets */}
        <div style={{ display: 'flex', gap: '6px', padding: '0 24px 12px', overflowX: 'auto' as const, maxWidth: '1180px', margin: '0 auto' }}>
          {tabs.map(n => {
            const on = activeTab === n.id;
            return (
              <button key={n.id} onClick={() => setActiveTab(n.id)} style={{
                padding: '8px 20px', fontSize: '13px', fontWeight: 800, border: 'none',
                borderRadius: '24px', cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0,
                background: on ? C.dark : n.bg, color: on ? C.white : n.tc,
              }}>{n.label}</button>
            );
          })}
        </div>
      </div>

    </>
  );
}
