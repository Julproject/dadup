'use client';

export default function Home() {
  const goToStripe = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Erreur : ' + JSON.stringify(data));
      }
    } catch (err) {
      alert('Erreur connexion : ' + err);
    }
  };

  return (
    <main style={{minHeight:'100vh', background:'#ffffff', fontFamily:'sans-serif'}}>

      <nav style={{background:'#ffffff', borderBottom:'1px solid #e8ddd4', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px', position:'sticky', top:0, zIndex:50}}>
        <div style={{display:'flex', alignItems:'center', gap:'48px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <svg viewBox="0 0 300 300" width="34" height="34">
              <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
              <circle cx="150" cy="150" r="122" fill="#9a8470"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
              <circle cx="150" cy="112" r="40" fill="#c8a882"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
              <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
            </svg>
            <span style={{fontWeight:800, color:'#3a3028', fontSize:'20px', fontFamily:'Georgia,serif'}}>DadUp</span>
          </div>
          <div style={{display:'flex', gap:'4px'}}>
            <a href="/pourquoi" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Pourquoi DadUp</a>
            <a href="/inclus" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Tarifs</a>
            <a href="/temoignages" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:500, padding:'8px 14px', borderRadius:'8px', textDecoration:'none'}}>Temoignages</a>
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
          <a href="/login" style={{color:'#3a3028', fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Se connecter</a>
          <button onClick={goToStripe} style={{background:'#3a3028', color:'#f0e0cc', border:'none', padding:'11px 22px', borderRadius:'32px', fontSize:'13px', fontWeight:700, cursor:'pointer'}}>Commencer — 29,99€/an</button>
        </div>
      </nav>

      <section style={{padding:'80px 40px 0', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center'}}>
          <div>
            <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'#f8f2eb', border:'1px solid #e8ddd4', borderRadius:'20px', padding:'6px 14px', marginBottom:'28px'}}>
              <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#c8a882'}}></div>
              <span style={{color:'#9a8470', fontSize:'12px', fontWeight:600, letterSpacing:'1px'}}>Le guide du papa</span>
            </div>
            <h1 style={{fontSize:'54px', fontWeight:800, color:'#3a3028', lineHeight:1.05, margin:'0 0 24px', fontFamily:'Georgia,serif'}}>
              Tout ce qu'on<br/>ne t'a pas<br/><span style={{color:'#c8a882'}}>appris.</span>
            </h1>
            <p style={{color:'#6b5c4e', fontSize:'19px', lineHeight:1.5, margin:'0 0 12px', fontFamily:'Georgia,serif', fontWeight:500}}>Papa, des le premier jour.</p>
            <p style={{color:'#9a8470', fontSize:'15px', lineHeight:1.7, margin:'0 0 40px'}}>De la premiere echographie au post-partum. Sois le meilleur soutien pour ta partenaire, sache ce qui est bon pour elle, et sois la au maximum.</p>
            <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
              <button onClick={goToStripe} style={{background:'#3a3028', color:'#f0e0cc', border:'none', padding:'16px 32px', borderRadius:'32px', fontSize:'15px', fontWeight:700, cursor:'pointer'}}>Commencer — 29,99€/an</button>
              <a href="/inclus" style={{color:'#c8a882', fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Ce qui est inclus →</a>
            </div>
            <p style={{color:'#b0988a', fontSize:'12px', margin:'14px 0 0'}}>Sans engagement · Resiliable a tout moment</p>
          </div>
          <div style={{position:'relative'}}>
            <div style={{background:'#f8f2eb', borderRadius:'24px', height:'500px', overflow:'hidden'}}>
              <img src="/main.jpg" alt="Couple enceinte" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center'}}/>
            </div>
            <div style={{position:'absolute', bottom:'24px', left:'-20px', background:'#fff', borderRadius:'16px', padding:'14px 18px', border:'1px solid #e8ddd4', display:'flex', alignItems:'center', gap:'12px'}}>
              <span style={{fontSize:'28px'}}>🍌</span>
              <div>
                <p style={{color:'#3a3028', fontSize:'13px', fontWeight:700, margin:0}}>SA 20 · Bebe = banane</p>
                <p style={{color:'#9a8470', fontSize:'12px', margin:'2px 0 0'}}>140 jours restants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{background:'#3a3028', margin:'72px 0 0', padding:'40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', textAlign:'center'}}>
          {[
            {chiffre:'41', label:'semaines couvertes'},
            {chiffre:'8', label:'modules complets'},
            {chiffre:'100%', label:'personnalise'},
            {chiffre:'29,99€', label:'par an'},
          ].map((s, i) => (
            <div key={s.label} style={{padding:'0 32px', borderLeft: i > 0 ? '1px solid #6b5c4e' : 'none'}}>
              <p style={{color:'#f0e0cc', fontSize:'40px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>{s.chiffre}</p>
              <p style={{color:'#9a8470', fontSize:'13px', margin:'6px 0 0'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'80px 40px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center'}}>
          <div style={{borderLeft:'3px solid #c8a882', paddingLeft:'32px'}}>
            <p style={{fontSize:'36px', fontWeight:800, color:'#3a3028', margin:'0 0 16px', lineHeight:1.2, fontFamily:'Georgia,serif'}}>
              Papa, des le premier jour.
            </p>
            <p style={{color:'#9a8470', fontSize:'16px', margin:'0 0 32px', lineHeight:1.7}}>
              Pas apres la naissance. Pas quand tu te sens pret. Maintenant, pendant la grossesse, avec les bons outils.
            </p>
            <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
              <a href="/pourquoi" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Pourquoi DadUp →</a>
              <a href="/temoignages" style={{color:'#6b5c4e', fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Ils temoignent →</a>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
            {[
              {emoji:'📅', titre:'Calendrier RDV', lien:'/inclus'},
              {emoji:'👶', titre:'Suivi bebe SA', lien:'/inclus'},
              {emoji:'🏥', titre:'Guide accouchement', lien:'/inclus'},
              {emoji:'💙', titre:'Post-partum', lien:'/inclus'},
            ].map((m, i) => (
              <a key={i} href={m.lien} style={{background:'#f8f2eb', borderRadius:'16px', padding:'20px', border:'1px solid #e8ddd4', textDecoration:'none', display:'block'}}>
                <span style={{fontSize:'28px', display:'block', marginBottom:'8px'}}>{m.emoji}</span>
                <p style={{color:'#3a3028', fontSize:'13px', fontWeight:700, margin:0}}>{m.titre}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:'#3a3028', padding:'80px 40px', textAlign:'center'}}>
        <p style={{color:'#c8a882', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 16px'}}>L'offre</p>
        <h2 style={{color:'#f0e0cc', fontSize:'42px', fontWeight:800, margin:'0 0 8px', fontFamily:'Georgia,serif'}}>Acces annuel complet</h2>
        <p style={{color:'#f0e0cc', fontSize:'60px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif'}}>29,99€</p>
        <p style={{color:'#9a8470', fontSize:'15px', margin:'0 0 40px'}}>par an · sans engagement · acces immediat</p>
        <button onClick={goToStripe} style={{background:'#c8a882', color:'#1c1510', border:'none', padding:'18px 48px', borderRadius:'32px', fontSize:'16px', fontWeight:800, cursor:'pointer'}}>Commencer maintenant — 29,99€/an</button>
        <p style={{color:'#6b5c4e', fontSize:'12px', margin:'12px 0 0'}}>Paiement securise par Stripe</p>
      </section>

      <footer style={{background:'#3a3028', borderTop:'1px solid #2d2018', padding:'32px 40px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
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
        <div style={{display:'flex', gap:'24px'}}>
          <a href="/pourquoi" style={{color:'#6b5c4e', fontSize:'13px', textDecoration:'none'}}>Pourquoi DadUp</a>
          <a href="/inclus" style={{color:'#6b5c4e', fontSize:'13px', textDecoration:'none'}}>Ce qui est inclus</a>
          <a href="/tarifs" style={{color:'#6b5c4e', fontSize:'13px', textDecoration:'none'}}>Tarifs</a>
          <a href="/temoignages" style={{color:'#6b5c4e', fontSize:'13px', textDecoration:'none'}}>Temoignages</a>
        </div>
        <p style={{color:'#6b5c4e', fontSize:'12px', margin:0}}>Il ne remplace pas l'avis d'un medecin.</p>
      </footer>

    </main>
  );
}
