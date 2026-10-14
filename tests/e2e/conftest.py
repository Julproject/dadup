import os, sys
import pytest
from playwright.sync_api import sync_playwright

sys.path.insert(0, os.path.dirname(__file__))
import qa_lib  # noqa: E402


@pytest.fixture(autouse=True)
def clean():
    qa_lib.reset_all()
    yield


@pytest.fixture(scope="session")
def pw():
    with sync_playwright() as p:
        b = p.chromium.launch()
        yield b
        b.close()


@pytest.fixture
def ctx(pw):
    """Contexte navigateur iPhone, qui collecte les erreurs JS et réseau."""
    c = pw.new_context(viewport={"width": 390, "height": 844}, locale="fr-FR", timezone_id="Europe/Paris")
    c.js_errors, c.bad_responses = [], []
    def on_page(page):
        page.on("pageerror", lambda e: c.js_errors.append(str(e)))
        page.on("response", lambda r: c.bad_responses.append((r.status, r.url)) if r.status >= 500 else None)
    c.on("page", on_page)
    yield c
    c.close()
