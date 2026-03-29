import type { Partenaire } from './types';

export const PARTENAIRES: Partenaire[] = [
  {categorie:"Puériculture", items:[
    {nom:"Cybex", desc:"Sièges auto et poussettes premium", remise:"-10%", lien:"https://www.cybex-online.com"},
    {nom:"Babyzen", desc:"Poussette YOYO", remise:"-8%", lien:"https://www.babyzen.com"},
  ]},
  {categorie:"Santé & bien-être", items:[
    {nom:"Weleda", desc:"Huile de massage pour femmes enceintes", remise:"-15%", lien:"https://www.weleda.fr"},
    {nom:"Mustela", desc:"Soins pour la peau pendant la grossesse", remise:"-10%", lien:"https://www.mustela.fr"},
  ]},
  {categorie:"Préparation à la naissance", items:[
    {nom:"Mon Réseau Périnatal", desc:"Trouver une sage-femme ou un cours de préparation", remise:"Gratuit", lien:"https://www.monreseauperinatal.fr"},
  ]},
];
