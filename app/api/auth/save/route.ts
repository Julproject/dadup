import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { utilisateurDeSession } from '../../../../lib/session';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function estDate(v: unknown): v is string {
  return typeof v === 'string' && DATE_RE.test(v) && !Number.isNaN(new Date(v).getTime());
}

function estObjet(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function echapper(s: unknown): string {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

// Date du jour + 1 an, au format AAAA-MM-JJ
function unAnApres(dateIso: string): string {
  const [a, m, j] = dateIso.split('-').map(Number);
  const d = new Date(Date.UTC(a + 1, m - 1, j));
  return d.toISOString().slice(0, 10);
}

async function alerteInterne(sujet: string, html: string) {
  if (!process.env.BREVO_API_KEY) return;
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
      body: JSON.stringify({
        sender: { name: 'DadUp', email: 'hello@dadup.fr' },
        to: [{ email: 'hello@dadup.fr' }],
        subject: sujet,
        htmlContent: html,
      }),
    });
  } catch (e) {
    console.error('Alerte interne:', e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user: session, erreurBase } = await utilisateurDeSession(req, supabase, 'id, actif');
    if (erreurBase) {
      return NextResponse.json({ error: 'DadUp est momentanément indisponible.' }, { status: 503 });
    }
    if (!session || !session.actif) {
      return NextResponse.json({ error: 'Non connecté.' }, { status: 401 });
    }
    const sessionId = session.id;

    const brut = await req.text();
    if (brut.length > 64 * 1024) {
      return NextResponse.json({ error: 'Données trop volumineuses.' }, { status: 413 });
    }
    let body: unknown;
    try { body = JSON.parse(brut); } catch { return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 }); }
    if (!estObjet(body)) {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
    }

    // Seuls ces champs peuvent être modifiés par le navigateur.
    // L'email, l'activation et la date de fin d'accès sont gérés uniquement côté serveur.
    const update: Record<string, unknown> = {};

    if (body.prenom !== undefined) {
      if (typeof body.prenom !== 'string') return NextResponse.json({ error: 'Prénom invalide.' }, { status: 400 });
      update.prenom = body.prenom.trim().slice(0, 60);
    }
    if (body.dpa !== undefined) {
      if (body.dpa && !estDate(body.dpa)) return NextResponse.json({ error: 'Date invalide.' }, { status: 400 });
      update.dpa = body.dpa || null;
    }
    if (body.dpa_originale !== undefined) {
      if (body.dpa_originale && !estDate(body.dpa_originale)) return NextResponse.json({ error: 'Date invalide.' }, { status: 400 });
      update.dpa_originale = body.dpa_originale || null;
    }
    for (const champ of ['valise_checked', 'missions_checked', 'achats_checked', 'rdv_dates'] as const) {
      if (body[champ] !== undefined) {
        if (!estObjet(body[champ])) return NextResponse.json({ error: 'Données invalides.' }, { status: 400 });
        update[champ] = body[champ];
      }
    }
    if (body.next_rdv !== undefined) {
      if (body.next_rdv && !estDate(body.next_rdv)) return NextResponse.json({ error: 'Date invalide.' }, { status: 400 });
      update.next_rdv = body.next_rdv || '';
    }

    const naissance = body.naissance_count_increment === true;
    const modifDpa = body.dpa_modif_increment === true || body.dpa_modif_increment === 'true';

    if (naissance || modifDpa) {
      const { data: userData } = await supabase
        .from('users')
        .select('naissance_count, dpa_modif_count, access_until, email, prenom')
        .eq('id', sessionId)
        .single();

      if (naissance) {
        const count = (userData?.naissance_count || 0) + 1;
        update.naissance_count = count;

        // Fin d'accès : 1 an après la naissance, fixée une seule fois (jamais prolongée)
        if (!userData?.access_until) {
          const dateNaissance = estDate(body.dpa) ? body.dpa : new Date().toISOString().slice(0, 10);
          update.access_until = unAnApres(dateNaissance);
        }

        if (count >= 3) {
          await alerteInterne(
            `DadUp - ${echapper(userData?.prenom) || 'Un père'} a cliqué ${count} fois sur "Bébé est né"`,
            `<p>L'utilisateur <strong>${echapper(userData?.prenom)}</strong> (${echapper(userData?.email)}) a cliqué <strong>${count} fois</strong> sur "Bébé est né".</p><p>Contacte-le pour vérifier que tout va bien.</p>`,
          );
        }
      }

      if (modifDpa) {
        const count = (userData?.dpa_modif_count || 0) + 1;
        update.dpa_modif_count = count;
        if (count >= 3) {
          await alerteInterne(
            `DadUp - ${echapper(userData?.prenom) || 'Un père'} a modifié sa DPA ${count} fois`,
            `<p>L'utilisateur <strong>${echapper(userData?.prenom)}</strong> (${echapper(userData?.email)}) a modifié sa DPA <strong>${count} fois</strong>.</p><p>Vérifie que tout est correct dans son profil.</p>`,
          );
        }
      }
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ ok: true });
    }

    const { error } = await supabase.from('users').update(update).eq('id', sessionId);
    if (error) {
      console.error('Save error:', JSON.stringify(error));
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Save error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
