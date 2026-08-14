'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
};

const FEATURES = [
  "Suivi bébé semaine par semaine, de la SA 3 à la SA 40",
  "Calendrier des rendez-vous personnalisé à ta DPA",
  "Guide accouchement",
  "Valise maternité",
  "Mode post-partum",
  "Première année bébé, mois par mois",
];

export default function TarifsPage() {
  const goToStripe = async () => {
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { alert('Erreur : ' + err); }
  };

  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .layout{display:grid;grid-template-columns:1fr 1fr;min-height:calc(100vh - 68px);}
        .left-col{position:sticky;top:68px;height:calc(100vh - 68px);overflow:hidden;}
        .right-col{padding:64px 56px;overflow-y:auto;}
        @media(max-width:900px){
          .nl{display:none!important;}.nc{display:none!important;}
          .layout{grid-template-columns:1fr!important;min-height:auto!important;}
          .left-col{position:relative!important;top:auto!important;height:auto!important;padding:48px 24px!important;}
          .right-col{padding:40px 24px!important;}
          nav{padding:0 20px!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <svg viewBox="0 0 300 300" width="34" height="34"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{ fontWeight: 800, color: C.dark, fontSize: '20px' }}>DadUp</span>
          </a>
          <div className="nl" style={{ gap: '4px' }}>
            <a href="/pourquoi" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Pourquoi DadUp</a>
            <a href="/inclus" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Ce qui est inclus</a>
            <a href="/tarifs" style={{ color: C.dark, fontSize: '14px', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', borderBottom: `2px solid ${C.gold}` }}>Tarifs</a>
            <a href="/temoignages" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Témoignages</a>
            <a href="/contact" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Contactez-nous</a>
          </div>
        </div>
        <div className="nc" style={{ alignItems: 'center', gap: '16px' }}>
          <a href="/login" style={{ color: C.dark, fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Se connecter</a>
          <button onClick={goToStripe} style={{ background: C.dark, color: C.white, padding: '11px 22px', borderRadius: '32px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Commencer</button>
        </div>
      </nav>

      {/* LAYOUT 2 COLONNES */}
      <div className="layout">

        {/* COLONNE GAUCHE — sticky, fond sombre */}
        <div className="left-col" style={{ background: C.dark, padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: C.gold, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 24px' }}>Accès annuel complet</p>
          
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: C.white, fontSize: '80px', fontWeight: 800, lineHeight: 1 }}>35,99€</span>
          </div>
          <p style={{ color: '#6a7585', fontSize: '15px', margin: '0 0 48px' }}>par an · paiement unique</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            {FEATURES.map(f => (
              <div key={f} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: C.gold, fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>—</span>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{f}</p>
              </div>
            ))}
          </div>

          <button onClick={goToStripe} style={{ background: C.gold, color: '#1c1510', border: 'none', padding: '18px', borderRadius: '32px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', width: '100%', marginBottom: '12px' }}>
            Commencer
          </button>
          <p style={{ color: '#3d5070', fontSize: '12px', textAlign: 'center', marginBottom: '40px' }}>Paiement sécurisé par Stripe</p>

          {/* INFOS PRATIQUES */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', marginBottom: '24px' }}>
            {[
              { label: "Durée", val: "12 mois à compter du paiement" },
              { label: "Renouvellement", val: "Aucun renouvellement automatique" },
              { label: "Données", val: "Email et DPA uniquement" },
            ].map(({ label, val }, i, arr) => (
              <div key={label} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 700, margin: 0, minWidth: '120px', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* À SAVOIR */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ color: C.textLight, fontSize: '12px', lineHeight: 1.7, margin: 0 }}>DadUp ne remplace pas ton médecin ni ta sage-femme. C&apos;est un outil de préparation, conçu pour que tu arrives à chaque étape en sachant ce qui t&apos;attend.</p>
          </div>
        </div>

        {/* COLONNE DROITE — scrollable, fond crème */}
        <div className="right-col">
          
          {/* TITRE */}
          <div style={{ marginBottom: '56px' }}>
            <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>Pourquoi DadUp</p>
            <h1 style={{ color: C.dark, fontSize: '42px', fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px' }}>Simple.<br />Transparent.</h1>
            <p style={{ color: C.text, fontSize: '16px', lineHeight: 1.8, margin: 0 }}>Une offre. Un prix. Tout inclus. De la première échographie au premier anniversaire de bébé.</p>
          </div>

          {/* CE QUE C'EST */}
          <div style={{ marginBottom: '48px' }}>
            <p style={{ color: C.dark, fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px', borderBottom: `1px solid ${C.border}`, paddingBottom: '12px' }}>Ce que tu obtiens</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { titre: "Suivi semaine par semaine", desc: "De la SA 3 à la SA 40, le développement de bébé et les informations pratiques adaptées à chaque étape." },
                { titre: "Calendrier personnalisé", desc: "Tous les rendez-vous médicaux expliqués, datés selon ta DPA, avec ton rôle précis à chaque consultation." },
                { titre: "Guide accouchement", desc: "Quand partir, comment soutenir, ton rôle en salle de naissance. Préparé bien avant le jour J." },
                { titre: "Post-partum et première année", desc: "Baby blues, sommeil, développement bébé mois par mois. Tout ce que tu dois savoir après la naissance." },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', background: C.white, borderRadius: '16px', border: `1px solid ${C.border}` }}>
                  <p style={{ color: C.dark, fontSize: '14px', fontWeight: 700, margin: '0 0 6px' }}>{item.titre}</p>
                  <p style={{ color: C.text, fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: C.dark, borderTop: '1px solid #2e3848', padding: '32px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 300 300" width="28" height="28"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
              <span style={{ color: C.white, fontSize: '16px', fontWeight: 700 }}>DadUp</span>
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
              <a href="/pourquoi" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Pourquoi DadUp</a>
              <a href="/inclus" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Ce qui est inclus</a>
              <a href="/tarifs" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Tarifs</a>
              <a href="/temoignages" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Témoignages</a>
              <a href="/contact" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Contactez-nous</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px', paddingTop: '12px', borderTop: '1px solid #2e3848' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
              <a href="/cgv" style={{ color: '#3d4f6a', fontSize: '12px', textDecoration: 'none' }}>CGV</a>
              <a href="/confidentialite" style={{ color: '#3d4f6a', fontSize: '12px', textDecoration: 'none' }}>Confidentialité</a>
              <a href="/mentions-legales" style={{ color: '#3d4f6a', fontSize: '12px', textDecoration: 'none' }}>Mentions légales</a>
            </div>
            <p style={{ color: '#3d4f6a', fontSize: '12px', margin: 0 }}>Il ne remplace pas l&apos;avis d&apos;un médecin.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
