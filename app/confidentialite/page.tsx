'use client';

export default function ConfidentialitePage() {
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
          <a href="/mentions-legales" style={s.link}>Mentions légales</a>
          <a href="/" style={{ ...s.link, fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={s.wrap}>
        <p style={s.label}>Légal</p>
        <h1 style={s.h1}>Politique de Confidentialité</h1>
        <p style={s.date}>Version en vigueur au 27 avril 2026</p>

        <p style={s.p}>DadUp accorde une importance particulière à la protection de vos données personnelles. Cette politique décrit quelles données sont collectées, pourquoi, comment elles sont protégées et quels sont vos droits.</p>

        <h2 style={s.h2}>1. Responsable du traitement</h2>
        <p style={s.p}>DadUp, entreprise individuelle (EI), SIRET 10349796200011, dont le siège est situé au 19 avenue de la préservation, 33000 Bordeaux. Contact : hello@dadup.fr.</p>

        <h2 style={s.h2}>2. Données collectées</h2>
        <p style={s.p}>DadUp collecte uniquement les données nécessaires au fonctionnement du Service. Les données fournies par l'Utilisateur sont : l'adresse email (obligatoire — identification et communications), le prénom (facultatif — personnalisation), la date prévue d'accouchement (nécessaire au suivi — utilisée uniquement pour personnaliser le contenu hebdomadaire) et le mot de passe (stocké sous forme hachée via bcrypt — DadUp n'a jamais accès au mot de passe en clair).</p>
        <p style={s.p}>Les données collectées automatiquement sont : un cookie de session (identifiant technique créé à la connexion, supprimé à la déconnexion, aucune donnée personnelle n'est stockée dans ce cookie) et des logs serveur enregistrés par Vercel (adresse IP, URL, horodatage — utilisés uniquement à des fins de sécurité technique).</p>
        <p style={s.p}>DadUp ne collecte, ne traite et ne stocke aucune donnée bancaire. Le paiement est intégralement géré par Stripe. DadUp ne collecte pas non plus : données de santé au sens strict, données de localisation, données relatives aux mineurs, données comportementales à des fins publicitaires.</p>

        <h2 style={s.h2}>3. Finalités et bases légales</h2>
        <p style={s.p}>Gestion du compte et fourniture du Service — exécution du contrat (art. 6.1.b RGPD). Communications transactionnelles — exécution du contrat. Obligations comptables et légales — obligation légale (art. 6.1.c RGPD). Sécurité et amélioration du Service — intérêt légitime (art. 6.1.f RGPD). DadUp n'utilise pas vos données à des fins de prospection, de profilage publicitaire ou de vente à des tiers.</p>

        <h2 style={s.h2}>4. Durées de conservation</h2>
        <p style={s.p}>Les données du compte sont conservées pendant la durée de l'abonnement actif, puis 3 ans après expiration ou suppression. Les données comptables sont conservées 10 ans (article L.123-22 du Code de commerce). Les échanges support sont conservés 3 ans à compter du dernier contact.</p>

        <h2 style={s.h2}>5. Sous-traitants et transferts hors UE</h2>
        <p style={s.p}>Vercel Inc. (hébergement) — siège aux États-Unis, transfert encadré par les Clauses Contractuelles Types (CCT) — vercel.com/legal/privacy-policy. Supabase Inc. (base de données) — siège aux États-Unis, stockage en région européenne, transfert encadré par les CCT — supabase.com/privacy. Stripe Inc. (paiement) — siège aux États-Unis, certifié EU-US Data Privacy Framework (DPF), décision d'adéquation de la Commission européenne du 10 juillet 2023 — stripe.com/fr/privacy. Brevo SAS (emails) — société française, données hébergées en Europe — brevo.com/legal/privacypolicy.</p>

        <h2 style={s.h2}>6. Cookies</h2>
        <p style={s.p}>Le Site utilise un unique cookie technique (dadup_session) permettant de maintenir la session utilisateur. Il est supprimé à la déconnexion. Aucune donnée personnelle n'est stockée dans ce cookie. Ses attributs sont : HttpOnly, Secure, SameSite=Lax. Aucun consentement préalable n'est requis (article 82 de la loi Informatique et Libertés). Aucun cookie publicitaire, analytique ou tiers n'est déployé sur le Site.</p>

        <h2 style={s.h2}>7. Sécurité</h2>
        <p style={s.p}>Chiffrement TLS (HTTPS) sur l'ensemble du Site. Mots de passe hachés via bcrypt (facteur de coût 12). Cookie de session en HttpOnly/Secure, inaccessible depuis JavaScript. Accès base de données restreint via clé de service Supabase. Paiements traités par Stripe, certifié PCI DSS niveau 1. En cas de violation présentant un risque, la CNIL est notifiée sous 72 heures (articles 33 et 34 du RGPD).</p>

        <h2 style={s.h2}>8. Vos droits</h2>
        <p style={s.p}>Vous disposez des droits d'accès (art. 15), de rectification (art. 16), d'effacement (art. 17), de portabilité (art. 20), d'opposition (art. 21) et de limitation du traitement (art. 18). Ces droits s'exercent par email à hello@dadup.fr. Réponse sous 1 mois (art. 12 RGPD). En cas de réponse insatisfaisante, vous pouvez saisir la CNIL : www.cnil.fr — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.</p>

        <h2 style={s.h2}>9. Mineurs</h2>
        <p style={s.p}>Le Service est réservé aux personnes majeures (18 ans révolus). DadUp ne collecte pas sciemment de données relatives à des mineurs. Contactez hello@dadup.fr pour suppression de tout compte créé par un mineur.</p>

        <h2 style={s.h2}>10. Modifications</h2>
        <p style={s.p}>En cas de modification substantielle, les Utilisateurs actifs en sont informés par email au moins 30 jours avant l'entrée en vigueur. La version en vigueur est toujours accessible sur le Site.</p>

        <div style={s.footer}>
          <p>DadUp — SIRET 10349796200011 — hello@dadup.fr</p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <a href="/cgv" style={s.link}>CGV</a>
            <a href="/mentions-legales" style={s.link}>Mentions légales</a>
            <a href="/" style={s.link}>Accueil</a>
          </div>
        </div>
      </div>
    </main>
  );
}
