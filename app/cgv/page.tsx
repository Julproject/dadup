'use client';

const C = {
  dark: '#1e2535', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', blueDark: '#1A3D5C', gold: '#c8a060',
};

export default function CGVPage() {
  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* Nav */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg viewBox="0 0 300 300" width="32" height="32">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
          <span style={{ fontWeight: 800, color: C.dark, fontSize: '18px' }}>DadUp</span>
        </a>
        <a href="/" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>← Retour</a>
      </nav>

      {/* Contenu */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Légal</p>
          <h1 style={{ color: C.dark, fontSize: '36px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.15 }}>
            Conditions Générales de Vente
          </h1>
          <p style={{ color: C.textLight, fontSize: '14px', margin: 0 }}>
            Version en vigueur au {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div style={{ background: C.white, borderRadius: '16px', padding: '12px 20px', border: `1px solid ${C.border}`, marginBottom: '40px' }}>
          <p style={{ color: C.text, fontSize: '13px', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
            Les présentes CGV régissent exclusivement la relation commerciale entre DadUp et ses Utilisateurs. Elles sont distinctes des Mentions Légales et de la Politique de Confidentialité, disponibles séparément sur le Site.
          </p>
        </div>

        {[
          {
            titre: 'Article 1 — Éditeur',
            contenu: [
              { type: 'p', text: 'Le présent site accessible à l\'adresse dadup.fr et le service DadUp (ci-après « le Service ») sont édités par :' },
              { type: 'table', rows: [
                ['Nom commercial', 'DadUp'],
                ['Forme juridique', 'Entreprise individuelle (EI)'],
                ['SIRET', '10349796200011'],
                ['Siège social', '19 avenue de la préservation, 33000 Bordeaux'],
                ['Directeur de la publication', 'Julie Maillot'],
                ['Email', 'hello@dadup.fr'],
              ]},
            ]
          },
          {
            titre: 'Article 2 — Objet',
            contenu: [
              { type: 'p', text: 'Les présentes CGV régissent les relations contractuelles entre DadUp et tout utilisateur (ci-après « l\'Utilisateur ») souscrivant à l\'abonnement payant donnant accès au Service.' },
              { type: 'p', text: 'Toute souscription vaut acceptation entière des présentes CGV. L\'Utilisateur reconnaît en avoir pris connaissance avant de valider sa commande.' },
              { type: 'p', text: 'Les CGV applicables sont celles en vigueur à la date de la commande. En cas de modification, les Utilisateurs ayant un abonnement actif en sont informés par email au moins 30 jours avant l\'entrée en vigueur des changements.' },
            ]
          },
          {
            titre: 'Article 3 — Description du Service',
            contenu: [
              { type: 'p', text: 'DadUp est un service numérique d\'information et d\'accompagnement, accessible par abonnement depuis tout navigateur web ou appareil mobile, proposant notamment :' },
              { type: 'ul', items: [
                'Un suivi hebdomadaire personnalisé, adapté à la date prévue d\'accouchement (DPA) renseignée par l\'Utilisateur',
                'Des contenus d\'information et guides pratiques sur la période périnatale',
                'Un module d\'accompagnement post-natal, accessible après la naissance',
                'Un glossaire des termes courants liés à la grossesse et à l\'accouchement',
                'Des outils d\'organisation personnelle (listes de préparation, suivi de rendez-vous, missions hebdomadaires)',
                'Un accès au support par email',
              ]},
              { type: 'note', text: 'DadUp est un outil d\'information destiné aux pères. Les contenus proposés sont rédigés à titre informatif et ne constituent pas un avis médical, un diagnostic ou une prescription. Ils ne remplacent pas la consultation d\'un professionnel de santé.' },
            ]
          },
          {
            titre: 'Article 4 — Conditions d\'accès',
            contenu: [
              { type: 'p', text: 'L\'accès au Service est réservé aux personnes physiques majeures (18 ans révolus) disposant de la pleine capacité juridique pour contracter.' },
              { type: 'p', text: 'L\'accès requiert une adresse email valide, un mot de passe personnel créé lors de la première connexion, une connexion Internet et un navigateur web à jour.' },
              { type: 'p', text: 'L\'Utilisateur est seul responsable de la confidentialité de ses identifiants. Il lui appartient d\'informer DadUp sans délai en cas d\'utilisation suspecte de son compte.' },
            ]
          },
          {
            titre: 'Article 5 — Tarifs et paiement',
            contenu: [
              { type: 'h2', text: '5.1 Prix' },
              { type: 'p', text: 'L\'abonnement DadUp est proposé au prix de 35,99 € TTC par an, toutes taxes comprises au taux applicable en France à la date de la souscription.' },
              { type: 'p', text: 'DadUp se réserve le droit de modifier ce prix. Toute modification est notifiée par email au moins 30 jours avant son entrée en vigueur. Le prix applicable est celui affiché sur le Site au moment de la commande.' },
              { type: 'h2', text: '5.2 Paiement' },
              { type: 'p', text: 'Le paiement est réalisé en ligne par carte bancaire via Stripe (Stripe, Inc., 510 Townsend Street, San Francisco, CA 94103, États-Unis). DadUp ne collecte ni ne stocke aucune donnée bancaire.' },
              { type: 'p', text: 'Le paiement est dû en totalité à la validation de la commande. La commande est confirmée dès réception de la validation par Stripe, qui déclenche l\'envoi d\'un email de confirmation.' },
              { type: 'h2', text: '5.3 Durée de l\'abonnement' },
              { type: 'p', text: 'L\'abonnement est souscrit pour une durée déterminée de 12 mois à compter de la date du paiement. À l\'échéance, l\'abonnement expire automatiquement, sans reconduction tacite et sans prélèvement automatique. Aucun montant supplémentaire ne peut être débité sans une nouvelle commande expresse de l\'Utilisateur.' },
              { type: 'p', text: 'L\'Utilisateur est informé par email de l\'approche de l\'échéance. L\'accès au Service peut être reconduit à tout moment par une nouvelle souscription aux conditions alors en vigueur.' },
            ]
          },
          {
            titre: 'Article 6 — Droit de rétractation',
            contenu: [
              { type: 'h2', text: '6.1 Principe' },
              { type: 'p', text: 'Conformément aux articles L.221-18 et suivants du Code de la consommation, l\'Utilisateur dispose d\'un droit de rétractation de 14 jours calendaires à compter de la date de souscription, sans obligation de motiver sa décision.' },
              { type: 'h2', text: '6.2 Renonciation pour accès immédiat au Service' },
              { type: 'p', text: 'Conformément à l\'article L.221-28 13° du Code de la consommation, lorsque l\'exécution d\'un service numérique a commencé avec l\'accord préalable et exprès de l\'Utilisateur, qui a reconnu perdre son droit de rétractation en conséquence, ce droit ne peut plus être exercé.' },
              { type: 'p', text: 'Lors de la validation de sa commande, l\'Utilisateur coche une case par laquelle il : (i) demande expressément à accéder au Service avant l\'expiration du délai de rétractation, et (ii) reconnaît renoncer à ce droit dès lors que le Service a commencé à être exécuté.' },
              { type: 'p', text: 'Si l\'Utilisateur n\'a pas coché cette case et n\'a pas encore accédé au Service, il conserve son droit de rétractation pendant 14 jours.' },
              { type: 'h2', text: '6.3 Exercice du droit de rétractation' },
              { type: 'p', text: 'Pour exercer ce droit, l\'Utilisateur adresse à DadUp une déclaration expresse par email à hello@dadup.fr avant l\'expiration du délai, en indiquant ses nom et prénom, son adresse email de connexion, la date de souscription, et sa volonté de se rétracter.' },
              { type: 'p', text: 'DadUp accuse réception par email. Le remboursement intervient dans un délai de 14 jours à compter de la réception d\'une demande valide, par le même moyen de paiement que celui utilisé lors de la commande.' },
            ]
          },
          {
            titre: 'Article 7 — Fin de l\'accès au Service',
            contenu: [
              { type: 'h2', text: '7.1 Expiration de l\'abonnement' },
              { type: 'p', text: 'L\'abonnement étant conclu pour une durée déterminée (voir Article 5.3), il prend fin automatiquement à son échéance. Aucune démarche n\'est nécessaire.' },
              { type: 'h2', text: '7.2 Désinscription anticipée' },
              { type: 'p', text: 'L\'Utilisateur peut clôturer son compte à tout moment depuis « Mon compte » > « Se désinscrire ». La clôture est immédiate. Aucun remboursement proratisé n\'est accordé pour la période restante, sauf exercice valide du droit de rétractation prévu à l\'Article 6.' },
              { type: 'h2', text: '7.3 Clôture du compte par DadUp' },
              { type: 'p', text: 'DadUp peut suspendre ou clôturer un compte en cas de manquement grave aux présentes CGV, notamment en cas de fourniture de fausses informations, d\'utilisation frauduleuse du Service ou d\'atteinte aux droits de tiers. L\'Utilisateur est informé par email. En cas de clôture pour faute, aucun remboursement n\'est dû.' },
            ]
          },
          {
            titre: 'Article 8 — Obligations de l\'Utilisateur',
            contenu: [
              { type: 'p', text: 'L\'Utilisateur s\'engage à fournir des informations exactes lors de la création de son compte, à préserver la confidentialité de ses identifiants, à utiliser le Service exclusivement à des fins personnelles et non commerciales, et à ne pas reproduire ou diffuser les contenus du Service sans autorisation préalable de DadUp.' },
            ]
          },
          {
            titre: 'Article 9 — Responsabilité',
            contenu: [
              { type: 'h2', text: '9.1 Contenu informatif' },
              { type: 'p', text: 'Les contenus proposés par DadUp sont élaborés à titre informatif. Ils ne constituent pas un avis médical et ne remplacent pas la consultation d\'un professionnel de santé. En cas d\'urgence médicale, composer le 15 (SAMU), le 18 (Pompiers) ou le 112.' },
              { type: 'h2', text: '9.2 Disponibilité' },
              { type: 'p', text: 'DadUp s\'efforce d\'assurer la continuité du Service mais ne peut garantir une disponibilité sans interruption. Des maintenances ou incidents techniques peuvent occasionner des arrêts temporaires. DadUp n\'engage pas sa responsabilité pour ces interruptions, sauf faute établie de sa part.' },
              { type: 'h2', text: '9.3 Limitation de responsabilité' },
              { type: 'p', text: 'La responsabilité de DadUp ne peut être engagée qu\'en cas de faute directement établie ayant causé un préjudice direct à l\'Utilisateur. Les dommages indirects sont exclus. Dans la limite du droit applicable à la consommation, la responsabilité contractuelle de DadUp ne peut excéder le montant de l\'abonnement annuel payé par l\'Utilisateur pour la période concernée.' },
              { type: 'note', text: 'Ces limitations ne s\'appliquent pas en cas de dol ou faute lourde, ni aux droits légaux dont bénéficie l\'Utilisateur en tant que consommateur.' },
            ]
          },
          {
            titre: 'Article 10 — Propriété intellectuelle',
            contenu: [
              { type: 'p', text: 'L\'ensemble des éléments du Service — textes, données, visuels, interface, code source — sont protégés par le droit de la propriété intellectuelle et appartiennent à DadUp ou à ses ayants droit.' },
              { type: 'p', text: 'L\'Utilisateur bénéficie d\'un droit d\'accès personnel, non exclusif et non cessible aux contenus du Service pour la durée de son abonnement. Toute reproduction ou diffusion à des fins autres que l\'usage personnel est interdite sans accord écrit préalable de DadUp.' },
            ]
          },
          {
            titre: 'Article 11 — Données personnelles',
            contenu: [
              { type: 'note', text: 'Le présent article constitue un résumé. La Politique de Confidentialité complète est disponible sur le Site.' },
              { type: 'h2', text: '11.1 Responsable de traitement' },
              { type: 'p', text: 'DadUp (Julie Maillot, 19 avenue de la préservation, 33000 Bordeaux) est responsable du traitement des données personnelles collectées via le Service, au sens du Règlement (UE) 2016/679 (RGPD) et de la loi n°78-17 du 6 janvier 1978 modifiée.' },
              { type: 'h2', text: '11.2 Données collectées' },
              { type: 'ul', items: [
                'Adresse email : identification, authentification et communications transactionnelles',
                'Prénom (facultatif) : personnalisation de l\'interface',
                'Date prévue d\'accouchement : personnalisation du suivi hebdomadaire',
                'Données techniques de connexion (logs serveur) : sécurité et stabilité du Service',
              ]},
              { type: 'p', text: 'Les données de paiement sont traitées exclusivement par Stripe. DadUp ne collecte ni ne stocke aucune donnée bancaire.' },
              { type: 'h2', text: '11.3 Base légale' },
              { type: 'p', text: 'Les traitements reposent sur : l\'exécution du contrat d\'abonnement ; le respect d\'obligations légales (comptabilité et fiscalité) ; l\'intérêt légitime de DadUp (sécurité et amélioration du Service).' },
              { type: 'h2', text: '11.4 Durées de conservation' },
              { type: 'p', text: 'Les données du compte sont conservées pendant la durée de l\'abonnement actif, puis 3 ans après expiration ou suppression du compte. Les pièces comptables sont conservées 10 ans (article L.123-22 du Code de commerce).' },
              { type: 'h2', text: '11.5 Sous-traitants et transferts hors Union européenne' },
              { type: 'ul', items: [
                'Vercel Inc. (hébergement) — États-Unis ; encadré par les Clauses Contractuelles Types (CCT)',
                'Supabase Inc. (base de données) — États-Unis, stockage en région européenne ; encadré par les CCT',
                'Stripe Inc. (paiement) — États-Unis ; certifié EU-US Data Privacy Framework (décision d\'adéquation du 10 juillet 2023)',
                'Brevo SAS (emails transactionnels) — France, données hébergées en Europe',
              ]},
              { type: 'h2', text: '11.6 Droits de l\'Utilisateur' },
              { type: 'p', text: 'L\'Utilisateur dispose des droits d\'accès, de rectification, d\'effacement, de portabilité, d\'opposition et de limitation du traitement, exercisables par email à hello@dadup.fr. En l\'absence de réponse satisfaisante, il peut saisir la CNIL (www.cnil.fr).' },
            ]
          },
          {
            titre: 'Article 12 — Cookies',
            contenu: [
              { type: 'p', text: 'Le Site utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement : maintien de la session utilisateur et sécurité de la connexion. Ces cookies ne nécessitent pas de consentement préalable en application de l\'article 82 de la loi Informatique et Libertés.' },
              { type: 'p', text: 'Aucun cookie tiers, outil d\'analyse comportementale ou pixel de suivi n\'est actuellement déployé sur le Site.' },
            ]
          },
          {
            titre: 'Article 13 — Force majeure',
            contenu: [
              { type: 'p', text: 'Aucune des parties ne peut être tenue responsable d\'un manquement résultant d\'un événement de force majeure au sens de l\'article 1218 du Code civil. DadUp en informe l\'Utilisateur dans les meilleurs délais et s\'efforce de rétablir le Service aussi rapidement que possible.' },
            ]
          },
          {
            titre: 'Article 14 — Médiation et règlement des litiges',
            contenu: [
              { type: 'h2', text: '14.1 Réclamation préalable' },
              { type: 'p', text: 'En cas de différend, l\'Utilisateur est invité à adresser une réclamation écrite à DadUp par email à hello@dadup.fr. DadUp s\'engage à répondre dans un délai de 15 jours ouvrés.' },
              { type: 'h2', text: '14.2 Médiation de la consommation' },
              { type: 'p', text: 'Conformément aux dispositions du Code de la consommation concernant le processus de médiation des litiges de la consommation, après avoir contacté DadUp et à défaut de réponse vous satisfaisant, vous avez la possibilité de recourir gratuitement à une procédure de médiation de la consommation auprès de :' },
              { type: 'table', rows: [
                ['Médiateur', 'CM2C'],
                ['Adresse', '49 rue de Ponthieu, 75008 Paris'],
                ['Téléphone', '01 89 47 00 14'],
                ['Site internet', 'https://www.cm2c.net/declarer-un-litige.php'],
                ['Email', 'litiges@cm2c.net'],
              ]},
            ]
          },
          {
            titre: 'Article 15 — Droit applicable et juridiction',
            contenu: [
              { type: 'p', text: 'Les présentes CGV sont soumises au droit français. En cas de litige non résolu amiablement, l\'Utilisateur peut saisir la juridiction de son choix parmi celles territorialement compétentes, ou la juridiction du lieu où il demeurait au moment de la conclusion du contrat ou de la survenance du fait dommageable (article R.631-3 du Code de la consommation).' },
              { type: 'p', text: 'Pour les consommateurs résidant dans un autre État membre de l\'Union européenne, les dispositions impératives protectrices de leur législation nationale leur restent applicables.' },
            ]
          },
          {
            titre: 'Article 16 — Dispositions générales',
            contenu: [
              { type: 'p', text: 'Intégralité. Les présentes CGV constituent l\'intégralité de l\'accord entre les parties sur leur objet.' },
              { type: 'p', text: 'Divisibilité. Si une clause est déclarée nulle, les autres demeurent en vigueur.' },
              { type: 'p', text: 'Non-renonciation. Le fait pour DadUp de ne pas invoquer un manquement ne constitue pas une renonciation à cette clause.' },
              { type: 'p', text: 'Cession. L\'Utilisateur ne peut céder ses droits sans accord écrit préalable de DadUp. DadUp peut céder le contrat, notamment en cas de cession du Service, après en avoir informé l\'Utilisateur.' },
            ]
          },
        ].map((section, si) => (
          <div key={si} style={{ marginBottom: '40px' }}>
            <h2 style={{ color: C.blueDark, fontSize: '18px', fontWeight: 800, margin: '0 0 16px', paddingBottom: '10px', borderBottom: `2px solid ${C.border}` }}>
              {section.titre}
            </h2>
            {section.contenu.map((block: any, bi: number) => {
              if (block.type === 'p') return (
                <p key={bi} style={{ color: C.text, fontSize: '14px', lineHeight: 1.75, margin: '0 0 12px' }}>{block.text}</p>
              );
              if (block.type === 'h2') return (
                <h3 key={bi} style={{ color: C.dark, fontSize: '15px', fontWeight: 700, margin: '20px 0 10px' }}>{block.text}</h3>
              );
              if (block.type === 'note') return (
                <div key={bi} style={{ background: '#f0f4f8', borderLeft: `3px solid ${C.blue}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: '12px 0' }}>
                  <p style={{ color: C.blue, fontSize: '13px', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>{block.text}</p>
                </div>
              );
              if (block.type === 'ul') return (
                <ul key={bi} style={{ paddingLeft: '20px', margin: '8px 0 16px' }}>
                  {block.items.map((item: string, ii: number) => (
                    <li key={ii} style={{ color: C.text, fontSize: '14px', lineHeight: 1.75, marginBottom: '4px' }}>{item}</li>
                  ))}
                </ul>
              );
              if (block.type === 'table') return (
                <div key={bi} style={{ background: C.cream, borderRadius: '12px', padding: '16px', margin: '12px 0 16px', border: `1px solid ${C.border}` }}>
                  {block.rows.map(([label, value]: [string, string], ri: number) => (
                    <div key={ri} style={{ display: 'flex', gap: '12px', padding: '6px 0', borderBottom: ri < block.rows.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ color: C.dark, fontSize: '13px', fontWeight: 700, minWidth: '200px', flexShrink: 0 }}>{label}</span>
                      <span style={{ color: C.text, fontSize: '13px' }}>{value}</span>
                    </div>
                  ))}
                </div>
              );
              return null;
            })}
          </div>
        ))}

        {/* Contact */}
        <div style={{ background: C.blueDark, borderRadius: '20px', padding: '32px', textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 8px' }}>Pour toute question relative aux présentes CGV</p>
          <a href="mailto:hello@dadup.fr" style={{ color: C.gold, fontSize: '18px', fontWeight: 700, textDecoration: 'none' }}>hello@dadup.fr</a>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '12px 0 0', fontStyle: 'italic' }}>DadUp (Julie Maillot) — SIRET 10349796200011</p>
        </div>

        {/* Liens légaux */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px', flexWrap: 'wrap' }}>
          {[
            { label: 'Politique de confidentialité', href: '/confidentialite' },
            { label: 'Mentions légales', href: '/mentions-legales' },
            { label: 'Retour à l\'accueil', href: '/' },
          ].map(link => (
            <a key={link.href} href={link.href} style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}
