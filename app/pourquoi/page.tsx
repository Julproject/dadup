'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  orange: '#FFF0E6', green: '#E4F5EC', amber: '#FFF7E0', coral: '#FDECEA',
};

export default function PourquoiPage() {
  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .hg{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .aa{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          .hg{grid-template-columns:1fr!important;gap:32px!important;}
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
            <svg viewBox="0 0 300 300" width="34" height="34">
              <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
              <circle cx="150" cy="150" r="122" fill="#4a6080"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
              <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
            </svg>
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
          <a href="/tarifs" style={{background:C.dark,color:C.white,padding:'11px 22px',borderRadius:'32px',fontSize:'13px',fontWeight:700,textDecoration:'none'}}>Commencer — 29,99€/an</a>
        </div>
      </nav>

      <section style={{background:C.dark,padding:'80px 40px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Pourquoi DadUp</p>
          <h1 style={{color:C.white,fontSize:'52px',fontWeight:800,margin:'0 0 24px',lineHeight:1.1}}>
            On prépare les mamans.<br/><span style={{color:C.gold}}>Pas les papas.</span>
          </h1>
          <p style={{color:'#6a7585',fontSize:'18px',lineHeight:1.7,margin:0}}>Pourtant tu es là, tu veux être présent, tu veux bien faire. Mais personne ne t'a appris comment.</p>
        </div>
      </section>

      <section className="sp hg" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div>
          <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Le constat</p>
          <h2 style={{fontSize:'38px',fontWeight:800,color:C.dark,margin:'0 0 32px',lineHeight:1.2}}>Tu veux être là.<br/>Mais comment ?</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            {[
              {t:'Les livres sont écrits pour les mamans.',d:"Sur 100 livres sur la grossesse, moins de 5 s'adressent au papa.",bg:C.orange,tc:'#C04A1A',n:'1'},
              {t:"Personne n'explique ton rôle exact.",d:"À la maternité, pendant les échographies, on te dit rarement quoi faire ou comment aider.",bg:C.green,tc:'#0D6B40',n:'2'},
              {t:"Le post-partum reste un tabou.",d:"Baby blues, fatigue extrême, bouleversement du couple. Personne n'en parle.",bg:C.bluePale,tc:C.blue,n:'3'},
              {t:"Les premières semaines sans mode d'emploi.",d:"Emmaillotage, pleurs, sommeil. Tu découvres tout sur le tas, souvent la nuit.",bg:C.amber,tc:'#8A6010',n:'4'},
            ].map((item,i)=>(
              <div key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start',background:item.bg,borderRadius:'16px',padding:'18px 20px'}}>
                <div style={{width:'30px',height:'30px',borderRadius:'50%',background:C.white,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <span style={{color:item.tc,fontSize:'13px',fontWeight:700}}>{item.n}</span>
                </div>
                <div>
                  <p style={{color:C.dark,fontSize:'15px',fontWeight:700,margin:'0 0 3px'}}>{item.t}</p>
                  <p style={{color:C.text,fontSize:'13px',margin:0,lineHeight:1.5}}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:C.cream,borderRadius:'24px',minHeight:'400px',overflow:'hidden',border:`1px solid ${C.border}`}}>
          <img src="/deborde.jpg" alt="Papa et bébé" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}}/>
        </div>
      </section>

      <section style={{background:C.bluePale,padding:'60px 40px',borderTop:`1px solid rgba(46,95,138,0.12)`,borderBottom:`1px solid rgba(46,95,138,0.12)`}}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:'30px',fontWeight:800,color:C.blueDark,lineHeight:1.4,margin:'0 0 14px'}}>
            Être un bon papa, ça ne s'improvise pas. Ça se prépare.
          </p>
          <p style={{color:C.blue,fontSize:'15px',margin:0,fontWeight:500}}>DadUp est le premier guide conçu exclusivement pour le papa.</p>
        </div>
      </section>

      <section className="sp" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 12px'}}>Ce que DadUp change</p>
          <h2 style={{fontSize:'38px',fontWeight:800,color:C.dark,margin:0}}>Avant / Après DadUp</h2>
        </div>
        <div className="aa">
          <div style={{background:C.orange,borderRadius:'20px',padding:'32px',border:`1px solid rgba(192,74,26,0.15)`}}>
            <p style={{color:'#C04A1A',fontSize:'12px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 20px'}}>Sans DadUp</p>
            {["Tu découvres l'accouchement sur le moment","Tu ne sais pas quand partir à la maternité","Le post-partum te prend par surprise","Tu achètes au hasard et tu dépenses trop","Tu te sens spectateur plutôt qu'acteur"].map((t,i)=>(
              <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                <span style={{color:'#C04A1A',fontSize:'14px',fontWeight:700,flexShrink:0}}>✗</span>
                <p style={{color:'#7A3010',fontSize:'14px',margin:0,lineHeight:1.5}}>{t}</p>
              </div>
            ))}
          </div>
          <div style={{background:C.dark,borderRadius:'20px',padding:'32px'}}>
            <p style={{color:C.gold,fontSize:'12px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 20px'}}>Avec DadUp</p>
            {["Tu connais chaque étape avant qu'elle arrive","Tu sais exactement quand et comment réagir","Tu comprends ce qu'elle vit et tu l'accompagnes","Tu achètes ce qui est vraiment utile","Tu es présent, confiant et pleinement impliqué"].map((t,i)=>(
              <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                <span style={{color:C.gold,fontSize:'14px',fontWeight:700,flexShrink:0}}>✓</span>
                <p style={{color:C.white,fontSize:'14px',margin:0,lineHeight:1.5}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.dark,padding:'80px 40px',textAlign:'center' as const}}>
        <h2 style={{color:C.white,fontSize:'38px',fontWeight:800,margin:'0 0 12px'}}>Prêt à te préparer ?</h2>
        <p style={{color:'#6a7585',fontSize:'16px',margin:'0 0 32px'}}>Rejoins DadUp et commence dès aujourd'hui.</p>
        <a href="/tarifs" style={{background:C.gold,color:'#1c1510',padding:'16px 40px',borderRadius:'32px',fontSize:'15px',fontWeight:800,textDecoration:'none',display:'inline-block'}}>Commencer — 29,99€/an</a>
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
