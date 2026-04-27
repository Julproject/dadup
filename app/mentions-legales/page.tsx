'use client';

export default function MentionsLegalesPage() {
  const s = {
    main: { minHeight: '100vh', background: '#faf6f0', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color: '#4a5568' },
    nav: { background: '#ffffff', borderBottom: '1px solid #e8e0d0', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' },
    wrap: { maxWidth: '680px', margin: '0 auto', padding: '60px 24px 80px' },
    label: { color: '#2E5F8A', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 12px' },
    h1: { color: '#1e2535', fontSize: '32px', fontWeight: 800, margin: '0 0 8px' },
    date: { color: '#9aa0a8', fontSize: '14px', margin: '0 0 40px' },
    h2: { color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' },
    p: { fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' },
    footer: { borderTop: '1px solid #e8e0d0', marginTop: '60px', paddingTop: '24px', fontSize: '13px', color: '#9aa0a8' },
    link: { color: '#9aa0a8', textDecoration: 'none' as const },
  };

  return (
    <main style={s.main}>
      <nav style={s.nav}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg viewBox="0 0 300 300" width="30" height="30"><circle cx="150" cy="150" r="145" fill="#1A3D5C"/><circle cx="150" cy="150" r="122" fill="#2E5F8A"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/><circle cx="150" cy="128" r="26" fill="#F7FAFC"/></svg>
          <span style={{ fontWeight: 800, color: '#1e2535', fontSize: '17px' }}>DadUp</span>
        </a>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/cgv" style={s.link}>CGV</a>
          <a href="/confidentialite" style={s.link}>Confidentialité</a>
          <a href="/" style={{ ...s.link, fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={s.wrap}>
        <p style={s.label}>Légal</p>
        <h1 style={s.h1}>Mentions Légales</h1>
        <p style={s.date}>Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique</p>

        <h2 style={s.h2}>1. Éditeur du site</h2>
        <p style={s.p}>Le site dadup.fr est édité par DadUp, entreprise individuelle (EI), immatriculée sous le numéro SIRET 10349796200011, dont le siège est situé au 19 avenue de la préservation, 33000 Bordeaux, France. Email : hello@dadup.fr.</p>

        <h2 style={s.h2}>2. Hébergeur</h2>
        <p style={s.p}>Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Site : vercel.com.</p>

        <h2 style={s.h2}>3. Propriété intellectuelle</h2>
        <p style={s.p}>L'ensemble des contenus du site dadup.fr (textes, données, visuels, interface, code source) sont la propriété de DadUp et sont protégés par le droit français et international de la propriété intellectuelle. Toute reproduction sans autorisation écrite préalable est interdite.</p>

        <h2 style={s.h2}>4. Responsabilité</h2>
        <p style={s.p}>Les contenus du Site sont rédigés à titre informatif et ne constituent pas un avis médical. En cas d'urgence médicale : 15 (SAMU), 18 (Pompiers) ou 112. DadUp ne saurait être tenu responsable des décisions prises sur la base des informations publiées.</p>

        <h2 style={s.h2}>5. Données personnelles</h2>
        <p style={s.p}>Le traitement des données personnelles est décrit dans la <a href="/confidentialite" style={{ color: '#2E5F8A' }}>Politique de Confidentialité</a>. Responsable du traitement : DadUp — hello@dadup.fr. Réclamation possible auprès de la CNIL (www.cnil.fr).</p>

        <h2 style={s.h2}>6. Cookies</h2>
        <p style={s.p}>Le Site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou analytique n'est utilisé. Voir la <a href="/confidentialite" style={{ color: '#2E5F8A' }}>Politique de Confidentialité</a>.</p>

        <h2 style={s.h2}>7. Droit applicable</h2>
        <p style={s.p}>Le présent site est soumis au droit français. En cas de litige, les tribunaux français sont compétents.</p>

        <h2 style={s.h2}>8. Médiation</h2>
        <p style={s.p}>En cas de litige non résolu, recours possible auprès du CM2C, 49 rue de Ponthieu, 75008 Paris — 01 89 47 00 14 — www.cm2c.net/declarer-un-litige.php — litiges@cm2c.net.</p>

        <div style={s.footer}>
          <p>DadUp — SIRET 10349796200011 — hello@dadup.fr</p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <a href="/cgv" style={s.link}>CGV</a>
            <a href="/confidentialite" style={s.link}>Politique de confidentialité</a>
            <a href="/" style={s.link}>Accueil</a>
          </div>
        </div>
      </div>
    </main>
  );
}
