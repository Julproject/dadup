import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('dadup_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Non connecté.' }, { status: 401 });
    }

    const body = await req.json();
    const {
      prenom, email, dpa, dpa_originale, access_until, naissance_count_increment, dpa_modif_increment,
      valise_checked, missions_checked,
      rdv_dates, next_rdv, achats_checked,
    } = body;

    const update: Record<string, any> = {};
    if (prenom           !== undefined) update.prenom           = prenom;
    if (email            !== undefined) update.email            = email.toLowerCase().trim();
    if (dpa              !== undefined) update.dpa = dpa || null;
    if (access_until     !== undefined) update.access_until = access_until || null;

    // Incrémenter naissance_count si demandé
    if (naissance_count_increment) {
      // Récupérer le count actuel
      const { data: userData } = await supabase
        .from('users')
        .select('naissance_count, email, prenom')
        .eq('id', sessionId)
        .single();

      const currentCount = (userData?.naissance_count || 0) + 1;
      update.naissance_count = currentCount;

      // Envoyer email si >= 3
      if (currentCount >= 3 && process.env.BREVO_API_KEY) {
        try {
          await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
              sender: { name: 'DadUp', email: 'hello@dadup.fr' },
              to: [{ email: 'hello@dadup.fr' }],
              subject: `⚠️ DadUp - ${userData?.prenom || 'Un père'} a cliqué ${currentCount} fois sur "Bébé est né"`,
              htmlContent: `<p>L'utilisateur <strong>${userData?.prenom || ''}</strong> (${userData?.email || ''}) a cliqué <strong>${currentCount} fois</strong> sur "Bébé est né !".</p><p>Contacte-le pour vérifier que tout va bien.</p>`,
            }),
          });
        } catch (e) {
          console.error('Email alerte naissance:', e);
        }
      }
    }
    // Incrémenter dpa_modif_count si demandé et envoyer alerte si >= 3
    if (dpa_modif_increment) {
      const { data: userData } = await supabase
        .from('users')
        .select('dpa_modif_count, email, prenom')
        .eq('id', sessionId)
        .single();

      const currentCount = (userData?.dpa_modif_count || 0) + 1;
      update.dpa_modif_count = currentCount;

      if (currentCount >= 3 && process.env.BREVO_API_KEY) {
        try {
          await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
              sender: { name: 'DadUp', email: 'hello@dadup.fr' },
              to: [{ email: 'hello@dadup.fr' }],
              subject: `⚠️ DadUp - ${userData?.prenom || 'Un père'} a modifié sa DPA ${currentCount} fois`,
              htmlContent: `<p>L'utilisateur <strong>${userData?.prenom || ''}</strong> (${userData?.email || ''}) a modifié sa DPA <strong>${currentCount} fois</strong>.</p><p>Vérifie que tout est correct dans son profil.</p>`,
            }),
          });
        } catch (e) {
          console.error('Email alerte DPA:', e);
        }
      }
    }
    if (dpa_originale    !== undefined) update.dpa_originale    = dpa_originale || null;
    if (achats_checked   !== undefined) update.achats_checked   = achats_checked;
    if (valise_checked   !== undefined) update.valise_checked   = valise_checked;
    if (missions_checked !== undefined) update.missions_checked = missions_checked;
    if (rdv_dates        !== undefined) update.rdv_dates        = rdv_dates;
    if (next_rdv         !== undefined) update.next_rdv         = next_rdv;

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ ok: true }); // rien à mettre à jour
    }

    const { error } = await supabase
      .from('users')
      .update(update)
      .eq('id', sessionId);

    if (error) {
      console.error('Save error:', JSON.stringify(error));
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Save error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
