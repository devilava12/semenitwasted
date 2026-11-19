# semenitwasted Workspace Rules

Static personal site (`semenitwasted.web.id`) built with vanilla HTML, CSS, and JS for Cloudflare Pages. Shared navbar, theme toggle, seasonal CSS, and mobile drawer live in `site-chrome.js`; blog metadata lives in `blog-data.js`; production build runs `node build.js` -> `dist/`.

## Single Sources of Truth (SSOT)

1. **UI, Tokens, Components & Motion:** `library.html` (`#tokens`, `#components`, `#motion`) + `[data-theme="dark"]` in `library.css`.
   - On any conflict between `library.html` and a skill or plugin (including `tactile-micro-interactions` and `Modern Web Guidance`), `library.html` wins unless the user explicitly asks to override it.
   - Extract live specs via `.agents/skills/semenitwasted-page-pipeline/scripts/extract-library-spec.js` and audit via `audit-parity.js`.
2. **Blog Architecture, SEO & Editorial Standards:** `blog-data.js` + canonical article template in `blog/*.html` + `build.js` (`https://semenitwasted.web.id/blog/<slug>` without `.html`).
   - Extract live blog context via `.agents/skills/semenitwasted-blog-pipeline/scripts/extract-blog-context.js` and audit via `audit-blog.js`.

## Auto-Router (Zero-Memorization Workflow)

Route user requests automatically without requiring the user to name skills or agents:

| User Intent | Required Skills & Multi-Agent Flow |
|---|---|
| Buat halaman baru / desain ulang halaman / tambah section UI interaktif | Follow `.agents/skills/semenitwasted-page-pipeline/SKILL.md` (3-agent `Extract -> Build -> Audit` pipeline binding `library.html` + `personal-static-web-builder` + `vibe-coding-guardrails`; consult `tactile-micro-interactions` only for micro-interactions absent from `library.html`; add `paper-cut-art-director` in parallel if illustrations are needed). |
| Edit cepat / perbaikan bug UI (*vibe coding*) | Follow `vibe-coding-guardrails`. If touching CSS tokens, transitions, or interactive controls, verify parity with `library.html` (`audit-parity.js`). |
| Tulis / riset / publikasi artikel blog baru | Follow `.agents/skills/semenitwasted-blog-pipeline/SKILL.md` (3-agent `Blueprint -> Write (+ eli5 + parallel paper-cut-art-director) -> Independent blog-curator` pipeline + `audit-blog.js` + `node build.js`). |
| Audit / kurasi / humanisasi draf atau artikel blog yang sudah ada | Run `audit-blog.js` on the target `blog/<slug>.html`, then follow `blog-curator` + `eli5` (for beginner-clarity checks) and run `node build.js` if files changed. |
| Jelaskan konsep rumit dengan bahasa sederhana / analogi / diagram (*ELI5*) | Follow `.agents/skills/eli5/SKILL.md` directly (single-agent explanation in chat, or integrated inside the Writer agent when authoring blog prose). |
| Buat atau revisi ilustrasi / aset gambar 3D Paper Cut | Follow `paper-cut-art-director`. |
| Kurasi / audit halaman web atau desain yang sudah jadi | Use the `Modern Web Guidance` plugin **only** as a post-build curation/audit pass after the page or design is finished (never during initial build/design, and never overriding `library.html` SSOT without explicit user approval). Pair with `audit-parity.js` when checking UI parity. |

> **Plugin Scope Rule (`Modern Web Guidance`):** Only invoke `Modern Web Guidance` for post-build curation/auditing of finished web pages or designs. Do not run it during initial design/drafting or quick edits unless explicitly requested.

## Mandatory Transparency Receipt (`Status Skill & Agent`)

The user should never have to guess or ask which skills/agents ran. For every task that builds, edits, audits, or produces pages, code, visuals, or articles (skip on short casual Q&A unless asked), include this compact block at completion — and a brief active-pipeline preview at the start of multi-step builds:

```markdown
> **🧭 Status Skill & Agent**
> **Sudah digunakan:**
> - ✅ `<skill / referensi / sub-agent>` — *<bukti singkat, mis. ID library.html, slug blog, atau hasil skrip audit>*
>
> **Belum digunakan (tersedia jika dibutuhkan):**
> - ⚪ `<nama-skill>` — *<alasan singkat 3–6 kata>*
```

Track these semenitwasted project skills in the receipt so every relevant skill is accounted for as either ✅ or ⚪:
`semenitwasted-page-pipeline`, `personal-static-web-builder`, `tactile-micro-interactions`, `vibe-coding-guardrails`, `semenitwasted-blog-pipeline`, `blog-article-writing`, `blog-curator`, `eli5`, `paper-cut-art-director`.

Only mark an item ✅ when its `SKILL.md` (or referenced file/sub-agent) was actually read and executed in the current task.
