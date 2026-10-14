'use client';

const LABEL = { fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#5f6b72', margin: '0 0 8px' };

// externe : page hors de l'app (textes légaux), ouverte par-dessus l'app installée pour pouvoir revenir
type Ligne = { titre: string; detail: string; href?: string; externe?: boolean; onClick?: () => void; icon: string };

const ICONS: Record<string, string> = {
  dico:    'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7',
  compte:  'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0',
  contact: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z',
  sources: 'M9 12l2 2 4-4M12 3l7 4v5c0 4.4-3 8-7 9-4-1-7-4.6-7-9V7z',
  legal:   'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6',
  sortie:  'M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4',
};

function Rangee({ l }: { l: Ligne }) {
  const contenu = (
    <>
      <span style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(160deg,#0c1d2e,#1A3D5C)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DCE5D7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[l.icon]} /></svg>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0, textAlign: 'left' as const }}>
        <span style={{ fontSize: '15px', fontWeight: 800, color: '#1e2535' }}>{l.titre}</span>
        <span style={{ fontSize: '13px', color: '#56616B', lineHeight: 1.5 }}>{l.detail}</span>
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3D5C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M9 6l6 6-6 6" /></svg>
    </>
  );
  const style = { display: 'flex', alignItems: 'center', gap: '14px', width: '100%', minHeight: '64px', padding: '14px 18px', background: '#ffffff', border: 'none', borderRadius: '20px', cursor: 'pointer', textDecoration: 'none', boxShadow: '0 2px 12px rgba(26,61,92,0.06)' };
  return l.href
    ? <a href={l.href} style={style} {...(l.externe ? { target: '_blank', rel: 'noopener' } : {})}>{contenu}</a>
    : <button onClick={l.onClick} style={style}>{contenu}</button>;
}

export default function PlusPage({ setActiveTab }: any) {
  const deconnexion = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
    window.location.href = '/login';
  };

  const outils: Ligne[] = [
    { titre: 'Dico du papa', detail: 'Les mots de la grossesse et de bébé, expliqués simplement', onClick: () => setActiveTab('dico'), icon: 'dico' },
  ];
  const compte: Ligne[] = [
    { titre: 'Mon compte', detail: 'Prénom, date prévue d\'accouchement, mot de passe', href: '/compte', icon: 'compte' },
    { titre: 'Mon accès', detail: 'Résiliation, remboursement intégral les 14 premiers jours', href: '/cancel', icon: 'legal' },
    { titre: 'Nous contacter', detail: 'Une question ? On répond en moins de 24h', href: '/contact-app', icon: 'contact' },
  ];
  const infos: Ligne[] = [
    { titre: 'Mentions légales', detail: 'Éditeur et hébergement du site', href: '/mentions-legales', externe: true, icon: 'legal' },
    { titre: 'CGV', detail: 'Conditions générales de vente', href: '/cgv', externe: true, icon: 'legal' },
    { titre: 'Confidentialité', detail: 'Ce que nous faisons de tes données', href: '/confidentialite', externe: true, icon: 'legal' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={LABEL}>Plus</p>
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e2535', margin: 0 }}>Outils et réglages</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {outils.map(l => <Rangee key={l.titre} l={l} />)}
      </div>

      <p style={{ ...LABEL, margin: '8px 0 0' }}>Mon compte</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {compte.map(l => <Rangee key={l.titre} l={l} />)}
      </div>

      <p style={{ ...LABEL, margin: '8px 0 0' }}>Informations</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {infos.map(l => <Rangee key={l.titre} l={l} />)}
      </div>

      <div style={{ marginTop: '8px' }}>
        <Rangee l={{ titre: 'Se déconnecter', detail: 'Tu pourras te reconnecter à tout moment', onClick: deconnexion, icon: 'sortie' }} />
      </div>
    </div>
  );
}
