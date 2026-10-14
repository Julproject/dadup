"""Lot E : protections (formulaire de contact, en-têtes, taille des données, mot de passe oublié)."""
import requests
from qa_lib import APP, seed_user, emails, session_cookie

MDP = "MotDePasse123"


def test_E2_confirmation_contact_sans_recopie_du_message():
    r = requests.post(APP + "/api/contact", json={"email": "papa@test.fr", "sujet": "Question", "message": "Texte libre du visiteur", "prenom": "Paul"})
    assert r.status_code == 200
    conf = emails("papa@test.fr")[-1]["htmlContent"]
    assert "Texte libre du visiteur" not in conf


def test_E2b_email_interne_echappe():
    requests.post(APP + "/api/contact", json={"email": "papa@test.fr", "sujet": "Question", "message": "a <b>gras</b>", "prenom": "Paul"})
    interne = emails("hello@dadup.fr")[-1]["htmlContent"]
    assert "&lt;b&gt;" in interne and "<b>gras</b>" not in interne


def test_E2c_contact_refuse_un_email_invalide():
    r = requests.post(APP + "/api/contact", json={"email": "pas-un-email", "message": "Bonjour"})
    assert r.status_code == 400


def test_E3_en_tetes_de_securite():
    h = requests.get(APP + "/").headers
    assert h.get("X-Frame-Options") == "DENY"
    assert h.get("X-Content-Type-Options") == "nosniff"
    assert h.get("Referrer-Policy")
    assert "X-Powered-By" not in h


def test_E4_donnees_trop_volumineuses_refusees():
    seed_user("a@test.fr", MDP)
    c = session_cookie("a@test.fr")
    gros = {f"k{i}": True for i in range(20000)}
    r = requests.post(APP + "/api/auth/save", cookies={"dadup_session": c}, json={"valise_checked": gros})
    assert r.status_code == 413


def test_E5_mot_de_passe_oublie_pas_de_double_envoi_immediat():
    seed_user("a@test.fr", MDP)
    avant = len(emails("a@test.fr"))
    requests.post(APP + "/api/auth/forgot-password", json={"email": "a@test.fr"})
    requests.post(APP + "/api/auth/forgot-password", json={"email": "a@test.fr"})
    assert len(emails("a@test.fr")) == avant + 1


def test_E6_page_contact_affiche_l_erreur(ctx):
    page = ctx.new_page()
    page.goto(APP + "/contact"); page.wait_for_load_state("networkidle")
    page.get_by_label("Ton email").fill("pas-un-email@x")
    page.get_by_label("Sujet").select_option(index=1)
    page.get_by_label("Ton message").fill("Bonjour")
    page.locator("form").evaluate("f => f.noValidate = true")
    page.get_by_role("button", name="Envoyer").click(); page.wait_for_timeout(800)
    assert page.get_by_role("alert").filter(has_text="invalide").count() == 1
