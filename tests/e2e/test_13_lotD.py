"""Lot D : fiabilité (fin d'accès, sauvegardes, pannes, retour arrière, cases « lu », email unique)."""
import datetime, re
import requests
from qa_lib import APP, DB, seed_user, user_by_email, emails, purchase, checkout_session_id, session_cookie

MDP = "MotDePasse123"
ITEM_MAISON = "Lit cododo, berceau ou couffin installé et prêt"


def d(j):
    return (datetime.date.today() + datetime.timedelta(days=j)).isoformat()


def mois(n):
    t = datetime.date.today()
    y, m = divmod(t.month - 1 + n, 12)
    return datetime.date(t.year + y, m + 1, min(t.day, 28)).isoformat()


def login(page, email):
    page.goto(APP + "/login")
    page.locator("#login-email").fill(email); page.locator("#login-mdp").fill(MDP)
    page.get_by_role("button", name="Se connecter").click()
    page.wait_for_url("**/dashboard**"); page.wait_for_load_state("networkidle"); page.wait_for_timeout(400)


# ── D1 : fin d'accès 15 mois après la DPA si la naissance n'est pas déclarée ──
def test_D1_acces_expire_15_mois_apres_la_dpa():
    seed_user("old@test.fr", MDP, dpa=mois(-16))
    r = requests.post(APP + "/api/auth/login", json={"email": "old@test.fr", "password": MDP})
    assert r.status_code == 403 and "termin" in r.json()["error"].lower(), r.text


def test_D1b_acces_encore_valide_avant_15_mois():
    seed_user("ok@test.fr", MDP, dpa=mois(-14))
    assert requests.post(APP + "/api/auth/login", json={"email": "ok@test.fr", "password": MDP}).status_code == 200


def test_D1c_naissance_declaree_suit_sa_propre_date():
    seed_user("nais@test.fr", MDP, dpa=mois(-16), dpa_originale=mois(-17), access_until=d(30))
    assert requests.post(APP + "/api/auth/login", json={"email": "nais@test.fr", "password": MDP}).status_code == 200


def test_D1d_me_refuse_aussi_un_acces_expire():
    seed_user("me@test.fr", MDP, dpa=d(10))
    c = session_cookie("me@test.fr")
    u = user_by_email("me@test.fr")
    requests.patch(DB + f"/rest/v1/users?id=eq.{u['id']}", json={"dpa": mois(-16)})
    assert requests.get(APP + "/api/auth/me", cookies={"dadup_session": c}).status_code == 403


# ── D2 : une sauvegarde ratée est signalée puis rejouée ──
def test_D2_sauvegarde_ratee_signalee_puis_rejouee(ctx):
    seed_user("a@test.fr", MDP, prenom="A", dpa=d(140))
    page = ctx.new_page(); login(page, "a@test.fr")
    page.goto(APP + "/dashboard?tab=valise"); page.wait_for_load_state("networkidle")
    requests.post(DB + "/__down")
    page.get_by_text("Chargeur de téléphone + batterie externe").click()
    # la bibliothèque Supabase réessaie ~7 s avant d'abandonner
    page.get_by_role("status").filter(has_text=re.compile("enregistr", re.I)).wait_for(timeout=12000)
    requests.post(DB + "/__up")
    page.reload(); page.wait_for_load_state("networkidle"); page.wait_for_timeout(1500)
    assert user_by_email("a@test.fr").get("valise_checked", {}).get("v1") is True, "modification rejouée"
    assert page.get_by_role("status").count() == 0, "bandeau disparu une fois enregistré"


# ── D3 : une panne de la base ne déconnecte pas ──
def test_D3_panne_au_chargement_ne_deconnecte_pas(ctx):
    seed_user("a@test.fr", MDP, prenom="Alex", dpa=d(140))
    page = ctx.new_page(); login(page, "a@test.fr")
    requests.post(DB + "/__down")
    page.reload(); page.wait_for_timeout(1500)
    url, txt = page.url, page.inner_text("body")
    requests.post(DB + "/__up")
    assert "/dashboard" in url and "Alex" in txt
    page.reload(); page.wait_for_load_state("networkidle")
    assert "/dashboard" in page.url, "toujours connecté une fois la base revenue"


def test_D3b_me_en_panne_renvoie_503_sans_effacer_la_session():
    seed_user("a@test.fr", MDP)
    c = session_cookie("a@test.fr")
    requests.post(DB + "/__down")
    r = requests.get(APP + "/api/auth/me", cookies={"dadup_session": c})
    requests.post(DB + "/__up")
    assert r.status_code == 503 and "Max-Age=0" not in r.headers.get("set-cookie", "")


# ── D4 : message clair si la connexion est impossible ──
def test_D4_connexion_pendant_panne():
    seed_user("a@test.fr", MDP)
    requests.post(DB + "/__down")
    r = requests.post(APP + "/api/auth/login", json={"email": "a@test.fr", "password": MDP})
    requests.post(DB + "/__up")
    assert r.status_code == 503 and "incorrect" not in r.json()["error"]


# ── D5 : bouton retour ──
def test_D5_bouton_retour_change_l_ecran(ctx):
    seed_user("a@test.fr", MDP, prenom="A", dpa=d(140))
    page = ctx.new_page(); login(page, "a@test.fr")
    page.locator(".dd-bottomnav").get_by_text("Toi", exact=True).click(); page.wait_for_timeout(300)
    assert "Toi aussi" in page.inner_text("body")
    page.go_back(); page.wait_for_timeout(500)
    txt = page.inner_text("body")
    assert "COMPTE À REBOURS" in txt.upper() and "Toi aussi" not in txt
    page.go_forward(); page.wait_for_timeout(500)
    assert "Toi aussi" in page.inner_text("body")


# ── D6 : cases « lu » de l'Administratif sur tous les appareils ──
def test_D6_admin_lu_synchronise(ctx, pw):
    seed_user("a@test.fr", MDP, prenom="A", dpa=d(140))
    page = ctx.new_page(); login(page, "a@test.fr")
    page.goto(APP + "/dashboard?tab=admin"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name=re.compile("Déclaration de grossesse : marquer comme lu")).click(); page.wait_for_timeout(800)
    c2 = pw.new_context(viewport={"width": 390, "height": 844}); p2 = c2.new_page(); login(p2, "a@test.fr")
    p2.goto(APP + "/dashboard?tab=admin"); p2.wait_for_load_state("networkidle")
    n = p2.get_by_role("button", name=re.compile("Déclaration de grossesse : marquer comme non lu")).count()
    maison = p2.evaluate("1")
    c2.close()
    assert n == 1
    # les compteurs de la maison ne sont pas faussés
    page.goto(APP + "/dashboard?tab=maison"); page.wait_for_load_state("networkidle")
    assert page.locator("text=/^0\\/\\d+$/").count() >= 1


# ── D7 : un seul email de bienvenue ──
def test_D7_un_seul_email_de_bienvenue(ctx):
    purchase("w@test.fr")
    page = ctx.new_page()
    page.goto(f"{APP}/success?session_id={checkout_session_id('w@test.fr')}"); page.wait_for_timeout(2500)
    bienvenue = [e for e in emails("w@test.fr") if "ienvenue" in e.get("subject", "")]
    assert len(bienvenue) == 1, [e["subject"] for e in emails("w@test.fr")]


# ── D8 : la checklist Maison est enregistrée ──
def test_D8_checklist_maison_enregistree(ctx, pw):
    seed_user("m@test.fr", MDP, prenom="M", dpa=d(140))
    page = ctx.new_page(); login(page, "m@test.fr")
    page.goto(APP + "/dashboard?tab=maison"); page.wait_for_load_state("networkidle")
    page.get_by_text(ITEM_MAISON).first.click()
    page.wait_for_timeout(800)
    u = user_by_email("m@test.fr")
    assert any(v for k, v in (u.get("achats_checked") or {}).items() if not k.startswith("admin:")), u.get("achats_checked")
    c2 = pw.new_context(viewport={"width": 390, "height": 844}); p2 = c2.new_page(); login(p2, "m@test.fr")
    p2.goto(APP + "/dashboard?tab=maison"); p2.wait_for_load_state("networkidle")
    txt = p2.inner_text("body"); c2.close()
    assert re.search(r"\b1/\d+", txt), "1 élément coché retrouvé sur un autre appareil"

