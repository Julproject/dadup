export default function InclusPage() {
  return (
    <main style={{minHeight:"100vh",background:"#ffffff",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <Nav/>

      <section style={{background:"#1e2535",padding:"80px 40px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <p style={{color:"#c8a060",fontSize:"11px",fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",margin:"0 0 16px"}}>Ce qui est inclus</p>
          <h1 style={{color:"#f7f5f0",fontSize:"52px",fontWeight:900,margin:"0 0 24px",lineHeight:1.1,letterSpacing:"-1px"}}>
            Tout ce dont tu as besoin.<br/><span style={{color:"#c8a060"}}>Au bon moment.</span>
          </h1>
          <p style={{color:"#9aa0a8",fontSize:"18px",lineHeight:1.7,margin:0}}>Une application qui evolue avec toi, de la premiere echographie au premier anniversaire de bebe.</p>
        </div>
      </section>

      <section style={{padding:"80px 40px",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"56px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center",direction:"ltr"}}>
            <div style={{direction:"ltr"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}><span style={{color:"#e8e0d8",fontSize:"44px",fontWeight:900,lineHeight:1}}>01</span><h2 style={{color:"#1e2535",fontSize:"26px",fontWeight:800,margin:0}}>Dashboard personnalise</h2></div>
              <p style={{color:"#9aa0a8",fontSize:"15px",lineHeight:1.7,margin:"0 0 20px"}}>Ta semaine en cours, le developpement de bebe, ta mission de papa. Mis a jour chaque semaine.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>SA 6 a SA 40 : contenu unique chaque semaine</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Taille, poids, developpement des organes</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Ce que ressent la maman en parallele</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Conseil du papa adapte a la semaine</p></div>
              </div>
            </div>
            <div style={{direction:"ltr",background:"#FFF0E6",borderRadius:"24px",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <span style={{fontSize:"52px"}}>📊</span>
              <p style={{color:"#C04A1A",fontSize:"13px",margin:0,fontWeight:600,textAlign:"center",padding:"0 20px"}}>Dashboard personnalise</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center",direction:"rtl"}}>
            <div style={{direction:"ltr"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}><span style={{color:"#e8e0d8",fontSize:"44px",fontWeight:900,lineHeight:1}}>02</span><h2 style={{color:"#1e2535",fontSize:"26px",fontWeight:800,margin:0}}>Suivi des rendez-vous medicaux</h2></div>
              <p style={{color:"#9aa0a8",fontSize:"15px",lineHeight:1.7,margin:"0 0 20px"}}>Chaque consultation expliquee avant qu'elle arrive. Ton role precis. Tu arrives prepare, pas spectateur.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Toutes les consultations detaillees</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Dates personnalisees a ta DPA</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Ce que tu dois demander au medecin</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Comprendre les resultats d'examens</p></div>
              </div>
            </div>
            <div style={{direction:"ltr",background:"#1e2535",borderRadius:"24px",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <span style={{fontSize:"52px"}}>📅</span>
              <p style={{color:"#c8a060",fontSize:"13px",margin:0,fontWeight:600,textAlign:"center",padding:"0 20px"}}>Suivi des rendez-vous medicaux</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center",direction:"ltr"}}>
            <div style={{direction:"ltr"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}><span style={{color:"#e8e0d8",fontSize:"44px",fontWeight:900,lineHeight:1}}>03</span><h2 style={{color:"#1e2535",fontSize:"26px",fontWeight:800,margin:0}}>Preparation a l'accouchement</h2></div>
              <p style={{color:"#9aa0a8",fontSize:"15px",lineHeight:1.7,margin:"0 0 20px"}}>Contractions, poche des eaux, salle de naissance, cesarienne. Tu sais exactement quoi faire avant que ca arrive.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Reconnaitre les vraies contractions</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Checklist depart maternite</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Ton role precis en salle de naissance</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Cesarienne : deroulement et ton role</p></div>
              </div>
            </div>
            <div style={{direction:"ltr",background:"#E6F0FA",borderRadius:"24px",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <span style={{fontSize:"52px"}}>🏥</span>
              <p style={{color:"#1A4A7A",fontSize:"13px",margin:0,fontWeight:600,textAlign:"center",padding:"0 20px"}}>Preparation a l'accouchement</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center",direction:"rtl"}}>
            <div style={{direction:"ltr"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}><span style={{color:"#e8e0d8",fontSize:"44px",fontWeight:900,lineHeight:1}}>04</span><h2 style={{color:"#1e2535",fontSize:"26px",fontWeight:800,margin:0}}>Checklists interactives</h2></div>
              <p style={{color:"#9aa0a8",fontSize:"15px",lineHeight:1.7,margin:"0 0 20px"}}>Valise maternite, achats prioritaires, documents. Tout est cochable et sauvegarde dans ton compte.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Valise : pour toi, pour elle, pour bebe</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Liste achats : essentiel vs superflu</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Documents administratifs</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Sauvegarde automatique</p></div>
              </div>
            </div>
            <div style={{direction:"ltr",background:"#1e2535",borderRadius:"24px",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <span style={{fontSize:"52px"}}>🧳</span>
              <p style={{color:"#c8a060",fontSize:"13px",margin:0,fontWeight:600,textAlign:"center",padding:"0 20px"}}>Checklists interactives</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center",direction:"ltr"}}>
            <div style={{direction:"ltr"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}><span style={{color:"#e8e0d8",fontSize:"44px",fontWeight:900,lineHeight:1}}>05</span><h2 style={{color:"#1e2535",fontSize:"26px",fontWeight:800,margin:0}}>Psychologie et preparation mentale</h2></div>
              <p style={{color:"#9aa0a8",fontSize:"15px",lineHeight:1.7,margin:"0 0 20px"}}>38 semaines de contenus sur la paternite. Peur, vie de couple, lien avec bebe. Un sujet par semaine, verifie medicalement.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>38 semaines de contenu unique</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Informations medicalement verifiees</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Lien direct Doctolib si besoin</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Aucune repetition entre les semaines</p></div>
              </div>
            </div>
            <div style={{direction:"ltr",background:"#E0F5F0",borderRadius:"24px",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <span style={{fontSize:"52px"}}>🧠</span>
              <p style={{color:"#0D7070",fontSize:"13px",margin:0,fontWeight:600,textAlign:"center",padding:"0 20px"}}>Psychologie et preparation mentale</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center",direction:"rtl"}}>
            <div style={{direction:"ltr"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}><span style={{color:"#e8e0d8",fontSize:"44px",fontWeight:900,lineHeight:1}}>06</span><h2 style={{color:"#1e2535",fontSize:"26px",fontWeight:800,margin:0}}>Mode post-partum : 12 mois</h2></div>
              <p style={{color:"#9aa0a8",fontSize:"15px",lineHeight:1.7,margin:"0 0 20px"}}>Apres la naissance, l'application bascule automatiquement. Developpement de bebe mois par mois, vaccins, alertes sante.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>12 mois de suivi post-natal</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Developpement de bebe mois par mois</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Baby blues, fatigue, vie de couple</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Vaccins, RDV pediatre, alertes</p></div>
              </div>
            </div>
            <div style={{direction:"ltr",background:"#1e2535",borderRadius:"24px",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <span style={{fontSize:"52px"}}>👶</span>
              <p style={{color:"#c8a060",fontSize:"13px",margin:0,fontWeight:600,textAlign:"center",padding:"0 20px"}}>Mode post-partum : 12 mois</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center",direction:"ltr"}}>
            <div style={{direction:"ltr"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}><span style={{color:"#e8e0d8",fontSize:"44px",fontWeight:900,lineHeight:1}}>07</span><h2 style={{color:"#1e2535",fontSize:"26px",fontWeight:800,margin:0}}>Ateliers pratiques</h2></div>
              <p style={{color:"#9aa0a8",fontSize:"15px",lineHeight:1.7,margin:"0 0 20px"}}>Emmaillotage, premiers secours, apaisement, allaitement. Les gestes que tu fais a 3h du matin, sans jargon.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Emmaillotage pas a pas</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Premiers secours nourrisson</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Comprendre et calmer les pleurs</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Allaitement : ton role</p></div>
              </div>
            </div>
            <div style={{direction:"ltr",background:"#FFF0E6",borderRadius:"24px",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <span style={{fontSize:"52px"}}>🌙</span>
              <p style={{color:"#C04A1A",fontSize:"13px",margin:0,fontWeight:600,textAlign:"center",padding:"0 20px"}}>Ateliers pratiques</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center",direction:"rtl"}}>
            <div style={{direction:"ltr"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}><span style={{color:"#e8e0d8",fontSize:"44px",fontWeight:900,lineHeight:1}}>08</span><h2 style={{color:"#1e2535",fontSize:"26px",fontWeight:800,margin:0}}>Suivi des 7 premiers jours</h2></div>
              <p style={{color:"#9aa0a8",fontSize:"15px",lineHeight:1.7,margin:"0 0 20px"}}>Tableau de suivi des tetees, urines et selles. Et une idee mensuelle pour ta partenaire adaptee a son etat.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Suivi J7 : tetees, selles, urines</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Sauvegarde entre sessions</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Idee mensuelle pour ta partenaire</p></div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c8a060",flexShrink:0}}/><p style={{color:"#2E5F8A",fontSize:"14px",margin:0}}>Activites adaptees a chaque mois</p></div>
              </div>
            </div>
            <div style={{direction:"ltr",background:"#1e2535",borderRadius:"24px",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <span style={{fontSize:"52px"}}>🛒</span>
              <p style={{color:"#c8a060",fontSize:"13px",margin:0,fontWeight:600,textAlign:"center",padding:"0 20px"}}>Suivi des 7 premiers jours</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{background:"#1e2535",padding:"80px 40px",textAlign:"center"}}>
        <h2 style={{color:"#f7f5f0",fontSize:"38px",fontWeight:900,margin:"0 0 12px",letterSpacing:"-0.5px"}}>Tout ca a partir de 6,99 &#8364;/mois.</h2>
        <p style={{color:"#9aa0a8",fontSize:"16px",margin:"0 0 8px"}}>Ou 59,99 &#8364;/an, sans engagement, resiliable a tout moment.</p>
        <p style={{color:"rgba(255,255,255,0.2)",fontSize:"13px",margin:"0 0 32px"}}>Acces immediat apres inscription.</p>
        <a href="/tarifs" style={{background:"#c8a060",color:"#1e2535",padding:"16px 40px",borderRadius:"32px",fontSize:"15px",fontWeight:800,textDecoration:"none",display:"inline-block"}}>Voir les tarifs</a>
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
