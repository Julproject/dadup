'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  orange: '#FFF0E6', green: '#E4F5EC', amber: '#FFF7E0',
};

const FAQ = [
  {q:"L'abonnement se renouvelle-t-il automatiquement ?", r:"L'abonnement est souscrit pour 12 mois et expire automatiquement à l'échéance. Aucun prélèvement sans nouvelle commande de ta part."},
  {q:"Que se passe-t-il après la naissance ?", r:"Ton espace passe automatiquement en mode post-partum. Le contenu évolue pour couvrir les premières semaines avec bébé."},
  {q:"Mes données sont-elles en sécurité ?", r:"On ne stocke que ton email et ta date d'accouchement. Aucune donnée n'est revendue. Paiement sécurisé par Stripe."},
  {q:"Est-ce que ma partenaire peut aussi utiliser DadUp ?", r:"DadUp est conçu pour le papa. Mais rien ne t'empêche de partager certains contenus avec ta partenaire !"},
  {q:"Le contenu est-il vérifié médicalement ?", r:"Le contenu de DadUp est basé sur les recommandations de la HAS. Il ne remplace pas l'avis d'un médecin ou d'une sage-femme."},
  {q:"J'ai déjà payé mais je n'arrive pas à me connecter.", r:"Va sur la page de connexion et saisis l'email utilisé lors du paiement. Tu recevras un lien de création de mot de passe par email."},
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
            <a href="/contact" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Contactez-nous</a>
          </div>
        </div>
        <div className="nc" style={{alignItems:'center',gap:'16px'}}>
          <a href="/login" style={{color:C.dark,fontSize:'14px',fontWeight:600,textDecoration:'none'}}>Se connecter</a>
          <button onClick={goToStripe} style={{background:C.dark,color:C.white,padding:'11px 22px',borderRadius:'32px',fontSize:'13px',fontWeight:700,border:'none',cursor:'pointer'}}>Commencer</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{background:C.dark,padding:'80px 40px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>

          <h1 style={{color:C.white,fontSize:'52px',fontWeight:800,margin:'0 0 16px',lineHeight:1.1}}>
            Simple.<br/><span style={{color:C.gold}}>Transparent.</span>
          </h1>
          <p style={{color:'#6a7585',fontSize:'18px',lineHeight:1.7,margin:'0 0 24px'}}>Une offre. Un prix. Tout inclus.</p>

        </div>
      </section>



      {/* OFFRE PRINCIPALE */}
      <section className="sp" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div className="tg">

          {/* CARTE PRIX */}
          <div style={{background:C.dark,borderRadius:'28px',padding:'48px'}}>
            <p style={{color:C.gold,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 8px'}}>Accès annuel complet</p>
            <div style={{display:'flex',alignItems:'baseline',gap:'8px',margin:'0 0 4px'}}>
              <p className="prix" style={{color:C.white,fontSize:'72px',fontWeight:800,margin:0,lineHeight:1}}>35,99€</p>
            </div>
            <p style={{color:'#6a7585',fontSize:'15px',margin:'0 0 8px'}}>par an · paiement unique · accès immédiat</p>
            <p style={{color:'rgba(200,160,96,0.8)',fontSize:'13px',fontWeight:600,margin:'0 0 40px'}}>paiement unique · accès immédiat</p>

            <div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'40px'}}>
              {[
                
                "Suivi bébé semaine par semaine, de la SA 3 à la SA 40",
                "Calendrier des rendez-vous personnalisé à ta DPA",
                "Guide accouchement",
                "Valise maternité",
                "Mode post-partum",
                
                
              ].map(f=>(
                <div key={f} style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                  <span style={{color:C.gold,fontSize:'14px',flexShrink:0}}>—</span>
                  <p style={{color:C.white,fontSize:'14px',margin:0,lineHeight:1.5}}>{f}</p>
                </div>
              ))}
            </div>

            <button onClick={goToStripe} style={{width:'100%',background:C.gold,color:'#1c1510',border:'none',padding:'18px',borderRadius:'32px',fontSize:'16px',fontWeight:800,cursor:'pointer',marginBottom:'12px'}}>
              Commencer
            </button>
            <p style={{color:'#3d5070',fontSize:'12px',margin:0,textAlign:'center'}}>Paiement sécurisé par Stripe</p>
          </div>

          {/* COMPARAISON + GARANTIE */}
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>



            <div style={{background:C.bluePale,borderRadius:'20px',padding:'28px',border:`1px solid rgba(46,95,138,0.15)`}}>
              <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Informations pratiques</p>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {[
                  {label:'Durée', val:"12 mois d'accès à compter du paiement"},
                  {label:'Renouvellement', val:'Aucun renouvellement automatique'},
                  {label:'Données', val:'Email et DPA uniquement. Aucune revente.'},
                ].map(({label,val})=>(
                  <div key={label} style={{display:'flex',gap:'12px'}}>
                    <p style={{color:C.blueDark,fontSize:'13px',fontWeight:700,margin:0,minWidth:'130px',flexShrink:0}}>{label}</p>
                    <p style={{color:C.text,fontSize:'13px',margin:0}}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA BAS */}
      <section style={{background:C.dark,padding:'80px 40px',textAlign:'center'}}>
        <p style={{color:C.gold,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Prêt à commencer ?</p>
        <h2 style={{color:C.white,fontSize:'42px',fontWeight:800,margin:'0 0 8px'}}>Accès annuel complet</h2>
        <p style={{color:C.white,fontSize:'60px',fontWeight:800,margin:'0 0 4px'}}>35,99€</p>
        <p style={{color:'#6a7585',fontSize:'15px',margin:'0 0 16px'}}>par an · paiement unique · accès immédiat</p>
        <p style={{color:'rgba(200,160,96,0.7)',fontSize:'14px',margin:'0 0 40px'}}>par an · paiement unique · sans renouvellement automatique</p>
        <button onClick={goToStripe} style={{background:C.gold,color:'#1c1510',border:'none',padding:'18px 48px',borderRadius:'32px',fontSize:'16px',fontWeight:800,cursor:'pointer',width:'100%',maxWidth:'400px'}}>
          Commencer
        </button>
        <p style={{color:'#3d5070',fontSize:'12px',margin:'12px 0 0'}}>Paiement sécurisé par Stripe</p>
      </section>

      <footer style={{background:C.dark,borderTop:'1px solid #2e3848',padding:'32px 40px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <svg viewBox="0 0 300 300" width="28" height="28"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
              <span style={{color:C.white,fontSize:'16px',fontWeight:700}}>DadUp</span>
            </div>
            <div style={{display:'flex',gap:'20px',flexWrap:'wrap' as const}}>
              <a href="/pourquoi" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Pourquoi DadUp</a>
              <a href="/inclus" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Ce qui est inclus</a>
              <a href="/tarifs" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Tarifs</a>
              <a href="/temoignages" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Témoignages</a>
              <a href="/contact" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Contactez-nous</a>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'12px',paddingTop:'12px',borderTop:'1px solid #2e3848'}}>
            <div style={{display:'flex',gap:'20px',flexWrap:'wrap' as const}}>
              <a href="/cgv" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>CGV</a>
              <a href="/confidentialite" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>Confidentialité</a>
              <a href="/mentions-legales" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>Mentions légales</a>
            </div>
            <p style={{color:'#3d4f6a',fontSize:'12px',margin:0}}>Il ne remplace pas l'avis d'un médecin.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
