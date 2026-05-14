#!/usr/bin/env python3
"""Dev-mode static server with in-place edit/save support.

Replaces `python3 -m http.server 8000` for local development of the academy site:

- Serves files from the repo root (current working directory of this file).
- Injects `<script src="/assets/editor.js" defer data-dev-injected="1">` into
  every HTML response, just before `</body>`. The HTML on disk is untouched.
- Rewrites `href="/s/..."` → `href="http://localhost:5173/s/..."` so the
  academy's deployed-relative slide links open the local Vite slides server.
- Accepts `PUT /<path>.html` and writes the body to that file. Safety-checked:
  only inside the repo, only existing `.html` files.
- Disables caching so saves show up on reload immediately.

Pair with assets/editor.js. Start via start.sh, which already proxies port 8000.
"""

import http.server
import os
import pathlib
import socketserver
import sys

ROOT = pathlib.Path(__file__).parent.resolve()

# Injected into HTML responses just before </body>. The data-dev-injected attr
# lets the editor strip itself (and any sibling injected nodes) on save.
INJECT = (
    b'<script src="/assets/editor.js" defer data-dev-injected="1"></script>\n'
    b'</body>'
)

# The slides Vite dev server runs on a separate port; HTML on disk uses
# domain-relative `/s/<id>` (correct for the single-domain Vercel deploy),
# so locally we rewrite to the Vite origin.
SLIDES_DEV_ORIGIN = b"http://localhost:5173"


class DevHandler(http.server.SimpleHTTPRequestHandler):
    # SimpleHTTPRequestHandler logs every request to stderr; keep but quieter.
    def log_message(self, format, *args):  # noqa: A002
        sys.stderr.write("[dev-server] %s\n" % (format % args))

    def end_headers(self):
        # No caching during dev so edits show up on the next reload.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):  # noqa: N802
        # Strip query string for filesystem lookup.
        url_path = self.path.split("?", 1)[0]
        fs_path = self.translate_path(url_path)

        # If we resolved to a directory, fall back to index.html inside it.
        if os.path.isdir(fs_path):
            candidate = os.path.join(fs_path, "index.html")
            if os.path.isfile(candidate):
                fs_path = candidate

        if fs_path.endswith(".html") and os.path.isfile(fs_path):
            try:
                with open(fs_path, "rb") as f:
                    body = f.read()
            except OSError:
                return super().do_GET()
            # Rewrite slide hrefs to the local Vite origin.
            body = body.replace(b'href="/s/', b'href="' + SLIDES_DEV_ORIGIN + b'/s/')
            # Inject the editor script before </body>. If there's no </body>
            # (rare — chooser pages have one), skip injection rather than fail.
            if b"</body>" in body:
                body = body.replace(b"</body>", INJECT, 1)
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        # Everything else (CSS, JS, images, etc.) — default behaviour.
        super().do_GET()

    def do_PUT(self):  # noqa: N802
        url_path = self.path.split("?", 1)[0]
        try:
            target = pathlib.Path(self.translate_path(url_path)).resolve()
        except (OSError, RuntimeError):
            self.send_error(400, "Bad path")
            return

        # Safety: must resolve to a path inside the repo.
        try:
            target.relative_to(ROOT)
        except ValueError:
            self.send_error(403, "Forbidden: outside repo root")
            return

        # Safety: must end in .html.
        if target.suffix.lower() != ".html":
            self.send_error(403, "Forbidden: only .html files are writable")
            return

        # Safety: must already exist. The editor saves over existing files;
        # creating new ones via PUT would let any local browser tab write
        # arbitrary HTML anywhere in the tree.
        if not target.is_file():
            self.send_error(404, "File does not exist")
            return

        length = int(self.headers.get("Content-Length", 0) or 0)
        if length <= 0:
            self.send_error(400, "Empty body")
            return
        # Cap the payload at 5 MB to avoid runaway uploads.
        if length > 5 * 1024 * 1024:
            self.send_error(413, "Payload too large")
            return

        body = self.rfile.read(length)
        try:
            target.write_bytes(body)
        except OSError as exc:
            self.send_error(500, f"Write failed: {exc}")
            return

        rel = target.relative_to(ROOT)
        sys.stderr.write(f"[dev-server] saved {rel} ({len(body)} bytes)\n")
        self.send_response(204)
        self.end_headers()


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


def main() -> int:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    os.chdir(ROOT)
    with ReusableTCPServer(("", port), DevHandler) as httpd:
        sys.stderr.write(
            f"[dev-server] serving {ROOT} on http://localhost:{port}/\n"
            f"[dev-server] PUT /<path>.html to save edits; only .html inside the repo are writable.\n"
        )
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            sys.stderr.write("\n[dev-server] stopping\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
