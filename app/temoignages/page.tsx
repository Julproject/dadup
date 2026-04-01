export default function TemoignagesPage() {
  const temoignages = [
    { prenom:'Thomas', age:31, ville:'Lyon', sa:'SA 28', dark:false,
      texte:"Le contenu evolue semaine apres semaine. Quand on est arrive a la maternite, je savais exactement comment soutenir ma partenaire. Ca change vraiment les choses." },
    { prenom:'Maxime', age:28, ville:'Paris', sa:'SA 34', dark:true,
      texte:"Personne ne m'avait parle du baby blues. Grace a DadUp, j'ai compris ce que vivait ma femme au retour a la maison et j'ai pu etre present plutot que depasse." },
    { prenom:'Antoine', age:35, ville:'Bordeaux', sa:'SA 20', dark:false,
      texte:"Ce que j'appreciais c'est que l'app evolue avec moi. Le dashboard se mettait a jour chaque semaine. J'etais dans la course toute la grossesse, pas juste le jour de la naissance." },
    { prenom:'Kevin', age:26, ville:'Marseille', sa:'SA 12', dark:true,
      texte:"Premier enfant, je ne savais pas par ou commencer. Le calendrier des RDV m'a permis de comprendre chaque etape avant qu'elle arrive. Ma conjointe etait surprise que je sache tout ca." },
    { prenom:'Julien', age:33, ville:'Nantes', sa:'SA 36', dark:false,
      texte:"La valise etait prete trois semaines avant. Rien n'a ete oublie. Le jour du depart j'etais stresse comme tout le monde, mais au moins j'etais organise." },
    { prenom:'Nicolas', age:30, ville:'Toulouse', sa:'SA 40', dark:true,
      texte:"Bebe est arrive. Le guide accouchement m'a donne confiance. Je savais ou me mettre, quoi lui dire pendant les contractions. J'etais la, vraiment present, du debut a la fin." },
  ];

  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <Nav/>

      <section style={{background:'#1e2535', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a060', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Temoignages</p>
          <h1 style={{color:'#f7f5f0', fontSize:'52px', fontWeight:900, margin:'0 0 24px', lineHeight:1.1, letterSpacing:'-1px'}}>
            Ce qu'ils ont vecu.
          </h1>
          <p style={{color:'#9aa0a8', fontSize:'18px', lineHeight:1.7, margin:0}}>Des papas qui ont utilise DadUp pendant leur grossesse.</p>
        </div>
      </section>

      <section style={{background:'#f7f5f0', padding:'48px 40px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'32px', textAlign:'center'}}>
          {[
            {val:'4.9/5', label:'Note moyenne', bg:'#FFF0E6', tc:'#C04A1A'},
            {val:'97%',   label:'Se sentent mieux prepares', bg:'#E4F5EC', tc:'#0D6B40'},
            {val:'94%',   label:'Recommandent DadUp', bg:'#E6F0FA', tc:'#1A4A7A'},
          ].map((s,i)=>(
            <div key={i} style={{background:s.bg, borderRadius:'16px', padding:'24px'}}>
              <p style={{color:s.tc, fontSize:'36px', fontWeight:900, margin:'0 0 6px', letterSpacing:'-1px'}}>{s.val}</p>
              <p style={{color:s.tc, fontSize:'13px', margin:0, opacity:0.8}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'1000px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
          {temoignages.map((t,i)=>(
            <div key={i} style={{background: t.dark ? '#1e2535' : '#f7f5f0', borderRadius:'20px', padding:'32px', border: t.dark ? 'none' : '1px solid #f0ede8'}}>
              <div style={{display:'flex', gap:'2px', marginBottom:'16px'}}>
                {[1,2,3,4,5].map(j=><span key={j} style={{color:'#c8a060', fontSize:'16px'}}>&#9733;</span>)}
              </div>
              <p style={{color: t.dark ? '#f7f5f0' : '#1e2535', fontSize:'15px', lineHeight:1.75, margin:'0 0 24px', fontStyle:'italic'}}>"{t.texte}"</p>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <p style={{color: t.dark ? '#c8a060' : '#1e2535', fontWeight:700, fontSize:'14px', margin:'0 0 2px'}}>{t.prenom}, {t.age} ans</p>
                  <p style={{color: t.dark ? 'rgba(255,255,255,0.4)' : '#9aa0a8', fontSize:'12px', margin:0}}>{t.ville}</p>
                </div>
                <span style={{background: t.dark ? 'rgba(255,255,255,0.1)' : '#E6F0FA', color: t.dark ? '#c8a060' : '#1A4A7A', fontSize:'11px', fontWeight:700, padding:'4px 12px', borderRadius:'20px'}}>{t.sa}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:'#1e2535', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f7f5f0', fontSize:'38px', fontWeight:900, margin:'0 0 12px', letterSpacing:'-0.5px'}}>Rejoins-les.</h2>
        <p style={{color:'#9aa0a8', fontSize:'16px', margin:'0 0 8px'}}>6,99 &#8364;/mois ou 59,99 &#8364;/an. Sans engagement. Acces immediat.</p>
        <p style={{color:'rgba(255,255,255,0.25)', fontSize:'13px', margin:'0 0 32px'}}>Satisfait ou rembourse dans les 7 premiers jours.</p>
        <a href="/tarifs" style={{background:'#c8a060', color:'#1e2535', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Voir les tarifs</a>
      </section>

      <Footer/>
    </main>
  );
}

function Nav() {
  return (
    <nav style={{background:'#ffffff', borderBottom:'1px solid #e8e0d8', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px', position:'sticky', top:0, zIndex:50}}>
      <div style={{display:'flex', alignItems:'center', gap:'40px'}}>
        <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
          <svg viewBox="0 0 300 300" width="34" height="34">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
          <span style={{fontWeight:900, color:'#1e2535', fontSize:'20px', letterSpacing:'-0.3px'}}>DadUp</span>
        </a>
        <div style={{display:'flex', gap:'4px'}}>
          {[['Pourquoi DadUp','/pourquoi'],['Ce qui est inclus','/inclus'],['Tarifs','/tarifs'],['Temoignages','/temoignages']].map(([label, href]) => (
            <a key={href} href={href} style={{color:'#9a8888', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>{label}</a>
          ))}
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
        <a href="/login" style={{color:'#1e2535', fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
        <a href="/tarifs" style={{background:'#1e2535', color:'#ffffff', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Commencer</a>
      </div>
    </nav>
  );
}
function Footer() {
  return (
    <footer style={{background:'#1e2535', padding:'32px 40px'}}>
      <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <svg viewBox="0 0 300 300" width="28" height="28">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
          <span style={{color:'#f7f4ef', fontSize:'18px', fontWeight:800}}>DadUp</span>
        </div>
        <p style={{color:'rgba(255,255,255,0.25)', fontSize:'12px', margin:0}}>DadUp ne remplace pas l'avis d'un medecin.</p>
      </div>
    </footer>
  );
}
