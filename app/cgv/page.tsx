'use client';

export default function CGVPage() {
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
          <a href="/confidentialite" style={{ color: '#9aa0a8', textDecoration: 'none' }}>Confidentialité</a>
          <a href="/mentions-legales" style={{ color: '#9aa0a8', textDecoration: 'none' }}>Mentions légales</a>
          <a href="/" style={{ color: '#9aa0a8', textDecoration: 'none', fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <p style={{ color: '#2E5F8A', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Légal</p>
        <h1 style={{ color: '#1e2535', fontSize: '32px', fontWeight: 800, margin: '0 0 8px' }}>Conditions Générales de Vente</h1>
        <p style={{ color: '#9aa0a8', fontSize: '13px', fontStyle: 'italic', margin: '0 0 40px' }}>Les présentes CGV régissent exclusivement la relation commerciale entre DadUp et ses Utilisateurs.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 1, Éditeur</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le site dadup.fr et le service DadUp sont édités par DadUp, entreprise individuelle (EI), SIRET 10349796200011, dont le siège est situé au 19 avenue de la préservation, 33000 Bordeaux. Contact : hello@dadup.fr.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 2, Objet</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Les présentes CGV régissent les relations contractuelles entre DadUp et tout utilisateur souscrivant à l&apos;abonnement payant. Toute souscription vaut acceptation entière des présentes CGV. En cas de modification substantielle, les abonnés actifs en sont informés par email au moins 30 jours avant l&apos;entrée en vigueur.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 3, Description du Service</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>DadUp est un service numérique d&apos;information et d&apos;accompagnement proposant un suivi hebdomadaire personnalisé adapté à la date prévue d&apos;accouchement, des contenus d&apos;information sur la période périnatale, un module post-natal, un glossaire, des outils d&apos;organisation et un accès au support par email. Les contenus sont rédigés à titre informatif et ne constituent pas un avis médical.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 4, Conditions d&apos;accès</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>L&apos;accès est réservé aux personnes physiques majeures (18 ans révolus). L&apos;Utilisateur est seul responsable de la confidentialité de ses identifiants.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 5, Tarifs et paiement</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>L&apos;abonnement DadUp est proposé au prix de 35,99 € TTC par an. Toute modification est notifiée par email au moins 30 jours avant son entrée en vigueur. Le paiement est réalisé par carte bancaire via Stripe. DadUp ne collecte ni ne stocke aucune donnée bancaire. L&apos;abonnement expire automatiquement à son échéance, sans reconduction tacite et sans prélèvement automatique.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 6, Droit de rétractation</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Conformément aux articles L.221-18 et suivants du Code de la consommation, l&apos;Utilisateur dispose d&apos;un droit de rétractation de 14 jours calendaires à compter de la date de souscription, sans condition, même si le Service a commencé à être utilisé. Pour l&apos;exercer : email à hello@dadup.fr avec nom, prénom, email de connexion, date de souscription. Remboursement sous 14 jours.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 7, Fin de l&apos;accès</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>L&apos;abonnement prend fin automatiquement à son échéance. L&apos;Utilisateur peut clôturer son compte depuis Mon compte → Se désinscrire. La clôture est immédiate, sans remboursement proratisé sauf exercice du droit de rétractation.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 8, Obligations de l&apos;Utilisateur</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>L&apos;Utilisateur s&apos;engage à fournir des informations exactes, à préserver la confidentialité de ses identifiants, à utiliser le Service à des fins personnelles et à ne pas reproduire les contenus sans autorisation.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 9, Responsabilité</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Les contenus sont informatifs et ne remplacent pas un professionnel de santé. Urgence médicale : 15, 18 ou 112. La responsabilité de DadUp ne peut être engagée qu&apos;en cas de faute directe. Les dommages indirects sont exclus. Ces limitations ne s&apos;appliquent pas en cas de dol ou faute lourde.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 10, Propriété intellectuelle</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>L&apos;ensemble des éléments du Service appartiennent à DadUp et sont protégés par le droit de la propriété intellectuelle. L&apos;Utilisateur bénéficie d&apos;un droit d&apos;accès personnel et non cessible pour la durée de son abonnement.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 11, Données personnelles</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>La Politique de Confidentialité complète est disponible sur le Site. DadUp est responsable du traitement au sens du RGPD. Droits exercisables à hello@dadup.fr ou auprès de la CNIL (www.cnil.fr). Sous-traitants : Vercel Inc. (CCT), Supabase Inc. (CCT), Stripe Inc. (DPF), Brevo SAS (France).</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 12, Cookies</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Le Site utilise uniquement des cookies techniques nécessaires au maintien de la session. Aucun consentement requis (article 82 loi Informatique et Libertés). Aucun cookie publicitaire ou analytique n&apos;est déployé.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 13, Force majeure</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Aucune des parties n&apos;est responsable d&apos;un manquement résultant d&apos;un événement de force majeure au sens de l&apos;article 1218 du Code civil.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 14, Médiation</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>En cas de différend : hello@dadup.fr (réponse sous 15 jours ouvrés). Recours gratuit possible auprès du CM2C, 49 rue de Ponthieu, 75008 Paris, 01 89 47 00 14, www.cm2c.net/declarer-un-litige.php, litiges@cm2c.net.</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 15, Droit applicable</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Les présentes CGV sont soumises au droit français. En cas de litige, l&apos;Utilisateur peut saisir la juridiction du lieu où il demeurait à la conclusion du contrat (article R.631-3 du Code de la consommation).</p>

        <h2 style={{ color: '#1A3D5C', fontSize: '15px', fontWeight: 700, margin: '36px 0 8px' }}>Article 16, Dispositions générales</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, margin: '0 0 14px' }}>Intégralité : les présentes CGV constituent l&apos;intégralité de l&apos;accord. Divisibilité : si une clause est nulle, les autres demeurent en vigueur. Cession : DadUp peut céder le contrat après en avoir informé l&apos;Utilisateur.</p>
      </div>

      <footer style={{ background: '#1e2535', borderTop: '1px solid #2e3848', padding: '32px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <a href="/pourquoi" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Pourquoi DadUp</a>
            <a href="/inclus" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Ce qui est inclus</a>
            <a href="/tarifs" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Tarifs</a>
              <a href="/professionnels" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Professionnels</a>
              <a href="/sources" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Sources</a>
            <a href="/contact" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Contactez-nous</a>
            <a href="/confidentialite" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Confidentialité</a>
            <a href="/mentions-legales" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Mentions légales</a>
          </div>
          <p style={{ color: '#3d4f6a', fontSize: '12px', margin: '0' }}>DadUp, SIRET 10349796200011, hello@dadup.fr</p>
        </div>
      </footer>

    </main>
    </>
  );
}
