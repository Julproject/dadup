"""Lot C : la naissance est enregistrée dans le compte et fonctionne dans tous les cas."""
import datetime, re
from qa_lib import APP, seed_user, user_by_email

MDP = "MotDePasse123"


def d(j):
    return (datetime.date.today() + datetime.timedelta(days=j)).isoformat()


def login(page, email):
    page.goto(APP + "/login")
    page.locator("#login-email").fill(email); page.locator("#login-mdp").fill(MDP)
    page.get_by_role("button", name="Se connecter").click()
    page.wait_for_url("**/dashboard**"); page.wait_for_load_state("networkidle"); page.wait_for_timeout(500)


def mode(page):
    nav = page.locator(".dd-bottomnav").inner_text()
    return "post" if ("Santé" in nav or "Ce mois" in nav) else "grossesse"


def declarer(page, date_naissance=None):
    page.goto(APP + "/dashboard?tab=jourj"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Bébé est né").click()
    if date_naissance:
        page.get_by_label("Date de naissance").fill(date_naissance)
    page.get_by_role("button", name="Oui, bébé est né").click()
    page.wait_for_timeout(1500)
    if page.get_by_role("button", name="Découvrir le premier mois").count():
        page.get_by_role("button", name="Découvrir le premier mois").click()


def test_C1_naissance_avant_terme_suit_le_compte(ctx, pw):
    seed_user("a@test.fr", MDP, prenom="A", dpa=d(10))
    page = ctx.new_page(); login(page, "a@test.fr")
    declarer(page)
    assert mode(page) == "post"
    c2 = pw.new_context(viewport={"width": 390, "height": 844}); p2 = c2.new_page(); login(p2, "a@test.fr")
    m2 = mode(p2); c2.close()
    assert m2 == "post"


def test_C2_naissance_apres_la_date_prevue(ctx):
    seed_user("b@test.fr", MDP, prenom="B", dpa=d(-3))
    page = ctx.new_page(); login(page, "b@test.fr")
    dialogs = []; page.on("dialog", lambda dl: (dialogs.append(dl.message), dl.accept()))
    declarer(page)
    assert not dialogs and mode(page) == "post"
    assert user_by_email("b@test.fr")["dpa_originale"] == d(-3)


def test_C3_date_de_naissance_saisie(ctx):
    seed_user("c@test.fr", MDP, prenom="C", dpa=d(2))
    page = ctx.new_page(); login(page, "c@test.fr")
    declarer(page, d(-5))
    u = user_by_email("c@test.fr")
    assert u["dpa"] == d(-5), "la date de naissance devient la référence du post-partum"
    naissance = datetime.date.today() - datetime.timedelta(days=5)
    assert u["access_until"] == naissance.replace(year=naissance.year + 1).isoformat()
    page.goto(APP + "/dashboard?tab=home"); page.wait_for_load_state("networkidle"); page.wait_for_timeout(400)
    assert re.search(r"\b5\b\s*jours de vie", page.inner_text("body")), page.inner_text("body")[:300]


def test_C4_retour_en_grossesse_suit_le_compte(ctx, pw):
    seed_user("e@test.fr", MDP, prenom="E", dpa=d(20))
    page = ctx.new_page(); login(page, "e@test.fr")
    declarer(page)
    page.goto(APP + "/dashboard?tab=plus"); page.wait_for_load_state("networkidle")
    page.goto(APP + "/compte"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Revenir en mode grossesse").click()
    page.wait_for_url("**/dashboard**"); page.wait_for_load_state("networkidle"); page.wait_for_timeout(300)
    if page.get_by_role("button", name="Revenir en mode grossesse").count():
        page.get_by_role("button", name="Revenir en mode grossesse").click(); page.wait_for_timeout(1000)
    u = user_by_email("e@test.fr")
    assert u["dpa"] == d(20) and u["dpa_originale"] is None
    c2 = pw.new_context(viewport={"width": 390, "height": 844}); p2 = c2.new_page(); login(p2, "e@test.fr")
    m2 = mode(p2); c2.close()
    assert m2 == "grossesse"


def test_C5_bebe_est_ne_depuis_mon_compte(ctx):
    seed_user("f@test.fr", MDP, prenom="F", dpa=d(5))
    page = ctx.new_page(); login(page, "f@test.fr")
    page.goto(APP + "/compte"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Bébé est né").click()
    page.wait_for_url("**/dashboard**"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Oui, bébé est né").click(); page.wait_for_timeout(1500)
    if page.get_by_role("button", name="Découvrir le premier mois").count():
        page.get_by_role("button", name="Découvrir le premier mois").click()
    assert mode(page) == "post"


def test_C6_modifier_la_dpa_ne_declare_pas_la_naissance(ctx):
    seed_user("g@test.fr", MDP, prenom="G", dpa=d(100))
    page = ctx.new_page(); login(page, "g@test.fr")
    page.goto(APP + "/compte"); page.wait_for_load_state("networkidle")
    page.get_by_label("Date prévue d'accouchement").fill(d(90))
    page.get_by_role("button", name="Enregistrer").click(); page.wait_for_timeout(1000)
    u = user_by_email("g@test.fr")
    assert u["dpa"] == d(90) and not u.get("dpa_originale")
    page.goto(APP + "/dashboard"); page.wait_for_load_state("networkidle"); page.wait_for_timeout(400)
    assert mode(page) == "grossesse"
