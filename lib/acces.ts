// ── Durée de l'accès DadUp (CGV : accès valable jusqu'au premier anniversaire de bébé) ──
// - Naissance déclarée : access_until est fixé à la date de naissance + 1 an (voir /api/auth/save).
// - Naissance non déclarée : l'accès prend fin 15 mois après la date prévue d'accouchement.
// - Sans DPA (compte pas encore configuré) : pas de date de fin.

const DATE_RE = /^\d{4}-\d{2}-\d{2}/;

function ajouterMois(dateIso: string, mois: number): Date {
  const [a, m, j] = dateIso.slice(0, 10).split('-').map(Number);
  // Fin de journée, heure de Paris approximée en UTC+2 : on reste du côté favorable à l'utilisateur
  return new Date(Date.UTC(a, m - 1 + mois, j, 23, 59, 59));
}

export type InfosAcces = {
  access_until?: string | null;
  dpa?: string | null;
  dpa_originale?: string | null;
};

/** Date de fin d'accès, ou null si aucune limite ne s'applique encore. */
export function finAcces(u: InfosAcces): Date | null {
  if (u.access_until && DATE_RE.test(u.access_until)) return ajouterMois(u.access_until, 0);
  if (!u.dpa_originale && u.dpa && DATE_RE.test(u.dpa)) return ajouterMois(u.dpa, 15);
  return null;
}

export function accesTermine(u: InfosAcces, maintenant = new Date()): boolean {
  const fin = finAcces(u);
  return !!fin && maintenant > fin;
}

export function dateFinLisible(u: InfosAcces): string {
  const fin = finAcces(u);
  return fin ? fin.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }) : '';
}
