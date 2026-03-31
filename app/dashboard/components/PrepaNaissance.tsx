'use client';
import { useState } from 'react';

type Section = {
  id: string;
  titre: string;
  contenu: React.ReactNode;
};

const CHECKLIST_VALISE = [
  "Carte vitale + carte mutuelle + carnet de maternité",
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

export default function PrepaNaissance({ C, saReelle }: { C: any; saReelle: number }) {
  const [ouvert, setOuvert] = useState<string | null>(null);

  const sections: Section[] = [
    {
      id: 'contractions',
      titre: 'Reconnaître les vraies contractions',
      contenu: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ color: '#3a4a5a', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>
            Les contractions de travail sont régulières, progressivement plus intenses, plus longues et plus rapprochées. Elles ne passent pas avec le mouvement ou le repos.
          </p>

          <div style={{ background: '#E4F5EC', borderRadius: '12px', padding: '14px 16px' }}>
            <p style={{ color: '#0D6B40', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>La règle 5-1-1</p>
            <p style={{ color: '#0A3020', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
              Contractions toutes les <strong>5 minutes</strong>, qui durent <strong>1 minute</strong>, depuis <strong>1 heure</strong> minimum. À ce stade, appelle la maternité avant de partir.
            </p>
          </div>

          <div>
            <p style={{ color: '#1e2535', fontSize: '13px', fontWeight: 700, margin: '0 0 8px' }}>Vraies contractions vs fausses (Braxton-Hicks)</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#E4F5EC', borderRadius: '10px', padding: '12px' }}>
                <p style={{ color: '#0D6B40', fontSize: '12px', fontWeight: 700, margin: '0 0 6px' }}>Vraies contractions</p>
                <ul style={{ color: '#0A3020', fontSize: '12px', lineHeight: 1.7, margin: 0, paddingLeft: '14px' }}>
                  <li>Régulières</li>
                  <li>S'intensifient</li>
                  <li>Durée croissante</li>
                  <li>Irradient dans le dos</li>
                  <li>Ne passent pas au repos</li>
                </ul>
              </div>
              <div style={{ background: '#f7f5f0', borderRadius: '10px', padding: '12px' }}>
                <p style={{ color: '#8A6010', fontSize: '12px', fontWeight: 700, margin: '0 0 6px' }}>Braxton-Hicks</p>
                <ul style={{ color: '#5a4010', fontSize: '12px', lineHeight: 1.7, margin: 0, paddingLeft: '14px' }}>
                  <li>Irrégulières</li>
                  <li>Intensité stable</li>
                  <li>Passent au repos</li>
                  <li>Localisées au ventre</li>
                  <li>Courtes</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ background: '#FDECEA', borderRadius: '12px', padding: '14px 16px' }}>
            <p style={{ color: '#8A0000', fontSize: '12px', fontWeight: 700, margin: '0 0 6px' }}>Partir immédiatement si</p>
            <ul style={{ color: '#6A0000', fontSize: '13px', lineHeight: 1.7, margin: 0, paddingLeft: '16px' }}>
              <li>La poche des eaux se rompt (liquide clair, rosé ou verdâtre)</li>
              <li>Saignements rouges abondants</li>
              <li>Douleur abdominale continue sans relâchement</li>
              <li>Bébé ne bouge plus depuis 2 heures</li>
            </ul>
          </div>

          <p style={{ color: '#6a7585', fontSize: '12px', fontStyle: 'italic', margin: 0 }}>
            En cas de doute : appelle la maternité. Ils ne t'en voudront jamais d'appeler pour rien.
          </p>
        </div>
      ),
    },
    {
      id: 'valise',
      titre: 'Checklist valise maternité',
      contenu: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ color: '#2E5F8A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>Pour elle</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CHECKLIST_VALISE.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#E6F0FA', border: '1.5px solid #aac0d8', flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ color: '#1e2535', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ color: '#0D6B40', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>Pour bébé</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CHECKLIST_BEBE.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#E4F5EC', border: '1.5px solid #80c8a0', flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ color: '#1e2535', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#FFF7E0', borderRadius: '12px', padding: '12px 14px' }}>
            <p style={{ color: '#8A6010', fontSize: '12px', fontWeight: 700, margin: '0 0 4px' }}>Toi aussi tu prépares ta valise</p>
            <p style={{ color: '#5a4010', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>
              Vêtements confortables, chargeur, en-cas, livre ou série sur le téléphone. Le travail peut durer plusieurs heures.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'salle',
      titre: 'Ton rôle précis en salle de naissance',
      contenu: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ color: '#3a4a5a', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>
            Ton rôle n'est pas médical. Il est humain. Et c'est exactement ce dont elle a besoin.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                phase: 'Pendant le travail',
                desc: `Reste proche physiquement. Tiens-lui la main quand elle en a besoin, mais ne la force pas. Aide-la à changer de position (debout, à quatre pattes, assise sur le ballon). Rappelle-lui de respirer lentement à l'expiration. Parle peu, mais dis-lui que tu es là.`,
              },
              {
                phase: 'Pendant les contractions',
                desc: `Ne dis pas "courage" ou "c'est bientôt fini" si tu n'en sais rien. Dis : "Tu gères. Je suis là." La pression dans le bas du dos pendant une contraction peut être soulagée par tes mains appliquées fermement.`,
              },
              {
                phase: 'Avec l'équipe médicale',
                desc: `Parle à l'équipe si elle ne peut pas le faire. "Elle a mal, peut-on réévaluer la péridurale ?" ou "Qu'est-ce qui se passe maintenant ?" Tu es son avocat dans la salle.`,
              },
              {
                phase: 'Au moment de la naissance',
                desc: `Couper le cordon est un choix, pas une obligation. Être présent à la tête du lit pendant une césarienne est généralement possible. Les premières secondes après la naissance : regarde-la, dis-lui quelque chose. Ce moment ne reviendra pas.`,
              },
              {
                phase: 'Si tu perds pied',
                desc: `Si tu te sens mal (c'est possible et normal), dis-le à l'infirmière ou sage-femme. Sors 2 minutes, respire, reviens. Elle a besoin que tu sois stable, pas que tu joues au super-héros.`,
              },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: '3px solid #2E5F8A', paddingLeft: '14px' }}>
                <p style={{ color: '#1A3D5C', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>{item.phase}</p>
                <p style={{ color: '#3a4a5a', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#1e2535', borderRadius: '12px', padding: '14px 16px' }}>
            <p style={{ color: '#c8a060', fontSize: '12px', fontWeight: 700, margin: '0 0 6px' }}>À retenir</p>
            <p style={{ color: '#fff', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
              La présence d'un soutien non médical en salle de naissance réduit la durée du travail de 25% et le recours aux analgésiques. Ta présence a un effet physiologique mesurable. Tu comptes.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'cesarienne',
      titre: 'Césarienne : ce qu'il faut savoir',
      contenu: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ color: '#3a4a5a', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>
            1 naissance sur 5 en France se fait par césarienne. Elle peut être programmée ou décidée en urgence pendant le travail. Dans les deux cas, ton rôle est crucial.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                titre: 'Césarienne programmée',
                texte: `Elle est prévue à l'avance pour des raisons médicales (présentation du siège, placenta praevia, antécédent de césarienne, etc.). La date est fixée à 38-39 SA généralement. Vous avez le temps de vous préparer ensemble.`,
              },
              {
                titre: 'Césarienne en urgence',
                texte: `Elle peut être décidée rapidement pendant le travail si bébé montre des signes de souffrance ou si le travail ne progresse pas. La vitesse peut être déstabilisante. Reste calme, suis les instructions de l'équipe, reste présent.`,
              },
              {
                titre: 'Pendant l'intervention',
                texte: `Tu seras généralement autorisé à rester assis à la tête du lit, derrière le champ opératoire. Elle est consciente (anesthésie péridurale ou rachianesthésie). Parle-lui, tiens sa main. L'intervention dure environ 30 à 45 minutes.`,
              },
              {
                titre: 'Juste après la naissance',
                texte: `Bébé est souvent sorti rapidement (en quelques minutes après l'incision). Si tout va bien, il peut être posé sur sa poitrine ou dans tes bras pendant que l'équipe suture. Le peau à peau immédiat avec toi est possible et précieux si elle ne peut pas le faire.`,
              },
              {
                titre: 'Les suites pour elle',
                texte: `La récupération est plus longue qu'après un accouchement voie basse : 3 à 5 jours d'hospitalisation, douleur à la cicatrice pendant 2 à 4 semaines, pas de port de charges. Ton soutien physique et logistique au retour est encore plus important après une césarienne.`,
              },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: '3px solid #C04A1A', paddingLeft: '14px' }}>
                <p style={{ color: '#7A1A00', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>{item.titre}</p>
                <p style={{ color: '#3a4a5a', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>{item.texte}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#FFF0E6', borderRadius: '12px', padding: '14px 16px' }}>
            <p style={{ color: '#C04A1A', fontSize: '12px', fontWeight: 700, margin: '0 0 6px' }}>Ce qui ne change pas</p>
            <p style={{ color: '#5A2000', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
              Voie basse ou césarienne, bébé arrive. La façon dont il naît ne définit pas la qualité de votre accueil ni de votre parentalité. Certaines mamans vivent la césarienne comme un deuil de l'accouchement prévu : accueille ce ressenti avec bienveillance, sans minimiser.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* En-tête */}
      <div style={{ background: '#1A3D5C', borderRadius: '18px', padding: '18px 20px' }}>
        <p style={{ color: 'rgba(200,220,240,0.5)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 5px' }}>
          SA {saReelle} · Préparation
        </p>
        <p style={{ color: '#fff', fontSize: '18px', fontWeight: 800, margin: 0 }}>
          L'accouchement approche
        </p>
      </div>

      {/* Accordéon */}
      {sections.map(section => {
        const isOpen = ouvert === section.id;
        return (
          <div key={section.id} style={{
            borderRadius: '16px',
            border: isOpen ? '1.5px solid #2E5F8A' : '1.5px solid #f0ede8',
            overflow: 'hidden',
            background: '#fff',
          }}>
            <button
              onClick={() => setOuvert(isOpen ? null : section.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '12px', padding: '15px 18px', background: 'none', border: 'none',
                cursor: 'pointer', textAlign: 'left' as const,
              }}
            >
              <span style={{ color: isOpen ? '#2E5F8A' : '#1e2535', fontSize: '14px', fontWeight: 700, lineHeight: 1.3 }}>
                {section.titre}
              </span>
              <span style={{ color: '#ccc', fontSize: '18px', flexShrink: 0 }}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div style={{ padding: '0 18px 18px' }}>
                {section.contenu}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
