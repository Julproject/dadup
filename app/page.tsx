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
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .hero-img-wrap { display: block; }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); padding: 40px; }
        .modules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .quote-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .newbie-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .temoignages-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; }
        .footer-links { display: flex; gap: 24px; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta-group { display: none; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex; flex-direction: column; }
          .hero-grid { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px 0 !important; }
          .hero-img-wrap { height: 260px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr; padding: 24px 20px !important; gap: 0; }
          .stats-item { border-left: none !important; border-top: 1px solid #2e3848; padding: 16px !important; }
          .stats-item:nth-child(2) { border-left: 1px solid #2e3848 !important; }
          .modules-grid { grid-template-columns: 1fr 1fr; }
          .quote-grid { grid-template-columns: 1fr; gap: 32px; }
          .newbie-grid { grid-template-columns: 1fr; }
          .temoignages-grid { grid-template-columns: 1fr; }
          .footer-inner { flex-direction: column; gap: 20px; text-align: center; }
          .footer-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
          .section-pad { padding: 60px 20px !important; }
          .cta-section { padding: 60px 20px !important; }
          .footer-section { padding: 32px 20px !important; }
          h1 { font-size: 36px !important; }
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
              <span style={{fontWeight:800, color:C.dark, fontSize:'20px'}}>DadUp</span>
            </a>
            <div className="nav-links">
              <a href="/pourquoi" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Pourquoi DadUp</a>
              <a href="/inclus" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Ce qui est inclus</a>
              <a href="/tarifs" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Tarifs</a>
              <a href="/temoignages" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Témoignages</a>
              <a href="/contact" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Contactez-nous</a>
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
            <a href="/contact" style={{color:C.text, fontSize:'15px', fontWeight:500, padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Contactez-nous</a>
            <a href="/login" style={{color:C.dark, fontSize:'15px', fontWeight:700, padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Se connecter</a>
            <button onClick={goToStripe} style={{background:C.dark, color:C.white, border:'none', padding:'14px', borderRadius:'32px', fontSize:'14px', fontWeight:700, cursor:'pointer', marginTop:'8px', width:'100%'}}>Commencer — 35,99€/an</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero-grid" style={{padding:'80px 40px 0', maxWidth:'1200px', margin:'0 auto'}}>
        <div>
          {/* Badge FOMO */}
          <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'#FFF0E6', border:'1px solid rgba(192,74,26,0.2)', borderRadius:'20px', padding:'6px 14px', marginBottom:'28px'}}>
            <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#C04A1A'}}></div>
            <span style={{color:'#C04A1A', fontSize:'12px', fontWeight:700, letterSpacing:'0.5px'}}>97% des papas se sentent mieux préparés. Toi aussi ?</span>
          </div>

          <h1 style={{fontSize:'54px', fontWeight:800, color:C.dark, lineHeight:1.0, margin:'0 0 24px'}}>
            Sois le papa<br/>qui <span style={{color:C.gold}}>déchire.</span>
          </h1>

          <p style={{color:C.blueDark, fontSize:'18px', lineHeight:1.6, margin:'0 0 8px', fontWeight:600}}>
            Ton dashboard papa. Semaine 1 jusqu'à l'anniversaire de bébé.
          </p>
          <p style={{color:C.text, fontSize:'15px', lineHeight:1.7, margin:'0 0 36px'}}>
            Tout ce que tu dois savoir, quand tu en as besoin. Bébé, couple, accouchement, post-partum. Zéro blabla, que du concret.
          </p>

          <div style={{display:'flex', gap:'12px', alignItems:'center', flexWrap:'wrap' as const}}>
            <button onClick={goToStripe} style={{background:C.dark, color:C.white, border:'none', padding:'16px 32px', borderRadius:'32px', fontSize:'15px', fontWeight:800, cursor:'pointer'}}>
              Accès immédiat — 35,99€/an
            </button>
            <a href="/inclus" style={{color:C.blue, fontSize:'14px', fontWeight:700, textDecoration:'none'}}>Voir ce qui est inclus →</a>
          </div>
          <p style={{color:C.textLight, fontSize:'12px', margin:'12px 0 0'}}>Moins d'1€/semaine · Remboursé sous 7 jours si pas satisfait</p>
        </div>

          {/* Photo hero */}
        <div style={{position:'relative'}}>
          <div className="hero-img-wrap" style={{background:C.cream, borderRadius:'24px', height:'500px', overflow:'hidden', border:`1px solid ${C.border}`}}>
            <img src="/main.jpg" alt="Papa main sur le ventre" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center'}}/>
          </div>
          <div style={{position:'absolute', bottom:'24px', left:'-20px', background:C.white, borderRadius:'16px', padding:'12px 16px', border:`1px solid ${C.border}`, boxShadow:'0 4px 16px rgba(0,0,0,0.1)', display:'flex', alignItems:'center', gap:'10px'}}>
            <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#E4F5EC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px'}}>💪</div>
            <div>
              <p style={{color:C.dark, fontSize:'12px', fontWeight:800, margin:0}}>Prêt le jour J</p>
              <p style={{color:C.textLight, fontSize:'11px', margin:'1px 0 0'}}>97% mieux préparés</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:C.dark, margin:'72px 0 0'}}>
        <div className="stats-grid" style={{maxWidth:'1200px', margin:'0 auto', textAlign:'center'}}>
          {[
            {chiffre:'41',     label:'semaines couvertes'},
            {chiffre:'97%',    label:'mieux préparés'},
            {chiffre:'100%',   label:'personnalisé'},
            {chiffre:'35,99€', label:'par an'},
          ].map((s, i) => (
            <div key={s.label} className="stats-item" style={{padding:'32px', borderLeft: i > 0 ? '1px solid #2e3848' : 'none'}}>
              <p style={{color: i >= 2 ? C.gold : C.white, fontSize:'40px', fontWeight:800, margin:0}}>{s.chiffre}</p>
              <p style={{color:'#6a7585', fontSize:'13px', margin:'6px 0 0'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION "PAPA NEWBIE ?" */}
      <section className="section-pad" style={{padding:'80px 40px', background:C.cream}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'48px'}}>
            <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 12px'}}>Papa newbie ?</p>
            <h2 style={{color:C.dark, fontSize:'38px', fontWeight:800, margin:'0 0 16px', lineHeight:1.2}}>Tout ce que personne<br/>ne t'explique.</h2>
            <p style={{color:C.text, fontSize:'16px', maxWidth:'560px', margin:'0 auto', lineHeight:1.7}}>La grossesse, le médecin en parle à elle. L'accouchement, les amis en font un mythe. Le post-partum, personne n'en parle. DadUp, c'est tout ça — pour toi.</p>
          </div>
          <div className="newbie-grid">
            {[
              {
                titre: "Les échographies",
                desc: "À quoi servent T1, T2, T3 ? Ce qu'on cherche, ce que tu dois demander, comment être vraiment présent et pas juste là.",
                bg: C.bluePale, color: C.blueDark,
              },
              {
                titre: "La valise maternité",
                desc: "Checklist interactive. Ce qu'elle emporte, ce que tu prends pour toi, ce que tout le monde oublie. Cochée en 10 minutes.",
                bg: '#E4F5EC', color: '#0A2E1A',
              },
              {
                titre: "Les alertes médicales",
                desc: "Les signes qui doivent te faire appeler le médecin immédiatement. Pas de panique, juste les bons réflexes au bon moment.",
                bg: '#FDECEA', color: '#6A0000',
              },
              {
                titre: "L'accouchement",
                desc: "La règle 5-1-1. Quand partir. Ce que tu fais en salle de naissance. Péri ou pas. Césarienne. Tout ce qu'on ne te dit pas.",
                bg: '#FFF0E6', color: '#3D1A0A',
              },
              {
                titre: "Le baby blues",
                desc: "50 à 80% des femmes le vivent. Pas une dépression. Pas dans sa tête. Ce que c'est, comment tu peux vraiment aider.",
                bg: '#F0EEFF', color: '#3030A0',
              },
              {
                titre: "Le congé paternité",
                desc: "28 jours. Comment les poser, quand les prendre, ce que ça change vraiment pour votre famille les premières semaines.",
                bg: '#FFF7E0', color: '#3A2800',
              },
            ].map((item, i) => (
              <div key={i} style={{background:item.bg, borderRadius:'20px', padding:'24px', border:`1px solid ${C.border}`}}>
                <p style={{color:item.color, fontSize:'16px', fontWeight:800, margin:'0 0 10px'}}>{item.titre}</p>
                <p style={{color:item.color, fontSize:'14px', lineHeight:1.65, margin:0, opacity:0.8}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TON SUPER-POUVOIR PAPA */}
      <section className="section-pad quote-grid" style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{borderLeft:`3px solid ${C.gold}`, paddingLeft:'32px'}}>
          <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Ton super-pouvoir papa</p>
          <p style={{fontSize:'34px', fontWeight:800, color:C.dark, margin:'0 0 16px', lineHeight:1.2}}>
            Savoir ce qui se passe avant qu'on te l'explique.
          </p>
          <p style={{color:C.text, fontSize:'16px', margin:'0 0 32px', lineHeight:1.7}}>
            Quand tu arrives à l'échographie en sachant ce qu'on cherche, quand tu prépares la valise sans qu'elle demande, quand tu comprends ce qu'elle traverse — ça change tout. Pour elle. Pour vous.
          </p>
          <div style={{display:'flex', gap:'16px', flexWrap:'wrap' as const}}>
            <a href="/pourquoi" style={{color:C.dark, fontSize:'14px', fontWeight:700, textDecoration:'none'}}>Pourquoi ça change tout →</a>
            <a href="/temoignages" style={{color:C.dark, fontSize:'14px', fontWeight:700, textDecoration:'none'}}>Ce qu'ils en disent →</a>
          </div>
        </div>
        <div className="modules-grid">
          {[
            {titre:'Calendrier RDV',    desc:'Chaque consultation préparée',  bg:'#E6F0FA', color:'#1A3D5C'},
            {titre:'Suivi bébé',        desc:'SA 3 à SA 40 expliquées',       bg:'#E4F5EC', color:'#0A2E1A'},
            {titre:'Guide accouchement',desc:'Ton rôle précis le jour J',     bg:'#FFF0E6', color:'#3D1A0A'},
            {titre:'Post-partum',       desc:'Baby blues, nuits, couple',     bg:'#FFF7E0', color:'#3A2800'},
          ].map((m, i) => (
            <a key={i} href="/inclus" style={{background:m.bg, borderRadius:'16px', padding:'20px', border:`1px solid ${C.border}`, textDecoration:'none', display:'block'}}>
              <p style={{color:m.color, fontSize:'14px', fontWeight:800, margin:'0 0 4px'}}>{m.titre}</p>
              <p style={{color:m.color, fontSize:'12px', margin:0, opacity:0.7}}>{m.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section style={{background:C.dark, padding:'80px 40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>
          <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px', textAlign:'center'}}>Ils l'ont fait</p>
          <h2 style={{color:C.white, fontSize:'34px', fontWeight:800, margin:'0 0 40px', textAlign:'center'}}>Des papas qui ont décidé d'être prêts.</h2>
          <div className="temoignages-grid">
            {[
              {prenom:'Thomas', age:31, ville:'Lyon', sa:'SA 28', texte:"J'avais l'impression d'être spectateur pendant toute la grossesse. À l'accouchement j'ai su exactement quoi faire. Ma compagne me dit encore que ça a tout changé."},
              {prenom:'Maxime', age:28, ville:'Paris', sa:'SA 34', texte:"Le module post-partum m'a sauvé. Personne ne m'avait parlé du baby blues. J'ai compris ce que vivait ma femme et j'ai pu être là pour elle."},
              {prenom:'Nicolas', age:30, ville:'Toulouse', sa:'SA 40', texte:"Bébé est arrivé. J'étais là, vraiment présent, du début à la fin. C'est le plus beau jour de ma vie. DadUp m'a aidé à être prêt pour ça."},
            ].map((t,i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'24px'}}>
                <div style={{display:'flex', gap:'2px', marginBottom:'16px'}}>
                  {[...Array(5)].map((_,j)=><span key={j} style={{color:C.gold, fontSize:'14px'}}>★</span>)}
                </div>
                <p style={{color:'rgba(255,255,255,0.85)', fontSize:'14px', lineHeight:1.7, margin:'0 0 20px', fontStyle:'italic'}}>"{t.texte}"</p>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div>
                    <p style={{color:C.white, fontSize:'13px', fontWeight:700, margin:0}}>{t.prenom}, {t.age} ans</p>
                    <p style={{color:'#6a7585', fontSize:'11px', margin:'2px 0 0'}}>{t.ville}</p>
                  </div>
                  <span style={{background:'rgba(200,160,96,0.15)', color:C.gold, fontSize:'11px', fontWeight:600, padding:'4px 10px', borderRadius:'20px'}}>{t.sa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARAISON PRIX */}
      <section style={{background:C.cream, padding:'60px 40px', borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <h2 style={{color:C.dark, fontSize:'32px', fontWeight:800, margin:'0 0 8px'}}>35,99€/an. C'est quoi 35,99€ ?</h2>
          <p style={{color:C.textLight, fontSize:'15px', margin:'0 0 36px'}}>Moins cher que ce que tu dépenses en une soirée.</p>
          <div style={{display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
            {[
              {icon:'🍺', label:'12 bières',       prix:'~36€',   hl:false},
              {icon:'⚽', label:'1 place de match', prix:'~40€',   hl:false},
              {icon:'🍕', label:'1 pizza livrée',   prix:'~25€',   hl:false},
              {icon:'👶', label:'DadUp 1 an',       prix:'35,99€', hl:true},
            ].map(item => (
              <div key={item.label} style={{background: item.hl ? C.dark : C.white, border: item.hl ? 'none' : `1px solid ${C.border}`, borderRadius:'20px', padding:'20px 24px', textAlign:'center', minWidth:'140px', boxShadow: item.hl ? '0 4px 24px rgba(0,0,0,0.12)' : 'none'}}>
                <div style={{fontSize:'28px', marginBottom:'8px'}}>{item.icon}</div>
                <p style={{color: item.hl ? 'rgba(255,255,255,0.6)' : C.textLight, fontSize:'12px', margin:'0 0 4px', fontWeight:600}}>{item.label}</p>
                <p style={{color: item.hl ? C.gold : C.dark, fontSize:'20px', fontWeight:800, margin:0}}>{item.prix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section" style={{background:C.blueDark, padding:'80px 40px', textAlign:'center' as const}}>
        <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Accès immédiat</p>
        <h2 style={{color:C.white, fontSize:'44px', fontWeight:800, margin:'0 0 8px', lineHeight:1.1}}>
          Sois le papa<br/>qui déchire.
        </h2>
        <p style={{color:'rgba(255,255,255,0.5)', fontSize:'16px', margin:'0 0 8px'}}>Dashboard live · Personnalisé à ta DPA · Semaine 1 à l'anniversaire</p>
        <p style={{color:C.white, fontSize:'52px', fontWeight:800, margin:'16px 0 4px'}}>35,99€</p>
        <p style={{color:'#6a7585', fontSize:'14px', margin:'0 0 40px'}}>par an · paiement unique · sans engagement</p>
        <button onClick={goToStripe} style={{background:C.gold, color:'#1c1510', border:'none', padding:'18px 48px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer', width:'100%', maxWidth:'400px', display:'block', margin:'0 auto'}}>
          Commencer maintenant — 35,99€/an
        </button>
        <p style={{color:'#3d5070', fontSize:'12px', margin:'12px 0 0'}}>Paiement sécurisé · Remboursé sous 7 jours si pas satisfait</p>
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
            <span style={{color:C.white, fontSize:'16px', fontWeight:700}}>DadUp</span>
          </div>
          <div className="footer-links">
            <a href="/pourquoi" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Tarifs</a>
            <a href="/temoignages" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Témoignages</a>
            <a href="/contact" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Contact</a>
          </div>
          <p style={{color:'#6a7585', fontSize:'12px', margin:0}}>Il ne remplace pas l'avis d'un médecin.</p>
        </div>
      </footer>

    </main>
  );
}
