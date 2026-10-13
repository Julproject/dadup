'use client';
import { useState } from 'react';
import { SEMAINES } from './PsychoPage';

// ── Styles partagés (système unifié du dashboard) ─────────────────────────────
const LABEL = { fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#6a7585', margin: '0 0 8px' };
const TITRE = { fontSize: '16px', fontWeight: 800, color: '#1e2535', margin: 0, lineHeight: 1.35 };
const TEXTE = { fontSize: '14px', color: '#1e2535', lineHeight: 1.75, margin: 0 };

// ── Le défi à deux : une conversation de 15 minutes par semaine ───────────────
const DEFIS = [
  { titre: 'Ce qui vous rend fiers', texte: 'Chacun dit une chose dont il est fier chez l\'autre depuis le début de la grossesse. Juste ça, sans rien ajouter.' },
  { titre: 'Les visites après la naissance', texte: 'Qui voulez-vous voir à la maternité, et qui plutôt après le retour à la maison ? Mettez-vous d\'accord maintenant, ce sera plus simple à annoncer.' },
  { titre: 'Qui se lève la nuit ?', texte: 'Parlez de la répartition des nuits avant que bébé arrive. Pas besoin d\'un plan parfait, juste d\'un point de départ à deux.' },
  { titre: 'Trois valeurs à transmettre', texte: 'Chacun écrit trois valeurs qu\'il aimerait transmettre à votre enfant. Comparez vos listes et gardez celles qui vous ressemblent.' },
  { titre: 'Ce que vous gardez de vos parents', texte: 'Qu\'est-ce que vous aimeriez reproduire de votre propre enfance, et qu\'est-ce que vous voulez faire autrement ?' },
  { titre: 'Un moment rien qu\'à vous', texte: 'Choisissez un rituel de couple à garder après la naissance, même court : un café le matin, une balade le dimanche.' },
  { titre: 'Les tâches de la maison', texte: 'Listez ensemble les tâches du quotidien et répartissez-les pour les semaines qui viennent. Ce que tu prends, tu le gardes.' },
  { titre: 'Ce qui l\'inquiète, ce qui t\'inquiète', texte: 'Chacun partage une inquiétude sur l\'arrivée de bébé. L\'autre écoute sans chercher à rassurer tout de suite.' },
  { titre: 'Le prénom, en vrai', texte: 'Dites vos prénoms préférés à voix haute, avec votre nom de famille. Imaginez-les dans une cour d\'école et au travail.' },
  { titre: 'Votre lettre à bébé', texte: 'Écrivez chacun quelques lignes à votre enfant, à lui faire lire plus tard. Vous ouvrirez les lettres ensemble.' },
  { titre: 'Les premiers jours à la maison', texte: 'À quoi ressemble votre première semaine idéale à trois ? Repas, visites, sorties : imaginez-la ensemble.' },
  { titre: 'Demander de l\'aide', texte: 'Sur qui pouvez-vous compter autour de vous ? Notez deux ou trois personnes et ce que chacune pourrait faire.' },
];



const ICON_POURQUOI = 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h5';
const ICON_FAIRE = 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9';

export default function ToiPage({ C, saReelle }: any) {
  const sa = saReelle || 20;
  const defi = DEFIS[sa % DEFIS.length];
  const cleDefi = `sa${sa}`;

  const [defisFaits, setDefisFaits] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem('dadup_defis') || '{}'); } catch { return {}; }
  });
  const [ouverte, setOuverte] = useState<string | null>('faire');

  const semaine = SEMAINES.find(s => s.sa === sa)
    || SEMAINES.reduce((p, c) => Math.abs(c.sa - sa) < Math.abs(p.sa - sa) ? c : p, SEMAINES[0]);
  const fichesSemaine = semaine ? [
    { id: 'faire', icon: ICON_FAIRE, titre: 'Ce que tu peux faire cette semaine', texte: semaine.conseil },
    { id: 'pourquoi', icon: ICON_POURQUOI, titre: 'Pourquoi tu ressens ça', texte: semaine.corps },
  ] : [];

  const toggleDefi = () => {
    const next = { ...defisFaits, [cleDefi]: !defisFaits[cleDefi] };
    setDefisFaits(next);
    try { localStorage.setItem('dadup_defis', JSON.stringify(next)); } catch {}
  };
  const fait = !!defisFaits[cleDefi];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* EN-TÊTE */}
      <div>
        <p style={LABEL}>Toi</p>
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e2535', margin: 0, lineHeight: 1.25 }}>Toi aussi, tu deviens parent</h2>
      </div>

      {/* DÉFI À DEUX */}
      <div style={{ background: 'linear-gradient(135deg,#0a1f32,#1A3D5C 60%,#1d4d72)', borderRadius: '20px', padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(157,176,154,0.22) 0%,transparent 65%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' as const }}>
            <p style={{ ...LABEL, color: '#C9D8C4', margin: 0 }}>Le défi à deux de la semaine</p>
            <span style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '99px', padding: '4px 10px', fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>15 min</span>
          </div>
          <p style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: 0, lineHeight: 1.25 }}>{defi.titre}</p>
          <p style={{ ...TEXTE, color: 'rgba(255,255,255,0.85)' }}>{defi.texte}</p>
          <button onClick={toggleDefi} aria-pressed={fait} style={{
            alignSelf: 'flex-start', minHeight: '44px', marginTop: '4px', border: 'none', borderRadius: '99px', padding: '11px 22px', cursor: 'pointer',
            fontSize: '14px', fontWeight: 800,
            background: fait ? 'rgba(255,255,255,0.14)' : '#B4593A',
            color: '#ffffff',
          }}>{fait ? '✓ Fait cette semaine' : 'C\'est fait'}</button>
        </div>
      </div>

      {/* CE QUE TU RESSENS CETTE SEMAINE */}
      {semaine && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ ...LABEL, margin: '8px 0 0' }}>Ce que tu ressens cette semaine</p>
          <div style={{ background: '#ffffff', border: '1px solid #E6E0D5', borderRadius: '20px', padding: '22px 24px', boxShadow: '0 6px 20px rgba(21,38,58,0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ alignSelf: 'flex-start', background: 'linear-gradient(160deg,#0c1d2e,#1A3D5C)', color: '#ffffff', borderRadius: '8px', padding: '4px 10px', fontSize: '12px', fontWeight: 800 }}>SA {semaine.sa}</span>
            <p style={{ fontSize: '20px', fontWeight: 800, color: '#15263A', margin: 0, lineHeight: 1.3, letterSpacing: '-0.3px' }}>{semaine.titre}</p>
            <p style={TEXTE}>{semaine.intro}</p>
          </div>
          {fichesSemaine.map(f => {
            const open = ouverte === f.id;
            return (
            <div key={f.id} style={{ background: '#ffffff', border: '1px solid #E6E0D5', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(21,38,58,0.05)' }}>
              <button onClick={() => setOuverte(open ? null : f.id)} aria-expanded={open} style={{
                width: '100%', minHeight: '56px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' as const,
                padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
              }}>
                <span style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(160deg,#0c1d2e,#1A3D5C)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DCE5D7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={f.icon} /></svg>
                </span>
                <span style={{ ...TITRE, flex: 1 }}>{f.titre}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3D5C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {open && (
                <div style={{ padding: '0 18px 18px 78px' }}>
                  {f.texte.split('\n\n').map((para: string, i: number) => <p key={i} style={{ ...TEXTE, marginTop: i ? '12px' : 0 }}>{para}</p>)}
                </div>
              )}
            </div>
            );
          })}
        </div>
      )}

      {/* À QUI EN PARLER */}
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '22px 24px', boxShadow: '0 2px 12px rgba(26,61,92,0.06)' }}>
        <p style={LABEL}>Besoin d&apos;en parler ?</p>
        <p style={{ ...TITRE, marginBottom: '10px' }}>Tu n&apos;as pas à tout porter seul</p>
        <p style={{ ...TEXTE, marginBottom: '12px' }}>La dépression touche aussi les pères, pendant la grossesse comme après la naissance. Si tu ne te sens pas bien pendant plus de deux semaines, parles-en à ton médecin.</p>
        <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li style={TEXTE}>Ton médecin traitant, le premier interlocuteur pour toi aussi</li>
          <li style={TEXTE}>La PMI de ton quartier, ouverte aux deux parents</li>
          <li style={TEXTE}>Un psychologue, avec des séances remboursées grâce au dispositif Mon soutien psy</li>
        </ul>
        <a href="https://www.doctolib.fr/psychologue" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', marginTop: '14px', background: 'linear-gradient(160deg,#0c1d2e,#1A3D5C)', color: '#ffffff', padding: '11px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, textDecoration: 'none' }}>Trouver un psychologue sur Doctolib</a>
      </div>

      {/* MENTION MÉDICALE */}
      <div style={{ background: '#ffffff', borderRadius: '14px', padding: '12px 16px', border: '1px solid #E6E0D5' }}>
        <p style={{ color: '#5f6b72', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>DadUp ne remplace pas l&apos;avis d&apos;un professionnel. Si tu traverses quelque chose de difficile, parles-en à ton médecin.</p>
      </div>
    </div>
  );
}
