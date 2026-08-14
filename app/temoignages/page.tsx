'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
};

export default function TemoignagesPage() {
  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          nav{padding:0 20px!important;}
          h1{font-size:34px!important;}
          .hero{padding:64px 24px!important;}
          .main{padding:48px 24px 80px!important;}
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
            <a href="/tarifs" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Tarifs</a>
            <a href="/temoignages" style={{ color: C.dark, fontSize: '14px', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', borderBottom: `2px solid ${C.gold}` }}>Témoignages</a>
            <a href="/contact" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Contactez-nous</a>
          </div>
        </div>
        <div className="nc" style={{ alignItems: 'center', gap: '16px' }}>
          <a href="/login" style={{ color: C.dark, fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Se connecter</a>
          <a href="/tarifs" style={{ background: C.dark, color: C.white, padding: '11px 22px', borderRadius: '32px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Commencer</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" style={{ background: C.dark, padding: '80px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: C.gold, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px' }}>Lancement</p>
          <h1 style={{ color: C.white, fontSize: '44px', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.15 }}>
            DadUp vient de<br /><span style={{ color: C.gold }}>démarrer.</span>
          </h1>
          <p style={{ color: '#6a7585', fontSize: '17px', lineHeight: 1.75, margin: 0 }}>
            Les premiers papas utilisent DadUp en ce moment. Les témoignages arrivent bientôt, on préfère te montrer de vrais retours plutôt que des avis inventés.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <div className="main" style={{ maxWidth: '860px', margin: '0 auto', padding: '72px 40px 80px' }}>

        {/* CE QU'ON CONSTRUIT */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px' }}>Ce qu&apos;on construit</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {[
              { num: '41', label: 'semaines de contenu', desc: 'De la SA 3 à la SA 40, chaque semaine couverte.' },
              { num: '12', label: 'mois post-partum', desc: 'Le développement de bébé mois par mois.' },
              { num: '100%', label: 'pour les pères', desc: 'Aucun contenu pensé pour la maman uniquement.' },
            ].map((item, i) => (
              <div key={i} style={{ background: C.white, borderRadius: '20px', padding: '28px', border: `1px solid ${C.border}`, textAlign: 'center' }}>
                <p style={{ color: C.dark, fontSize: '40px', fontWeight: 800, margin: '0 0 4px', lineHeight: 1 }}>{item.num}</p>
                <p style={{ color: C.blue, fontSize: '12px', fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                <p style={{ color: C.text, fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EN ATTENDANT */}
        <div>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px' }}>En attendant</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { titre: 'Voir ce qui est inclus', desc: 'Découvre les 6 modules qui couvrent toute la grossesse.', href: '/inclus', cta: 'Voir le contenu' },
              { titre: 'Pourquoi DadUp ?', desc: 'Ce que DadUp change concrètement pour les futurs pères.', href: '/pourquoi', cta: 'En savoir plus' },
            ].map((item, i) => (
              <div key={i} style={{ background: C.white, borderRadius: '20px', padding: '28px', border: `1px solid ${C.border}` }}>
                <p style={{ color: C.dark, fontSize: '16px', fontWeight: 700, margin: '0 0 8px' }}>{item.titre}</p>
                <p style={{ color: C.text, fontSize: '14px', lineHeight: 1.65, margin: '0 0 20px' }}>{item.desc}</p>
                <a href={item.href} style={{ color: C.blue, fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>{item.cta} →</a>
              </div>
            ))}
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
