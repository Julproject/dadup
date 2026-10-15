'use client';
import CheckoutModal from '@/app/components/CheckoutModal';
import { useState } from 'react';
import TelephoneRealiste from '@/app/components/TelephoneRealiste';
import { Logo } from './components/Logo';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const goToStripe = () => setShowModal(true);

  const C = {
    dark: '#15263A', gold: '#B4593A', cream: '#F6F1E9', white: '#ffffff',
    border: '#E6E0D5', text: '#3D4A55', textLight: '#56616B',
    blue: '#2E5F8A', bluePale: '#ffffff', blueDark: '#1A3D5C',
  };

  return (
    <main style={{minHeight:'100vh', background:'#F6F1E9', fontFamily:'inherit', overflowX:'hidden'}}>

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
      <nav style={{background:'#F6F1E9', borderBottom:'none', position:'sticky', top:0, zIndex:50, padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'48px'}}>
          <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
            <Logo fond="creme" hauteur={30} />
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
        <button className="hamburger" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} style={{display:'none', minWidth:'44px', minHeight:'44px', background:'none', border:`1px solid ${C.border}`, padding:'8px 12px', borderRadius:'8px', cursor:'pointer'}}>
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

      {/* HERO : trois écrans de l'app en éventail */}
      <section style={{background:'#F6F1E9', padding:'24px 24px 0'}}>
        <style>{`
          .hero-a{position:relative;overflow:hidden;border-radius:24px;background:linear-gradient(160deg,#0C1D2E 0%,#1A3D5C 62%,#24507A 100%);padding:72px 24px 0;text-align:center;max-width:1392px;margin:0 auto;}
          .hero-a h1{color:#fff;font-size:clamp(32px,5vw,58px);font-weight:800;line-height:1.06;letter-spacing:-1.2px;margin:0 auto 18px;max-width:900px;}
          .hero-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:26px auto 0;max-width:860px;}
          .hero-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.16);border-radius:99px;padding:8px 14px;color:#fff;font-size:13px;font-weight:700;}
          .hero-phones{position:relative;width:min(880px,100%);height:420px;margin:48px auto 0;}
          .hero-a > *{position:relative;z-index:1;}
          .hero-a > .hero-deco{position:absolute;z-index:0;pointer-events:none;}
          .hero-phones .hp{position:absolute;}
          .hp-c{left:50%;top:0;transform:translateX(-50%);width:270px;z-index:2;}
          .hp-l,.hp-r{top:90px;width:236px;}
          .hp-l{left:70px;transform:rotate(-7deg);}
          .hp-r{right:70px;transform:rotate(7deg);}
          .deco-ventre{top:0;right:0;height:100%;width:min(38%,460px);}
          .deco-coeur{top:120px;left:6%;width:56px;filter:drop-shadow(0 0 6px rgba(227,138,85,.75));overflow:visible;}
          .deco-pieds{bottom:130px;left:8%;width:78px;filter:drop-shadow(0 0 5px rgba(227,138,85,.7));overflow:visible;}
          .deco-etoiles{top:40px;left:22%;width:120px;}
          @media (max-width:768px){
            .hero-a{padding:44px 20px 0;}
            .hero-a h1{letter-spacing:-0.6px;}
            .hero-chips{gap:6px;margin-top:20px;}
            .hero-chip{font-size:12px;padding:6px 11px;}
            .hero-phones{height:300px;margin-top:36px;}
            .hp-c{width:176px;}
            .hp-l,.hp-r{top:64px;width:146px;}
            .hp-l{left:-6px;transform:rotate(-8deg);}
            .hp-r{right:-6px;transform:rotate(8deg);}
            .deco-ventre{top:auto;bottom:0;height:46%;width:60%;opacity:.6;}
            .deco-coeur,.deco-pieds,.deco-etoiles{display:none;}
          }
        `}</style>
        <div className="hero-a">
          {/* Décor lumineux : ventre de future maman, cœur, petits pieds, étincelles */}
          <svg className="hero-deco deco-ventre" viewBox="0 0 400 700" preserveAspectRatio="xMaxYMin meet" aria-hidden="true">
            <defs>
              <linearGradient id="dd-lueur" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F2B27E" stopOpacity="0" />
                <stop offset="0.25" stopColor="#E38A55" />
                <stop offset="0.6" stopColor="#F2B27E" />
                <stop offset="1" stopColor="#B4593A" stopOpacity="0" />
              </linearGradient>
              <filter id="dd-flou" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="9" /></filter>
            </defs>
            <path d="M380 -10 C352 70 300 120 292 205 C286 262 250 290 214 352 C168 432 186 548 262 586 C310 610 330 650 336 712" fill="none" stroke="url(#dd-lueur)" strokeWidth="14" filter="url(#dd-flou)" opacity="0.7" />
            <path d="M380 -10 C352 70 300 120 292 205 C286 262 250 290 214 352 C168 432 186 548 262 586 C310 610 330 650 336 712" fill="none" stroke="url(#dd-lueur)" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <svg className="hero-deco deco-coeur" viewBox="0 0 48 44" aria-hidden="true">
            <path d="M24 40S4 28 4 14A10 10 0 0 1 24 9a10 10 0 0 1 20 5c0 14-20 26-20 26z" fill="none" stroke="#F2B27E" strokeWidth="1.6" strokeLinejoin="round" opacity="0.85" />
          </svg>
          <svg className="hero-deco deco-pieds" viewBox="0 0 70 64" aria-hidden="true" fill="none" stroke="#F2B27E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 50c-5 0-7.5-4.5-6.5-10.5C9.5 33 12.5 27 18 26.5c5-.5 7 3.5 6 8.5-.7 3.7-2.8 5.8-3 9.6-.2 3.4-2 5.4-6 5.4z" />
            <circle cx="10.5" cy="20.5" r="2.1" /><circle cx="15.5" cy="17.6" r="1.8" /><circle cx="20" cy="17.4" r="1.6" /><circle cx="23.8" cy="19" r="1.4" /><circle cx="26.6" cy="21.8" r="1.2" />
            <path d="M50 40c5 0 7.5-4.5 6.5-10.5C55.5 23 52.5 17 47 16.5c-5-.5-7 3.5-6 8.5.7 3.7 2.8 5.8 3 9.6.2 3.4 2 5.4 6 5.4z" />
            <circle cx="54.5" cy="10.5" r="2.1" /><circle cx="49.5" cy="7.6" r="1.8" /><circle cx="45" cy="7.4" r="1.6" /><circle cx="41.2" cy="9" r="1.4" /><circle cx="38.4" cy="11.8" r="1.2" />
          </svg>
          <svg className="hero-deco deco-etoiles" viewBox="0 0 120 60" aria-hidden="true" fill="#F2B27E">
            <path d="M18 14l1.6 4.4L24 20l-4.4 1.6L18 26l-1.6-4.4L12 20l4.4-1.6z" opacity="0.8" />
            <circle cx="62" cy="40" r="1.6" opacity="0.6" /><circle cx="96" cy="12" r="1.3" opacity="0.5" />
            <path d="M104 40l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1z" opacity="0.6" />
          </svg>
          <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(157,176,154,0.18)', border:'1px solid rgba(157,176,154,0.45)', borderRadius:'20px', padding:'5px 14px', marginBottom:'22px'}}>
            <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#9DB09A'}}></div>
            <span style={{color:'#C9D8C4', fontSize:'12px', fontWeight:700, letterSpacing:'1px'}}>Conçu pour les futurs pères</span>
          </div>

          <h1>Être père, ça commence <span style={{color:'#C9D8C4'}}>bien avant la naissance</span></h1>

          <p style={{color:'#ffffff', fontSize:'18px', fontWeight:700, lineHeight:1.5, margin:'0 0 6px'}}>Prends ta place de père</p>
          <p style={{color:'rgba(255,255,255,0.82)', fontSize:'17px', lineHeight:1.6, margin:'0 auto 30px', maxWidth:'600px'}}>
            DadUp t&apos;accompagne semaine après semaine, de la grossesse au premier anniversaire de bébé.
          </p>

          <div style={{display:'flex', flexWrap:'wrap' as const, alignItems:'center', justifyContent:'center', gap:'14px 22px'}}>
            <button onClick={goToStripe} style={{background:'#B4593A', color:'#ffffff', border:'none', minHeight:'54px', padding:'16px 36px', borderRadius:'14px', fontSize:'17px', fontWeight:800, cursor:'pointer'}}>
              Accéder à DadUp
            </button>
            <a href="/inclus" style={{color:'#ffffff', fontSize:'15px', fontWeight:700, textDecoration:'none', borderBottom:'2px solid rgba(255,255,255,0.35)', paddingBottom:'2px'}}>Voir ce qui est inclus →</a>
          </div>
          <p style={{color:'rgba(255,255,255,0.78)', fontSize:'13px', margin:'16px 0 0'}}>49,99 € · paiement unique · satisfait ou remboursé sous 14 jours</p>

          <ul className="hero-chips" style={{listStyle:'none', padding:0}}>
            {['41 semaines de contenu','Après la naissance inclus',"Jusqu'au 1er anniversaire de bébé",'Contenu médical sourcé','Disponible sur web + mobile (PWA)'].map((label) => (
              <li key={label} className="hero-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9D8C4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
                {label}
              </li>
            ))}
          </ul>

          <div className="hero-phones">
            <TelephoneRealiste className="hp hp-l" src="/apercu-bebe.webp" alt="Écran Bébé de DadUp : le développement de bébé semaine après semaine" />
            <TelephoneRealiste className="hp hp-r" src="/apercu-jourj.webp" alt="Écran Jour J de DadUp : quand partir et qui appeler" />
            <TelephoneRealiste className="hp hp-c" src="/apercu-accueil.webp" alt="Écran d'accueil de DadUp : compte à rebours, semaine de grossesse et bébé cette semaine" prioritaire />
          </div>
        </div>
      </section>

      {/* SECTION CHIFFRES CLÉS : jaune pastel */}
      <section style={{padding:'80px 40px', background:'#F6F1E9'}}>
        <div style={{maxWidth:'1000px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'48px'}}>
            <p style={{color:C.blue, fontSize:'12px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Ce que DadUp couvre</p>
            <h2 style={{color:C.dark, fontSize:'36px', fontWeight:800, margin:0, lineHeight:1.2}}>Tout ce dont tu as besoin,<br/>au bon moment</h2>
          </div>
          <div className="stats-4col">
            {[
              {border:'rgba(180,220,255,0.25)', ic:'M12 21v-8M12 13c0-4.4 3.2-7.6 8-7.6 0 4.4-3.2 7.6-8 7.6zM12 15.5c0-3.6-2.6-6.3-7-6.3 0 3.6 2.6 6.3 7 6.3z', label:'La grossesse', lc:'#7ab8f0', title:'De la 3e à la 41e semaine', tc:'#B8DCFF', desc:"Chaque semaine expliquée côté papa : développement de bébé, ton rôle, ce qu'elle vit.", dc:'rgba(180,220,255,0.6)'},
              {border:'rgba(150,240,200,0.2)', ic:'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z', label:"L'après-naissance", lc:'#5dd4a0', title:"Jusqu'au 1er anniversaire de bébé", tc:'#96F0C8', desc:'Les premiers mois, le développement de bébé, le baby blues, le couple. Tout est inclus.', dc:'rgba(150,240,200,0.6)'},
              {border:'rgba(200,170,255,0.2)', ic:'M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 10h16M9 3v4M15 3v4', label:'Calendrier médical', lc:'#a888f0', title:'Chaque consultation préparée', tc:'#C8AAFF', desc:"Ce qu'on cherche à chaque rendez-vous, les bonnes questions à poser, comment être vraiment présent.", dc:'rgba(200,170,255,0.6)'},
              {border:'rgba(255,240,160,0.25)', ic:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 12.2l2.4 2.4 4.6-5.1', label:'Paiement unique', lc:'#C9D8C4', title:'Sans abonnement', tc:'#FFF0A0', desc:"Tu paies une fois, tu accèdes jusqu'au premier anniversaire de bébé. Pas de surprise.", dc:'rgba(255,240,160,0.6)'},
            ].map((s,i) => (
              <div key={i} style={{background:'#ffffff', borderRadius:'20px', padding:'28px 32px', boxShadow:'0 8px 32px rgba(0,0,0,0.08)', border:'none'}}>
                <div style={{display:'flex', alignItems:'center', gap:'12px', margin:'0 0 12px'}}>
                  <span style={{width:'42px', height:'42px', borderRadius:'50%', background:'#F8E9DF', boxShadow:'0 0 0 6px rgba(242,218,203,0.35)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4593A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.ic} /></svg>
                  </span>
                  <p style={{color:'#9C4A2E', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:0}}>{s.label}</p>
                </div>
                <p style={{color:'#15263A', fontSize:'15px', fontWeight:700, margin:'0 0 8px'}}>{s.title}</p>
                <p style={{color:'#56616B', fontSize:'13px', margin:0, lineHeight:1.65}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CE QUE PERSONNE NE T'EXPLIQUE : DÉFILEMENT AUTO */}
      <section style={{padding:'80px 0', background:'transparent', overflow:'hidden'}}>
        <div style={{textAlign:'center', marginBottom:'48px', padding:'0 40px'}}>
          <p style={{color:C.blue, fontSize:'12px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Les sujets traités</p>
          <h2 style={{color:C.dark, fontSize:'36px', fontWeight:800, margin:'0 0 16px', lineHeight:1.2}}>Tout ce que personne<br/>ne t&apos;explique</h2>
          <p style={{color:C.textLight, fontSize:'15px', margin:'0 auto', maxWidth:'480px', lineHeight:1.7}}>Traités sans détour, au bon moment de la grossesse.</p>
        </div>
        <style>{`
          @keyframes scrollLeft { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .auto-track { display:flex; gap:16px; width:max-content; animation:scrollLeft 22s linear infinite; }
          .auto-track:hover { animation-play-state:paused; }
          .auto-wrap { overflow:hidden; position:relative; background:transparent; padding:20px 0; }
          .auto-wrap::before { content:''; position:absolute; left:0; top:0; bottom:0; width:120px; background:linear-gradient(to right,#F6F1E9 20%,transparent); z-index:2; pointer-events:none; }
          .auto-wrap::after { content:''; position:absolute; right:0; top:0; bottom:0; width:120px; background:linear-gradient(to left,#F6F1E9 20%,transparent); z-index:2; pointer-events:none; }
          .auto-card { flex:0 0 300px; border-radius:20px; padding:28px; box-shadow:0 6px 24px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.05); transition:transform .25s ease,box-shadow .25s ease; cursor:default; } .auto-card:hover { transform:translateY(-6px); box-shadow:0 18px 44px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.07); }
        `}</style>
        <div className="auto-wrap">
          <div className="auto-track">
            {[
              {titre:"Les échographies", desc:"À quoi servent T1, T2, T3 ? Ce qu'on cherche, ce que tu dois demander, comment être vraiment présent.", bg:'#ffffff', color:'#15263A'},
              {titre:"La valise maternité", desc:"Checklist interactive. Ce qu'elle emporte, ce que tu prends pour toi, ce que tout le monde oublie.", bg:'#ffffff', color:'#15263A'},
              {titre:"L'accouchement", desc:"La règle 5-1-1. Quand partir. Ce que tu fais en salle de naissance. Péri ou pas.", bg:'#ffffff', color:'#15263A'},
              {titre:"Le baby blues", desc:"50 à 80% des femmes le vivent. Pas une dépression. Ce que c'est, comment tu peux vraiment aider.", bg:'#ffffff', color:'#15263A'},
              {titre:"Le congé paternité", desc:"28 jours. Comment les poser, quand les prendre, ce que ça change vraiment pour votre famille.", bg:'#ffffff', color:'#15263A'},
              {titre:"Le post-partum", desc:"Baby blues, reprise du travail, nuits sans sommeil. Ton rôle les premières semaines.", bg:'#ffffff', color:'#15263A'},
              {titre:"Les échographies", desc:"À quoi servent T1, T2, T3 ? Ce qu'on cherche, ce que tu dois demander, comment être vraiment présent.", bg:'#ffffff', color:'#15263A'},
              {titre:"La valise maternité", desc:"Checklist interactive. Ce qu'elle emporte, ce que tu prends pour toi, ce que tout le monde oublie.", bg:'#ffffff', color:'#15263A'},
              {titre:"L'accouchement", desc:"La règle 5-1-1. Quand partir. Ce que tu fais en salle de naissance. Péri ou pas.", bg:'#ffffff', color:'#15263A'},
              {titre:"Le baby blues", desc:"50 à 80% des femmes le vivent. Pas une dépression. Ce que c'est, comment tu peux vraiment aider.", bg:'#ffffff', color:'#15263A'},
              {titre:"Le congé paternité", desc:"28 jours. Comment les poser, quand les prendre, ce que ça change vraiment pour votre famille.", bg:'#ffffff', color:'#15263A'},
              {titre:"Le post-partum", desc:"Baby blues, reprise du travail, nuits sans sommeil. Ton rôle les premières semaines.", bg:'#ffffff', color:'#15263A'},
            ].map((item, i) => (
              <div key={i} className="auto-card" style={{background:item.bg}}>
                <p style={{color:item.color, fontSize:'15px', fontWeight:800, margin:'0 0 10px'}}>{item.titre}</p>
                <p style={{color:'#56616B', fontSize:'13px', lineHeight:1.65, margin:0}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

                        {/* SAVOIR AVANT + CTA : section fusionnée */}
      <section style={{padding:'80px 40px', background:'#F6F1E9'}}>
        <div style={{maxWidth:'720px', margin:'0 auto', textAlign:'center' as const}}>
          {/* Savoir avant : sur le fond crème directement */}
          <div style={{marginBottom:'72px'}}>
            <p style={{color:'#9C4A2E', fontSize:'12px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 20px'}}>Ce que tu peux changer</p>
            <h2 style={{color:C.dark, fontSize:'40px', fontWeight:800, lineHeight:1.2, margin:'0 0 20px'}}>
              Savoir ce qui se passe<br/><span style={{color:'#B4593A'}}>avant qu&apos;on te l&apos;explique</span>
            </h2>
            <p style={{color:C.text, fontSize:'17px', lineHeight:1.8, margin:'0 auto 32px', maxWidth:'520px'}}>
              Un père qui comprend prend de meilleures décisions. Il est plus calme le jour J. Il sait quoi faire, et quand le faire.
            </p>
            <a href="/pourquoi" style={{display:'inline-flex', alignItems:'center', gap:'8px', color:C.dark, fontSize:'15px', fontWeight:700, textDecoration:'none', borderBottom:`2px solid #B4593A`, paddingBottom:'2px'}}>
              Pourquoi ça change tout →
            </a>
          </div>

        </div>

        {/* CTA final : photo en fond */}
        <div style={{borderRadius:'24px', padding:'72px 48px', position:'relative', overflow:'hidden', textAlign:'center' as const, maxWidth:'1200px', margin:'0 auto'}}>
          <img src="/main.jpg" alt="Papa et bébé" loading="lazy" decoding="async" width={1400} height={2100} style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 60%', display:'block'}}/>
          <div style={{position:'absolute', top:0, left:0, right:0, bottom:0, background:'linear-gradient(135deg,rgba(10,31,50,0.93) 0%,rgba(26,61,92,0.88) 50%,rgba(29,77,114,0.82) 100%)'}}></div>
          <div style={{position:'absolute', top:'-60px', right:'100px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(157,176,154,0.22) 0%,transparent 65%)', pointerEvents:'none'}}></div>
          <div style={{position:'absolute', bottom:'-60px', left:'-40px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(100,200,160,0.1) 0%,transparent 70%)', pointerEvents:'none'}}></div>
          <div style={{position:'relative', zIndex:1, maxWidth:'520px', margin:'0 auto'}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(157,176,154,0.18)', border:'1px solid rgba(157,176,154,0.5)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px'}}>
              <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#9DB09A', boxShadow:'0 0 8px rgba(157,176,154,0.9)'}}></div>
              <span style={{color:'#C9D8C4', fontSize:'12px', fontWeight:700, letterSpacing:'1px'}}>Accès immédiat</span>
            </div>
<p style={{color:'rgba(255,255,255,0.9)', fontSize:'28px', fontWeight:800, margin:'0 0 32px', lineHeight:1.3}}>
              À tes côtés, dès le début
            </p>
            <button onClick={goToStripe} style={{background:'#B4593A', color:'#ffffff', border:'none', padding:'20px 56px', borderRadius:'32px', fontSize:'18px', fontWeight:800, cursor:'pointer', display:'block', margin:'0 auto 14px', boxShadow:'0 8px 32px rgba(157,176,154,0.5), 0 2px 8px rgba(0,0,0,0.2)'}}>
              Commencer
            </button>
            <p style={{color:'rgba(255,255,255,0.78)', fontSize:'13px', margin:0}}>Paiement unique · Satisfait ou remboursé sous 14 jours</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#1A3D5C', borderTop:'none', padding:'40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' as const, gap:'20px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <Logo fond="marine" hauteur={26} />
            <span style={{color:'rgba(255,255,255,0.78)', fontSize:'13px', marginLeft:'12px', fontStyle:'italic' as const}}>À tes côtés, dès le début</span>
          </div>
          <div style={{display:'flex', gap:'20px', flexWrap:'wrap' as const}}>
            {[['Pourquoi DadUp','/pourquoi'],['Ce qui est inclus','/inclus'],['Tarifs','/tarifs'],['Professionnels','/professionnels'],['Sources','/sources'],['Contact','/contact']].map(([label,href]) => (
              <a key={href} href={href} style={{color:'rgba(255,255,255,0.78)', fontSize:'13px', textDecoration:'none'}}>{label}</a>
            ))}
          </div>
          <div style={{display:'flex', gap:'16px'}}>
            {[['CGV','/cgv'],['Confidentialité','/confidentialite'],['Mentions légales','/mentions-legales']].map(([label,href]) => (
              <a key={href} href={href} style={{color:'rgba(255,255,255,0.78)', fontSize:'12px', textDecoration:'none'}}>{label}</a>
            ))}
          </div>
        </div>
      </footer>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
