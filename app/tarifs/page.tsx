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
      r: "Oui. DadUp est sans engagement. Tu peux resilier a tout moment depuis ton espace personnel. Tu gardes l'acces jusqu'a la fin de ta periode annuelle."
    },
    {
      q: "Que se passe-t-il apres la naissance ?",
      r: "Ton espace passe automatiquement en mode post-partum. Le contenu evolue pour couvrir les premieres semaines avec bebe — sommeil, pleurs, allaitement, vie de couple."
    },
    {
      q: "Mes donnees sont-elles en securite ?",
      r: "On ne stocke que ton email et ta date d'accouchement. Aucune donnee n'est revendue. Paiement securise par Stripe."
    },
    {
      q: "Est-ce que ma partenaire peut aussi utiliser DadUp ?",
      r: "DadUp est concu pour le papa. Mais rien ne t'empeche de partager certains contenus avec ta partenaire !"
    },
    {
      q: "Le contenu est-il verifie medicalement ?",
      r: "Le contenu de DadUp est base sur les recommandations de la HAS et des societes savantes. Il ne remplace pas l'avis d'un medecin ou d'une sage-femme."
    },
    {
      q: "J'ai deja paye sur Stripe mais je n'arrive pas a me connecter.",
      r: "Va sur la page de connexion et entre l'email utilise lors de ton paiement. Tu recevras un code par email pour acceder a ton espace."
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
          <p style={{color:'#9a8470', fontSize:'18px', lineHeight:1.7, margin:0}}>Une offre. Un prix. Tout inclus.</p>
        </div>
      </section>

      {/* PRICING */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'start'}}>

          {/* Card prix */}
          <div style={{background:'#3a3028', borderRadius:'28px', padding:'48px'}}>
            <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Acces annuel complet</p>
            <p style={{color:'#f0e0cc', fontSize:'72px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1}}>29,99€</p>
            <p style={{color:'#9a8470', fontSize:'15px', margin:'0 0 40px'}}>par an · sans engagement</p>
            <div style={{display:'flex', flexDirection:'column', gap:'14px', marginBottom:'40px'}}>
              {[
                "8 modules complets",
                "De la grossesse au post-partum",
                "Personnalise a ta date d'accouchement",
                "Idees mensuelles pour ta partenaire",
                "Valise maternite interactive",
                "Acces sur tous tes appareils",
                "Mode post-partum automatique",
              ].map((f) => (
                <div key={f} style={{display:'flex', gap:'12px', alignItems:'center'}}>
                  <div style={{width:'22px', height:'22px', borderRadius:'50%', background:'#c8a882', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                    <span style={{color:'#3a3028', fontSize:'12px', fontWeight:700}}>✓</span>
                  </div>
                  <p style={{color:'#f0e0cc', fontSize:'14px', margin:0}}>{f}</p>
                </div>
              ))}
            </div>
            <button onClick={goToStripe} style={{width:'100%', background:'#c8a882', color:'#1c1510', border:'none', padding:'18px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer'}}>
              Commencer maintenant
            </button>
            <p style={{color:'#6b5c4e', fontSize:'12px', margin:'12px 0 0', textAlign:'center'}}>Paiement securise par Stripe</p>
          </div>

          {/* Comparaison */}
          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            <div style={{background:'#f8f2eb', borderRadius:'20px', padding:'28px'}}>
              <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Pourquoi 29,99€/an ?</p>
              <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
                {[
                  {label:"1 livre de grossesse", prix:"15-25€", note:"pour la maman seulement"},
                  {label:"1 seance preparation accouchement", prix:"80-150€", note:"souvent pour les couples"},
                  {label:"1 consultation sage-femme", prix:"50-90€", note:"30 minutes"},
                  {label:"DadUp — toute la grossesse", prix:"29,99€", note:"tout inclus, toute l'annee", highlight:true},
                ].map((item, i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background: item.highlight ? '#3a3028' : '#fff', borderRadius:'12px', border: item.highlight ? 'none' : '1px solid #e8ddd4'}}>
                    <div>
                      <p style={{color: item.highlight ? '#f0e0cc' : '#3a3028', fontSize:'13px', fontWeight:700, margin:0}}>{item.label}</p>
                      <p style={{color: item.highlight ? '#c8a882' : '#9a8470', fontSize:'11px', margin:'2px 0 0'}}>{item.note}</p>
                    </div>
                    <p style={{color: item.highlight ? '#c8a882' : '#6b5c4e', fontSize:'15px', fontWeight:800, margin:0}}>{item.prix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:'#f8f2eb', borderRadius:'20px', padding:'28px'}}>
              <p style={{color:'#3a3028', fontSize:'16px', fontWeight:800, margin:'0 0 8px', fontFamily:'Georgia,serif'}}>Satisfaction garantie</p>
              <p style={{color:'#9a8470', fontSize:'14px', lineHeight:1.6, margin:'0 0 16px'}}>Si DadUp ne t'apporte pas ce que tu esperais dans les 7 premiers jours, on te rembourse. Sans question.</p>
              <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                <span style={{fontSize:'20px'}}>🔒</span>
                <p style={{color:'#6b5c4e', fontSize:'13px', margin:0, fontWeight:600}}>Paiement securise · Donnees protegees · RGPD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:'#f8f2eb', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'48px'}}>
            <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>FAQ</p>
            <h2 style={{fontSize:'38px', fontWeight:800, color:'#3a3028', margin:0, fontFamily:'Georgia,serif'}}>Questions frequentes</h2>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {faq.map((item, i) => (
              <div key={i} style={{background:'#fff', borderRadius:'16px', padding:'24px', border:'1px solid #e8ddd4'}}>
                <p style={{color:'#3a3028', fontSize:'15px', fontWeight:700, margin:'0 0 10px'}}>{item.q}</p>
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
        <button onClick={goToStripe} style={{background:'#c8a882', color:'#1c1510', border:'none', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, cursor:'pointer'}}>Commencer — 29,99€/an</button>
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
