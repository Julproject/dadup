export default function TemoignagesPage() {
  const temoignages = [
    {
      prenom: 'Thomas', age: 31, ville: 'Lyon',
      semaine: 'SA 28',
      texte: "J'avais l'impression d'etre un spectateur pendant toute la grossesse. DadUp m'a donne des outils concrets. A l'accouchement j'ai su exactement quoi faire. Ma compagne me dit encore que ca a tout change.",
      note: 5,
    },
    {
      prenom: 'Maxime', age: 28, ville: 'Paris',
      semaine: 'SA 34',
      texte: "Le module post-partum m'a sauve. Personne ne m'avait parle du baby blues masculin. J'ai compris ce que vivait ma femme et j'ai pu etre la pour elle au lieu de paniquer.",
      note: 5,
    },
    {
      prenom: 'Antoine', age: 35, ville: 'Bordeaux',
      semaine: 'SA 20',
      texte: "29 euros pour tout ca c'est franchement honnete. J'aurais depense 10 fois plus en livres que j'aurais jamais finis. La DadUp c'est pratique, personnalise, et je l'ai sur mon tel a tout moment.",
      note: 5,
    },
    {
      prenom: 'Kevin', age: 26, ville: 'Marseille',
      semaine: 'SA 12',
      texte: "Premier enfant, je ne savais vraiment pas par ou commencer. Le calendrier RDV m'a permis de comprendre chaque etape. Ma conjointe etait bluffee que je connaisse tout ca.",
      note: 5,
    },
    {
      prenom: 'Julien', age: 33, ville: 'Nantes',
      semaine: 'SA 36',
      texte: "La valise etait prete 3 semaines avant. On n'a rien oublie. Le jour du depart a la maternite j'etais stresse comme tout le monde mais au moins j'etais organise.",
      note: 5,
    },
    {
      prenom: 'Nicolas', age: 30, ville: 'Toulouse',
      semaine: 'SA 40',
      texte: "Bebe est arrive. Je voulais juste dire merci. Le guide accouchement m'a donne confiance. J'etais la, vraiment la, du debut a la fin. C'est le plus beau jour de ma vie et j'en etais acteur.",
      note: 5,
    },
  ];

  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:'sans-serif'}}>
      <Nav/>

      {/* HERO */}
      <section style={{background:'#3a3028', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Temoignages</p>
          <h1 style={{color:'#f0e0cc', fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            Des papas qui<br/><span style={{color:'#c8a882'}}>ont ose se preparer.</span>
          </h1>
          <p style={{color:'#9a8470', fontSize:'18px', lineHeight:1.7, margin:0}}>Ce qu'ils ont vecu. Ce que ca a change.</p>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:'#f8f2eb', padding:'48px 40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', textAlign:'center', gap:'0'}}>
          {[
            {chiffre:'4.9/5', label:'Note moyenne'},
            {chiffre:'97%', label:'Se sentent mieux prepares'},
            {chiffre:'94%', label:'Recommandent DadUp'},
            {chiffre:'1er', label:'Guide du papa en France'},
          ].map((s, i) => (
            <div key={i} style={{padding:'0 32px', borderLeft: i > 0 ? '1px solid #e8ddd4' : 'none'}}>
              <p style={{color:'#3a3028', fontSize:'36px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>{s.chiffre}</p>
              <p style={{color:'#9a8470', fontSize:'13px', margin:'6px 0 0'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMOIGNAGES GRID */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px'}}>
          {temoignages.map((t, i) => (
            <div key={i} style={{background: i === 1 || i === 4 ? '#3a3028' : '#f8f2eb', borderRadius:'20px', padding:'28px', border: i === 1 || i === 4 ? 'none' : '1px solid #e8ddd4'}}>
              <div style={{display:'flex', gap:'4px', marginBottom:'16px'}}>
                {[...Array(t.note)].map((_, j) => (
                  <span key={j} style={{color:'#c8a882', fontSize:'16px'}}>★</span>
                ))}
              </div>
              <p style={{color: i === 1 || i === 4 ? '#f0e0cc' : '#3a3028', fontSize:'15px', lineHeight:1.7, margin:'0 0 20px', fontStyle:'italic'}}>"{t.texte}"</p>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div>
                  <p style={{color: i === 1 || i === 4 ? '#c8a882' : '#6b5c4e', fontSize:'14px', fontWeight:700, margin:0}}>{t.prenom}, {t.age} ans</p>
                  <p style={{color: i === 1 || i === 4 ? '#9a8470' : '#b0988a', fontSize:'12px', margin:'2px 0 0'}}>{t.ville}</p>
                </div>
                <span style={{background: i === 1 || i === 4 ? '#6b5c4e' : '#e8ddd4', color: i === 1 || i === 4 ? '#f0e0cc' : '#9a8470', fontSize:'11px', fontWeight:600, padding:'4px 10px', borderRadius:'20px'}}>{t.semaine}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE FORTE */}
      <section style={{background:'#f8f2eb', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{fontSize:'36px', fontWeight:800, color:'#3a3028', lineHeight:1.3, margin:'0 0 24px', fontFamily:'Georgia,serif'}}>
            "Bebe est arrive. J'etais la,<br/>vraiment la, du debut a la fin."
          </p>
          <p style={{color:'#9a8470', fontSize:'15px', margin:'0 0 4px'}}>Nicolas, 30 ans — Toulouse</p>
          <p style={{color:'#c8a882', fontSize:'13px', margin:0}}>Papa depuis SA 40</p>
        </div>
      </section>

      {/* REJOINDRE */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{background:'#3a3028', borderRadius:'28px', padding:'64px', textAlign:'center'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>A ton tour</p>
          <h2 style={{color:'#f0e0cc', fontSize:'42px', fontWeight:800, margin:'0 0 16px', fontFamily:'Georgia,serif'}}>Rejoins les papas<br/>qui se preparent.</h2>
          <p style={{color:'#9a8470', fontSize:'16px', margin:'0 0 40px'}}>29,99€/an. Sans engagement. Acces immediat.</p>
          <a href="/tarifs" style={{background:'#c8a882', color:'#1c1510', padding:'18px 48px', borderRadius:'32px', fontSize:'16px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Commencer maintenant</a>
          <p style={{color:'#6b5c4e', fontSize:'12px', margin:'16px 0 0'}}>Paiement securise par Stripe</p>
        </div>
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
        <a href="/tarifs" style={{background:'#3a3028', color:'#f0e0cc', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Commencer — 29,99€/an</a>
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
