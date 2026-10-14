"""Fausse API Supabase (sous-ensemble PostgREST) en mémoire, pour les tests DadUp.
Tables : users, auth_codes. Admin : GET /__db (dump), POST /__reset, POST /__down (simule panne), POST /__up.
"""
import json, uuid, sys, threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qsl

DB = {"users": [], "auth_codes": []}
STATE = {"down": False}
LOCK = threading.Lock()
LOG = []

def now():
    return datetime.now(timezone.utc).isoformat()

def parse_filters(qs):
    filters, select, limit = [], None, None
    for k, v in qs:
        if k == "select": select = v
        elif k == "limit": limit = int(v)
        elif k in ("order", "offset", "columns", "on_conflict"): pass
        else:
            op, _, val = v.partition(".")
            filters.append((k, op, val))
    return filters, select, limit

def match(row, filters):
    for col, op, val in filters:
        cur = row.get(col)
        s = "" if cur is None else str(cur)
        if op == "eq":
            if val == "null":
                if cur is not None: return False
            elif s != val: return False
        elif op == "gt":
            if not (cur is not None and s > val): return False
        elif op == "lt":
            if not (cur is not None and s < val): return False
        elif op == "is":
            if val == "null" and cur is not None: return False
        else:
            raise ValueError("op non gérée " + op)
    return True

def project(row, select):
    if not select or select == "*": return dict(row)
    cols = [c.strip() for c in select.split(",")]
    return {c: row.get(c) for c in cols}

class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def _send(self, code, body=None, headers=None):
        data = b"" if body is None else json.dumps(body).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        for k, v in (headers or {}).items(): self.send_header(k, v)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        if data: self.wfile.write(data)

    def _body(self):
        n = int(self.headers.get("Content-Length") or 0)
        return json.loads(self.rfile.read(n) or b"null")

    def _route(self, method):
        u = urlparse(self.path)
        if u.path == "/__db":
            return self._send(200, DB)
        if u.path == "/__log":
            return self._send(200, LOG)
        if u.path == "/__reset":
            with LOCK:
                DB["users"].clear(); DB["auth_codes"].clear(); LOG.clear()
            return self._send(200, {"ok": True})
        if u.path == "/__down": STATE["down"] = True; return self._send(200, {})
        if u.path == "/__up": STATE["down"] = False; return self._send(200, {})
        if u.path == "/__seed":
            row = self._body()
            with LOCK: DB["users"].append(row)
            return self._send(200, row)
        if STATE["down"]:
            return self._send(503, {"message": "service down"})
        if not u.path.startswith("/rest/v1/"):
            return self._send(404, {"message": "not found"})
        table = u.path[len("/rest/v1/"):]
        if table not in DB:
            return self._send(404, {"code": "42P01", "message": f"relation {table} does not exist"})
        qs = parse_qsl(u.query, keep_blank_values=True)
        filters, select, limit = parse_filters(qs)
        single = "vnd.pgrst.object" in (self.headers.get("Accept") or "")
        prefer = self.headers.get("Prefer") or ""
        LOG.append({"m": method, "t": table, "q": u.query})
        with LOCK:
            rows = DB[table]
            if method == "GET":
                res = [project(r, select) for r in rows if match(r, filters)]
                if limit: res = res[:limit]
            elif method == "POST":
                body = self._body()
                items = body if isinstance(body, list) else [body]
                res = []
                for it in items:
                    r = {"id": str(uuid.uuid4()), "created_at": now()}
                    r.update(it)
                    if table == "users" and any(x.get("email") == r.get("email") for x in rows):
                        return self._send(409, {"code": "23505", "message": "duplicate key value violates unique constraint users_email_key"})
                    rows.append(r); res.append(project(r, select))
            elif method == "PATCH":
                body = self._body()
                res = []
                for r in rows:
                    if match(r, filters):
                        r.update(body); res.append(project(r, select))
            elif method == "DELETE":
                res = [project(r, select) for r in rows if match(r, filters)]
                DB[table][:] = [r for r in rows if not match(r, filters)]
            else:
                return self._send(405, {})
        if method in ("PATCH", "DELETE", "POST") and "return=representation" not in prefer:
            return self._send(201 if method == "POST" else 204)
        if single:
            if len(res) != 1:
                return self._send(406, {"code": "PGRST116", "details": f"The result contains {len(res)} rows", "message": "JSON object requested, multiple (or no) rows returned"})
            return self._send(200, res[0])
        return self._send(200, res)

    def do_GET(self): self._route("GET")
    def do_POST(self): self._route("POST")
    def do_PATCH(self): self._route("PATCH")
    def do_DELETE(self): self._route("DELETE")
    def do_HEAD(self): self._send(200)

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 54321
    ThreadingHTTPServer(("127.0.0.1", port), H).serve_forever()
