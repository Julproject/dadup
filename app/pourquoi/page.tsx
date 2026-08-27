'use client';
import { useState } from 'react';
import CheckoutModal from '@/app/components/CheckoutModal';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  orange: '#FFF0E6', green: '#E4F5EC', amber: '#FFF7E0',
};

export default function PourquoiPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .aa{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
        @media(max-width:768px){
          .nl{display:none!important;}
          .nc{display:none!important;}
          .sp{padding:32px 16px!important;}
          nav{padding:0 16px!important;}
          h1{font-size:36px!important;line-height:1.15!important;}
          h2{font-size:24px!important;}
          .prix{font-size:48px!important;}
          .hero-grid{grid-template-columns:1fr!important;gap:24px!important;padding:40px 16px 0!important;}
          .hero-img-wrap{height:220px!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;padding:20px 16px!important;}
          .stats-item{border-left:none!important;border-top:1px solid #2e3848;padding:14px!important;}
          .stats-item:nth-child(2){border-left:1px solid #2e3848!important;}
          .modules-grid{grid-template-columns:1fr!important;}
          .quote-grid{grid-template-columns:1fr!important;gap:24px!important;}
          .newbie-grid>div{flex:1 1 100%!important;max-width:100%!important;}
          .temoignages-grid{grid-template-columns:1fr!important;}
          .aa{grid-template-columns:1fr!important;}
          .tg{grid-template-columns:1fr!important;}
          .mg{grid-template-columns:1fr!important;gap:24px!important;}
          .footer-inner{flex-direction:column!important;gap:16px!important;text-align:center!important;}
          .footer-links{flex-wrap:wrap!important;justify-content:center!important;gap:12px!important;}
          section{padding:48px 16px!important;}
          .section-pad{padding:48px 16px!important;}
          .cta-section{padding:48px 16px!important;}
          .footer-section{padding:24px 16px!important;}
        }
        
        .hamburger{display:none;}
        .mobile-nav{display:none;}
        @media(max-width:768px){
          .hamburger{display:flex!important;}
          .mobile-nav{display:flex!important;}
        }
      
        .hamburger{display:none;}
        .mobile-nav{display:none;}
        @media(max-width:768px){.hamburger{display:flex!important;}.mobile-nav{display:flex!important;}}
      `}</style>

      <nav style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:'0 40px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'68px',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'48px'}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="34" height="34"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{fontWeight:800,color:C.dark,fontSize:'20px'}}>DadUp</span>
          </a>
          <div className="nl" style={{gap:'4px'}}>
            <a href="/pourquoi" style={{color:C.dark,fontSize:'14px',fontWeight:700,padding:'8px 14px',borderRadius:'8px',textDecoration:'none',borderBottom:`2px solid ${C.gold}`}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Tarifs</a>
            <a href="/contact" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Contactez-nous</a>
          </div>
        </div>
        <div className="nc" style={{alignItems:'center',gap:'16px'}}>
          <a href="/login" style={{color:C.dark,fontSize:'14px',fontWeight:600,textDecoration:'none'}}>Se connecter</a>
          <a href="/tarifs" style={{background:'#1A3D5C',color:C.white,padding:'11px 22px',borderRadius:'32px',fontSize:'13px',fontWeight:700,textDecoration:'none'}}>Commencer</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: `1px solid ${C.border}`, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? <path d="M4 4L16 16M16 4L4 16" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/> : <path d="M3 5h14M3 10h14M3 15h14" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>}
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-nav" style={{ flexDirection: 'column', background: C.white, borderBottom: `1px solid ${C.border}`, padding: '16px 20px', gap: '4px', position: 'sticky', top: '68px', zIndex: 49 }}>
          <a href="/pourquoi" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Pourquoi DadUp</a>
          <a href="/inclus" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Ce qui est inclus</a>
          <a href="/tarifs" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Tarifs</a>
          <a href="/contact" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Contactez-nous</a>
          <a href="/login" style={{ color: C.dark, fontSize: '15px', fontWeight: 700, padding: '10px 8px', textDecoration: 'none' }}>Se connecter</a>
        </div>
      )}

      {/* HERO */}
      <section style={{background:'#1A3D5C',padding:'80px 40px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>

          <h1 style={{color:C.white,fontSize:'44px',fontWeight:800,margin:'0 0 24px',lineHeight:1.1}}>
            Être père,<br/><span style={{color:C.gold}}>ça se prépare.</span>
          </h1>
          <p style={{color:'#6a7585',fontSize:'18px',lineHeight:1.7,margin:'0 0 16px'}}>DadUp est le premier guide conçu exclusivement pour le papa.</p>

        </div>
      </section>

      {/* ACCROCHES */}
      <section style={{background:'#f7f9fc',padding:'24px 40px',borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          {[
            {icon:'📱', texte:'Tout centralisé, semaine par semaine'},
            {icon:'🔓', texte:"Paiement unique, jusqu'au 1er anniversaire de bébé"},
            {icon:'👶', texte:'De la grossesse au premier anniversaire'},
          ].map((item,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',background:C.white,border:`1px solid ${C.border}`,borderRadius:'24px',padding:'10px 18px'}}>
              <span style={{fontSize:'16px'}}>{item.icon}</span>
              <span style={{color:C.dark,fontSize:'13px',fontWeight:700}}>{item.texte}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AVANT / APRES */}
      <section className="sp" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 12px'}}>Ce que DadUp change</p>
          <h2 style={{fontSize:'32px',fontWeight:800,color:C.dark,margin:0}}>Avant / Après DadUp</h2>
        </div>
        <div className="aa">
          <div style={{background:C.orange,borderRadius:'20px',padding:'32px',border:`1px solid rgba(192,74,26,0.15)`}}>
            <p style={{color:'#C04A1A',fontSize:'12px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 20px'}}>Sans DadUp</p>
            {[
              "Tu découvres l'accouchement sur le moment",
              "Tu ne sais pas quand partir à la maternité",
              "Le post-partum te prend par surprise",
              "Tu achètes au hasard et tu dépenses trop",
              "Tu te sens spectateur plutôt qu'acteur",
            ].map((t,i)=>(
              <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                <span style={{color:'#C04A1A',fontSize:'14px',fontWeight:700,flexShrink:0}}>✗</span>
                <p style={{color:'#7A3010',fontSize:'14px',margin:0,lineHeight:1.5}}>{t}</p>
              </div>
            ))}
          </div>
          <div style={{background:'#1A3D5C',borderRadius:'20px',padding:'32px'}}>
            <p style={{color:C.gold,fontSize:'12px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 20px'}}>Avec DadUp</p>
            {[
              "Tu connais chaque étape avant qu'elle arrive",
              "Tu sais exactement quand et comment réagir",
              "Tu comprends ce qu'elle vit et tu l'accompagnes",
              "Tu achètes ce qui est vraiment utile",
              "Tu es présent, confiant et pleinement impliqué",
            ].map((t,i)=>(
              <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                <span style={{color:C.gold,fontSize:'14px',fontWeight:700,flexShrink:0}}>✓</span>
                <p style={{color:C.white,fontSize:'14px',margin:0,lineHeight:1.5}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SOURCES */}
      <section style={{background:C.white, padding:'72px 40px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px', textAlign:'center'}}>Nos références</p>
          <h2 style={{color:C.dark, fontSize:'30px', fontWeight:800, margin:'0 0 12px', textAlign:'center'}}>Un contenu sourcé et vérifié.</h2>
          <p style={{color:C.textLight, fontSize:'15px', margin:'0 0 48px', textAlign:'center', lineHeight:1.7}}>Chaque information s&apos;appuie sur des recommandations médicales publiées par des institutions reconnues.</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px'}}>
            {[
              {sigle:"HAS", nom:"Haute Autorité de Santé", couleur:"#003189"},
              {sigle:"OMS", nom:"Organisation Mondiale de la Santé", couleur:"#009BDE"},
              {sigle:"ESPGHAN", nom:"Société Européenne de Gastroentérologie Pédiatrique", couleur:"#00693E"},
              {sigle:"Inserm", nom:"Institut national de la santé et de la recherche médicale", couleur:"#C8003A"},
            ].map((s,i) => (
              <div key={i} style={{background:C.cream, borderRadius:'16px', padding:'20px', border:`1px solid ${C.border}`, textAlign:'center' as const}}>
                <div style={{background:s.couleur, color:'#fff', borderRadius:'10px', padding:'8px 12px', fontSize:'16px', fontWeight:800, display:'inline-block', marginBottom:'10px'}}>
                  {s.sigle}
                </div>
                <p style={{color:C.text, fontSize:'12px', lineHeight:1.5}}>{s.nom}</p>
              </div>
            ))}
          </div>
          <p style={{textAlign:'center', marginTop:'24px'}}>
            <a href="/sources" style={{color:C.blue, fontSize:'13px', fontWeight:600, textDecoration:'none'}}>En savoir plus sur notre approche →</a>
          </p>
        </div>
      </section>
      {/* CTA */}
      <section style={{background:'#1A3D5C',padding:'80px 40px',textAlign:'center' as const}}>
        <p style={{color:C.gold,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Prêt à commencer ?</p>
        <h2 style={{color:C.white,fontSize:'32px',fontWeight:800,margin:'0 0 12px'}}>49,99€</h2>
        <p style={{color:'#6a7585',fontSize:'16px',margin:'0 0 8px'}}>Paiement unique. Accès jusqu'au 1er anniversaire de bébé.</p>
        <p style={{color:'rgba(200,160,96,0.5)',fontSize:'13px',margin:'0 0 32px'}}></p>
        <a href="/tarifs" style={{background:C.gold,color:'#1c1510',padding:'16px 40px',borderRadius:'32px',fontSize:'15px',fontWeight:800,textDecoration:'none',display:'inline-block'}}>Commencer</a>
      </section>

      <footer style={{background:'#1A3D5C',borderTop:'1px solid #2e3848',padding:'32px 40px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <svg viewBox="0 0 300 300" width="28" height="28"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
              <span style={{color:C.white,fontSize:'16px',fontWeight:700}}>DadUp</span>
            </div>
            <div style={{display:'flex',gap:'20px',flexWrap:'wrap' as const}}>
              <a href="/pourquoi" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Pourquoi DadUp</a>
              <a href="/inclus" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Ce qui est inclus</a>
              <a href="/tarifs" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Tarifs</a>
              <a href="/professionnels" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Professionnels</a>
              <a href="/sources" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Sources</a>
              <a href="/contact" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Contactez-nous</a>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'12px',paddingTop:'12px',borderTop:'1px solid #2e3848'}}>
            <div style={{display:'flex',gap:'20px',flexWrap:'wrap' as const}}>
              <a href="/cgv" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>CGV</a>
              <a href="/confidentialite" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>Confidentialité</a>
              <a href="/mentions-legales" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>Mentions légales</a>
            </div>
            <p style={{color:'#3d4f6a',fontSize:'12px',margin:0}}>Il ne remplace pas l'avis d'un médecin.</p>
          </div>
        </div>
      </footer>
      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
