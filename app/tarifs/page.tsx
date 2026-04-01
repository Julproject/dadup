'use client';

export default function TarifsPage() {
  const goToStripe = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert('Erreur : ' + err);
    }
  };

  const faq = [
    {
      q: "Est-ce que je peux resilier quand je veux ?",
      r: "Oui. DadUp est sans engagement. Tu peux resilier a tout moment depuis ton espace personnel. Tu gardes l'acces jusqu'a la fin de ta periode."
    },
    {
      q: "Que se passe-t-il apres la naissance ?",
      r: "Ton espace passe automatiquement en mode post-partum. Le contenu evolue pour couvrir les 12 premiers mois avec bebe. Tu ne perds rien."
    },
    {
      q: "Mes donnees sont-elles en securite ?",
      r: "On ne stocke que ton email et ta date d'accouchement. Aucune donnee n'est revendue. Paiement securise par Stripe."
    },
    {
      q: "Est-ce que ma partenaire peut aussi utiliser DadUp ?",
      r: "DadUp est concu pour le papa. Mais rien ne t'empeche de partager certains contenus avec ta partenaire."
    },
    {
      q: "Le contenu est-il verifie medicalement ?",
      r: "Le contenu de DadUp est base sur les recommandations de la HAS et des societes savantes. Il ne remplace pas l'avis d'un medecin ou d'une sage-femme."
    },
    {
      q: "J'ai deja paye mais je n'arrive pas a me connecter.",
      r: "Va sur la page de connexion et entre l'email utilise lors de ton paiement. Tu recevras un lien par email pour creer ton mot de passe."
    },
  ];

  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:'sans-serif'}}>
      <Nav/>

      {/* HERO */}
      <section style={{background:'#3a3028', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Tarifs</p>
          <h1 style={{color:'#f0e0cc', fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            Simple.<br/><span style={{color:'#c8a882'}}>Transparent.</span>
          </h1>
          <p style={{color:'#9a8470', fontSize:'18px', lineHeight:1.7, margin:0}}>Acces complet a l'application. Choisis la formule qui te correspond.</p>
        </div>
      </section>

      {/* PRICING */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'start'}}>

          {/* 2 cartes prix */}
          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>

            {/* Mensuel */}
            <div style={{background:'#f8f2eb', borderRadius:'24px', padding:'36px', border:'1px solid #e8ddd4'}}>
              <p style={{color:'#9a8470', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Mensuel</p>
              <p style={{color:'#3a3028', fontSize:'52px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1}}>9,99{'\u20ac'}</p>
              <p style={{color:'#9a8470', fontSize:'14px', margin:'0 0 28px'}}>par mois {'\u00b7'} sans engagement</p>
              <button onClick={goToStripe} style={{width:'100%', background:'#3a3028', color:'#f0e0cc', border:'none', padding:'16px', borderRadius:'32px', fontSize:'15px', fontWeight:700, cursor:'pointer'}}>
                Commencer au mois
              </button>
            </div>

            {/* Annuel - recommande */}
            <div style={{background:'#3a3028', borderRadius:'24px', padding:'36px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'16px', right:'16px', background:'#c8a882', color:'#1c1510', fontSize:'11px', fontWeight:800, padding:'4px 12px', borderRadius:'20px', letterSpacing:'1px'}}>
                MEILLEURE VALEUR
              </div>
              <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Annuel</p>
              <p style={{color:'#f0e0cc', fontSize:'52px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1}}>79{'\u20ac'}</p>
              <p style={{color:'#9a8470', fontSize:'14px', margin:'0 0 4px'}}>par an {'\u00b7'} soit 6,58{'\u20ac'}/mois</p>
              <p style={{color:'#c8a882', fontSize:'13px', fontWeight:600, margin:'0 0 28px'}}>Economie de 30% vs mensuel</p>
              <div style={{display:'flex', flexDirection:'column', gap:'10px', marginBottom:'28px'}}>
                {[
                  "Acces complet a toute l'application",
                  "De la 1re echographie au 1er anniversaire",
                  "Dashboard personnalise a ta DPA",
                  "Mode post-partum automatique",
                  "Valise maternite et checklist interactives",
                  "Atelier pratique : gestes et premiers secours",
                  "Acces sur tous tes appareils",
                ].map((f) => (
                  <div key={f} style={{display:'flex', gap:'10px', alignItems:'center'}}>
                    <div style={{width:'18px', height:'18px', borderRadius:'50%', background:'#c8a882', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <span style={{color:'#3a3028', fontSize:'10px', fontWeight:700}}>{'\u2713'}</span>
                    </div>
                    <p style={{color:'#f0e0cc', fontSize:'13px', margin:0}}>{f}</p>
                  </div>
                ))}
              </div>
              <button onClick={goToStripe} style={{width:'100%', background:'#c8a882', color:'#1c1510', border:'none', padding:'18px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer'}}>
                Commencer {'\u2014'} 79{'\u20ac'}/an
              </button>
              <p style={{color:'#6b5c4e', fontSize:'12px', margin:'12px 0 0', textAlign:'center'}}>Paiement securise par Stripe</p>
            </div>
          </div>

          {/* Comparaison */}
          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            <div style={{background:'#f8f2eb', borderRadius:'20px', padding:'28px'}}>
              <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Mis en perspective</p>
              <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
                {[
                  {label:"1 livre de grossesse", prix:"15-25\u20ac", note:"pour la maman seulement"},
                  {label:"1 seance preparation accouchement", prix:"80-150\u20ac", note:"souvent pour les couples"},
                  {label:"1 consultation sage-femme", prix:"50-90\u20ac", note:"30 minutes"},
                  {label:"DadUp, de la grossesse au 1er anniversaire", prix:"79\u20ac", note:"tout inclus, toute l'annee", highlight:true},
                ].map((item, i) => (
                  <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding: item.highlight ? '14px 16px' : '12px 0', borderBottom: i < 3 ? '1px solid #e8ddd4' : 'none', background: item.highlight ? '#3a3028' : 'transparent', borderRadius: item.highlight ? '12px' : '0'}}>
                    <div>
                      <p style={{fontSize:'13px', fontWeight:600, color: item.highlight ? '#f0e0cc' : '#3a3028', margin:'0 0 2px'}}>{item.label}</p>
                      <p style={{fontSize:'12px', color: item.highlight ? '#c8a882' : '#9a8470', margin:0}}>{item.note}</p>
                    </div>
                    <p style={{fontSize:'16px', fontWeight:800, color: item.highlight ? '#c8a882' : '#3a3028', margin:0}}>{item.prix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:'#f8f2eb', borderRadius:'20px', padding:'28px'}}>
              <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Satisfaction garantie</p>
              <p style={{color:'#6b5c4e', fontSize:'14px', lineHeight:1.6, margin:'0 0 16px'}}>Si DadUp ne t'apporte pas ce que tu espérais dans les 7 premiers jours, on te rembourse. Sans question.</p>
              <p style={{color:'#9a8470', fontSize:'12px', margin:0}}>{'\ud83d\udd12'} Paiement securise {'\u00b7'} Donnees protegees {'\u00b7'} RGPD</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:'#f8f2eb', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
          <h2 style={{fontSize:'38px', fontWeight:800, color:'#3a3028', margin:'0 0 48px', textAlign:'center', fontFamily:'Georgia,serif'}}>Questions frequentes</h2>
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
            {faq.map((item, i) => (
              <div key={i} style={{borderBottom:'1px solid #e8ddd4', padding:'24px 0'}}>
                <p style={{color:'#3a3028', fontSize:'16px', fontWeight:700, margin:'0 0 8px'}}>{item.q}</p>
                <p style={{color:'#9a8470', fontSize:'14px', lineHeight:1.6, margin:0}}>{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'#3a3028', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f0e0cc', fontSize:'38px', fontWeight:800, margin:'0 0 12px', fontFamily:'Georgia,serif'}}>Pret a commencer ?</h2>
        <p style={{color:'#9a8470', fontSize:'16px', margin:'0 0 32px'}}>Rejoins les papas qui se preparent vraiment.</p>
        <button onClick={goToStripe} style={{background:'#c8a882', color:'#1c1510', border:'none', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, cursor:'pointer'}}>
          Commencer {'\u2014'} 79{'\u20ac'}/an
        </button>
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
