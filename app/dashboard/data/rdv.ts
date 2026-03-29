import type { RDVItem } from './types';

export const RDV_LIST: RDVItem[] = [
  {sa:8, titre:"1ère consultation médicale", desc:"Confirmer la grossesse, calculer la DPA, prescrire les analyses de sang obligatoires.", oblig:true, emoji:"🩺"},
  {sa:11, titre:"Échographie T1 + clarté nucale", desc:"Dater précisément la grossesse, mesurer la clarté nucale, évaluer le risque de trisomie 21.", oblig:true, emoji:"🔬"},
  {sa:15, titre:"Test de dépistage de la trisomie", desc:"Prise de sang pour évaluer le risque de trisomie 21 en complément de l'échographie.", oblig:false, emoji:"🩸"},
  {sa:20, titre:"Échographie T2 morphologique", desc:"Examiner en détail chaque organe et chaque membre. La plus complète de la grossesse.", oblig:true, emoji:"👶"},
  {sa:24, titre:"Test de diabète gestationnel (HGPO)", desc:"2h de test, 3 prises de sang. Un diabète gestationnel non traité augmente les risques.", oblig:false, emoji:"🧪"},
  {sa:28, titre:"Consultation du 7e mois", desc:"Vérifier la position de bébé, la tension artérielle, les examens sanguins.", oblig:true, emoji:"📋"},
  {sa:32, titre:"Échographie T3", desc:"Vérifier la position de bébé, estimer le poids, évaluer le liquide amniotique.", oblig:true, emoji:"🔬"},
  {sa:36, titre:"Consultation du 9e mois", desc:"Examen du col, vérification de la position de bébé, préparer l'accouchement.", oblig:true, emoji:"🏥"},
  {sa:39, titre:"Accouchement prévu", desc:"Date d'accouchement prévue. Rester joignable. Mode alerte active.", oblig:false, emoji:"👶"},
];
