"""Application installée (PWA) : barre du bas, zones de sécurité de l'iPhone, manifeste, mode hors ligne."""
import datetime
import os
import requests
from qa_lib import APP, seed_user, session_cookie

MDP = "MotDePasse123"
RACINE = os.path.join(os.path.dirname(__file__), "..", "..", "public")


def d(j):
    return (datetime.date.today() + datetime.timedelta(days=j)).isoformat()


def iphone(pw, bas=34):
    """Contexte iPhone 15 avec la barre d'accueil (zone de sécurité du bas)."""
    c = pw.new_context(viewport={"width": 393, "height": 852}, is_mobile=True, has_touch=True, locale="fr-FR")
    page = c.new_page()
    cdp = c.new_cdp_session(page)
    cdp.send("Emulation.setSafeAreaInsetsOverride", {"insets": {"top": 0, "bottom": bas, "left": 0, "right": 0}})
    return c, page


def connecte(c, email):
    c.add_cookies([{"name": "dadup_session", "value": session_cookie(email), "url": APP}])


def test_viewport_couvre_tout_l_ecran():
    html = requests.get(APP + "/login").text
    assert "viewport-fit=cover" in html, "Sans viewport-fit=cover, iPhone ignore la barre d'accueil"
    assert 'name="apple-mobile-web-app-capable"' in html or 'name="mobile-web-app-capable"' in html
    assert 'rel="manifest" href="/manifest.json"' in html


def test_manifeste_complet():
    m = requests.get(APP + "/manifest.json").json()
    assert m["display"] == "standalone"
    assert m["start_url"] == "/dashboard" and m["scope"] == "/"
    assert m["short_name"] == "DadUp"
    tailles = {i["sizes"] for i in m["icons"]}
    assert {"192x192", "512x512"} <= tailles
    assert any(i.get("purpose") == "maskable" for i in m["icons"])
    for i in m["icons"]:
        assert requests.get(APP + i["src"]).status_code == 200, i["src"]


def test_icone_ecran_accueil_sans_transparence():
    # Une icône transparente apparaît avec des coins noirs sur l'écran d'accueil de l'iPhone
    from PIL import Image
    im = Image.open(os.path.join(RACINE, "apple-touch-icon.png")).convert("RGBA")
    assert im.size == (180, 180)
    assert im.getpixel((0, 0))[3] == 255


def test_barre_du_bas_au_dessus_de_la_barre_d_accueil(pw):
    seed_user("p@test.fr", MDP, prenom="Julien", dpa=d(140))
    c, page = iphone(pw)
    connecte(c, "p@test.fr")
    page.goto(APP + "/dashboard")
    page.wait_for_load_state("networkidle")
    nav = page.locator(".dd-bottomnav")
    boite = nav.bounding_box()
    assert boite["y"] + boite["height"] == 852
    assert boite["height"] >= 64 + 34, "La barre doit inclure la zone de la barre d'accueil"
    for b in nav.locator("button").all():
        r = b.bounding_box()
        assert r["height"] >= 56 and r["width"] >= 44
        assert r["y"] + r["height"] <= 852 - 34, "Un onglet passe sous la barre d'accueil"
    # Le dernier contenu de la page reste visible au-dessus de la barre
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(300)
    bas_contenu = page.evaluate("""() => { const els=[...document.querySelectorAll('#contenu *')].filter(e=>e.getBoundingClientRect().height>0);
      return Math.max(...els.map(e=>e.getBoundingClientRect().bottom)); }""")
    assert bas_contenu <= boite["y"]
    c.close()


def test_six_onglets_apres_naissance_lisibles(pw):
    seed_user("p@test.fr", MDP, prenom="Julien", dpa=d(-10), dpa_originale=d(-10))
    c, page = iphone(pw)
    connecte(c, "p@test.fr")
    page.goto(APP + "/dashboard")
    page.wait_for_load_state("networkidle")
    onglets = page.locator(".dd-bottomnav button")
    assert onglets.count() == 6
    for b in onglets.all():
        lab = b.locator("span").last
        assert lab.evaluate("e => e.scrollWidth <= e.parentElement.clientWidth")
        assert lab.evaluate("e => parseFloat(getComputedStyle(e).fontSize)") >= 12
    c.close()


def test_bulle_et_bandeau_au_dessus_de_la_barre(pw):
    seed_user("p@test.fr", MDP, prenom="Julien", dpa=d(140))
    c, page = iphone(pw)
    connecte(c, "p@test.fr")
    page.goto(APP + "/dashboard")
    page.wait_for_load_state("networkidle")
    haut_nav = page.locator(".dd-bottomnav").bounding_box()["y"]
    bulle = page.locator(".dd-chat").bounding_box()
    assert bulle["y"] + bulle["height"] <= haut_nav
    c.close()


def test_champs_sans_zoom_sur_iphone(pw):
    seed_user("p@test.fr", MDP, prenom="Julien", dpa=d(140))
    c, page = iphone(pw)
    connecte(c, "p@test.fr")
    for url in ["/compte", "/contact-app", "/dashboard?tab=rdv"]:
        page.goto(APP + url)
        page.wait_for_load_state("networkidle")
        petits = page.evaluate("""() => [...document.querySelectorAll('input,select,textarea')]
          .filter(e => e.getBoundingClientRect().width && parseFloat(getComputedStyle(e).fontSize) < 16).length""")
        assert petits == 0, url
    c.close()


def test_clavier_ouvert_masque_la_barre(pw):
    seed_user("p@test.fr", MDP, prenom="Julien", dpa=d(140))
    c, page = iphone(pw)
    connecte(c, "p@test.fr")
    page.goto(APP + "/dashboard")
    page.wait_for_load_state("networkidle")
    page.locator(".dd-chat button").last.click()
    page.locator(".dd-chat textarea").focus()
    assert not page.locator(".dd-bottomnav").is_visible()
    c.close()


def test_pages_legales_ouvertes_par_dessus_l_app(pw):
    # Dans l'app installée sur iPhone il n'y a pas de bouton retour : les textes légaux
    # s'ouvrent par-dessus l'app pour pouvoir revenir.
    seed_user("p@test.fr", MDP, prenom="Julien", dpa=d(140))
    c, page = iphone(pw)
    connecte(c, "p@test.fr")
    page.goto(APP + "/dashboard?tab=plus")
    page.wait_for_load_state("networkidle")
    for nom in ["Mentions légales", "CGV", "Confidentialité"]:
        assert page.locator("a", has_text=nom).first.get_attribute("target") == "_blank"
    assert page.locator("a", has_text="Mon compte").first.get_attribute("target") is None
    c.close()


def test_page_hors_ligne_prete(pw):
    # (Playwright ne coupe pas le réseau du service worker : on vérifie que la page est en cache ;
    #  son affichage sans réseau a été vérifié en arrêtant le serveur.)
    c = pw.new_context(viewport={"width": 393, "height": 852}, locale="fr-FR")
    page = c.new_page()
    page.goto(APP + "/login")
    page.evaluate("navigator.serviceWorker.ready.then(() => true)")
    texte = page.evaluate("caches.match('/hors-ligne.html').then(r => r ? r.text() : '')")
    assert "Pas de connexion internet" in texte and "Réessayer" in texte
    c.close()


def test_service_worker_jamais_garde_en_cache():
    r = requests.get(APP + "/sw.js")
    assert r.status_code == 200
    assert "no-cache" in r.headers.get("cache-control", "")
    assert "api" in r.text and "navigate" in r.text
