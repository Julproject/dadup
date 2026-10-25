"""Lot 2 : textes clairs, boutons explicites, FAQ."""
import re
from qa_lib import APP

PAGES = ["/", "/inclus", "/pourquoi", "/tarifs", "/sources", "/contact", "/professionnels", "/cgv", "/confidentialite", "/mentions-legales", "/login"]


def test_aucun_point_median_ni_ancien_bouton(pw):
    c = pw.new_context(viewport={"width": 1280, "height": 900})
    page = c.new_page()
    for url in PAGES:
        page.goto(APP + url)
        page.wait_for_load_state("networkidle")
        texte = page.inner_text("body")
        assert "·" not in texte, url
        for ancien in ["Accéder à DadUp\n", "Accéder maintenant", "41 semaines", "Prends ta place de père"]:
            assert ancien not in texte, (url, ancien)
        boutons = [b.strip() for b in page.locator("button, a").all_inner_texts()]
        assert "Commencer" not in boutons and "Accéder" not in boutons, url
    c.close()


def test_premier_ecran_et_badges(pw):
    c = pw.new_context(viewport={"width": 390, "height": 844})
    page = c.new_page()
    page.goto(APP + "/")
    page.wait_for_load_state("networkidle")
    h1 = re.sub(r"\s+", " ", page.locator("h1").inner_text())
    assert h1 == "Être père commence avant la naissance. DadUp t'aide à savoir comment."
    assert page.locator(".hero-chip").count() == 3
    page.get_by_role("button", name="Obtenir mon accès pour 49,99 €").first.click()
    assert "Après le paiement, tu reçois un email pour créer ton mot de passe et accéder à ton espace." in page.inner_text("body")
    c.close()


def test_faq_courte_accueil(pw):
    c = pw.new_context(viewport={"width": 390, "height": 844})
    page = c.new_page()
    page.goto(APP + "/")
    page.wait_for_load_state("networkidle")
    q = page.get_by_role("button", name="Et si ça ne me convient pas ?")
    assert q.get_attribute("aria-expanded") == "false"
    q.click()
    assert q.get_attribute("aria-expanded") == "true"
    assert "On te rembourse intégralement" in page.inner_text("body")
    c.close()


def test_faq_tarifs_au_tutoiement(pw):
    c = pw.new_context(viewport={"width": 1280, "height": 900})
    page = c.new_page()
    page.goto(APP + "/tarifs")
    page.wait_for_load_state("networkidle")
    for b in page.locator("section button[aria-expanded]").all():
        b.click()
    texte = page.inner_text("body")
    assert not re.search(r"(?<!-)\b(vous|votre|vos)\b", texte, re.I)
    assert "DPA" not in texte
    assert "Je suis déjà bien avancé dans la grossesse" in texte
    c.close()
