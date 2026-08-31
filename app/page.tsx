'use client';
import CheckoutModal from '@/app/components/CheckoutModal';
import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const goToStripe = () => setShowModal(true);

  const C = {
    dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
    border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
    blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  };

  return (
    <main style={{minHeight:'100vh', background:'#faf6f0', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", overflowX:'hidden'}}>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-links { display: flex; gap: 4px; }
        .nav-cta-group { display: flex; align-items: center; gap: 16px; }
        .hamburger { display: none; }
        .mobile-menu { display: none; }
        .hero-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; padding: 56px 48px; }
        .stats-4col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .modules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .quote-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .newbie-grid { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
        .newbie-grid > div { flex: 1 1 calc(33% - 16px); min-width: 240px; max-width: calc(33% - 16px); }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; }
        .footer-links { display: flex; gap: 24px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float { animation: float 4s ease-in-out infinite; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta-group { display: none; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex; flex-direction: column; }
          .hero-2col { grid-template-columns: 1fr !important; gap: 32px !important; padding: 32px 20px !important; }
          .float { animation: none !important; }
          .stats-4col { grid-template-columns: 1fr !important; }
          .modules-grid { grid-template-columns: 1fr 1fr; }
          .quote-grid { grid-template-columns: 1fr; gap: 32px; }
          .newbie-grid > div { flex: 1 1 100%; max-width: 100%; }
          .footer-inner { flex-direction: column; gap: 20px; text-align: center; }
          .footer-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
          .section-pad { padding: 60px 20px !important; }
          .cta-section { padding: 60px 20px !important; }
          .footer-section { padding: 32px 20px !important; }
          h1 { font-size: 32px !important; }
          h2 { font-size: 26px !important; }
          nav { padding: 0 16px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{background:'#faf6f0', borderBottom:'none', position:'sticky', top:0, zIndex:50, padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px'}}>
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
            <a href="/pourquoi" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Tarifs</a>
            <a href="/contact" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Contact</a>
          </div>
        </div>
        <div className="nav-cta-group">
          <a href="/login" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
          <button onClick={goToStripe} style={{background:'#1e2535', color:'#ffffff', border:'none', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, cursor:'pointer'}}>Commencer</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{display:'none', background:'none', border:`1px solid ${C.border}`, padding:'8px 12px', borderRadius:'8px', cursor:'pointer'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen
              ? <path d="M4 4L16 16M16 4L4 16" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
              : <path d="M3 5h14M3 10h14M3 15h14" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
            }
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu" style={{background:'#ffffff', borderBottom:'1px solid #ede8e0', padding:'16px 20px', gap:'4px', position:'sticky', top:'68px', zIndex:49}}>
          <a href="/pourquoi" style={{color:C.text, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Pourquoi DadUp</a>
          <a href="/inclus" style={{color:C.text, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Ce qui est inclus</a>
          <a href="/tarifs" style={{color:C.text, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Tarifs</a>
          <a href="/contact" style={{color:C.text, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Contact</a>
          <a href="/login" style={{color:C.dark, fontSize:'15px', fontWeight:700, padding:'10px 8px', textDecoration:'none'}}>Se connecter</a>
        </div>
      )}

      {/* HERO */}
      <section style={{background:'#faf6f0', padding:'24px 24px 0'}}>
        <div className="hero-2col" style={{background:'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', borderRadius:'24px', position:'relative', overflow:'hidden', border:'1px solid rgba(255,255,255,0.06)'}}>

          {/* Cercles décoratifs */}
          <div style={{position:'absolute', top:'-60px', right:'200px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,160,96,0.22) 0%,transparent 65%)', pointerEvents:'none'}}></div>
          <div style={{position:'absolute', bottom:'-80px', left:'-40px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(100,200,160,0.12) 0%,transparent 70%)', pointerEvents:'none'}}></div>
          <div style={{position:'absolute', top:'30px', right:'20px', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle,rgba(150,120,220,0.1) 0%,transparent 70%)', pointerEvents:'none'}}></div>

          {/* TEXTE GAUCHE */}
          <div style={{position:'relative', zIndex:1, padding:'8px 0'}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(230,240,250,0.15)', border:'1px solid rgba(200,160,96,0.4)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px'}}>
              <div style={{width:'6px', height:'6px', borderRadius:'50%', background:C.gold}}></div>
              <span style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'1px'}}>Conçu pour les futurs pères</span>
            </div>

            <h1 style={{color:C.white, fontSize:'clamp(28px,4vw,40px)', fontWeight:800, lineHeight:1.15, margin:'0 0 16px'}}>
              Être père, ça commence<br/><span style={{color:C.gold}}>bien avant la naissance</span>
            </h1>

            <p style={{color:'rgba(255,255,255,0.95)', fontSize:'18px', fontWeight:700, lineHeight:1.6, margin:'0 0 8px'}}>
              À deux, dès le premier jour
            </p>
            <p style={{color:'rgba(255,255,255,0.5)', fontSize:'14px', lineHeight:1.7, margin:'0 0 32px'}}>
              DadUp t&apos;accompagne semaine après semaine, de la grossesse au premier anniversaire de bébé.
            </p>

            <div style={{display:'flex', flexDirection:'column' as const, gap:'10px', maxWidth:'320px'}}>
              <button onClick={goToStripe} style={{background:'linear-gradient(135deg,#c8a060,#e8c070)', color:'#1c1510', border:'none', padding:'16px 32px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer', textAlign:'center' as const, boxShadow:'0 6px 24px rgba(200,160,96,0.5),0 2px 8px rgba(0,0,0,0.2)'}}>
                Accéder
              </button>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.1)'}}></div>
                <span style={{color:'rgba(255,255,255,0.4)', fontSize:'12px'}}>Satisfait ou remboursé sous 14 jours</span>
                <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.1)'}}></div>
              </div>
              <a href="/inclus" style={{color:'rgba(255,255,255,0.55)', fontSize:'13px', textAlign:'center' as const, textDecoration:'none'}}>Voir ce qui est inclus →</a>
            </div>
          </div>

          {/* BADGES VERTICAUX */}
          <style>{`.badge-item{transition:transform .2s ease}.badge-item:hover{transform:scale(1.04)}`}</style>
          <div style={{position:'relative', zIndex:1, display:'flex', flexDirection:'column' as const, gap:'10px', justifyContent:'center'}}>
            {[
              {bg:'rgba(180,220,255,0.15)', border:'rgba(180,220,255,0.35)', iconBg:'#B8DCFF', iconColor:'#1A3D5C', textColor:'#B8DCFF', label:'41 semaines de contenu'},
              {bg:'rgba(150,240,200,0.12)', border:'rgba(150,240,200,0.3)', iconBg:'#96F0C8', iconColor:'#0D4A2E', textColor:'#96F0C8', label:'Après la naissance inclus'},
              {bg:'rgba(200,170,255,0.12)', border:'rgba(200,170,255,0.3)', iconBg:'#C8AAFF', iconColor:'#3D2E7A', textColor:'#C8AAFF', label:"Jusqu'au 1er anniversaire de bébé"},
              {bg:'rgba(255,240,160,0.12)', border:'rgba(255,240,160,0.3)', iconBg:'#FFF0A0', iconColor:'#8A6010', textColor:'#FFF0A0', label:'Contenu médical sourcé'},
              {bg:'rgba(200,255,240,0.12)', border:'rgba(100,220,200,0.3)', iconBg:'#A0FFE8', iconColor:'#006B55', textColor:'#A0FFE8', label:'Disponible sur web + mobile (PWA)'},
            ].map((b,i) => (
              <div key={i} className="badge-item" style={{background:b.bg, border:`1px solid ${b.border}`, borderRadius:'14px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'12px', cursor:'default'}}>
                <div style={{width:'30px', height:'30px', borderRadius:'50%', background:b.iconBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'14px', color:b.iconColor, fontWeight:800}}>✓</div>
                <p style={{color:b.textColor, fontSize:'13px', fontWeight:700, margin:0}}>{b.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION CHIFFRES CLÉS — jaune pastel */}
      <section style={{padding:'80px 40px', background:'#faf6f0'}}>
        <div style={{maxWidth:'1000px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'48px'}}>
            <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Ce que DadUp couvre</p>
            <h2 style={{color:C.dark, fontSize:'36px', fontWeight:800, margin:0, lineHeight:1.2}}>Tout ce dont tu as besoin,<br/>au bon moment</h2>
          </div>
          <div className="stats-4col">
            {[
              {border:'rgba(180,220,255,0.25)', label:'41 semaines', lc:'#7ab8f0', title:'De De la 3e à la 41e semaine', tc:'#B8DCFF', desc:"Chaque semaine expliquée côté papa : développement de bébé, ton rôle, ce qu'elle vit.", dc:'rgba(180,220,255,0.6)'},
              {border:'rgba(150,240,200,0.2)', label:"Jusqu'au 1er anniversaire", lc:'#5dd4a0', title:'Après la naissance inclus', tc:'#96F0C8', desc:'Les premiers mois, le développement de bébé, le baby blues, le couple. Tout est inclus.', dc:'rgba(150,240,200,0.6)'},
              {border:'rgba(200,170,255,0.2)', label:'Calendrier médical', lc:'#a888f0', title:'Chaque consultation préparée', tc:'#C8AAFF', desc:"Ce qu'on cherche à chaque rendez-vous, les bonnes questions à poser, comment être vraiment présent.", dc:'rgba(200,170,255,0.6)'},
              {border:'rgba(255,240,160,0.25)', label:'Paiement unique', lc:'#e0b870', title:'Sans abonnement', tc:'#FFF0A0', desc:"Tu paies une fois, tu accèdes jusqu'au premier anniversaire de bébé. Pas de surprise.", dc:'rgba(255,240,160,0.6)'},
            ].map((s,i) => (
              <div key={i} style={{background:'#ffffff', borderRadius:'20px', padding:'28px 32px', boxShadow:'0 8px 32px rgba(0,0,0,0.08)', border:'none'}}>
                <p style={{color:'#c8a060', fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 10px'}}>{s.label}</p>
                <p style={{color:'#1e2535', fontSize:'15px', fontWeight:700, margin:'0 0 8px'}}>{s.title}</p>
                <p style={{color:'#6a5020', fontSize:'13px', margin:0, lineHeight:1.65}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CE QUE PERSONNE NE T'EXPLIQUE — DÉFILEMENT AUTO */}
      <section style={{padding:'80px 0', background:'transparent', overflow:'hidden'}}>
        <div style={{textAlign:'center', marginBottom:'48px', padding:'0 40px'}}>
          <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Les sujets traités</p>
          <h2 style={{color:C.dark, fontSize:'36px', fontWeight:800, margin:'0 0 16px', lineHeight:1.2}}>Tout ce que personne<br/>ne t&apos;explique</h2>
          <p style={{color:C.textLight, fontSize:'15px', margin:'0 auto', maxWidth:'480px', lineHeight:1.7}}>Traités sans détour, au bon moment de la grossesse.</p>
        </div>
        <style>{`
          @keyframes scrollLeft { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .auto-track { display:flex; gap:16px; width:max-content; animation:scrollLeft 22s linear infinite; }
          .auto-track:hover { animation-play-state:paused; }
          .auto-wrap { overflow:hidden; position:relative; background:transparent; padding:20px 0; }
          .auto-wrap::before { content:''; position:absolute; left:0; top:0; bottom:0; width:120px; background:linear-gradient(to right,#faf6f0 20%,transparent); z-index:2; pointer-events:none; }
          .auto-wrap::after { content:''; position:absolute; right:0; top:0; bottom:0; width:120px; background:linear-gradient(to left,#faf6f0 20%,transparent); z-index:2; pointer-events:none; }
          .auto-card { flex:0 0 300px; border-radius:20px; padding:28px; box-shadow:0 6px 24px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.05); transition:transform .25s ease,box-shadow .25s ease; cursor:default; } .auto-card:hover { transform:translateY(-6px); box-shadow:0 18px 44px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.07); }
        `}</style>
        <div className="auto-wrap">
          <div className="auto-track">
            {[
              {titre:"Les échographies", desc:"À quoi servent T1, T2, T3 ? Ce qu'on cherche, ce que tu dois demander, comment être vraiment présent.", bg:C.bluePale, color:C.blueDark},
              {titre:"La valise maternité", desc:"Checklist interactive. Ce qu'elle emporte, ce que tu prends pour toi, ce que tout le monde oublie.", bg:'#E4F5EC', color:'#0A2E1A'},
              {titre:"L'accouchement", desc:"La règle 5-1-1. Quand partir. Ce que tu fais en salle de naissance. Péri ou pas.", bg:'#FFF7E0', color:'#3A2800'},
              {titre:"Le baby blues", desc:"50 à 80% des femmes le vivent. Pas une dépression. Ce que c'est, comment tu peux vraiment aider.", bg:'#F0EEFF', color:'#3030A0'},
              {titre:"Le congé paternité", desc:"28 jours. Comment les poser, quand les prendre, ce que ça change vraiment pour votre famille.", bg:'#E4F5EC', color:'#0A2E1A'},
              {titre:"Le post-partum", desc:"Baby blues, reprise du travail, nuits sans sommeil. Ton rôle les premières semaines.", bg:C.bluePale, color:C.blueDark},
              {titre:"Les échographies", desc:"À quoi servent T1, T2, T3 ? Ce qu'on cherche, ce que tu dois demander, comment être vraiment présent.", bg:C.bluePale, color:C.blueDark},
              {titre:"La valise maternité", desc:"Checklist interactive. Ce qu'elle emporte, ce que tu prends pour toi, ce que tout le monde oublie.", bg:'#E4F5EC', color:'#0A2E1A'},
              {titre:"L'accouchement", desc:"La règle 5-1-1. Quand partir. Ce que tu fais en salle de naissance. Péri ou pas.", bg:'#FFF7E0', color:'#3A2800'},
              {titre:"Le baby blues", desc:"50 à 80% des femmes le vivent. Pas une dépression. Ce que c'est, comment tu peux vraiment aider.", bg:'#F0EEFF', color:'#3030A0'},
              {titre:"Le congé paternité", desc:"28 jours. Comment les poser, quand les prendre, ce que ça change vraiment pour votre famille.", bg:'#E4F5EC', color:'#0A2E1A'},
              {titre:"Le post-partum", desc:"Baby blues, reprise du travail, nuits sans sommeil. Ton rôle les premières semaines.", bg:C.bluePale, color:C.blueDark},
            ].map((item, i) => (
              <div key={i} className="auto-card" style={{background:item.bg}}>
                <p style={{color:item.color, fontSize:'15px', fontWeight:800, margin:'0 0 10px'}}>{item.titre}</p>
                <p style={{color:item.color, fontSize:'13px', lineHeight:1.65, margin:0, opacity:0.8}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

                        {/* SAVOIR AVANT + CTA — section fusionnée */}
      <section style={{padding:'80px 40px', background:'#faf6f0'}}>
        <div style={{maxWidth:'720px', margin:'0 auto', textAlign:'center' as const}}>
          {/* Savoir avant — sur le fond crème directement */}
          <div style={{marginBottom:'72px'}}>
            <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 20px'}}>Ce que tu peux changer</p>
            <h2 style={{color:C.dark, fontSize:'40px', fontWeight:800, lineHeight:1.2, margin:'0 0 20px'}}>
              Savoir ce qui se passe<br/><span style={{color:C.gold}}>avant qu&apos;on te l&apos;explique</span>
            </h2>
            <p style={{color:C.text, fontSize:'17px', lineHeight:1.8, margin:'0 auto 32px', maxWidth:'520px'}}>
              Un père qui comprend prend de meilleures décisions. Il est plus calme le jour J. Il sait quoi faire, et quand le faire.
            </p>
            <a href="/pourquoi" style={{display:'inline-flex', alignItems:'center', gap:'8px', color:C.dark, fontSize:'15px', fontWeight:700, textDecoration:'none', borderBottom:`2px solid ${C.gold}`, paddingBottom:'2px'}}>
              Pourquoi ça change tout →
            </a>
          </div>

        </div>

        {/* CTA final — photo en fond */}
        <div style={{borderRadius:'24px', padding:'72px 48px', position:'relative', overflow:'hidden', textAlign:'center' as const, maxWidth:'1200px', margin:'0 auto'}}>
          <img src="/main.jpg" alt="Papa et bébé" style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 60%', display:'block'}}/>
          <div style={{position:'absolute', top:0, left:0, right:0, bottom:0, background:'linear-gradient(135deg,rgba(10,31,50,0.93) 0%,rgba(26,61,92,0.88) 50%,rgba(29,77,114,0.82) 100%)'}}></div>
          <div style={{position:'absolute', top:'-60px', right:'100px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,160,96,0.22) 0%,transparent 65%)', pointerEvents:'none'}}></div>
          <div style={{position:'absolute', bottom:'-60px', left:'-40px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(100,200,160,0.1) 0%,transparent 70%)', pointerEvents:'none'}}></div>
          <div style={{position:'relative', zIndex:1, maxWidth:'520px', margin:'0 auto'}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(200,160,96,0.18)', border:'1px solid rgba(200,160,96,0.5)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px'}}>
              <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#c8a060', boxShadow:'0 0 8px rgba(200,160,96,0.9)'}}></div>
              <span style={{color:'#e0b870', fontSize:'11px', fontWeight:700, letterSpacing:'1px'}}>Accès immédiat</span>
            </div>
            <h2 style={{color:'#fff', fontSize:'48px', fontWeight:800, margin:'0 0 12px', lineHeight:1.1}}>
              Prends ta place<br/><span style={{color:'#e0b870'}}>de père</span>
            </h2>
            <p style={{color:'rgba(255,255,255,0.6)', fontSize:'16px', margin:'0 0 36px', lineHeight:1.7}}>
              À deux, dès le premier jour
            </p>
            <button onClick={goToStripe} style={{background:'linear-gradient(135deg,#c8a060,#e8c070)', color:'#1c1510', border:'none', padding:'20px 56px', borderRadius:'32px', fontSize:'18px', fontWeight:800, cursor:'pointer', display:'block', margin:'0 auto 14px', boxShadow:'0 8px 32px rgba(200,160,96,0.5), 0 2px 8px rgba(0,0,0,0.2)'}}>
              Accéder · 49,99€
            </button>
            <p style={{color:'rgba(255,255,255,0.35)', fontSize:'13px', margin:0}}>Paiement unique · Satisfait ou remboursé sous 14 jours</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#1A3D5C', borderTop:'none', padding:'40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' as const, gap:'20px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <svg viewBox="0 0 300 300" width="28" height="28">
              <circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/>
            </svg>
            <span style={{color:'rgba(255,255,255,0.9)', fontSize:'16px', fontWeight:700}}>DadUp</span>
            <span style={{color:'rgba(255,255,255,0.45)', fontSize:'13px', marginLeft:'12px', fontStyle:'italic' as const}}>À deux, dès le premier jour</span>
          </div>
          <div style={{display:'flex', gap:'20px', flexWrap:'wrap' as const}}>
            {[['Pourquoi DadUp','/pourquoi'],['Ce qui est inclus','/inclus'],['Tarifs','/tarifs'],['Professionnels','/professionnels'],['Sources','/sources'],['Contact','/contact']].map(([label,href]) => (
              <a key={href} href={href} style={{color:'rgba(255,255,255,0.55)', fontSize:'13px', textDecoration:'none'}}>{label}</a>
            ))}
          </div>
          <div style={{display:'flex', gap:'16px'}}>
            {[['CGV','/cgv'],['Confidentialité','/confidentialite'],['Mentions légales','/mentions-legales']].map(([label,href]) => (
              <a key={href} href={href} style={{color:'rgba(255,255,255,0.35)', fontSize:'12px', textDecoration:'none'}}>{label}</a>
            ))}
          </div>
        </div>
      </footer>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
