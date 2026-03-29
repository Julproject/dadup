'use client';

export default function SuccessPage() {
  return (
    <main style={{
      minHeight:'100vh', background:'#f7f5f0',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'20px', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    }}>
      <div style={{maxWidth:'480px', width:'100%', textAlign:'center'}}>

        {/* Logo */}
        <div style={{marginBottom:'32px'}}>
          <svg viewBox="0 0 300 300" width="64" height="64" style={{margin:'0 auto',display:'block'}}>
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
        </div>

        {/* Carte */}
        <div style={{background:'#ffffff',borderRadius:'28px',padding:'40px 36px',border:'1px solid #f0ede8',boxShadow:'0 4px 32px rgba(0,0,0,0.06)'}}>

          {/* Icône succès */}
          <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'#E4F5EC',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px'}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D6B40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h1 style={{color:'#1e2535',fontSize:'24px',fontWeight:900,margin:'0 0 12px'}}>
            Bienvenue sur DadUp !
          </h1>

          <p style={{color:'#4a5568',fontSize:'15px',lineHeight:1.7,margin:'0 0 28px'}}>
            Ton accès est activé. Un email vient de t'être envoyé avec un lien pour créer ton mot de passe.
          </p>

          {/* Étapes */}
          <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'32px',textAlign:'left'}}>
            {[
              { n:'1', texte:"Vérifie ta boîte mail (et tes spams)" },
              { n:'2', texte:"Clique sur le lien pour créer ton mot de passe" },
              { n:'3', texte:"Connecte-toi et commence ton parcours" },
            ].map(step => (
              <div key={step.n} style={{display:'flex',alignItems:'center',gap:'14px',padding:'12px 16px',background:'#f7f5f0',borderRadius:'14px'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#1e2535',color:'#fff',fontSize:'13px',fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {step.n}
                </div>
                <p style={{color:'#1e2535',fontSize:'14px',fontWeight:600,margin:0}}>{step.texte}</p>
              </div>
            ))}
          </div>

          <a href="/login" style={{display:'block',background:'#1e2535',color:'#ffffff',padding:'14px',borderRadius:'32px',fontSize:'15px',fontWeight:700,textDecoration:'none'}}>
            Aller à la connexion
          </a>
        </div>

        {/* Note */}
        <p style={{color:'#9aa0a8',fontSize:'13px',marginTop:'20px',lineHeight:1.6}}>
          Le lien expire dans 7 jours.<br/>
          Un problème ? <a href="mailto:hello@dadup.fr" style={{color:'#2E5F8A',fontWeight:600}}>hello@dadup.fr</a>
        </p>

      </div>
    </main>
  );
}
