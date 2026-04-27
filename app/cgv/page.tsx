'use client';

export default function CGVPage() {
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
          <a href="/confidentialite" style={s.link}>Confidentialité</a>
          <a href="/mentions-legales" style={s.link}>Mentions légales</a>
          <a href="/" style={{ ...s.link, fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={s.wrap}>
        <p style={s.label}>Légal</p>
        <h1 style={s.h1}>Conditions Générales de Vente</h1>
        <p style={s.date}>Version en vigueur au 27 avril 2026</p>

        <p style={s.p}><em>Les présentes CGV régissent exclusivement la relation commerciale entre DadUp et ses Utilisateurs. Elles sont distinctes des Mentions Légales et de la Politique de Confidentialité, disponibles séparément sur le Site.</em></p>

        <h2 style={s.h2}>Article 1 — Éditeur</h2>
        <p style={s.p}>Le site dadup.fr et le service DadUp sont édités par DadUp, entreprise individuelle (EI), SIRET 10349796200011, dont le siège est situé au 19 avenue de la préservation, 33000 Bordeaux. Contact : hello@dadup.fr.</p>

        <h2 style={s.h2}>Article 2 — Objet</h2>
        <p style={s.p}>Les présentes CGV régissent les relations contractuelles entre DadUp et tout utilisateur souscrivant à l'abonnement payant donnant accès au Service. Toute souscription vaut acceptation entière des présentes CGV. En cas de modification substantielle, les Utilisateurs ayant un abonnement actif en sont informés par email au moins 30 jours avant l'entrée en vigueur.</p>

        <h2 style={s.h2}>Article 3 — Description du Service</h2>
        <p style={s.p}>DadUp est un service numérique d'information et d'accompagnement, accessible par abonnement, proposant un suivi hebdomadaire personnalisé adapté à la date prévue d'accouchement, des contenus d'information sur la période périnatale, un module post-natal, un glossaire des termes courants, des outils d'organisation personnelle et un accès au support par email.</p>
        <p style={s.p}>Les contenus sont rédigés à titre informatif et ne constituent pas un avis médical, un diagnostic ou une prescription. Ils ne remplacent pas la consultation d'un professionnel de santé.</p>

        <h2 style={s.h2}>Article 4 — Conditions d'accès</h2>
        <p style={s.p}>L'accès est réservé aux personnes physiques majeures (18 ans révolus) disposant de la pleine capacité juridique. L'Utilisateur est seul responsable de la confidentialité de ses identifiants.</p>

        <h2 style={s.h2}>Article 5 — Tarifs et paiement</h2>
        <p style={s.p}>L'abonnement DadUp est proposé au prix de 35,99 € TTC par an. Toute modification de prix est notifiée par email au moins 30 jours avant son entrée en vigueur.</p>
        <p style={s.p}>Le paiement est réalisé par carte bancaire via Stripe (Stripe, Inc., 510 Townsend Street, San Francisco, CA 94103, États-Unis). DadUp ne collecte ni ne stocke aucune donnée bancaire.</p>
        <p style={s.p}>L'abonnement est souscrit pour une durée déterminée de 12 mois. À l'échéance, il expire automatiquement, sans reconduction tacite et sans prélèvement automatique. Aucun montant supplémentaire ne peut être débité sans nouvelle commande expresse de l'Utilisateur.</p>

        <h2 style={s.h2}>Article 6 — Droit de rétractation</h2>
        <p style={s.p}>Conformément aux articles L.221-18 et suivants du Code de la consommation, l'Utilisateur dispose d'un droit de rétractation de 14 jours calendaires à compter de la date de souscription, sans obligation de motiver sa décision. Ce droit s'applique sans condition, même si l'Utilisateur a commencé à utiliser le Service.</p>
        <p style={s.p}>Pour l'exercer : envoyer un email à hello@dadup.fr avec nom, prénom, email de connexion, date de souscription et volonté de se rétracter. Le remboursement intervient dans un délai de 14 jours à compter de la réception d'une demande valide, par le même moyen de paiement.</p>

        <h2 style={s.h2}>Article 7 — Fin de l'accès au Service</h2>
        <p style={s.p}>L'abonnement prend fin automatiquement à son échéance. Aucune démarche n'est nécessaire. L'Utilisateur peut clôturer son compte à tout moment depuis « Mon compte » {'>'} « Se désinscrire » ; la clôture est immédiate, sans remboursement proratisé sauf exercice du droit de rétractation (Article 6). DadUp peut clôturer un compte en cas de manquement grave ; l'Utilisateur en est informé par email.</p>

        <h2 style={s.h2}>Article 8 — Obligations de l'Utilisateur</h2>
        <p style={s.p}>L'Utilisateur s'engage à fournir des informations exactes, à préserver la confidentialité de ses identifiants, à utiliser le Service à des fins personnelles uniquement et à ne pas reproduire les contenus sans autorisation.</p>

        <h2 style={s.h2}>Article 9 — Responsabilité</h2>
        <p style={s.p}>Les contenus sont informatifs et ne remplacent pas un professionnel de santé. En cas d'urgence médicale : 15 (SAMU), 18 (Pompiers) ou 112. La responsabilité de DadUp ne peut être engagée qu'en cas de faute directe. Les dommages indirects sont exclus. Elle ne peut excéder le montant de l'abonnement annuel payé. Ces limitations ne s'appliquent pas en cas de dol ou faute lourde, ni aux droits légaux du consommateur.</p>

        <h2 style={s.h2}>Article 10 — Propriété intellectuelle</h2>
        <p style={s.p}>L'ensemble des éléments du Service appartiennent à DadUp et sont protégés par le droit de la propriété intellectuelle. L'Utilisateur bénéficie d'un droit d'accès personnel, non exclusif et non cessible pour la durée de son abonnement.</p>

        <h2 style={s.h2}>Article 11 — Données personnelles</h2>
        <p style={s.p}>DadUp est responsable du traitement des données au sens du RGPD (Règlement UE 2016/679). Données collectées : email, prénom (facultatif), DPA, logs techniques. Aucune donnée bancaire. Droits exercisables à hello@dadup.fr ou auprès de la CNIL (www.cnil.fr). La Politique de Confidentialité complète est disponible sur le Site. Sous-traitants : Vercel Inc. (hébergement, CCT), Supabase Inc. (base de données, CCT), Stripe Inc. (paiement, DPF — décision UE 10/07/2023), Brevo SAS (emails, France).</p>

        <h2 style={s.h2}>Article 12 — Cookies</h2>
        <p style={s.p}>Le Site utilise uniquement des cookies techniques nécessaires au maintien de la session. Ils ne requièrent pas de consentement (article 82 loi Informatique et Libertés). Aucun cookie publicitaire ou analytique n'est déployé.</p>

        <h2 style={s.h2}>Article 13 — Force majeure</h2>
        <p style={s.p}>Aucune des parties n'est responsable d'un manquement résultant d'un événement de force majeure au sens de l'article 1218 du Code civil.</p>

        <h2 style={s.h2}>Article 14 — Médiation</h2>
        <p style={s.p}>En cas de différend : hello@dadup.fr (réponse sous 15 jours ouvrés). En l'absence de résolution amiable, recours gratuit possible auprès du CM2C, 49 rue de Ponthieu, 75008 Paris — 01 89 47 00 14 — www.cm2c.net/declarer-un-litige.php — litiges@cm2c.net.</p>

        <h2 style={s.h2}>Article 15 — Droit applicable</h2>
        <p style={s.p}>Les présentes CGV sont soumises au droit français. En cas de litige, l'Utilisateur peut saisir la juridiction du lieu où il demeurait à la conclusion du contrat (article R.631-3 du Code de la consommation).</p>

        <h2 style={s.h2}>Article 16 — Dispositions générales</h2>
        <p style={s.p}>Intégralité : les présentes CGV constituent l'intégralité de l'accord. Divisibilité : si une clause est nulle, les autres demeurent en vigueur. Cession : DadUp peut céder le contrat après en avoir informé l'Utilisateur.</p>

        <div style={s.footer}>
          <p>DadUp — SIRET 10349796200011 — hello@dadup.fr</p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <a href="/confidentialite" style={s.link}>Politique de confidentialité</a>
            <a href="/mentions-legales" style={s.link}>Mentions légales</a>
            <a href="/" style={s.link}>Accueil</a>
          </div>
        </div>
      </div>
    </main>
  );
}
