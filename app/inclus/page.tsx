'use client';
import { useState } from 'react';
import CheckoutModal from '@/app/components/CheckoutModal';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  orange: '#FFF0E6', green: '#E4F5EC', amber: '#FFF7E0', teal: '#E0F5F0',
};

const MODULES = [
  {
    num:'01', titre:'Calendrier des rendez-vous',
    desc:"Chaque rendez-vous expliqué simplement. Ce qui se passe, ce qu'on cherche, ton rôle précis à chaque étape.",
    details:["8 échographies et consultations détaillées","Dates personnalisées à ta DPA","Ce que tu dois demander au médecin","Comment soutenir sans stresser"],
    emoji:'📅', bg:C.bluePale, dark:false
  },
  {
    num:'02', titre:'Suivi bébé semaine par semaine',
    desc:"Chaque semaine, découvre où en est bébé. Taille, poids, développement des organes et des sens. Tu sais exactement ce qui se passe.",
    details:["SA 3 à SA 41 couverts","Développement des organes et des sens","Taille et poids semaine par semaine","Ce que ressent maman en parallèle"],
    emoji:'👶', bg:C.green, dark:false
  },
  {
    num:'03', titre:'Guide accouchement',
    desc:"Le moment le plus intense de ta vie arrive. Tu seras prêt. Quand partir, où te mettre, comment soutenir.",
    details:["Reconnaître les vraies contractions","Checklist départ maternité","Ton rôle précis en salle de naissance","Césarienne : ce qu'il faut savoir"],
    emoji:'🏥', bg:C.dark, dark:true
  },
  {
    num:'04', titre:'Valise maternité',
    desc:"Une checklist complète. Coche au fur et à mesure. Pour toi, pour elle, pour bébé. Plus de stress le jour J.",
    details:["Articles essentiels catégorisés","Pour toi, pour elle, pour bébé","Suivi en temps réel"],
    emoji:'🧳', bg:C.orange, dark:false
  },
  {
    num:'05', titre:'Post-partum décrypté',
    desc:"Le retour à la maison est souvent le moment le plus difficile. Baby blues, manque de sommeil, bouleversement du couple. Tu comprends ce qu'elle vit.",
    details:["Baby blues et dépression post-partum","Ton rôle les premières semaines","Gérer la fatigue à deux","Reprendre la vie de couple"],
    emoji:'💙', bg:C.teal, dark:false
  },
  {
    num:'06', titre:'1ère année bébé',
    desc:"De la naissance à 12 mois. Développement, vaccins, diversification, premiers mots, premières chutes. Tout ce que tu dois savoir.",
    details:["12 mois couverts","Développement mois par mois","Vaccins, RDV médicaux, alertes","Activités à faire avec bébé"],
    emoji:'🌱', bg:C.bluePale, dark:false
  },
];


function ModulePreview({ num, dark }: { num: string; dark: boolean }) {
  const textColor = dark ? 'rgba(255,255,255,0.9)' : '#1e2535';
  const subColor = dark ? 'rgba(255,255,255,0.5)' : '#9aa0a8';
  const cardBg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)';
  const gold = '#c8a060';

  if (num === '01') return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'8px'}}>
      {[
        {label:'Échographie T1', sa:'12 SA', checked:true},
        {label:'Échographie T2', sa:'20 SA', checked:true},
        {label:'Déclaration grossesse', sa:'15 SA', checked:false},
        {label:'Entretien prénatal', sa:'4e mois', checked:false},
        {label:'Cours de préparation', sa:'7e mois', checked:false},
      ].map((rdv, i) => (
        <div key={i} style={{background:cardBg, borderRadius:'10px', padding:'8px 12px', display:'flex', alignItems:'center', gap:'10px'}}>
          <div style={{width:'18px', height:'18px', borderRadius:'50%', background: rdv.checked ? gold : 'transparent', border:`2px solid ${rdv.checked ? gold : subColor}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
            {rdv.checked && <span style={{color:'#1c1510', fontSize:'10px', fontWeight:800}}>✓</span>}
          </div>
          <div style={{flex:1}}>
            <p style={{color:textColor, fontSize:'11px', fontWeight:600, margin:0}}>{rdv.label}</p>
          </div>
          <span style={{color:subColor, fontSize:'10px'}}>{rdv.sa}</span>
        </div>
      ))}
    </div>
  );

  if (num === '02') return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'8px', padding:'4px'}}>
      <p style={{color:gold, fontSize:'9px', fontWeight:700, letterSpacing:'1px', margin:'0 0 2px'}}>EXTRAIT · SA 20</p>
      <div style={{background:cardBg, borderRadius:'11px', padding:'12px 14px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px'}}>
          <span style={{fontSize:'18px'}}>🍌</span>
          <div>
            <p style={{color:textColor, fontSize:'11px', fontWeight:700, margin:0}}>La mi-grossesse</p>
            <p style={{color:subColor, fontSize:'9px', margin:0}}>16,4 cm · 300 g</p>
          </div>
        </div>
        <p style={{color:dark ? 'rgba(255,255,255,0.6)' : '#4a5568', fontSize:'10px', lineHeight:1.5, margin:'0 0 6px'}}>
          L'échographie T2 examine chaque organe. Le sexe est généralement visible.
        </p>
        <div style={{display:'flex', gap:'4px', flexWrap:'wrap'}}>
          {['Cerveau', 'Cœur', 'Reins'].map(o => (
            <span key={o} style={{background:dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)', color:textColor, fontSize:'9px', fontWeight:600, padding:'3px 7px', borderRadius:'20px'}}>{o}</span>
          ))}
        </div>
      </div>
      <p style={{color:gold, fontSize:'9px', fontWeight:700, letterSpacing:'1px', margin:'4px 0 2px'}}>39 AUTRES SEMAINES</p>
      {[
        {sa:'SA 6', titre:'Le cœur commence à battre', poids:'moins de 1g'},
        {sa:'SA 12', titre:'Fin du 1er trimestre', poids:'14g'},
        {sa:'SA 32', titre:'Bébé prend du poids', poids:'1,7 kg'},
      ].map((s, i) => (
        <div key={i} style={{background:cardBg, borderRadius:'9px', padding:'8px 12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <p style={{color:subColor, fontSize:'9px', margin:0}}>{s.sa}</p>
            <p style={{color:textColor, fontSize:'10px', fontWeight:600, margin:0}}>{s.titre}</p>
          </div>
          <span style={{color:subColor, fontSize:'9px'}}>{s.poids}</span>
        </div>
      ))}
    </div>
  );

  if (num === '03') return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'8px'}}>
      <p style={{color:gold, fontSize:'9px', fontWeight:700, letterSpacing:'1px', margin:'0 0 4px'}}>CHECKLIST DÉPART</p>
      {[
        {label:'Contractions toutes les 5 min', done:true},
        {label:'Perte des eaux', done:false},
        {label:'Valise dans la voiture', done:true},
        {label:'Documents Sécu', done:true},
        {label:'Téléphone chargé', done:false},
      ].map((item, i) => (
        <div key={i} style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <div style={{width:'14px', height:'14px', borderRadius:'4px', background: item.done ? gold : 'transparent', border:`1.5px solid ${item.done ? gold : 'rgba(255,255,255,0.3)'}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
            {item.done && <span style={{color:'#1c1510', fontSize:'8px', fontWeight:900}}>✓</span>}
          </div>
          <p style={{color: item.done ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', fontSize:'11px', margin:0, textDecoration: item.done ? 'none' : 'none'}}>{item.label}</p>
        </div>
      ))}
    </div>
  );

  if (num === '04') return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'6px'}}>
      {[
        {cat:'Pour elle', items:['Chemise de nuit', 'Coussin allaitement'], color:'#e8d4b8'},
        {cat:'Pour bébé', items:['Grenouillères x5', 'Bonnet naissance'], color:'#b8d4e8'},
        {cat:'Pour toi', items:['Vêtements 2 nuits', 'Chargeur'], color:'#b8e8c8'},
      ].map((cat, i) => (
        <div key={i} style={{background:cardBg, borderRadius:'10px', padding:'8px 12px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'6px', marginBottom:'4px'}}>
            <div style={{width:'8px', height:'8px', borderRadius:'50%', background:cat.color, flexShrink:0}}></div>
            <p style={{color:textColor, fontSize:'10px', fontWeight:700, margin:0}}>{cat.cat}</p>
          </div>
          {cat.items.map(item => (
            <p key={item} style={{color:subColor, fontSize:'10px', margin:'2px 0 0 14px'}}>✓ {item}</p>
          ))}
        </div>
      ))}
    </div>
  );

  if (num === '05') return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'6px'}}>
      <p style={{color:gold, fontSize:'9px', fontWeight:700, letterSpacing:'1px', margin:'0 0 2px'}}>POST-PARTUM COUVERT</p>
      {[
        {label:'Baby blues', desc:'Semaines 1 à 2'},
        {label:'Manque de sommeil', desc:'Stratégies à deux'},
        {label:'Reprise de la vie de couple', desc:'Mois 1 à 3'},
        {label:'Dépression post-partum', desc:'Signes à connaître'},
      ].map((item, i) => (
        <div key={i} style={{background:cardBg, borderRadius:'9px', padding:'7px 11px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <p style={{color:textColor, fontSize:'10px', fontWeight:600, margin:0}}>{item.label}</p>
          <span style={{color:subColor, fontSize:'9px'}}>{item.desc}</span>
        </div>
      ))}
      <div style={{background:dark ? 'rgba(200,160,96,0.15)' : 'rgba(200,160,96,0.12)', borderRadius:'9px', padding:'8px 11px', borderLeft:`2px solid ${gold}`, marginTop:'2px'}}>
        <p style={{color:dark ? 'rgba(255,255,255,0.7)' : '#4a5568', fontSize:'10px', lineHeight:1.5, margin:0}}>Ton rôle semaine par semaine, du retour à la maison au 3e mois.</p>
      </div>
    </div>
  );

  if (num === '06') return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'6px'}}>
      <p style={{color:gold, fontSize:'9px', fontWeight:700, letterSpacing:'1px', margin:'0 0 4px'}}>MOIS 3</p>
      {[
        {label:'Sourit spontanément', done:true},
        {label:'Suit des yeux', done:true},
        {label:'Tient sa tête', done:true},
        {label:'Gazouillis', done:false},
        {label:'Premiers rires', done:false},
      ].map((item, i) => (
        <div key={i} style={{display:'flex', alignItems:'center', gap:'8px', background:cardBg, borderRadius:'8px', padding:'6px 10px'}}>
          <div style={{width:'12px', height:'12px', borderRadius:'50%', background: item.done ? gold : 'transparent', border:`1.5px solid ${item.done ? gold : subColor}`, flexShrink:0}}></div>
          <p style={{color: item.done ? textColor : subColor, fontSize:'11px', margin:0}}>{item.label}</p>
        </div>
      ))}
    </div>
  );

  return <span style={{fontSize:'36px'}}></span>;
}

export default function InclusPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <main style={{minHeight:'100vh', background:C.white, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .mg{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
        .mod-img{display:block;}
        @media(max-width:768px){
          .nl{display:none!important;}
          .nc{display:none!important;}
          .sp{padding:32px 16px!important;}
          nav{padding:0 16px!important;}
          h1{font-size:32px!important;line-height:1.15!important;}
          h2{font-size:24px!important;}
          .prix{font-size:48px!important;}
          .hero-grid{grid-template-columns:1fr!important;gap:24px!important;padding:40px 16px 0!important;}
          .hero-img-wrap{height:220px!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;padding:20px 16px!important;}
          .stats-item{border-left:none!important;border-top:1px solid #2e3848;padding:14px!important;}
          .stats-item:nth-child(2){border-left:1px solid #2e3848!important;}
          .modules-grid{grid-template-columns:1fr!important;}
          .quote-grid{grid-template-columns:1fr!important;gap:24px!important;}
          .newbie-grid>div{flex:1 1 100%!important;max-width:100%!important;}
          .temoignages-grid{grid-template-columns:1fr!important;}
          .aa{grid-template-columns:1fr!important;}
          .tg{grid-template-columns:1fr!important;}
          .mg{grid-template-columns:1fr!important;gap:24px!important;}
          .footer-inner{flex-direction:column!important;gap:16px!important;text-align:center!important;}
          .footer-links{flex-wrap:wrap!important;justify-content:center!important;gap:12px!important;}
          section{padding:48px 16px!important;}
          .section-pad{padding:48px 16px!important;}
          .cta-section{padding:48px 16px!important;}
          .footer-section{padding:24px 16px!important;}
        }
        
        .hamburger{display:none;}
        .mobile-nav{display:none;}
        @media(max-width:768px){
          .hamburger{display:flex!important;}
          .mobile-nav{display:flex!important;}
        }
      
        .hamburger{display:none;}
        .mobile-nav{display:none;}
        @media(max-width:768px){
          .hamburger{display:flex!important;}
          .mobile-nav{display:flex!important;}
          .mg{grid-template-columns:1fr!important;gap:24px!important;}
          .mod-img{height:80px!important;display:flex;align-items:center;justify-content:center;}
          .mod-desc{display:none;}
          .mod-bullets{display:none;}
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
            <a href="/contact" style={{color:C.text,fontSize:'14px',fontWeight:500,padding:'8px 14px',textDecoration:'none'}}>Contactez-nous</a>
          </div>
        </div>
        <div className="nc" style={{alignItems:'center',gap:'16px'}}>
          <a href="/login" style={{color:C.dark,fontSize:'14px',fontWeight:600,textDecoration:'none'}}>Se connecter</a>
          <a href="/tarifs" style={{background:C.dark,color:C.white,padding:'11px 22px',borderRadius:'32px',fontSize:'13px',fontWeight:700,textDecoration:'none'}}>Commencer</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: `1px solid ${C.border}`, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? <path d="M4 4L16 16M16 4L4 16" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/> : <path d="M3 5h14M3 10h14M3 15h14" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>}
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-nav" style={{ flexDirection: 'column', background: C.white, borderBottom: `1px solid ${C.border}`, padding: '16px 20px', gap: '4px', position: 'sticky', top: '68px', zIndex: 49 }}>
          <a href="/pourquoi" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Pourquoi DadUp</a>
          <a href="/inclus" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Ce qui est inclus</a>
          <a href="/tarifs" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Tarifs</a>
          <a href="/contact" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Contactez-nous</a>
          <a href="/login" style={{ color: C.dark, fontSize: '15px', fontWeight: 700, padding: '10px 8px', textDecoration: 'none' }}>Se connecter</a>
        </div>
      )}

      {/* HERO */}
      <section style={{background:C.dark,padding:'80px 40px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          <h1 style={{color:C.white,fontSize:'52px',fontWeight:800,margin:'0 0 24px',lineHeight:1.1}}>
            Ce qui est<br/><span style={{color:C.gold}}>inclus.</span>
          </h1>
          <p style={{color:'#6a7585',fontSize:'18px',lineHeight:1.7,margin:0}}>Tout ce dont tu as besoin, au bon moment.</p>
        </div>
      </section>

      {/* MODULES */}
      <section className="sp" style={{padding:'80px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'56px'}}>
          {MODULES.map((m,i)=>(
            <div key={i} className="mg" style={{direction: i%2===1?'rtl':'ltr'}}>
              <div style={{direction:'ltr'}}>
                <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'16px'}}>
                  <span style={{color:C.border,fontSize:'44px',fontWeight:800,lineHeight:1}}>{m.num}</span>
                  <h2 style={{color:C.dark,fontSize:'24px',fontWeight:800,margin:0}}>{m.titre}</h2>
                </div>
                <p className='mod-desc' style={{color:C.text,fontSize:'15px',lineHeight:1.7,margin:'0 0 20px'}}>{m.desc}</p>
                <div className='mod-bullets' style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {m.details.map((d,j)=>(
                    <div key={j} style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                      <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.blue,flexShrink:0,marginTop:'6px'}}></div>
                      <p style={{color:C.blueDark,fontSize:'14px',margin:0,lineHeight:1.5}}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mod-img" style={{direction:'ltr',background:m.bg,borderRadius:'24px',height:'280px',display:'flex',alignItems:'center',justifyContent:'center',border:m.dark?'none':`1px solid ${C.border}`,overflow:'hidden',padding:'20px'}}>
                <ModulePreview num={m.num} dark={m.dark} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{background:C.dark,padding:'80px 40px',textAlign:'center' as const}}>
        <p style={{color:C.gold,fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 16px'}}>Accès complet</p>
        <h2 style={{color:C.white,fontSize:'38px',fontWeight:800,margin:'0 0 12px'}}>35,99€ par an</h2>
        <p style={{color:'#6a7585',fontSize:'16px',margin:'0 0 32px'}}>Paiement unique. Accès complet pendant 12 mois.</p>
        <a href="/tarifs" style={{background:C.gold,color:'#1c1510',padding:'16px 40px',borderRadius:'32px',fontSize:'15px',fontWeight:800,textDecoration:'none',display:'inline-block'}}>Commencer</a>
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
              <a href="/professionnels" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Professionnels</a>
              <a href="/sources" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Sources</a>
              <a href="/contact" style={{color:'#6a7585',fontSize:'13px',textDecoration:'none'}}>Contactez-nous</a>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'12px',paddingTop:'12px',borderTop:'1px solid #2e3848'}}>
            <div style={{display:'flex',gap:'20px',flexWrap:'wrap' as const}}>
              <a href="/cgv" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>CGV</a>
              <a href="/confidentialite" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>Confidentialité</a>
              <a href="/mentions-legales" style={{color:'#3d4f6a',fontSize:'12px',textDecoration:'none'}}>Mentions légales</a>
            </div>
            <p style={{color:'#3d4f6a',fontSize:'12px',margin:0}}>Il ne remplace pas l&apos;avis d&apos;un médecin.</p>
          </div>
        </div>
      </footer>
      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
