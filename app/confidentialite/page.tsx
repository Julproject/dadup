'use client';

export default function ConfidentialitePage() {
  return (
    
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
          <a href="/mentions-legales" style={{ color: '#9aa0a8', textDecoration: 'none' }}>Mentions légales</a>
          <a href="/" style={{ color: '#9aa0a8', textDecoration: 'none', fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <p style={{ color: '#2E5F8A', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Légal</p>
        <h1 style={{ color: '#1e2535', fontSize: '32px', fontWeight: 800, margin: '0 0 40px' }}>Politique de Confidentialité</h1>

        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>DadUp accorde une importance particulière à la protection de vos données personnelles. Cette politique décrit quelles données sont collectées, pourquoi, comment elles sont protégées et quels sont vos droits.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>1. Responsable du traitement</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>DadUp, entreprise individuelle (EI), SIRET 10349796200011, dont le siège est situé au 19 avenue de la préservation, 33000 Bordeaux. Contact : hello@dadup.fr.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>2. Données collectées</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>DadUp collecte uniquement les données nécessaires au fonctionnement du Service. Données fournies par l&apos;Utilisateur : adresse email (obligatoire), prénom (facultatif), date prévue d&apos;accouchement (nécessaire au suivi), mot de passe (stocké sous forme hachée via bcrypt). Données automatiques : cookie de session (supprimé à la déconnexion, aucune donnée personnelle stockée), logs serveur (sécurité technique uniquement). Aucune donnée bancaire n&apos;est collectée par DadUp.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>3. Finalités et bases légales</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Gestion du compte et fourniture du Service, exécution du contrat (art. 6.1.b RGPD). Communications transactionnelles, exécution du contrat. Obligations comptables, obligation légale (art. 6.1.c RGPD). Sécurité, intérêt légitime (art. 6.1.f RGPD). DadUp n&apos;utilise pas vos données à des fins publicitaires ou de vente à des tiers.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>4. Durées de conservation</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Données du compte : durée de l&apos;abonnement actif + 3 ans après expiration. Données comptables : 10 ans (article L.123-22 du Code de commerce). Échanges support : 3 ans à compter du dernier contact.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>5. Sous-traitants et transferts hors UE</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Vercel Inc. (hébergement), États-Unis, encadré par les Clauses Contractuelles Types (CCT). Supabase Inc. (base de données), États-Unis, stockage en région européenne, CCT. Stripe Inc. (paiement), États-Unis, certifié EU-US Data Privacy Framework (DPF, décision du 10/07/2023). Brevo SAS (emails), France, données hébergées en Europe.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>6. Cookies</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le Site utilise un unique cookie technique (dadup_session) permettant de maintenir la session. Il est supprimé à la déconnexion. Aucune donnée personnelle n&apos;est stockée dans ce cookie. Attributs : HttpOnly, Secure, SameSite=Lax. Aucun consentement requis (article 82 loi Informatique et Libertés). Aucun cookie publicitaire ou analytique n&apos;est déployé.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>7. Sécurité</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Chiffrement TLS sur l&apos;ensemble du Site. Mots de passe hachés via bcrypt. Cookie de session en HttpOnly/Secure. Paiements traités par Stripe (certifié PCI DSS niveau 1). En cas de violation présentant un risque, la CNIL est notifiée sous 72 heures.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>8. Vos droits</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de portabilité, d&apos;opposition et de limitation. Ces droits s&apos;exercent par email à hello@dadup.fr. Réponse sous 1 mois. En cas de réponse insatisfaisante : CNIL, www.cnil.fr.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>9. Mineurs</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le Service est réservé aux personnes majeures. Contactez hello@dadup.fr pour suppression de tout compte créé par un mineur.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>10. Modifications</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>En cas de modification substantielle, les Utilisateurs actifs en sont informés par email au moins 30 jours avant l&apos;entrée en vigueur.</p>
      </div>

      <footer style={{ background: '#1e2535', borderTop: '1px solid #2e3848', padding: '32px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <a href="/pourquoi" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Pourquoi DadUp</a>
            <a href="/inclus" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Ce qui est inclus</a>
            <a href="/tarifs" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Tarifs</a>
            <a href="/contact" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Contactez-nous</a>
            <a href="/cgv" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>CGV</a>
            <a href="/mentions-legales" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Mentions légales</a>
          </div>
          <p style={{ color: '#3d4f6a', fontSize: '12px', margin: '0' }}>DadUp, SIRET 10349796200011, hello@dadup.fr</p>
        </div>
      </footer>

    </main>
    </>
  );
}
