'use client';

export default function TarifsPage() {
  const goToStripe = async () => {
    try {
      const res = await fetch('/api/checkout', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({})});
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch(e) { alert('Erreur reseau. Reessaie.'); }
  };

  const faq = [
    {q:"Est-ce que je peux resilier quand je veux ?", r:"Oui. DadUp est sans engagement. Tu peux resilier a tout moment depuis ton espace personnel. Tu gardes l'acces jusqu'a la fin de ta periode."},
    {q:"Que se passe-t-il apres la naissance ?", r:"Ton espace passe automatiquement en mode post-partum. Le contenu evolue pour couvrir les 12 premiers mois avec bebe. Tu ne perds rien."},
    {q:"Mes donnees sont-elles en securite ?", r:"On ne stocke que ton email et ta date d'accouchement. Aucune donnee n'est revendue. Paiement securise par Stripe."},
    {q:"Est-ce que ma partenaire peut utiliser DadUp ?", r:"DadUp est concu pour le papa. Mais rien ne t'empeche de partager certains contenus avec ta partenaire."},
    {q:"Le contenu est-il verifie medicalement ?", r:"Le contenu de DadUp est base sur les recommandations de la HAS et des societes savantes. Il ne remplace pas l'avis d'un medecin ou d'une sage-femme."},
    {q:"J'ai deja paye mais je n'arrive pas a me connecter.", r:"Va sur la page de connexion et entre l'email utilise lors du paiement. Tu recevras un lien pour acceder a ton espace."},
  ];

  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <Nav/>

      <section style={{background:'#1e2535', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a060', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Tarifs</p>
          <h1 style={{color:'#f7f5f0', fontSize:'52px', fontWeight:900, margin:'0 0 24px', lineHeight:1.1, letterSpacing:'-1px'}}>
            Simple.<br/><span style={{color:'#c8a060'}}>Transparent.</span>
          </h1>
          <p style={{color:'#9aa0a8', fontSize:'18px', lineHeight:1.7, margin:0}}>Tout est inclus. Acces immediat apres paiement.</p>
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'960px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginBottom:'40px'}}>

          <div style={{border:'1.5px solid #f0ede8', borderRadius:'24px', padding:'40px', background:'#f7f5f0'}}>
            <p style={{color:'#9aa0a8', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 20px'}}>Mensuel</p>
            <p style={{color:'#1e2535', fontSize:'52px', fontWeight:900, margin:'0 0 4px', letterSpacing:'-1px', lineHeight:1}}>6,99 &#8364;</p>
            <p style={{color:'#9aa0a8', fontSize:'14px', margin:'0 0 32px'}}>par mois, sans engagement</p>
            <button onClick={goToStripe} style={{width:'100%', background:'#1e2535', color:'#ffffff', border:'none', padding:'16px', borderRadius:'32px', fontSize:'15px', fontWeight:700, cursor:'pointer'}}>
              Commencer au mois
            </button>
          </div>

          <div style={{background:'#1e2535', borderRadius:'24px', padding:'40px', position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', top:'18px', right:'18px', background:'#c8a060', color:'#1e2535', fontSize:'10px', fontWeight:800, padding:'4px 10px', borderRadius:'20px', letterSpacing:'1px'}}>RECOMMANDE</div>
            <p style={{color:'#c8a060', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 20px'}}>Annuel</p>
            <p style={{color:'#f7f5f0', fontSize:'52px', fontWeight:900, margin:'0 0 4px', letterSpacing:'-1px', lineHeight:1}}>59,99 &#8364;</p>
            <p style={{color:'rgba(255,255,255,0.4)', fontSize:'14px', margin:'0 0 4px'}}>par an, soit 5 &#8364; par mois</p>
            <p style={{color:'#c8a060', fontSize:'13px', fontWeight:600, margin:'0 0 28px'}}>Economie de 30% par rapport au mensuel</p>
            <div style={{display:'flex', flexDirection:'column', gap:'10px', marginBottom:'28px'}}>
              {[
                "Acces complet a toute l'application",
                "De la 1re echographie au 1er anniversaire",
                "Dashboard personnalise a ta date d'accouchement",
                "Mode post-partum automatique apres la naissance",
                "Valise maternite et checklists interactives",
                "Ateliers pratiques et premiers secours nourrisson",
                "Acces sur tous tes appareils",
              ].map((f,i)=>(
                <div key={i} style={{display:'flex', gap:'10px', alignItems:'flex-start'}}>
                  <span style={{color:'#c8a060', fontSize:'14px', marginTop:'1px', flexShrink:0}}>&#x2713;</span>
                  <p style={{color:'#f7f5f0', fontSize:'13px', margin:0, lineHeight:1.5}}>{f}</p>
                </div>
              ))}
            </div>
            <button onClick={goToStripe} style={{width:'100%', background:'#c8a060', color:'#1e2535', border:'none', padding:'18px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer'}}>
              Commencer - 59,99 &#8364;/an
            </button>
            <p style={{color:'rgba(255,255,255,0.25)', fontSize:'12px', margin:'12px 0 0', textAlign:'center'}}>Paiement securise par Stripe</p>
          </div>
        </div>

        <div style={{background:'#f7f5f0', borderRadius:'20px', padding:'32px', marginBottom:'20px'}}>
          <p style={{color:'#2E5F8A', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 20px'}}>Pour remettre en perspective</p>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0', borderBottom:'1px solid #f0ede8'}}>
            <div><p style={{fontSize:'14px', fontWeight:600, color:'#1e2535', margin:'0 0 2px'}}>1 livre de grossesse</p><p style={{fontSize:'12px', color:'#9aa0a8', margin:0}}>pour la maman seulement</p></div>
            <p style={{fontSize:'16px', fontWeight:800, color:'#1e2535', margin:0, flexShrink:0, marginLeft:'16px'}}>15-25 &#8364;</p>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0', borderBottom:'1px solid #f0ede8'}}>
            <div><p style={{fontSize:'14px', fontWeight:600, color:'#1e2535', margin:'0 0 2px'}}>1 seance preparation accouchement</p><p style={{fontSize:'12px', color:'#9aa0a8', margin:0}}>souvent pour les deux parents</p></div>
            <p style={{fontSize:'16px', fontWeight:800, color:'#1e2535', margin:0, flexShrink:0, marginLeft:'16px'}}>80-150 &#8364;</p>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0', borderBottom:'1px solid #f0ede8'}}>
            <div><p style={{fontSize:'14px', fontWeight:600, color:'#1e2535', margin:'0 0 2px'}}>1 consultation sage-femme</p><p style={{fontSize:'12px', color:'#9aa0a8', margin:0}}>environ 30 minutes</p></div>
            <p style={{fontSize:'16px', fontWeight:800, color:'#1e2535', margin:0, flexShrink:0, marginLeft:'16px'}}>50-90 &#8364;</p>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', background:'#1A3D5C', borderRadius:'12px', marginTop:'8px'}}>
            <div><p style={{fontSize:'14px', fontWeight:600, color:'#f7f5f0', margin:'0 0 2px'}}>DadUp, grossesse + 1er anniversaire</p><p style={{fontSize:'12px', color:'#c8a060', margin:0}}>tout inclus, toute l'annee</p></div>
            <p style={{fontSize:'16px', fontWeight:800, color:'#c8a060', margin:0, flexShrink:0, marginLeft:'16px'}}>59,99 &#8364;</p>
          </div>
        </div>

        <div style={{background:'#E4F5EC', borderRadius:'16px', padding:'24px', textAlign:'center'}}>
          <p style={{color:'#0D6B40', fontSize:'15px', fontWeight:700, margin:'0 0 6px'}}>Satisfait ou rembourse dans les 7 premiers jours</p>
          <p style={{color:'#0D6B40', fontSize:'13px', margin:0, opacity:0.75}}>Si DadUp ne repond pas a tes attentes, on te rembourse. Sans question.</p>
        </div>
      </section>

      <section style={{background:'#f7f5f0', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
          <h2 style={{fontSize:'32px', fontWeight:900, color:'#1e2535', margin:'0 0 40px', textAlign:'center', letterSpacing:'-0.5px'}}>Questions frequentes</h2>
          <div style={{display:'flex', flexDirection:'column'}}>
            {faq.map((item,i)=>(
              <div key={i} style={{borderBottom:'1px solid #f0ede8', padding:'24px 0'}}>
                <p style={{color:'#1e2535', fontSize:'15px', fontWeight:700, margin:'0 0 8px'}}>{item.q}</p>
                <p style={{color:'#9aa0a8', fontSize:'14px', lineHeight:1.65, margin:0}}>{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:'#1e2535', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f7f5f0', fontSize:'38px', fontWeight:900, margin:'0 0 12px', letterSpacing:'-0.5px'}}>Pret a commencer ?</h2>
        <p style={{color:'#9aa0a8', fontSize:'16px', margin:'0 0 32px'}}>Rejoins les papas qui se preparent vraiment.</p>
        <button onClick={goToStripe} style={{background:'#c8a060', color:'#1e2535', border:'none', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, cursor:'pointer'}}>
          Commencer - 59,99 &#8364;/an
        </button>
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
