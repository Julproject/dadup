"""Bascule post-partum, changement d'appareil, appareil partagé."""
import datetime, re
from qa_lib import APP, seed_user, user_by_email

MDP = "MotDePasse123"


def d(jours):
    return (datetime.date.today() + datetime.timedelta(days=jours)).isoformat()


def login(page, email):
    page.goto(APP + "/login")
    page.locator("#login-email").fill(email)
    page.locator("#login-mdp").fill(MDP)
    page.get_by_role("button", name="Se connecter").click()
    page.wait_for_url("**/dashboard**")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(500)


def mode(page):
    nav = page.locator(".dd-bottomnav").inner_text()
    return "post" if "Santé" in nav or "Ce mois" in nav else "grossesse"


def declarer_naissance(page):
    page.goto(APP + "/dashboard?tab=jourj"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Bébé est né").click()
    page.get_by_role("button", name="Oui, bébé est né").click()
    page.wait_for_timeout(1500)


def test_naissance_avant_terme_puis_autre_appareil(ctx, pw):
    seed_user("a@test.fr", MDP, prenom="Thomas", dpa=d(10))
    page = ctx.new_page(); login(page, "a@test.fr")
    dialogs = []; page.on("dialog", lambda dl: (dialogs.append(dl.message), dl.accept()))
    declarer_naissance(page)
    txt = page.inner_text("body")
    assert "Tu es papa" in txt, "écran de célébration"
    page.get_by_role("button", name="Découvrir le premier mois").click()
    assert mode(page) == "post"
    u = user_by_email("a@test.fr")
    print("BASE_APRES_NAISSANCE", u["dpa"], u.get("dpa_originale"), u.get("access_until"), u.get("naissance_count"))
    assert u["dpa"] == d(0) and u.get("dpa_originale") == d(10)  # date de naissance réelle (aujourd'hui par défaut)
    # Autre appareil (navigateur neuf)
    c2 = pw.new_context(viewport={"width": 390, "height": 844}); p2 = c2.new_page(); login(p2, "a@test.fr")
    m2 = mode(p2); sa = re.search(r"SA\s?\d+", p2.inner_text("body"))
    print("AUTRE_APPAREIL_MODE", m2, sa.group(0) if sa else None)
    c2.close()
    assert m2 == "post", "le mode post-partum doit suivre le compte, pas le navigateur"


def test_naissance_apres_la_dpa(ctx):
    """Cas le plus fréquent : bébé naît après la date prévue."""
    seed_user("b@test.fr", MDP, prenom="Marc", dpa=d(-3))
    page = ctx.new_page(); login(page, "b@test.fr")
    avant = mode(page); sa = re.search(r"SA\s?\d+", page.inner_text("body"))
    print("DPA_DEPASSEE_AFFICHAGE", avant, sa.group(0) if sa else None)
    dialogs = []; page.on("dialog", lambda dl: (dialogs.append(dl.message), dl.accept()))
    declarer_naissance(page)
    apres = mode(page)
    print("DPA_DEPASSEE_APRES_CLIC", apres, dialogs, user_by_email("b@test.fr")["dpa"])
    assert apres == "post", "doit pouvoir passer en post-partum après la DPA"


def test_appareil_partage_deconnexion(ctx):
    """Papa A se déconnecte, papa B (nouveau, sans DPA) se connecte sur le même navigateur."""
    seed_user("a@test.fr", MDP, prenom="Antoine", dpa=d(50))
    seed_user("b@test.fr", MDP)  # pas encore de prénom ni de DPA
    page = ctx.new_page(); login(page, "a@test.fr")
    page.goto(APP + "/dashboard?tab=plus"); page.wait_for_load_state("networkidle")
    page.get_by_text("Se déconnecter").click(); page.wait_for_url("**/login**")
    restes = page.evaluate("Object.keys(localStorage).filter(k=>k.startsWith('dadup_'))")
    print("LOCALSTORAGE_APRES_DECONNEXION", restes)
    login(page, "b@test.fr")
    txt = page.inner_text("body")
    onboarding = "Bienvenue sur DadUp" in txt
    print("B_VOIT_ONBOARDING", onboarding, "| B voit le prénom de A :", "Antoine" in txt)
    assert onboarding and "Antoine" not in txt


def test_naissance_depuis_mon_compte(ctx):
    seed_user("c@test.fr", MDP, prenom="Paul", dpa=d(5))
    page = ctx.new_page(); login(page, "c@test.fr")
    page.goto(APP + "/compte"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Bébé est né").click()
    page.wait_for_url("**/dashboard**"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Oui, bébé est né").click(); page.wait_for_timeout(1500)
    if page.get_by_role("button", name="Découvrir le premier mois").count():
        page.get_by_role("button", name="Découvrir le premier mois").click()
    print("COMPTE_NAISSANCE_MODE", mode(page), user_by_email("c@test.fr").get("naissance_count"))
    assert mode(page) == "post"
