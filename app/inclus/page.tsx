const C = {
  dark: '#1e2535',
  gold: '#c8a060',
  cream: '#faf6f0',
  white: '#ffffff',
  border: '#e8e0d0',
  text: '#4a5568',
  textLight: '#9aa0a8',
};

function Nav() {
  return (
    <nav style={{background:C.white, borderBottom:`1px solid ${C.border}`, padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px', position:'sticky', top:0, zIndex:50}}>
      <div style={{display:'flex', alignItems:'center', gap:'48px'}}>
        <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
          <svg viewBox="0 0 300 300" width="34" height="34">
            <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
            <circle cx="150" cy="150" r="122" fill="#4a6080"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
            <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
          </svg>
          <span style={{fontWeight:800, color:C.dark, fontSize:'20px', fontFamily:'Georgia,serif'}}>DadUp</span>
        </a>
        <div style={{display:'flex', gap:'4px'}}>
          <a href="/pourquoi" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Pourquoi DadUp</a>
          <a href="/inclus" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none', borderBottom:`2px solid ${C.gold}`}}>Ce qui est inclus</a>
          <a href="/tarifs" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Tarifs</a>
          <a href="/temoignages" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Temoignages</a>
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
        <a href="/login" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
        <a href="/tarifs" style={{background:C.dark, color:C.white, padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Commencer — 29,99€/an</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{background:C.dark, borderTop:'1px solid #2e3848', padding:'32px 40px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
        <svg viewBox="0 0 300 300" width="28" height="28">
          <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
          <circle cx="150" cy="150" r="122" fill="#4a6080"/>
          <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
          <circle cx="150" cy="112" r="40" fill="#c8a060"/>
          <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
          <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
        </svg>
        <span style={{color:C.white, fontSize:'16px', fontWeight:700, fontFamily:'Georgia,serif'}}>DadUp</span>
      </div>
      <p style={{color:'#6a7585', fontSize:'12px', margin:0}}>DadUp est un outil d'information. Il ne remplace pas l'avis d'un medecin.</p>
    </footer>
  );
}

export default function InclusPage() {
  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:'sans-serif'}}>
      <Nav/>

      <section style={{background:C.dark, padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Ce qui est inclus</p>
          <h1 style={{color:C.white, fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            8 modules pour etre<br/><span style={{color:C.gold}}>vraiment la.</span>
          </h1>
          <p style={{color:'#6a7585', fontSize:'18px', lineHeight:1.7, margin:0}}>De la premiere echographie au premier mois de vie. Tout ce dont tu as besoin, au bon moment.</p>
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'flex', flexDirection:'column', gap:'64px'}}>
          {[
            {num:'01', titre:'Calendrier des rendez-vous', desc:"Chaque consultation medicale expliquee en detail. Ce qui se passe, ce qu'on cherche, les resultats possibles. Et surtout — ton role precis a chaque etape.", details:["8 echographies et consultations detaillees","Dates personnalisees a ta DPA","Ce que tu dois demander au medecin","Comment soutenir sans stresser"], emoji:'📅', dark:false},
            {num:'02', titre:'Suivi bebe semaine par semaine', desc:"Chaque semaine, decouvre ou en est bebe. Taille, poids, comparaison avec un fruit, developpement des organes. Tu sais exactement ce qui se passe.", details:["SA 6 a SA 41 couverts","Comparaison fruit chaque semaine","Developpement organes et sens","Ce que ressent maman en parallele"], emoji:'👶', dark:false},
            {num:'03', titre:'Guide accouchement complet', desc:"Le moment le plus intense de ta vie arrive. Tu seras pret. Quand partir, ou te mettre, comment respirer avec elle, comment parler aux soignants.", details:["Reconnaitre les vraies contractions","Checklist depart maternite","Ton role precis en salle de naissance","Cesarienne — ce qu'il faut savoir"], emoji:'🏥', dark:true},
            {num:'04', titre:'Valise maternite interactive', desc:"Une checklist complete et interactive. Coche au fur et a mesure. Pour toi, pour elle, pour bebe. Plus de stress le jour J — tout est pret.", details:["21 items essentiels categories","Pour toi, pour elle, pour bebe","Documents administratifs inclus","Mise a jour en temps reel"], emoji:'🧳', dark:false},
            {num:'05', titre:'Post-partum decrypte', desc:"Le retour a la maison est souvent le moment le plus difficile. Baby blues, manque de sommeil, bouleversement du couple — tu comprends ce qu'elle vit.", details:["Baby blues vs depression post-partum","Ton role les premieres semaines","Gerer la fatigue a deux","Reprendre la vie de couple"], emoji:'💙', dark:false},
            {num:'06', titre:'Idees mensuelles pour ta partenaire', desc:"Chaque mois, une idee concrete pour lui montrer que tu es la. Des attentions simples, accessibles, qui comptent vraiment.", details:["9 idees personnalisees par trimestre","Du diner romantique au cadeau pratique","Idees adaptees a son etat du moment","Surprise du mois revelee progressivement"], emoji:'🎁', dark:true},
            {num:'07', titre:'Survie premier mois', desc:"Les techniques qui marchent vraiment. Pas les theories des livres — les gestes concrets que tu peux faire a 3h du matin quand bebe pleure.", details:["Technique emmaillotage pas a pas","Decoder les pleurs de bebe","Gerer le sommeil","Biberon, rot, coliques — les bons gestes"], emoji:'🌙', dark:false},
            {num:'08', titre:'Liste achats prioritaires', desc:"Ce qui est vraiment necessaire, ce qui est superflu, dans quel ordre acheter, et pour quel budget. Arrete de te faire avoir par le marketing.", details:["Essentiel vs superflu clairement indique","Budget par categorie","Ordre d'achat recommande","Conseils marques fiables"], emoji:'🛒', dark:false},
          ].map((m, i) => (
            <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center', direction: i % 2 === 1 ? 'rtl' : 'ltr'}}>
              <div style={{direction:'ltr'}}>
                <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px'}}>
                  <span style={{color:C.border, fontSize:'48px', fontWeight:800, fontFamily:'Georgia,serif', lineHeight:1}}>{m.num}</span>
                  <h2 style={{color:C.dark, fontSize:'26px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>{m.titre}</h2>
                </div>
                <p style={{color:C.text, fontSize:'15px', lineHeight:1.7, margin:'0 0 24px'}}>{m.desc}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {m.details.map((d, j) => (
                    <div key={j} style={{display:'flex', gap:'10px', alignItems:'center'}}>
                      <div style={{width:'6px', height:'6px', borderRadius:'50%', background:C.gold, flexShrink:0}}></div>
                      <p style={{color:'#3a4f6e', fontSize:'14px', margin:0}}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{direction:'ltr', background: m.dark ? C.dark : C.cream, borderRadius:'24px', height:'300px', display:'flex', alignItems:'center', justifyContent:'center', border: m.dark ? 'none' : `1px solid ${C.border}`}}>
                <div style={{textAlign:'center'}}>
                  <p style={{fontSize:'56px', margin:'0 0 8px'}}>{m.emoji}</p>
                  <p style={{color: m.dark ? C.gold : C.textLight, fontSize:'13px', margin:0, fontWeight:600}}>{m.titre}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:C.dark, padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:C.white, fontSize:'38px', fontWeight:800, margin:'0 0 12px', fontFamily:'Georgia,serif'}}>Tout ca pour 29,99€/an.</h2>
        <p style={{color:'#6a7585', fontSize:'16px', margin:'0 0 32px'}}>Sans engagement. Resiliable a tout moment.</p>
        <a href="/tarifs" style={{background:C.gold, color:'#1c1510', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Commencer maintenant</a>
      </section>

      <Footer/>
    </main>
  );
}
