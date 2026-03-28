'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  orange: '#FFF0E6', green: '#E4F5EC', amber: '#FFF7E0', teal: '#E0F5F0',
};

const MODULES = [
  {num:'01', titre:'Calendrier des rendez-vous', desc:"Chaque consultation médicale expliquée en détail. Ce qui se passe, ce qu'on cherche, les résultats possibles. Ton rôle précis à chaque étape.", details:["8 échographies et consultations détaillées","Dates personnalisées à ta date d'accouchement","Ce que tu dois demander au médecin","Comment soutenir sans stresser"], emoji:'📅', bg:C.bluePale, dark:false},
  {num:'02', titre:'Suivi bébé semaine par semaine', desc:"Chaque semaine, découvre où en est bébé. Taille, poids, comparaison avec un fruit, développement des organes. Tu sais exactement ce qui se passe.", details:["SA 6 à SA 41 couverts","Comparaison avec un fruit chaque semaine","Développement des organes et des sens","Ce que ressent maman en parallèle"], emoji:'👶', bg:C.green, dark:false},
  {num:'03', titre:'Guide accouchement complet', desc:"Le moment le plus intense de ta vie arrive. Tu seras prêt. Quand partir, où te mettre, comment respirer avec elle, comment parler aux soignants.", details:["Reconnaître les vraies contractions","Checklist départ maternité","Ton rôle précis en salle de naissance","Césarienne : ce qu'il faut savoir"], emoji:'🏥', bg:C.dark, dark:true},
  {num:'04', titre:'Valise maternité interactive', desc:"Une checklist complète et interactive. Coche au fur et à mesure. Pour toi, pour elle, pour bébé. Plus de stress le jour J.", details:["21 articles essentiels catégorisés","Pour toi, pour elle, pour bébé","Documents administratifs inclus","Suivi en temps réel"], emoji:'🧳', bg:C.orange, dark:false},
  {num:'05', titre:'Post-partum décrypté', desc:"Le retour à la maison est souvent le moment le plus difficile. Baby blues, manque de sommeil, bouleversement du couple. Tu comprends ce qu'elle vit.", details:["Baby blues et dépression post-partum","Ton rôle les premières semaines","Gérer la fatigue à deux","Reprendre la vie de couple"], emoji:'💙', bg:C.teal, dark:false},
  {num:'06', titre:'Idées mensuelles pour ta partenaire', desc:"Chaque mois, une idée concrète pour lui montrer que tu es là. Des attentions simples, accessibles, qui comptent vraiment.", details:["9 idées personnalisées par trimestre","Du dîner romantique au cadeau pratique","Idées adaptées à son état du moment","Surprise du mois révélée progressivement"], emoji:'🎁', bg:C.dark, dark:true},
  {num:'07', titre:'Premier mois avec bébé', desc:"Les techniques qui marchent vraiment. Pas les théories des livres, les gestes concrets que tu peux faire à 3h du matin quand bébé pleure.", details:["Technique d'emmaillotage pas à pas","Décoder les pleurs de bébé","Gérer le sommeil","Biberon, rot, coliques : les bons gestes"], emoji:'🌙', bg:C.amber, dark:false},
  {num:'08', titre:'Liste achats prioritaires', desc:"Ce qui est vraiment nécessaire, ce qui est superflu, dans quel ordre acheter et pour quel budget. Finis les achats inutiles.", details:["Essentiel vs superflu clairement indiqué","Budget par catégorie","Ordre d'achat recommandé","Conseils sur les marques fiables"], emoji:'🛒', bg:C.green, dark:false},
];

export default function InclusPage() {
  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .mg{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          .mg{grid-template-columns:1fr!important;gap:24px!important;}
          .sp{padding:48px 20px!important;}
          nav{padding:0 20px!important;}
          h1{font-size:36px!important;}
          h2{font-size:22px!important;}
          .mod-img{height:200px!important;}
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
            <a href="/inclus" style={{color:C.dark,fontSize:'14px',fontWeight:700,padding:'8px 14px',borderRadius:'8px',textDecoration:'none',borderBottom:`2px solid ${C.gold}`}}>Ce qui est inclus</a>
            <a href="/tarifs" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Tarifs</a>
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
          <p style={{color:C.blue,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 16px'}}>Ce qui est inclus</p>
          <h1 style={{color:C.white,fontSize:'52px',fontWeight:800,margin:'0 0 24px',lineHeight:1.1}}>
            8 modules pour t'accompagner<br/><span style={{color:C.gold}}>de A à Z.</span>
          </h1>
          <p style={{color:'#6a7585',fontSize:'18px',lineHeight:1.7,margin:0}}>De la première échographie au premier mois de vie. Tout ce dont tu as besoin, au bon moment.</p>
        </div>
      </section>

      <section className="sp" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'56px'}}>
          {MODULES.map((m,i)=>(
            <div key={i} className="mg" style={{direction: i%2===1?'rtl':'ltr'}}>
              <div style={{direction:'ltr'}}>
                <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'16px'}}>
                  <span style={{color:C.border,fontSize:'44px',fontWeight:800,lineHeight:1}}>{m.num}</span>
                  <h2 style={{color:C.dark,fontSize:'24px',fontWeight:800,margin:0}}>{m.titre}</h2>
                </div>
                <p style={{color:C.text,fontSize:'15px',lineHeight:1.7,margin:'0 0 20px'}}>{m.desc}</p>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {m.details.map((d,j)=>(
                    <div key={j} style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                      <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.blue,flexShrink:0,marginTop:'6px'}}></div>
                      <p style={{color:C.blueDark,fontSize:'14px',margin:0,lineHeight:1.5}}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mod-img" style={{direction:'ltr',background:m.bg,borderRadius:'24px',height:'280px',display:'flex',alignItems:'center',justifyContent:'center',border:m.dark?'none':`1px solid ${C.border}`}}>
                <div style={{textAlign:'center'}}>
                  <p style={{fontSize:'52px',margin:'0 0 8px'}}>{m.emoji}</p>
                  <p style={{color:m.dark?C.gold:C.textLight,fontSize:'13px',margin:0,fontWeight:600}}>{m.titre}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:C.dark,padding:'80px 40px',textAlign:'center' as const}}>
        <h2 style={{color:C.white,fontSize:'38px',fontWeight:800,margin:'0 0 12px'}}>Tout ça pour 29,99€/an.</h2>
        <p style={{color:'#6a7585',fontSize:'16px',margin:'0 0 32px'}}>Sans engagement. Résiliable à tout moment.</p>
        <a href="/tarifs" style={{background:C.gold,color:'#1c1510',padding:'16px 40px',borderRadius:'32px',fontSize:'15px',fontWeight:800,textDecoration:'none',display:'inline-block'}}>Commencer maintenant</a>
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
