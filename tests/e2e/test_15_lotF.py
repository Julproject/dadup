"""Lot F : performance et maintenance."""
import json, os
import requests
from qa_lib import APP, REPO, seed_user, session_cookie

MDP = "MotDePasse123"


def test_F1_photo_accueil_legere(pw):
    assert os.path.getsize(f"{REPO}/public/main.jpg") < 300 * 1024
    c = pw.new_context(viewport={"width": 390, "height": 844}); page = c.new_page()
    total = {"n": 0}
    page.on("response", lambda r: total.__setitem__("n", total["n"] + len(r.body())) if r.request.resource_type == "image" else None)
    page.goto(APP + "/"); page.wait_for_load_state("networkidle")
    page.mouse.wheel(0, 20000); page.wait_for_timeout(800)
    c.close()
    assert total["n"] < 600 * 1024, total


def test_F2_page_temoignages_supprimee():
    assert requests.get(APP + "/temoignages").status_code == 404


def test_F3_onboarding_refuse_une_dpa_aberrante(ctx):
    seed_user("a@test.fr", MDP)
    page = ctx.new_page()
    page.goto(APP + "/login")
    page.locator("#login-email").fill("a@test.fr"); page.locator("#login-mdp").fill(MDP)
    page.get_by_role("button", name="Se connecter").click()
    page.wait_for_url("**/dashboard**"); page.wait_for_load_state("networkidle")
    page.get_by_label("Ton prénom").fill("A")
    page.get_by_label("Date d'accouchement prévue").fill("2031-06-01")
    assert page.get_by_role("button", name="Accéder à mon espace").is_disabled()
    assert page.get_by_role("alert").filter(has_text="10 prochains mois").count() == 1


def test_F4_serveur_refuse_une_dpa_hors_limites():
    seed_user("a@test.fr", MDP)
    c = session_cookie("a@test.fr")
    r = requests.post(APP + "/api/auth/save", cookies={"dadup_session": c}, json={"dpa": "2031-06-01"})
    assert r.status_code == 400


def test_F5_versions_figees():
    pkg = json.load(open(f"{REPO}/package.json"))
    assert pkg["dependencies"]["next"][0].isdigit(), "version exacte de Next.js"
    assert os.path.exists(f"{REPO}/package-lock.json")
    for d in ["framer-motion", "@heroicons/react", "tailwindcss"]:
        assert d not in pkg.get("dependencies", {}) and d not in pkg.get("devDependencies", {})
