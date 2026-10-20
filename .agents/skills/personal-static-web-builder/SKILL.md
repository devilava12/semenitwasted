---
name: personal-static-web-builder
description: Build static personal websites and single pages (About, landing, service, contact, profile, article, experiment) from natural-language prompts, using the semenitwasted visual system by default (monochrome surfaces, Bento Grid, subtle Neumorphism, restrained motion). Produces production-ready static HTML/CSS/JS that deploys to Cloudflare Pages. Use this skill whenever the user asks to build, design, redesign, review, or refine a personal web page or site, including phrasings like "buat halaman about", "bikin landing page", "website pribadi", "personal site", "bento layout", or "static site for Cloudflare Pages", even if they never name the design system. Not for Figma-to-code (use Figma/MCP), backend or app development, or CMS/SSR projects.
---

# Personal Static Web Builder

## 1. Purpose

Use this skill when designing, implementing, reviewing, or refining a static website or individual page from a natural-language prompt.

The default visual language is the established semenitwasted design system: restrained monochrome surfaces, Bento Grid composition, subtle Neumorphism, deliberate spacing, strong hierarchy, and subtle purposeful motion.

This is a general-purpose personal web-building skill, not a portfolio-only skill. A page may be an About page, landing page, service page, contact page, profile, article, experiment, or another personal-web experience.

Build one page or scoped piece of work at a time. Do not assume that the entire website must be redesigned or generated unless the user explicitly asks for it.

Do not use this skill as the Figma-to-code workflow. Figma implementation is handled separately through Figma/MCP when explicitly requested.

### Reference files

Read `references/design-system.md` before building. Read the others only when the task touches them:

| File | Read when |
|---|---|
| `references/design-system.md` | always |
| `references/responsive.md` | any layout work |
| `references/typography.md` | choosing the type scale or heading structure |
| `references/animation.md` | adding motion or transitions |
| `references/accessibility.md` | forms, custom controls, focus handling |
| `references/seo.md` | the page should be indexed or shared |
| `references/performance.md` | images, fonts, or heavy effects are involved |
| `references/validation.md` | before the final validation pass and before reporting completion (sections 16 to 18) |

If a reference file is missing, do not stop. Use the fallback baseline in Appendix A and say in the completion summary that the file was not found. For `references/validation.md`, the fallback is sections 16 to 18 of this file.

If the project already exists, look at its stack, folder layout, and existing pages first, and match them.

---

## 2. Source-of-truth order

Resolve conflicts in this order:

1. The user's explicit instruction for the current task.
2. An explicitly supplied design reference or existing approved implementation.
3. Existing project instructions, framework conventions, and established code patterns. Do not swap a project's framework or build setup to suit this skill.
4. This skill's default design system and implementation rules.
5. Minimal implementation assumptions.

The default design system is a starting point, not an immutable requirement.

If the user explicitly requests a different visual style, layout system, animation behavior, color system, or technical approach, follow the user's instruction.

When the user does not specify a design direction, preserve the default semenitwasted visual language.

Do not ask unnecessary clarification questions when a reasonable design decision can be made within the established system. Make the smallest sensible assumption and continue.

Ask a clarifying question only when you cannot tell what the page is for. List every assumption you made in the completion summary so the user can correct it cheaply.

---

## 3. Design intent

Prioritize:

- clear visual hierarchy
- strong content presentation
- intuitive navigation
- purposeful layout
- readable typography
- responsive behavior
- restrained visual effects
- consistent interaction
- fast and reliable delivery

The website should feel intentionally designed rather than generated from a generic website template.

Prefer a small number of deliberate visual decisions over excessive decoration.

The content and user's purpose remain more important than visual effects.

---

## 4. Default visual direction

Unless overridden by the user, use the semenitwasted visual language:

- restrained monochrome foundation
- Bento Grid composition where appropriate
- subtle Neumorphism as a surface treatment
- strong alignment and intentional gutters
- generous but controlled whitespace
- clear visual hierarchy
- tactile surfaces without excessive decoration
- restrained borders, shadows, and depth
- deliberate component repetition
- polished but personal visual character

Do not automatically force Bento Grid into every section. Use it when it improves hierarchy, grouping, or content presentation.

Do not automatically apply Neumorphism to every component. Treat it as a visual accent and surface treatment.

Soft shadows alone do not show where a control is or what state it is in. Interactive elements also need a visible border or contrast change, a clear hover/active state, and a visible focus ring.

Detailed tokens and visual rules are defined in `references/design-system.md`. If that file cannot be found, use the fallback baseline in Appendix A.

---

## 5. Prompt-to-page behavior

When the user requests a page:

1. Understand the page's purpose and primary user task from the prompt.
2. Determine the necessary page structure and content hierarchy.
3. Choose an appropriate layout using the default design system unless overridden.
4. Create or reuse appropriate components.
5. Implement responsive behavior.
6. Add subtle interaction and motion where useful.
7. Use placeholder content when required information has not been provided.
8. Validate the implementation.
9. Refine visible or functional issues before reporting completion.

Do not stop at planning unless the user asks for planning only.

Do not require the user to provide detailed UI specifications when the request can reasonably be interpreted using this skill.

Write visible copy in the language of the user's prompt and set `<html lang>` to match.

---

## 6. Content integrity

Do not invent personal facts, clients, projects, achievements, credentials, statistics, testimonials, dates, business claims, or other factual information about the user.

When content is missing:

- use clearly recognizable placeholder content
- keep placeholder content structurally realistic
- avoid presenting placeholders as real facts
- make it easy for the user to replace them later
- use visible bracketed placeholders such as `[Nama Anda]`, `[Deskripsi singkat 1-2 kalimat]`, `[Judul proyek]`
- use CSS or inline-SVG placeholder blocks with a fixed `aspect-ratio` for missing images instead of hotlinking stock photos
- end the completion summary with a short list of the placeholders the user still needs to fill

Do not fabricate external URLs, contact details, social profiles, project results, or credentials.

Use supplied assets and content when available.

---

## 7. Static-web and Cloudflare Pages target

Build for static deployment unless the user explicitly requests otherwise.

Prefer:

- static HTML/CSS/JavaScript
- static-site-compatible frameworks
- client-side interactions that do not require a server
- build outputs that can be deployed to Cloudflare Pages

Do not introduce a backend, server runtime, database, server-side API, or unnecessary infrastructure for a static-page requirement.

When a framework already exists in the project, follow its established conventions and static-export/build configuration rather than replacing the stack.

Avoid dependencies that require server-side execution unless explicitly requested.

Ensure the final build can produce a deployable static output.

For a new project without a framework, default to `index.html`, `styles.css`, `script.js` (only if needed), and `assets/`. Use `about/index.html` style folders for extra pages so URLs stay clean. State the build command and output directory when a build step exists. Add `_headers` or `_redirects` only when the task needs them. Do not use Pages Functions for a static-page requirement.

A static page cannot receive form submissions by itself. For a contact page, use one of these, in this order:

1. A `mailto:` link using an address the user supplied.
2. A form that posts to an external form-service endpoint the user supplied.
3. If neither exists, show the contact details as placeholders and do not render a form that appears to send.

---

## 8. Components and implementation

Use reusable components when there is genuine repetition, such as:

- navigation
- buttons
- cards
- project/content tiles
- tags
- section headers
- forms
- repeated content blocks

Do not over-abstract one-off elements.

Prefer semantic HTML and simple, maintainable implementation.

Use native links for navigation and buttons for actions.

Do not ship:

- dead links
- fake interactions
- placeholder controls presented as functional
- fake form success
- inaccessible custom controls
- unnecessary JavaScript

Keep changes scoped to the user's request.

---

## 9. Responsive behavior

Every page must work across:

- desktop
- tablet/intermediate widths
- mobile

Do not treat mobile as a reduced desktop layout.

Reflow layout intentionally while preserving:

- content hierarchy
- reading order
- navigation
- image integrity
- usable controls
- spacing relationships

Avoid:

- horizontal page overflow
- clipped content
- tiny controls
- broken Bento layouts
- unreadable text
- forced desktop-width sections

Check intermediate widths as well as the smallest and largest relevant viewport.

Detailed responsive rules are defined in `references/responsive.md`.

---

## 10. Motion and interaction

Motion is a subtle enhancement, not the primary design feature.

Use animation to:

- provide feedback
- establish spatial relationships
- soften transitions
- reveal content naturally
- add small moments of personality

Prefer:

- short transitions
- subtle opacity/transform changes
- restrained hover states
- small entrance/reveal effects
- gentle stagger when it improves hierarchy

Avoid:

- excessive parallax
- looping decorative animation
- large or distracting transforms
- animation that delays access to content
- animation required to understand navigation
- motion on every element

All important interactions must work without hover.

Respect `prefers-reduced-motion` and provide a useful static experience.

Detailed animation rules are defined in `references/animation.md`.

---

## 11. Typography

Typography must establish a clear hierarchy between:

- page title
- section heading
- subsection/project title
- body text
- labels
- metadata
- supporting text

Use semantic heading levels correctly.

Do not skip heading levels simply to obtain a desired visual size.

Keep body text readable and line lengths comfortable.

Detailed typography rules are defined in `references/typography.md`.

---

## 12. Accessibility

Use:

- semantic HTML
- logical DOM order
- accessible names for controls
- keyboard-operable interactions
- visible focus states
- sufficient contrast
- descriptive alternative text for meaningful images
- empty alt text for decorative images
- appropriate labels for form controls

Do not communicate important information through color alone.

Do not make essential content dependent on hover, animation, pointer precision, or screen size.

Detailed accessibility rules are defined in `references/accessibility.md`.

---

## 13. SEO

For pages where SEO is relevant:

- provide an accurate page title
- provide a useful meta description
- maintain a logical heading structure
- use descriptive link text
- use meaningful image alt text
- keep metadata consistent with visible content
- use canonical or structured metadata only when appropriate and supported

Do not keyword-stuff.

Do not generate unsupported claims for SEO purposes.

Detailed SEO rules are defined in `references/seo.md`.

---

## 14. Performance

Prefer fast, lightweight implementations.

Pay attention to:

- image size and format
- responsive images
- font loading
- unnecessary dependencies
- unnecessary JavaScript
- expensive visual effects
- layout shifts
- below-the-fold loading

Do not optimize at the expense of the actual visual design without reason.

Detailed performance rules are defined in `references/performance.md`.

---

## 15. Anti-AI-slop rules

Do not default to:

- oversized gradient headlines
- random decorative blobs
- floating orbs
- excessive glassmorphism
- generic SaaS layouts
- identical repeated cards
- arbitrary statistics
- fake testimonials
- unnecessary badges
- excessive icon decoration
- fashionable effects with no functional purpose
- generic AI-generated marketing copy

Do not add sections merely because common website templates contain them.

Every major visual element should have a purpose.

When uncertain, prefer clarity and restraint.

---

## 16. Validation and review

Before reporting completion:

1. Review the implementation against the user's request.
2. Inspect the rendered page when a browser or rendering path is available.
3. Check desktop, intermediate, and mobile behavior.
4. Check visual hierarchy, spacing, typography, images, and layout.
5. Check interactive states and keyboard focus.
6. Check accessibility basics.
7. Check for broken links, missing assets, console/build errors, and obvious layout problems.
8. Check that the page remains suitable for static deployment.
9. Fix important issues before reporting completion.

Concrete checks:

- If there is a build step, run it and confirm it produces static output with no errors.
- When a browser or screenshot path is available, view the page at about 375px, 768px, 1024px, and 1280px, and confirm there is no horizontal overflow (`document.documentElement.scrollWidth` is not larger than `window.innerWidth`).
- Tab through the page: focus is visible, order is logical, and every control works by keyboard.
- Confirm the page is complete with `prefers-reduced-motion: reduce`.

Detailed validation and review rules are defined in `references/validation.md`. Read it before the final validation pass. If it cannot be found, use the checks above and sections 17 and 18.

Do not claim rendered or browser verification unless it was actually performed.

When browser or rendering access is unavailable, perform code-level review and explicitly state that rendered verification could not be performed.

---

## 17. Review severity

Report findings by practical impact:

- **P0 — Blocker:** The page cannot be used, contains materially false information, or has a critical security/accessibility issue.
- **P1 — High:** The primary user task is broken, the page has a major responsive failure, or a critical interaction does not work.
- **P2 — Medium:** A noticeable visual, usability, accessibility, or performance issue that does not block the primary task.
- **P3 — Low:** Minor polish or consistency issue with limited user impact.

Do not inflate cosmetic preferences into blockers.

---

## 18. Final ship gate

Before calling the work ready:

- [ ] The page fulfills the user's requested purpose.
- [ ] Explicit user instructions were followed.
- [ ] Default visual system was preserved unless intentionally overridden.
- [ ] Content is accurate or clearly marked as placeholder content.
- [ ] Responsive behavior works across relevant widths.
- [ ] Interactive elements work as presented.
- [ ] Keyboard focus and basic accessibility are handled.
- [ ] Motion is subtle and respects reduced-motion preferences.
- [ ] Static deployment requirements are preserved.
- [ ] Performance basics have been reviewed.
- [ ] No P0/P1 issue remains.
- [ ] Rendered verification was performed when available, or the limitation is stated.
- [ ] The completion summary states what changed, what was verified, and any remaining limitation.

Do not claim a check that was not performed.

Run this gate together with the checks defined in `references/validation.md` when that file is available, and report which of those checks were performed.

Keep the completion summary short: what was built and which files, assumptions made, placeholders still to replace, what was verified (and what was not), and any remaining issue with its severity.

---

## Appendix A. Fallback baseline

Use this only when `references/design-system.md` cannot be found. These are the real semenitwasted tokens, copied from that file (section 21), so a page built from this fallback still matches the system. When the file is available, it wins over this summary.

```css
:root {
  /* Core colors */
  --color-light: #F0EDF4;
  --color-dark: #211B28;
  --color-shadow: #450D50;

  /* Signature shadows (preserve exactly) */
  --shadow-primary: 18px 18px 16px rgb(69 13 80 / 20%);
  --shadow-depth: 4px 4px 4px rgb(69 13 80 / 25%);

  /* Radius, container, padding */
  --radius: 10px;
  --container-max: 1200px;
  --page-pad: clamp(16px, 4vw, 48px);

  /* Text tones and states (derived, contrast verified on --color-light) */
  --color-text-muted: rgb(33 27 40 / 70%);      /* 5.78:1 */
  --color-border-control: rgb(33 27 40 / 50%);  /* 3.16:1 */
  --shadow-hover: 8px 8px 8px rgb(69 13 80 / 22%);
  --shadow-pressed: 2px 2px 2px rgb(69 13 80 / 25%);
  --focus-ring: 2px solid var(--color-dark);
  --tap-min: 44px;

  /* Motion: keep identical to references/animation.md section 26 */
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --dur-micro: 150ms; --dur-ui: 200ms; --dur-reveal: 400ms;
}
```

- Spacing is an even scale only: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128. Do not use odd values for padding, margin, gap, or fixed sizes. Hairline borders (1px, 2px) are exempt.
- Grid: 12 columns on desktop, 8 on tablet, 4 on mobile, with 24px, 20px, and 16px gutters. Starting breakpoints: about 640px and 1024px.
- Type: Rubik with the fallback stack `'Rubik', system-ui, -apple-system, 'Segoe UI', sans-serif` and `font-display: swap`. Body weight 400, labels and buttons 500, headings 600 or 700, line length about 60 to 75 characters.
- Colors: no accent colors or gradients. Semantic colors only for a real functional state, always paired with text or an icon.
- Interaction: every control has a tap area of at least 44px, a visible `:focus-visible` ring, and a `1px solid transparent` border so it stays visible in forced-colors mode.
- Dark surfaces cannot rely on the purple shadow for depth (1.14:1 contrast). Use a surface step or a light border instead.