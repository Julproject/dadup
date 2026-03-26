const C = {
  dark: '#1e2535',
  gold: '#c8a060',
  cream: '#faf6f0',
  white: '#ffffff',
  border: '#e8e0d0',
  text: '#4a5568',
  textLight: '#9aa0a8',
};

function Nav() {
  return (
    <nav style={{background:C.white, borderBottom:`1px solid ${C.border}`, padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px', position:'sticky', top:0, zIndex:50}}>
      <div style={{display:'flex', alignItems:'center', gap:'48px'}}>
        <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
          <svg viewBox="0 0 300 300" width="34" height="34">
            <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
            <circle cx="150" cy="150" r="122" fill="#4a6080"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
            <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
          </svg>
          <span style={{fontWeight:800, color:C.dark, fontSize:'20px', fontFamily:'Georgia,serif'}}>DadUp</span>
        </a>
        <div style={{display:'flex', gap:'4px'}}>
          <a href="/pourquoi" style={{color:C.dark, fontSize:'14px', fontWeight:700, padding:'8px 14px', borderRadius:'8px', textDecoration:'none', borderBottom:`2px solid ${C.gold}`}}>Pourquoi DadUp</a>
          <a href="/inclus" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Ce qui est inclus</a>
          <a href="/tarifs" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Tarifs</a>
          <a href="/temoignages" style={{color:C.text, fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Temoignages</a>
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
        <a href="/login" style={{color:C.dark, fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
        <a href="/tarifs" style={{background:C.dark, color:C.white, padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Commencer — 29,99€/an</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{background:C.dark, borderTop:'1px solid #2e3848', padding:'32px 40px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
        <svg viewBox="0 0 300 300" width="28" height="28">
          <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
          <circle cx="150" cy="150" r="122" fill="#4a6080"/>
          <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
          <circle cx="150" cy="112" r="40" fill="#c8a060"/>
          <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
          <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
        </svg>
        <span style={{color:C.white, fontSize:'16px', fontWeight:700, fontFamily:'Georgia,serif'}}>DadUp</span>
      </div>
      <p style={{color:'#6a7585', fontSize:'12px', margin:0}}>DadUp est un outil d'information. Il ne remplace pas l'avis d'un medecin.</p>
    </footer>
  );
}

export default function PourquoiPage() {
  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:'sans-serif'}}>
      <Nav/>

      <section style={{background:C.dark, padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Pourquoi DadUp</p>
          <h1 style={{color:C.white, fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            On prepare les mamans.<br/><span style={{color:C.gold}}>Pas les papas.</span>
          </h1>
          <p style={{color:'#6a7585', fontSize:'18px', lineHeight:1.7, margin:0}}>Pourtant tu es la, tu veux etre present, tu veux bien faire. Mais personne ne t'a appris comment.</p>
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center'}}>
          <div>
            <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Le constat</p>
            <h2 style={{fontSize:'38px', fontWeight:800, color:C.dark, margin:'0 0 32px', lineHeight:1.2, fontFamily:'Georgia,serif'}}>Tu veux etre la.<br/>Mais comment ?</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              {[
                {titre:'Les livres sont ecrits pour les mamans.', desc:"Sur 100 livres sur la grossesse, moins de 5 s'adressent au papa. Le reste ? Ecrit pour elle."},
                {titre:"Personne n'explique ton role exact.", desc:"A la maternite, pendant les echographies — on te dit rarement quoi faire, ou te mettre, comment aider."},
                {titre:"Le post-partum reste un tabou.", desc:"Baby blues, fatigue extreme, bouleversement du couple — personne n'en parle. Ni pour elle, ni pour toi."},
                {titre:"Les premieres semaines sans mode d'emploi.", desc:"Emmaillotage, pleurs, sommeil — tu decouvres tout sur le tas, souvent la nuit, souvent seul."},
              ].map((item, i) => (
                <div key={i} style={{display:'flex', gap:'16px', alignItems:'flex-start'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'50%', background:C.cream, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'2px'}}>
                    <span style={{color:C.gold, fontSize:'14px', fontWeight:700}}>{i+1}</span>
                  </div>
                  <div>
                    <p style={{color:C.dark, fontSize:'15px', fontWeight:700, margin:'0 0 4px'}}>{item.titre}</p>
                    <p style={{color:C.text, fontSize:'14px', margin:0, lineHeight:1.5}}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:C.cream, borderRadius:'24px', height:'500px', overflow:'hidden', border:`1px solid ${C.border}`}}>
            <img src="/deborde.jpg" alt="Papa et bebe" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top'}}/>
          </div>
        </div>
      </section>

      <section style={{background:C.cream, padding:'80px 40px', border:`1px solid ${C.border}`}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{fontSize:'32px', fontWeight:800, color:C.dark, lineHeight:1.3, margin:'0 0 24px', fontFamily:'Georgia,serif'}}>
            "Etre un bon papa ca ne s'improvise pas.<br/>Ca se prepare."
          </p>
          <p style={{color:C.text, fontSize:'15px', margin:0}}>DadUp est le premier guide concu exclusivement pour le papa.</p>
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'56px'}}>
          <p style={{color:C.gold, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Ce que DadUp change</p>
          <h2 style={{fontSize:'38px', fontWeight:800, color:C.dark, margin:0, fontFamily:'Georgia,serif'}}>Avant / Apres DadUp</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px'}}>
          <div style={{background:C.cream, borderRadius:'20px', padding:'32px', border:`1px solid ${C.border}`}}>
            <p style={{color:'#cc4444', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 20px'}}>Sans DadUp</p>
            {[
              "Tu decouvres l'accouchement sur le moment",
              "Tu ne sais pas quand partir a la maternite",
              "Le post-partum te prend par surprise",
              "Tu achetes au hasard et depenses trop",
              "Tu te sens spectateur plutot qu'acteur",
            ].map((t, i) => (
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'12px'}}>
                <span style={{color:'#cc4444', fontSize:'16px'}}>✗</span>
                <p style={{color:C.text, fontSize:'14px', margin:0}}>{t}</p>
              </div>
            ))}
          </div>
          <div style={{background:C.dark, borderRadius:'20px', padding:'32px'}}>
            <p style={{color:C.gold, fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 20px'}}>Avec DadUp</p>
            {[
              "Tu connais chaque etape avant qu'elle arrive",
              "Tu sais exactement quand et comment reagir",
              "Tu comprends ce qu'elle vit et tu l'accompagnes",
              "Tu achetes ce qui est vraiment utile",
              "Tu es present, confiant, et vraiment la",
            ].map((t, i) => (
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'12px'}}>
                <span style={{color:C.gold, fontSize:'16px'}}>✓</span>
                <p style={{color:C.white, fontSize:'14px', margin:0}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.dark, padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:C.white, fontSize:'38px', fontWeight:800, margin:'0 0 12px', fontFamily:'Georgia,serif'}}>Pret a etre vraiment la ?</h2>
        <p style={{color:'#6a7585', fontSize:'16px', margin:'0 0 32px'}}>Rejoins DadUp et commence des aujourd'hui.</p>
        <a href="/tarifs" style={{background:C.gold, color:'#1c1510', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Commencer — 29,99€/an</a>
      </section>

      <Footer/>
    </main>
  );
}
