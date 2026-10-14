"""Erreurs JS, rendu sur 3 tailles d'écran, poids des pages."""
import datetime, json
from qa_lib import APP, seed_user, session_cookie

MDP = "MotDePasse123"
PUBLIQUES = ["/", "/tarifs", "/inclus", "/pourquoi", "/contact", "/professionnels", "/sources",
             "/cgv", "/mentions-legales", "/confidentialite", "/login", "/reset-password", "/success", "/paiement-annule"]
ONGLETS = ["home", "bebe", "rdv", "valise", "maison", "admin", "jourj", "toi", "plus", "dico"]
ECRANS = [("mobile", 390, 844), ("tablette", 820, 1180), ("ordinateur", 1440, 900)]


def test_pages_publiques_et_app_sur_3_ecrans(pw):
    u = seed_user("a@test.fr", MDP, prenom="Thomas",
                  dpa=(datetime.date.today() + datetime.timedelta(days=140)).isoformat())
    rapport = {}
    for nom, w, h in ECRANS:
        c = pw.new_context(viewport={"width": w, "height": h})
        c.add_cookies([{"name": "dadup_session", "value": session_cookie("a@test.fr"), "url": APP}])
        page = c.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)[:120]))
        page.on("console", lambda m: errs.append("console: " + m.text[:120]) if m.type == "error" else None)
        cibles = PUBLIQUES + ["/compte", "/contact-app", "/cancel"] + [f"/dashboard?tab={t}" for t in ONGLETS]
        for url in cibles:
            n0 = len(errs)
            page.goto(APP + url)
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(250)
            sw = page.evaluate("document.documentElement.scrollWidth")
            pb = []
            if sw > w + 1:
                pb.append(f"debordement {sw}px")
            if len(errs) > n0:
                pb.append("; ".join(errs[n0:])[:200])
            if pb:
                rapport.setdefault(url, {})[nom] = pb
        c.close()
    assert rapport == {}, json.dumps(rapport, ensure_ascii=False)


def test_poids_et_temps_de_chargement(pw):
    c = pw.new_context(viewport={"width": 390, "height": 844})
    page = c.new_page()
    res = {}
    for url in ["/", "/tarifs", "/inclus", "/login"]:
        tailles = {"js": 0, "img": 0, "font": 0, "autre": 0}
        def on_resp(r):
            try:
                n = len(r.body())
            except Exception:
                return
            t = r.request.resource_type
            k = "js" if t == "script" else "img" if t == "image" else "font" if t == "font" else "autre"
            tailles[k] += n
        page.on("response", on_resp)
        page.goto(APP + url)
        page.wait_for_load_state("networkidle")
        nav = page.evaluate("JSON.stringify(performance.getEntriesByType('navigation')[0])")
        nav = json.loads(nav)
        page.remove_listener("response", on_resp)
        res[url] = {k: f"{v // 1024} Ko" for k, v in tailles.items()}
        res[url]["chargement_local_ms"] = round(nav["loadEventEnd"])
    c.close()
    for url, r in res.items():
        assert int(r["js"].split()[0]) < 700, (url, r)
