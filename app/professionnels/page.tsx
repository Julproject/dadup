'use client';

import { useState } from 'react';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA',
};

export default function ProfessionnelsPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', profession: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          sujet: `Professionnel de santé : ${form.profession}`,
          message: `Nom : ${form.nom}\nProfession : ${form.profession}\n\n${form.message}`,
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: C.cream, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .nl{display:flex;}.nc{display:flex;}
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
        .atouts-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;}
        @media(max-width:768px){
          .nl{display:none!important;}.nc{display:none!important;}
          nav{padding:0 16px!important;}
          h1{font-size:32px!important;}
          .sp{padding:48px 20px!important;}
          .hero-grid{grid-template-columns:1fr!important;gap:32px!important;}
          .atouts-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <svg viewBox="0 0 300 300" width="34" height="34"><circle cx="150" cy="150" r="145" fill="#3a4f6e"/><circle cx="150" cy="150" r="122" fill="#4a6080"/><ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/><circle cx="150" cy="112" r="40" fill="#c8a060"/><ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/><circle cx="150" cy="128" r="26" fill="#faf6f0"/></svg>
            <span style={{ fontWeight: 800, color: C.dark, fontSize: '20px' }}>DadUp</span>
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
      <section style={{ background: C.dark, padding: '80px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="hero-grid">
            <div>
              <p style={{ color: C.gold, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 20px' }}>Professionnels de santé</p>
              <h1 style={{ color: C.white, fontSize: '42px', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.15 }}>
                Un outil pour les pères que vous accompagnez.
              </h1>
              <p style={{ color: '#6a7585', fontSize: '16px', lineHeight: 1.8, margin: 0 }}>
                Sages-femmes, médecins, maïeuticiennes — vous voyez des futurs pères démunis à chaque consultation. DadUp leur apporte un suivi structuré, semaine par semaine, fondé sur les recommandations HAS et OMS.
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: C.gold, fontSize: '13px', fontWeight: 700, margin: '0 0 20px' }}>Ce que DadUp couvre</p>
              {[
                'Suivi du développement fœtal SA 3 à SA 41',
                'Calendrier des consultations obligatoires',
                'Préparation à la naissance et à l\'accouchement',
                'Post-partum et première année de bébé',
                'Contenu sourcé HAS, OMS, ESPGHAN, Inserm',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ color: C.gold, flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI RECOMMANDER */}
      <section className="sp" style={{ padding: '72px 40px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 20px' }}>Pourquoi le recommander</p>
        <h2 style={{ color: C.dark, fontSize: '30px', fontWeight: 800, margin: '0 0 40px' }}>Le père, souvent le grand oublié du suivi prénatal.</h2>
        <div className="atouts-grid">
          {[
            {
              titre: 'Contenu médical fiable',
              desc: 'Chaque information s\'appuie sur les recommandations officielles HAS, OMS, ESPGHAN et Inserm. Rien n\'est inventé.',
            },
            {
              titre: 'Complémentaire à votre suivi',
              desc: 'DadUp n\'a pas vocation à remplacer l\'accompagnement médical. Il prépare le père avant chaque consultation.',
            },
            {
              titre: 'Conçu pour les pères',
              desc: 'Le contenu est écrit du point de vue du père, pas du couple. Il répond aux questions qu\'ils n\'osent pas toujours poser.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: C.white, borderRadius: '20px', padding: '28px', border: `1px solid ${C.border}` }}>
              <div style={{ width: '36px', height: '4px', background: C.gold, borderRadius: '2px', marginBottom: '16px' }}></div>
              <p style={{ color: C.dark, fontSize: '15px', fontWeight: 700, margin: '0 0 10px' }}>{item.titre}</p>
              <p style={{ color: C.text, fontSize: '14px', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULAIRE CONTACT */}
      <section style={{ background: C.white, padding: '72px 40px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 16px' }}>Nous contacter</p>
          <h2 style={{ color: C.dark, fontSize: '28px', fontWeight: 800, margin: '0 0 12px' }}>Vous souhaitez en savoir plus ?</h2>
          <p style={{ color: C.text, fontSize: '15px', lineHeight: 1.75, margin: '0 0 36px' }}>
            Écrivez-nous pour obtenir des informations sur DadUp, discuter d'un partenariat ou proposer DadUp à vos patients.
          </p>

          {!sent ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: C.dark, fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Nom</label>
                  <input
                    type="text"
                    value={form.nom}
                    onChange={e => setForm({ ...form, nom: e.target.value })}
                    required
                    style={{ width: '100%', background: C.cream, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '12px 16px', fontSize: '14px', color: C.dark, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: C.dark, fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    style={{ width: '100%', background: C.cream, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '12px 16px', fontSize: '14px', color: C.dark, outline: 'none' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', color: C.dark, fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Profession</label>
                <input
                  type="text"
                  value={form.profession}
                  placeholder="Sage-femme, médecin, maïeuticien..."
                  onChange={e => setForm({ ...form, profession: e.target.value })}
                  required
                  style={{ width: '100%', background: C.cream, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '12px 16px', fontSize: '14px', color: C.dark, outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: C.dark, fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  style={{ width: '100%', background: C.cream, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '12px 16px', fontSize: '14px', color: C.dark, outline: 'none', resize: 'vertical' as const }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ background: C.dark, color: C.white, border: 'none', padding: '16px', borderRadius: '32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          ) : (
            <div style={{ background: C.cream, borderRadius: '20px', padding: '40px', textAlign: 'center' as const }}>
              <p style={{ fontSize: '36px', margin: '0 0 16px' }}>✓</p>
              <p style={{ color: C.dark, fontSize: '17px', fontWeight: 700, margin: '0 0 8px' }}>Message reçu.</p>
              <p style={{ color: C.text, fontSize: '14px', margin: 0 }}>Nous vous répondrons dans les 48 heures.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.dark, borderTop: '1px solid #2e3848', padding: '32px 40px' }}>
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
    </main>
  );
}
