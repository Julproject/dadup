import Link from 'next/link';

export default function PourquoiPage() {
  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:'sans-serif'}}>
      <Nav/>
      
      {/* HERO */}
      <section style={{background:'#3a3028', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Pourquoi DadUp</p>
          <h1 style={{color:'#f0e0cc', fontSize:'52px', fontWeight:800, margin:'0 0 24px', lineHeight:1.1, fontFamily:'Georgia,serif'}}>
            On prepare les mamans.<br/><span style={{color:'#c8a882'}}>Pas les papas.</span>
          </h1>
          <p style={{color:'#9a8470', fontSize:'18px', lineHeight:1.7, margin:0}}>Pourtant tu es la, tu veux etre present, tu veux bien faire. Mais personne ne t'a appris comment.</p>
        </div>
      </section>

      {/* LE CONSTAT */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center'}}>
          <div>
            <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>Le constat</p>
            <h2 style={{fontSize:'38px', fontWeight:800, color:'#3a3028', margin:'0 0 32px', lineHeight:1.2, fontFamily:'Georgia,serif'}}>Tu veux etre la.<br/>Mais comment ?</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              {[
                {titre:'Les livres de grossesse sont ecrits pour les mamans.', desc:"Sur 100 livres sur la grossesse, moins de 5 s'adressent specifiquement aux peres. Le reste ? Ecrit pour elle."},
                {titre:"Personne n'explique ton role exact.", desc:"A la maternite, pendant les echographies, a l'accouchement — on te dit rarement quoi faire, ou te mettre, comment aider."},
                {titre:"Le post-partum reste un tabou.", desc:"Baby blues, fatigue extreme, bouleversement du couple — personne n'en parle. Ni pour elle, ni pour toi."},
                {titre:"Les premieres semaines arrivent sans mode d'emploi.", desc:"Emmaillotage, pleurs, sommeil, allaitement — tu decouvres tout sur le tas, souvent la nuit, souvent seul."},
              ].map((item, i) => (
                <div key={i} style={{display:'flex', gap:'16px', alignItems:'flex-start'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#f0e8dc', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'2px'}}>
                    <span style={{color:'#c8a882', fontSize:'14px', fontWeight:700}}>{i+1}</span>
                  </div>
                  <div>
                    <p style={{color:'#3a3028', fontSize:'15px', fontWeight:700, margin:'0 0 4px'}}>{item.titre}</p>
                    <p style={{color:'#9a8470', fontSize:'14px', margin:0, lineHeight:1.5}}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'#f8f2eb', borderRadius:'24px', height:'500px', overflow:'hidden'}}>
            <img src="/deborde.jpg" alt="Papa et bebe" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top'}}/>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{background:'#f8f2eb', padding:'80px 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          <p style={{fontSize:'32px', fontWeight:800, color:'#3a3028', lineHeight:1.3, margin:'0 0 24px', fontFamily:'Georgia,serif'}}>
            "Etre un bon papa ca ne s'improvise pas.<br/>Ca se prepare."
          </p>
          <p style={{color:'#9a8470', fontSize:'15px', margin:0}}>DadUp est le premier guide concu exclusivement pour le papa.</p>
        </div>
      </section>

      {/* CE QUE DADUP CHANGE */}
      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'56px'}}>
          <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Ce que DadUp change</p>
          <h2 style={{fontSize:'38px', fontWeight:800, color:'#3a3028', margin:0, fontFamily:'Georgia,serif'}}>Avant / Apres DadUp</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px'}}>
          <div style={{background:'#fafafa', borderRadius:'20px', padding:'32px', border:'1px solid #eee'}}>
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
                <p style={{color:'#666', fontSize:'14px', margin:0}}>{t}</p>
              </div>
            ))}
          </div>
          <div style={{background:'#3a3028', borderRadius:'20px', padding:'32px'}}>
            <p style={{color:'#c8a882', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 20px'}}>Avec DadUp</p>
            {[
              "Tu connais chaque etape avant qu'elle arrive",
              "Tu sais exactement quand et comment reagir",
              "Tu comprends ce qu'elle vit et tu l'accompagnes",
              "Tu achetes ce qui est vraiment utile",
              "Tu es present, confiant, et vraiment la",
            ].map((t, i) => (
              <div key={i} style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'12px'}}>
                <span style={{color:'#c8a882', fontSize:'16px'}}>✓</span>
                <p style={{color:'#f0e0cc', fontSize:'14px', margin:0}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'#3a3028', padding:'80px 40px', textAlign:'center'}}>
        <h2 style={{color:'#f0e0cc', fontSize:'38px', fontWeight:800, margin:'0 0 12px', fontFamily:'Georgia,serif'}}>Pret a etre vraiment la ?</h2>
        <p style={{color:'#9a8470', fontSize:'16px', margin:'0 0 32px'}}>Rejoins DadUp et commence des aujourd'hui.</p>
        <a href="/#tarifs" style={{background:'#c8a882', color:'#1c1510', padding:'16px 40px', borderRadius:'32px', fontSize:'15px', fontWeight:800, textDecoration:'none', display:'inline-block'}}>Commencer — 29,99€/an</a>
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
        <a href="/#tarifs" style={{background:'#3a3028', color:'#f0e0cc', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Commencer — 29,99€/an</a>
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
