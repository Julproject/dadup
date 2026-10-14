"""Parcours principal d'un nouveau papa, dans un vrai navigateur."""
import datetime, re, time
import requests
from qa_lib import APP, purchase, user_by_email, last_link, emails, seed_user

EMAIL = "thomas@test.fr"
MDP = "MotDePasse123"


def dpa_dans(jours):
    return (datetime.date.today() + datetime.timedelta(days=jours)).isoformat()


def test_achat_cree_compte_et_envoie_email(ctx):
    r = purchase(EMAIL)
    assert r.status_code == 200, r.text
    u = user_by_email(EMAIL)
    assert u and u["actif"] is True and u.get("reset_token")
    assert last_link(EMAIL), "email de bienvenue avec lien de création de mot de passe"


def test_page_succes_apres_paiement(ctx):
    from qa_lib import checkout_session_id
    purchase(EMAIL)
    page = ctx.new_page()
    page.goto(f"{APP}/success?session_id={checkout_session_id(EMAIL)}")
    page.wait_for_timeout(2500)
    body = page.inner_text("body")
    ctx.success_text = body
    assert "mot de passe" in body.lower() or "email" in body.lower()
    # nombre d'emails de bienvenue reçus pour un seul achat
    nb = len([e for e in emails(EMAIL) if "Bienvenue" in e.get("subject", "") or "Cree ton mot" in e.get("subject", "")])
    print("EMAILS_BIENVENUE", nb)


def test_creation_mot_de_passe_puis_onboarding_et_semaine(ctx):
    purchase(EMAIL)
    link = last_link(EMAIL)
    page = ctx.new_page()
    page.goto(link.replace("http://localhost:3100", APP))
    page.get_by_label("Nouveau mot de passe").fill(MDP)
    page.get_by_label("Confirme le mot de passe").fill(MDP)
    page.locator("button[type=submit], button:has-text('mot de passe')").first.click()
    page.wait_for_url("**/dashboard**", timeout=8000)
    page.wait_for_load_state("networkidle")
    # Onboarding (pas encore de DPA)
    page.get_by_label("Ton prénom").fill("Thomas")
    page.get_by_label("Date d'accouchement prévue").fill(dpa_dans(140))
    page.get_by_role("button", name="Accéder à mon espace").click()
    page.wait_for_timeout(1000)
    txt = page.inner_text("body")
    assert "Thomas" in txt
    assert "SA 21" in txt and "140" in txt, "41 - 140/7 = 21 SA ; 140 jours avant bébé"
    u = user_by_email(EMAIL)
    assert u["prenom"] == "Thomas" and u["dpa"] == dpa_dans(140), "profil enregistré en base"
    assert not ctx.js_errors, ctx.js_errors


def test_calcul_semaines_bornes(ctx):
    """SA affichée pour plusieurs DPA (convention 41 SA)."""
    seed_user(EMAIL, MDP, prenom="Thomas")
    page = ctx.new_page()
    page.goto(APP + "/login")
    page.locator("#login-email").fill(EMAIL)
    page.locator("#login-mdp").fill(MDP)
    page.get_by_role("button", name="Se connecter").click()
    page.wait_for_url("**/dashboard**")
    res = {}
    for jours, attendu in [(266, "SA 3"), (140, "SA 21"), (7, "SA 40"), (0, "SA 41"), (300, "SA 3")]:
        u = user_by_email(EMAIL)
        requests.patch(f"http://127.0.0.1:54321/rest/v1/users?id=eq.{u['id']}", json={"dpa": dpa_dans(jours)})
        page.evaluate("localStorage.clear()")
        page.reload(); page.wait_for_load_state("networkidle"); page.wait_for_timeout(500)
        txt = page.inner_text("body")
        m = re.search(r"SA\s?(\d+)", txt)
        res[jours] = m.group(0) if m else None
    print("SA_PAR_DPA", res)
    assert res[140] == "SA 21" and res[7] == "SA 40" and res[0] == "SA 41"


def login(page, email=EMAIL, mdp=MDP):
    page.goto(APP + "/login")
    page.locator("#login-email").fill(email)
    page.locator("#login-mdp").fill(mdp)
    page.get_by_role("button", name="Se connecter").click()


def test_connexion_erreur_puis_succes_et_deconnexion(ctx):
    seed_user(EMAIL, MDP, prenom="Thomas", dpa=dpa_dans(140))
    page = ctx.new_page()
    login(page, mdp="mauvais")
    page.wait_for_timeout(800)
    assert "incorrect" in page.inner_text("body").lower()
    login(page)
    page.wait_for_url("**/dashboard**")
    page.wait_for_load_state("networkidle")
    assert "Thomas" in page.inner_text("body")
    # Déconnexion via Plus
    page.goto(APP + "/dashboard?tab=plus"); page.wait_for_load_state("networkidle")
    page.get_by_text("Se déconnecter").click()
    page.wait_for_url("**/login**")
    # Après déconnexion, le tableau de bord est inaccessible
    page.goto(APP + "/dashboard"); page.wait_for_load_state("networkidle")
    assert "/login" in page.url


def test_checklists_persistent_apres_actualisation_et_reconnexion(ctx, pw):
    seed_user(EMAIL, MDP, prenom="Thomas", dpa=dpa_dans(140))
    page = ctx.new_page()
    login(page); page.wait_for_url("**/dashboard**"); page.wait_for_load_state("networkidle")
    # mission de la semaine (accueil)
    mission = page.locator("button[aria-pressed]").first
    mission.click(); page.wait_for_timeout(600)
    # valise
    page.goto(APP + "/dashboard?tab=valise"); page.wait_for_load_state("networkidle")
    page.get_by_text("Chargeur de téléphone + batterie externe").click(); page.wait_for_timeout(600)
    # administratif
    page.goto(APP + "/dashboard?tab=admin"); page.wait_for_load_state("networkidle")
    page.get_by_role("button", name=re.compile("Déclaration de grossesse : marquer comme lu")).click(); page.wait_for_timeout(600)
    # date de RDV
    page.goto(APP + "/dashboard?tab=rdv"); page.wait_for_load_state("networkidle")
    page.get_by_label("Date du rendez-vous").first.fill(dpa_dans(130)); page.wait_for_timeout(800)
    u = user_by_email(EMAIL)
    print("EN_BASE", {k: u.get(k) for k in ["missions_checked", "valise_checked", "rdv_dates", "next_rdv"]})
    assert any(u.get("missions_checked", {}).values()), "mission enregistrée"
    assert any(u.get("valise_checked", {}).values()), "valise enregistrée"
    assert u.get("rdv_dates"), "date de RDV enregistrée"
    # Admin « lu » : où est-ce stocké ?
    admin_lu = page.evaluate("Object.keys(localStorage).filter(k=>k.includes('admin')).map(k=>[k,localStorage.getItem(k)])")
    print("ADMIN_STOCKAGE_LOCAL", admin_lu)
    # Reconnexion dans un navigateur neuf (autre appareil)
    c2 = pw.new_context(viewport={"width": 1280, "height": 900})
    p2 = c2.new_page(); login(p2); p2.wait_for_url("**/dashboard**"); p2.wait_for_load_state("networkidle")
    assert p2.locator("button[aria-pressed=true]").count() >= 1, "mission toujours cochée sur un autre appareil"
    p2.goto(APP + "/dashboard?tab=admin"); p2.wait_for_load_state("networkidle")
    admin_ok = p2.get_by_role("button", name=re.compile("Déclaration de grossesse : marquer comme non lu")).count()
    print("ADMIN_LU_AUTRE_APPAREIL", admin_ok)
    c2.close()


def test_mot_de_passe_oublie(ctx):
    seed_user(EMAIL, MDP, prenom="Thomas", dpa=dpa_dans(140))
    page = ctx.new_page()
    page.goto(APP + "/login")
    page.get_by_role("button", name="Mot de passe oublié ?").click()
    page.get_by_label("Ton email").fill(EMAIL)
    page.get_by_role("button", name="Envoyer le lien").click()
    page.wait_for_timeout(1000)
    link = last_link(EMAIL)
    assert link and "token=" in link
    page.goto(link)
    page.get_by_label("Nouveau mot de passe").fill("NouveauMdp456")
    page.get_by_label("Confirme le mot de passe").fill("NouveauMdp456")
    page.locator("button[type=submit], button:has-text('mot de passe')").first.click()
    page.wait_for_url("**/dashboard**", timeout=8000)
    r = requests.post(APP + "/api/auth/login", json={"email": EMAIL, "password": "NouveauMdp456"})
    assert r.status_code == 200
    r = requests.post(APP + "/api/auth/login", json={"email": EMAIL, "password": MDP})
    assert r.status_code == 401
    # Le lien ne peut pas servir deux fois
    r = requests.post(APP + "/api/auth/reset-password", json={"token": link.split("token=")[1], "password": "Encore12345"})
    assert r.status_code == 400


def test_email_inconnu_mot_de_passe_oublie_ne_revele_rien():
    r = requests.post(APP + "/api/auth/forgot-password", json={"email": "inconnu@test.fr"})
    assert r.status_code == 200 and r.json() == {"ok": True}


def test_compte_modifier_prenom_dpa_et_mot_de_passe(ctx):
    seed_user(EMAIL, MDP, prenom="Thomas", dpa=dpa_dans(140))
    page = ctx.new_page()
    login(page); page.wait_for_url("**/dashboard**")
    page.goto(APP + "/compte"); page.wait_for_load_state("networkidle")
    page.get_by_label("Prénom", exact=True).fill("Tom")
    page.get_by_label("Date prévue d'accouchement").fill(dpa_dans(100))
    page.get_by_role("button", name="Enregistrer").click(); page.wait_for_timeout(1000)
    u = user_by_email(EMAIL)
    print("COMPTE_APRES", u["prenom"], u["dpa"], u.get("dpa_originale"), u.get("dpa_modif_count"))
    assert u["prenom"] == "Tom" and u["dpa"] == dpa_dans(100)
    page.get_by_label("Mot de passe actuel").fill(MDP)
    page.get_by_label("Nouveau mot de passe", exact=True).fill("Change12345")
    page.get_by_label("Confirme le nouveau mot de passe").fill("Change12345")
    page.get_by_role("button", name="Changer le mot de passe").click(); page.wait_for_timeout(1500)
    assert requests.post(APP + "/api/auth/login", json={"email": EMAIL, "password": "Change12345"}).status_code == 200
    # dashboard reflète la nouvelle DPA
    page.goto(APP + "/dashboard"); page.wait_for_load_state("networkidle"); page.wait_for_timeout(500)
    assert "Tom" in page.inner_text("body")


def test_navigation_semaines_et_rubriques(ctx):
    seed_user(EMAIL, MDP, prenom="Thomas", dpa=dpa_dans(140))
    page = ctx.new_page()
    login(page); page.wait_for_url("**/dashboard**"); page.wait_for_load_state("networkidle")
    vus = {}
    for nom in ["Bébé", "Préparer", "Toi", "Plus", "Accueil"]:
        page.locator(".dd-bottomnav").get_by_text(nom, exact=True).click()
        page.wait_for_timeout(400)
        vus[nom] = page.url.split("?")[-1]
    print("ONGLETS", vus)
    page.goto(APP + "/dashboard?tab=bebe"); page.wait_for_load_state("networkidle")
    h = page.locator("h2").first.inner_text()
    page.get_by_role("button", name=re.compile("Suivante")).click(); page.wait_for_timeout(300)
    h2 = page.locator("h2").first.inner_text()
    page.get_by_role("button", name=re.compile("Précédente")).click(); page.get_by_role("button", name=re.compile("Précédente")).click(); page.wait_for_timeout(300)
    h3 = page.locator("h2").first.inner_text()
    print("SEMAINES", h, h2, h3)
    assert h != h2
    # bouton retour du navigateur
    page.goto(APP + "/dashboard?tab=home"); page.locator(".dd-bottomnav").get_by_text("Toi", exact=True).click()
    page.wait_for_timeout(300); page.go_back(); page.wait_for_timeout(500)
    print("RETOUR_NAVIGATEUR", page.url, "Ton rôle" in page.inner_text("body"))
    assert not ctx.js_errors, ctx.js_errors
