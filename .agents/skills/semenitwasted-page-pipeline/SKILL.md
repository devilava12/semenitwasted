---
name: semenitwasted-page-pipeline
description: >-
  Orchestrate the 3-agent Extract -> Build -> Audit pipeline for creating, redesigning,
  or adding interactive UI sections to semenitwasted static pages. Locks library.html
  (#tokens, #components, #motion) as the single source of truth so animations and
  components never drift from the approved Library catalog. Use whenever building a new
  page, overhauling an existing page, or implementing interactive Bento/UI sections on
  semenitwasted.
---

# semenitwasted Multi-Agent Page Pipeline

Build or overhaul static pages on **semenitwasted** using three isolated agent roles (`Extract -> Build -> Audit`) so every token, component state, and animation matches `library.html` (`#tokens`, `#components`, `#motion`) on the first pass.

## Source-of-Truth Precedence

1. Explicit user instructions for the current request.
2. Live catalog in `library.html` (`#tokens`, `#components`, `#motion`) + dark-theme tokens in `library.css`.
3. `personal-static-web-builder` (`SKILL.md` + needed `references/*.md`) and `vibe-coding-guardrails`.
4. `tactile-micro-interactions` — apply **only** for micro-interactions genuinely absent from `library.html` (e.g., copy-snippet haptic burst, reading progress bar, spotlight cursor) or when the user explicitly requests Emil Kowalski spring overrides. On any token/easing/shadow overlap, `library.html` wins.

---

## Stage 1 — Extract (`Library Extractor` Sub-Agent)

Isolate `library.html` lookup from page authoring so the builder receives an exact, compact spec sheet rather than improvising CSS.

1. Run the live index extractor:
   ```powershell
   node ".agents/skills/semenitwasted-page-pipeline/scripts/extract-library-spec.js" --index
   ```
2. Map the planned page sections and controls to exact catalog IDs (`anim-*`, `token-*`, `cmp-*`), then fetch their live snippets + dark-theme tokens:
   ```powershell
   node ".agents/skills/semenitwasted-page-pipeline/scripts/extract-library-spec.js" --master --ids <comma-separated-ids>
   ```
3. Spawn a read-only **Library Extractor** sub-agent (`TypeName: research`, `Role: Library Spec Extractor`) with:
   - The user's page brief.
   - The extracted `--master` and `--ids` output from step 2.
   - Brief: *"Inspect any matching live CSS/JS rules in `library.css`, `library.js`, `site-chrome.js`, and the closest existing page (e.g., `about.html`, `portfolio.html`, `contact.html`) for conventions not fully shown in snippets. Return a **Library Parity Spec Sheet** (under 600 words + exact CSS/JS blocks) containing: (a) `:root` + `[data-theme="dark"]` tokens required; (b) Component map (`UI element -> #cmp-*`); (c) Motion map (`interaction -> #anim-*`, exact `--ease-out`, `--dur-*`, hover `@media (hover: hover) and (pointer: fine)` guard, `:active` state, `:focus-visible`, `prefers-reduced-motion`); (d) `Fallback: tactile-micro-interactions` ONLY for interactions absent from `library.html` (otherwise `None`); (e) integration checklist for `site-chrome.js`, `#main-content`, and `build.js`."*

**Completion criterion:** Every planned surface, interactive control, and animation is bound to a live `library.html` catalog ID (or explicitly marked `Fallback: tactile-micro-interactions`).

---

## Stage 2 — Build (`Page Builder` Sub-Agent + Optional Parallel `Art Director`)

1. Define a write-capable sub-agent via `define_subagent` (`Name: page-builder`, `EnableWriteTools: true`) or spawn it with `invoke_subagent` (`Role: Page Builder`), passing:
   - The user's page brief and target file paths.
   - The full **Library Parity Spec Sheet** from Stage 1 (pasted verbatim).
   - Required skills to read and apply:
     - `.agents/skills/personal-static-web-builder/SKILL.md` (and relevant `references/*.md`)
     - `.agents/skills/vibe-coding-guardrails/SKILL.md`
     - `.agents/skills/tactile-micro-interactions/SKILL.md` (only if Stage 1 listed a non-conflicting fallback)
   - Positive binding: copy exact token names (`--ease-out`, `--dur-micro`, `--dur-ui`, `--dur-reveal`, `--shadow-primary`, `--shadow-depth`, `--shadow-hover`, `--shadow-pressed`, `--lift`, `--radius`, `--tap-min`) from the Spec Sheet; wrap hover transforms/shadows in `@media (hover: hover) and (pointer: fine)`; keep `:active` and `:focus-visible` outside that query; include `[data-theme="dark"]` and `@media (prefers-reduced-motion: reduce)`; integrate `site-chrome.js` (`data-site-chrome`) and `#main-content`; use bracketed placeholders for unknown personal facts.
2. **Parallel visual branch (only when illustrations/hero images are needed):** In the same turn, spawn an **Art Director** sub-agent following `.agents/skills/paper-cut-art-director/SKILL.md` to generate/optimize WebP assets for the page.

**Completion criterion:** Target HTML/CSS/JS files exist, match the Stage 1 Spec Sheet, preserve vanilla HTML/CSS/JS, and contain zero dead links or invented personal claims.

---

## Stage 3 — Audit (`Motion & Parity Auditor` Sub-Agent)

Verify with an independent, fresh context so author confirmation bias cannot hide animation drift.

1. Run the static parity audit script on every created/edited HTML and CSS file:
   ```powershell
   node ".agents/skills/semenitwasted-page-pipeline/scripts/audit-parity.js" <target-files...>
   ```
2. Spawn a fresh read-only **Motion & Parity Auditor** sub-agent (`TypeName: research`, `Role: Motion & Parity Auditor`) passing ONLY:
   - Paths of the files created/edited in Stage 2.
   - The Stage 1 **Library Parity Spec Sheet**.
   - The `audit-parity.js` output from step 1.
   - Brief: *"Audit the built files against the Library Parity Spec Sheet and `vibe-coding-guardrails`. Check: (1) Motion parity — every transition/animation matches its `#anim-*` ID (`--ease-out`, `--dur-*`, hover delta, active press, `@media (hover: hover)`, `prefers-reduced-motion`, GPU-composited properties); (2) Token parity — colors, shadows, radii, even spacing, and `[data-theme="dark"]` match `#token-master-export` + `library.css`; (3) Component parity — 44px tap targets, `1px solid transparent` forced-colors border, `:focus-visible`, card surfaces match `#cmp-*`; (4) Guardrails — `site-chrome.js`, `#main-content`, zero dead links, zero regression. Report `PASS` or a concise list of mismatches (`file:line`, expected from `library.html` vs actual, severity P0–P3). Under 350 words."*
3. **Patch & re-verify loop:** Fix every `FAIL`, P0, P1, and motion/token parity mismatch reported by the Auditor, then re-run `audit-parity.js` until 0 `FAIL` (up to 2 iterations).
4. **Build & visual verification:**
   - Run `node build.js` when the page belongs in production `dist/` and confirm 0 SEO/build errors (check `build.js` `staticPages` / `site-chrome.js` if the new page should appear in `sitemap.xml` or global nav).
   - When visual inspection is needed or requested and the `browser` subagent is available, check desktop (`1280px`), tablet (`768px`), and mobile (`375px`) viewports for 0 console errors and 0 horizontal overflow. State explicitly if browser verification was skipped.

**Completion criterion:** `audit-parity.js` reports 0 `FAIL`, the independent Motion & Parity Auditor confirms parity with `library.html`, and `node build.js` succeeds (when applicable).

---

## Stage 4 — Delivery & Transparency Receipt

Close with:
1. Brief summary of files created/changed, `library.html` catalog IDs matched, placeholders to fill (if any), and verification performed.
2. The mandatory **🧭 Status Skill & Agent** block required by workspace `AGENTS.md` (showing ✅ used skills/agents with evidence and ⚪ unused project skills with short reasons).
