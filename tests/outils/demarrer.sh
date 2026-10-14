#!/usr/bin/env bash
# Démarre l'environnement de test local : fausse base Supabase + app DadUp (build de production).
# Aucune vraie base, aucun vrai email, aucun vrai paiement : tout est simulé.
# Usage : tests/outils/demarrer.sh [--build]
set -euo pipefail

RACINE="$(cd "$(dirname "$0")/../.." && pwd)"
OUTILS="$RACINE/tests/outils"

export SUPABASE_URL=http://127.0.0.1:54321
export NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
export SUPABASE_SERVICE_ROLE_KEY=qa-service-key
export STRIPE_SECRET_KEY=sk_test_qa
export STRIPE_WEBHOOK_SECRET=whsec_qa_secret
export STRIPE_PRICE_ID=price_qa
export BREVO_API_KEY=qa-brevo
export NEXT_PUBLIC_URL=http://localhost:3100
export NEXT_TELEMETRY_DISABLED=1
export QA_OUTBOX="$RACINE/tests/.outbox.jsonl"

cd "$RACINE"
if [[ "${1:-}" == "--build" ]]; then
  npx next build
fi

: > "$QA_OUTBOX"
python3 "$OUTILS/fake_supabase.py" 54321 > "$RACINE/tests/.fake_supabase.log" 2>&1 &
NODE_OPTIONS="--require $OUTILS/mock_external.js" npx next start -p 3100 > "$RACINE/tests/.serveur.log" 2>&1 &

for _ in $(seq 1 60); do
  if curl -s -o /dev/null http://localhost:3100/ && curl -s -o /dev/null http://127.0.0.1:54321/__db; then
    echo "Environnement de test prêt sur http://localhost:3100"
    exit 0
  fi
  sleep 1
done
echo "Le serveur n'a pas démarré (voir tests/.serveur.log)" >&2
exit 1
