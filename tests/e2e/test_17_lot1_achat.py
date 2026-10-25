"""Lot 1 : fenêtre de paiement fiable sur tous les écrans, durée de l'accès harmonisée."""
import datetime
import pytest
from qa_lib import APP, seed_user, session_cookie

MDP = "MotDePasse123"
MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
        "septembre", "octobre", "novembre", "décembre"]


def d(j):
    return (datetime.date.today() + datetime.timedelta(days=j)).isoformat()


def ouvrir_fenetre(pw, w, h):
    c = pw.new_context(viewport={"width": w, "height": h}, locale="fr-FR")
    page = c.new_page()
    page.goto(APP + "/")
    page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Accéder à DadUp").first.click()
    dialog = page.get_by_role("dialog")
    dialog.wait_for()
    return c, page, dialog


@pytest.mark.parametrize("w,h", [(320, 568), (360, 640), (390, 844)])
def test_fenetre_tient_dans_l_ecran(pw, w, h):
    c, page, dialog = ouvrir_fenetre(pw, w, h)
    boite = dialog.bounding_box()
    assert boite["y"] >= 0 and boite["y"] + boite["height"] <= h + 1
    fermer = page.get_by_role("button", name="Fermer")
    fb = fermer.bounding_box()
    assert fb["y"] >= 0, "La croix doit rester visible"
    # Le bouton Payer est atteignable en faisant défiler la fenêtre
    payer = page.get_by_role("button", name="Payer 49,99€")
    payer.scroll_into_view_if_needed()
    pb = payer.bounding_box()
    assert 0 <= pb["y"] and pb["y"] + pb["height"] <= h + 1
    # La croix reste visible même après défilement
    fb = fermer.bounding_box()
    assert fb["y"] >= 0 and fb["y"] + fb["height"] <= h
    c.close()


def test_clavier_echap_tab_et_retour(pw):
    c, page, dialog = ouvrir_fenetre(pw, 390, 844)
    assert page.evaluate("document.body.style.overflow") == "hidden"
    for _ in range(12):
        page.keyboard.press("Tab")
        assert page.evaluate("!!document.activeElement.closest('[role=dialog]')"), "Tab doit rester dans la fenêtre"
    page.keyboard.press("Escape")
    dialog.wait_for(state="detached")
    assert page.evaluate("document.activeElement.textContent").strip().startswith("Accéder à DadUp")
    assert page.evaluate("document.body.style.overflow") != "hidden"
    c.close()


def test_erreur_de_paiement_affichee(pw):
    c, page, dialog = ouvrir_fenetre(pw, 390, 844)
    page.route("**/api/checkout", lambda r: r.fulfill(status=500, body="{}", content_type="application/json"))
    page.get_by_role("checkbox").check()
    page.get_by_role("button", name="Payer 49,99€").click()
    alerte = page.get_by_role("alert").filter(has_text="Le paiement n'a pas pu démarrer")
    alerte.wait_for()
    assert page.get_by_role("button", name="Payer 49,99€").is_enabled()
    c.close()


def test_duree_harmonisee(pw):
    c = pw.new_context(viewport={"width": 1280, "height": 900})
    page = c.new_page()
    page.goto(APP + "/tarifs")
    page.wait_for_load_state("networkidle")
    texte = page.inner_text("body")
    assert "annuel" not in texte.lower()
    assert "Email et DPA uniquement" not in texte
    q = page.get_by_role("button", name="L'accès dure combien de temps ?")
    assert q.get_attribute("aria-expanded") == "false"
    q.click()
    assert q.get_attribute("aria-expanded") == "true"
    assert "15 mois après la date prévue d'accouchement" in page.inner_text("body")
    page.goto(APP + "/cgv")
    cgv = page.inner_text("body")
    assert "abonnement" not in cgv.lower()
    assert "15 mois après la date prévue d" in cgv
    c.close()


def test_date_de_fin_dans_mon_compte(pw):
    dpa = datetime.date.today() + datetime.timedelta(days=140)
    seed_user("a@test.fr", MDP, prenom="A", dpa=dpa.isoformat())
    m = dpa.month - 1 + 15
    fin = datetime.date(dpa.year + m // 12, m % 12 + 1, dpa.day)
    attendu = f"{fin.day} {MOIS[fin.month - 1]} {fin.year}"
    c = pw.new_context(viewport={"width": 390, "height": 844}, locale="fr-FR", timezone_id="Europe/Paris")
    c.add_cookies([{"name": "dadup_session", "value": session_cookie("a@test.fr"), "url": APP}])
    page = c.new_page()
    page.goto(APP + "/compte")
    page.locator(".acces-fin").wait_for()
    assert page.locator(".acces-fin").inner_text() == f"Ton accès est prévu jusqu'au {attendu}"
    c.close()
