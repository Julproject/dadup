'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  orange: '#FFF0E6', green: '#E4F5EC', amber: '#FFF7E0',
};

const FAQ = [
  {q:"Est-ce que je peux résilier quand je veux ?", r:"Oui. DadUp est sans engagement. Tu peux résilier à tout moment depuis ton espace personnel. Tu gardes l'accès jusqu'à la fin de ta période annuelle."},
  {q:"Que se passe-t-il après la naissance ?", r:"Ton espace passe automatiquement en mode post-partum. Le contenu évolue pour couvrir les premières semaines avec bébé."},
  {q:"Mes données sont-elles en sécurité ?", r:"On ne stocke que ton email et ta date d'accouchement. Aucune donnée n'est revendue. Paiement sécurisé par Stripe."},
  {q:"Est-ce que ma partenaire peut aussi utiliser DadUp ?", r:"DadUp est conçu pour le papa. Mais rien ne t'empêche de partager certains contenus avec ta partenaire !"},
  {q:"Le contenu est-il vérifié médicalement ?", r:"Le contenu de DadUp est basé sur les recommandations de la HAS. Il ne remplace pas l'avis d'un médecin ou d'une sage-femme."},
  {q:"J'ai déjà payé mais je n'arrive pas à me connecter.", r:"Va sur la page de connexion et entre l'email utilisé lors de ton paiement. Tu recevras un code par email pour accéder à ton espace."},
];

export default function TarifsPage() {
  const goToStripe = async () => {
    try {
      const res = await fetch('/api/checkout', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({})});
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { alert('Erreur : ' + err); }
  };

  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .tg{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:start;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          .tg{grid-template-columns:1fr!important;}
          .sp{padding:48px 20px!important;}
          nav{padding:0 20px!important;}
          h1{font-size:36px!important;}
          h2{font-size:26px!important;}
          .prix{font-size:52px!important;}
        }
      `}</style>

      <nav style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:'0 40px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'68px',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'48px'}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="34" height="34"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{fontWeight:800,color:C.dark,fontSize:'20px'}}>DadUp</span>
          </a>
          <div className="nl" style={{gap:'4px'}}>
            <a href="/pourquoi" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:C.dark,fontSize:'14px',fontWeight:700,padding:'8px 14px',borderRadius:'8px',textDecoration:'none',borderBottom:`2px solid ${C.gold}`}}>Tarifs</a>
            <a href="/temoignages" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Témoignages</a>
          </div>
        </div>
        <div className="nc" style={{alignItems:'center',gap:'16px'}}>
          <a href="/login" style={{color:C.dark,fontSize:'14px',fontWeight:600,textDecoration:'none'}}>Se connecter</a>
          <a href="/tarifs" style={{background:C.dark,color:C.white,padding:'11px 22px',borderRadius:'32px',fontSize:'13px',fontWeight:700,textDecoration:'none'}}>Commencer — 29,99€/an</a>
        </div>
      </nav>

      <section style={{background:C.dark,padding:'80px 40px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Tarifs</p>
          <h1 style={{color:C.white,fontSize:'52px',fontWeight:800,margin:'0 0 24px',lineHeight:1.1}}>
            Simple.<br/><span style={{color:C.gold}}>Transparent.</span>
          </h1>
          <p style={{color:'#6a7585',fontSize:'18px',lineHeight:1.7,margin:0}}>Une offre. Un prix. Tout inclus.</p>
        </div>
      </section>

      <section className="sp" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div className="tg">
          <div style={{background:C.dark,borderRadius:'28px',padding:'48px'}}>
            <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Accès annuel complet</p>
            <p className="prix" style={{color:C.white,fontSize:'72px',fontWeight:800,margin:'0 0 4px',lineHeight:1}}>29,99€</p>
            <p style={{color:'#6a7585',fontSize:'15px',margin:'0 0 40px'}}>par an · sans engagement</p>
            <div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'40px'}}>
              {[
                "8 modules complets",
                "De la grossesse au post-partum",
                "Personnalisé à ta date d'accouchement",
                "Idées mensuelles pour ta partenaire",
                "Valise maternité interactive",
                "Accès sur tous tes appareils",
                "Mode post-partum automatique",
              ].map(f=>(
                <div key={f} style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'50%',background:C.gold,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}>
                    <span style={{color:C.dark,fontSize:'12px',fontWeight:700}}>✓</span>
                  </div>
                  <p style={{color:C.white,fontSize:'14px',margin:0,lineHeight:1.5}}>{f}</p>
                </div>
              ))}
            </div>
            <button onClick={goToStripe} style={{width:'100%',background:C.gold,color:'#1c1510',border:'none',padding:'18px',borderRadius:'32px',fontSize:'16px',fontWeight:800,cursor:'pointer'}}>
              Commencer maintenant
            </button>
            <p style={{color:'#3d5070',fontSize:'12px',margin:'12px 0 0',textAlign:'center'}}>Paiement sécurisé par Stripe</p>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <div style={{background:C.amber,borderRadius:'20px',padding:'28px',border:`1px solid rgba(138,96,16,0.15)`}}>
              <p style={{color:'#8A6010',fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Pourquoi 29,99€/an ?</p>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {[
                  {label:"1 livre de grossesse", prix:"15 à 25€", note:"pour la maman seulement"},
                  {label:"1 séance de préparation à l'accouchement", prix:"80 à 150€", note:"souvent pour les couples"},
                  {label:"1 consultation sage-femme", prix:"50 à 90€", note:"30 minutes"},
                  {label:"DadUp, toute la grossesse", prix:"29,99€", note:"tout inclus, toute l'année", hl:true},
                ].map((item,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',background:item.hl?C.blueDark:C.white,borderRadius:'12px',border:item.hl?'none':`1px solid ${C.border}`}}>
                    <div>
                      <p style={{color:item.hl?C.white:C.dark,fontSize:'13px',fontWeight:700,margin:0}}>{item.label}</p>
                      <p style={{color:item.hl?'#95C0D0':C.textLight,fontSize:'11px',margin:'2px 0 0'}}>{item.note}</p>
                    </div>
                    <p style={{color:item.hl?C.gold:C.text,fontSize:'15px',fontWeight:800,margin:0}}>{item.prix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:C.bluePale,borderRadius:'20px',padding:'28px',border:`1px solid rgba(46,95,138,0.15)`}}>
              <p style={{color:C.dark,fontSize:'16px',fontWeight:800,margin:'0 0 8px'}}>Satisfaction garantie</p>
              <p style={{color:C.text,fontSize:'14px',lineHeight:1.6,margin:'0 0 16px'}}>Si DadUp ne t'apporte pas ce que tu espérais dans les 7 premiers jours, on te rembourse. Sans question.</p>
              <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <span style={{fontSize:'18px'}}>🔒</span>
                <p style={{color:C.blue,fontSize:'13px',margin:0,fontWeight:600}}>Paiement sécurisé · Données protégées · RGPD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp" style={{background:C.cream,padding:'80px 40px',borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:'800px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 12px'}}>FAQ</p>
            <h2 style={{fontSize:'38px',fontWeight:800,color:C.dark,margin:0}}>Questions fréquentes</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {FAQ.map((item,i)=>(
              <div key={i} style={{background:C.white,borderRadius:'16px',padding:'24px',border:`1px solid ${C.border}`}}>
                <p style={{color:C.dark,fontSize:'15px',fontWeight:700,margin:'0 0 10px'}}>{item.q}</p>
                <p style={{color:C.text,fontSize:'14px',lineHeight:1.6,margin:0}}>{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.dark,padding:'80px 40px',textAlign:'center' as const}}>
        <h2 style={{color:C.white,fontSize:'38px',fontWeight:800,margin:'0 0 12px'}}>Prêt à commencer ?</h2>
        <p style={{color:'#6a7585',fontSize:'16px',margin:'0 0 32px'}}>Rejoins les papas qui se préparent vraiment.</p>
        <button onClick={goToStripe} style={{background:C.gold,color:'#1c1510',border:'none',padding:'16px 40px',borderRadius:'32px',fontSize:'15px',fontWeight:800,cursor:'pointer'}}>Commencer — 29,99€/an</button>
      </section>

      <footer style={{background:C.dark,borderTop:'1px solid #2e3848',padding:'32px 40px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <svg viewBox="0 0 300 300" width="28" height="28"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
          <span style={{color:C.white,fontSize:'16px',fontWeight:700}}>DadUp</span>
        </div>
        <p style={{color:'#6a7585',fontSize:'12px',margin:0}}>DadUp est un outil d'information. Il ne remplace pas l'avis d'un médecin.</p>
      </footer>
    </main>
  );
}
