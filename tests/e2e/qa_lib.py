"""Outils communs aux tests DadUp (environnement local : fausse base + emails interceptés)."""
import hashlib, hmac, json, os, re, time, uuid, base64
import requests

APP = "http://localhost:3100"
DB = "http://127.0.0.1:54321"
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUTBOX = os.environ.get("QA_OUTBOX", os.path.join(REPO, "tests", ".outbox.jsonl"))
WHSEC = "whsec_qa_secret"

# Chaque requête de test simule un visiteur différent (adresse IP distincte),
# comme en production où Vercel transmet la vraie adresse du visiteur.
import random as _random
_orig_request = requests.Session.request


def _request(self, method, url, **kw):
    headers = dict(kw.pop("headers", None) or {})
    if str(url).startswith(APP):
        headers.setdefault("X-Forwarded-For", "10.%d.%d.%d" % (_random.randint(0, 255), _random.randint(0, 255), _random.randint(1, 254)))
    return _orig_request(self, method, url, headers=headers, **kw)


requests.Session.request = _request


def reset_all():
    requests.post(DB + "/__reset")
    requests.post(DB + "/__up")
    open(OUTBOX, "w").close()


def db():
    return requests.get(DB + "/__db").json()


def user_by_email(email):
    return next((u for u in db()["users"] if u.get("email") == email), None)


def emails(to=None):
    out = []
    if not os.path.exists(OUTBOX):
        return out
    for line in open(OUTBOX):
        e = json.loads(line)
        if e.get("kind") != "email":
            continue
        body = e.get("body") or {}
        rcpts = [t.get("email") for t in body.get("to", [])]
        if to is None or to in rcpts:
            out.append(body)
    return out


def last_link(to, path="/reset-password"):
    for body in reversed(emails(to)):
        m = re.search(r'href="(http[^"]*' + re.escape(path) + r'[^"]*)"', body.get("htmlContent", ""))
        if m:
            return m.group(1)
    return None


def stripe_webhook(event_type, obj):
    payload = json.dumps({"id": "evt_" + uuid.uuid4().hex, "object": "event", "type": event_type,
                          "data": {"object": obj}, "api_version": "2023-10-16"})
    t = str(int(time.time()))
    sig = hmac.new(WHSEC.encode(), f"{t}.{payload}".encode(), hashlib.sha256).hexdigest()
    return requests.post(APP + "/api/webhook", data=payload,
                         headers={"stripe-signature": f"t={t},v1={sig}", "content-type": "application/json"})


def checkout_session_id(email):
    return "cs_test_" + base64.urlsafe_b64encode(email.encode()).decode().rstrip("=")


def purchase(email):
    """Simule un paiement Stripe réussi (webhook signé) pour cet email."""
    return stripe_webhook("checkout.session.completed", {
        "id": checkout_session_id(email), "object": "checkout.session", "mode": "payment",
        "customer": "cus_qa", "customer_details": {"email": email}, "subscription": None})


def seed_user(email, password=None, **fields):
    """Crée un utilisateur directement en base (mot de passe haché par l'API reset)."""
    purchase(email)
    u = user_by_email(email)
    if password:
        link = last_link(email)
        token = link.split("token=")[1]
        r = requests.post(APP + "/api/auth/reset-password", json={"token": token, "password": password})
        assert r.status_code == 200, r.text
    if fields:
        requests.patch(DB + f"/rest/v1/users?id=eq.{u['id']}", json=fields)
    return user_by_email(email)


def login_session(email, password):
    s = requests.Session()
    r = s.post(APP + "/api/auth/login", json={"email": email, "password": password})
    return s, r


def session_cookie(email, password="MotDePasse123"):
    """Valeur du cookie de session obtenue par une vraie connexion."""
    r = requests.post(APP + "/api/auth/login", json={"email": email, "password": password})
    assert r.status_code == 200, r.text
    return r.cookies.get("dadup_session")
