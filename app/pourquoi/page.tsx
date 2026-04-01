export default function PourquoiPage() {
  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <Nav/>

      <section style={{background:'#1e2535', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a060', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Pourquoi DadUp</p>
          <h1 style={{color:'#f7f5f0', fontSize:'52px', fontWeight:900, margin:'0 0 24px', lineHeight:1.1, letterSpacing:'-1px'}}>
            On prepare les mamans.<br/><span style={{color:'#c8a060'}}>Pas les papas.</span>
          </h1>
          <p style={{color:'#9aa0a8', fontSize:'18px', lineHeight:1.7, margin:0}}>Pourtant tu es la, tu veux etre present, tu veux bien faire. Il te faut un outil concu pour toi.</p>
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center'}}>
          <div>
            <p style={{color:'#2E5F8A', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Le constat</p>
            <h2 style={{fontSize:'38px', fontWeight:900, color:'#1e2535', margin:'0 0 36px', lineHeight:1.2, letterSpacing:'-0.5px'}}>Tu veux etre la.<br/>Mais comment ?</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>
              {[
                {n:'1', bg:'#FFF0E6', tc:'#C04A1A', titre:"Les livres de grossesse sont ecrits pour les mamans.", desc:"Sur 100 livres sur la grossesse, moins de 5 s'adressent aux peres. DadUp est fait pour toi."},
                {n:'2', bg:'#E4F5EC', tc:'#0D6B40', titre:"Personne n'explique ton role exact.", desc:"A la maternite, en salle de naissance, on te dit rarement quoi faire. DadUp te donne les gestes concrets avant que ca arrive."},
                {n:'3', bg:'#FFF7E0', tc:'#8A6010', titre:"Le post-partum reste un angle mort.", desc:"Baby blues, fatigue, bouleversement du couple. Personne n'en parle. DadUp te prepare a ce que tu vas vraiment vivre."},
                {n:'4', bg:'#E6F0FA', tc:'#1A4A7A', titre:"L'information est dispersee partout.", desc:"Forums, groupes, YouTube. Tu perds du temps a chercher. DadUp centralise tout, personnalise a ta semaine de grossesse."},
              ].map((item) => (
                <div key={item.n} style={{display:'flex', gap:'14px', alignItems:'flex-start'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'50%', background:item.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'2px'}}>
                    <span style={{color:item.tc, fontSize:'13px', fontWeight:800}}>{item.n}</span>
                  </div>
                  <div>
                    <p style={{color:'#1e2535', fontSize:'15px', fontWeight:700, margin:'0 0 4px'}}>{item.titre}</p>
                    <p style={{color:'#9aa0a8', fontSize:'14px', margin:0, lineHeight:1.6}}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'#f7f5f0', borderRadius:'24px', height:'500px', overflow:'hidden'}}>
            <img src="/deborde.jpg" alt="Papa et bebe" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top'}}/>
          </div>
        </div>
      </section>

      <section style={{background:'#1A3D5C', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{fontSize:'28px', fontWeight:800, color:'#f7f5f0', lineHeight:1.4, margin:'0 0 16px'}}>
            "Ce n'est pas un guide generique. C'est ton tableau de bord, mis a jour semaine apres semaine."
          </p>
          <p style={{color:'rgba(255,255,255,0.5)', fontSize:'15px', margin:0}}>De la premiere echographie au premier anniversaire de bebe.</p>
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'52px'}}>
          <p style={{color:'#2E5F8A', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Ce que DadUp change</p>
          <h2 style={{fontSize:'38px', fontWeight:900, color:'#1e2535', margin:0, letterSpacing:'-0.5px'}}>Avant / Apres</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px'}}>
          <div style={{background:'#f7f5f0', borderRadius:'20px', padding:'36px', border:'1.5px solid #f0ede8'}}>
            <p style={{color:'#cc4444', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 24px'}}>Sans DadUp</p>
            {[
              "Tu decouvres l'accouchement sur le moment",
              "Tu cherches des reponses sur des forums a 23h",
              "Le post-partum te prend par surprise",
              "Tu ne sais pas quoi acheter ni dans quel ordre",
              "Tu te sens spectateur plutot qu'acteur",
            ].map((t,i)=>(
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'14px'}}>
                <span style={{color:'#cc4444', fontSize:'14px', marginTop:'2px', flexShrink:0}}>&#x2717;</span>
                <p style={{color:'#9aa0a8', fontSize:'14px', margin:0, lineHeight:1.5}}>{t}</p>
              </div>
            ))}
          </div>
          <div style={{background:'#1e2535', borderRadius:'20px', padding:'36px'}}>
            <p style={{color:'#c8a060', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 24px'}}>Avec DadUp</p>
            {[
              "Tu connais chaque etape avant qu'elle arrive",
              "Tout est centralise dans ton espace personnel",
              "Tu comprends ce qu'elle vit et tu l'accompagnes",
              "Checklist valise, RDV, achats : tout est suivi",
              "Tu es present, informe, et vraiment utile",
            ].map((t,i)=>(
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'14px'}}>
                <span style={{color:'#c8a060', fontSize:'14px', marginTop:'2px', flexShrink:0}}>&#x2713;</span>
                <p style={{color:'#f7f5f0', fontSize:'14px', margin:0, lineHeight:1.5}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:'#f7f5f0', padding:'80px 40px'}}>
        <div style={{maxWidth:'1000px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'48px'}}>
            <p style={{color:'#2E5F8A', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Ce que tu utilises chaque jour</p>
            <h2 style={{fontSize:'38px', fontWeight:900, color:'#1e2535', margin:0, letterSpacing:'-0.5px'}}>Une application complete</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'16px'}}>
            {[
              {bg:'#FFF0E6', tc:'#C04A1A', titre:'Dashboard en temps reel', desc:"Ta semaine en cours, le developpement de bebe, ta mission. Mis a jour automatiquement."},
              {bg:'#E4F5EC', tc:'#0D6B40', titre:'Suivi des rendez-vous', desc:"Chaque consultation expliquee avant qu'elle arrive. Ton role precis a chaque etape."},
              {bg:'#E6F0FA', tc:'#1A4A7A', titre:'Preparation a l'accouchement', desc:"Contractions, salle de naissance, cesarienne. Tu sais quoi faire avant que ca arrive."},
              {bg:'#FFF7E0', tc:'#8A6010', titre:'Checklists interactives', desc:"Valise maternite, achats, documents. Tout est coche et sauvegarde dans ton compte."},
              {bg:'#E0F5F0', tc:'#0D7070', titre:'Mode post-partum', desc:"Apres la naissance, l'app bascule automatiquement. 12 mois de suivi de bebe."},
              {bg:'#FDECEA', tc:'#9A2000', titre:'Ateliers pratiques', desc:"Emmaillotage, premiers secours nourrisson, apaisement. Les gestes concrets, sans jargon."},
            ].map((item,i)=>(
              <div key={i} style={{background:item.bg, borderRadius:'16px', padding:'24px'}}>
                <p style={{color:item.tc, fontSize:'15px', fontWeight:700, margin:'0 0 8px'}}>{item.titre}</p>
                <p style={{color:item.tc, fontSize:'13px', lineHeight:1.65, margin:0, opacity:0.8}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:'#1e2535', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f7f5f0', fontSize:'38px', fontWeight:900, margin:'0 0 12px', letterSpacing:'-0.5px'}}>Pret a etre vraiment la ?</h2>
        <p style={{color:'#9aa0a8', fontSize:'16px', margin:'0 0 32px'}}>6,99 &#8364;/mois ou 59,99 &#8364;/an. Acces immediat. Sans engagement.</p>
        <a href="/tarifs" style={{background:'#c8a060', color:'#1e2535', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Commencer maintenant</a>
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
