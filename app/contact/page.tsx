'use client';
import { useState } from 'react';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', blueDark: '#1A3D5C',
};

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [sujet, setSujet] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !sujet || !message) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, email, sujet, message }),
      });
      setSent(true);
    } catch {}
    setLoading(false);
  };

  return (
    <main style={{minHeight:'100vh', background:C.cream, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .hamburger{display:none;}.mobile-nav{display:none;}
        .inp:focus{border-color:#2E5F8A!important;outline:none;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          .hamburger{display:flex!important;}.mobile-nav{display:flex!important;}
          nav{padding:0 16px!important;}
          h1{font-size:36px!important;}
          section{padding:48px 16px!important;}
          .contact-grid{grid-template-columns:1fr!important;}
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
            {[['Pourquoi DadUp','/pourquoi'],['Ce qui est inclus','/inclus'],['Tarifs','/tarifs'],['Contact','/contact']].map(([l,h]) => (
              <a key={h} href={h} style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none', ...(h==='/contact'?{borderBottom:`2px solid ${C.gold}`}:{})}}>{l}</a>
            ))}
          </div>
        </div>
        <div className="nc" style={{alignItems:'center', gap:'16px'}}>
          <a href="/login" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
          <a href="/tarifs" style={{background:'#1e2535', color:'#fff', border:'none', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, cursor:'pointer', textDecoration:'none'}}>Commencer</a>
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
            <span style={{color:'#e0b870', fontSize:'11px', fontWeight:700, letterSpacing:'1px'}}>Support</span>
          </div>
          <h1 style={{color:C.white, fontSize:'44px', fontWeight:800, margin:'0 0 16px', lineHeight:1.1}}>
            On est là<br/><span style={{color:'#e0b870'}}>pour toi</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.6)', fontSize:'17px', lineHeight:1.7}}>Une question, un problème, une suggestion ? On répond rapidement.</p>
        </div>
      </section>

      {/* CONTENU */}
      <section style={{padding:'72px 40px', maxWidth:'1100px', margin:'0 auto'}}>
        <div className="contact-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'start'}}>

          {/* FORMULAIRE */}
          <div>
            {sent ? (
              <div style={{background:'rgba(184,240,216,0.3)', borderRadius:'24px', padding:'48px', textAlign:'center' as const, border:'1px solid rgba(13,107,64,0.15)'}}>
                <div style={{width:'64px', height:'64px', borderRadius:'50%', background:'linear-gradient(135deg,#0a1f32,#1A3D5C)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:'0 8px 24px rgba(26,61,92,0.3)'}}>
                  <span style={{color:'#e0b870', fontSize:'28px', fontWeight:800}}>✓</span>
                </div>
                <h2 style={{color:'#0A2E1A', fontSize:'22px', fontWeight:800, margin:'0 0 10px'}}>Message envoyé</h2>
                <p style={{color:'#0D6B40', fontSize:'15px', lineHeight:1.7, margin:'0 0 24px'}}>On te répond dans les 24h. Merci pour ton retour.</p>
                <button onClick={() => setSent(false)} style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)', color:'#fff', border:'none', padding:'12px 28px', borderRadius:'32px', fontSize:'14px', fontWeight:700, cursor:'pointer'}}>Envoyer un autre message</button>
              </div>
            ) : (
              <div style={{background:'#fff', borderRadius:'24px', padding:'40px', boxShadow:'0 8px 32px rgba(0,0,0,0.07)'}}>
                <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:'0 0 28px'}}>Envoie-nous un message</h2>
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column' as const, gap:'16px'}}>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                    <div>
                      <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 6px'}}>Prénom</p>
                      <input className="inp" value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Ton prénom" style={{width:'100%', background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:'12px', padding:'11px 14px', fontSize:'14px', color:C.dark, transition:'border-color .2s'}}/>
                    </div>
                    <div>
                      <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 6px'}}>Email <span style={{color:'#e05050'}}>*</span></p>
                      <input className="inp" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ton@email.fr" required style={{width:'100%', background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:'12px', padding:'11px 14px', fontSize:'14px', color:C.dark, transition:'border-color .2s'}}/>
                    </div>
                  </div>
                  <div>
                    <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 6px'}}>Sujet <span style={{color:'#e05050'}}>*</span></p>
                    <select className="inp" value={sujet} onChange={e => setSujet(e.target.value)} required style={{width:'100%', background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:'12px', padding:'11px 14px', fontSize:'14px', color:sujet?C.dark:C.textLight, cursor:'pointer', appearance:'none' as any}}>
                      <option value="" disabled>Choisis un sujet</option>
                      {["Question sur le contenu","Problème technique","Remboursement","Partenariat","Autre"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 6px'}}>Message <span style={{color:'#e05050'}}>*</span></p>
                    <textarea className="inp" value={message} onChange={e => setMessage(e.target.value)} required rows={5} placeholder="Décris ta question ou ton problème..." style={{width:'100%', background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:'12px', padding:'12px 14px', fontSize:'14px', color:C.dark, resize:'vertical' as any, fontFamily:'inherit', transition:'border-color .2s'}}/>
                  </div>
                  <button type="submit" disabled={loading || !email || !sujet || !message} style={{background:'linear-gradient(135deg,#c8a060,#e8c070)', color:'#1c1510', border:'none', padding:'16px 32px', borderRadius:'32px', fontSize:'15px', fontWeight:800, cursor:'pointer', boxShadow:'0 6px 20px rgba(200,160,96,0.4)', opacity:(!email||!sujet||!message)?0.5:1}}>
                    {loading ? 'Envoi...' : 'Envoyer'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* INFOS DROITE */}
          <div style={{display:'flex', flexDirection:'column' as const, gap:'16px'}}>
            {[
              {bg:'#C8E8FF', border:'rgba(46,95,138,0.15)', icon:'✉️', tc:'#0A2847', dc:'#2E5F8A', titre:'Email', desc:'hello@dadup.fr', sub:'On répond en moins de 24h'},
              {bg:'rgba(184,240,216,0.35)', border:'rgba(13,107,64,0.15)', icon:'⏱️', tc:'#0A2E1A', dc:'#0D6B40', titre:'Délai de réponse', desc:'Sous 24h', sub:'Du lundi au vendredi'},
              {bg:'rgba(255,232,160,0.35)', border:'rgba(200,160,96,0.2)', icon:'↩️', tc:'#3A2000', dc:'#8A6010', titre:'Remboursement', desc:'14 premiers jours', sub:'Remboursement intégral, sans condition'},
            ].map((item,i) => (
              <div key={i} style={{background:item.bg, borderRadius:'20px', padding:'22px 24px', border:`1px solid ${item.border}`, display:'flex', gap:'16px', alignItems:'flex-start'}}>
                <div style={{width:'44px', height:'44px', borderRadius:'14px', background:'rgba(255,255,255,0.6)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'20px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                  {item.icon}
                </div>
                <div>
                  <p style={{color:item.dc, fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 4px'}}>{item.titre}</p>
                  <p style={{color:item.tc, fontSize:'17px', fontWeight:800, margin:'0 0 2px'}}>{item.desc}</p>
                  <p style={{color:item.dc, fontSize:'13px', margin:0}}>{item.sub}</p>
                </div>
              </div>
            ))}
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
    </main>
  );
}
