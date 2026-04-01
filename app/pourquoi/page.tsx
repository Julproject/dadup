import Link from 'next/link';

export default function PourquoiPage() {
  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:'sans-serif'}}>
      <Nav/>

      {/* HERO */}
      <section style={{background:'#3a3028', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Pourquoi DadUp</p>
          <h1 style={{color:'#f0e0cc', fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            On prepare les mamans.<br/><span style={{color:'#c8a882'}}>Pas les papas.</span>
          </h1>
          <p style={{color:'#9a8470', fontSize:'18px', lineHeight:1.7, margin:0}}>Pourtant tu es la, tu veux etre present, tu veux bien faire. Il te faut un outil concu pour toi.</p>
        </div>
      </section>

      {/* LE CONSTAT */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center'}}>
          <div>
            <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Le constat</p>
            <h2 style={{fontSize:'38px', fontWeight:800, color:'#3a3028', margin:'0 0 32px', lineHeight:1.2, fontFamily:'Georgia,serif'}}>Tu veux etre la.<br/>Mais comment ?</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              {[
                {titre:'Les livres de grossesse sont ecrits pour les mamans.', desc:"Sur 100 livres sur la grossesse, moins de 5 s'adressent aux peres. Le reste ? Ecrit pour elle. DadUp est fait pour toi."},
                {titre:"Personne n'explique ton role exact.", desc:"A la maternite, en salle de naissance, personne ne te dit quoi faire ni ou te mettre. DadUp te donne les gestes concrets, avant que ca arrive."},
                {titre:"Le post-partum reste un tabou.", desc:"Baby blues, fatigue extreme, bouleversement du couple. Personne n'en parle. DadUp te prepare a ce que tu vas vraiment vivre."},
                {titre:"L'information est dispersee partout.", desc:"Forums, YouTube, groupes Facebook. Tu perds du temps a chercher. DadUp centralise tout, personnalise a ta semaine de grossesse."},
              ].map((item, i) => (
                <div key={i} style={{display:'flex', gap:'16px', alignItems:'flex-start'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#f0e8dc', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'2px'}}>
                    <span style={{color:'#c8a882', fontSize:'14px', fontWeight:700}}>{i+1}</span>
                  </div>
                  <div>
                    <p style={{color:'#3a3028', fontSize:'15px', fontWeight:700, margin:'0 0 4px'}}>{item.titre}</p>
                    <p style={{color:'#9a8470', fontSize:'14px', margin:0, lineHeight:1.5}}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'#f8f2eb', borderRadius:'24px', height:'500px', overflow:'hidden'}}>
            <img src="/deborde.jpg" alt="Papa et bebe" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top'}}/>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{background:'#f8f2eb', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{fontSize:'32px', fontWeight:800, color:'#3a3028', lineHeight:1.3, margin:'0 0 24px', fontFamily:'Georgia,serif'}}>
            "Ce n'est pas un PDF.<br/>C'est ton tableau de bord de papa."
          </p>
          <p style={{color:'#9a8470', fontSize:'15px', margin:0}}>DadUp est une application live qui evolue avec toi, semaine apres semaine, jusqu'au premier anniversaire de bebe.</p>
        </div>
      </section>

      {/* CE QUE DADUP CHANGE */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'56px'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Ce que DadUp change</p>
          <h2 style={{fontSize:'38px', fontWeight:800, color:'#3a3028', margin:0, fontFamily:'Georgia,serif'}}>Avant / Apres DadUp</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px'}}>
          <div style={{background:'#fafafa', borderRadius:'20px', padding:'32px', border:'1px solid #eee'}}>
            <p style={{color:'#cc4444', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 20px'}}>Sans DadUp</p>
            {[
              "Tu decouvres l'accouchement sur le moment",
              "Tu cherches l'info sur des forums a 23h",
              "Le post-partum te prend par surprise",
              "Tu ne sais pas quoi acheter ni dans quel ordre",
              "Tu te sens spectateur plutot qu'acteur",
            ].map((t, i) => (
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'12px'}}>
                <span style={{color:'#cc4444', fontSize:'16px'}}>{'\u2717'}</span>
                <p style={{color:'#666', fontSize:'14px', margin:0}}>{t}</p>
              </div>
            ))}
          </div>
          <div style={{background:'#3a3028', borderRadius:'20px', padding:'32px'}}>
            <p style={{color:'#c8a882', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 20px'}}>Avec DadUp</p>
            {[
              "Tu connais chaque etape avant qu'elle arrive",
              "Tout est centralise dans ton dashboard personnel",
              "Tu comprends ce qu'elle vit et tu l'accompagnes",
              "Checklist valise, RDV, missions : rien n'est oublie",
              "Tu es present, confiant, et vraiment acteur",
            ].map((t, i) => (
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'12px'}}>
                <span style={{color:'#c8a882', fontSize:'16px'}}>{'\u2713'}</span>
                <p style={{color:'#f0e0cc', fontSize:'14px', margin:0}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CE QUE CONTIENT L'APP */}
      <section style={{background:'#f8f2eb', padding:'80px 40px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'48px'}}>
            <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Une vraie application</p>
            <h2 style={{fontSize:'38px', fontWeight:800, color:'#3a3028', margin:0, fontFamily:'Georgia,serif'}}>Ce que tu utilises chaque jour</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px'}}>
            {[
              {emoji:'📊', titre:'Dashboard live', desc:'Ta semaine en cours, le developpement de bebe, le ressenti de maman. Mis a jour automatiquement.'},
              {emoji:'📋', titre:'Checklist intelligente', desc:'Valise maternite, achats prioritaires, missions du papa. Tout cochable, tout sauvegarde.'},
              {emoji:'🧠', titre:'Psycho & preparation', desc:'38 semaines de contenus sur la paternite. Un sujet par semaine, des conseils verifies.'},
              {emoji:'📅', titre:'Suivi des RDV', desc:'Chaque consultation expliquee avant qu\'elle arrive. Ton role precis a chaque etape.'},
              {emoji:'👶', titre:'Mode post-partum', desc:'Apres la naissance, l\'app bascule automatiquement. 12 mois de suivi du developpement de bebe.'},
              {emoji:'🏥', titre:'Atelier pratique', desc:'Emmaillotage, premiers secours nourrisson, technique de bercement. Pas a pas, sans jargon.'},
            ].map((item, i) => (
              <div key={i} style={{background:'#ffffff', borderRadius:'16px', padding:'24px'}}>
                <p style={{fontSize:'28px', margin:'0 0 10px'}}>{item.emoji}</p>
                <p style={{color:'#3a3028', fontSize:'15px', fontWeight:700, margin:'0 0 6px'}}>{item.titre}</p>
                <p style={{color:'#9a8470', fontSize:'13px', lineHeight:1.6, margin:0}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'#3a3028', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f0e0cc', fontSize:'38px', fontWeight:800, margin:'0 0 12px', fontFamily:'Georgia,serif'}}>Pret a etre vraiment la ?</h2>
        <p style={{color:'#9a8470', fontSize:'16px', margin:'0 0 32px'}}>Acces immediat. Contenu personnalise. 9,99{'\u20ac'}/mois ou 79{'\u20ac'}/an.</p>
        <a href="/tarifs" style={{background:'#c8a882', color:'#1c1510', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Commencer maintenant</a>
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
