export default function TemoignagesPage() {
  const temoignages = [
    {
      prenom: 'Thomas', age: 31, ville: 'Lyon',
      semaine: 'SA 28',
      texte: "J'avais l'impression d'etre un spectateur pendant toute la grossesse. DadUp m'a donne un vrai tableau de bord. Je savais ou en etait bebe chaque semaine, ce que vivait ma partenaire, et quoi faire concrètement. A l'accouchement, j'ai su exactement quoi dire et ou me mettre. Elle me dit encore que ca a tout change.",
    },
    {
      prenom: 'Maxime', age: 28, ville: 'Paris',
      semaine: 'SA 34',
      texte: "La section psycho papa est ce qui m'a le plus marque. Chaque semaine une info verifiee, pas des conseils bateau. Et le module post-partum m'a sauve. Personne ne m'avait parle du baby blues. J'ai compris ce que vivait ma femme et j'ai pu etre la pour elle au lieu de paniquer.",
    },
    {
      prenom: 'Antoine', age: 35, ville: 'Bordeaux',
      semaine: 'SA 20',
      texte: "Ce qui m'a convaincu c'est que ca evolue avec moi. Ce n'est pas un PDF qu'on lit une fois. C'est une app que j'ouvrais plusieurs fois par semaine. Le dashboard se mettait a jour, les contenus changeaient. J'etais dans la course toute la grossesse, pas juste le week-end de la naissance.",
    },
    {
      prenom: 'Kevin', age: 26, ville: 'Marseille',
      semaine: 'SA 12',
      texte: "Premier enfant, je ne savais vraiment pas par ou commencer. Le calendrier des RDV m'a permis de comprendre chaque etape avant qu'elle arrive. Ma conjointe etait bluffee que je connaisse tout ca. Et le jour de l'accouchement, j'avais deja lu le guide en detail. Je savais quoi faire.",
    },
    {
      prenom: 'Julien', age: 33, ville: 'Nantes',
      semaine: 'SA 36',
      texte: "La valise etait prete trois semaines avant. On n'a rien oublie. La checklist interactive c'est bete mais ca change tout quand tu fais ca pour la premiere fois. Le jour du depart j'etais stresse comme tout le monde, mais au moins j'etais organise. Elle a pu se concentrer sur elle.",
    },
    {
      prenom: 'Nicolas', age: 30, ville: 'Toulouse',
      semaine: 'SA 40',
      texte: "Bebe est arrive. Je voulais juste dire merci. Le guide accouchement m'a donne confiance. Je savais ou me mettre, quoi lui dire pendant les contractions, comment parler a l'equipe medicale. J'etais la, vraiment present, du debut a la fin. C'est le plus beau jour de ma vie.",
    },
  ];

  const stats = [
    {val:'4.9/5', label:'Note moyenne'},
    {val:'97%', label:'Se sentent mieux prepares'},
    {val:'94%', label:'Recommandent DadUp'},
    {val:'12 mois', label:'D'accompagnement continu'},
  ];

  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:'sans-serif'}}>
      <Nav/>

      {/* HERO */}
      <section style={{background:'#3a3028', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Temoignages</p>
          <h1 style={{color:'#f0e0cc', fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            Des papas qui ont<br/><span style={{color:'#c8a882'}}>decide de se preparer.</span>
          </h1>
          <p style={{color:'#9a8470', fontSize:'18px', lineHeight:1.7, margin:0}}>Ce qu'ils ont vecu. Ce que ca a change.</p>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:'#f8f2eb', padding:'48px 40px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'32px', textAlign:'center'}}>
          {stats.map((s, i) => (
            <div key={i}>
              <p style={{color:'#3a3028', fontSize:'36px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif'}}>{s.val}</p>
              <p style={{color:'#9a8470', fontSize:'13px', margin:0}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px'}}>
          {temoignages.map((t, i) => (
            <div key={i} style={{background: i === 5 ? '#3a3028' : '#f8f2eb', borderRadius:'20px', padding:'32px'}}>
              <div style={{display:'flex', gap:'4px', marginBottom:'16px'}}>
                {'★★★★★'.split('').map((s, j) => (
                  <span key={j} style={{color:'#c8a882', fontSize:'16px'}}>{s}</span>
                ))}
              </div>
              <p style={{color: i === 5 ? '#f0e0cc' : '#3a3028', fontSize:'15px', lineHeight:1.7, margin:'0 0 20px', fontStyle:'italic'}}>"{t.texte}"</p>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <p style={{color: i === 5 ? '#c8a882' : '#3a3028', fontWeight:700, fontSize:'14px', margin:'0 0 2px'}}>{t.prenom}, {t.age} ans</p>
                  <p style={{color: i === 5 ? '#9a8470' : '#9a8470', fontSize:'12px', margin:0}}>{t.ville}</p>
                </div>
                <span style={{background: i === 5 ? '#6b5c4e' : '#e8ddd4', color: i === 5 ? '#c8a882' : '#6b5c4e', fontSize:'11px', fontWeight:700, padding:'4px 12px', borderRadius:'20px'}}>{t.semaine}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section style={{background:'#3a3028', padding:'64px 40px'}}>
        <div style={{maxWidth:'700px', margin:'0 auto', textAlign:'center'}}>
          <p style={{fontSize:'28px', fontWeight:800, color:'#f0e0cc', lineHeight:1.4, margin:'0 0 16px', fontFamily:'Georgia,serif'}}>
            "Bebe est arrive. J'etais la, pleinement present, du debut a la fin."
          </p>
          <p style={{color:'#9a8470', fontSize:'14px', margin:0}}>Nicolas, 30 ans {'\u2014'} Toulouse {'\u2014'} Papa depuis la SA 40</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#3a3028', fontSize:'38px', fontWeight:800, margin:'0 0 12px', fontFamily:'Georgia,serif'}}>A ton tour.</h2>
        <p style={{color:'#9a8470', fontSize:'16px', margin:'0 0 8px'}}>Rejoins les papas qui se preparent vraiment.</p>
        <p style={{color:'#9a8470', fontSize:'14px', margin:'0 0 32px'}}>9,99{'\u20ac'}/mois ou 79{'\u20ac'}/an {'\u00b7'} Sans engagement {'\u00b7'} Acces immediat</p>
        <a href="/tarifs" style={{background:'#3a3028', color:'#f0e0cc', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Commencer maintenant</a>
        <p style={{color:'#c8b8a8', fontSize:'12px', margin:'16px 0 0'}}>Paiement securise par Stripe</p>
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
