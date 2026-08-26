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
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", overflowX:'hidden'}}>

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
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
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
      <nav style={{background:C.white, borderBottom:`1px solid ${C.border}`, position:'sticky', top:0, zIndex:50, padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px'}}>
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
            <a href="/contact" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Contact</a>
          </div>
        </div>
        <div className="nav-cta-group">
          <a href="/login" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
          <button onClick={goToStripe} style={{background:C.dark, color:C.white, border:'none', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, cursor:'pointer'}}>Commencer</button>
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
        <div className="mobile-menu" style={{background:C.white, borderBottom:`1px solid ${C.border}`, padding:'16px 20px', gap:'4px', position:'sticky', top:'68px', zIndex:49}}>
          <a href="/pourquoi" style={{color:C.text, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Pourquoi DadUp</a>
          <a href="/inclus" style={{color:C.text, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Ce qui est inclus</a>
          <a href="/tarifs" style={{color:C.text, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Tarifs</a>
          <a href="/contact" style={{color:C.text, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.cream}`}}>Contact</a>
          <a href="/login" style={{color:C.dark, fontSize:'15px', fontWeight:700, padding:'10px 8px', textDecoration:'none'}}>Se connecter</a>
        </div>
      )}

      {/* HERO */}
      <section style={{background:C.cream, padding:'24px 24px 0'}}>
        <div className="hero-2col" style={{background:C.blueDark, borderRadius:'24px', position:'relative', overflow:'hidden', border:'1px solid rgba(255,255,255,0.06)'}}>

          {/* Cercles décoratifs */}
          <div style={{position:'absolute', top:'-60px', right:'200px', width:'280px', height:'280px', borderRadius:'50%', background:'#E6F0FA', opacity:0.07, pointerEvents:'none'}}></div>
          <div style={{position:'absolute', bottom:'-80px', left:'-40px', width:'260px', height:'260px', borderRadius:'50%', background:'#E4F5EC', opacity:0.08, pointerEvents:'none'}}></div>
          <div style={{position:'absolute', top:'40px', left:'40%', width:'160px', height:'160px', borderRadius:'50%', background:'#EDE8FF', opacity:0.06, pointerEvents:'none'}}></div>

          {/* TEXTE GAUCHE */}
          <div style={{position:'relative', zIndex:1, padding:'8px 0'}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(230,240,250,0.15)', border:'1px solid rgba(200,160,96,0.4)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px'}}>
              <div style={{width:'6px', height:'6px', borderRadius:'50%', background:C.gold}}></div>
              <span style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'1px'}}>Conçu pour les futurs pères</span>
            </div>

            <h1 style={{color:C.white, fontSize:'clamp(28px,4vw,40px)', fontWeight:800, lineHeight:1.15, margin:'0 0 16px'}}>
              Être père, ça commence<br/><span style={{color:C.gold}}>bien avant la naissance.</span>
            </h1>

            <p style={{color:'rgba(255,255,255,0.75)', fontSize:'15px', lineHeight:1.75, margin:'0 0 6px'}}>
              Elle porte bébé. Toi, tu portes le reste.
            </p>
            <p style={{color:'rgba(255,255,255,0.45)', fontSize:'13px', lineHeight:1.7, margin:'0 0 32px'}}>
              DadUp t&apos;accompagne semaine après semaine, de la grossesse au premier anniversaire de bébé.
            </p>

            <div style={{display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' as const}}>
              <button onClick={goToStripe} style={{background:C.gold, color:'#1c1510', border:'none', padding:'14px 28px', borderRadius:'32px', fontSize:'15px', fontWeight:800, cursor:'pointer'}}>
                Commencer · 49,99€
              </button>
              <span style={{color:'rgba(255,255,255,0.35)', fontSize:'12px'}}>Satisfait ou remboursé sous 14 jours</span>
            </div>

            <div style={{display:'flex', gap:'8px', marginTop:'28px', flexWrap:'wrap' as const}}>
              {[
                {bg:'#E6F0FA', color:'#1A3D5C', label:'41 semaines de contenu'},
                {bg:'#E4F5EC', color:'#0D4A2E', label:'Post-partum inclus'},
                {bg:'#EDE8FF', color:'#3D2E7A', label:"Jusqu'au 1er anniversaire de bébé"},
              ].map((b,i) => (
                <div key={i} style={{background:b.bg, borderRadius:'10px', padding:'10px 14px'}}>
                  <p style={{color:b.color, fontSize:'11px', fontWeight:800, margin:0}}>{b.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PHOTO DROITE flottante */}
          <div className="float" style={{position:'relative', zIndex:1}}>
            <div style={{borderRadius:'20px', overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
              <img src="/main.jpg" alt="Papa et bébé" style={{width:'100%', height:'380px', objectFit:'cover', objectPosition:'center', display:'block'}}/>
            </div>
            <div style={{position:'absolute', bottom:'-16px', left:'-20px', background:C.white, borderRadius:'12px', padding:'10px 14px', boxShadow:'0 4px 20px rgba(0,0,0,0.15)', display:'flex', alignItems:'center', gap:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#E4F5EC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>✓</div>
              <div>
                <p style={{color:C.dark, fontSize:'11px', fontWeight:800, margin:0}}>Contenu médical sourcé</p>
                <p style={{color:C.textLight, fontSize:'10px', margin:0}}>HAS · OMS · Inserm</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION CHIFFRES CLÉS — jaune pastel */}
      <section className="section-pad" style={{padding:'80px 40px', background:C.cream}}>
        <div style={{maxWidth:'1000px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'48px'}}>
            <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Ce que DadUp couvre</p>
            <h2 style={{color:C.dark, fontSize:'36px', fontWeight:800, margin:0, lineHeight:1.2}}>Tout ce dont tu as besoin,<br/>au bon moment.</h2>
          </div>
          <div className="stats-4col">
            {[
              {label:'41 semaines', title:'De SA 3 à SA 41', desc:"Chaque semaine expliquée côté papa : développement de bébé, ton rôle, ce qu'elle vit."},
              {label:"Jusqu'au 1er anniversaire", title:'Post-partum inclus', desc:'Les premiers mois, le développement de bébé, le baby blues, le couple. Tout est inclus.'},
              {label:'Calendrier médical', title:'Chaque consultation préparée', desc:"Ce qu'on cherche à chaque rendez-vous, les bonnes questions à poser, comment être vraiment présent."},
              {label:'Paiement unique', title:'Sans abonnement', desc:"Tu paies une fois, tu accèdes jusqu'au premier anniversaire de bébé. Pas de surprise."},
            ].map((s,i) => (
              <div key={i} style={{background:'#FFF7E0', borderRadius:'20px', padding:'24px 28px', border:'1px solid rgba(200,160,96,0.15)'}}>
                <p style={{color:'#8A6010', fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 10px'}}>{s.label}</p>
                <p style={{color:'#3A2800', fontSize:'15px', fontWeight:700, margin:'0 0 8px'}}>{s.title}</p>
                <p style={{color:'#6a5020', fontSize:'13px', margin:0, lineHeight:1.65}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CE QUE PERSONNE NE T'EXPLIQUE */}
      <section className="section-pad" style={{padding:'80px 40px', background:C.white}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'48px'}}>
            <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Les sujets traités</p>
            <h2 style={{color:C.dark, fontSize:'36px', fontWeight:800, margin:'0 0 16px', lineHeight:1.2}}>Tout ce que personne<br/>ne t&apos;explique.</h2>
            <p style={{color:C.textLight, fontSize:'15px', margin:'0 auto', maxWidth:'480px', lineHeight:1.7}}>Traités sans détour, au bon moment de la grossesse.</p>
          </div>
          <div className="newbie-grid">
            {[
              {titre:"Les échographies", desc:"À quoi servent T1, T2, T3 ? Ce qu'on cherche, ce que tu dois demander, comment être vraiment présent.", bg:C.bluePale, color:C.blueDark},
              {titre:"La valise maternité", desc:"Checklist interactive. Ce qu'elle emporte, ce que tu prends pour toi, ce que tout le monde oublie.", bg:'#E4F5EC', color:'#0A2E1A'},
              {titre:"L'accouchement", desc:"La règle 5-1-1. Quand partir. Ce que tu fais en salle de naissance. Péri ou pas. Tout ce qu'on ne te dit pas.", bg:'#FFF7E0', color:'#3A2800'},
              {titre:"Le baby blues", desc:"50 à 80% des femmes le vivent. Pas une dépression. Ce que c'est, comment tu peux vraiment aider.", bg:'#F0EEFF', color:'#3030A0'},
              {titre:"Le congé paternité", desc:"28 jours. Comment les poser, quand les prendre, ce que ça change vraiment pour votre famille.", bg:'#E4F5EC', color:'#0A2E1A'},
            ].map((item, i) => (
              <div key={i} style={{background:item.bg, borderRadius:'20px', padding:'24px', border:`1px solid ${C.border}`}}>
                <p style={{color:item.color, fontSize:'16px', fontWeight:800, margin:'0 0 10px'}}>{item.titre}</p>
                <p style={{color:item.color, fontSize:'13px', lineHeight:1.65, margin:0, opacity:0.8}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAVOIR AVANT */}
      <section className="section-pad quote-grid" style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{borderLeft:`3px solid ${C.gold}`, paddingLeft:'32px'}}>
          <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Ce que tu peux changer</p>
          <p style={{fontSize:'34px', fontWeight:800, color:C.dark, margin:'0 0 16px', lineHeight:1.2}}>
            Savoir ce qui se passe avant qu&apos;on te l&apos;explique.
          </p>
          <p style={{color:C.text, fontSize:'16px', margin:'0 0 32px', lineHeight:1.7}}>
            Un père qui comprend ce qui se passe prend de meilleures décisions. Il est plus calme le jour J. Il sait quoi faire, et quand le faire.
          </p>
          <a href="/pourquoi" style={{color:C.dark, fontSize:'14px', fontWeight:700, textDecoration:'none'}}>Pourquoi ça change tout →</a>
        </div>
        <div className="modules-grid">
          {[
            {titre:'Calendrier RDV',    desc:'Chaque consultation préparée',  bg:'#E6F0FA', color:'#1A3D5C'},
            {titre:'Suivi bébé',        desc:'Chaque semaine expliquée',       bg:'#E4F5EC', color:'#0A2E1A'},
            {titre:'Guide accouchement',desc:'Ton rôle précis le jour J',     bg:'#FFF7E0', color:'#3A2800'},
            {titre:'Post-partum',       desc:'Baby blues, nuits, couple',     bg:'#F0EEFF', color:'#3030A0'},
          ].map((m, i) => (
            <a key={i} href="/inclus" style={{background:m.bg, borderRadius:'16px', padding:'20px', border:`1px solid ${C.border}`, textDecoration:'none', display:'block'}}>
              <p style={{color:m.color, fontSize:'14px', fontWeight:800, margin:'0 0 4px'}}>{m.titre}</p>
              <p style={{color:m.color, fontSize:'12px', margin:0, opacity:0.7}}>{m.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section" style={{background:C.blueDark, padding:'80px 40px', textAlign:'center' as const}}>
        <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Accès immédiat</p>
        <h2 style={{color:C.white, fontSize:'44px', fontWeight:800, margin:'0 0 16px', lineHeight:1.1}}>
          Être père, ça commence<br/>bien avant la naissance.
        </h2>
        <p style={{color:'rgba(255,255,255,0.5)', fontSize:'15px', margin:'0 0 32px', lineHeight:1.7}}>
          Elle porte bébé. Toi, tu portes le reste.
        </p>
        <button onClick={goToStripe} style={{background:C.gold, color:'#1c1510', border:'none', padding:'18px 48px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer', width:'100%', maxWidth:'400px', display:'block', margin:'0 auto 12px'}}>
          Commencer · 49,99€
        </button>
        <p style={{color:'rgba(255,255,255,0.3)', fontSize:'13px', margin:0}}>Paiement unique · Satisfait ou remboursé sous 14 jours</p>
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
            <a href="/professionnels" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Professionnels</a>
            <a href="/sources" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Sources</a>
            <a href="/contact" style={{color:'#6a7585', fontSize:'13px', textDecoration:'none'}}>Contact</a>
          </div>
          <div style={{display:'flex', gap:'16px', flexWrap:'wrap' as const}}>
            <a href="/cgv" style={{color:'#6a7585', fontSize:'12px', textDecoration:'none'}}>CGV</a>
            <a href="/confidentialite" style={{color:'#6a7585', fontSize:'12px', textDecoration:'none'}}>Confidentialité</a>
            <a href="/mentions-legales" style={{color:'#6a7585', fontSize:'12px', textDecoration:'none'}}>Mentions légales</a>
          </div>
          <p style={{color:'#6a7585', fontSize:'12px', margin:0}}>DadUp ne remplace pas l&apos;avis d&apos;un médecin.</p>
        </div>
      </footer>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
