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

export default function MentionsLegalesPage() {
  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg viewBox="0 0 300 300" width="32" height="32"><circle cx="150" cy="150" r="145" fill="#1A3D5C"/><circle cx="150" cy="150" r="122" fill="#2E5F8A"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/><circle cx="150" cy="128" r="26" fill="#F7FAFC"/></svg>
          <span style={{ fontWeight: 800, color: C.dark, fontSize: '18px' }}>DadUp</span>
        </a>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/cgv" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>CGV</a>
          <a href="/confidentialite" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Confidentialité</a>
          <a href="/" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>← Retour</a>
        </div>
      </nav>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Légal</p>
          <h1 style={{ color: C.dark, fontSize: '34px', fontWeight: 800, margin: '0 0 8px' }}>Mentions Légales</h1>
          <p style={{ color: C.textLight, fontSize: '14px', margin: 0 }}>Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique</p>
        </div>

        <div style={{ marginTop: '40px' }}>

          <Section titre="1. Éditeur du site">
            <InfoTable rows={[
              ['Nom commercial', 'DadUp'],
              ['Forme juridique', 'Entreprise individuelle (EI)'],
              ['Exploitant', 'Julie Maillot'],
              ['SIRET', '10349796200011'],
              ['Siège social', '19 avenue de la préservation, 33000 Bordeaux'],
              ['Email', 'hello@dadup.fr'],
              ['Directeur de la publication', 'Julie Maillot'],
            ]} />
          </Section>

          <Section titre="2. Hébergement">
            <InfoTable rows={[
              ['Hébergeur', 'Vercel Inc.'],
              ['Adresse', '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis'],
              ['Site', 'vercel.com'],
            ]} />
          </Section>

          <Section titre="3. Propriété intellectuelle">
            <P>L'ensemble des contenus du site dadup.fr (textes, données, visuels, interface, code source) sont la propriété exclusive de DadUp (Julie Maillot) et sont protégés par le droit français et international de la propriété intellectuelle.</P>
            <P>Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable est strictement interdite.</P>
          </Section>

          <Section titre="4. Responsabilité">
            <P>DadUp s'efforce d'assurer l'exactitude des informations diffusées sur le Site. Les contenus sont rédigés à titre informatif et ne constituent pas un avis médical. DadUp ne saurait être tenu responsable des décisions prises sur la base des informations publiées.</P>
            <P>En cas d'urgence médicale : <strong>15 (SAMU), 18 (Pompiers) ou 112</strong>.</P>
          </Section>

          <Section titre="5. Données personnelles">
            <P>Le traitement des données personnelles est décrit dans la <a href="/confidentialite" style={{ color: C.blue, fontWeight: 600 }}>Politique de Confidentialité</a>.</P>
            <P>Responsable du traitement : Julie Maillot — hello@dadup.fr</P>
            <P>Toute réclamation peut être adressée à la CNIL (www.cnil.fr).</P>
          </Section>

          <Section titre="6. Cookies">
            <P>Le Site utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement. Aucun cookie publicitaire ou analytique n'est utilisé. Pour plus d'informations, consulter la <a href="/confidentialite" style={{ color: C.blue, fontWeight: 600 }}>Politique de Confidentialité</a>.</P>
          </Section>

          <Section titre="7. Droit applicable">
            <P>Le présent site et ses contenus sont soumis au droit français. En cas de litige, les tribunaux français sont seuls compétents.</P>
          </Section>

          <Section titre="8. Médiation">
            <P>En cas de litige non résolu, vous pouvez contacter le médiateur de la consommation désigné par DadUp :</P>
            <InfoTable rows={[
              ['Médiateur', 'CM2C'],
              ['Adresse', '49 rue de Ponthieu, 75008 Paris'],
              ['Téléphone', '01 89 47 00 14'],
              ['Site', 'www.cm2c.net/declarer-un-litige.php'],
              ['Email', 'litiges@cm2c.net'],
            ]} />
          </Section>

        </div>

        <div style={{ background: C.blueDark, borderRadius: '20px', padding: '32px', textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 8px' }}>Contact</p>
          <a href="mailto:hello@dadup.fr" style={{ color: C.gold, fontSize: '18px', fontWeight: 700, textDecoration: 'none' }}>hello@dadup.fr</a>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '12px 0 0', fontStyle: 'italic' }}>DadUp (Julie Maillot) — SIRET 10349796200011</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px', flexWrap: 'wrap' }}>
          <a href="/cgv" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>CGV</a>
          <a href="/confidentialite" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Politique de confidentialité</a>
          <a href="/" style={{ color: C.textLight, fontSize: '13px', textDecoration: 'none' }}>Retour à l'accueil</a>
        </div>
      </div>
    </main>
  );
}
