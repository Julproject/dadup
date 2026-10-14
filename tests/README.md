# Tests automatisés DadUp

Tests de bout en bout dans un vrai navigateur (Playwright) et par appels API, sur un environnement **entièrement simulé** :

- `outils/fake_supabase.py` : fausse base Supabase en mémoire (port 54321) ;
- `outils/mock_external.js` : intercepte Brevo (les emails sont écrits dans `tests/.outbox.jsonl`) et Stripe ;
- les paiements arrivent par un webhook Stripe signé avec un secret de test.

Aucune vraie base, aucun vrai email, aucun vrai paiement.

## Lancer les tests

```bash
npm ci
pip install pytest playwright requests pillow && python3 -m playwright install chromium
SUPABASE_URL=http://127.0.0.1:54321 SUPABASE_SERVICE_ROLE_KEY=qa-service-key \
  STRIPE_SECRET_KEY=sk_test_qa STRIPE_WEBHOOK_SECRET=whsec_qa_secret STRIPE_PRICE_ID=price_qa \
  BREVO_API_KEY=qa-brevo NEXT_PUBLIC_URL=http://localhost:3100 npx next build
tests/outils/demarrer.sh
python3 -m pytest -q tests/e2e
```

(`tests/outils/demarrer.sh --build` fait le build avec les bonnes variables.)

## Ce qui est couvert

| Fichier | Contenu |
|---|---|
| `test_01_parcours.py` | Achat, création du mot de passe, onboarding, semaines, checklists, connexion, mot de passe oublié, Mon compte, navigation |
| `test_02_naissance_et_appareils.py` | Bascule post-partum, changement d'appareil, appareil partagé |
| `test_04_erreurs.py` | Lien de réinitialisation invalide, page 404 |
| `test_05_technique.py` | 0 erreur JS et 0 débordement sur 28 écrans × 3 tailles, poids des pages |
| `test_10_lotA.py` | Paiement et comptes non contournables |
| `test_11_lotB.py` | Session signée et révocable |
| `test_12_lotC.py` | Naissance (avant/après la DPA, date saisie, retour en grossesse) |
| `test_13_lotD.py` | Fin d'accès, sauvegardes en panne, bouton retour, Maison, email unique |
| `test_14_lotE.py` | Contact, en-têtes, taille des données, mot de passe oublié |
| `test_15_lotF.py` | Poids de l'accueil, page Témoignages supprimée, DPA aberrante, versions figées |
| `test_16_pwa.py` | App installée : barre du bas et barre d'accueil de l'iPhone, manifeste, icône, champs sans zoom, page hors ligne |

## Ce qui n'est pas testé ici

La vraie base Supabase, les vrais paiements et remboursements Stripe, la délivrabilité des emails, la production Vercel et les vrais téléphones.
