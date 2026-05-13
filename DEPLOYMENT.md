# Deployment

The repo hosts **two** independent sites that share git history but deploy to different URLs:

1. **Academy** — static HTML at the repo root (`index.html`, `courses/`, `he/`, `assets/`).
2. **Slides** — the open-slide app, built from `slides/` via `pnpm build` into `dist/`.

Each gets its own Vercel (or Netlify) project pointing at this same repo. They're configured differently because one is plain HTML and the other is a Vite SPA.

## Config files at the repo root

| File | Scope |
|------|-------|
| `vercel.json` | Rewrites `/s/*` → `/index.html`. Needed by the slides project for client-side routing. Harmless for the academy project (no `/s/*` URLs exist there). |
| `netlify.toml` | Same rewrite, Netlify syntax. |

Both files share the same narrow rule, so they work for both projects without conflict.

## Vercel — recommended setup

Create **two Vercel projects** from this repo.

### Project A — Academy (root domain)

| Setting | Value |
|---------|-------|
| Framework Preset | Other |
| Root Directory | `.` (repo root) |
| Build Command | *(empty — no build)* |
| Output Directory | `.` |
| Install Command | *(empty)* |
| Domain | `your-domain.com` (root / apex) |

Vercel deploys the repo root as static files. URLs like `/`, `/courses/01-linux-fundamentals/en/index.html`, `/he/index.html` work directly because the files exist.

### Project B — Slides (subdomain)

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Root Directory | `.` (repo root) |
| Build Command | `pnpm build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |
| Domain | `slides.your-domain.com` |

Vercel runs `pnpm build`, deploys `dist/`. The SPA rewrite in `vercel.json` (`/s/*` → `/index.html`) handles deep links like `slides.your-domain.com/s/linux-fundamentals`.

### Cross-linking between the two

The academy pages and slides pages don't share a host, so they cross-link with absolute URLs.

In each course's `<course>/en/index.html` and `he/index.html`, the slides row currently reads:

```html
<a class="row" href="../slides/">
  <span class="key">Slides</span>
  ...
</a>
```

For production, update it to:

```html
<a class="row" href="https://slides.your-domain.com/s/<slide-id>">
  ...
</a>
```

Or keep both: a `slides/` symlink for local dev and a separate "view online" link that points at the deployed slides domain.

## Netlify — equivalent setup

Two Netlify sites:

- **Academy**: connect repo, leave build command empty, publish directory `.`, custom domain root.
- **Slides**: connect repo, build command `pnpm build`, publish directory `dist`, custom domain `slides.*`.

`netlify.toml` covers the SPA rewrite for the slides site.

## Local development

You can still develop locally without deploying:

```sh
# terminal 1 — slides hot-reload
pnpm dev
# → http://localhost:5173, slides at /s/<id>

# terminal 2 — academy static server
python3 -m http.server 8000
# → http://localhost:8000, academy at /, courses at /courses/...
```

Or open the academy as `file://` directly and link to slides via `http://localhost:5173/s/<id>` during dev.

## DNS

Once both Vercel/Netlify projects are deployed, point your DNS:

- `A` or `ALIAS` record for the root domain → academy project.
- `CNAME` record for `slides` → slides project.

The hosting platforms walk you through this in their dashboards.

## Production checklist before first deploy

- [ ] Choose your domain (e.g. `devops-academy.example.com`).
- [ ] Update slides cross-link URLs in academy HTML to use the production slides subdomain.
- [ ] Test `pnpm build` locally (it already passes — `dist/` is produced cleanly).
- [ ] Confirm `.gitignore` excludes `node_modules/`, `dist/`, `.vercel/` (build artifacts).
- [ ] Create both projects in Vercel/Netlify with the settings above.
- [ ] Configure DNS to route the root + `slides.*` subdomain.
- [ ] Push to main — both projects auto-deploy.
