export default function InclusPage() {
  const modules = [
    {
      num:'01', titre:'Dashboard personnalise',
      desc:"Ta semaine en cours, le developpement de bebe, ta mission de papa. Mis a jour chaque semaine automatiquement. Un coup d'oeil suffit.",
      details:["SA 6 a SA 40 : contenu unique chaque semaine","Taille, poids, developpement des organes","Ce que ressent la maman en parallele","Conseil du papa adapte a la semaine"],
      dark:false,
    },
    {
      num:'02', titre:'Suivi des rendez-vous medicaux',
      desc:"Chaque consultation expliquee avant qu'elle arrive. Ce qui se passe, ce qu'on cherche, ton role precis. Tu arrives prepare, pas spectateur.",
      details:["Toutes les consultations de grossesse detaillees","Dates personnalisees a ta DPA","Ce que tu dois demander au medecin","Comprendre les resultats d'examens"],
      dark:true,
    },
    {
      num:'03', titre:'Preparation a l\'accouchement',
      desc:"Contractions, poche des eaux, salle de naissance, cesarienne. Tu sais exactement quoi faire avant que ca arrive. Parce que l'improvisation ne marche pas ce jour-la.",
      details:["Reconnaitre les vraies contractions (regle 5-1-1)","Checklist depart maternite","Ton role precis en salle de naissance","Cesarienne : deroulement et ce que tu peux faire"],
      dark:false,
    },
    {
      num:'04', titre:'Checklists interactives',
      desc:"Valise maternite, achats prioritaires, documents administratifs. Tout est cochable depuis ton telephone et sauvegarde dans ton compte.",
      details:["Valise : pour toi, pour elle, pour bebe","Liste achats : l'essentiel vs le superflu","Documents : carte vitale, plan de naissance...","Sauvegarde automatique entre sessions"],
      dark:true,
    },
    {
      num:'05', titre:'Psychologie et preparation mentale',
      desc:"38 semaines de contenus sur la paternite. Peur de ne pas etre a la hauteur, vie de couple, lien avec bebe. Un sujet par semaine, verifie medicalement.",
      details:["38 semaines de contenu unique","Informations medicalement verifiees","Lien direct Doctolib si besoin d'un soutien","Aucune repetition entre les semaines"],
      dark:false,
    },
    {
      num:'06', titre:'Mode post-partum : 12 mois',
      desc:"Apres la naissance, l'application bascule automatiquement. Developpement de bebe mois par mois, vaccins, alertes sante, activites a faire ensemble.",
      details:["12 mois de suivi post-natal","Developpement de bebe mois par mois","Baby blues, fatigue, vie de couple","Vaccins, RDV pediatre, signaux d'alerte"],
      dark:true,
    },
    {
      num:'07', titre:'Ateliers pratiques',
      desc:"Emmaillotage, premiers secours nourrisson, techniques d'apaisement, soutien a l'allaitement. Les gestes que tu fais a 3h du matin quand bebe pleure, sans jargon.",
      details:["Emmaillotage pas a pas","Premiers secours nourrisson (etouffement, fievre)","Comprendre et calmer les pleurs","Allaitement : ton role et comment aider"],
      dark:false,
    },
    {
      num:'08', titre:'Suivi des 7 premiers jours',
      desc:"Tableau de suivi des tetees, des urines et des selles, comme a la maternite. Et une idee mensuelle pour ta partenaire, adaptee a son etat du moment.",
      details:["Suivi J7 : tetees, selles, urines","Sauvegarde entre sessions","Idee mensuelle pour ta partenaire","Activites adaptees a chaque mois de grossesse"],
      dark:true,
    },
  ];

  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <Nav/>

      <section style={{background:'#1c2333', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a060', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Ce qui est inclus</p>
          <h1 style={{color:'#f7f4ef', fontSize:'52px', fontWeight:900, margin:'0 0 24px', lineHeight:1.1, letterSpacing:'-1px'}}>
            Tout ce dont tu as besoin.<br/><span style={{color:'#c8a060'}}>Au bon moment.</span>
          </h1>
          <p style={{color:'#9a8888', fontSize:'18px', lineHeight:1.7, margin:0}}>Une application qui evolue avec toi, de la premiere echographie au premier anniversaire de bebe.</p>
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'flex', flexDirection:'column', gap:'64px'}}>
          {modules.map((m, i) => (
            <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center', direction: i % 2 === 1 ? 'rtl' : 'ltr'}}>
              <div style={{direction:'ltr'}}>
                <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px'}}>
                  <span style={{color:'#e8e0d8', fontSize:'48px', fontWeight:900, lineHeight:1}}>{m.num}</span>
                  <h2 style={{color:'#1c2333', fontSize:'28px', fontWeight:800, margin:0, letterSpacing:'-0.3px'}}>{m.titre}</h2>
                </div>
                <p style={{color:'#9a8888', fontSize:'15px', lineHeight:1.7, margin:'0 0 24px'}}>{m.desc}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {m.details.map((d, j) => (
                    <div key={j} style={{display:'flex', gap:'10px', alignItems:'center'}}>
                      <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#c8a060', flexShrink:0}}></div>
                      <p style={{color:'#2E5F8A', fontSize:'14px', margin:0}}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{direction:'ltr', background: m.dark ? '#1c2333' : '#f7f4ef', borderRadius:'24px', height:'280px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <p style={{color: m.dark ? '#c8a060' : '#9a8888', fontSize:'13px', margin:0, fontWeight:600, textAlign:'center', padding:'0 24px'}}>{m.titre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:'#1c2333', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f7f4ef', fontSize:'38px', fontWeight:900, margin:'0 0 12px', letterSpacing:'-0.5px'}}>Tout ca a partir de 6,99 &#8364;/mois.</h2>
        <p style={{color:'#9a8888', fontSize:'16px', margin:'0 0 8px'}}>Ou 59,99 &#8364;/an, sans engagement, resiliable a tout moment.</p>
        <p style={{color:'rgba(255,255,255,0.25)', fontSize:'13px', margin:'0 0 32px'}}>Acces immediat apres inscription.</p>
        <a href="/tarifs" style={{background:'#c8a060', color:'#1c2333', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Voir les tarifs</a>
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
          <span style={{fontWeight:900, color:'#1c2333', fontSize:'20px', letterSpacing:'-0.3px'}}>DadUp</span>
        </a>
        <div style={{display:'flex', gap:'4px'}}>
          {[['Pourquoi DadUp','/pourquoi'],['Ce qui est inclus','/inclus'],['Tarifs','/tarifs'],['Temoignages','/temoignages']].map(([label, href]) => (
            <a key={href} href={href} style={{color:'#9a8888', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>{label}</a>
          ))}
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
        <a href="/login" style={{color:'#1c2333', fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
        <a href="/tarifs" style={{background:'#1c2333', color:'#ffffff', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Commencer</a>
      </div>
    </nav>
  );
}
function Footer() {
  return (
    <footer style={{background:'#1c2333', padding:'32px 40px'}}>
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
