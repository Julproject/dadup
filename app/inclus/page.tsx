export default function InclusPage() {
  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:'sans-serif'}}>
      <Nav/>

      {/* HERO */}
      <section style={{background:'#3a3028', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Ce qui est inclus</p>
          <h1 style={{color:'#f0e0cc', fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            Ton dashboard de papa.<br/><span style={{color:'#c8a882'}}>Tout inclus.</span>
          </h1>
          <p style={{color:'#9a8470', fontSize:'18px', lineHeight:1.7, margin:0}}>Pas un PDF. Une application live qui evolue avec toi, semaine apres semaine, jusqu'au premier anniversaire de bebe.</p>
        </div>
      </section>

      {/* MODULES DETAILLES */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'flex', flexDirection:'column', gap:'64px'}}>

          {[
            {
              num:'01', titre:'Dashboard personnalise en temps reel',
              desc:"Chaque semaine, ton tableau de bord se met a jour automatiquement. Ou en est bebe, ce que ressent maman, ta mission de la semaine. Un coup d'oeil suffit.",
              details:["SA 6 a SA 40 : contenu unique chaque semaine","Taille, poids, developpement des organes","Ce que ressent maman en parallele","Conseil du papa adapte a ta semaine"],
              dark:false, emoji:'\ud83d\udcca'
            },
            {
              num:'02', titre:'Suivi des rendez-vous medicaux',
              desc:"Chaque consultation expliquee avant qu'elle arrive. Ce qui se passe, ce qu'on cherche, ton role precis. Plus jamais spectateur dans la salle d'attente.",
              details:["Toutes les consultations de grossesse detaillees","Dates personnalisees a ta DPA","Ce que tu dois demander au medecin","Alertes avant chaque RDV important"],
              dark:false, emoji:'\ud83d\udcc5'
            },
            {
              num:'03', titre:'Le jour J : preparation complete',
              desc:"Contractions, poche des eaux, salle de naissance, cesarienne. Tu sais exactement quoi faire avant que ca arrive. Parce que l'improvisation, ca ne marche pas ce jour-la.",
              details:["Reconnaitre les vraies contractions (regle 5-1-1)","Checklist depart maternite interactive","Ton role precis en salle de naissance","Cesarienne : deroulement et ton role"],
              dark:true, emoji:'\ud83c\udfe5'
            },
            {
              num:'04', titre:'Checklist valise maternite',
              desc:"Une checklist complete et interactive. Coche au fur et a mesure, depuis ton telephone. Pour toi, pour elle, pour bebe. Plus de stress le jour J.",
              details:["21 articles essentiels categorises","Pour toi, pour elle, pour bebe","Documents administratifs inclus","Sauvegarde automatique dans ton compte"],
              dark:false, emoji:'\ud83e\uddf3'
            },
            {
              num:'05', titre:'Psychologie et preparation mentale',
              desc:"38 semaines de contenus sur la paternite. Peur de ne pas etre a la hauteur, vie de couple, lien avec bebe. Un sujet par semaine, des informations verifiees.",
              details:["38 semaines de contenu unique","Informations medicalement verifiees","Lien direct Doctolib si besoin d'un soutien","Aucune repetition entre les semaines"],
              dark:false, emoji:'\ud83e\udde0'
            },
            {
              num:'06', titre:'Post-partum : 12 mois de suivi',
              desc:"Apres la naissance, l'app bascule automatiquement. Developpement de bebe mois par mois, ressenti de maman, activites a faire ensemble. Tu ne decroches pas apres la naissance.",
              details:["12 mois de suivi post-natal","Developpement de bebe semaine par semaine","Baby blues, fatigue, vie de couple","Vaccins, RDV pediatre, alertes sante"],
              dark:false, emoji:'\ud83d\udc76'
            },
            {
              num:'07', titre:'Atelier pratique : les gestes concrets',
              desc:"Emmaillotage, premiers secours nourrisson, techniques d'apaisement, allaitement. Pas les theories des livres. Les gestes que tu fais a 3h du matin quand bebe pleure.",
              details:["Emmaillotage pas a pas","Premiers secours nourrisson (etouffement, fievre)","Reconnaitre et calmer les pleurs","Allaitement : ton role et comment aider"],
              dark:true, emoji:'\ud83c\udf19'
            },
            {
              num:'08', titre:'Suivi J7 et liste achats',
              desc:"Les 7 premiers jours : tableau de suivi des tetees, urines et selles comme a la maternite. Et une liste d'achats claire : l'essentiel vs le superflu, dans quel ordre, pour quel budget.",
              details:["Suivi des 7 premiers jours (tetees, selles, urines)","Liste achats : essentiel vs superflu","Budget par categorie","Sauvegarde entre sessions"],
              dark:false, emoji:'\ud83d\uded2'
            },
          ].map((m, i) => (
            <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center', direction: i % 2 === 1 ? 'rtl' : 'ltr'}}>
              <div style={{direction:'ltr'}}>
                <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px'}}>
                  <span style={{color:'#e8ddd4', fontSize:'48px', fontWeight:800, fontFamily:'Georgia,serif', lineHeight:1}}>{m.num}</span>
                  <h2 style={{color:'#3a3028', fontSize:'28px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>{m.titre}</h2>
                </div>
                <p style={{color:'#9a8470', fontSize:'15px', lineHeight:1.7, margin:'0 0 24px'}}>{m.desc}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {m.details.map((d, j) => (
                    <div key={j} style={{display:'flex', gap:'10px', alignItems:'center'}}>
                      <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#c8a882', flexShrink:0}}></div>
                      <p style={{color:'#6b5c4e', fontSize:'14px', margin:0}}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{direction:'ltr', background: m.dark ? '#3a3028' : '#f8f2eb', borderRadius:'24px', height:'320px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div style={{textAlign:'center'}}>
                  <p style={{fontSize:'56px', margin:'0 0 8px'}}>{m.emoji}</p>
                  <p style={{color: m.dark ? '#c8a882' : '#c8b8a8', fontSize:'13px', margin:0, fontWeight:600}}>{m.titre}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section style={{background:'#3a3028', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f0e0cc', fontSize:'38px', fontWeight:800, margin:'0 0 12px', fontFamily:'Georgia,serif'}}>Tout ca a partir de 9,99{'\u20ac'}/mois.</h2>
        <p style={{color:'#9a8470', fontSize:'16px', margin:'0 0 8px'}}>Ou 79{'\u20ac'}/an, soit 30% d'economie. Sans engagement. Resiliable a tout moment.</p>
        <p style={{color:'#6b5c4e', fontSize:'14px', margin:'0 0 32px'}}>Acces immediat apres inscription.</p>
        <a href="/tarifs" style={{background:'#c8a882', color:'#1c1510', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Voir les tarifs</a>
      </section>

      <Footer/>
    </main>
  );
}

function Nav() {
  return (
    <nav style={{background:'#ffffff', borderBottom:'1px solid #e8ddd4', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px', position:'sticky', top:0, zIndex:50}}>
      <div style={{display:'flex', alignItems:'center', gap:'48px'}}>
        <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
          <svg viewBox="0 0 300 300" width="34" height="34">
            <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
            <circle cx="150" cy="150" r="122" fill="#9a8470"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
            <circle cx="150" cy="112" r="40" fill="#c8a882"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
            <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
          </svg>
          <span style={{fontWeight:800, color:'#3a3028', fontSize:'20px', fontFamily:'Georgia,serif'}}>DadUp</span>
        </a>
        <div style={{display:'flex', gap:'4px'}}>
          <a href="/pourquoi" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Pourquoi DadUp</a>
          <a href="/inclus" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Ce qui est inclus</a>
          <a href="/tarifs" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Tarifs</a>
          <a href="/temoignages" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Temoignages</a>
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
        <a href="/login" style={{color:'#3a3028', fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
        <a href="/tarifs" style={{background:'#3a3028', color:'#f0e0cc', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Commencer</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{background:'#3a3028', padding:'32px 40px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
        <svg viewBox="0 0 300 300" width="28" height="28">
          <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
          <circle cx="150" cy="150" r="122" fill="#9a8470"/>
          <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
          <circle cx="150" cy="112" r="40" fill="#c8a882"/>
          <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
          <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
        </svg>
        <span style={{color:'#f0e0cc', fontSize:'16px', fontWeight:700, fontFamily:'Georgia,serif'}}>DadUp</span>
      </div>
      <p style={{color:'#6b5c4e', fontSize:'12px', margin:0}}>DadUp est un outil d'information. Il ne remplace pas l'avis d'un medecin.</p>
    </footer>
  );
}
