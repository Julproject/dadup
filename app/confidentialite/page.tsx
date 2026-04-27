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
function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ color: C.dark, fontSize: '14px', fontWeight: 700, margin: '20px 0 8px' }}>{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ color: C.text, fontSize: '14px', lineHeight: 1.8, margin: '0 0 12px' }}>{children}</p>;
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

export default function ConfidentialitePage() {
  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg viewBox="0 0 300 300" width="32" height="32"><circle cx="150" cy="150" r="145" fill="#1A3D5C"/><circle cx="150" cy="150" r="122" fill="#2E5F8A"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/><circle cx="150" cy="128" r="26" fill="#F7FAFC"/></svg>
          <span style={{ fontWeight: 800, color: C.dark, fontSize: '18px' }}>DadUp</span>
        </a>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/cgv" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>CGV</a>
          <a href="/mentions-legales" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Mentions légales</a>
          <a href="/" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Légal</p>
          <h1 style={{ color: C.dark, fontSize: '34px', fontWeight: 800, margin: '0 0 8px' }}>Politique de Confidentialité</h1>
          <p style={{ color: C.textLight, fontSize: '14px', margin: 0 }}>Version en vigueur au 27 avril 2026</p>
        </div>

        <P>DadUp accorde une importance particulière à la protection de vos données personnelles. Cette politique décrit de façon transparente quelles données sont collectées, pourquoi, comment elles sont protégées, et quels sont vos droits.</P>

        <div style={{ marginTop: '40px' }}>

          <Section titre="1. Responsable du traitement">
            <InfoTable rows={[
              ['Nom commercial', 'DadUp'],
              ['Forme juridique', 'Entreprise individuelle (EI)'],
              ['Exploitant', 'Julie Maillot'],
              ['Siège social', '19 avenue de la préservation, 33000 Bordeaux'],
              ['SIRET', '10349796200011'],
              ['Email', 'hello@dadup.fr'],
            ]} />
          </Section>

          <Section titre="2. Données collectées">
            <H3>2.1 Données fournies par l'Utilisateur</H3>
            <UL items={[
              "Adresse email — obligatoire. Identification, authentification et communications transactionnelles.",
              "Prénom — facultatif. Personnalisation de l'interface.",
              "Date prévue d'accouchement (DPA) — nécessaire au suivi. Utilisée uniquement pour personnaliser le contenu hebdomadaire.",
              "Mot de passe — stocké sous forme hachée (bcrypt). DadUp n'a jamais accès au mot de passe en clair.",
            ]} />
            <H3>2.2 Données collectées automatiquement</H3>
            <UL items={[
              "Cookie de session — identifiant technique créé à la connexion. Supprimé à la déconnexion. Aucune donnée personnelle n'est stockée dans ce cookie.",
              "Logs serveur — enregistrés par Vercel (adresse IP, URL, horodatage). Utilisés uniquement à des fins de sécurité technique.",
            ]} />
            <H3>2.3 Données de paiement</H3>
            <P>DadUp ne collecte, ne traite et ne stocke aucune donnée bancaire. Le paiement est intégralement géré par Stripe.</P>
            <H3>2.4 Données non collectées</H3>
            <P>DadUp ne collecte pas : données de santé au sens strict, données de localisation, données relatives aux mineurs, données comportementales à des fins publicitaires.</P>
          </Section>

          <Section titre="3. Finalités et bases légales">
            <UL items={[
              "Gestion du compte et fourniture du Service — exécution du contrat (art. 6.1.b RGPD)",
              "Communications transactionnelles (emails de confirmation, bienvenue, réinitialisation) — exécution du contrat",
              "Obligations légales et comptables — obligation légale (art. 6.1.c RGPD)",
              "Sécurité et amélioration du Service — intérêt légitime (art. 6.1.f RGPD)",
            ]} />
            <Note>DadUp n'utilise pas vos données à des fins de prospection commerciale, de profilage publicitaire ou de vente à des tiers.</Note>
          </Section>

          <Section titre="4. Durées de conservation">
            <UL items={[
              "Données du compte : durée de l'abonnement actif + 3 ans après expiration ou suppression",
              "Données comptables : 10 ans (article L.123-22 du Code de commerce)",
              "Échanges support : 3 ans à compter du dernier contact",
              "Logs serveur : conservés par Vercel selon sa propre politique",
            ]} />
          </Section>

          <Section titre="5. Sous-traitants et transferts hors UE">
            <H3>Vercel Inc. — hébergement</H3>
            <P>Siège aux États-Unis. Transfert encadré par les Clauses Contractuelles Types (CCT). <a href="https://vercel.com/legal/privacy-policy" style={{ color: C.blue }}>vercel.com/legal/privacy-policy</a></P>

            <H3>Supabase Inc. — base de données</H3>
            <P>Siège aux États-Unis, stockage en région européenne (EU West). Transfert encadré par les CCT. <a href="https://supabase.com/privacy" style={{ color: C.blue }}>supabase.com/privacy</a></P>

            <H3>Stripe Inc. — paiement</H3>
            <P>Siège aux États-Unis. Certifié EU-US Data Privacy Framework (DPF), décision d'adéquation de la Commission européenne du 10 juillet 2023. <a href="https://stripe.com/fr/privacy" style={{ color: C.blue }}>stripe.com/fr/privacy</a></P>

            <H3>Brevo SAS — emails transactionnels</H3>
            <P>Société française, données hébergées en Europe. <a href="https://www.brevo.com/legal/privacypolicy/" style={{ color: C.blue }}>brevo.com/legal/privacypolicy</a></P>
          </Section>

          <Section titre="6. Cookies">
            <P>Le Site utilise un unique cookie technique :</P>
            <InfoTable rows={[
              ['Nom', 'dadup_session'],
              ['Type', 'Cookie technique strictement nécessaire'],
              ['Finalité', "Maintenir la session de l'Utilisateur connecté"],
              ['Durée', 'Supprimé à la déconnexion. Aucune donnée personnelle stockée.'],
              ['Attributs', 'HttpOnly, Secure, SameSite=Lax — inaccessible depuis JavaScript'],
              ['Consentement requis', 'Non (art. 82 loi Informatique et Libertés)'],
            ]} />
            <P>Aucun cookie publicitaire, analytique ou tiers n'est déployé sur le Site.</P>
          </Section>

          <Section titre="7. Sécurité">
            <UL items={[
              "Chiffrement TLS (HTTPS) sur l'ensemble du Site",
              "Mots de passe hachés via bcrypt (facteur de coût 12)",
              "Cookie de session en HttpOnly/Secure, inaccessible depuis JavaScript",
              "Accès à la base de données restreint via clé de service Supabase",
              "Variables d'environnement sensibles stockées dans Vercel (non exposées)",
              "Paiements traités par Stripe, certifié PCI DSS niveau 1",
            ]} />
            <P>En cas de violation de données présentant un risque, DadUp notifie la CNIL dans les 72 heures (articles 33 et 34 du RGPD).</P>
          </Section>

          <Section titre="8. Vos droits">
            <UL items={[
              "Droit d'accès (art. 15) — obtenir une copie de vos données",
              "Droit de rectification (art. 16) — corriger des données inexactes",
              "Droit à l'effacement (art. 17) — demander la suppression de vos données",
              "Droit à la portabilité (art. 20) — recevoir vos données en format structuré",
              "Droit d'opposition (art. 21) — vous opposer à certains traitements",
              "Droit à la limitation (art. 18) — suspendre temporairement un traitement",
            ]} />
            <P>Ces droits s'exercent par email à <strong>hello@dadup.fr</strong>. Réponse sous 1 mois (art. 12 RGPD). En cas de réponse insatisfaisante, vous pouvez saisir la <strong>CNIL</strong> (www.cnil.fr — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07).</P>
          </Section>

          <Section titre="9. Mineurs">
            <P>Le Service est réservé aux personnes majeures (18 ans révolus). DadUp ne collecte pas sciemment de données relatives à des mineurs. En cas de compte créé par un mineur, contactez hello@dadup.fr pour suppression immédiate.</P>
          </Section>

          <Section titre="10. Modifications">
            <P>DadUp se réserve le droit de modifier cette Politique. En cas de modification substantielle, les Utilisateurs actifs en sont informés par email au moins 30 jours avant l'entrée en vigueur.</P>
          </Section>

        </div>

        <div style={{ background: C.blueDark, borderRadius: '20px', padding: '32px', textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 8px' }}>Questions relatives à vos données</p>
          <a href="mailto:hello@dadup.fr" style={{ color: C.gold, fontSize: '18px', fontWeight: 700, textDecoration: 'none' }}>hello@dadup.fr</a>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '12px 0 0', fontStyle: 'italic' }}>DadUp (Julie Maillot) — SIRET 10349796200011</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px', flexWrap: 'wrap' }}>
          <a href="/cgv" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>CGV</a>
          <a href="/mentions-legales" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Mentions légales</a>
          <a href="/" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Retour à l'accueil</a>
        </div>
      </div>
    </main>
  );
}
