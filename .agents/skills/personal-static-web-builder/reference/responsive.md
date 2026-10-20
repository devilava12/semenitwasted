# Responsive Design

This document defines the default responsive behavior for the personal static web builder.

The responsive system extends the visual rules in `references/design-system.md`. Its purpose is to make each page feel intentionally designed at every viewport rather than treating mobile as a smaller desktop layout.

Explicit user instructions or an approved design reference may override these defaults.

Sections 1 to 22 are the core rules. Sections 23 to 30 add implementation details: breakpoint and media query patterns, layout CSS, viewport and browser behavior, images and tables, a navigation pattern, two check scripts, and additional checks.

---

## 1. Responsive philosophy

Design responsively as a continuous system.

The page should preserve its:

- visual identity
- content hierarchy
- reading order
- interaction clarity
- spacing rhythm
- image integrity
- accessibility

across desktop, tablet, and mobile.

Do not simply shrink desktop elements until they fit.

When space becomes constrained, change the composition intentionally.

Build mobile-first. Write the base CSS for the narrowest layout, then add `min-width` media queries as space grows (section 23). The order of elements in the HTML is the mobile reading order (section 19).

---

## 2. Default breakpoints

No project-specific breakpoint is required by default.

Use broadly accepted responsive breakpoints when a project does not already define its own system.

Baseline:

```text
Mobile:  < 768px
Tablet:  768px–1023px
Desktop: ≥ 1024px
```

These are practical layout ranges, not rigid requirements.

A component may change behavior at a nearby width when necessary to prevent:

- clipping
- awkward wrapping
- unusable controls
- excessive density
- broken visual hierarchy

Do not introduce many breakpoint-specific exceptions.

Prefer fluid behavior where possible.

The baseline ranges map to two `min-width` queries, at 768px and 1024px (section 23). Treat these as the only default breakpoints. Add another only when one specific component breaks between them.

Grid columns, gutters, and section gaps in this file all change at these two points.

---

## 3. Grid behavior

Use the default grid system from the design system:

```text
Desktop: 12 columns
Tablet:   8 columns
Mobile:   4 columns
```

### Desktop

Use the full 12-column structure for major page composition.

Allow content to span multiple columns according to importance.

Do not make every section symmetrical when asymmetry improves hierarchy.

### Tablet

Reduce the composition to 8 columns.

Re-evaluate:

- Bento spans
- card widths
- navigation
- image sizes
- text measure
- section spacing

Do not simply preserve desktop column spans if they create awkward empty areas.

### Mobile

Use 4 columns as the underlying grid.

In many sections, content may naturally span all four columns.

Stack related content when that produces a clearer reading path.

Do not preserve desktop asymmetry if it harms readability.

Gutters are 24px on desktop, 20px on tablet, and 16px on mobile (`design-system.md`). Layout patterns are in section 24.

A span must never exceed the number of columns in the current grid. For example, `grid-column: span 6` on a 4-column grid creates extra implicit columns and can push content past the viewport. Give each item an explicit span for each of the three grids.

Use `min-width: 0` on grid and flex children that hold long text.

---

## 4. Container behavior

Use the global container system from `design-system.md`.

Baseline desktop content width:

```text
max-width: 1200px
```

The container should remain fluid below its maximum width.

At narrower widths, use horizontal padding rather than fixed-width content.

Do not allow the viewport itself to become horizontally scrollable.

Do not use `100vw` for widths. It includes the scrollbar width on some systems and can cause horizontal overflow. Use `100%` or `max-width` instead (example in section 24).

---

## 5. Mobile horizontal padding

Default mobile horizontal padding:

```text
16px
```

Use:

```text
24px
```

when the page benefits from a more spacious composition.

Other even-number values are allowed when a specific layout requires them.

Examples:

```text
12px
16px
20px
24px
32px
```

Do not use odd-number padding values.

Choose the smallest value that maintains the intended visual breathing room without making content unnecessarily narrow.

Do not make every mobile section use a different padding value without a structural reason.

`design-system.md` defines a fluid page padding, `clamp(16px, 4vw, 48px)`. It gives 16px up to about 400px wide, 24px at 600px, and 48px at 1200px. This is an acceptable implementation of this section: on phones it gives 16px and it never goes below 16px.

The even-number rule applies to the endpoints (16px and 48px). Values between them are interpolated and may be odd.

If a fixed value is preferred, use 16px or 24px below 768px. Do not combine a fixed mobile padding and the fluid padding on the same container.

---

## 6. Spacing transformation

Responsive spacing should scale with available space.

Desktop can use the larger values from the design system.

Tablet should reduce spacing when necessary.

Mobile should preserve hierarchy while reducing excessive vertical distance.

Do not mechanically divide every desktop spacing value.

For example:

```text
Desktop section gap: 96px
Tablet section gap: 64px
Mobile section gap: 48px
```

is preferable to blindly applying the same value everywhere.

All chosen values should remain even numbers and preferably belong to the established spacing scale.

A token version of the example above (48, 64, and 96 are all on the spacing scale):

```css
:root { --section-gap: 48px; }
@media (min-width: 768px)  { :root { --section-gap: 64px; } }
@media (min-width: 1024px) { :root { --section-gap: 96px; } }
```

Gutters change at the same two points: 16px, 20px, 24px.

---

## 7. Typography behavior

Typography should remain readable rather than simply scaling proportionally.

At smaller widths:

- reduce display sizes when necessary
- preserve hierarchy
- prevent awkward wrapping
- keep body text comfortable
- maintain reasonable line length

Do not allow headings to create avoidable horizontal overflow.

Do not reduce body text below a comfortable reading size simply to fit more content.

Use responsive type sizing when it produces smoother transitions, but keep the resulting system visually consistent.

The fluid type scale, its tokens, and the resizing rules are in `typography.md` sections 27 and 29. Do not redefine heading sizes in per-breakpoint media queries when a fluid token already covers the range.

---

## 8. Navigation

Navigation must adapt intentionally.

Desktop may use the established full navigation.

At narrower widths, use an appropriate compact pattern such as:

- wrapped navigation when it remains usable
- condensed navigation
- menu/disclosure pattern

Do not allow navigation items to collide, become unreadable, or force horizontal page scrolling.

The navigation should remain understandable without relying on hover.

If a menu is introduced, it must be keyboard accessible and have a clear open/close state.

A pattern that works without JavaScript is in section 27.

Choose the collapse point from the content. Collapse the navigation when its items no longer fit on one or two lines, not at a fixed device width.

---

## 9. Bento responsive behavior

Bento layouts require deliberate reflow.

### Desktop

Use varied spans to establish hierarchy.

Example:

```text
large feature: 6 columns
secondary item: 3 columns
secondary item: 3 columns
```

### Tablet

Recalculate spans against the 8-column grid.

Do not blindly preserve desktop dimensions.

### Mobile

Prioritize reading order over visual asymmetry.

Typical behavior:

```text
featured item
↓
supporting item
↓
supporting item
↓
next content group
```

Bento items may become full-width or grouped stacks.

Do not create tiny cards simply to preserve a desktop composition.

Do not use forced horizontal scrolling for ordinary content.

Span rules:

- every Bento item has an explicit span for the 4, 8, and 12 column grids, or the page uses the single auto-fit pattern in section 24.
- the feature example above becomes 4 of 4 on mobile, 8 of 8 on tablet, and 6 of 12 on desktop.

Shadow clipping: the primary shadow extends about 34px past the right and bottom edges of its surface (`design-system.md`). With 16px mobile padding, that shadow can be visually cut at the viewport edge. It does not cause scrolling, but it looks clipped. Options: leave extra right and bottom space around the group, or use the smaller `--shadow-depth` on narrow cards. Check it at 320px.

---

## 10. Cards

Cards should adapt their dimensions and internal spacing.

Desktop:

- allow larger widths
- use multi-column composition
- preserve signature depth

Tablet:

- reduce unnecessary internal spacing
- adjust content spans
- prevent overly narrow cards

Mobile:

- stack where appropriate
- use full or near-full content width
- preserve readable internal padding
- avoid excessively tall cards caused by poor content wrapping

Card padding must remain on the even-number scale.

Do not reduce padding so far that the card loses its tactile character.

Starting values (derived, even numbers):

```text
Desktop card padding: 24–32px
Tablet card padding:  24px
Mobile card padding:  16–20px
Gap between cards:    the current gutter (24 / 20 / 16px)
```

Do not put a scrolling area inside a card. Use `min-width: 0` and `overflow-wrap: anywhere` on card text instead.

---

## 11. Images and media

Images must remain proportional across viewport sizes.

Prefer:

- responsive width
- intrinsic dimensions
- explicit aspect ratios when appropriate
- controlled object fitting

Do not:

- stretch images
- crop important content accidentally
- create layout shifts
- allow media to exceed its container

When an image is intended as a major visual element, preserve its visual prominence even on mobile rather than shrinking it into an insignificant thumbnail.

Implementation is in section 26: `max-width: 100%`, `height: auto`, `width` and `height` attributes, `aspect-ratio`, and `srcset` with `sizes` so phones do not download desktop-size files (see `performance.md`).

---

## 12. Buttons and touch targets

Interactive controls must remain usable on touch devices.

Prefer comfortable touch targets around:

```text
44px × 44px
```

when appropriate.

Button padding should remain consistent with the design system.

At mobile widths:

- allow button groups to wrap
- stack actions when necessary
- prevent labels from becoming cramped
- preserve clear primary/secondary hierarchy

Do not force multiple buttons onto one line when doing so harms usability.

Also:

- 44px is the design target. WCAG 2.2 sets 24 CSS px as the minimum at level AA and 44px at level AAA.
- keep at least 8px between adjacent targets.
- inline links inside a sentence are exempt from the size target, but keep a comfortable line height.
- a button group can use `display: flex; flex-wrap: wrap; gap: 12px`. On mobile, consider a full-width primary action.

---

## 13. Forms

Forms should adapt to available width.

Desktop may use multiple columns when fields are logically related.

Tablet and mobile should stack fields when necessary.

Inputs should:

- remain easy to tap
- have readable labels
- avoid horizontal overflow
- maintain adequate vertical spacing

Do not use fixed-width form controls that exceed narrow screens.

Also:

- use `width: 100%` with a `max-width`, and `min-width: 0` inside flex or grid.
- input text is 16px or larger (`typography.md` section 30).
- use the right `type`, `autocomplete`, and `inputmode` so the mobile keyboard fits the field.
- keep labels above fields on mobile.
- do not pin a fixed bar over a form. The on-screen keyboard reduces the visible height.

---

## 14. Interaction behavior

Every important interaction must work without hover.

Hover can enhance the desktop experience, but it must never be the only way to:

- reveal content
- activate navigation
- access controls
- understand an action

On touch devices, avoid hover-dependent behavior.

Use focus states that remain visible and accessible.

Do not introduce different functionality solely because a device has a pointer.

Also:

- wrap hover effects in `@media (hover: hover) and (pointer: fine)` (see `animation.md`). Keep `:active` and `:focus-visible` feedback outside it.
- do not use a tooltip or `title` attribute as the only way to understand an icon button.
- any swipe or long-press gesture needs a visible alternative.

---

## 15. Motion across breakpoints

Motion should remain subtle at all viewport sizes.

On mobile:

- reduce unnecessary movement
- avoid large transforms
- avoid animations that make scrolling feel heavy
- avoid motion that interferes with touch interaction

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* reduce or disable non-essential motion */
}
```

Responsive layout changes should not create distracting animation.

Detailed animation behavior is defined in `references/animation.md`.

Also:

- use the lower end of the reveal distance on mobile (about 8 to 12px). See `animation.md` section 20.
- do not animate layout properties (`width`, `height`, `top`, `left`) when the layout reflows.
- do not transition between a mobile and a desktop layout when the viewport is resized.
- disable pointer-driven effects (magnetic, parallax) on touch devices using the `(hover: hover) and (pointer: fine)` guard.
- many large shadows animating at once can make scrolling heavy on low-end phones (see `performance.md`).

---

## 16. Overflow rules

Page-level horizontal overflow is not acceptable.

Check for:

- wide images
- long headings
- long URLs
- oversized buttons
- fixed-width components
- navigation
- Bento items
- code/content blocks
- transformed elements

Use:

- `min-width: 0` where appropriate
- wrapping
- fluid widths
- controlled local scrolling only when the content genuinely requires it

Do not solve ordinary layout problems by adding:

```css
overflow-x: auto;
```

to the entire page.

Local horizontal scrolling may be appropriate for genuinely wide content such as tables or specialized media.

Common causes of page-level overflow:

- `100vw` widths
- fixed `width` in px
- negative margins
- absolutely positioned decoration
- off-canvas elements moved with `transform: translateX()`
- unbroken strings and long URLs
- images, video, or iframes without `max-width: 100%`
- `white-space: nowrap`
- flex or grid children without `min-width: 0`
- `minmax()` with a large minimum

A local scroll container should be keyboard reachable:

```html
<div class="scroll-x" tabindex="0" role="region" aria-label="Tabel harga">
  <table>...</table>
</div>
```

```css
.scroll-x { overflow-x: auto; max-width: 100%; }
```

Do not hide an overflow problem with `overflow-x: hidden` or `overflow-x: clip` on `html` or `body`. That hides the symptom, can break `position: sticky`, and may cut off content. Find the element that causes it (section 28).

---

## 17. Intermediate widths

Do not validate only:

```text
mobile
desktop
```

Also inspect intermediate widths.

A layout that works at 390px and 1440px may still fail at:

```text
768px
900px
1024px
1200px
```

Check for:

- awkward wraps
- oversized whitespace
- broken column spans
- navigation collisions
- card compression
- image crops
- typography issues

Fix the underlying layout rule instead of adding a breakpoint-specific patch whenever possible.

Typical fixes are:

- `repeat(auto-fit, minmax(min(100%, 260px), 1fr))` for card lists
- `flex-wrap: wrap`
- `clamp()` for sizes
- `max-width` in `ch` for text
- container queries for components that appear at different widths (section 23)

Also test one pixel either side of the two breakpoints: 767 and 768, 1023 and 1024. Many layout bugs appear only there.

---

## 18. Responsive visual density

The default design system is spacious.

Preserve that character across breakpoints.

On mobile, spaciousness should come from:

- intentional vertical rhythm
- clear section separation
- comfortable component padding
- readable content

not from unnecessarily large empty areas.

Do not compress everything simply because the viewport is small.

Do not make the page excessively long merely to preserve desktop spacing.

Use the section-gap tokens from section 6 (96 / 64 / 48px). Check nested spacing. Section padding, container padding, card padding, and margins should not stack into a larger gap than intended, especially on mobile.

---

## 19. Responsive reading order

The DOM and visual reading order should remain logical.

When a multi-column desktop layout becomes a stacked mobile layout:

1. primary content should appear first
2. supporting content should follow
3. related content should remain grouped
4. decorative elements should not interrupt important information

Do not rely on CSS ordering to create a completely different information hierarchy unless there is a clear accessibility and UX reason.

`order`, `grid-area`, and `flex-direction: row-reverse` or `column-reverse` change the visual order but not the HTML order or the tab order. If they are used, the visual order, tab order, and reading order must still make sense together. When in doubt, reorder the HTML instead.

If the header is sticky, set `scroll-padding-top` (or `scroll-margin-top` on targets) to the header height so focused elements and anchor targets are not hidden behind it.

On mobile, the H1 and the page's primary purpose should be visible without scrolling past a large decorative area.

---

## 20. Responsive validation

Before considering a page ready, inspect at minimum:

### Mobile

- approximately 320px
- approximately 390px

### Tablet

- approximately 768px
- approximately 900px

### Desktop

- approximately 1024px
- approximately 1200px
- a wider desktop viewport when relevant

The exact test widths may vary by available tooling.

Check:

- no page-level horizontal overflow
- navigation
- typography
- spacing
- card dimensions
- Bento reflow
- image proportions
- button/touch targets
- forms
- focus states
- animation behavior

`SKILL.md` section 16 lists a quick minimum set (375, 768, 1024, and 1280px). The list above is the full set. Use the full set when tools allow it, and at least the `SKILL.md` set when they do not.

Also check:

- one pixel either side of each breakpoint (767 and 768, 1023 and 1024)
- a landscape phone, for example 844 × 390, when the page has a sticky header or a full-height section
- 200% zoom (see `typography.md` section 29)

Commands are in sections 28 and 29. State in the completion summary which widths were tested and which were not.

---

## 21. Responsive exception rule

The default responsive system may be adapted when a page has a genuine structural requirement.

Examples:

- a data-heavy table
- a specialized visual experiment
- a wide image composition
- a unique navigation pattern
- a deliberately art-directed layout

When deviating from the default system:

- keep the exception scoped
- preserve usability
- preserve the design identity where possible
- prefer even-number values
- avoid introducing unnecessary breakpoints

Do not create responsive exceptions merely to preserve a desktop layout that should have been redesigned for the smaller viewport.

Scope each exception to its own class and mention it in the completion summary. A wide data table is the usual valid case: let it scroll locally (section 16).

---

## 22. Responsive final check

Before shipping, confirm:

- [ ] Desktop uses the 12-column system where appropriate.
- [ ] Tablet adapts to the 8-column system.
- [ ] Mobile uses the 4-column system where appropriate.
- [ ] Container behavior remains fluid and consistent.
- [ ] Mobile horizontal padding uses 16px or 24px by default.
- [ ] Any exceptional spacing values remain even numbers.
- [ ] Bento sections reflow intentionally.
- [ ] Cards remain usable and visually consistent.
- [ ] Typography remains readable.
- [ ] Navigation remains usable.
- [ ] Buttons and controls remain touch-friendly.
- [ ] Images preserve proportions and intended emphasis.
- [ ] No page-level horizontal overflow exists.
- [ ] Intermediate widths have been considered.
- [ ] Motion remains subtle and reduced-motion behavior is respected.
- [ ] The mobile page feels intentionally designed rather than compressed from desktop.

---

## 23. Breakpoints and media query patterns

Write mobile-first. The base CSS is the mobile layout (below 768px), and `min-width` queries add layout as space grows.

```css
/* base: mobile, below 768px */

@media (min-width: 768px)  { /* tablet and up */ }
@media (min-width: 1024px) { /* desktop */ }

/* tablet only: use rarely */
@media (min-width: 768px) and (max-width: 1023.98px) { }
```

Rules:

- CSS custom properties cannot be used inside media query conditions. Write the numbers.
- if `em` units are preferred, 48em and 64em equal 768px and 1024px at the default font size.
- avoid `max-width` queries except for a tablet-only range.
- do not use `device-width` or `device-height` in media queries.
- keep to two breakpoints by default. Four distinct values is already a lot.

Container queries are an enhancement for components that appear at different widths:

```css
.card-host { container-type: inline-size; }

@container (min-width: 480px) {
  .card { grid-template-columns: 1fr 1fr; }
}
```

Give the component a working single-column base layout first, so a browser without container query support still shows a usable layout.

Short landscape screens (phones turned sideways) need their own check when the page has sticky or full-height parts:

```css
@media (max-height: 500px) and (orientation: landscape) {
  .site-header { position: static; }
}
```

---

## 24. Layout patterns

Starting patterns for the grid, container, and section spacing. They use tokens from `design-system.md` section 21 (`--gutter`, `--page-pad`) and the section-gap tokens from section 6.

```css
.container {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--page-pad);
}

.section { padding-block: var(--section-gap); }

/* 4 / 8 / 12 column grid. minmax(0, 1fr) stops long content from widening columns. */
.grid {
  display: grid;
  gap: var(--gutter);
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
@media (min-width: 768px)  { .grid { grid-template-columns: repeat(8, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(12, minmax(0, 1fr)); } }

/* Bento: feature 6 + item 3 + item 3 on desktop */
.span-feature { grid-column: 1 / -1; }                                   /* mobile: 4 of 4 */
@media (min-width: 768px)  { .span-feature { grid-column: span 8; } }    /* tablet: 8 of 8 */
@media (min-width: 1024px) { .span-feature { grid-column: span 6; } }    /* desktop: 6 of 12 */

.span-item { grid-column: 1 / -1; }                                      /* mobile: 4 of 4 */
@media (min-width: 768px)  { .span-item { grid-column: span 4; } }       /* tablet: 4 of 8 */
@media (min-width: 1024px) { .span-item { grid-column: span 3; } }       /* desktop: 3 of 12 */

/* Uniform card list without breakpoints */
.cards {
  display: grid;
  gap: var(--gutter);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
}

html { scroll-padding-top: var(--header-h, 0px); }
```

Notes:

- `--header-h` is the height of a sticky header. Omit the rule when the header is not sticky.
- on tablet, the feature item takes the full row and the items sit two per row. Check that no row is left with one lonely small card.
- do not use `.span-*` classes outside a `.grid`.

---

## 25. Viewport, browser UI, and orientation

- every page has `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- never add `user-scalable=no` or a low `maximum-scale`. They block pinch zoom, which people with low vision rely on.
- `100vh` on mobile includes the area behind the browser's address bar, so full-height sections can be cut off or jump. Prefer `min-height` over `height` and use a fallback pair:

```css
.hero { min-height: 100vh; min-height: 100dvh; }
```

- most pages do not need a full-screen hero. Do not add one only to fill the first screen.
- do not add `viewport-fit=cover` unless the design is intentionally edge to edge. If it is used, protect fixed bars with `padding-bottom: env(safe-area-inset-bottom)` and the matching left and right insets.
- test short landscape screens (section 23).
- text enlargement and zoom are covered in `typography.md` section 29.

---

## 26. Images, media, tables, and embeds

```css
img, video { max-width: 100%; height: auto; }
img { display: block; }

.media { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }

.embed { width: 100%; aspect-ratio: 16 / 9; border: 0; }
```

Responsive image example. The file names are examples only and must match real files:

```html
<img
  src="/assets/img/work-800.webp"
  srcset="/assets/img/work-480.webp 480w, /assets/img/work-800.webp 800w, /assets/img/work-1200.webp 1200w"
  sizes="(min-width: 1024px) 560px, 100vw"
  width="1200" height="900"
  alt="[Deskripsi gambar]">
```

Rules:

- always set `width` and `height` attributes, so the browser reserves space and the layout does not shift.
- `sizes` describes how wide the image is in the layout. Update it when the layout changes.
- use `<picture>` with `media` only when the crop must differ by viewport (art direction). Otherwise use `srcset`.
- use `object-position` to keep the important part of a cropped image visible.
- do not lazy-load the main image at the top of the page (see `performance.md`).
- iframes and video embeds use the `.embed` ratio box and never a fixed pixel width.
- tables: let a wide table scroll locally in a focusable wrapper (section 16), or restructure it into stacked rows on mobile when the content allows it. Keep real `<th>` cells either way.
- inline SVG icons scale with `em` or a fixed size and sit inside a target that is at least 44px.

---

## 27. Navigation pattern that works without JavaScript

Without JavaScript the list of links stays visible and wraps. With JavaScript, a button collapses it below 768px. The `.js` flag is set by the small inline script described in `animation.md`.

```html
<script>document.documentElement.classList.add('js')</script>

<nav aria-label="Utama">
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-list">Menu</button>
  <ul class="nav-list" id="nav-list">
    <li><a href="/about/">Tentang</a></li>
    <li><a href="/work/">Karya</a></li>
    <li><a href="/contact/">Kontak</a></li>
  </ul>
</nav>
```

```css
.nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8) var(--space-16);
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-list a { display: inline-flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; }

.nav-toggle { display: none; min-width: 44px; min-height: 44px; font: inherit; }

/* JavaScript on: collapse below 768px */
.js .nav-toggle { display: inline-flex; align-items: center; }
.js .nav-list { display: none; flex-direction: column; }
.js .nav-list.is-open { display: flex; }

@media (min-width: 768px) {
  .js .nav-toggle { display: none; }
  .js .nav-list { display: flex; flex-direction: row; }
}
```

```js
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('.nav-list');

function setOpen(open) {
  list.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
}

toggle.addEventListener('click', () => setOpen(!list.classList.contains('is-open')));
list.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && list.classList.contains('is-open')) {
    setOpen(false);
    toggle.focus();
  }
});
```

Notes:

- the nav uses a `<button>`, not a link, because it performs an action.
- hiding with `display: none` also removes the closed menu from the keyboard and screen reader order.
- the collapse width of 768px is the default. Move it if the real items need more room (section 8).
- an animated slide-in menu is described in `animation.md`. Animate `transform` and `opacity` only.
- a small site with two or three links may not need a toggle. Let the list wrap.

---

## 28. Checking with a headless browser

If a headless browser is available, measure instead of guessing. The script below loads every HTML file at several widths from a local server, reports horizontal overflow and the elements that cause it, reports overflow that is masked by `overflow-x: hidden`, and lists tap targets under 44px as notes. Optionally it saves full-page screenshots, so the result can be looked at.

Requirements: Python with Playwright and a Chromium browser already installed. Do not download browsers during a task. If Playwright is missing, use section 29.

Save as `responsive-check.py` outside the deployed output directory, then run:

```sh
python3 -I responsive-check.py <output-dir> --widths 320,390,768,900,1024,1200,1440 --shots <screenshot-dir>
```

```python
import argparse, functools, http.server, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument('root')
ap.add_argument('--widths', default='320,390,768,900,1024,1200,1440')
ap.add_argument('--shots', default='')
args = ap.parse_args()

root = Path(args.root).resolve()
widths = [int(w) for w in args.widths.split(',')]
pages = sorted(p for p in root.rglob('*.html') if not p.name.startswith('_') and 'node_modules' not in p.parts)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

handler = functools.partial(Quiet, directory=str(root))
server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
threading.Thread(target=server.serve_forever, daemon=True).start()
base = 'http://127.0.0.1:%d' % server.server_address[1]

JS = """
() => {
  const de = document.documentElement, vw = de.clientWidth;
  const name = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
    ((typeof el.className === 'string' && el.className.trim()) ? '.' + el.className.trim().split(/\\s+/).join('.') : '');
  const contained = el => {
    for (let p = el.parentElement; p && p !== document.body && p !== de; p = p.parentElement) {
      const o = getComputedStyle(p).overflowX;
      if (o !== 'visible') return true;
    }
    return false;
  };
  const wide = [], small = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (cs.position !== 'fixed' && (r.right > vw + 1 || r.left < -1) && !contained(el)) wide.push(name(el) + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
    if (vw <= 1024 && el.matches('a,button,input:not([type=hidden]),select,textarea,summary') && cs.display !== 'inline') {
      if (r.width < 44 || r.height < 44) small.push(name(el) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
    }
  }
  const mask = [de, document.body].filter(e => ['hidden', 'clip'].includes(getComputedStyle(e).overflowX)).map(e => e.tagName.toLowerCase());
  return { scroll: de.scrollWidth - vw, wide: wide.slice(0, 5), small: small.slice(0, 5), nsmall: small.length, mask: mask,
           viewport: !!document.querySelector('meta[name=viewport]') };
}
"""

problems = 0
with sync_playwright() as pw:
    browser = pw.chromium.launch()
    for p in pages:
        rel = p.relative_to(root).as_posix()
        url = base + '/' + (rel[:-10] if rel.endswith('index.html') else rel)
        for w in widths:
            ctx = browser.new_context(viewport={'width': w, 'height': 800})
            page = ctx.new_page()
            page.goto(url, wait_until='load')
            res = page.evaluate(JS)
            msgs = []
            if not res['viewport']:
                msgs.append('no viewport meta')
            if res['scroll'] > 0:
                msgs.append('page scrolls horizontally by %dpx' % res['scroll'])
            if res['wide']:
                msgs.append('extends past viewport: ' + '; '.join(res['wide']))
            if res['mask']:
                msgs.append('overflow-x hidden/clip on %s can hide overflow' % ','.join(res['mask']))
            if args.shots:
                out = Path(args.shots)
                out.mkdir(parents=True, exist_ok=True)
                page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
                page.wait_for_timeout(600)
                page.evaluate('window.scrollTo(0, 0)')
                page.screenshot(path=str(out / ('%s-%d.png' % (rel.replace('/', '_').replace('.html', ''), w))), full_page=True)
            status = 'ok' if not msgs else 'PROBLEM'
            print('%-28s %5dpx  %s' % (rel, w, status))
            for m in msgs:
                problems += 1
                print('    ! ' + m)
            if res['nsmall']:
                print('    note: %d control(s) under 44px: %s' % (res['nsmall'], '; '.join(res['small'])))
            ctx.close()
    browser.close()
server.shutdown()
print('\n%d problem(s)' % problems)
sys.exit(1 if problems else 0)
```

How to read it:

- `PROBLEM` lines are failures to fix. Fix the cause named in the line, not the symptom.
- `note:` lines about controls under 44px are informational. Inline text links are not reported. Review each note against section 12.
- screenshots are taken after scrolling to the bottom and back, so scroll-reveal elements are visible. Open the PNG files and look at them. The script cannot judge whether the layout looks intentional.
- the script reports only what it measured. State in the completion summary which widths were checked.

---

## 29. Checking without a browser

When no browser is available, this script reads the CSS (including `<style>` blocks) and HTML. It cannot see the rendered layout, so it finds risky patterns only.

Save as `responsive-static-check.py` outside the deployed output directory, then run `python3 -I responsive-static-check.py <output-dir>`:

```python
import re, sys
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
skip = ('node_modules', '.git')
problems = 0

def flag(where, msg):
    global problems
    problems += 1
    print("  ! %s: %s" % (where, msg))

files = [p for p in root.rglob('*') if p.suffix in ('.css', '.html') and not any(s in p.parts for s in skip)]
breakpoints = set()
max_q = min_q = 0

for p in sorted(files):
    raw = p.read_text(encoding='utf-8', errors='replace')
    rel = p.relative_to(root)
    css = '\n'.join(re.findall(r'<style[^>]*>(.*?)</style>', raw, re.S | re.I)) if p.suffix == '.html' else raw
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)

    if p.suffix == '.html' and not p.name.startswith('_'):
        m = re.search(r'<meta[^>]+name=["\']viewport["\'][^>]*>', raw, re.I)
        if not m:
            flag(rel, "missing <meta name=viewport>")
        elif re.search(r'user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*[01](\.\d+)?\b', m.group(0), re.I):
            flag(rel, "viewport blocks zoom (user-scalable=no or maximum-scale below 2)")
        for im in re.finditer(r'<img\b[^>]*>', raw, re.I):
            tag = im.group(0)
            if not (re.search(r'\bwidth=', tag, re.I) and re.search(r'\bheight=', tag, re.I)):
                flag(rel, "img without width/height: " + tag[:70])

    if not css.strip():
        continue
    for q in re.findall(r'@media[^{]*', css):
        for kind, val in re.findall(r'(min|max)-width\s*:\s*(\d+(?:\.\d+)?)px', q):
            breakpoints.add(int(float(val)))
            if kind == 'max':
                max_q += 1
            else:
                min_q += 1
        if 'device-width' in q or 'device-height' in q:
            flag(rel, "uses device-width/height in a media query: " + q.strip()[:60])
    if re.search(r'100vw', css):
        flag(rel, "100vw found (can cause horizontal overflow when a scrollbar is present)")
    if re.search(r'(?<![-\w])(min-)?height\s*:\s*100vh', css):
        flag(rel, "100vh found (mobile browser bars: consider dvh/svh with a vh fallback)")
    if re.search(r'(?:^|[},\s])(html|body)\s*(?:,\s*(?:html|body)\s*)?\{[^}]*overflow-x\s*:\s*(hidden|clip)', css):
        flag(rel, "overflow-x hidden/clip on html or body (fix the cause instead)")
    for m in re.finditer(r'(?<![-\w])(width|min-width)\s*:\s*(\d+)px\s*[;}]', css):
        if int(m.group(2)) > 320:
            flag(rel, "fixed %s: %spx (check it at 320px)" % (m.group(1), m.group(2)))
    for m in re.finditer(r'(?<![-\w])(padding|margin|gap|row-gap|column-gap)(?:-[a-z]+)?\s*:\s*([^;}]+)', css):
        for px in re.findall(r'(?<![\w.-])(\d+)px', m.group(2)):
            if int(px) > 2 and int(px) % 2:
                flag(rel, "odd px spacing value: %s: %s" % (m.group(1), m.group(2).strip()))
                break

print("media query widths used (px): %s" % (sorted(breakpoints) or 'none'))
print("min-width queries: %d, max-width queries: %d" % (min_q, max_q))
if len(breakpoints) > 4:
    flag('css', "more than 4 distinct breakpoints; prefer fixing the underlying rule")
if max_q > min_q and max_q > 0:
    flag('css', "more max-width than min-width queries (prefer mobile-first)")
print("\n%d problem(s)" % problems)
sys.exit(1 if problems else 0)
```

It reports: a missing viewport meta, a viewport that blocks zoom, `<img>` without `width` and `height`, `device-width` media queries, `100vw`, `100vh`, `overflow-x: hidden` or `clip` on `html` or `body`, fixed widths above 320px, odd `px` spacing values, more than four distinct breakpoints, and more `max-width` than `min-width` queries.

A reported item is not always an error. A fixed width inside a scroll container may be intended. Confirm each item and say in the completion summary which ones are intentional. This script does not replace looking at the page at the widths in section 20.

---

## 30. Additional checks

Add to the checklist in section 22:

### Breakpoints and grid

- [ ] CSS is mobile-first, with `min-width` queries at 768px and 1024px
- [ ] No more than a few distinct breakpoints exist, and each extra one has a reason
- [ ] Every Bento item has a span for the 4, 8, and 12 column grids
- [ ] No span exceeds the columns of the current grid
- [ ] Gutters are 16 / 20 / 24px and section gaps are 48 / 64 / 96px

### Overflow

- [ ] No `100vw` widths, and no `overflow-x: hidden` on `html` or `body` used to hide a problem
- [ ] Wide tables and code scroll inside a focusable wrapper
- [ ] Layout was checked one pixel either side of 768px and 1024px
- [ ] Signature shadows are not visibly cut at the viewport edge on mobile

### Viewport and media

- [ ] The viewport meta is present and does not block zoom
- [ ] Full-height sections use `min-height` with a `dvh` fallback pair
- [ ] Images have `width`, `height`, and (for large images) `srcset` with accurate `sizes`
- [ ] Embeds use an aspect-ratio box and no fixed pixel width

### Interaction and order

- [ ] Navigation is usable with JavaScript off, and the menu button has `aria-expanded`
- [ ] Hover effects are limited to `(hover: hover) and (pointer: fine)`
- [ ] Visual order, tab order, and reading order agree
- [ ] A sticky header does not hide focused elements or anchor targets
- [ ] The widths tested, and any not tested, are stated in the completion summary