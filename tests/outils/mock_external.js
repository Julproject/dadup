// Préchargé dans Node (NODE_OPTIONS=--require) : intercepte les appels sortants
// vers Brevo (emails) et Stripe (REST via fetch), et les enregistre dans un fichier.
const fs = require('fs');
const OUT = process.env.QA_OUTBOX || '/tmp/qa_outbox.jsonl';
const realFetch = globalThis.fetch;

function record(entry) {
  try { fs.appendFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), ...entry }) + '\n'); } catch (e) {}
}

globalThis.fetch = async function (input, init = {}) {
  const url = typeof input === 'string' ? input : (input && input.url) || String(input);
  if (url.startsWith('https://api.brevo.com/')) {
    let body = init.body;
    try { body = JSON.parse(init.body); } catch (e) {}
    record({ kind: 'email', url, body });
    if (process.env.QA_BREVO_FAIL === '1') return new Response(JSON.stringify({ message: 'brevo down' }), { status: 500 });
    return new Response(JSON.stringify({ messageId: 'qa-' + Date.now() }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  }
  if (url.startsWith('https://api.stripe.com/')) {
    record({ kind: 'stripe', url });
    // Session de checkout factice : l'id encode l'email (cs_test_<email en base64url>)
    const m = url.match(/checkout\/sessions\/(cs_test_[A-Za-z0-9_-]+)/);
    if (m) {
      let email = '';
      try { email = Buffer.from(m[1].slice(8), 'base64url').toString(); } catch (e) {}
      return new Response(JSON.stringify({ id: m[1], customer_details: { email } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ error: { message: 'not mocked' } }), { status: 404 });
  }
  return realFetch(input, init);
};
