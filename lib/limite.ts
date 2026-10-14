// ── Limitation simple du nombre de requêtes ─────────────────────────────────
// Compteurs en mémoire, par instance du serveur. Protection de premier niveau
// (suffisante au lancement) ; pour une limite partagée entre instances, il faudra
// un stockage commun (table Supabase ou Vercel KV).
import type { NextRequest } from 'next/server';

type Seau = { n: number; debut: number };
const seaux = new Map<string, Seau>();

function nettoyer(maintenant: number) {
  if (seaux.size < 5000) return;
  seaux.forEach((s, cle) => { if (maintenant - s.debut > 60 * 60 * 1000) seaux.delete(cle); });
}

/** Vrai si la clé a déjà atteint `max` dans la fenêtre. */
export function limiteAtteinte(cle: string, max: number, fenetreMs: number): boolean {
  const s = seaux.get(cle);
  if (!s) return false;
  if (Date.now() - s.debut > fenetreMs) { seaux.delete(cle); return false; }
  return s.n >= max;
}

/** Ajoute un événement pour la clé. */
export function compter(cle: string, fenetreMs: number) {
  const maintenant = Date.now();
  nettoyer(maintenant);
  const s = seaux.get(cle);
  if (!s || maintenant - s.debut > fenetreMs) seaux.set(cle, { n: 1, debut: maintenant });
  else s.n += 1;
}

export function effacer(cle: string) {
  seaux.delete(cle);
}

export function ipDe(req: NextRequest): string {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'inconnue';
}
