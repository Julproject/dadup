'use client';
import { NAVY, NAVY_GRAD, SAUGE, SAUGE_BORD, FORET, TERRA, TERRA_CLAIR, TERRA_TEXTE, GRIS, BORD, LABEL, TEXTE, CARTE, STYLES, TuileIcone, Accordeons } from './postpartum/ui';

const CHECKLIST_VALISE = [
  "Carte Vitale + carte mutuelle + carnet de maternité",
  "Plan de naissance (si rédigé)",
  "Vêtements confortables pour le travail (2 changes)",
  "Chaussons et robe de chambre",
  "Nécessaire de toilette (savon, shampoing, brosse à dents)",
  "Serviettes hygiéniques post-partum",
  "Soutien-gorge d'allaitement (si allaitement prévu)",
  "Tenue de retour à la maison",
  "Chargeur téléphone + écouteurs",
  "En-cas : barres de céréales, eau, chocolat",
  "Pièce d'identité",
];

const CHECKLIST_BEBE = [
  "Bodies (taille naissance + 1 mois)",
  "Pyjamas (3 à 5 pièces)",
  "Bonnet et chaussons",
  "Couches taille naissance",
  "Lingettes ou coton + eau",
  "Cape de bain et gant",
  "Siège auto installé et vérifié dans la voiture",
];

const ALERTE = '#B42318';

const PARTIR = [
  'La poche des eaux se rompt (liquide clair, rosé ou verdâtre)',
  'Saignements rouges abondants',
  'Douleur abdominale continue sans relâchement',
  "Bébé bouge moins que d'habitude, ou plus du tout",
];

const ROLE = [
  {
    phase: 'Pendant le travail',
    desc: `Reste proche physiquement. Tiens-lui la main quand elle en a besoin, mais ne la force pas. Aide-la à changer de position (debout, à quatre pattes, assise sur le ballon). Rappelle-lui de respirer lentement à l'expiration. Parle peu, mais dis-lui que tu es là.`,
  },
  {
    phase: 'Pendant les contractions',
    desc: `Ne dis pas "courage" ou "c'est bientôt fini" si tu n'en sais rien. Dis : "Tu gères. Je suis là." La pression dans le bas du dos pendant une contraction peut être soulagée par tes mains appliquées fermement.`,
  },
  {
    phase: `Avec l'équipe médicale`,
    desc: `Parle à l'équipe si elle ne peut pas le faire. "Elle a mal, peut-on réévaluer la péridurale ?" ou "Qu'est-ce qui se passe maintenant ?" Tu es son avocat dans la salle.`,
  },
  {
    phase: 'Au moment de la naissance',
    desc: `Couper le cordon est un choix, pas une obligation. Être présent à la tête du lit pendant une césarienne est généralement possible. Les premières secondes après la naissance : regarde-la, dis-lui quelque chose. Ce moment ne reviendra pas.`,
  },
  {
    phase: 'Si tu perds pied',
    desc: `Si tu te sens mal (c'est possible et normal), dis-le à la sage-femme ou à l'auxiliaire de puériculture. Sors 2 minutes, respire, reviens. Elle a besoin que tu sois stable, pas que tu joues au super-héros.`,
  },
];

const CESARIENNE = [
  {
    titre: 'Césarienne programmée',
    texte: `Elle est prévue à l'avance pour des raisons médicales (présentation du siège, placenta praevia, antécédent de césarienne, etc.). La date est généralement fixée à partir de 39 SA. Tu as le temps de te préparer avec elle.`,
  },
  {
    titre: 'Césarienne en urgence',
    texte: `Elle peut être décidée rapidement pendant le travail si bébé montre des signes de souffrance ou si le travail ne progresse pas. La vitesse peut être déstabilisante. Reste calme, suis les instructions de l'équipe, reste présent.`,
  },
  {
    titre: `Pendant l'intervention`,
    texte: `Pour une césarienne programmée, tu peux en général rester assis à sa tête, derrière le champ opératoire. Elle est consciente (péridurale ou rachianesthésie). En cas de grande urgence sous anesthésie générale, on te demandera souvent d'attendre dehors : ce n'est pas contre toi, c'est pour aller vite. Parle-lui, tiens sa main. L'intervention dure environ 30 à 45 minutes.`,
  },
  {
    titre: `Juste après la naissance`,
    texte: `Bébé est souvent sorti rapidement (en quelques minutes après l'incision). Si tout va bien, il peut être posé sur sa poitrine ou dans tes bras pendant que l'équipe suture. Le peau à peau immédiat avec toi est possible et précieux si elle ne peut pas le faire.`,
  },
  {
    titre: `Les suites pour elle`,
    texte: `La récupération est plus longue qu'après un accouchement voie basse : 3 à 5 jours d'hospitalisation, douleur à la cicatrice pendant 2 à 4 semaines, pas de port de charges lourdes. Ton soutien physique et logistique au retour est encore plus important après une césarienne.`,
  },
];

// Message d'en-tête selon l'avancée de la grossesse
function phase(sa: number) {
  if (sa >= 37) return { titre: 'Bébé peut arriver à tout moment', texte: 'Tu es à terme. Garde ton téléphone chargé et la valise près de la porte.' };
  if (sa >= 32) return { titre: 'Le Jour J se rapproche', texte: 'Valise, trajet, ton rôle en salle : c’est le bon moment pour tout caler.' };
  return { titre: 'Le Jour J se prépare', texte: 'Rien d’urgent. Lis à ton rythme, tu seras prêt le moment venu.' };
}

const PUCE = { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '9px' } as const;

function Liste({ items, couleur }: { items: string[]; couleur: string }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span aria-hidden="true" style={{ ...PUCE, background: couleur }} />
          <span style={TEXTE}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrepaNaissance({ saReelle }: { C?: any; saReelle: number }) {
  const sa = saReelle || 0;
  const ph = phase(sa);

  const accordeons = [
    {
      titre: 'Reconnaître les vraies contractions',
      icone: 'chrono',
      contenu: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={TEXTE}>
            Les contractions de travail sont régulières, progressivement plus intenses, plus longues et plus rapprochées. Elles ne passent pas avec le mouvement ou le repos.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            <div style={{ background: SAUGE, border: `1px solid ${SAUGE_BORD}`, borderRadius: '14px', padding: '14px' }}>
              <p style={{ ...LABEL, color: FORET, marginBottom: '8px' }}>Vraies contractions</p>
              <Liste couleur={FORET} items={['Régulières', "S'intensifient", 'Durée croissante', 'Irradient dans le dos', 'Ne passent pas au repos']} />
            </div>
            <div style={{ background: '#F6F1E9', border: `1px solid ${BORD}`, borderRadius: '14px', padding: '14px' }}>
              <p style={{ ...LABEL, color: GRIS, marginBottom: '8px' }}>Fausses (Braxton-Hicks)</p>
              <Liste couleur={GRIS} items={['Irrégulières', 'Intensité stable', 'Passent au repos', 'Localisées au ventre', 'Courtes']} />
            </div>
          </div>
        </div>
      ),
    },
    {
      titre: 'Checklist valise maternité',
      icone: 'valise',
      contenu: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ ...LABEL, color: NAVY, marginBottom: '10px' }}>Pour elle</p>
            <Liste couleur={NAVY} items={CHECKLIST_VALISE} />
          </div>
          <div>
            <p style={{ ...LABEL, color: FORET, marginBottom: '10px' }}>Pour bébé</p>
            <Liste couleur={FORET} items={CHECKLIST_BEBE} />
          </div>
          <div style={{ background: '#F8E9DF', border: `1px solid ${TERRA_CLAIR}`, borderRadius: '14px', padding: '14px 16px' }}>
            <p style={{ fontSize: '14px', fontWeight: 800, color: TERRA_TEXTE, margin: '0 0 4px' }}>Toi aussi tu prépares ta valise</p>
            <p style={TEXTE}>Vêtements confortables, chargeur, en-cas, livre ou série sur le téléphone. Le travail peut durer plusieurs heures.</p>
          </div>
        </div>
      ),
    },
    {
      titre: 'Ton rôle précis en salle de naissance',
      icone: 'coeur',
      contenu: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={TEXTE}>Ton rôle n&apos;est pas médical. Il est humain. Et c&apos;est exactement ce dont elle a besoin.</p>
          {ROLE.map((r, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${TERRA}`, paddingLeft: '14px' }}>
              <p style={{ fontSize: '14px', fontWeight: 800, color: NAVY, margin: '0 0 4px' }}>{r.phase}</p>
              <p style={TEXTE}>{r.desc}</p>
            </div>
          ))}
          <div style={{ background: NAVY_GRAD, borderRadius: '14px', padding: '14px 16px' }}>
            <p style={{ ...LABEL, color: SAUGE_BORD, marginBottom: '6px' }}>À retenir</p>
            <p style={{ ...TEXTE, color: '#ffffff' }}>
              Les études montrent qu&apos;un soutien continu pendant l&apos;accouchement aide la future maman à mieux vivre ce moment, et peut même raccourcir un peu le travail. Ta présence compte vraiment.
            </p>
          </div>
        </div>
      ),
    },
    {
      titre: 'Césarienne : ce qu’il faut savoir',
      icone: 'sante',
      contenu: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={TEXTE}>
            1 naissance sur 5 en France se fait par césarienne. Elle peut être programmée ou décidée en urgence pendant le travail. Dans les deux cas, ton rôle est crucial.
          </p>
          {CESARIENNE.map((c, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${SAUGE_BORD}`, paddingLeft: '14px' }}>
              <p style={{ fontSize: '14px', fontWeight: 800, color: NAVY, margin: '0 0 4px' }}>{c.titre}</p>
              <p style={TEXTE}>{c.texte}</p>
            </div>
          ))}
          <div style={{ background: SAUGE, border: `1px solid ${SAUGE_BORD}`, borderRadius: '14px', padding: '14px 16px' }}>
            <p style={{ ...LABEL, color: FORET, marginBottom: '6px' }}>Ce qui ne change pas</p>
            <p style={TEXTE}>
              Voie basse ou césarienne, bébé arrive. La façon dont il naît ne définit pas la qualité de ton accueil ni de ta parentalité. Certaines mamans vivent la césarienne comme un deuil de l&apos;accouchement prévu : accueille ce ressenti avec bienveillance, sans minimiser.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style>{STYLES}</style>

      {/* EN-TÊTE */}
      <div style={{ background: NAVY_GRAD, borderRadius: '22px', padding: '22px', boxShadow: '0 10px 26px rgba(12,29,46,0.22)' }}>
        <p style={{ ...LABEL, color: SAUGE_BORD, marginBottom: '8px' }}>SA {sa} · Jour J</p>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px', lineHeight: 1.25, letterSpacing: '-0.4px' }}>{ph.titre}</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.82)', margin: 0, lineHeight: 1.6 }}>{ph.texte}</p>
      </div>

      {/* PARTIR IMMÉDIATEMENT */}
      <section aria-labelledby="jj-partir" style={{ background: '#ffffff', border: `2px solid ${ALERTE}`, borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FDECEA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ALERTE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 16H3zM12 10v4M12 17h.01" /></svg>
          </span>
          <h3 id="jj-partir" style={{ fontSize: '18px', fontWeight: 800, color: ALERTE, margin: 0 }}>Partir immédiatement si</h3>
        </div>
        <Liste couleur={ALERTE} items={PARTIR} />
        <a href="tel:15" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '52px', background: ALERTE, color: '#ffffff', borderRadius: '14px', fontSize: '16px', fontWeight: 800, textDecoration: 'none' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
          Appeler le 15
        </a>
        <p style={{ fontSize: '13px', color: GRIS, margin: 0, lineHeight: 1.6 }}>
          En cas de doute, appelle la maternité. Ils ne t&apos;en voudront jamais d&apos;appeler pour rien.
        </p>
      </section>

      {/* RÈGLE 5-1-1 */}
      <div style={{ background: SAUGE, border: `1px solid ${SAUGE_BORD}`, borderRadius: '22px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <TuileIcone nom="chrono" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
          <p style={{ ...LABEL, color: FORET }}>Quand partir : la règle 5-1-1</p>
          <p style={TEXTE}>
            Contractions toutes les <strong>5 minutes</strong>, qui durent <strong>1 minute</strong>, depuis <strong>1 heure</strong> minimum. À ce stade, appelle la maternité avant de partir. Si ce n&apos;est pas votre premier bébé ou si la maternité est loin, appelle plus tôt.
          </p>
        </div>
      </div>

      {/* POUR BIEN SE PRÉPARER */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ ...LABEL, color: GRIS, margin: '6px 0 0' }}>Pour bien te préparer</p>
        <Accordeons items={accordeons} icone="coeur" premierOuvert={false} />
      </div>

      {/* BÉBÉ EST NÉ */}
      <div style={{ ...CARTE, padding: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' as const, marginTop: '8px' }}>
        <TuileIcone nom="naissance" />
        <p style={{ ...TEXTE, maxWidth: '420px' }}>
          Bébé est là ? Bascule en mode post-partum pour accéder au contenu de sa première année.
        </p>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('dadup:declareNaissance'))}
          style={{ background: NAVY_GRAD, color: '#ffffff', border: 'none', minHeight: '48px', padding: '12px 28px', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}
        >
          Bébé est né
        </button>
      </div>
    </div>
  );
}
