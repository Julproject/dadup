'use client';
import { useState } from 'react';
import CheckoutModal from '@/app/components/CheckoutModal';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', blueDark: '#1A3D5C',
};

export default function InclusPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const modules = [
    { titre:'Calendrier des rendez-vous', desc:'8 consultations expliquées pas à pas, ce que tu dois demander, ton rôle précis', bg:'rgba(200,232,255,0.35)', border:'rgba(46,95,138,0.2)', titleColor:'#0A2847', descColor:'#2E5F8A' },
    { titre:'Suivi bébé semaine par semaine', desc:'SA 3 à SA 41, développement des organes, taille, poids', bg:'rgba(184,240,216,0.35)', border:'rgba(13,107,64,0.2)', titleColor:'#0A2E1A', descColor:'#0D6B40' },
    { titre:'Guide accouchement', desc:'Contractions, départ maternité, salle de naissance, comment soutenir', bg:'rgba(26,61,92,0.08)', border:'rgba(26,61,92,0.2)', titleColor:'#0a1f32', descColor:'#1A3D5C' },
    { titre:'Valise maternité', desc:'Checklist complète pour toi, elle et bébé', bg:'rgba(255,232,160,0.35)', border:'rgba(200,160,96,0.25)', titleColor:'#3A2000', descColor:'#8A6010' },
    { titre:'Post-partum décrypté', desc:'Baby blues, manque de sommeil, couple, ton rôle dès le retour', bg:'rgba(221,208,255,0.35)', border:'rgba(107,79,187,0.2)', titleColor:'#1A0A4A', descColor:'#6B4FBB' },
    { titre:'Première année de bébé', desc:'12 mois, diversification, premiers mots, développement', bg:'rgba(255,212,232,0.35)', border:'rgba(176,64,112,0.2)', titleColor:'#4A0A2A', descColor:'#B04070' },
  ];

  return (
    <main style={{minHeight:'100vh', background:C.cream, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .grid6{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .hamburger{display:none;}.mobile-nav{display:none;}
        .card-h{transition:transform .2s ease,box-shadow .2s ease;}
        .card-h:hover{transform:translateY(-6px);}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          .hamburger{display:flex!important;}.mobile-nav{display:flex!important;}
          .grid6{grid-template-columns:1fr 1fr!important;}
          nav{padding:0 16px!important;}
          h1{font-size:36px!important;}
          section{padding:48px 16px!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{background:C.cream, borderBottom:'none', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px', position:'sticky', top:0, zIndex:50}}>
        <div style={{display:'flex', alignItems:'center', gap:'48px'}}>
          <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="34" height="34"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{fontWeight:800, color:C.dark, fontSize:'20px'}}>DadUp</span>
          </a>
          <div className="nl" style={{gap:'4px'}}>
            <a href="/pourquoi" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', textDecoration:'none'}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none', borderBottom:`2px solid ${C.gold}`}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', textDecoration:'none'}}>Tarifs</a>
            <a href="/contact" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', textDecoration:'none'}}>Contact</a>
          </div>
        </div>
        <div className="nc" style={{alignItems:'center', gap:'16px'}}>
          <a href="/login" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
          <button onClick={() => setShowModal(true)} style={{background:'linear-gradient(135deg,#c8a060,#e8c070)', color:'#1c1510', border:'none', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 16px rgba(200,160,96,0.4)'}}>Accéder · 49,99€</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{display:'none', background:'none', border:`1px solid ${C.border}`, padding:'8px 12px', borderRadius:'8px', cursor:'pointer'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? <path d="M4 4L16 16M16 4L4 16" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/> : <path d="M3 5h14M3 10h14M3 15h14" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>}
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-nav" style={{flexDirection:'column' as const, background:C.cream, padding:'16px 20px', gap:'4px', position:'sticky', top:'68px', zIndex:49}}>
          {[['Pourquoi DadUp','/pourquoi'],['Ce qui est inclus','/inclus'],['Tarifs','/tarifs'],['Contact','/contact']].map(([l,h]) => (
            <a key={h} href={h} style={{color:C.dark, fontSize:'15px', padding:'10px 8px', textDecoration:'none', borderBottom:`1px solid ${C.border}`}}>{l}</a>
          ))}
          <a href="/login" style={{color:C.dark, fontSize:'15px', fontWeight:700, padding:'10px 8px', textDecoration:'none'}}>Se connecter</a>
        </div>
      )}

      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', padding:'80px 40px', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', top:'-60px', right:'100px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,160,96,0.22) 0%,transparent 65%)', pointerEvents:'none'}}></div>
        <div style={{position:'absolute', bottom:'-60px', left:'-40px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(100,200,160,0.1) 0%,transparent 70%)', pointerEvents:'none'}}></div>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center' as const, position:'relative', zIndex:1}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(200,160,96,0.18)', border:'1px solid rgba(200,160,96,0.5)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px'}}>
            <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#c8a060', boxShadow:'0 0 8px rgba(200,160,96,0.9)'}}></div>
            <span style={{color:'#e0b870', fontSize:'11px', fontWeight:700, letterSpacing:'1px'}}>Ce qui est inclus</span>
          </div>
          <h1 style={{color:C.white, fontSize:'44px', fontWeight:800, margin:'0 0 20px', lineHeight:1.1}}>
            Tout ce dont tu as besoin,<br/><span style={{color:'#e0b870'}}>au bon moment</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.65)', fontSize:'17px', lineHeight:1.7}}>De SA 3 à SA 41, puis jusqu'au premier anniversaire de bébé.</p>
        </div>
      </section>

      {/* 6 MODULES */}
      <section style={{padding:'72px 40px', maxWidth:'1100px', margin:'0 auto'}}>
        <div className="grid6">
          {modules.map((m, i) => (
            <div key={i} className="card-h" style={{background:m.bg, border:`1px solid ${m.border}`, borderRadius:'20px', padding:'28px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
              <p style={{color:m.titleColor, fontSize:'16px', fontWeight:800, margin:'0 0 10px', lineHeight:1.3}}>{m.titre}</p>
              <p style={{color:m.descColor, fontSize:'13px', lineHeight:1.65, margin:0}}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ECHANTILLON */}
      <section style={{padding:'40px', background:C.cream}}>
        <div style={{background:'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', borderRadius:'24px', padding:'64px 48px', position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', top:'-60px', right:'100px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,160,96,0.22) 0%,transparent 65%)', pointerEvents:'none'}}></div>
          <div style={{maxWidth:'960px', margin:'0 auto', display:'flex', alignItems:'center', gap:'56px', position:'relative', zIndex:1}}>

            {/* iPhone mockup */}
            <div style={{flexShrink:0, transform:'rotate(-5deg)', position:'relative'}}>
              <div style={{background:'linear-gradient(145deg,#2a2a2e,#0d0d0f,#1a1a1c)', borderRadius:'42px', padding:'8px', width:'200px', boxShadow:'0 30px 60px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.08)'}}>
                <div style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)', borderRadius:'36px 36px 0 0', padding:'10px 14px 6px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{color:'#fff', fontSize:'8px', fontWeight:700}}>9:41</span>
                  <span style={{color:'#fff', fontSize:'7px'}}>●●● ■</span>
                </div>
                <div style={{background:C.cream, borderRadius:'0 0 34px 34px', overflow:'hidden', padding:'10px', display:'flex', flexDirection:'column' as const, gap:'6px'}}>
                  <div style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)', borderRadius:'10px', padding:'9px 12px'}}>
                    <p style={{color:C.gold, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase' as const, margin:'0 0 1px'}}>Semaine 20</p>
                    <p style={{color:'#fff', fontSize:'10px', fontWeight:700, margin:'0 0 1px'}}>La mi-grossesse</p>
                    <p style={{fontSize:'7px', color:'#6a7585', margin:0}}>16,4 cm · 300 g</p>
                  </div>
                  <div style={{background:'#C8E8FF', borderRadius:'10px', padding:'9px 12px'}}>
                    <p style={{color:'#2E5F8A', fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase' as const, margin:'0 0 3px'}}>Développement</p>
                    <p style={{color:'#1A3D5C', fontSize:'9px', lineHeight:1.6, margin:0}}>L&apos;échographie T2 examine chaque organe</p>
                  </div>
                  <div style={{background:'#B8F0D8', borderRadius:'10px', padding:'9px 12px'}}>
                    <p style={{color:'#0D6B40', fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase' as const, margin:'0 0 3px'}}>Ton rôle</p>
                    <p style={{color:'#0A2E1A', fontSize:'9px', lineHeight:1.6, margin:0}}>Prépare 3 questions pour l&apos;échographe</p>
                  </div>
                  <div style={{background:'#FFE8A0', borderRadius:'10px', padding:'9px 12px'}}>
                    <p style={{color:'#8A6010', fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase' as const, margin:'0 0 3px'}}>Mission</p>
                    <p style={{color:'#3A2000', fontSize:'9px', lineHeight:1.6, margin:0}}>Commence la liste valise maternité</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{flex:1}}>
              <p style={{color:C.gold, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 14px'}}>Un échantillon du contenu</p>
              <h2 style={{color:C.white, fontSize:'32px', fontWeight:800, margin:'0 0 28px', lineHeight:1.25}}>Tout ce dont tu as besoin,<br/>au bon moment</h2>
              <button onClick={() => setShowModal(true)} style={{background:'linear-gradient(135deg,#c8a060,#e8c070)', color:'#1c1510', border:'none', padding:'16px 32px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer', boxShadow:'0 6px 24px rgba(200,160,96,0.5)', display:'block', marginBottom:'10px'}}>
                Accéder · 49,99€
              </button>
              <p style={{color:'rgba(255,255,255,0.35)', fontSize:'12px', margin:0}}>Satisfait ou remboursé sous 14 jours</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#1A3D5C', padding:'40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' as const, gap:'20px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <svg viewBox="0 0 300 300" width="28" height="28"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{color:C.white, fontSize:'16px', fontWeight:700}}>DadUp</span>
            <span style={{color:'rgba(255,255,255,0.45)', fontSize:'13px', marginLeft:'12px', fontStyle:'italic' as const}}>À deux, dès le premier jour</span>
          </div>
          <div style={{display:'flex', gap:'20px', flexWrap:'wrap' as const}}>
            {[['Pourquoi DadUp','/pourquoi'],['Ce qui est inclus','/inclus'],['Tarifs','/tarifs'],['Professionnels','/professionnels'],['Sources','/sources'],['Contact','/contact']].map(([l,h]) => (
              <a key={h} href={h} style={{color:'rgba(255,255,255,0.55)', fontSize:'13px', textDecoration:'none'}}>{l}</a>
            ))}
          </div>
          <div style={{display:'flex', gap:'16px'}}>
            {[['CGV','/cgv'],['Confidentialité','/confidentialite'],['Mentions légales','/mentions-legales']].map(([l,h]) => (
              <a key={h} href={h} style={{color:'rgba(255,255,255,0.35)', fontSize:'12px', textDecoration:'none'}}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
