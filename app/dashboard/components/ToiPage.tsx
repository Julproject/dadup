'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const PsychoPage = dynamic(() => import('./PsychoPage'));

// ── Styles partagés (système unifié du dashboard) ─────────────────────────────
const LABEL = { fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#6a7585', margin: '0 0 8px' };
const TITRE = { fontSize: '16px', fontWeight: 800, color: '#1e2535', margin: 0, lineHeight: 1.35 };
const TEXTE = { fontSize: '14px', color: '#1e2535', lineHeight: 1.75, margin: 0 };
const SOURCE = { fontSize: '12px', color: '#6a7585', lineHeight: 1.6, margin: '10px 0 0' };

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

// ── Ce que tu ressens : fiches courtes et sourcées ────────────────────────────
const FICHES = [
  {
    id: 'hauteur', bg: 'rgba(221,208,255,0.3)', border: 'rgba(107,79,187,0.15)',
    titre: 'Peur de ne pas être à la hauteur',
    texte: 'C\'est l\'une des inquiétudes les plus fréquentes chez les futurs pères. Personne ne naît en sachant s\'occuper d\'un bébé : on apprend en faisant, jour après jour. Ce qui compte pour ton enfant, c\'est ta présence régulière, pas la perfection.',
    source: 'Genesoni & Tallandini, 2009, Birth (revue de 20 ans d\'études sur la transition vers la paternité)',
  },
  {
    id: 'argent', bg: 'rgba(200,232,255,0.3)', border: 'rgba(46,95,138,0.15)',
    titre: 'L\'argent qui inquiète',
    texte: 'Les dépenses liées à bébé inquiètent beaucoup de futurs parents. Posez les chiffres à deux, sans dramatiser. Vérifie aussi vos droits : sous conditions de ressources, la CAF verse une prime à la naissance, et ton congé paternité est indemnisé par l\'Assurance Maladie.',
    source: 'service-public.fr : prime à la naissance (PAJE) et congé de paternité',
  },
  {
    id: 'couple', bg: 'rgba(184,240,216,0.3)', border: 'rgba(13,107,64,0.15)',
    titre: 'Ta place dans le couple',
    texte: 'Pendant la grossesse, l\'attention se tourne vers elle et vers bébé, et c\'est normal. Ta place, tu la construis en t\'impliquant : rendez-vous, préparation, décisions. Pensez aussi à parler de vous deux, pas seulement du bébé.',
    source: 'Pour aller plus loin : 1000-premiers-jours.fr, le site public sur les 1000 premiers jours de l\'enfant',
  },
  {
    id: 'blues', bg: 'rgba(255,232,160,0.3)', border: 'rgba(200,160,96,0.15)',
    titre: 'Fatigue, baby blues et dépression des pères',
    texte: 'Les pères aussi peuvent traverser une dépression autour de la naissance : environ 1 sur 10, pendant la grossesse ou la première année, avec un pic entre 3 et 6 mois après la naissance. Fatigue qui ne passe pas, irritabilité, envie de fuir, perte d\'intérêt : si ça dure plus de deux semaines, parles-en à ton médecin.',
    source: 'Paulson & Bazemore, 2010, JAMA (méta-analyse de 43 études)',
  },
];

export default function ToiPage({ C, saReelle }: any) {
  const sa = saReelle || 20;
  const defi = DEFIS[sa % DEFIS.length];
  const cleDefi = `sa${sa}`;

  const [defisFaits, setDefisFaits] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem('dadup_defis') || '{}'); } catch { return {}; }
  });
  const [ouverte, setOuverte] = useState<string | null>(null);

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
        <div style={{ position: 'absolute', top: '-50px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,160,96,0.22) 0%,transparent 65%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' as const }}>
            <p style={{ ...LABEL, color: '#e0b870', margin: 0 }}>Le défi à deux de la semaine</p>
            <span style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '99px', padding: '4px 10px', fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>15 min</span>
          </div>
          <p style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: 0, lineHeight: 1.25 }}>{defi.titre}</p>
          <p style={{ ...TEXTE, color: 'rgba(255,255,255,0.85)' }}>{defi.texte}</p>
          <button onClick={toggleDefi} aria-pressed={fait} style={{
            alignSelf: 'flex-start', minHeight: '44px', marginTop: '4px', border: 'none', borderRadius: '99px', padding: '11px 22px', cursor: 'pointer',
            fontSize: '14px', fontWeight: 800,
            background: fait ? 'rgba(255,255,255,0.14)' : 'linear-gradient(135deg,#c8a060,#e8c070)',
            color: fait ? '#ffffff' : '#0a1f32',
          }}>{fait ? '✓ Fait cette semaine' : 'C\'est fait'}</button>
        </div>
      </div>

      {/* CE QUE TU RESSENS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ ...LABEL, margin: '8px 0 0' }}>Ce que tu ressens</p>
        {FICHES.map(f => {
          const open = ouverte === f.id;
          return (
            <div key={f.id} style={{ background: f.bg, border: `1px solid ${f.border}`, borderRadius: '20px', overflow: 'hidden' }}>
              <button onClick={() => setOuverte(open ? null : f.id)} aria-expanded={open} style={{
                width: '100%', minHeight: '56px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' as const,
                padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
              }}>
                <span style={TITRE}>{f.titre}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3D5C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {open && (
                <div style={{ padding: '0 24px 20px' }}>
                  <p style={TEXTE}>{f.texte}</p>
                  <p style={SOURCE}>Source : {f.source}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* À QUI EN PARLER */}
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '22px 24px', boxShadow: '0 2px 12px rgba(26,61,92,0.06)' }}>
        <p style={LABEL}>Besoin d&apos;en parler ?</p>
        <p style={{ ...TITRE, marginBottom: '10px' }}>Tu n&apos;as pas à tout porter seul</p>
        <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li style={TEXTE}>Ton médecin traitant, le premier interlocuteur pour toi aussi</li>
          <li style={TEXTE}>La PMI de ton quartier, ouverte aux deux parents</li>
          <li style={TEXTE}>Un psychologue, avec des séances remboursées grâce au dispositif Mon soutien psy</li>
        </ul>
        <p style={SOURCE}>Source : info.gouv.fr, dispositif Mon soutien psy (12 séances remboursées par an)</p>
      </div>

      {/* PSYCHO DE LA SEMAINE */}
      <PsychoPage C={C} saReelle={saReelle} />
    </div>
  );
}
