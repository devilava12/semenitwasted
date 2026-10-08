---
name: semenitwasted-portfolio-design
description: Design and implement the semenitwasted personal portfolio website while preserving its visual system, content, accessibility, and Figma fidelity.
---

# semenitwasted Portfolio — Design and Build Skill

Use this skill when designing, implementing, reviewing, or refining the semenitwasted portfolio website. Follow the project’s existing framework and conventions. Treat this document as a working design contract, not permission to invent content or redesign approved work.

## 1. Design intent

**Purpose:** Present selected personal design work to potential clients, collaborators, technical and creative peers, and the general public. The website makes the work easy to see, understand, and explore; it is not an aggressive sales funnel or SaaS landing page.

**Primary job:** Make it easy for visitors to view and explore the portfolio.

**Audience needs:**
- General visitors should quickly understand what the creator makes and where to go next.
- Technical and creative visitors may inspect craft, consistency, interaction, and execution.
- Decision makers should be able to scan capabilities and relevant work without wading through unnecessary copy.

Keep the experience polished enough for design peers and straightforward enough for everyone else. The work remains the main event. Visual distinction must never make the portfolio harder to use.

**Visual direction:** A restrained monochrome foundation, Bento Grid composition, and subtle Neumorphism. Aim for memorable, composed, tactile surfaces; avoid visual noise, gratuitous effects, and generic AI-generated “portfolio” styling.

## 2. Source-of-truth order

Resolve conflicts in this order:

1. The user’s explicit instruction for the current task.
2. The approved Figma design or other explicitly supplied design reference.
3. This skill’s locked design decisions and tokens.
4. Existing project instructions, design system, and established code conventions.
5. A minimal implementation assumption, documented when it affects the result.

Do not silently override a higher-ranked source to make a design preference. If Figma conflicts with this skill, follow the user’s direction and report the discrepancy. Ask only when an unresolved conflict materially prevents correct implementation; otherwise make the smallest reversible assumption and state it.

## 3. Locked visual system

### Color

The core palette is monochrome:

```css
:root {
  --color-light: #F0EDF4;
  --color-dark: #211B28;
  --color-shadow: #450D50;
}
```

Use the light and dark colors for the primary surfaces, text, and contrast hierarchy. The shadow color is reserved for the specified shadows below. Do not introduce accent colors, gradients, or extra palette colors unless the user or approved Figma explicitly calls for them. Image content may contain its own colors.

### Shadow system — exact values are fixed

```css
:root {
  --shadow-primary: 18px 18px 16px rgb(69 13 80 / 20%);
  --shadow-depth: 4px 4px 4px rgb(69 13 80 / 25%);
}
```

- **Primary shadow:** `#450D50`, 20% opacity, X 18, Y 18, blur 16.
- **Secondary/depth shadow:** `#450D50`, 25% opacity, X 4, Y 4, blur 4; use when an object sits behind or overlaps another object to clarify depth.
- Preserve these values exactly. Do not reinterpret, normalize, soften, strengthen, or substitute them. CSS above expresses the same fixed color and opacity.
- Use shadows selectively. Subtle Neumorphism is a surface treatment, not a shadow on every element. Do not add unapproved highlight shadows or extra shadow layers.

### Radius, sizing, and spacing

- Default/signature radius: **10px**. Use it for cards, controls, and contained surfaces unless Figma or the user specifies otherwise.
- Box dimensions and spacing use even-number values. Prefer the project scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128` px.
- For component internals, use 4–32px from that scale; section spacing usually uses 40–128px. Select values by hierarchy and available space rather than applying one gap everywhere.
- Avoid odd-number sizing and spacing. If a technical constraint requires one, keep it isolated and explain why. This rule applies to layout dimensions, padding, margins, gaps, and fixed control sizes; it does not override values intrinsic to supplied assets, font rendering, borders, or browser behavior.
- Do not create arbitrary scale values just to satisfy “even”; prefer the scale above.

## 4. Layout and eye flow

Design a clear scan path: **attention → orientation → exploration → action**. At each point, visitors should understand what they are seeing and how to continue.

- Use Bento Grid to express priority and relationships, not as a collection of identical decorative cards. Let the most representative or important work receive the most visual space.
- Establish a consistent page grid, aligned edges, intentional gutters, and responsive column behavior. Use the existing Figma grid when available; otherwise derive a simple grid from the content width and breakpoints already used by the project.
- Make headings and project imagery strong scan checkpoints. Keep labels, descriptions, and metadata close to the work they explain.
- Ensure the first view establishes identity and leads quickly to selected work. Navigation should remain conventional and understandable.
- Avoid competing focal points, forced asymmetry, excessive empty space that hides work, and layouts that require users to learn an interaction pattern.
- Preserve a sensible reading order in both visual layout and the DOM, especially when Bento items change position across screen sizes.

## 5. Typography, content hierarchy, and SEO

- Use semantic HTML elements for meaning, not for their default appearance. Maintain a logical heading outline; do not skip levels to obtain a desired font size.
- Use one clear page-level `<h1>` that describes the portfolio or its positioning. Organize major sections under `<h2>`; use `<h3>` for project or subsection titles where appropriate.
- Make typography support scanning: distinguish headings, project names, concise descriptions, labels, and metadata. Keep body copy readable and line lengths comfortable.
- Set an accurate page title and useful meta description. Use descriptive link text, meaningful image alternative text, and canonical/structured metadata only when supported by the project and actual content.
- Write for people first. Include relevant, natural terms describing the work; do not keyword-stuff, generate unsupported claims, or repeat boilerplate across project pages.
- Keep the visible content, document title, metadata, and social preview information consistent with the real portfolio.

## 6. Components and interaction states

Build reusable components when there is genuine repetition, such as project tiles, navigation items, tags, buttons, and section headers. Keep component APIs and styles consistent with the existing codebase; avoid abstracting one-off elements without a practical reason.

For every interactive component, account for its applicable states: default, hover, keyboard focus, active/pressed, selected, disabled, loading, and error/empty where relevant. State changes must be perceivable and must not rely on color alone. Preserve clear focus indicators and usable hit areas. Do not make a decorative card appear clickable unless it has a working action.

Use native links for navigation and buttons for actions. Make project links, filters, menus, and contact paths work as presented. Do not ship placeholder controls, dead links, fake form success, or interaction that changes layout unpredictably.

## 7. Assets and content integrity

- Prefer the project’s real supplied portfolio images, logos, fonts, and icons. Inspect available assets before replacing or creating them.
- Preserve image subject, crop intent, proportions, and quality from Figma or the source content. Use appropriate `object-fit` and responsive image sizing without distorting artwork.
- Do not invent projects, clients, outcomes, dates, metrics, testimonials, credentials, or biography details. Keep supplied copy accurate. If required content is missing, use a clearly marked temporary placeholder only during development and call it out before shipping.
- Use descriptive filenames and alt text when they add information. Use empty alt text for purely decorative imagery. Do not use an image’s filename as its alt text by default.
- Avoid emoji as interface icons and avoid arbitrary stock or generated imagery that competes with the actual work.

## 8. Motion and responsive behavior

- Motion is restrained and purposeful: clarify state, feedback, or spatial relationships. Keep transitions short, avoid distracting looping motion and parallax, and honor `prefers-reduced-motion`.
- Do not make essential information or navigation depend on animation, hover, or pointer precision.
- Design mobile-first or adapt the established project approach so the portfolio remains complete on narrow screens. Reflow Bento layouts without clipping, tiny controls, forced horizontal scrolling, or a broken reading order.
- Check intermediate widths as well as the smallest and largest supported viewports. Navigation, text, images, cards, and focus states must remain usable at each.

## 9. Accessibility and performance

- Use landmarks, semantic controls, logical DOM order, visible keyboard focus, and keyboard-operable interactions.
- Maintain readable contrast between the core light and dark surfaces. Do not assume the shadow creates text contrast. Provide labels for controls and useful accessible names for icon-only controls.
- Avoid conveying meaning through color alone. Add captions or text labels where a visual distinction matters.
- Give images intrinsic dimensions or an aspect ratio to limit layout shift. Optimize image formats and sizes using the project’s existing pipeline; lazy-load below-the-fold imagery where appropriate, not the main above-the-fold image.
- Avoid unnecessary dependencies, oversized assets, expensive effects, and avoidable layout shifts. Preserve the project’s existing performance and accessibility conventions.

## 10. Anti-AI-slop rules

- Do not default to a generic hero with oversized gradient text, floating blobs, glass panels, random decorative orbs, or a row of identical cards.
- Do not add arbitrary icons, badges, statistics, testimonials, copy, sections, or “creative” microcopy without evidence they belong to this portfolio.
- Do not apply Neumorphic shadows everywhere or add decoration that obscures the artwork.
- Do not make every element equally prominent. Use real content and layout hierarchy to create distinction.
- Prefer a small number of deliberate, consistent decisions over a pile of fashionable effects. When in doubt, remove decoration before reducing clarity.

## 11. Implementation workflow

1. **Inspect:** Read repository instructions, identify the app entry points, existing tokens/components, assets, routes, and available Figma reference. Do not assume a stack or replace project conventions.
2. **Frame the task:** Confirm which page or component is in scope, its purpose, audience, primary user job, visual direction, and differentiator from the design intent above. If the task is narrowly scoped, use the existing page context instead of asking redundant questions.
3. **Map reference to code:** Identify layout, typography, color, spacing, radius, shadows, assets, states, and responsive behavior from Figma. Record only unresolved details that affect fidelity.
4. **Implement:** Use tokens and reusable components where appropriate. Keep changes scoped to the request and preserve content integrity.
5. **Review:** Inspect the rendered result at relevant desktop, intermediate, and mobile widths. Compare it with the approved Figma/reference, not just with the source code. Check image crops, hierarchy, spacing, responsive reflow, and interactive states.
6. **Correct:** Fix visible discrepancies and usability issues before reporting completion. Do not claim visual verification unless the rendered page was actually inspected.

When no browser or rendering path is available, complete code-level review and explicitly state that rendered verification and Figma comparison could not be performed. Do not fabricate verification.

## 12. Review severity

Report findings by practical impact:

- **P0 — Blocker:** The page cannot be used, content is materially false, or a critical accessibility/security issue prevents safe use.
- **P1 — High:** Primary portfolio viewing or navigation is broken; a major Figma mismatch, responsive failure, or important interaction blocks the main user job.
- **P2 — Medium:** Noticeable hierarchy, visual fidelity, state, accessibility, or performance defect that does not block the main path.
- **P3 — Low:** Minor polish inconsistency with limited user impact.

Describe the observed issue and its effect. Do not inflate cosmetic preferences into blockers. If there are no findings, say so and note any meaningful verification limits.

## 13. Final ship gate

Before calling a change ready, confirm all that apply:

- [ ] The result serves the portfolio’s purpose and makes selected work easy to see and explore.
- [ ] User instructions and the correct source-of-truth order were followed; assumptions are minimal and disclosed.
- [ ] The core palette, exact shadow values, 10px default radius, and even-number sizing/spacing rule are preserved.
- [ ] Bento hierarchy, eye flow, semantic heading order, and reading order are clear.
- [ ] Real content and assets are intact; no claims, projects, or outcomes were invented.
- [ ] Relevant components and interaction states work, including keyboard focus.
- [ ] Responsive behavior, accessibility, and performance have been reviewed for the changed scope.
- [ ] The rendered result was inspected and compared with Figma when available, or the limitation is stated.
- [ ] No P0/P1 findings remain; any P2/P3 items are either resolved or explicitly reported.
- [ ] The completion summary says what changed, what was verified, and any remaining limitation.

Do not mark the work shipped while a known P0 or P1 issue remains. Do not claim a check that was not performed.
