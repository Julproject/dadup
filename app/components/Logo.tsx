// ── Logo DadUp ──
// Fichiers dans public/ : logo-sur-creme.svg, logo-sur-marine.svg (sans slogan),
// logo-complet-sur-*.svg (avec « À deux, dès le premier jour »), icone.svg (icône d'application).

type LogoProps = {
  /** Couleur du fond sur lequel le logo est posé */
  fond?: 'creme' | 'marine';
  /** Hauteur affichée en px (la largeur suit) */
  hauteur?: number;
  /** Ajoute le slogan sous le logo */
  slogan?: boolean;
  style?: React.CSSProperties;
};

const RATIO = 865 / 247;
const RATIO_SLOGAN = 865 / 303;

export function Logo({ fond = 'creme', hauteur = 32, slogan = false, style }: LogoProps) {
  const ratio = slogan ? RATIO_SLOGAN : RATIO;
  return (
    <img
      src={`/logo${slogan ? '-complet' : ''}-sur-${fond}.svg`}
      alt={slogan ? 'DadUp, à deux dès le premier jour' : 'DadUp'}
      width={Math.round(hauteur * ratio)}
      height={hauteur}
      // Centrage optique : le jambage du « p » agrandit la boîte vers le bas,
      // on redescend légèrement le logo pour que les lettres soient centrées.
      style={{ display: 'block', height: `${hauteur}px`, width: 'auto', flexShrink: 0, transform: slogan ? undefined : `translateY(${(hauteur * 0.07).toFixed(1)}px)`, ...style }}
    />
  );
}

/** Icône d'application (carré marine arrondi avec le D) */
export function IconeDadUp({ taille = 56, style }: { taille?: number; style?: React.CSSProperties }) {
  return (
    <img
      src="/icone.svg"
      alt="DadUp"
      width={taille}
      height={taille}
      style={{ display: 'block', width: `${taille}px`, height: `${taille}px`, borderRadius: `${Math.round(taille * 0.225)}px`, flexShrink: 0, ...style }}
    />
  );
}
