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
    desc:"De la naissance à la première année de bébé. Développement, vaccins, diversification, premiers mots, premières chutes. Tout ce que tu dois savoir.",
    details:["12 mois de la première année","Développement mois par mois","Vaccins, RDV médicaux, alertes","Activités à faire avec bébé"],
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
    <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'12px', padding:'8px'}}>
      <div style={{background:cardBg, borderRadius:'16px', padding:'16px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'10px'}}>
          <span style={{fontSize:'28px'}}>🍋</span>
          <div>
            <p style={{color:subColor, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', margin:'0 0 2px'}}>Semaine 20</p>
            <p style={{color:textColor, fontSize:'13px', fontWeight:800, margin:0}}>La mi-grossesse</p>
          </div>
        </div>
        <div style={{display:'flex', gap:'12px', marginBottom:'10px'}}>
          <span style={{color:subColor, fontSize:'10px'}}>16,4 cm</span>
          <span style={{color:subColor, fontSize:'10px'}}>300 g</span>
        </div>
        <p style={{color:dark ? 'rgba(255,255,255,0.55)' : '#6a7585', fontSize:'10px', lineHeight:1.6, margin:0}}>
          L'échographie T2 examine chaque organe. Le sexe est généralement visible.
        </p>
      </div>
      <p style={{color:subColor, fontSize:'9px', textAlign:'center', margin:0}}>SA 3 · SA 4 · SA 5 · <strong style={{color:gold}}>SA 20</strong> · SA 21 · · · SA 41</p>
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
    <main style={{ minHeight: '100vh', background: '#faf6f0', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .grid6{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .hamburger{display:none;}
        .mobile-nav{display:none;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          nav{padding:0 16px!important;}
          h1{font-size:36px!important;}
          .sp{padding:48px 20px!important;}
          .grid6{grid-template-columns:1fr 1fr!important;}
          .grid2{grid-template-columns:1fr!important;}
          .hamburger{display:flex!important;}
          .mobile-nav{display:flex!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background: '#faf6f0', borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <svg viewBox="0 0 300 300" width="34" height="34"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{ fontWeight: 800, color: C.dark, fontSize: '20px' }}>DadUp</span>
          </a>
          <div className="nl" style={{ gap: '4px' }}>
            <a href="/pourquoi" style={{ color: C.dark, fontSize: '14px', fontWeight: 700, padding: '8px 14px', textDecoration: 'none' }}>Pourquoi DadUp</a>
            <a href="/inclus" style={{ color: C.dark, fontSize: '14px', fontWeight: 700, padding: '8px 14px', textDecoration: 'none', borderBottom: `2px solid ${C.gold}` }}>Ce qui est inclus</a>
            <a href="/tarifs" style={{ color: C.dark, fontSize: '14px', fontWeight: 700, padding: '8px 14px', textDecoration: 'none' }}>Tarifs</a>
            <a href="/contact" style={{ color: C.dark, fontSize: '14px', fontWeight: 700, padding: '8px 14px', textDecoration: 'none' }}>Contactez-nous</a>
          </div>
        </div>
        <div className="nc" style={{ alignItems: 'center', gap: '16px' }}>
          <a href="/login" style={{ color: C.dark, fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Se connecter</a>
          <button onClick={() => setShowModal(true)} style={{ background: 'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', color: C.white, padding: '11px 22px', borderRadius: '32px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Commencer</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: `1px solid ${C.border}`, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? <path d="M4 4L16 16M16 4L4 16" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/> : <path d="M3 5h14M3 10h14M3 15h14" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>}
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-nav" style={{ flexDirection: 'column', background: '#faf6f0', borderBottom: `1px solid ${C.border}`, padding: '16px 20px', gap: '4px', position: 'sticky', top: '68px', zIndex: 49 }}>
          <a href="/pourquoi" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Pourquoi DadUp</a>
          <a href="/inclus" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Ce qui est inclus</a>
          <a href="/tarifs" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Tarifs</a>
          <a href="/contact" style={{ color: C.text, fontSize: '15px', padding: '10px 8px', textDecoration: 'none', borderBottom: `1px solid ${C.cream}` }}>Contactez-nous</a>
          <a href="/login" style={{ color: C.dark, fontSize: '15px', fontWeight: 700, padding: '10px 8px', textDecoration: 'none' }}>Se connecter</a>
        </div>
      )}

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', padding: '72px 40px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: C.gold, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 20px' }}>Ce qui est inclus</p>
          <h1 style={{ color: C.white, fontSize: '44px', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.1 }}>De la grossesse au premier anniversaire</h1>
          <p style={{ color: '#6a7585', fontSize: '17px', lineHeight: 1.75, margin: 0 }}>Tout ce que tu as besoin de savoir, organisé par thème, personnalisé à ta DPA</p>
        </div>
      </section>

      {/* 6 CASES */}
      <section className="sp" style={{ padding: '64px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="grid6">
          {[
            { titre: 'Calendrier des rendez-vous', desc: '8 consultations expliquées pas à pas, ce que tu dois demander, ton rôle précis', bg: '#E6F0FA', titleColor: '#1A3D5C', descColor: '#2E5F8A', dark: false },
            { titre: 'Suivi bébé semaine par semaine', desc: 'SA 3 à SA 41, développement des organes, taille, poids', bg: '#e8f4e8', titleColor: '#1e4a1e', descColor: '#3a7a3a', dark: false },
            { titre: 'Guide accouchement', desc: 'Contractions, départ maternité, salle de naissance, comment soutenir', bg: C.dark, titleColor: C.white, descColor: 'rgba(255,255,255,0.55)', dark: true },
            { titre: 'Valise maternité', desc: 'Checklist complète pour toi, elle et bébé', bg: '#fdf0e6', titleColor: '#7a3a10', descColor: '#b06020', dark: false },
            { titre: 'Post-partum', desc: 'Baby blues, manque de sommeil, couple, ton rôle dès le retour à la maison', bg: '#e6f5f2', titleColor: '#1a4a40', descColor: '#2a7a6a', dark: false },
            { titre: 'Première année de bébé', desc: '12 mois de la première année de bébé, diversification, premiers mots', bg: '#f0ecfa', titleColor: '#3a2a6a', descColor: '#6a4aaa', dark: false },
          ].map((m, i) => (
            <div key={i} style={{ background: m.bg, borderRadius: '16px', padding: '24px', border: m.dark ? 'none' : `1px solid ${C.border}` }}>
              <div style={{ width: '28px', height: '3px', borderRadius: '2px', background: 'linear-gradient(135deg,#c8a060,#e8c070)', marginBottom: '12px' }}></div>
              <p style={{ color: m.titleColor, fontSize: '14px', fontWeight: 700, margin: '0 0 8px' }}>{m.titre}</p>
              <p style={{ color: m.descColor, fontSize: '13px', lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ECHANTILLON */}
      <div style={{ position: 'relative' }}>

        {/* Bande crème pour chevauchement */}
        <div style={{ background: '#faf6f0', height: '80px' }}></div>

        {/* Section sombre */}
        <div style={{ background: 'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', padding: '0 40px 64px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '56px' }}>

            {/* iPhone avec relief */}
            <div style={{ flexShrink: 0, marginTop: '-100px', transform: 'rotate(-5deg)', position: 'relative', zIndex: 2 }}>
              <div style={{
                background: 'linear-gradient(145deg, #2a2a2e 0%, #0d0d0f 60%, #1a1a1c 100%)',
                borderRadius: '42px',
                padding: '8px',
                width: '175px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)',
              }}>
                {/* Reflet de lumière sur le bord */}
                <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', borderRadius: '999px' }}></div>
                <div style={{ background: 'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', borderRadius: '36px 36px 0 0', padding: '10px 14px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                  <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>9:41</span>
                  <div style={{ background: '#1c1c1e', borderRadius: '20px', padding: '3px 10px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ width: '6px', height: '6px', background: '#2a2a2c', borderRadius: '50%' }}></div>
                  </div>
                  <span style={{ color: '#fff', fontSize: '7px' }}>●●● ■</span>
                </div>
                <div style={{ background: '#faf6f0', borderRadius: '0 0 34px 34px', overflow: 'hidden', position: 'relative' }}>
                  {/* Reflet écran */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }}></div>
                  <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>

                    <div style={{ background: 'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', borderRadius: '10px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>🍋</span>
                      <div>
                        <p style={{ color: C.gold, fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: '0 0 1px' }}>Semaine 20</p>
                        <p style={{ color: '#fff', fontSize: '10px', fontWeight: 700, margin: '0 0 1px' }}>La mi-grossesse</p>
                        <p style={{ fontSize: '7px', color: '#6a7585', margin: 0 }}>16,4 cm · 300 g</p>
                      </div>
                    </div>

                    <div style={{ background: '#E6F0FA', borderRadius: '10px', padding: '9px 12px' }}>
                      <p style={{ color: '#2E5F8A', fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: '0 0 3px' }}>Développement</p>
                      <p style={{ color: '#1A3D5C', fontSize: '9px', lineHeight: 1.6, margin: 0 }}>L&apos;échographie T2 examine chaque organe</p>
                    </div>

                    <div style={{ background: 'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', borderRadius: '10px', padding: '9px 12px' }}>
                      <p style={{ color: C.gold, fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: '0 0 3px' }}>Le saviez-vous ?</p>
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '9px', lineHeight: 1.6, margin: 0 }}>Plus de 100 critères anatomiques</p>
                    </div>

                    <div style={{ background: '#e8f4e8', borderRadius: '10px', padding: '9px 12px' }}>
                      <p style={{ color: '#3a7a3a', fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: '0 0 3px' }}>Comment elle vit cette semaine</p>
                      <p style={{ color: '#1e4a1e', fontSize: '9px', lineHeight: 1.6, margin: 0 }}>Anxiété mêlée d&apos;excitation</p>
                    </div>



                    <div style={{ textAlign: 'center', padding: '4px 0 2px' }}>
                      <div style={{ background: '#6a7585', width: '36px', height: '3px', borderRadius: '3px', display: 'inline-block' }}></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ flex: 1, paddingTop: '20px' }}>
              <p style={{ color: C.gold, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>Un échantillon du contenu qui t&apos;attend</p>
              <p style={{ color: C.white, fontSize: '28px', fontWeight: 800, margin: '0 0 28px', lineHeight: 1.25 }}>Tout ce dont tu as besoin, au bon moment</p>
              <div>
                <button onClick={() => setShowModal(true)} style={{ background: 'linear-gradient(135deg,#c8a060,#e8c070)', color: '#1c1510', border: 'none', padding: '16px 32px', borderRadius: '32px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', display: 'block', marginBottom: '10px', width: '100%' }}>
                  Commencer · 49,99€
                </button>
                <p style={{ color: '#6a7585', fontSize: '12px', margin: 0, textAlign: 'center' as const }}>Satisfait ou remboursé sous 14 jours</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)', borderTop: '1px solid #2e3848', padding: '32px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 300 300" width="28" height="28"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
              <span style={{ color: C.white, fontSize: '16px', fontWeight: 700 }}>DadUp</span>
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
              <a href="/pourquoi" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Pourquoi DadUp</a>
              <a href="/inclus" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Ce qui est inclus</a>
              <a href="/tarifs" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Tarifs</a>
              <a href="/professionnels" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Professionnels</a>
              <a href="/sources" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Sources</a>
              <a href="/contact" style={{ color: '#6a7585', fontSize: '13px', textDecoration: 'none' }}>Contactez-nous</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px', paddingTop: '12px', borderTop: '1px solid #2e3848' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
              <a href="/cgv" style={{ color: '#3d4f6a', fontSize: '12px', textDecoration: 'none' }}>CGV</a>
              <a href="/confidentialite" style={{ color: '#3d4f6a', fontSize: '12px', textDecoration: 'none' }}>Confidentialité</a>
              <a href="/mentions-legales" style={{ color: '#3d4f6a', fontSize: '12px', textDecoration: 'none' }}>Mentions légales</a>
            </div>
            <p style={{ color: '#3d4f6a', fontSize: '12px', margin: 0 }}>Il ne remplace pas l&apos;avis d&apos;un médecin.</p>
          </div>
        </div>
      </footer>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
