---
name: course-authoring
description: Use this skill when the user wants to scaffold a new course, write or update a course syllabus, add a homework lab, write course documentation/cheat-sheets, or define a final project inside the `courses/` tree of this DevOps academy repo. Triggers include "create a course on X", "scaffold course NN", "add a homework lab for <course>", "write the syllabus for <course>", "build the final project for <course>", "make a cheat sheet for <course>". Do NOT use this skill for editing slides — delegate to `create-slide` instead.
---

# Course authoring

You are authoring **courses** inside the DevOps academy. Each course is one folder under `courses/<NN-id>/` with a fixed file contract. The slide deck for the course lives separately at `slides/<id>/` (managed by open-slide).

The top-level program index is `PROGRAM.md` at the repo root. Read it before starting any work — it tells you which courses exist, which slot a new course should take, and what state each artifact is in.

## Hard rules

- Course folders live at `courses/<NN-id>/` where `NN` is a two-digit ordering (`00`, `01`, …) and `id` is kebab-case.
- The file contract is **exactly**: `README.md`, `index.html` (language chooser), `slides` (symlink), `en/`, `he/`. Inside both `en/` and `he/` there's the same structure: `index.html`, `syllabus.html`, `homework/`, `docs/`, `final/`. Don't add other top-level files unless the user asks.
- **The site is bilingual.** Every student-facing artifact has an English version under `en/` and a Hebrew version under `he/`. Hebrew pages set `<html lang="he" dir="rtl">`. Technical names (commands, code, tool names) stay English in both languages; prose is translated.
- **All student-facing artifacts are HTML** with **no inline CSS** — they all link to the shared stylesheet at `/assets/styles.css` (relative path varies by depth).
- **README.md and `PROGRAM.md` stay markdown** — they're repo navigation, meant to render in GitHub and IDE file trees, not to be read in a browser.
- The site has a single shared stylesheet at `assets/styles.css`. Every HTML file uses it via `<link rel="stylesheet" href="…/assets/styles.css">`. Never re-inline CSS.
- Every HTML file starts with a `<nav class="site-nav">` breadcrumb. On localized pages, the breadcrumb includes a `<span class="lang-switch">` with EN | עברית toggles pointing at the matching path under the other language.
- **Slides physically live at `slides/<id>/`** (open-slide's requirement), but **each course folder gets a `slides` symlink pointing back to its deck** — `courses/<NN-id>/slides` → `../../slides/<id>/`. From inside a course folder, `cd slides/` lands you in that course's deck.
- The course id (without the `NN-` prefix) must match the slide id.
- Do not touch `package.json`, `open-slide.config.ts`, or any file under `slides/` directly. For slide work, **delegate to the `create-slide` skill**.
- Every time you create, rename, or change the state of a course artifact, **update the table in `PROGRAM.md`** to reflect it.

## File contract (per course)

| Path | Required | Purpose |
|------|----------|---------|
| `README.md` | yes | Markdown index. Read in git/IDE. Links to the chooser. |
| `index.html` | yes | **Language chooser.** Two buttons: English / עברית. Routes to `en/index.html` or `he/index.html`. |
| `slides` | yes (symlink) | → `../../slides/<id>/`. Same for both languages. |
| `en/index.html` | yes | English course landing page. |
| `en/syllabus.html` | yes | English syllabus. |
| `en/homework/lab-NN-<topic>.html` | each lab | English lab. |
| `en/docs/cheat-sheet.html` | optional | English cheat sheet (canonical doc). |
| `en/final/project.html` | optional | English final project brief. |
| `he/...` | mirror | Hebrew mirror of the English tree, file-for-file. |

## Site-wide assets

| Path | Purpose |
|------|---------|
| `/index.html` | Program homepage — lists all courses. |
| `/assets/styles.css` | Shared stylesheet for every HTML file in the site. The single source of truth for visual style. |
| `/PROGRAM.md` | Markdown program index (git/IDE-facing mirror of the program homepage). |

**Relative paths to `styles.css` by file depth:**

| File location | `<link>` href |
|---------------|---------------|
| `/index.html` | `assets/styles.css` |
| `courses/<NN-id>/index.html` (chooser) | `../../assets/styles.css` |
| `courses/<NN-id>/{en,he}/index.html` | `../../../assets/styles.css` |
| `courses/<NN-id>/{en,he}/syllabus.html` | `../../../assets/styles.css` |
| `courses/<NN-id>/{en,he}/homework/*.html` | `../../../../assets/styles.css` |
| `courses/<NN-id>/{en,he}/docs/*.html` | `../../../../assets/styles.css` |
| `courses/<NN-id>/{en,he}/final/*.html` | `../../../../assets/styles.css` |

## The HTML templates

Templates live under `.claude/skills/course-authoring/templates/`:

| Template | When to use |
|----------|-------------|
| `chooser.html` | The language chooser at `courses/<NN-id>/index.html`. |
| `index.html` | English course landing at `courses/<NN-id>/en/index.html`. Adapt for Hebrew by translating + setting `<html lang="he" dir="rtl">`. |
| `doc.html` | Syllabus, homework labs, docs, final projects — any standalone artifact. |

Authoring is: **copy → fix the stylesheet link → customize header → replace body → adjust the breadcrumbs → tell the user how to view it.**

Both templates link to `/assets/styles.css` (the shared stylesheet) — neither contains inline styles. When you copy the template, update the `<link>` href to use the correct relative depth for the destination (see the relative-paths table above).

### Customize the header

| Slot | What to put |
|------|-------------|
| `<title>` and `<h1>` | Both = the artifact's title. |
| `.eyebrow` | `Course NN · <Course title>` (always — regardless of artifact type). |
| `.lede` (first paragraph after h1) | One-sentence summary of what this artifact is and when to reach for it. |
| `<nav class="site-nav">` | Three breadcrumb entries: Academy / Course NN / current page. Last item gets `class="here"` and is plain text (not a link). |

### Replace the body

Delete the example `<h2>` sections in the template and replace them with the section structure for the artifact type (see workflows below). Reuse these semantic patterns rather than invent new markup:

- `<table>` with `<thead>`/`<tbody>` for command references, lookups, mappings.
- `<pre><code>` for code blocks (terminal sessions, file contents, examples).
- Inline `<code>` for short command names mid-sentence.
- `<div class="callout">` with `<strong>` for tips and notes; add `class="callout warn"` for warnings.
- `<span class="kbd">` for keyboard keys; use the `<span class="kbd-plus">+</span>` separator between chord parts.
- `<blockquote>` for quoted material from external sources.
- `<div class="twocol">` for two-column lists or tables.

**No inline CSS.** All styling lives in `assets/styles.css`. If you need a new utility class (e.g. a unique grid layout for a specific page), add it to `assets/styles.css` so every page benefits — don't sneak inline styles into a single file.

### Tell the user how to view it

After writing, mention:

```
open courses/<NN-id>/<file>.html      # macOS
xdg-open courses/<NN-id>/<file>.html  # Linux
```

Or right-click the file in their editor → "Open with Browser".

## Workflows

### A) Scaffolding a new course

Trigger phrases: "create a course on X", "scaffold course NN", "add a new course".

1. Read `PROGRAM.md` to find the course's intended slot (number + name). If unsure, ask the user.
2. Pick a course id: `NN-<kebab>` for the folder, `<kebab>` for the slide id.
3. Create the directory tree:
   ```
   courses/<NN-id>/
   ├── README.md
   ├── index.html         (language chooser — from templates/chooser.html)
   ├── slides             (symlink → ../../slides/<id>/)
   ├── en/
   │   ├── index.html     (English course landing — from templates/index.html)
   │   ├── syllabus.html
   │   ├── homework/
   │   ├── docs/
   │   └── final/         (only if the course has a final)
   └── he/                (Hebrew mirror, same structure)
       ├── index.html
       ├── syllabus.html
       ├── homework/
       ├── docs/
       └── final/
   ```

   Create the symlink with:
   ```sh
   cd courses/<NN-id> && ln -sfn ../../slides/<id> slides
   ```

   If `slides/<id>/` doesn't exist yet, **delegate to `create-slide`** (or hand-roll a stub) before making the symlink, otherwise it'll point to nothing.
4. Fill in `README.md` using the **README template** below — the markdown index for git/IDE users. Link the chooser (`index.html`), not the per-language landings.
5. Fill in `index.html` from `templates/chooser.html` — just two big buttons (EN / עברית).
6. Fill in `en/index.html` from `templates/index.html`. Then write its Hebrew mirror at `he/index.html` (translate + set `<html lang="he" dir="rtl">`).
7. Fill in `en/syllabus.html` using the **Writing the syllabus** workflow. Then write `he/syllabus.html` as a translation.
8. Update the `PROGRAM.md` table: mark the course as 📋 (syllabus only) or 🟡 (in progress).
9. Update the root `index.html` card-grid: change the course's card from `<span class="card dim">` to `<a class="card">` (target `courses/<NN-id>/index.html` — the chooser).
10. If the user wants a slide deck too, **delegate to `create-slide`** with the chosen slide id.

**Bilingual authoring rule.** Whenever you write or update an English artifact, write the Hebrew mirror in the same turn. Don't leave half-translated state checked in. The two trees are kept lockstep.

### B) Writing or updating the syllabus

Trigger phrases: "write the syllabus for X", "update the X syllabus".

Before writing, ask the user (one `AskUserQuestion` call):

1. **Total duration** — hours / sessions / weeks?
2. **Audience level** — beginner, intermediate, advanced?
3. **3–5 specific learning outcomes** — what should the student be able to do at the end?
4. **Final project?** — yes / no, and if yes a one-sentence brief.

Skip a question only if the user's request already answers it unambiguously.

**File:** `courses/<NN-id>/syllabus.html` — copy from `templates/doc.html`.

**Header slots:**
- `<title>` / `<h1>` — `Course NN — <Title> — Syllabus`
- `.eyebrow` — `Course NN · <Course title>`
- `.lede` — one sentence on what the course teaches.

**Recommended `<h2>` section structure** (in order):

1. **Overview** — 2–3 sentences. What this course teaches, why it matters, how it fits the program.
2. **At a glance** — small `<table>` with rows for Duration, Level, Prerequisites.
3. **Learning outcomes** — `<ul>` of 3–5 verifiable outcomes ("By the end, you can …").
4. **Schedule** — `<table>` with columns Session / Topic / Reference. Reference column links to slide ranges and homework labs.
5. **Deliverables** — short list of homework labs + final project (with links).
6. **Resources** — slides, cheat sheet (link to `docs/cheat-sheet.html` once it exists), external links.
7. **Assessment** — how completion is judged.

Keep it tight — a syllabus is a contract, not an essay.

### C) Adding a homework lab

Trigger phrases: "add a homework lab for X on Y", "write a lab on Y for X".

Ask three questions:

1. **What skill or concept does this lab exercise?**
2. **Estimated time** to complete (15 min / 1 hr / multi-hour)?
3. **Deliverable type** — output file, command transcript, written reflection, screenshot, repo push?

**File:** `courses/<NN-id>/homework/lab-MM-<short-topic>.html`, where `MM` is the next sequential lab number in that folder (look at what's there; default to `01`).

Copy from `templates/doc.html`.

**Header slots:**
- `<title>` / `<h1>` — `Lab MM — <Short title>`
- `.eyebrow` — `Course NN · <Course title> · Homework`
- `.lede` — one-sentence summary of what the student practices.

**Just below the header, add a small metadata `<table>`** (one row, three columns or stacked):

| Course | Time | Deliverable |
|--------|------|-------------|
| 01-linux-fundamentals | ~45 min | command transcript + tree.txt |

**Recommended `<h2>` section structure** (in order):

1. **Goal** — 1–2 sentences: what the student can do after this lab.
2. **Setup** — what env, tools, or files are needed before starting.
3. **Tasks** — `<h3>` per task, numbered ("1. Orient yourself", "2. Build a workspace", …). Inside each task: prose + `<pre><code>` for commands. Tasks should be concrete and verifiable.
4. **Hints** — `<ul>` of nudges that don't give the answer away.
5. **Deliverable** — exactly what the student submits / shows: file path, transcript, screenshot, link.
6. **Stretch (optional)** — bonus tasks for fast finishers.

Use `<div class="callout warn">` for danger notes (e.g. "never run `rm -rf /`"). Use `<div class="callout">` for tips.

### D) Writing course documentation

Trigger phrases: "make a cheat sheet for X", "add a deep-dive doc on Y", "write a glossary for X".

Open-ended — ask what doc and what scope before writing.

- Cheat sheets go at `docs/cheat-sheet.html` (one per course).
- Glossaries go at `docs/glossary.html`.
- Deep-dive notes go at `docs/<topic>.html`.

Copy from `templates/doc.html`. The cheat-sheet template is dense: lots of small `<table>`s organized by topic, with slide-number cross-references in `<span style="color: var(--muted); ...">` after each `<h2>`. See `courses/01-linux-fundamentals/docs/cheat-sheet.html` for the canonical example.

### E) Writing the final project

Trigger phrases: "write the final project for X", "build the final for X".

Ask:

1. **What capability should the student demonstrate?**
2. **How is success measured?** Specific criteria.
3. **Estimated time to complete?**

**File:** `courses/<NN-id>/final/project.html`. Copy from `templates/doc.html`.

**Header slots:**
- `<title>` / `<h1>` — `Final project — <Course title>`
- `.eyebrow` — `Course NN · <Course title> · Final`
- `.lede` — one-sentence summary of what the student ships.

**Recommended `<h2>` section structure:**

1. **At a glance** — small `<table>` for Time / Deliverable / Format.
2. **Capability demonstrated** — what the student proves they can do.
3. **Brief** — 2–3 paragraphs describing the scenario, constraints, expected output.
4. **Requirements** — `<ul>` of verifiable "must"s.
5. **Success criteria** — how the reviewer judges completion. Be specific.
6. **Resources** — reference material, useful starting points.

## Templates

### README template (markdown — for git/IDE)

```markdown
# Course NN — <Title>

> <One-paragraph elevator pitch: what this course teaches and who it's for.>
> Browser view: [index.html](index.html) — picks language, then routes to English or Hebrew.

## Artifacts (English)

- **Course landing** — [en/index.html](en/index.html)
- **Syllabus** — [en/syllabus.html](en/syllabus.html)
- **Homework** — [en/homework/lab-01-<topic>.html](en/homework/lab-01-<topic>.html) — <one-line summary>
- **Cheat sheet** — [en/docs/cheat-sheet.html](en/docs/cheat-sheet.html)
- **Final project** — [en/final/project.html](en/final/project.html)  *(omit if no final)*

## Artifacts (עברית)

- **Course landing** — [he/index.html](he/index.html)
- *(same structure, Hebrew mirror)*

## Slides

- [`slides/`](slides/) *(symlink → `../../slides/<slide-id>/`)* · run `pnpm dev` and open `/s/<slide-id>`

## Prerequisites

- <Course MM — Title> *(if any)*
- <Tools / accounts needed>
```

### HTML templates

Live at `templates/doc.html` (artifact pages) and `templates/index.html` (course landing). See **The HTML templates** section above for how to use them.

## Cross-references

- **Slide authoring** — delegate to the `create-slide` skill at `.claude/skills/create-slide/`. Slide ids match the course id without the `NN-` prefix.
- **Program index** — `PROGRAM.md` at repo root. Update on every course state change.
- **Per-slide editing** — delegate to the `slide-authoring` skill.

## Self-review

Before finishing any course-authoring task, verify:

- [ ] The course folder follows the file contract: `README.md`, `index.html` (chooser), `slides` (symlink), `en/`, `he/`.
- [ ] Both `en/` and `he/` exist with the same set of files. Every English artifact has a Hebrew mirror at the matching path.
- [ ] Hebrew pages set `<html lang="he" dir="rtl">`; the `<title>` and `.eyebrow` are in Hebrew; English technical terms (commands, code) are preserved.
- [ ] Every HTML file has **no inline `<style>`** — only a `<link>` to `…/assets/styles.css` with the correct relative depth.
- [ ] Every localized HTML file has a `<span class="lang-switch">` in the site-nav, with one link active and the other pointing at the sibling-language path.
- [ ] Every HTML file ends with a `<footer class="doc-footer">` and a back-link to either `index.html` (course landing within a language) or up to `../../../index.html` (academy home).
- [ ] Each `en/index.html` and `he/index.html` lists **each lab and each doc by name** (no opaque `homework/` folder link).
- [ ] The root `/index.html` card-grid reflects the course's status (`dim` for stub, regular for live). Cards link to the chooser at `courses/<NN-id>/index.html`.
- [ ] The course id matches the slide id by convention (kebab, sans `NN-` prefix).
- [ ] `PROGRAM.md` reflects the current state of each artifact.
- [ ] No files were added outside `courses/<id>/`, `PROGRAM.md`, `index.html`, or `assets/`. (Slides delegated to `create-slide`.)
- [ ] No edits were made to `package.json`, `open-slide.config.ts`, or any other `.claude/skills/*` skill.
