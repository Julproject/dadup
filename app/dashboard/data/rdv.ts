import type { RDVItem } from './types';

export const RDV_LIST: RDVItem[] = [
  {
    sa: 8,
    titre: "1ère consultation médicale",
    desc: "Première étape obligatoire. Le médecin ou la sage-femme confirme la grossesse, calcule la date prévue d'accouchement et prescrit les analyses de sang. Qui peut le faire : médecin généraliste, gynécologue ou sage-femme. Ton rôle : être là, prendre des notes, poser vos questions ensemble.",
    oblig: true,
    emoji: "🩺"
  },
  {
    sa: 10,
    titre: "Entretien prénatal précoce (EPP)",
    desc: "Obligatoire depuis 2020, souvent méconnu. Environ 45 minutes avec une sage-femme. Ce n'est pas un examen médical : c'est une conversation sur vos besoins, votre situation, votre vécu. Idéalement à deux. Cet entretien permet d'orienter vers un soutien psychologique, des aides sociales ou des cours adaptés.",
    oblig: true,
    emoji: "💬"
  },
  {
    sa: 12,
    titre: "Échographie T1 + dépistage trisomie 21",
    desc: "Obligatoire entre 11 et 13 SA. Mesure la clarté nucale (épaisseur derrière la nuque de bébé) et date précisément la grossesse. Combinée à une prise de sang, elle évalue le risque de trisomie 21. Si le risque est élevé, un DPNI (simple prise de sang) peut être proposé avant toute procédure invasive. Apporte ton téléphone pour filmer.",
    oblig: true,
    emoji: "🔬"
  },
  {
    sa: 16,
    titre: "Consultation mensuelle du 4e mois",
    desc: "1ère consultation mensuelle obligatoire à partir du 4e mois. Mesure de la tension, du poids, hauteur utérine. Bon moment pour poser vos questions sur la préparation à la naissance. Penser aussi au dentiste : le bilan bucco-dentaire est remboursé à 100% dès ce mois.",
    oblig: true,
    emoji: "📋"
  },
  {
    sa: 20,
    titre: "Consultation mensuelle du 5e mois",
    desc: "Suivi mensuel classique. C'est aussi le moment de choisir votre maternité et de vous inscrire aux cours de préparation à la naissance. 8 séances remboursées à 100%. Des séances spécifiques pour les pères existent - demandez-les explicitement à votre maternité.",
    oblig: true,
    emoji: "📋"
  },
  {
    sa: 22,
    titre: "Échographie T2 morphologique",
    desc: "La plus complète de la grossesse. Obligatoire entre 20 et 24 SA. Examine plus de 100 critères : chaque organe, le cerveau, le cœur, les membres. Vérifie le placenta et le liquide amniotique. Le sexe est généralement visible. Durée : 45 min à 1 heure. Prépare 3 questions précises à l'avance.",
    oblig: true,
    emoji: "👶"
  },
  {
    sa: 24,
    titre: "Test diabète gestationnel (HGPO)",
    desc: "Recommandé entre 24 et 28 SA. Test en laboratoire : 3 prises de sang sur 2 heures après absorption de glucose. Elle doit être à jeun. Accompagne-la : c'est long seul. Le diabète gestationnel touche 8 à 10% des grossesses. Bien pris en charge, la grossesse se déroule normalement.",
    oblig: false,
    emoji: "🧪"
  },
  {
    sa: 24,
    titre: "Consultation mensuelle du 6e mois",
    desc: "À partir de ce mois, tous les soins liés à la grossesse sont pris en charge à 100% par la Sécurité sociale. Suivi classique : tension, poids, mouvements de bébé. C'est le moment d'avancer sur le plan de naissance.",
    oblig: true,
    emoji: "📋"
  },
  {
    sa: 28,
    titre: "Consultation du 7e mois",
    desc: "Début du 3e trimestre. Consultation obligatoire mensuelle. Vaccin coqueluche fortement recommandé pour le papa maintenant : il protège bébé dans ses premiers mois de vie avant qu'il soit lui-même vacciné. Prise en charge à 100%. À faire sans attendre.",
    oblig: true,
    emoji: "💉"
  },
  {
    sa: 32,
    titre: "Échographie T3 de croissance",
    desc: "Obligatoire. Vérifie que bébé grandit bien, sa position (tête en bas ?), le volume de liquide amniotique et l'état du placenta. Si bébé est en siège, c'est maintenant qu'on en parle. Une version par manœuvre externe peut être proposée vers 36 SA. Le poids estimé a une marge d'erreur de 10 à 15%.",
    oblig: true,
    emoji: "📏"
  },
  {
    sa: 32,
    titre: "Consultation mensuelle du 8e mois",
    desc: "Suivi mensuel classique. Ce mois inclut aussi la consultation pré-anesthésique obligatoire (même si vous ne souhaitez pas la péridurale). Elle évalue l'état de santé de ta partenaire pour une éventuelle anesthésie d'urgence. À ne pas rater.",
    oblig: true,
    emoji: "📋"
  },
  {
    sa: 35,
    titre: "Dépistage streptocoque B",
    desc: "Prélèvement vaginal recommandé entre 34 et 38 SA. Le streptocoque B est inoffensif pour la maman mais peut être dangereux pour bébé à la naissance. Si positif, un traitement antibiotique pendant le travail protège bébé efficacement. Ce n'est pas grave - c'est un dépistage de routine.",
    oblig: false,
    emoji: "🧬"
  },
  {
    sa: 36,
    titre: "Consultation du 9e mois",
    desc: "Dernière consultation obligatoire avant l'accouchement. Examen du col (dilatation, effacement), position définitive de bébé. Le plan de naissance est remis à ce moment. Viens absolument : c'est le dernier rendez-vous médical avant le jour J.",
    oblig: true,
    emoji: "🏥"
  },
  {
    sa: 40,
    titre: "Date prévue d'accouchement",
    desc: "50% des accouchements ont lieu après la DPA. Mode alerte maximale. Téléphone chargé en permanence. Règle 5-1-1 : contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure → appeler la maternité avant de partir. Poche des eaux rompue ou saignements → partir immédiatement.",
    oblig: false,
    emoji: "👶"
  },
];
