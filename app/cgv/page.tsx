'use client';

const C = {
  dark: '#1e2535', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', blueDark: '#1A3D5C', gold: '#c8a060',
};

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ color: C.blueDark, fontSize: '17px', fontWeight: 800, margin: '0 0 16px', paddingBottom: '10px', borderBottom: `2px solid ${C.border}` }}>{titre}</h2>
      {children}
    </div>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ color: C.text, fontSize: '14px', lineHeight: 1.8, margin: '0 0 12px' }}>{children}</p>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ color: C.dark, fontSize: '14px', fontWeight: 700, margin: '20px 0 8px' }}>{children}</h3>;
}
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#f0f4f8', borderLeft: `3px solid ${C.blue}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: '12px 0' }}>
      <p style={{ color: C.blue, fontSize: '13px', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}
function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: '20px', margin: '8px 0 12px' }}>
      {items.map((item, i) => <li key={i} style={{ color: C.text, fontSize: '14px', lineHeight: 1.8, marginBottom: '4px' }}>{item}</li>)}
    </ul>
  );
}
function InfoTable({ rows }: { rows: [string, string][] }) {
  return (
    <div style={{ background: C.cream, borderRadius: '12px', padding: '16px', margin: '12px 0', border: `1px solid ${C.border}` }}>
      {rows.map(([label, value], i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', padding: '6px 0', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none' }}>
          <span style={{ color: C.dark, fontSize: '13px', fontWeight: 700, minWidth: '200px', flexShrink: 0 }}>{label}</span>
          <span style={{ color: C.text, fontSize: '13px' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function CGVPage() {
  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg viewBox="0 0 300 300" width="32" height="32"><circle cx="150" cy="150" r="145" fill="#1A3D5C"/><circle cx="150" cy="150" r="122" fill="#2E5F8A"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/><circle cx="150" cy="128" r="26" fill="#F7FAFC"/></svg>
          <span style={{ fontWeight: 800, color: C.dark, fontSize: '18px' }}>DadUp</span>
        </a>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/mentions-legales" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Mentions légales</a>
          <a href="/confidentialite" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Confidentialité</a>
          <a href="/" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Légal</p>
          <h1 style={{ color: C.dark, fontSize: '34px', fontWeight: 800, margin: '0 0 8px' }}>Conditions Générales de Vente</h1>
          <p style={{ color: C.textLight, fontSize: '14px', margin: 0 }}>Version en vigueur au 27 avril 2026</p>
        </div>

        <Note>Les présentes CGV régissent exclusivement la relation commerciale entre DadUp et ses Utilisateurs. Elles sont distinctes des Mentions Légales et de la Politique de Confidentialité, disponibles séparément sur le Site.</Note>

        <div style={{ marginTop: '40px' }}>

          <Section titre="Article 1 — Éditeur">
            <P>Le site dadup.fr et le service DadUp sont édités par :</P>
            <InfoTable rows={[
              ['Nom commercial', 'DadUp'],
              ['Forme juridique', 'Entreprise individuelle (EI)'],
              ['SIRET', '10349796200011'],
              ['Siège social', '19 avenue de la préservation, 33000 Bordeaux'],
              ['Directeur de la publication', 'Julie Maillot'],
              ['Email', 'hello@dadup.fr'],
            ]} />
          </Section>

          <Section titre="Article 2 — Objet">
            <P>Les présentes CGV régissent les relations contractuelles entre DadUp et tout utilisateur souscrivant à l'abonnement payant donnant accès au Service.</P>
            <P>Toute souscription vaut acceptation entière des présentes CGV. L'Utilisateur reconnaît en avoir pris connaissance avant de valider sa commande.</P>
            <P>En cas de modification substantielle, les Utilisateurs ayant un abonnement actif en sont informés par email au moins 30 jours avant l'entrée en vigueur des changements.</P>
          </Section>

          <Section titre="Article 3 — Description du Service">
            <P>DadUp est un service numérique d'information et d'accompagnement, accessible par abonnement, proposant notamment :</P>
            <UL items={[
              "Un suivi hebdomadaire personnalisé adapté à la date prévue d'accouchement (DPA)",
              "Des contenus d'information et guides pratiques sur la période périnatale",
              "Un module d'accompagnement post-natal, accessible après la naissance",
              "Un glossaire des termes courants liés à la grossesse et à l'accouchement",
              "Des outils d'organisation personnelle (listes, suivi de rendez-vous, missions)",
              "Un accès au support par email",
            ]} />
            <Note>DadUp est un outil d'information destiné aux pères. Les contenus sont rédigés à titre informatif et ne constituent pas un avis médical, un diagnostic ou une prescription. Ils ne remplacent pas la consultation d'un professionnel de santé.</Note>
          </Section>

          <Section titre="Article 4 — Conditions d'accès">
            <P>L'accès est réservé aux personnes physiques majeures (18 ans révolus) disposant de la pleine capacité juridique pour contracter.</P>
            <P>L'Utilisateur est seul responsable de la confidentialité de ses identifiants.</P>
          </Section>

          <Section titre="Article 5 — Tarifs et paiement">
            <H3>5.1 Prix</H3>
            <P>L'abonnement DadUp est proposé au prix de <strong>35,99 € TTC par an</strong>. Toute modification de prix est notifiée par email au moins 30 jours avant son entrée en vigueur.</P>
            <H3>5.2 Paiement</H3>
            <P>Le paiement est réalisé par carte bancaire via Stripe (Stripe, Inc., 510 Townsend Street, San Francisco, CA 94103, États-Unis). DadUp ne collecte ni ne stocke aucune donnée bancaire.</P>
            <H3>5.3 Durée</H3>
            <P>L'abonnement est souscrit pour une durée déterminée de <strong>12 mois</strong>. À l'échéance, il expire automatiquement, <strong>sans reconduction tacite et sans prélèvement automatique</strong>. Aucun montant supplémentaire ne peut être débité sans nouvelle commande expresse de l'Utilisateur.</P>
          </Section>

          <Section titre="Article 6 — Droit de rétractation">
            <P>Conformément aux articles L.221-18 et suivants du Code de la consommation, l'Utilisateur dispose d'un droit de rétractation de <strong>14 jours calendaires</strong> à compter de la date de souscription, sans obligation de motiver sa décision. Ce droit s'applique sans condition, même si l'Utilisateur a commencé à utiliser le Service.</P>
            <P>Pour l'exercer, l'Utilisateur adresse une déclaration expresse par email à <strong>hello@dadup.fr</strong> en indiquant ses nom et prénom, son email de connexion, la date de souscription et sa volonté de se rétracter.</P>
            <P>Le remboursement intervient dans un délai de 14 jours à compter de la réception d'une demande valide, par le même moyen de paiement.</P>
          </Section>

          <Section titre="Article 7 — Fin de l'accès au Service">
            <H3>7.1 Expiration</H3>
            <P>L'abonnement prend fin automatiquement à son échéance. Aucune démarche n'est nécessaire.</P>
            <H3>7.2 Désinscription anticipée</H3>
            <P>L'Utilisateur peut clôturer son compte à tout moment depuis « Mon compte » {'>'} « Se désinscrire ». La clôture est immédiate. Aucun remboursement proratisé n'est accordé, sauf dans le cadre du droit de rétractation (Article 6).</P>
            <H3>7.3 Clôture par DadUp</H3>
            <P>DadUp peut clôturer un compte en cas de manquement grave aux présentes CGV. L'Utilisateur est informé par email.</P>
          </Section>

          <Section titre="Article 8 — Obligations de l'Utilisateur">
            <P>L'Utilisateur s'engage à fournir des informations exactes, à préserver la confidentialité de ses identifiants, à utiliser le Service à des fins personnelles uniquement, et à ne pas reproduire les contenus sans autorisation.</P>
          </Section>

          <Section titre="Article 9 — Responsabilité">
            <H3>9.1 Contenu informatif</H3>
            <P>Les contenus sont élaborés à titre informatif et ne remplacent pas la consultation d'un professionnel de santé. En cas d'urgence médicale : <strong>15 (SAMU), 18 (Pompiers) ou 112</strong>.</P>
            <H3>9.2 Limitation</H3>
            <P>La responsabilité de DadUp ne peut être engagée qu'en cas de faute directe. Les dommages indirects sont exclus. Elle ne peut excéder le montant de l'abonnement annuel payé.</P>
            <Note>Ces limitations ne s'appliquent pas en cas de dol ou faute lourde, ni aux droits légaux du consommateur.</Note>
          </Section>

          <Section titre="Article 10 — Propriété intellectuelle">
            <P>L'ensemble des éléments du Service sont protégés par le droit de la propriété intellectuelle et appartiennent à DadUp. L'Utilisateur bénéficie d'un droit d'accès personnel, non exclusif et non cessible pour la durée de son abonnement.</P>
          </Section>

          <Section titre="Article 11 — Données personnelles">
            <Note>Le présent article constitue un résumé. La Politique de Confidentialité complète est disponible sur le Site.</Note>
            <P>DadUp (Julie Maillot, 19 avenue de la préservation, 33000 Bordeaux, SIRET 10349796200011) est responsable du traitement des données au sens du RGPD. Données collectées : email, prénom (facultatif), DPA, logs techniques. Aucune donnée bancaire collectée. Droits exercisables à hello@dadup.fr ou auprès de la CNIL (www.cnil.fr).</P>
            <P>Sous-traitants : Vercel Inc. (hébergement, CCT), Supabase Inc. (base de données, CCT), Stripe Inc. (paiement, DPF), Brevo SAS (emails, France).</P>
          </Section>

          <Section titre="Article 12 — Cookies">
            <P>Le Site utilise uniquement des cookies techniques strictement nécessaires (maintien de la session utilisateur), ne nécessitant pas de consentement préalable (article 82 de la loi Informatique et Libertés). Aucun cookie publicitaire ou analytique n'est déployé.</P>
          </Section>

          <Section titre="Article 13 — Force majeure">
            <P>Aucune des parties ne peut être tenue responsable d'un manquement résultant d'un événement de force majeure au sens de l'article 1218 du Code civil.</P>
          </Section>

          <Section titre="Article 14 — Médiation">
            <P>En cas de différend, contacter DadUp à hello@dadup.fr (réponse sous 15 jours ouvrés). En l'absence de résolution amiable, recours gratuit possible auprès de :</P>
            <InfoTable rows={[
              ['Médiateur', 'CM2C'],
              ['Adresse', '49 rue de Ponthieu, 75008 Paris'],
              ['Téléphone', '01 89 47 00 14'],
              ['Site', 'www.cm2c.net/declarer-un-litige.php'],
              ['Email', 'litiges@cm2c.net'],
            ]} />
          </Section>

          <Section titre="Article 15 — Droit applicable">
            <P>Les présentes CGV sont soumises au droit français. En cas de litige, l'Utilisateur peut saisir la juridiction du lieu où il demeurait à la conclusion du contrat (article R.631-3 du Code de la consommation).</P>
          </Section>

          <Section titre="Article 16 — Dispositions générales">
            <P><strong>Intégralité.</strong> Les présentes CGV constituent l'intégralité de l'accord entre les parties.</P>
            <P><strong>Divisibilité.</strong> Si une clause est déclarée nulle, les autres demeurent en vigueur.</P>
            <P><strong>Cession.</strong> DadUp peut céder le contrat après en avoir informé l'Utilisateur.</P>
          </Section>

        </div>

        <div style={{ background: C.blueDark, borderRadius: '20px', padding: '32px', textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 8px' }}>Pour toute question</p>
          <a href="mailto:hello@dadup.fr" style={{ color: C.gold, fontSize: '18px', fontWeight: 700, textDecoration: 'none' }}>hello@dadup.fr</a>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '12px 0 0', fontStyle: 'italic' }}>DadUp (Julie Maillot) — SIRET 10349796200011</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px', flexWrap: 'wrap' }}>
          <a href="/confidentialite" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Politique de confidentialité</a>
          <a href="/mentions-legales" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Mentions légales</a>
          <a href="/" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Retour à l'accueil</a>
        </div>
      </div>
    </main>
  );
}
