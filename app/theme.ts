// ── DadUp : jetons de design (source unique) ──
// Mêmes valeurs que les variables CSS de app/globals.css.

export const COULEURS = {
  navy900: '#0C1D2E',
  navy800: '#15263A',
  navy700: '#1A3D5C',
  navy600: '#24507A',
  navyGrad: 'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)',
  sauge: '#DCE5D7',
  saugeBord: '#C9D8C4',
  foret: '#2F4F3E',
  terra: '#B4593A',
  terraClair: '#F2DACB',
  terraTexte: '#9C4A2E', // terracotta pour du petit texte sur fond clair
  creme: '#F6F1E9',
  blanc: '#FFFFFF',
  texte: '#15263A',
  texte2: '#56616B',
  bord: '#E6E0D5',
  alerte: '#B42318',
} as const;

export const RAYONS = { sm: '12px', md: '16px', lg: '22px' } as const;

export const POLICE = "var(--font-sans)";
