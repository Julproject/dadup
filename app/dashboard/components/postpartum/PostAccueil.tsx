'use client';

export default function PostAccueil({ C, moisBebe, dataBebe, joursRestants }: any) {
  if (!dataBebe) return null;
  const jours = Math.abs(joursRestants || 0);

  const FICHES_PRATIQUES = [
    {
      titre: 'Emmailloter bébé pas à pas',
      texte: '1. Étale une couverture fine en losange, rabats le coin supérieur de 15 cm. 2. Pose bébé sur le dos, épaules au niveau du bord rabattu, bras le long du corps. 3. Prends le coin gauche, passe-le sur le bras droit et glisse-le sous son dos. 4. Rabats le coin inférieur vers le haut sur son ventre. 5. Prends le coin droit, enroule-le autour et glisse-le sous lui. Serré mais pas compressif : deux doigts doivent passer au niveau de la poitrine.',
      emoji: '👶',
      bg: '#E6F0FA',
      tc: '#1A3D5C',
      bc: '#1A4A7A',
    },
    {
      titre: 'Décoder les pleurs de bébé',
      texte: 'Faim : régulier, rythmé, s\'intensifie progressivement, main à la bouche. Fatigue : geignard, frotte les yeux ou les oreilles, difficile à consoler. Douleur : aigu, strident, soudain, pauses courtes. Inconfort : intermittent, s\'apaise quand on le porte différemment. Méthode : vérifier d\'abord la faim, puis la couche, puis la chaleur. Si inconsolable depuis plus de 2 heures, consulter.',
      emoji: '👂',
      bg: '#FFF0E6',
      tc: '#C04A1A',
      bc: '#7A3010',
    },
    {
      titre: 'Gérer le sommeil des premières semaines',
      texte: 'Un nouveau-né ne peut pas tenir éveillé plus de 60 à 90 minutes. Signes de fatigue : bâillements, regard dans le vide, sourcils rouges, agitation. Mettre en condition dès le premier signe. Rituel court : lumière tamisée, voix douce, emmaillotage. Le bruit blanc (hotte de cuisine, application dédiée) reproduit l\'ambiance utérine. Alternez les nuits en roulements de 3 heures pour ne pas vous épuiser.',
      emoji: '🌙',
      bg: '#E4F5EC',
      tc: '#0D6B40',
      bc: '#0A4A28',
    },
    {
      titre: 'Biberon, rot et coliques : les bons gestes',
      texte: 'Biberon : incliner à 45°, laisser bébé dicter le rythme, faire une pause à mi-biberon. Rot : tiens-le vertical contre ton épaule, masse le dos de bas en haut. S\'il ne rote pas après 5 minutes, allonge-le sur le côté gauche puis représente-le. Coliques : chaleur sur le ventre (linge tiède), massage en cercles dans le sens des aiguilles d\'une montre, position dite du tigre sur avant-bras ventre vers le bas. Les coliques disparaissent généralement vers 3 mois.',
      emoji: '🍼',
      bg: '#FFF7E0',
      tc: '#8A6010',
      bc: '#3A2800',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* HERO */}
      <div style={{ background: '#1A3D5C', borderRadius: '24px', padding: '28px 32px' }}>
        <p style={{ color: 'rgba(200,220,240,0.55)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>Mois {moisBebe + 1} · Post-naissance</p>
        <p style={{ color: '#fff', fontSize: '22px', fontWeight: 800, margin: '0 0 6px' }}>{dataBebe.titre}</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '0 0 16px' }}>{jours} jours de vie</p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{dataBebe.intro}</p>
      </div>

      {/* POUR TOI CE MOIS */}
      <div>
        <p style={{ color: '#C04A1A', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>Pour toi ce mois-ci</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {dataBebe.papa.map((item: any, i: number) => (
            <div key={i} style={{ background: '#FFF0E6', borderRadius: '18px', padding: '18px 20px' }}>
              <p style={{ color: '#3D1A0A', fontSize: '15px', fontWeight: 800, margin: '0 0 6px' }}>{item.titre}</p>
              <p style={{ color: '#7A3010', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>{item.contenu}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GESTES ET TECHNIQUES ESSENTIELS */}
      <div>
        <p style={{ color: '#1A3D5C', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>Gestes et techniques essentiels</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FICHES_PRATIQUES.map((item, i) => (
            <div key={i} style={{ background: item.bg, borderRadius: '18px', padding: '18px 20px' }}>
              <p style={{ color: item.tc, fontSize: '15px', fontWeight: 800, margin: '0 0 8px' }}>{item.emoji} {item.titre}</p>
              <p style={{ color: item.bc, fontSize: '13px', lineHeight: 1.8, margin: 0 }}>{item.texte}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVITÉS */}
      {dataBebe.activites && dataBebe.activites.length > 0 && (
        <div>
          <p style={{ color: '#2E5F8A', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>Activités à faire avec bébé</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dataBebe.activites.map((item: any, i: number) => (
              <div key={i} style={{ background: '#E6F0FA', borderRadius: '16px', padding: '16px 18px' }}>
                <p style={{ color: '#1A3D5C', fontSize: '14px', fontWeight: 800, margin: '0 0 5px' }}>{item.titre}</p>
                <p style={{ color: '#1A4A7A', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{item.contenu}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RDV */}
      <div style={{ background: '#FFF7E0', borderRadius: '18px', padding: '18px 20px' }}>
        <p style={{ color: '#8A6010', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>Rendez-vous ce mois-ci</p>
        <p style={{ color: '#3A2800', fontSize: '13px', lineHeight: 1.7, margin: '0 0 10px' }}>{dataBebe.rdv}</p>
        {dataBebe.vaccins && (
          <>
            <p style={{ color: '#8A6010', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '6px 0' }}>Vaccins</p>
            <p style={{ color: '#3A2800', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{dataBebe.vaccins}</p>
          </>
        )}
      </div>

    </div>
  );
}
