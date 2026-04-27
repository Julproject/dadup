'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  orange: '#FFF0E6', green: '#E4F5EC', amber: '#FFF7E0',
};

const TEMOIGNAGES = [
  {prenom:'Thomas', age:31, ville:'Lyon', semaine:'SA 28', texte:"J'avais l'impression d'être un spectateur pendant toute la grossesse. DadUp m'a donné des outils concrets. À l'accouchement j'ai su exactement quoi faire. Ma compagne me dit encore que ça a tout changé.", dark:false},
  {prenom:'Maxime', age:28, ville:'Paris', semaine:'SA 34', texte:"Le module post-partum m'a sauvé. Personne ne m'avait parlé du baby blues. J'ai compris ce que vivait ma femme et j'ai pu être là pour elle au lieu de paniquer.", dark:true},
  {prenom:'Antoine', age:35, ville:'Bordeaux', semaine:'SA 20', texte:"35,99€ pour tout ça, c'est franchement honnête. J'aurais dépensé dix fois plus en livres que je n'aurais jamais finis. DadUp c'est pratique, personnalisé, et je l'ai sur mon téléphone à tout moment.", dark:false},
  {prenom:'Kevin', age:26, ville:'Marseille', semaine:'SA 12', texte:"Premier enfant, je ne savais vraiment pas par où commencer. Le calendrier des RDV m'a permis de comprendre chaque étape. Ma conjointe était bluffée que je connaisse tout ça.", dark:false},
  {prenom:'Julien', age:33, ville:'Nantes', semaine:'SA 36', texte:"La valise était prête trois semaines avant. On n'a rien oublié. Le jour du départ à la maternité j'étais stressé comme tout le monde, mais au moins j'étais organisé.", dark:true},
  {prenom:'Nicolas', age:30, ville:'Toulouse', semaine:'SA 40', texte:"Bébé est arrivé. Je voulais juste dire merci. J'étais là, vraiment présent, du début à la fin. C'est le plus beau jour de ma vie.", dark:false},
];

const STATS = [
  {chiffre:'4.9/5', label:'Note moyenne'},
  {chiffre:'97%', label:'Se sentent mieux préparés'},
  {chiffre:'94%', label:'Recommandent DadUp'},
  {chiffre:'1er', label:'Guide du papa en France'},
];

export default function TemoignagesPage() {
  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .tg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .sg{display:grid;grid-template-columns:repeat(4,1fr);text-align:center;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          .tg{grid-template-columns:1fr!important;}
          .sg{grid-template-columns:1fr 1fr!important;gap:0;}
          .sg-item{border-left:none!important;border-top:1px solid rgba(46,95,138,0.2);padding:20px!important;}
          .sg-item:nth-child(2){border-left:1px solid rgba(46,95,138,0.2)!important;}
          .sp{padding:48px 20px!important;}
          nav{padding:0 20px!important;}
          h1{font-size:36px!important;}
          h2{font-size:26px!important;}
          .cta-inner{padding:40px 24px!important;}
        }
      `}</style>

      <nav style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:'0 40px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'68px',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'48px'}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="34" height="34"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{fontWeight:800,color:C.dark,fontSize:'20px'}}>DadUp</span>
          </a>
          <div className="nl" style={{gap:'4px'}}>
            <a href="/pourquoi" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Tarifs</a>
            <a href="/temoignages" style={{color:C.dark,fontSize:'14px',fontWeight:700,padding:'8px 14px',borderRadius:'8px',textDecoration:'none',borderBottom:`2px solid ${C.gold}`}}>Témoignages</a>
            <a href="/contact" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Contactez-nous</a>
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
            <span style={{color:C.gold,fontSize:'13px',fontWeight:700}}>Des papas qui ont décidé de déchirer</span>
          </div>
          <h1 style={{color:C.white,fontSize:'52px',fontWeight:800,margin:'0 0 24px',lineHeight:1.1}}>
            Des papas qui ont<br/><span style={{color:C.gold}}>décidé de se préparer.</span>
          </h1>
          <p style={{color:'#6a7585',fontSize:'18px',lineHeight:1.7,margin:0}}>Ce qu'ils ont vécu. Ce que ça a changé.</p>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:C.bluePale,padding:'48px 40px',borderBottom:`1px solid rgba(46,95,138,0.12)`}}>
        <div className="sg" style={{maxWidth:'1200px',margin:'0 auto'}}>
          {STATS.map((s,i)=>(
            <div key={i} className="sg-item" style={{padding:'0 32px',borderLeft:i>0?`1px solid rgba(46,95,138,0.2)`:'none'}}>
              <p style={{color:C.blue,fontSize:'36px',fontWeight:800,margin:0}}>{s.chiffre}</p>
              <p style={{color:C.blueDark,fontSize:'13px',margin:'6px 0 0'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="sp" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div className="tg">
          {TEMOIGNAGES.map((t,i)=>(
            <div key={i} style={{background:t.dark?C.dark:i%3===2?C.amber:i%3===0?C.cream:C.green,borderRadius:'20px',padding:'28px',border:t.dark?'none':`1px solid ${C.border}`}}>
              <div style={{display:'flex',gap:'2px',marginBottom:'16px'}}>
                {[...Array(5)].map((_,j)=><span key={j} style={{color:C.gold,fontSize:'16px'}}>★</span>)}
              </div>
              <p style={{color:t.dark?C.white:C.dark,fontSize:'15px',lineHeight:1.7,margin:'0 0 20px',fontStyle:'italic'}}>"{t.texte}"</p>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <p style={{color:t.dark?C.gold:C.dark,fontSize:'14px',fontWeight:700,margin:0}}>{t.prenom}, {t.age} ans</p>
                  <p style={{color:C.textLight,fontSize:'12px',margin:'2px 0 0'}}>{t.ville}</p>
                </div>
                <span style={{background:t.dark?'#2e3848':C.bluePale,color:t.dark?C.gold:C.blue,fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'20px'}}>{t.semaine}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CITATION FORTE */}
      <section style={{background:C.bluePale,padding:'60px 40px',borderTop:`1px solid rgba(46,95,138,0.12)`,borderBottom:`1px solid rgba(46,95,138,0.12)`}}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:'32px',fontWeight:800,color:C.blueDark,lineHeight:1.4,margin:'0 0 14px'}}>
            "Bébé est arrivé. J'étais là, pleinement présent, du début à la fin."
          </p>
          <p style={{color:C.text,fontSize:'15px',margin:'0 0 4px'}}>Nicolas, 30 ans — Toulouse</p>
          <p style={{color:C.blue,fontSize:'13px',margin:0,fontWeight:600}}>Papa depuis la SA 40</p>
        </div>
      </section>

      {/* CTA */}
      <section className="sp" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div className="cta-inner" style={{background:C.dark,borderRadius:'28px',padding:'64px',textAlign:'center' as const}}>
          <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>À ton tour 💪</p>
          <h2 style={{color:C.white,fontSize:'42px',fontWeight:800,margin:'0 0 16px'}}>Rejoins les papas<br/>qui se préparent.</h2>
          <p style={{color:'#6a7585',fontSize:'16px',margin:'0 0 8px'}}>35,99€/an. Sans engagement. Accès immédiat.</p>
          <p style={{color:'rgba(200,160,96,0.6)',fontSize:'14px',margin:'0 0 32px'}}>= 12 bières 🍺 · 2 places de match ⚽ · 1 pizza XXL 🍕</p>
          <a href="/tarifs" style={{background:C.gold,color:'#1c1510',padding:'18px 48px',borderRadius:'32px',fontSize:'16px',fontWeight:800,textDecoration:'none',display:'inline-block'}}>Commencer maintenant — 35,99€/an</a>
          <p style={{color:'#3d5070',fontSize:'12px',margin:'16px 0 0'}}>Paiement sécurisé par Stripe · Moins cher que Netflix 🍿</p>
        </div>
      </section>

      <footer style={{background:C.dark,borderTop:'1px solid #2e3848',padding:'32px 40px'}}>
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
              <a href="/temoignages" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Témoignages</a>
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
    </main>
  );
}
