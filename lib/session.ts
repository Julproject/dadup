// ── Session DadUp : cookie signé ─────────────────────────────────────────────
// Format du cookie : <id utilisateur>.<date d'émission en ms>.<signature>
// La signature (HMAC-SHA256) couvre l'id, la date et une empreinte du mot de passe :
// changer ou réinitialiser le mot de passe invalide automatiquement toutes les
// autres sessions. Le cookie expire après DUREE_JOURS sans activité.
import crypto from 'crypto';
import type { NextRequest, NextResponse } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';

export const NOM_COOKIE = 'dadup_session';
const DUREE_JOURS = 90;
const DUREE_MS = DUREE_JOURS * 24 * 60 * 60 * 1000;
const RENOUVELER_APRES_MS = 7 * 24 * 60 * 60 * 1000;

function cle(): Buffer {
  // SESSION_SECRET si défini, sinon dérivée de la clé serveur Supabase (jamais exposée au navigateur)
  const base = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base) throw new Error('Aucun secret de session configuré');
  return crypto.createHmac('sha256', base).update('dadup-session-v1').digest();
}

function empreinte(passwordHash: string | null | undefined): string {
  return crypto.createHash('sha256').update(passwordHash || '').digest('hex').slice(0, 16);
}

function signer(id: string, iat: number, passwordHash: string | null | undefined): string {
  return crypto.createHmac('sha256', cle()).update(`${id}.${iat}.${empreinte(passwordHash)}`).digest('base64url');
}

export function creerJeton(user: { id: string; password_hash?: string | null }): string {
  const iat = Date.now();
  return `${user.id}.${iat}.${signer(user.id, iat, user.password_hash)}`;
}

function lire(valeur: string | undefined): { id: string; iat: number; sig: string } | null {
  if (!valeur || valeur.length > 300) return null;
  const parties = valeur.split('.');
  if (parties.length !== 3) return null;
  const [id, iatTxt, sig] = parties;
  const iat = Number(iatTxt);
  if (!/^[0-9a-f-]{20,64}$/i.test(id) || !Number.isFinite(iat) || !sig) return null;
  return { id, iat, sig };
}

function signatureValide(attendue: string, recue: string): boolean {
  const a = Buffer.from(attendue);
  const b = Buffer.from(recue);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const optionsCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: DUREE_JOURS * 24 * 60 * 60,
};

export function poserSession(res: NextResponse, user: { id: string; password_hash?: string | null }) {
  res.cookies.set(NOM_COOKIE, creerJeton(user), optionsCookie);
}

export function effacerSession(res: NextResponse) {
  res.cookies.set(NOM_COOKIE, '', { ...optionsCookie, maxAge: 0 });
}

/**
 * Renvoie l'utilisateur de la session (colonnes demandées) si le cookie est valide, sinon null.
 * `erreurBase` est vrai si la base n'a pas répondu (à distinguer d'une session invalide).
 */
export async function utilisateurDeSession<T extends Record<string, unknown>>(
  req: NextRequest,
  supabase: SupabaseClient,
  colonnes: string,
): Promise<{ user: (T & { id: string }) | null; erreurBase: boolean; renouveler: (res: NextResponse) => void }> {
  const rien = () => {};
  const jeton = lire(req.cookies.get(NOM_COOKIE)?.value);
  if (!jeton) return { user: null, erreurBase: false, renouveler: rien };
  if (Date.now() - jeton.iat > DUREE_MS || jeton.iat > Date.now() + 60_000) {
    return { user: null, erreurBase: false, renouveler: rien };
  }

  const cols = colonnes.split(',').map(c => c.trim()).filter(Boolean);
  const avecHash = cols.includes('password_hash') ? cols : [...cols, 'password_hash'];
  const { data, error } = await supabase
    .from('users')
    .select(avecHash.join(', '))
    .eq('id', jeton.id)
    .maybeSingle();

  if (error) return { user: null, erreurBase: true, renouveler: rien };
  if (!data) return { user: null, erreurBase: false, renouveler: rien };

  const row = data as unknown as T & { id: string; password_hash?: string | null };
  if (!signatureValide(signer(jeton.id, jeton.iat, row.password_hash), jeton.sig)) {
    return { user: null, erreurBase: false, renouveler: rien };
  }
  const hash = row.password_hash;
  if (!cols.includes('password_hash')) delete row.password_hash;
  // Expiration glissante : on réémet le cookie si la session a plus de 7 jours
  const renouveler = Date.now() - jeton.iat > RENOUVELER_APRES_MS
    ? (res: NextResponse) => poserSession(res, { id: row.id, password_hash: hash })
    : rien;
  return { user: row, erreurBase: false, renouveler };
}
