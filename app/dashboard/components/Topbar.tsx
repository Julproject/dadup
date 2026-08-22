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
  ];

  const navPost = [
    { id: 'home',    label: 'Ce mois-ci',  bg: '#E4F5EC', tc: '#0D6B40' },
    { id: 'bebe',    label: 'Mon bébé',    bg: '#E6F0FA', tc: '#2E5F8A' },
    { id: 'rdv',     label: 'Santé & RDV', bg: '#FFF0E6', tc: '#C04A1A' },
    { id: 'suivi',   label: 'Suivi J7',    bg: '#F0EEFF', tc: '#5050B0' },
    { id: 'atelier', label: 'Atelier',     bg: '#FFF7E0', tc: '#8A6010' },
    { id: 'dico',    label: 'Dico',       bg: '#E0F5F0', tc: '#0A5040' },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href="/compte" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e0dbd2', padding: '6px 12px', borderRadius: '6px', background: '#faf6f0' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: C.dark }}>
                {prenom || 'Mon compte'}
              </span>
              {saReelle && (
                <span style={{ fontSize: '11px', background: '#E6F0FA', color: '#1A4A7A', padding: '1px 6px', borderRadius: '3px', fontWeight: 600 }}>
                  {isPost ? `Mois ${moisBebe + 1}` : `SA ${saReelle}`}
                </span>
              )}
            </a>
            <a href="/contact-app" style={{ textDecoration: 'none', border: '1px solid #e0dbd2', padding: '6px 12px', borderRadius: '6px', background: '#faf6f0', fontSize: '13px', color: C.muted }}>
              Contact
            </a>
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
