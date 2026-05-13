# DevOps Academy

A series of courses that take a learner from "what is Linux" to running and operating real systems. Each course is a self-contained unit with its own slides, syllabus, homework labs, supplementary docs, and (where appropriate) a final project.

## How this repo is organised

```
.
├── PROGRAM.md                # this file (git/IDE index)
├── index.html                # browser-facing site homepage
├── assets/
│   └── styles.css            # shared stylesheet for every HTML file
├── slides/                   # open-slide app — one folder per deck
│   └── <course-id>/
├── courses/                  # bilingual course content
│   └── NN-<course-id>/
│       ├── README.md         # git/IDE index → links to chooser + per-lang artifacts
│       ├── index.html        # language chooser — routes to en/ or he/
│       ├── slides            # symlink → ../../slides/<course-id>/  (lang-agnostic)
│       ├── en/
│       │   ├── index.html    # English course landing
│       │   ├── syllabus.html
│       │   ├── homework/     # lab-NN-<topic>.html
│       │   ├── docs/         # cheat sheets, deep-dive notes
│       │   └── final/        # project.html (optional per course)
│       └── he/               # Hebrew mirror, same structure
│           ├── index.html
│           ├── syllabus.html
│           ├── homework/
│           ├── docs/
│           └── final/
└── .claude/skills/
    └── course-authoring/     # the skill that owns this tree
        └── templates/
            ├── chooser.html  # language chooser template
            ├── index.html    # per-language course landing template
            └── doc.html      # artifact template (syllabus, lab, doc, final)
```

**Slides physically live at `slides/<id>/`** because the open-slide framework requires every deck under that root path. **Each course folder symlinks its deck** as `courses/<NN-id>/slides → ../../slides/<id>/`. The symlink is **language-agnostic** — same deck for both EN and HE.

**Bilingual content.** Every student-facing artifact has an English version at `courses/<NN-id>/en/...` and a Hebrew mirror at `courses/<NN-id>/he/...`. The course's top-level `index.html` is a language chooser; per-language pages have an EN | עברית switch in the site-nav.

The course id and the slide id match by convention — the slide id is the course id without the `NN-` prefix (e.g. `courses/01-linux-fundamentals/` ↔ `slides/linux-fundamentals/`).

## The course-authoring skill

Anything that scaffolds a new course, writes a syllabus, adds a homework lab, builds documentation, or defines a final project goes through the `course-authoring` skill at `.claude/skills/course-authoring/`. Slide work delegates out to the existing `create-slide` skill.

## Course list

Status legend: 🟢 done · 🟡 in progress · ⚪ planned · 📋 syllabus only · 🪧 stub deck only

Slide column: `✓` = full deck · `🪧` = stub cover page (expand via `/create-slide`) · `⚪` = not yet created.

| # | Course | Course folder | Slide | Syllabus | Homework | Final |
|---|--------|---------------|-------|----------|----------|-------|
| 00 | DevOps Intro | [✓](courses/00-devops-intro/) | ✓ [`devops-fundamentals`](slides/devops-fundamentals/) | ✓ | — | — |
| 01 | Linux Fundamentals | [✓](courses/01-linux-fundamentals/) | ✓ [`linux-fundamentals`](slides/linux-fundamentals/) (45 pages) | ✓ | ✓ 5/5 | ✓ |
| 02 | Shell Scripting | ⚪ | 🪧 [`shell-scripting`](slides/shell-scripting/) | ⚪ | ⚪ | ⚪ |
| 03 | Git & Version Control | ⚪ | 🪧 [`git-version-control`](slides/git-version-control/) | ⚪ | ⚪ | ⚪ |
| 04 | Networking & SSH | ⚪ | 🪧 [`networking-ssh`](slides/networking-ssh/) | ⚪ | ⚪ | ⚪ |
| 05 | Docker & Containers | ⚪ | 🪧 [`docker-containers`](slides/docker-containers/) | ⚪ | ⚪ | ⚪ |
| 06 | Kubernetes | ⚪ | 🪧 [`kubernetes`](slides/kubernetes/) | ⚪ | ⚪ | ⚪ |
| 07 | CI/CD with Jenkins | ⚪ | 🪧 [`jenkins-cicd`](slides/jenkins-cicd/) | ⚪ | ⚪ | ⚪ |
| 08 | Infrastructure as Code | ⚪ | 🪧 [`infrastructure-as-code`](slides/infrastructure-as-code/) | ⚪ | ⚪ | ⚪ |
| 09 | Observability | ⚪ | 🪧 [`observability`](slides/observability/) | ⚪ | ⚪ | ⚪ |
| 10 | Capstone Project | ⚪ | 🪧 [`capstone-project`](slides/capstone-project/) | — | ⚪ | ⚪ |

To flesh out a stub deck, run `/create-slide` (it works on an existing slide id too) or just edit the file directly. To scaffold a course folder (02–10), say *"scaffold course NN"* and the `course-authoring` skill handles it — including creating the `slides` symlink back to the existing stub deck.

## Running the slides

```sh
pnpm dev          # opens http://localhost:5173
# then navigate to /s/<slide-id>
```

## Conventions

- **Course id** — kebab-case, no `NN-` prefix in the slide folder (`slides/linux-fundamentals/`), but with the prefix in the course folder (`courses/01-linux-fundamentals/`). The numeric prefix encodes order in the program.
- **Homework labs** — named `lab-NN-<short-topic>.html`. Numbered within the course, starting at `01`.
- **Final project** — one `project.html` inside `final/`. Optional per course; capstone has one too.
- **Cheat sheets** — `docs/cheat-sheet.html` is the canonical name when a course has one.
- **The site** — `courses/` is treated as a static HTML site. Every student-facing artifact (course landing, syllabus, homework labs, docs, final) is an `.html` file. All styling lives in the single shared stylesheet `assets/styles.css`. No inline CSS, no build step. Open `index.html` in any browser.
- **Markdown** — only `README.md` (per course) and `PROGRAM.md` (root) stay markdown. They're for git/IDE navigation, not student reading.
