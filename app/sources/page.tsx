'use client';
import { Logo } from '../components/Logo';

const C = {
  dark: '#15263A', gold: '#B4593A', cream: '#F6F1E9', white: '#ffffff',
  border: '#E6E0D5', text: '#3D4A55', textLight: '#56616B',
  blue: '#2E5F8A', bluePale: '#ffffff', blueDark: '#1A3D5C',
};

const SOURCES = [
  {
    sigle: "HAS",
    nom: "Haute Autorité de Santé",
    description: "Les recommandations de suivi de grossesse, le calendrier des consultations et les protocoles accouchement sont issus des guides de la HAS.",
    url: "https://www.has-sante.fr",
    couleur: "#1A3D5C",
  },
  {
    sigle: "OMS",
    nom: "Organisation Mondiale de la Santé",
    description: "Les données sur le développement foetal, la nutrition périnatale et les recommandations de suivi prénatal sont issues des publications de l'OMS.",
    url: "https://www.who.int/fr",
    couleur: "#1A3D5C",
  },
  {
    sigle: "ESPGHAN",
    nom: "Société Européenne de Gastroentérologie Pédiatrique",
    description: "Les recommandations sur l'allaitement, la diversification alimentaire et la nutrition du nourrisson sont tirées des guidelines ESPGHAN.",
    url: "https://www.espghan.org",
    couleur: "#1A3D5C",
  },
  {
    sigle: "Inserm",
    nom: "Institut national de la santé et de la recherche médicale",
    description: "Les données sur le développement neurologique, le baby blues et l'attachement père-enfant proviennent des publications de l'Inserm.",
    url: "https://www.inserm.fr",
    couleur: "#1A3D5C",
  },
];

const EXEMPLES = [
  {
    sujet: "Baby blues",
    contenu: "Le baby blues touche 50 à 80% des femmes dans les jours qui suivent l'accouchement. Il se distingue de la dépression post-partum par sa durée (moins de 2 semaines) et son intensité.",
    source: "Inserm, Dépression du post-partum, 2021",
  },
  {
    sujet: "Congé paternité",
    contenu: "Le congé paternité de 28 jours, dont 7 jours obligatoires, a été étendu en juillet 2021. Son impact positif sur l'implication du père dans les soins est documenté.",
    source: "DREES, Études et résultats n°1242, 2022",
  },
  {
    sujet: "Suivi prénatal",
    contenu: "La HAS recommande un minimum de 7 consultations prénatales et 3 échographies obligatoires. Chaque examen a un objectif précis que le père peut comprendre et anticiper.",
    source: "HAS, Suivi et orientation des femmes enceintes, 2016",
  },
];

export default function MethodologiePage() {
  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: 'inherit' }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .sources-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          nav{padding:0 16px!important;}
          .sp{padding:48px 20px!important;}
          h1{font-size:32px!important;}
          .sources-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Logo fond="creme" hauteur={30} />
          </a>
          <div className="nl" style={{ gap: '4px' }}>
            <a href="/pourquoi" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Pourquoi DadUp</a>
            <a href="/inclus" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Ce qui est inclus</a>
            <a href="/tarifs" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Tarifs</a>
            <a href="/contact" style={{ color: C.text, fontSize: '14px', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Contactez-nous</a>
          </div>
        </div>
        <div className="nc" style={{ alignItems: 'center', gap: '16px' }}>
          <a href="/login" style={{ color: C.dark, fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Se connecter</a>
          <a href="/tarifs" style={{ background: C.dark, color: C.white, padding: '11px 22px', borderRadius: '32px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Commencer</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: C.dark, padding: '72px 40px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#C9D8C4', fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px' }}>Notre approche</p>
          <h1 style={{ color: C.white, fontSize: '44px', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.15 }}>
            Un contenu <span style={{ color: '#C9D8C4' }}>sourcé et vérifié.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '17px', lineHeight: 1.75, margin: 0 }}>
            Chaque information s'appuie sur des recommandations médicales publiées par des institutions reconnues.
          </p>
        </div>
      </section>

      {/* POURQUOI C'EST IMPORTANT */}
      <section className="sp" style={{ padding: '72px 40px', maxWidth: '760px', margin: '0 auto' }}>
        <p style={{ color: C.blue, fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px' }}>Pourquoi ça compte</p>
        <h2 style={{ color: C.dark, fontSize: '28px', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.3 }}>Un père bien informé prend de meilleures décisions.</h2>
        <p style={{ color: C.text, fontSize: '16px', lineHeight: 1.85, margin: '0 0 16px' }}>
          Internet regorge de conseils contradictoires sur la grossesse. Forums, blogs, réseaux sociaux : il est difficile de savoir ce qui est fiable. DadUp fait ce travail de sélection et de vérification.
        </p>
        <p style={{ color: C.text, fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
          Chaque semaine de contenu, chaque information sur le développement de bébé, chaque conseil pratique est issu de publications scientifiques ou de recommandations officielles. Si une information ne peut pas être sourcée, elle n'est pas dans DadUp.
        </p>
      </section>

      {/* SOURCES */}
      <section style={{ background: C.white, padding: '72px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: C.blue, fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px', textAlign: 'center' }}>Nos références</p>
          <h2 style={{ color: C.dark, fontSize: '32px', fontWeight: 800, margin: '0 0 48px', textAlign: 'center' }}>Les institutions qui guident notre contenu</h2>
          <div className="sources-grid">
            {SOURCES.map((s, i) => (
              <div key={i} style={{ background: C.cream, borderRadius: '20px', padding: '28px', border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{ background: s.couleur, color: '#fff', borderRadius: '10px', padding: '8px 14px', fontSize: '15px', fontWeight: 800, flexShrink: 0 }}>
                    {s.sigle}
                  </div>
                  <p style={{ color: C.dark, fontSize: '13px', fontWeight: 700, lineHeight: 1.4 }}>{s.nom}</p>
                </div>
                <p style={{ color: C.text, fontSize: '14px', lineHeight: 1.75, margin: '0 0 12px' }}>{s.description}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: C.blue, fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>Visiter le site →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.dark, padding: '72px 40px', textAlign: 'center' as const }}>
        <p style={{ color: '#C9D8C4', fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 16px' }}>Accéder à DadUp</p>
        
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '16px', margin: '0 0 36px' }}>49,99€ accès complet · Paiement unique · Accès immédiat</p>
        <a href="/tarifs" style={{ background: C.gold, color: '#ffffff', padding: '18px 48px', borderRadius: '32px', fontSize: '16px', fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
          Commencer
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.dark, borderTop: '1px solid #2e3848', padding: '32px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Logo fond="marine" hauteur={26} />
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
              <a href="/pourquoi" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', textDecoration: 'none' }}>Pourquoi DadUp</a>
              <a href="/inclus" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', textDecoration: 'none' }}>Ce qui est inclus</a>
              <a href="/tarifs" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', textDecoration: 'none' }}>Tarifs</a>
              <a href="/professionnels" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', textDecoration: 'none' }}>Professionnels</a>
              <a href="/sources" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', textDecoration: 'none' }}>Sources</a>
              <a href="/contact" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', textDecoration: 'none' }}>Contactez-nous</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px', paddingTop: '12px', borderTop: '1px solid #2e3848' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
              <a href="/cgv" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', textDecoration: 'none' }}>CGV</a>
              <a href="/confidentialite" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', textDecoration: 'none' }}>Confidentialité</a>
              <a href="/mentions-legales" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', textDecoration: 'none' }}>Mentions légales</a>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', margin: 0 }}>Il ne remplace pas l&apos;avis d&apos;un médecin.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
