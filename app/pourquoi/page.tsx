'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  orange: '#FFF0E6', green: '#E4F5EC', amber: '#FFF7E0',
};

export default function PourquoiPage() {
  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .aa{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          .aa{grid-template-columns:1fr!important;}
          .sp{padding:48px 20px!important;}
          nav{padding:0 20px!important;}
          h1{font-size:36px!important;}
          h2{font-size:26px!important;}
        }
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
            <a href="/temoignages" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Témoignages</a>
          </div>
        </div>
        <div className="nc" style={{alignItems:'center',gap:'16px'}}>
          <a href="/login" style={{color:C.dark,fontSize:'14px',fontWeight:600,textDecoration:'none'}}>Se connecter</a>
          <a href="/tarifs" style={{background:C.dark,color:C.white,padding:'11px 22px',borderRadius:'32px',fontSize:'13px',fontWeight:700,textDecoration:'none'}}>Commencer — 35,99€/an 💪</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{background:C.dark,padding:'80px 40px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(200,160,96,0.15)',borderRadius:'20px',padding:'6px 16px',marginBottom:'24px'}}>
            <span style={{fontSize:'16px'}}>💪</span>
            <span style={{color:C.gold,fontSize:'13px',fontWeight:700}}>Sois un papa qui déchire</span>
          </div>
          <h1 style={{color:C.white,fontSize:'52px',fontWeight:800,margin:'0 0 24px',lineHeight:1.1}}>
            Être père,<br/><span style={{color:C.gold}}>ça se prépare.</span>
          </h1>
          <p style={{color:'#6a7585',fontSize:'18px',lineHeight:1.7,margin:'0 0 16px'}}>DadUp est le premier guide conçu exclusivement pour le papa.</p>
          <p style={{color:'rgba(200,160,96,0.7)',fontSize:'14px',fontWeight:600}}>Ne réfléchis plus à la place de ta partenaire : tout est dans l'app.</p>
        </div>
      </section>

      {/* ACCROCHES */}
      <section style={{background:'#f7f9fc',padding:'24px 40px',borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          {[
            {icon:'💪', texte:'Sois un papa qui déchire'},
            {icon:'🍺', texte:'35,99€ = 12 bières. Facile.'},
            {icon:'📱', texte:'Centralise tout : bébé, couple, stress'},
            {icon:'🔓', texte:'Paye 1x → serein 365j'},
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
          <h2 style={{fontSize:'38px',fontWeight:800,color:C.dark,margin:0}}>Avant / Après DadUp</h2>
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
          <div style={{background:C.dark,borderRadius:'20px',padding:'32px'}}>
            <p style={{color:C.gold,fontSize:'12px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 20px'}}>Avec DadUp 💪</p>
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

      {/* CTA */}
      <section style={{background:C.dark,padding:'80px 40px',textAlign:'center' as const}}>
        <p style={{color:C.gold,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Prêt à déchirer ?</p>
        <h2 style={{color:C.white,fontSize:'38px',fontWeight:800,margin:'0 0 12px'}}>Commencer maintenant</h2>
        <p style={{color:'#6a7585',fontSize:'16px',margin:'0 0 8px'}}>35,99€/an. Sans engagement. Accès immédiat.</p>
        <p style={{color:'rgba(200,160,96,0.6)',fontSize:'14px',margin:'0 0 32px'}}>= 12 bières 🍺 · 2 places de match ⚽ · 1 pizza XXL 🍕</p>
        <a href="/tarifs" style={{background:C.gold,color:'#1c1510',padding:'16px 40px',borderRadius:'32px',fontSize:'15px',fontWeight:800,textDecoration:'none',display:'inline-block'}}>Commencer — 35,99€/an 💪</a>
        <p style={{color:'#3d5070',fontSize:'12px',margin:'12px 0 0'}}>Moins cher que Netflix · Paye 1x → serein 365j ✅</p>
      </section>

      <footer style={{background:C.dark,borderTop:'1px solid #2e3848',padding:'32px 40px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <svg viewBox="0 0 300 300" width="28" height="28"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
          <span style={{color:C.white,fontSize:'16px',fontWeight:700}}>DadUp</span>
        </div>
        <p style={{color:'#6a7585',fontSize:'12px',margin:0}}>DadUp est un outil d'information. Il ne remplace pas l'avis d'un médecin.</p>
      </footer>
    </main>
  );
}
