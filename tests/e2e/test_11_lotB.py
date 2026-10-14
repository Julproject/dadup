"""Lot B : la session est signée, limitée dans le temps, et invalidée au changement de mot de passe."""
import requests
from qa_lib import APP, seed_user, user_by_email

MDP = "MotDePasse123"


def connecter(email, mdp=MDP):
    s = requests.Session()
    r = s.post(APP + "/api/auth/login", json={"email": email, "password": mdp})
    assert r.status_code == 200, r.text
    val = s.cookies.get("dadup_session")
    s.cookies.clear(); s.cookies.set("dadup_session", val)
    return s, val


def test_B1_cookie_fabrique_avec_l_identifiant_refuse():
    u = seed_user("a@test.fr", MDP, prenom="A")
    assert requests.get(APP + "/api/auth/me", cookies={"dadup_session": u["id"]}).status_code == 401
    assert requests.post(APP + "/api/auth/save", cookies={"dadup_session": u["id"]}, json={"prenom": "X"}).status_code == 401
    assert user_by_email("a@test.fr")["prenom"] == "A"


def test_B2_cookie_de_connexion_fonctionne_et_n_est_pas_l_identifiant():
    u = seed_user("a@test.fr", MDP, prenom="A")
    s, val = connecter("a@test.fr")
    assert val != u["id"]
    assert s.get(APP + "/api/auth/me").json()["user"]["prenom"] == "A"
    assert s.post(APP + "/api/auth/save", json={"prenom": "B"}).status_code == 200


def test_B3_signature_alteree_refusee():
    seed_user("a@test.fr", MDP)
    _, val = connecter("a@test.fr")
    faux = val[:-2] + ("AA" if not val.endswith("AA") else "BB")
    assert requests.get(APP + "/api/auth/me", cookies={"dadup_session": faux}).status_code == 401


def test_B4_changement_de_mot_de_passe_invalide_les_autres_sessions():
    seed_user("a@test.fr", MDP)
    autre_appareil, ancien = connecter("a@test.fr")
    s, _ = connecter("a@test.fr")
    r = s.post(APP + "/api/auth/change-password", json={"oldPassword": MDP, "newPassword": "Nouveau12345"})
    assert r.status_code == 200
    nouveau = r.cookies.get("dadup_session")
    assert requests.get(APP + "/api/auth/me", cookies={"dadup_session": ancien}).status_code == 401
    assert nouveau and requests.get(APP + "/api/auth/me", cookies={"dadup_session": nouveau}).status_code == 200


def test_B5_reinitialisation_invalide_les_anciennes_sessions():
    from qa_lib import last_link
    seed_user("a@test.fr", MDP)
    _, ancien = connecter("a@test.fr")
    requests.post(APP + "/api/auth/forgot-password", json={"email": "a@test.fr"})
    token = last_link("a@test.fr").split("token=")[1]
    r = requests.post(APP + "/api/auth/reset-password", json={"token": token, "password": "Reinit12345"})
    assert r.status_code == 200 and r.cookies.get("dadup_session")
    assert requests.get(APP + "/api/auth/me", cookies={"dadup_session": ancien}).status_code == 401
    assert requests.get(APP + "/api/auth/me", cookies={"dadup_session": r.cookies.get("dadup_session")}).status_code == 200


def test_B6_cookie_illisible_refuse_partout():
    for v in ["", "abc", "a.b.c", "x" * 500]:
        assert requests.get(APP + "/api/auth/me", cookies={"dadup_session": v}).status_code == 401
    assert requests.post(APP + "/api/cancel", cookies={"dadup_session": "a.b.c"}).status_code == 401
