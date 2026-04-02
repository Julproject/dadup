'use client';

import { useState } from 'react';

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
      alert('Erreur : ' + err);
    }
  };

  const C = {
    dark: '#1e2535',
    gold: '#c8a060',
    cream: '#faf6f0',
    white: '#ffffff',
    border: '#e8e0d0',
    text: '#4a5568',
    textLight: '#9aa0a8',
    blue: '#2E5F8A',
    bluePale: '#E6F0FA',
    blueDark: '#1A3D5C',
  };

  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-links { display: flex; gap: 4px; }
        .nav-cta-group { display: flex; align-items: center; gap: 16px; }
        .hamburger { display: none; }
        .mobile-menu { display: none; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .hero-img-wrap { display: block; }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); padding: 40px; }
        .modules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
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
          .modules-grid { grid-template-columns: 1fr 1fr; }
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
      <nav style={{background:C.white, borderBottom:`1px solid ${C.border}`, position:'sticky', top:0, zIndex:50}}>
        <div style={{padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'48px'}}>
            <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
              <svg viewBox="0 0 300 300" width="34" height="34">
                <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
                <circle cx="150" cy="150" r="122" fill="#4a6080"/>
                <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
                <circle cx="150" cy="112" r="40" fill="#c8a060"/>
                <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
                <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
              </svg>
              <span style={{fontWeight:800, color:C.dark, fontSize:'20px', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>DadUp</span>
            </a>
            <div className="nav-links">
              <a href="/pourquoi" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Pourquoi DadUp</a>
              <a href="/inclus" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Ce qui est inclus</a>
              <a href="/tarifs" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Tarifs</a>
              <a href="/temoignages" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Témoignages</a>
            </div>
          </div>
          <div className="nav-cta-group">
            <a href="/login" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
            <button onClick={goToStripe} style={{background:C.dark, color:C.white, border:'none', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, cursor:'pointer'}}>Commencer — 35,99€/an</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{display:'none', background:'none', border:`1px solid ${C.border}`, padding:'8px 12px', borderRadius:'8px', cursor:'pointer'}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen
                ? <path d="M4 4L16 16M16 4L4 16" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
                : <path d="M3 5h14M3 10h14M3 15h14" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
              }
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu" style={{background:C.white, borderBottom:`1px solid ${C.border}`, padding:'16px 20px', gap:'4px'}}>
            <a href="/pourquoi" style={{color:C.text, fontSize:'15px', fontWeight:500, padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:C.text, fontSize:'15px', fontWeight:500, padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:C.text, fontSize:'15px', fontWeight:500, padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Tarifs</a>
            <a href="/temoignages" style={{color:C.text, fontSize:'15px', fontWeight:500, padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Témoignages</a>
            <a href="/login" style={{color:C.dark, fontSize:'15px', fontWeight:700, padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Se connecter</a>
            <button onClick={goToStripe} style={{background:C.dark, color:C.white, border:'none', padding:'14px', borderRadius:'32px', fontSize:'14px', fontWeight:700, cursor:'pointer', marginTop:'8px', width:'100%'}}>Commencer — 35,99€/an 💪</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero-grid" style={{padding:'80px 40px 0', maxWidth:'1200px', margin:'0 auto'}}>
        <div>
          <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:C.bluePale, border:`1px solid rgba(46,95,138,0.2)`, borderRadius:'20px', padding:'6px 14px', marginBottom:'28px'}}>
            <div style={{width:'7px', height:'7px', borderRadius:'50%', background:C.blue}}></div>
            <span style={{color:C.blue, fontSize:'12px', fontWeight:700, letterSpacing:'1px'}}>💪 Ton coach paternité perso</span>
          </div>
          <h1 style={{fontSize:'54px', fontWeight:800, color:C.dark, lineHeight:1.05, margin:'0 0 24px', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
            Tout ce qu'on<br/>ne t'a pas<br/><span style={{color:C.gold}}>appris.</span>
          </h1>
          <p style={{color:C.blueDark, fontSize:'19px', lineHeight:1.5, margin:'0 0 12px', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", fontWeight:500}}>Sois un papa qui déchire. 💪</p>
          <p style={{color:C.text, fontSize:'15px', lineHeight:1.7, margin:'0 0 40px'}}>Ne réfléchis plus à la place de ta partenaire : tout est dans l'app. De la première échographie au post-partum.</p>
          <div style={{display:'flex', gap:'16px', alignItems:'center', flexWrap:'wrap' as const}}>
            <button onClick={goToStripe} style={{background:C.dark, color:C.white, border:'none', padding:'16px 32px', borderRadius:'32px', fontSize:'15px', fontWeight:700, cursor:'pointer'}}>Commencer — 35,99€/an</button>
            <a href="/inclus" style={{color:C.blue, fontSize:'14px', fontWeight:700, textDecoration:'none'}}>Ce qui est inclus →</a>
          </div>
          <p style={{color:C.textLight, fontSize:'12px', margin:'14px 0 0'}}>Ton coach paternité perso pour moins d'1€/semaine · Sans engagement</p>
        </div>
        <div style={{position:'relative'}}>
          <div className="hero-img-wrap" style={{background:C.cream, borderRadius:'24px', height:'500px', overflow:'hidden', border:`1px solid ${C.border}`}}>
            <img src="/main.jpg" alt="Couple enceinte" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center'}}/>
          </div>
          <div style={{position:'absolute', bottom:'24px', left:'-20px', background:C.bluePale, borderRadius:'16px', padding:'14px 18px', border:`1px solid rgba(46,95,138,0.15)`, display:'flex', alignItems:'center', gap:'12px'}}>
            <span style={{fontSize:'28px'}}>🍌</span>
            <div>
              <p style={{color:C.blueDark, fontSize:'13px', fontWeight:700, margin:0}}>SA 20 · Bébé = banane</p>
              <p style={{color:C.blue, fontSize:'12px', margin:'2px 0 0'}}>140 jours restants</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:C.dark, margin:'72px 0 0'}}>
        <div className="stats-grid" style={{maxWidth:'1200px', margin:'0 auto', textAlign:'center'}}>
          {[
            {chiffre:'41', label:'semaines couvertes'},
            {chiffre:'8', label:'modules complets'},
            {chiffre:'100%', label:'personnalisé'},
            {chiffre:'35,99€', label:'par an'},
          ].map((s, i) => (
            <div key={s.label} className="stats-item" style={{padding:'0 32px', borderLeft: i > 0 ? `1px solid #2e3848` : 'none'}}>
              <p style={{color: i >= 2 ? C.gold : C.white, fontSize:'40px', fontWeight:800, margin:0, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>{s.chiffre}</p>
              <p style={{color:'#6a7585', fontSize:'13px', margin:'6px 0 0'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACCROCHES PUNCHY */}
      <section style={{background:'#f7f9fc', padding:'28px 40px', borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
          {[
            {icon:'💪', texte:'Sois un papa qui déchire'},
            {icon:'🍺', texte:'35,99€ = 12 bières. Tu mérites mieux.'},
            {icon:'⚽', texte:'Moins cher que 2 places de match'},
            {icon:'📱', texte:'Centralise tout : bébé, couple, stress'},
            {icon:'🔓', texte:'Paye 1x → serein 365j'},
          ].map((item, i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:'8px', background:C.white, border:`1px solid ${C.border}`, borderRadius:'24px', padding:'10px 18px'}}>
              <span style={{fontSize:'16px'}}>{item.icon}</span>
              <span style={{color:C.dark, fontSize:'13px', fontWeight:700}}>{item.texte}</span>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE + MODULES */}
      <section className="section-pad quote-grid" style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{borderLeft:`3px solid ${C.gold}`, paddingLeft:'32px'}}>
          <p style={{fontSize:'34px', fontWeight:800, color:C.dark, margin:'0 0 16px', lineHeight:1.2, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
            Papa, dès le premier jour.
          </p>
          <p style={{color:C.text, fontSize:'16px', margin:'0 0 32px', lineHeight:1.7}}>
            Pas après la naissance. Pas quand tu te sens prêt. Maintenant, pendant la grossesse, avec les bons outils.
          </p>
          <div style={{display:'flex', gap:'16px', flexWrap:'wrap' as const}}>
            <a href="/pourquoi" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Pourquoi DadUp →</a>
            <a href="/temoignages" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Ils témoignent →</a>
          </div>
        </div>
        <div className="modules-grid">
          {[
            {emoji:'📅', titre:'Calendrier RDV',    bg:'#E6F0FA', border:'rgba(46,95,138,0.15)',  color:'#1A3D5C'},
            {emoji:'👶', titre:'Suivi bébé SA',      bg:'#E4F5EC', border:'rgba(13,107,64,0.15)',  color:'#0A2E1A'},
            {emoji:'🏥', titre:'Guide accouchement', bg:'#FFF0E6', border:'rgba(192,74,26,0.15)',  color:'#3D1A0A'},
            {emoji:'💙', titre:'Post-partum',        bg:'#FFF7E0', border:'rgba(138,96,16,0.15)',  color:'#3A2800'},
          ].map((m, i) => (
            <a key={i} href="/inclus" style={{background:m.bg, borderRadius:'16px', padding:'20px', border:`1px solid ${m.border}`, textDecoration:'none', display:'block'}}>
              <span style={{fontSize:'28px', display:'block', marginBottom:'8px'}}>{m.emoji}</span>
              <p style={{color:m.color, fontSize:'13px', fontWeight:700, margin:0}}>{m.titre}</p>
            </a>
          ))}
        </div>
      </section>

      {/* COMPARAISON PRIX */}
      <section style={{background:C.dark, padding:'60px 40px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 20px'}}>Comparaison</p>
          <h2 style={{color:C.white, fontSize:'32px', fontWeight:800, margin:'0 0 40px'}}>35,99€/an. C'est quoi 35,99€ ?</h2>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
            {[
              {icon:'🍺', label:'12 bières au bar',      prix:'~36€',   hl:false},
              {icon:'⚽', label:'2 places de match',     prix:'~60€',   hl:false},
              {icon:'🍕', label:'1 pizza XXL livrée',    prix:'~30€',   hl:false},
              {icon:'👶', label:'DadUp 1 an entier',     prix:'35,99€', hl:true},
            ].map(item => (
              <div key={item.label} style={{background: item.hl ? C.gold : 'rgba(255,255,255,0.07)', borderRadius:'20px', padding:'20px 24px', textAlign:'center', minWidth:'150px', border: item.hl ? 'none' : '1px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontSize:'28px', marginBottom:'8px'}}>{item.icon}</div>
                <p style={{color: item.hl ? '#1c1510' : 'rgba(255,255,255,0.6)', fontSize:'12px', margin:'0 0 6px', fontWeight:600}}>{item.label}</p>
                <p style={{color: item.hl ? '#1c1510' : C.white, fontSize:'20px', fontWeight:800, margin:0}}>{item.prix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section" style={{background:C.blueDark, padding:'80px 40px', textAlign:'center' as const}}>
        <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Prêt à déchirer ?</p>
        <h2 style={{color:C.white, fontSize:'42px', fontWeight:800, margin:'0 0 8px', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>Accès annuel complet</h2>
        <p style={{color:C.white, fontSize:'60px', fontWeight:800, margin:'0 0 4px', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>35,99€</p>
        <p style={{color:'#6a7585', fontSize:'15px', margin:'0 0 8px'}}>par an · paiement unique · accès immédiat</p>
        <p style={{color:'rgba(200,160,96,0.7)', fontSize:'14px', margin:'0 0 40px'}}>= 12 bières 🍺 · 2 places de match ⚽ · 1 pizza XXL 🍕</p>
        <button onClick={goToStripe} style={{background:C.gold, color:'#1c1510', border:'none', padding:'18px 48px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer', width:'100%', maxWidth:'400px'}}>Commencer maintenant — 35,99€/an</button>
        <p style={{color:'#3d5070', fontSize:'12px', margin:'12px 0 0'}}>Paiement sécurisé par Stripe · Remboursé sous 7 jours si pas satisfait</p>
      </section>

      {/* FOOTER */}
      <footer className="footer-section" style={{background:C.dark, borderTop:'1px solid #2e3848', padding:'32px 40px'}}>
        <div className="footer-inner">
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <svg viewBox="0 0 300 300" width="28" height="28">
              <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
              <circle cx="150" cy="150" r="122" fill="#4a6080"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
              <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
            </svg>
            <span style={{color:C.white, fontSize:'16px', fontWeight:700, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>DadUp</span>
          </div>
          <div className="footer-links">
            <a href="/pourquoi" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Tarifs</a>
            <a href="/temoignages" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Témoignages</a>
          </div>
          <p style={{color:'#6a7585', fontSize:'12px', margin:0}}>Il ne remplace pas l'avis d'un médecin.</p>
        </div>
      </footer>

    </main>
  );
}
