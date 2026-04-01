'use client';

import { useState } from 'react';

const C = {
  dark: '#1c2333',
  blue: '#2E5F8A',
  gold: '#c8a060',
  white: '#ffffff',
  cream: '#f7f4ef',
  border: '#e8e0d8',
  muted: '#9a8888',
  text: '#2a2020',
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToStripe = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert('Erreur : ' + JSON.stringify(data));
    } catch (err) {
      alert('Erreur reseau. Reessaie.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: C.white, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color: C.text }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-links { display: flex; gap: 4px; }
        .nav-cta-group { display: flex; align-items: center; gap: 16px; }
        .hamburger { display: none; }
        .mobile-menu { display: none; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .hero-img-wrap { display: block; }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); padding: 40px; }
        .benefits-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .quote-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; }
        .footer-links { display: flex; gap: 24px; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta-group { display: none; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex; flex-direction: column; }
          .hero-grid { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px 0 !important; }
          .hero-img-wrap { height: 280px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr; padding: 24px 20px !important; gap: 0; }
          .stats-item { border-left: none !important; border-top: 1px solid #2e3848; padding: 16px !important; }
          .stats-item:nth-child(2) { border-left: 1px solid #2e3848 !important; }
          .benefits-grid { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; }
          .quote-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-inner { flex-direction: column; gap: 20px; text-align: center; }
          .footer-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
          .section-pad { padding: 60px 20px !important; }
          .cta-section { padding: 60px 20px !important; }
          .footer-section { padding: 32px 20px !important; }
          h1 { font-size: 38px !important; }
          h2 { font-size: 26px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <svg viewBox="0 0 300 300" width="34" height="34">
              <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
              <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
              <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
            </svg>
            <span style={{ fontWeight: 900, color: C.dark, fontSize: '20px', letterSpacing: '-0.3px' }}>DadUp</span>
          </a>
          <div className="nav-links">
            <a href="/pourquoi" style={{ color: C.muted, fontSize: '14px', fontWeight: 500, padding: '8px 14px', borderRadius: '8px', textDecoration: 'none' }}>Pourquoi DadUp</a>
            <a href="/inclus" style={{ color: C.muted, fontSize: '14px', fontWeight: 500, padding: '8px 14px', borderRadius: '8px', textDecoration: 'none' }}>Ce qui est inclus</a>
            <a href="/tarifs" style={{ color: C.muted, fontSize: '14px', fontWeight: 500, padding: '8px 14px', borderRadius: '8px', textDecoration: 'none' }}>Tarifs</a>
            <a href="/temoignages" style={{ color: C.muted, fontSize: '14px', fontWeight: 500, padding: '8px 14px', borderRadius: '8px', textDecoration: 'none' }}>Temoignages</a>
          </div>
        </div>
        <div className="nav-cta-group">
          <a href="/login" style={{ color: C.dark, fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Se connecter</a>
          <button onClick={goToStripe} style={{ background: C.dark, color: C.white, border: 'none', padding: '11px 22px', borderRadius: '32px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            Commencer — 79{'\u20ac'}/an
          </button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: '5px', padding: '4px' }}>
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: C.dark, borderRadius: '2px' }}/>)}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '16px 24px', gap: '8px' }}>
          {[['/', 'Accueil'], ['/pourquoi', 'Pourquoi DadUp'], ['/inclus', 'Ce qui est inclus'], ['/tarifs', 'Tarifs'], ['/temoignages', 'Temoignages']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: C.dark, fontSize: '15px', fontWeight: 600, padding: '10px 0', textDecoration: 'none', borderBottom: `1px solid ${C.border}` }}>{label}</a>
          ))}
          <button onClick={goToStripe} style={{ background: C.dark, color: C.white, border: 'none', padding: '14px', borderRadius: '32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', marginTop: '8px' }}>
            Commencer — 79{'\u20ac'}/an
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="hero-grid" style={{ padding: '80px 40px 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E4F5EC', borderRadius: '20px', padding: '6px 14px', marginBottom: '28px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0D6B40' }}/>
            <span style={{ color: '#0D6B40', fontSize: '12px', fontWeight: 700 }}>Application live — pas un PDF</span>
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: 900, color: C.dark, margin: '0 0 24px', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Ton dashboard<br/>de papa.<br/><span style={{ color: C.blue }}>Semaine par semaine.</span>
          </h1>
          <p style={{ fontSize: '18px', color: C.muted, lineHeight: 1.7, margin: '0 0 36px' }}>
            De la 1re echographie au 1er anniversaire de bebe. Un contenu unique chaque semaine, personnalise a ta date d'accouchement. Pas de recherche, pas de forum. Juste ce qu'il faut, quand il le faut.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <button onClick={goToStripe} style={{ background: C.dark, color: C.white, border: 'none', padding: '18px 36px', borderRadius: '32px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}>
              Commencer — 79{'\u20ac'}/an
              <span style={{ background: '#c8a060', color: '#1c1c1c', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>-30%</span>
            </button>
            <span style={{ color: C.muted, fontSize: '13px' }}>ou 9,99{'\u20ac'}/mois · Sans engagement · Acces immediat</span>
          </div>
          <a href="/inclus" style={{ color: C.blue, fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Voir ce qui est inclus {'\u2192'}</a>
        </div>
        <div className="hero-img-wrap" style={{ borderRadius: '24px', height: '520px', overflow: 'hidden', position: 'relative' }}>
          <img src="/main.jpg" alt="Papa et bebe" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}/>
          {/* Badge live */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(28,35,51,0.92)', borderRadius: '16px', padding: '12px 16px', backdropFilter: 'blur(8px)' }}>
            <p style={{ color: '#c8a060', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px' }}>Dashboard live</p>
            <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, margin: 0 }}>SA 24 · Bebe = epi de mais</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0' }}>112 jours restants</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: C.dark, margin: '72px 0 0' }}>
        <div className="stats-grid" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { chiffre: '38', label: 'semaines de contenu unique' },
            { chiffre: '12', label: 'mois de suivi post-natal' },
            { chiffre: '100%', label: 'personnalise a ta DPA' },
            { chiffre: '79\u20ac', label: 'par an soit 6,58\u20ac/mois' },
          ].map((s, i) => (
            <div key={i} className="stats-item" style={{ borderLeft: i > 0 ? '1px solid #2e3848' : 'none', padding: '32px 24px' }}>
              <p style={{ color: C.gold, fontSize: '40px', fontWeight: 900, margin: '0 0 6px', letterSpacing: '-1px' }}>{s.chiffre}</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BÉNÉFICES CLÉS */}
      <section className="section-pad" style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Pourquoi ca change tout</p>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: C.dark, margin: 0, letterSpacing: '-0.5px' }}>Ce que tu utilises vraiment.</h2>
        </div>
        <div className="benefits-grid">
          {[
            {
              icon: '📊',
              titre: 'Un dashboard qui evolue',
              desc: 'Chaque semaine, ton contenu se met a jour. Developpement de bebe, etat de maman, ta mission de papa. Un coup d\'oeil suffit — pas besoin de chercher.',
            },
            {
              icon: '✅',
              titre: 'Zero organisation manquante',
              desc: 'Valise maternite, achats prioritaires, RDV medicaux, checklist depart. Tout est coche, sauvegarde, accessible depuis ton telephone a tout moment.',
            },
            {
              icon: '👶',
              titre: 'De la grossesse au 1er anniversaire',
              desc: 'L\'app ne s\'arrete pas a la naissance. Elle bascule automatiquement en mode post-partum. 12 mois de suivi de bebe, vaccins, alertes sante, activites.',
            },
          ].map((b, i) => (
            <div key={i} style={{ background: C.cream, borderRadius: '20px', padding: '32px' }}>
              <p style={{ fontSize: '36px', margin: '0 0 16px' }}>{b.icon}</p>
              <p style={{ color: C.dark, fontSize: '18px', fontWeight: 800, margin: '0 0 10px' }}>{b.titre}</p>
              <p style={{ color: C.muted, fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TÉMOIGNAGE FORT */}
      <section style={{ background: C.dark, padding: '80px 40px' }}>
        <div className="quote-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '20px' }}>
              {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: C.gold, fontSize: '20px' }}>{s}</span>)}
            </div>
            <p style={{ color: C.white, fontSize: '24px', fontWeight: 700, lineHeight: 1.5, margin: '0 0 24px', fontFamily: 'Georgia,serif', fontStyle: 'italic' }}>
              "Ce que j'aimais c'est que ca evolue avec moi. Ce n'est pas un PDF qu'on lit une fois. C'est une app que j'ouvrais plusieurs fois par semaine. Le dashboard se mettait a jour, les contenus changeaient. J'etais dans la course toute la grossesse."
            </p>
            <div>
              <p style={{ color: C.gold, fontWeight: 700, fontSize: '14px', margin: '0 0 4px' }}>Antoine, 35 ans — Bordeaux</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>Utilisateur DadUp depuis SA 20</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { stat: '97%', desc: 'des papas se sentent mieux prepares' },
              { stat: '94%', desc: 'recommandent DadUp' },
              { stat: '4.9/5', desc: 'note moyenne' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <p style={{ color: C.gold, fontSize: '32px', fontWeight: 900, margin: 0, letterSpacing: '-1px', flexShrink: 0 }}>{s.stat}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
            <a href="/temoignages" style={{ color: C.gold, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '4px 0' }}>Lire tous les temoignages {'\u2192'}</a>
          </div>
        </div>
      </section>

      {/* PRICING RAPIDE */}
      <section className="section-pad" style={{ padding: '80px 40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px' }}>Tarifs</p>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: C.dark, margin: '0 0 8px', letterSpacing: '-0.5px' }}>Simple. Transparent.</h2>
          <p style={{ color: C.muted, fontSize: '16px', margin: 0 }}>Tout est inclus. Acces immediat apres paiement.</p>
        </div>
        <div className="pricing-grid">
          {/* Mensuel */}
          <div style={{ border: `1.5px solid ${C.border}`, borderRadius: '24px', padding: '36px', background: C.cream }}>
            <p style={{ color: C.muted, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px' }}>Mensuel</p>
            <p style={{ color: C.dark, fontSize: '48px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-1px', lineHeight: 1 }}>9,99{'\u20ac'}</p>
            <p style={{ color: C.muted, fontSize: '14px', margin: '0 0 28px' }}>par mois · sans engagement</p>
            <button onClick={goToStripe} style={{ width: '100%', background: C.dark, color: C.white, border: 'none', padding: '16px', borderRadius: '32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
              Commencer au mois
            </button>
          </div>
          {/* Annuel recommande */}
          <div style={{ background: C.dark, borderRadius: '24px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', background: C.gold, color: '#1c1c1c', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', letterSpacing: '1px' }}>RECOMMANDE</div>
            <p style={{ color: C.gold, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px' }}>Annuel</p>
            <p style={{ color: C.white, fontSize: '48px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-1px', lineHeight: 1 }}>79{'\u20ac'}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '0 0 4px' }}>par an · soit 6,58{'\u20ac'}/mois</p>
            <p style={{ color: C.gold, fontSize: '13px', fontWeight: 600, margin: '0 0 28px' }}>Economie de 30% vs mensuel</p>
            <button onClick={goToStripe} style={{ width: '100%', background: C.gold, color: '#1c1510', border: 'none', padding: '18px', borderRadius: '32px', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}>
              Commencer — 79{'\u20ac'}/an
            </button>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', margin: '10px 0 0', textAlign: 'center' }}>Paiement securise · Resiliable a tout moment</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: C.muted, fontSize: '13px', margin: '24px 0 0' }}>
          Satisfait ou rembourse dans les 7 premiers jours. Sans question.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer-section" style={{ background: C.dark, padding: '32px 40px' }}>
        <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg viewBox="0 0 300 300" width="28" height="28">
              <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
              <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
              <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
            </svg>
            <span style={{ color: C.white, fontSize: '18px', fontWeight: 800, letterSpacing: '-0.3px' }}>DadUp</span>
          </div>
          <div className="footer-links">
            {[['Pourquoi DadUp', '/pourquoi'], ['Ce qui est inclus', '/inclus'], ['Tarifs', '/tarifs'], ['Temoignages', '/temoignages']].map(([label, href]) => (
              <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', margin: 0 }}>DadUp ne remplace pas l'avis d'un medecin.</p>
        </div>
      </footer>
    </main>
  );
}
