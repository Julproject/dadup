'use client';

export default function MentionsLegalesPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        @media(max-width:768px){
          .nl{display:none!important;}
          .nc{display:none!important;}
          .sp{padding:32px 16px!important;}
          nav{padding:0 16px!important;}
          h1{font-size:32px!important;line-height:1.15!important;}
          h2{font-size:24px!important;}
          .prix{font-size:48px!important;}
          .hero-grid{grid-template-columns:1fr!important;gap:24px!important;padding:40px 16px 0!important;}
          .hero-img-wrap{height:220px!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;padding:20px 16px!important;}
          .stats-item{border-left:none!important;border-top:1px solid #2e3848;padding:14px!important;}
          .stats-item:nth-child(2){border-left:1px solid #2e3848!important;}
          .modules-grid{grid-template-columns:1fr!important;}
          .quote-grid{grid-template-columns:1fr!important;gap:24px!important;}
          .newbie-grid>div{flex:1 1 100%!important;max-width:100%!important;}
          .temoignages-grid{grid-template-columns:1fr!important;}
          .aa{grid-template-columns:1fr!important;}
          .tg{grid-template-columns:1fr!important;}
          .mg{grid-template-columns:1fr!important;gap:24px!important;}
          .footer-inner{flex-direction:column!important;gap:16px!important;text-align:center!important;}
          .footer-links{flex-wrap:wrap!important;justify-content:center!important;gap:12px!important;}
          section{padding:48px 16px!important;}
          .section-pad{padding:48px 16px!important;}
          .cta-section{padding:48px 16px!important;}
          .footer-section{padding:24px 16px!important;}
        }
      `}</style>
      <main style={{ minHeight: '100vh', background: '#faf6f0', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color: '#4a5568' }}>

      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e8e0d0', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg viewBox="0 0 300 300" width="30" height="30"><circle cx="150" cy="150" r="145" fill="#1A3D5C"/><circle cx="150" cy="150" r="122" fill="#2E5F8A"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/><circle cx="150" cy="128" r="26" fill="#F7FAFC"/></svg>
          <span style={{ fontWeight: 800, color: '#1e2535', fontSize: '17px' }}>DadUp</span>
        </a>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/cgv" style={{ color: '#9aa0a8', textDecoration: 'none' }}>CGV</a>
          <a href="/confidentialite" style={{ color: '#9aa0a8', textDecoration: 'none' }}>Confidentialité</a>
          <a href="/" style={{ color: '#9aa0a8', textDecoration: 'none', fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <p style={{ color: '#2E5F8A', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Légal</p>
        <h1 style={{ color: '#1e2535', fontSize: '32px', fontWeight: 800, margin: '0 0 40px' }}>Mentions Légales</h1>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>1. Éditeur du site</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le site dadup.fr est édité par DadUp, entreprise individuelle (EI), immatriculée sous le numéro SIRET 10349796200011, dont le siège est situé au 19 avenue de la préservation, 33000 Bordeaux, France. Email : hello@dadup.fr.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>2. Hébergeur</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Site : vercel.com.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>3. Propriété intellectuelle</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>L&apos;ensemble des contenus du site dadup.fr sont la propriété de DadUp et sont protégés par le droit français et international de la propriété intellectuelle. Toute reproduction sans autorisation écrite préalable est interdite.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>4. Responsabilité</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Les contenus du Site sont rédigés à titre informatif et ne constituent pas un avis médical. En cas d&apos;urgence médicale : 15 (SAMU), 18 (Pompiers) ou 112.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>5. Données personnelles</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le traitement des données personnelles est décrit dans la <a href="/confidentialite" style={{ color: '#2E5F8A' }}>Politique de Confidentialité</a>. Responsable du traitement : DadUp, hello@dadup.fr. Réclamation possible auprès de la CNIL (www.cnil.fr).</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>6. Cookies</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le Site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou analytique n&apos;est utilisé.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>7. Droit applicable</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le présent site est soumis au droit français. En cas de litige, les tribunaux français sont compétents.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>8. Médiation</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>En cas de litige non résolu, recours possible auprès du CM2C, 49 rue de Ponthieu, 75008 Paris, 01 89 47 00 14, www.cm2c.net/declarer-un-litige.php, litiges@cm2c.net.</p>
      </div>

      <footer style={{ background: '#1e2535', borderTop: '1px solid #2e3848', padding: '32px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <a href="/pourquoi" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Pourquoi DadUp</a>
            <a href="/inclus" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Ce qui est inclus</a>
            <a href="/tarifs" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Tarifs</a>
            <a href="/contact" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Contactez-nous</a>
            <a href="/cgv" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>CGV</a>
            <a href="/confidentialite" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Confidentialité</a>
          </div>
          <p style={{ color: '#3d4f6a', fontSize: '12px', margin: '0' }}>DadUp, SIRET 10349796200011, hello@dadup.fr</p>
        </div>
      </footer>

    </main>
    </>
  );
}
