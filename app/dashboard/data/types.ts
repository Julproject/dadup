export type SAData = {
  emoji: string;
  taille: string;
  poids: string;
  titre: string;
  intro: string;
  developpement: string;
  organes: string[];
  savistu: string;
  faq: { q: string; r: string }[];
  maman_titre: string;
  maman: string;
  maman_aide: string;
  maman_signe: string;
  alerte: string;
  doc_titre: string;
  doc: string;
  conseil: string;
};

export type MoisData = {
  titre: string;
  intro: string;
  developpement: { titre: string; contenu: string }[];
  sante: { titre: string; contenu: string }[];
  papa: { titre: string; contenu: string }[];
  activites: { titre: string; contenu: string }[];
  rdv: string;
  vaccins: string;
  alerte: string;
};

export type RDVItem = {
  sa: number;
  titre: string;
  desc: string;
  oblig: boolean;
  emoji: string;
};

export type Partenaire = {
  categorie: string;
  items: { nom: string; desc: string; remise: string; lien: string }[];
};
