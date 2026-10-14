"""Lot A : le paiement et les comptes ne peuvent pas être contournés (comportement attendu après correction)."""
import base64, json
import requests
from qa_lib import APP, REPO, seed_user, user_by_email, emails, checkout_session_id

MDP = "MotDePasse123"


def test_A1_plus_de_creation_de_compte_par_code_email():
    r1 = requests.post(APP + "/api/auth/send-code", json={"email": "x@test.fr"})
    r2 = requests.post(APP + "/api/auth/verify-code", json={"email": "x@test.fr", "code": "123456"})
    assert r1.status_code == 404 and r2.status_code == 404
    assert user_by_email("x@test.fr") is None and not emails("x@test.fr")


def test_A2_plus_de_route_user_update():
    seed_user("v@test.fr", MDP, prenom="Victime")
    tok = base64.b64encode(json.dumps({"email": "v@test.fr"}).encode()).decode()
    r = requests.post(APP + "/api/user/update", cookies={"dadup_token": tok}, json={"prenom": "Autre"})
    assert r.status_code == 404 and user_by_email("v@test.fr")["prenom"] == "Victime"


def test_A2b_page_onboarding_isolee_supprimee():
    assert requests.get(APP + "/onboarding").status_code == 404


def _cookie(email):
    s = requests.Session()
    assert s.post(APP + "/api/auth/login", json={"email": email, "password": MDP}).status_code == 200
    # le cookie est « Secure » en production : on le recopie pour l'envoyer sur http://localhost
    val = s.cookies.get("dadup_session")
    s.cookies.clear()
    s.cookies.set("dadup_session", val)
    return s


def test_A3_save_ignore_les_champs_non_autorises():
    seed_user("a@test.fr", MDP, prenom="A", access_until="2020-01-01")
    u = user_by_email("a@test.fr")
    # on repasse l'accès en cours pour pouvoir se connecter, puis on tente de le modifier
    requests.patch(f"http://127.0.0.1:54321/rest/v1/users?id=eq.{u['id']}", json={"access_until": "2027-01-01"})
    s = _cookie("a@test.fr")
    s.post(APP + "/api/auth/save", json={"access_until": None, "email": "autre@test.fr", "actif": True, "prenom": "B"})
    u = user_by_email("a@test.fr")
    assert u is not None, "l'email ne doit pas changer via save"
    assert u["access_until"] == "2027-01-01", "access_until non modifiable par le navigateur"
    assert u["prenom"] == "B", "les champs autorisés restent modifiables"


def test_A4_fin_d_acces_fixee_par_le_serveur_a_la_premiere_naissance():
    seed_user("a@test.fr", MDP, prenom="A", dpa="2026-12-01")
    s = _cookie("a@test.fr")
    s.post(APP + "/api/auth/save", json={"dpa": "2026-10-12", "dpa_originale": "2026-12-01", "naissance_count_increment": True})
    first = user_by_email("a@test.fr")["access_until"]
    assert first and first.startswith("2027-10-12"), first
    # retour grossesse puis nouvelle déclaration : pas de prolongation
    s.post(APP + "/api/auth/save", json={"dpa": "2026-12-01", "dpa_originale": None})
    s.post(APP + "/api/auth/save", json={"dpa": "2027-03-01", "dpa_originale": "2026-12-01", "naissance_count_increment": True})
    assert user_by_email("a@test.fr")["access_until"] == first


def test_A5_page_succes_ne_reactive_pas_un_compte_resilie():
    seed_user("c@test.fr", MDP, prenom="C")
    s = _cookie("c@test.fr")
    assert s.post(APP + "/api/cancel").status_code == 200
    r = requests.post(APP + "/api/resend-welcome", json={"session_id": checkout_session_id("c@test.fr")})
    assert user_by_email("c@test.fr")["actif"] is False, r.text


def test_A6_prix_fixe_cote_serveur():
    src = open(REPO + "/app/api/checkout/route.ts").read()
    assert "priceId" not in src and "STRIPE_PRICE_ID" in src


def test_A7_parcours_normal_intact():
    """Non-régression : achat → mot de passe → connexion → sauvegarde."""
    u = seed_user("ok@test.fr", MDP, prenom="Ok", dpa="2027-01-01")
    s = _cookie("ok@test.fr")
    assert s.post(APP + "/api/auth/save", json={"valise_checked": {"v1": True}}).status_code == 200
    assert user_by_email("ok@test.fr")["valise_checked"] == {"v1": True}
    assert s.get(APP + "/api/auth/me").status_code == 200
