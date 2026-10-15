'use client';
import { useState } from 'react';
import CheckoutModal from '@/app/components/CheckoutModal';
import { Logo } from '../components/Logo';

const C = {
  dark: '#15263A', gold: '#B4593A', cream: '#F6F1E9', white: '#ffffff',
  border: '#E6E0D5', text: '#3D4A55', textLight: '#56616B',
  blue: '#2E5F8A', bluePale: '#ffffff', blueDark: '#1A3D5C',
};

export default function PourquoiPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <main style={{minHeight:'100vh', background:C.cream, fontFamily:'inherit'}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .aa{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
        .sources-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
        .hamburger{display:none;}.mobile-nav{display:none;}
        .card-hover{transition:transform .2s ease,box-shadow .2s ease;}
        .card-hover:hover{transform:translateY(-4px);}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          .hamburger{display:flex!important;}.mobile-nav{display:flex!important;}
          .aa{grid-template-columns:1fr!important;}
          .sources-grid{grid-template-columns:1fr 1fr!important;}
          nav{padding:0 16px!important;}
          h1{font-size:36px!important;}
          h2{font-size:26px!important;}
          section{padding:48px 16px!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{background:C.cream, borderBottom:'none', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px', position:'sticky', top:0, zIndex:50}}>
        <div style={{display:'flex', alignItems:'center', gap:'48px'}}>
          <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
            <Logo fond="creme" hauteur={24} />
          </a>
          <div className="nl" style={{gap:'4px'}}>
            <a href="/pourquoi" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none', borderBottom:`2px solid #B4593A`}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', textDecoration:'none'}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', textDecoration:'none'}}>Tarifs</a>
            <a href="/contact" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', textDecoration:'none'}}>Contact</a>
          </div>
        </div>
        <div className="nc" style={{alignItems:'center', gap:'16px'}}>
          <a href="/login" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
          <button onClick={() => setShowModal(true)} style={{background:'#1e2535', color:'#ffffff', border:'none', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, cursor:'pointer'}}>Commencer</button>
        </div>
        <button className="hamburger" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} style={{display:'none', minWidth:'44px', minHeight:'44px', background:'none', border:`1px solid ${C.border}`, padding:'8px 12px', borderRadius:'8px', cursor:'pointer'}}>
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
        <div style={{position:'absolute', top:'-60px', right:'100px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(157,176,154,0.22) 0%,transparent 65%)', pointerEvents:'none'}}></div>
        <div style={{position:'absolute', bottom:'-60px', left:'-40px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(100,200,160,0.1) 0%,transparent 70%)', pointerEvents:'none'}}></div>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center' as const, position:'relative', zIndex:1}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(157,176,154,0.18)', border:'1px solid rgba(157,176,154,0.5)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px'}}>
            <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#9DB09A', boxShadow:'0 0 8px rgba(157,176,154,0.9)'}}></div>
            <span style={{color:'#C9D8C4', fontSize:'12px', fontWeight:700, letterSpacing:'1px'}}>Pourquoi DadUp</span>
          </div>
          <h1 style={{color:C.white, fontSize:'44px', fontWeight:800, margin:'0 0 20px', lineHeight:1.1}}>
            Être père,<br/><span style={{color:'#C9D8C4'}}>ça se prépare</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.75)', fontSize:'18px', lineHeight:1.7, margin:'0 0 0px'}}>DadUp est le premier guide conçu exclusivement pour le papa.</p>
        </div>
      </section>



      {/* AVANT / APRÈS */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{textAlign:'center' as const, marginBottom:'48px'}}>
          <h2 style={{fontSize:'36px', fontWeight:800, color:C.dark, margin:'0 0 12px'}}>Deux façons de vivre la grossesse</h2>
          <p style={{color:C.blue, fontSize:'12px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:0}}>Ce que DadUp change</p>
        </div>
        <div style={{display:'flex', flexDirection:'column' as const, gap:'10px'}}>
          {[
            {sans:"Tu subis la grossesse sans vraiment comprendre ce qui se passe", avec:"Chaque semaine, tu sais ce que bébé développe et ce qu'elle vit"},
            {sans:"Tu ne sais pas quand partir à la maternité", avec:"Tu sais exactement quand et comment réagir"},
            {sans:"Le post-partum te prend par surprise", avec:"Tu comprends ce qu'elle vit et tu l'accompagnes"},
            {sans:"Tu achètes au hasard et tu dépenses trop", avec:"Tu achètes ce qui est vraiment utile"},
            {sans:"Tu te sens spectateur plutôt qu'acteur", avec:"Tu es présent, confiant et pleinement impliqué"},
          ].map((item,i) => (
            <div key={i} style={{background:'#fff', borderRadius:'16px', padding:'20px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', alignItems:'center', boxShadow:'0 6px 24px rgba(0,0,0,0.07)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'rgba(255,232,232,0.6)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <span style={{color:'#9C4A2E', fontSize:'13px', fontWeight:800}}>✗</span>
                </div>
                <p style={{color:'#9C4A2E', fontSize:'15px', fontWeight:600, margin:0}}>{item.sans}</p>
              </div>

              <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#B8F0D8', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 0 8px rgba(13,107,64,0.2)'}}>
                  <span style={{color:'#0A2E1A', fontSize:'13px', fontWeight:800}}>✓</span>
                </div>
                <p style={{color:'#1e2535', fontSize:'15px', fontWeight:800, margin:0}}>{item.avec}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOURCES */}
      <section style={{background:C.cream, padding:'72px 40px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <div style={{textAlign:'center' as const, marginBottom:'40px'}}>
            <p style={{color:C.blue, fontSize:'12px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Nos références</p>
            <h2 style={{color:C.dark, fontSize:'32px', fontWeight:800, margin:'0 0 12px'}}>Un contenu sourcé et vérifié</h2>
            <p style={{color:C.textLight, fontSize:'15px', margin:0, lineHeight:1.7}}>Chaque information s&apos;appuie sur des recommandations médicales publiées par des institutions reconnues.</p>
          </div>
          <div className="sources-grid">
            {[
              {sigle:'HAS', nom:'Haute Autorité de Santé', color:'#1A3D5C'},
              {sigle:'OMS', nom:'Organisation Mondiale de la Santé', color:'#1A3D5C'},
              {sigle:'ESPGHAN', nom:'Société Européenne de Gastroentérologie Pédiatrique', color:'#1A3D5C'},
              {sigle:'Inserm', nom:'Institut national de la santé et de la recherche médicale', color:'#1A3D5C'},
            ].map((s,i) => (
              <div key={i} className="card-hover" style={{background:'#ffffff', border:'1px solid rgba(21,38,58,0.2)', borderRadius:'16px', padding:'24px', textAlign:'center' as const, boxShadow:'0 6px 24px rgba(21,38,58,0.1)'}}>
                <div style={{background:s.color, color:'#fff', borderRadius:'10px', padding:'8px 14px', fontSize:'16px', fontWeight:800, display:'inline-block', marginBottom:'12px', boxShadow:`0 4px 12px ${s.color}40`}}>
                  {s.sigle}
                </div>
                <p style={{color:'#15263A', fontSize:'12px', lineHeight:1.5, fontWeight:600}}>{s.nom}</p>
              </div>
            ))}
          </div>
          <p style={{textAlign:'center' as const, marginTop:'24px'}}>
            <a href="/sources" style={{color:C.blue, fontSize:'13px', fontWeight:700, textDecoration:'none'}}>En savoir plus sur notre approche →</a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'40px', background:C.cream}}>
        <div style={{background:'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', borderRadius:'24px', padding:'72px 48px', position:'relative', overflow:'hidden', textAlign:'center' as const}}>
          <div style={{position:'absolute', top:'-60px', right:'100px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(157,176,154,0.22) 0%,transparent 65%)', pointerEvents:'none'}}></div>
          <div style={{position:'absolute', bottom:'-60px', left:'-40px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(100,200,160,0.1) 0%,transparent 70%)', pointerEvents:'none'}}></div>
          <div style={{position:'relative', zIndex:1}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(157,176,154,0.18)', border:'1px solid rgba(157,176,154,0.5)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px'}}>
              <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#9DB09A', boxShadow:'0 0 8px rgba(157,176,154,0.9)'}}></div>
              <span style={{color:'#C9D8C4', fontSize:'12px', fontWeight:700, letterSpacing:'1px'}}>Accès immédiat</span>
            </div>
            <h2 style={{color:C.white, fontSize:'48px', fontWeight:800, margin:'0 0 8px', lineHeight:1.1}}>
              Ton bébé arrive<br/><span style={{color:'#C9D8C4'}}>Commence maintenant</span>
            </h2>
            <p style={{color:'rgba(255,255,255,0.78)', fontSize:'16px', margin:'0 0 12px'}}>À deux, dès le premier jour</p>
            <p style={{color:'#C9D8C4', fontSize:'48px', fontWeight:900, margin:'0 0 32px'}}>49,99€</p>
            <button onClick={() => setShowModal(true)} style={{background:'#B4593A', color:'#ffffff', border:'none', padding:'18px 48px', borderRadius:'32px', fontSize:'17px', fontWeight:800, cursor:'pointer', boxShadow:'0 8px 32px rgba(157,176,154,0.5)'}}>
              Accéder maintenant
            </button>
            <p style={{color:'rgba(255,255,255,0.78)', fontSize:'13px', margin:'12px 0 0'}}>Paiement unique · Satisfait ou remboursé sous 14 jours</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#1A3D5C', padding:'40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' as const, gap:'20px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <Logo fond="marine" hauteur={22} />
            <span style={{color:'rgba(255,255,255,0.78)', fontSize:'13px', marginLeft:'12px', fontStyle:'italic' as const}}>À deux, dès le premier jour</span>
          </div>
          <div style={{display:'flex', gap:'20px', flexWrap:'wrap' as const}}>
            {[['Pourquoi DadUp','/pourquoi'],['Ce qui est inclus','/inclus'],['Tarifs','/tarifs'],['Professionnels','/professionnels'],['Sources','/sources'],['Contact','/contact']].map(([l,h]) => (
              <a key={h} href={h} style={{color:'rgba(255,255,255,0.78)', fontSize:'13px', textDecoration:'none'}}>{l}</a>
            ))}
          </div>
          <div style={{display:'flex', gap:'16px'}}>
            {[['CGV','/cgv'],['Confidentialité','/confidentialite'],['Mentions légales','/mentions-legales']].map(([l,h]) => (
              <a key={h} href={h} style={{color:'rgba(255,255,255,0.78)', fontSize:'12px', textDecoration:'none'}}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
