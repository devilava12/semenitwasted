---
name: personal-static-web-builder
description: Design and implement static personal websites and individual pages from natural-language prompts, using the semenitwasted visual system as the default design language while allowing explicit user instructions to override it. Build production-ready static websites suitable for Cloudflare Pages, preserving content integrity, responsive behavior, accessibility, performance, subtle motion, and visual consistency.
---

# Personal Static Web Builder

## 1. Purpose

Use this skill when designing, implementing, reviewing, or refining a static website or individual page from a natural-language prompt.

The default visual language is the established semenitwasted design system: restrained monochrome surfaces, Bento Grid composition, subtle Neumorphism, deliberate spacing, strong hierarchy, and subtle purposeful motion.

This is a general-purpose personal web-building skill, not a portfolio-only skill. A page may be an About page, landing page, service page, contact page, profile, article, experiment, or another personal-web experience.

Build one page or scoped piece of work at a time. Do not assume that the entire website must be redesigned or generated unless the user explicitly asks for it.

Do not use this skill as the Figma-to-code workflow. Figma implementation is handled separately through Figma/MCP when explicitly requested.

---

## 2. Source-of-truth order

Resolve conflicts in this order:

1. The user's explicit instruction for the current task.
2. An explicitly supplied design reference or existing approved implementation.
3. This skill's default design system and implementation rules.
4. Existing project instructions, framework conventions, and established code patterns.
5. Minimal implementation assumptions.

The default design system is a starting point, not an immutable requirement.

If the user explicitly requests a different visual style, layout system, animation behavior, color system, or technical approach, follow the user's instruction.

When the user does not specify a design direction, preserve the default semenitwasted visual language.

Do not ask unnecessary clarification questions when a reasonable design decision can be made within the established system. Make the smallest sensible assumption and continue.

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

Detailed tokens and visual rules are defined in `references/design-system.md`.

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

---

## 6. Content integrity

Do not invent personal facts, clients, projects, achievements, credentials, statistics, testimonials, dates, business claims, or other factual information about the user.

When content is missing:

- use clearly recognizable placeholder content
- keep placeholder content structurally realistic
- avoid presenting placeholders as real facts
- make it easy for the user to replace them later

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
