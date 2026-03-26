export default function InclusPage() {
  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:'sans-serif'}}>
      <Nav/>

      {/* HERO */}
      <section style={{background:'#3a3028', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Ce qui est inclus</p>
          <h1 style={{color:'#f0e0cc', fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            8 modules pour etre<br/><span style={{color:'#c8a882'}}>vraiment la.</span>
          </h1>
          <p style={{color:'#9a8470', fontSize:'18px', lineHeight:1.7, margin:0}}>De la premiere echographie au premier mois de vie. Tout ce dont tu as besoin, au bon moment.</p>
        </div>
      </section>

      {/* MODULES DETAILLES */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'flex', flexDirection:'column', gap:'64px'}}>

          {[
            {
              num:'01', titre:'Calendrier des rendez-vous',
              desc:"Chaque consultation medicale expliquee en detail. Ce qui se passe, ce qu'on cherche, les resultats possibles. Et surtout — ton role precis a chaque etape.",
              details:["8 echographies et consultations detaillees","Dates personnalisees a ta DPA","Ce que tu dois demander au medecin","Comment soutenir sans stresser"],
              img:null, dark:false
            },
            {
              num:'02', titre:'Suivi bebe semaine par semaine',
              desc:"Chaque semaine, decouvre ou en est bebe. Taille, poids, comparaison avec un fruit, developpement des organes. Tu sais exactement ce qui se passe dans ce ventre.",
              details:["SA 6 a SA 41 couverts","Comparaison fruit chaque semaine","Developpement organes et sens","Ce que ressent maman en parallele"],
              img:null, dark:false
            },
            {
              num:'03', titre:'Guide accouchement complet',
              desc:"Le moment le plus intense de ta vie arrive. Tu seras pret. Quand partir, ou te mettre, comment respirer avec elle, comment parler aux soignants, quoi faire si ca se complique.",
              details:["Reconnaitre les vraies contractions","Checklist depart maternite","Ton role precis en salle de naissance","Cesarienne — ce qu'il faut savoir"],
              img:null, dark:true
            },
            {
              num:'04', titre:'Valise maternite interactive',
              desc:"Une checklist complete et interactive. Coche au fur et a mesure. Pour toi, pour elle, pour bebe. Plus de stress le jour J — tout est pret.",
              details:["21 items essentiels categories","Pour toi, pour elle, pour bebe","Documents administratifs inclus","Mise a jour en temps reel"],
              img:null, dark:false
            },
            {
              num:'05', titre:'Post-partum decrypte',
              desc:"Le retour a la maison est souvent le moment le plus difficile. Baby blues, manque de sommeil, bouleversement du couple, allaitement — tu comprends ce qu'elle vit pour mieux l'accompagner.",
              details:["Baby blues vs depression post-partum","Ton role les premieres semaines","Gerer la fatigue a deux","Reprendre la vie de couple progressivement"],
              img:null, dark:false
            },
            {
              num:'06', titre:'Idees mensuelles pour ta partenaire',
              desc:"Chaque mois, une idee concrete pour lui montrer que tu es la. Des attentions simples, accessibles, qui comptent vraiment.",
              details:["9 idees personnalisees par trimestre","Du diner romantique au cadeau pratique","Idees adaptees a son etat du moment","Surprise du mois revelee progressivement"],
              img:null, dark:false
            },
            {
              num:'07', titre:'Survie premier mois',
              desc:"Les techniques qui marchent vraiment. Pas les theories des livres — les gestes concrets que tu peux faire a 3h du matin quand bebe pleure et que tu ne sais plus quoi faire.",
              details:["Technique emmaillotage pas a pas","Decoder les pleurs de bebe","Gerer le sommeil (le sien et le tien)","Biberon, rot, coliques — les bons gestes"],
              img:null, dark:true
            },
            {
              num:'08', titre:'Liste achats prioritaires',
              desc:"Ce qui est vraiment necessaire, ce qui est superflu, dans quel ordre acheter, et pour quel budget. Arrete de te faire avoir par le marketing de la puericulture.",
              details:["Essentiel vs superflu clairement indique","Budget par categorie","Ordre d'achat recommande","Conseils marques fiables"],
              img:null, dark:false
            },
          ].map((m, i) => (
            <div key={i} style={{display:'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap:'64px', alignItems:'center', direction: i % 2 === 1 ? 'rtl' : 'ltr'}}>
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
                  <p style={{fontSize:'56px', margin:'0 0 8px'}}>
                    {['📅','👶','🏥','🧳','💙','🎁','🌙','🛒'][i]}
                  </p>
                  <p style={{color: m.dark ? '#c8a882' : '#c8b8a8', fontSize:'13px', margin:0, fontWeight:600}}>{m.titre}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section style={{background:'#3a3028', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f0e0cc', fontSize:'38px', fontWeight:800, margin:'0 0 12px', fontFamily:'Georgia,serif'}}>Tout ca pour 29,99€/an.</h2>
        <p style={{color:'#9a8470', fontSize:'16px', margin:'0 0 32px'}}>Sans engagement. Resiliable a tout moment.</p>
        <a href="/#tarifs" style={{background:'#c8a882', color:'#1c1510', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Commencer maintenant</a>
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
        <a href="/#tarifs" style={{background:'#3a3028', color:'#f0e0cc', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Commencer — 29,99€/an</a>
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
