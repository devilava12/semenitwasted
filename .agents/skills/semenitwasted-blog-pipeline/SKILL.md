---
name: semenitwasted-blog-pipeline
description: >-
  Orchestrate the 3-agent Blueprint -> Write (+ ELI5 + Parallel Art Director) -> Curate
  pipeline for researching, writing, illustrating, auditing, and publishing blog articles
  on semenitwasted (blog/*.html + blog-data.js). Combines blog-article-writing, eli5
  beginner clarity, paper-cut-art-director, and an independent blog-curator sub-agent so
  author confirmation bias never hides AI tells, em dashes, or SEO/schema drift.
---

# semenitwasted Multi-Agent Blog Pipeline

Produce or overhaul articles in `blog/*.html` and `blog-data.js` through three isolated agent roles (`Blueprint -> Write -> Curate`) so writing, beginner clarity (`eli5`), visual direction (`paper-cut-art-director`), and editorial/SEO auditing (`blog-curator`) never compete in a single polluted context window.

## Why Each Skill Has a Distinct Role in the Pipeline

- **`blog-article-writing` (Phase 1 & Phase 2):** Owns competitive/SERP structure, 4-pillar Information Gain, E-E-A-T, DOM layout (`blog/*.html`), and `blog-data.js` schema.
- **`eli5` (Integrated Clarity Lens inside Stage 2 Writer — NOT a separate agent hop):** Owns plain-language explanation of dense mechanisms for beginner readers (`Pemula`), concrete analogies with stated limits, zero minimizers (*mudah, cukup, jelas, tentu saja*), zero em dashes (`—`), and choosing tables/diagrams when prose hides structure.
- **`paper-cut-art-director` (Parallel Visual Sub-Agent in Stage 2):** Owns 16:9 monochrome 3D paper-cut cover and diagram assets (`#F0EDF4`, `#211B28`, `#450D50`) converted to WebP/SVG.
- **`blog-curator` (Independent Stage 3 Auditor Sub-Agent):** Runs in a **fresh context** after writing finishes to eliminate author confirmation bias, stripping Indonesian AI tells (`naskah-id`), verifying factual claims (`[PERLU RUJUKAN]` when unverified), and checking technical SEO + JSON-LD `@graph`.

---

## Stage 1 — Blueprint & Topic Cluster Strategy (`Blueprint Strategist` Sub-Agent)

1. Run the live blog repository index extractor:
   ```powershell
   node ".agents/skills/semenitwasted-blog-pipeline/scripts/extract-blog-context.js" --index
   ```
2. Spawn a read-only **Blueprint Strategist** sub-agent (`TypeName: research`, `Role: Blog Blueprint Strategist`) passing:
   - The user's topic, source material (e.g., video/paper/experience), and target audience.
   - The live `extract-blog-context.js --index` output.
   - Brief: *"Read `.agents/skills/blog-article-writing/SKILL.md` (Section 02 / Phase 1). Audit `blog-data.js` for keyword cannibalization and select 2–3 real existing article slugs for contextual internal links and `.post-navigator`. Produce a compact **Phase 1 Content Blueprint**: (a) Next `id`, `slug`, `category`, `categoryLabel`, `tags`, and SEO Title/Meta Description (0 em dash); (b) BLUF (1–2 sentence direct answer); (c) 4 Information Gain pillars (Negative Knowledge, Empirical Benchmark, Friction Story, Decision Framework); (d) Complete `H1` / `H2` / `H3` outline (0 em dash, 0 chapter clichés like `Pendahuluan`/`Kesimpulan`/`Mengenal`/`Memahami`, practical final H2); (e) Primary references & internal link targets."*

**Completion criterion:** If the user asked for a blueprint/outline only, present the Stage 1 Blueprint and stop for feedback. If the user asked for a full article, proceed directly to Stage 2.

---

## Stage 2 — Write + ELI5 Clarity (`Article Writer` Sub-Agent + Parallel `Art Director`)

1. Fetch the canonical HTML & JSON-LD template summary:
   ```powershell
   node ".agents/skills/semenitwasted-blog-pipeline/scripts/extract-blog-context.js" --template
   ```
2. Spawn a write-capable **Article Writer** sub-agent (`define_subagent` / `invoke_subagent`, `Role: Blog Article Writer`, `EnableWriteTools: true`) passing:
   - The Stage 1 **Content Blueprint** and `--template` output.
   - Path to the latest reference article (e.g. `blog/ssh-adalah-cara-kerja-dan-kisah-celah-xz-utils.html`).
   - Required skills to read and apply together:
     - `.agents/skills/blog-article-writing/SKILL.md` (Phase 2 execution + Section 04 HTML/DOM & `blog-data.js` rules)
     - `.agents/skills/eli5/SKILL.md` (plain-language mechanism explanation, concrete analogies with explicit limits, zero minimizers, zero em dashes `—`, structured tables/lists when comparing 3+ items or steps)
   - Positive binding rules:
     - Write `blog/<slug>.html` matching the canonical DOM (`#readingProgressBar`, `[data-site-chrome]`, `main.post-main#main-content`, `.post-tldr-card`, `article.post-prose`, `<h2 id="referensi">Referensi</h2>`, `.post-navigator`) and JSON-LD `@graph` (`https://semenitwasted.web.id/blog/<slug>` without `.html`).
     - Register the post at the top of `BLOG_POSTS` in `blog-data.js` with accurate Brysbaert 200 WPM reading time.
     - Use contextual internal links to real existing `blog/*.html` slugs in prose and `.post-navigator`, while keeping external citations in `<h2 id="referensi">Referensi</h2>` (and optional attribution `.post-tldr-card`).
3. **Parallel visual branch (when a new cover or diagram is needed):** In the same turn, spawn an **Art Director** sub-agent reading `.agents/skills/paper-cut-art-director/SKILL.md` to craft prompts, generate 16:9 visuals, convert to WebP in `assets/blog/`, and supply exact `width`, `height`, and descriptive `alt` text.

**Completion criterion:** `blog/<slug>.html` and `blog-data.js` are written, contain 0 em dashes (`—`) in titles/headings/prose, and link only to real files.

---

## Stage 3 — Independent Curation & Technical SEO Audit (`Blog Curator` Sub-Agent)

Never let the Writer sub-agent audit its own draft.

1. Run the static mechanical auditor on the article:
   ```powershell
   node ".agents/skills/semenitwasted-blog-pipeline/scripts/audit-blog.js" "blog/<slug>.html"
   ```
2. Spawn a fresh **Blog Curator** sub-agent (`Role: Independent Blog Curator`, `EnableWriteTools: true` when direct curation edits are expected, or `TypeName: research` when audit-only) passing:
   - Target file path `blog/<slug>.html` and `blog-data.js`.
   - The `audit-blog.js` output from step 1.
   - Brief: *"Read `.agents/skills/blog-curator/SKILL.md` and `.agents/skills/eli5/SKILL.md`. Audit and surgically fix: (1) Any `FAIL`/`WARN` from `audit-blog.js`; (2) Indonesian AI tells (`naskah-id`: pembuka kosmik, subjek hilang karena kata depan, kata hubung 'di mana' tiruan Inggris, pengulangan 'Hal ini', klaim digelembungkan) and translationese; (3) ELI5 clarity (no minimizers, clear analogy boundaries); (4) EYD Edisi V & KBBI accuracy; (5) Fact & E-E-A-T integrity (never invent first-person experience; mark unverified claims with `[PERLU RUJUKAN: ...]`); (6) JSON-LD `@graph`, canonical URL (`https://semenitwasted.web.id/blog/<slug>`), `<time datetime>`, and `blog-data.js` sync."*
3. Re-run `audit-blog.js "blog/<slug>.html"` until 0 `FAIL`.
4. Run `node build.js` to auto-inject `AUTO_TOC` & `AUTO_RELATED`, update `index.html`/`404.html`/`sitemap.xml`/`rss.xml`, and verify ` validateSEO(dist)` reports 0 issues.

**Completion criterion:** `audit-blog.js` exits with 0 `FAIL`, the independent Blog Curator sign-off is complete, and `node build.js` finishes with `0 issue(s) found`.

---

## Stage 4 — Delivery & Transparency Receipt

Report the created/updated files, word count & reading time, curation fixes applied, any `[PERLU RUJUKAN]` items requiring user confirmation, and the mandatory **🧭 Status Skill & Agent** block from `AGENTS.md`.
