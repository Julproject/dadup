'use client';
import { useState } from 'react';
import CheckoutModal from '@/app/components/CheckoutModal';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
};

export default function PourquoiPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <main style={{minHeight:'100vh', background:C.cream, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
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
            <svg viewBox="0 0 300 300" width="34" height="34"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{fontWeight:800, color:C.dark, fontSize:'20px'}}>DadUp</span>
          </a>
          <div className="nl" style={{gap:'4px'}}>
            <a href="/pourquoi" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none', borderBottom:`2px solid ${C.gold}`}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', textDecoration:'none'}}>Ce qui est inclus</a>
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
            <span style={{color:'#e0b870', fontSize:'11px', fontWeight:700, letterSpacing:'1px'}}>Pourquoi DadUp</span>
          </div>
          <h1 style={{color:C.white, fontSize:'44px', fontWeight:800, margin:'0 0 20px', lineHeight:1.1}}>
            Être père,<br/><span style={{color:'#e0b870'}}>ça se prépare</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.75)', fontSize:'18px', lineHeight:1.7, margin:'0 0 0px'}}>DadUp est le premier guide conçu exclusivement pour le papa.</p>
        </div>
      </section>

      {/* BADGES */}
      <section style={{background:C.cream, padding:'32px 40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' as const}}>
          {[
            {bg:'#C8E8FF', color:'#0A2847', label:'Tout centralisé, semaine par semaine'},
            {bg:'#B8F0D8', color:'#0A2E1A', label:"Paiement unique, jusqu'au 1er anniversaire"},
            {bg:'#DDD0FF', color:'#1A0A4A', label:'De la grossesse au premier anniversaire'},
          ].map((b,i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:'8px', background:b.bg, borderRadius:'24px', padding:'10px 18px', boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}}>
              <span style={{color:b.color, fontSize:'16px', fontWeight:800}}>✓</span>
              <span style={{color:b.color, fontSize:'13px', fontWeight:700}}>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AVANT / APRÈS */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{textAlign:'center' as const, marginBottom:'48px'}}>
          <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 12px'}}>Ce que DadUp change</p>
          <h2 style={{fontSize:'36px', fontWeight:800, color:C.dark, margin:0}}>Avant / Après DadUp</h2>
        </div>
        <div className="aa">
          {/* Sans DadUp */}
          <div className="card-hover" style={{background:'#FFE8E8', borderRadius:'20px', padding:'32px', boxShadow:'0 8px 32px rgba(180,60,60,0.12)'}}>
            <p style={{color:'#C04A1A', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 20px'}}>Sans DadUp</p>
            {[
              "Tu découvres l'accouchement sur le moment",
              "Tu ne sais pas quand partir à la maternité",
              "Le post-partum te prend par surprise",
              "Tu achètes au hasard et tu dépenses trop",
              "Tu te sens spectateur plutôt qu'acteur",
            ].map((t,i) => (
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'12px'}}>
                <div style={{width:'22px', height:'22px', borderRadius:'50%', background:'rgba(192,74,26,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <span style={{color:'#C04A1A', fontSize:'13px', fontWeight:800}}>✗</span>
                </div>
                <p style={{color:'#7A3010', fontSize:'14px', margin:0, lineHeight:1.6}}>{t}</p>
              </div>
            ))}
          </div>
          {/* Avec DadUp */}
          <div className="card-hover" style={{background:'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', borderRadius:'20px', padding:'32px', boxShadow:'0 8px 32px rgba(26,61,92,0.3)', position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', top:'-30px', right:'-20px', width:'160px', height:'160px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,160,96,0.2) 0%,transparent 65%)', pointerEvents:'none'}}></div>
            <p style={{color:C.gold, fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 20px', position:'relative', zIndex:1}}>Avec DadUp</p>
            {[
              "Tu connais chaque étape avant qu'elle arrive",
              "Tu sais exactement quand et comment réagir",
              "Tu comprends ce qu'elle vit et tu l'accompagnes",
              "Tu achètes ce qui est vraiment utile",
              "Tu es présent, confiant et pleinement impliqué",
            ].map((t,i) => (
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'12px', position:'relative', zIndex:1}}>
                <div style={{width:'22px', height:'22px', borderRadius:'50%', background:'rgba(200,160,96,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 0 8px rgba(200,160,96,0.4)'}}>
                  <span style={{color:'#e0b870', fontSize:'13px', fontWeight:800}}>✓</span>
                </div>
                <p style={{color:C.white, fontSize:'14px', margin:0, lineHeight:1.6}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <section style={{background:C.cream, padding:'72px 40px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <div style={{textAlign:'center' as const, marginBottom:'40px'}}>
            <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 16px'}}>Nos références</p>
            <h2 style={{color:C.dark, fontSize:'32px', fontWeight:800, margin:'0 0 12px'}}>Un contenu sourcé et vérifié</h2>
            <p style={{color:C.textLight, fontSize:'15px', margin:0, lineHeight:1.7}}>Chaque information s&apos;appuie sur des recommandations médicales publiées par des institutions reconnues.</p>
          </div>
          <div className="sources-grid">
            {[
              {sigle:'HAS', nom:'Haute Autorité de Santé', bg:'#C8E8FF', color:'#003189'},
              {sigle:'OMS', nom:'Organisation Mondiale de la Santé', bg:'#B8F0D8', color:'#007BAD'},
              {sigle:'ESPGHAN', nom:'Société Européenne de Gastroentérologie Pédiatrique', bg:'#DDD0FF', color:'#00693E'},
              {sigle:'Inserm', nom:'Institut national de la santé et de la recherche médicale', bg:'#FFE8E8', color:'#A0002E'},
            ].map((s,i) => (
              <div key={i} className="card-hover" style={{background:s.bg, borderRadius:'16px', padding:'24px', textAlign:'center' as const, boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
                <div style={{background:s.color, color:'#fff', borderRadius:'10px', padding:'8px 14px', fontSize:'16px', fontWeight:800, display:'inline-block', marginBottom:'12px', boxShadow:`0 4px 12px ${s.color}40`}}>
                  {s.sigle}
                </div>
                <p style={{color:s.color, fontSize:'12px', lineHeight:1.5, fontWeight:600}}>{s.nom}</p>
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
          <div style={{position:'absolute', top:'-60px', right:'100px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,160,96,0.22) 0%,transparent 65%)', pointerEvents:'none'}}></div>
          <div style={{position:'absolute', bottom:'-60px', left:'-40px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(100,200,160,0.1) 0%,transparent 70%)', pointerEvents:'none'}}></div>
          <div style={{position:'relative', zIndex:1}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(200,160,96,0.18)', border:'1px solid rgba(200,160,96,0.5)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px'}}>
              <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#c8a060', boxShadow:'0 0 8px rgba(200,160,96,0.9)'}}></div>
              <span style={{color:'#e0b870', fontSize:'11px', fontWeight:700, letterSpacing:'1px'}}>Accès immédiat</span>
            </div>
            <h2 style={{color:C.white, fontSize:'48px', fontWeight:800, margin:'0 0 8px', lineHeight:1.1}}>
              Prends ta place<br/><span style={{color:'#e0b870'}}>de père</span>
            </h2>
            <p style={{color:'rgba(255,255,255,0.6)', fontSize:'16px', margin:'0 0 12px'}}>À deux, dès le premier jour</p>
            <p style={{color:'rgba(255,255,255,0.4)', fontSize:'32px', fontWeight:800, margin:'0 0 32px'}}>49,99€</p>
            <button onClick={() => setShowModal(true)} style={{background:'linear-gradient(135deg,#c8a060,#e8c070)', color:'#1c1510', border:'none', padding:'18px 48px', borderRadius:'32px', fontSize:'17px', fontWeight:800, cursor:'pointer', boxShadow:'0 8px 32px rgba(200,160,96,0.5)'}}>
              Accéder maintenant
            </button>
            <p style={{color:'rgba(255,255,255,0.35)', fontSize:'13px', margin:'12px 0 0'}}>Paiement unique · Satisfait ou remboursé sous 14 jours</p>
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
