"""Erreurs simples (lien invalide, page introuvable). Les pannes sont testées dans test_13_lotD."""
import datetime
import requests
from qa_lib import APP, DB, seed_user, user_by_email, session_cookie

MDP = "MotDePasse123"


def d(j):
    return (datetime.date.today() + datetime.timedelta(days=j)).isoformat()


def login(page, email):
    page.goto(APP + "/login")
    page.locator("#login-email").fill(email)
    page.locator("#login-mdp").fill(MDP)
    page.get_by_role("button", name="Se connecter").click()
    page.wait_for_url("**/dashboard**")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(400)


def test_lien_reinitialisation_invalide(ctx):
    page = ctx.new_page()
    page.goto(APP + "/reset-password?token=inexistant")
    page.get_by_label("Nouveau mot de passe").fill("Valide12345")
    page.get_by_label("Confirme le mot de passe").fill("Valide12345")
    page.locator("button[type=submit], button:has-text('mot de passe')").first.click()
    page.wait_for_timeout(1000)
    assert "invalide" in page.inner_text("body").lower()


def test_page_introuvable(ctx):
    page = ctx.new_page()
    r = page.goto(APP + "/page-qui-nexiste-pas")
    print("PAGE_404", r.status, page.locator("h1").first.inner_text()[:60])
    assert r.status == 404


