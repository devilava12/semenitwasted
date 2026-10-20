# Personal Web Design System

This document defines the default visual language for the personal static web builder.

Use these rules whenever the user does not explicitly provide a different visual direction. The system is derived from the established semenitwasted visual identity and is intended to keep independently generated pages visually related even when the page purpose changes.

Explicit user instructions may override these defaults.

---

## 1. Design character

The default visual character is:

- personal
- minimal
- spacious
- tactile
- monochrome
- quietly expressive
- content-first
- polished without looking corporate or generic

The visual system should feel intentionally designed, not like a generic AI-generated template.

Favor clarity, hierarchy, rhythm, and composition over decorative complexity.

---

## 2. Core color system

The default palette is intentionally monochrome.

```css
:root {
  --color-light: #F0EDF4;
  --color-dark: #211B28;
  --color-shadow: #450D50;
}
```

### Usage

**Light surface**

`#F0EDF4`

Use as the primary light page/surface color.

**Dark surface / primary text**

`#211B28`

Use for dark surfaces, primary text, strong contrast, navigation emphasis, and primary controls when appropriate.

**Shadow**

`#450D50`

Reserved primarily for the signature depth/shadow system.

Do not introduce decorative accent colors, gradients, or additional palette colors by default.

Semantic colors such as success, warning, error, and info are allowed when a functional state genuinely requires them. Keep them restrained and do not use them as decorative accents.

Images and user-supplied artwork may naturally contain their own colors.

Lower-emphasis text (labels, metadata, supporting text) uses `--color-dark` at a reduced opacity instead of a new gray. See section 22. Semantic colors are defined only when a state needs them: choose values that reach at least 4.5:1 contrast on `--color-light`, and always pair them with text or an icon so color is never the only signal.

---

## 3. Shadow system

The signature shadow system uses the dark purple shadow color.

```css
:root {
  --shadow-primary: 18px 18px 16px rgb(69 13 80 / 20%);
  --shadow-depth: 4px 4px 4px rgb(69 13 80 / 25%);
}
```

### Primary shadow

- X: 18px
- Y: 18px
- Blur: 16px
- Color: `#450D50`
- Opacity: 20%

Use for major elevated surfaces and signature components.

### Depth shadow

- X: 4px
- Y: 4px
- Blur: 4px
- Color: `#450D50`
- Opacity: 25%

Use when an object sits behind or overlaps another object and needs additional depth.

### Rules

- Preserve these values exactly when using the signature shadows.
- Do not add multiple decorative shadow layers.
- Do not put a shadow on every element.
- Neumorphism is a surface treatment, not the default behavior of every component.
- Prefer depth through hierarchy and spacing before adding more shadow.

All signature shadows fall toward the bottom right, as if lit from the top left. Do not mix shadow directions on one page.

A primary shadow extends roughly 34px past the right and bottom edges of its surface. Do not place such a surface inside an `overflow: hidden` ancestor without leaving that much room, or the shadow will be clipped.

Hover and pressed shadows for small controls are defined in section 22, so the signature values above stay untouched.

---

## 4. Neumorphism

Use **medium-strength Neumorphism** as the default surface language.

The effect should be visible enough to establish the semenitwasted character while remaining controlled and readable.

Use it primarily for:

- signature cards
- primary buttons
- contained surfaces
- selected interactive elements
- visually important controls
- layered content where depth improves hierarchy

Avoid applying it indiscriminately to:

- every text block
- every section
- every image
- every navigation item
- purely decorative elements

The page should still look coherent if decorative shadows are removed.

---

## 5. Radius

The default/signature radius is:

```text
10px
```

Use 10px for:

- cards
- buttons
- inputs
- controls
- contained surfaces
- image containers
- signature components

Other radii are allowed only when they serve a clear structural purpose or are explicitly requested.

Keep component dimensions and spacing aligned to the system's even-number rule.

---

## 6. Spacing scale

Use an even-number spacing system:

```text
4
8
12
16
20
24
32
40
48
56
64
80
96
128
```

### General guidance

**Component internals**

Use approximately 4–32px.

**Between related elements**

Use approximately 8–24px.

**Between groups**

Use approximately 24–48px.

**Section spacing**

Use approximately 40–128px.

Prefer larger spacing for major page sections because the default visual density is spacious.

Do not use arbitrary odd-number values for:

- padding
- margin
- gap
- layout dimensions
- fixed control sizes

If a technical constraint produces an odd value, keep it isolated rather than redesigning the whole system around it.

Hairline border widths (1px, 2px), focus ring widths, and line-heights are exempt from the even-number rule because they are not layout dimensions.

---

## 7. Grid system

Use the following default responsive grid:

### Desktop

12 columns.

### Tablet

8 columns.

### Mobile

4 columns.

Use consistent gutters and aligned content edges.

When a layout requires a different number of columns for a specific component, the value may change if it improves the composition. Keep the resulting dimensions, gaps, and spacing on the even-number scale.

Do not force a 12-column grid into a layout where it creates unnecessary complexity.

The default gutter is 24px on desktop, 20px on tablet, and 16px on mobile. Breakpoints follow `references/responsive.md` (tablet starts at 768px, desktop at 1024px). If that file is unavailable, use those same two values.

---

## 8. Container system

Use a consistent global content container by default.

Recommended baseline:

```text
max-width: 1200px
```

Use fluid horizontal padding so content remains comfortable at smaller widths.

A larger container may be used when the page genuinely benefits from wide visual content, but do not stretch text or UI unnecessarily.

The container should establish a consistent alignment line across the page.

Avoid unrelated sections using arbitrary independent maximum widths unless their content requires it.

A good default for the fluid padding is `clamp(16px, 4vw, 48px)`.

---

## 9. Bento Grid

Bento Grid is the default composition for **content-heavy sections**, but it is not mandatory for every section.

Use Bento when it helps communicate:

- content priority
- relationships
- categories
- different content types
- featured versus secondary content
- visual rhythm

Bento items do not need to be identical.

The most important content may receive more visual space.

Avoid turning the page into a collection of equal decorative cards.

For mobile, Bento layouts must reflow into a logical reading order without clipping or excessive horizontal scrolling.

---

## 10. Cards and signature surfaces

Prefer a small family of recognizable signature surfaces rather than inventing a completely different card style for every page.

Useful default types include:

### Standard card

A restrained surface for grouped content.

### Elevated card

Uses the primary signature shadow to establish hierarchy.

### Depth card

Uses the secondary/depth shadow when an overlap or layered composition benefits from it.

### Interactive card

Uses subtle state changes on hover/focus/active while preserving the base surface.

### Image/content card

Combines artwork or imagery with concise supporting information.

Cards should have a clear content purpose.

Do not add a card around every individual piece of content.

All fixed card dimensions, padding, gaps, and internal spacing should use even-number values.

AI may create a custom card when the page requires it, but the custom design should still feel like a member of the same visual system.

---

## 11. Buttons

Buttons should retain the established semenitwasted tactile character.

Default principles:

- 10px radius
- strong but restrained contrast
- tactile surface treatment
- clear label hierarchy
- comfortable touch target
- subtle hover/focus feedback
- no excessive pill styling by default

Use distinct hierarchy for:

- primary action
- secondary action
- quiet/tertiary action
- icon-only action when genuinely appropriate

Do not make every button visually dominant.

Buttons must remain recognizable as buttons and must not depend on animation to communicate their function.

Every button and other control needs a tap area of at least 44px by 44px. An icon-only button gets padding or a hit area to reach that size. Hover, pressed, focus, and disabled states are specified in section 22.

---

## 12. Borders

Borders are allowed but intentionally minimal.

Prefer shadow, surface contrast, spacing, and hierarchy as the primary methods of separation.

Use borders when they:

- improve accessibility
- clarify an input/control
- define a subtle boundary
- communicate a state
- enhance a hover/focus interaction
- solve a specific visual ambiguity

Do not outline every card and section by default.

Because the system separates surfaces with shadow, those boundaries disappear in forced-colors (Windows high contrast) mode. Give cards, buttons, and inputs a `1px solid transparent` border at rest. It is invisible normally but becomes a visible system-color border in forced-colors mode. See section 24.

---

## 13. Typography

The default typeface is **Rubik**.

Use typography as a major part of the visual hierarchy rather than relying on decorative graphics.

Default hierarchy should clearly distinguish:

- page title
- section title
- subsection/project title
- body
- labels
- metadata
- supporting text

Keep body text readable and avoid overly long line lengths.

Typography should feel clean, slightly friendly, and contemporary without becoming playful or childish.

When the project already has an established Rubik implementation, preserve it.

If the user explicitly requests another typeface, follow the user's instruction.

Load Rubik self-hosted as a variable font when possible, with `font-display: swap` and a system fallback stack so layout stays stable while it loads: `'Rubik', system-ui, -apple-system, 'Segoe UI', sans-serif`. Suggested weights are 400 for body, 500 for labels and buttons, and 600 or 700 for headings. Keep line length around 60 to 75 characters. The full type scale is defined in `references/typography.md`.

---

## 14. Visual density

The default density is **spacious**.

Prefer:

- generous section spacing
- breathing room around major content
- clear grouping
- fewer competing elements
- comfortable text-to-surface ratios
- strong separation between major sections

Do not fill empty space merely because it exists.

Whitespace should help establish hierarchy and make the important content easier to see.

Spacious does not mean unnecessarily long pages. Content should remain purposeful.

---

## 15. Alignment and composition

Use alignment as a primary visual tool.

Prefer:

- consistent left edges
- intentional column relationships
- aligned headings and content
- predictable gutters
- controlled asymmetry
- clear visual anchors

Asymmetry is allowed when it improves composition, especially within Bento layouts.

Avoid random offsets that appear accidental.

---

## 16. Imagery

When real assets are supplied:

- preserve their subject
- preserve intended crop where possible
- preserve proportions
- avoid distortion
- use responsive sizing
- avoid unnecessary filters
- allow the artwork's natural colors to remain visible

Images may provide visual color contrast within the otherwise monochrome interface.

Do not add generic stock or generated imagery simply to fill an empty area.

When imagery is decorative, keep it subordinate to the page's actual content.

Give every image explicit `width` and `height` or an `aspect-ratio`, inside a container with the 10px radius, so it cannot cause layout shift. Use `object-fit: cover` only where the crop is acceptable for the subject. When no asset was supplied, use a placeholder block instead of stock imagery (see the placeholder rules in `SKILL.md`).

---

## 17. Interaction surfaces

Interactive elements should visually belong to the same system.

Default state:

- restrained
- clear
- tactile
- stable

Hover:

- subtle elevation or surface change
- small transform where appropriate
- optional minimal border reinforcement

Focus:

- clearly visible and accessible
- never dependent only on color

Active/pressed:

- subtle depth reduction or surface shift

Disabled:

- visibly unavailable without destroying readability

Do not use dramatic scaling, glow, or color explosions for normal interaction.

Concrete values for hover, pressed, focus, and disabled states are defined in section 22.

---

## 18. Responsive design principles

The visual system must survive responsive transformation.

At smaller widths:

- reduce columns
- stack related content
- preserve hierarchy
- maintain comfortable padding
- preserve image proportions
- keep touch targets usable
- simplify composition when necessary

Do not simply shrink desktop components.

The mobile version should feel like an intentional composition derived from the same design system.

Detailed responsive behavior is defined in `references/responsive.md`.

---

## 19. Design-system exceptions

The system is intentionally flexible.

A user request may override:

- grid structure
- color
- typography
- radius
- component style
- layout
- density
- visual effects
- animation

When an exception is explicitly requested, follow it.

When a deviation is not explicitly requested, prefer the established system.

Do not introduce a new visual rule merely because it is fashionable or common in other websites.

---

## 20. Signature test

Before finalizing a page, ask:

- Does the page still feel related to semenitwasted?
- Is the monochrome foundation intact?
- Is the tactile surface treatment controlled?
- Is spacing generous enough?
- Is the hierarchy immediately understandable?
- Are Bento compositions used where they actually help?
- Are cards and buttons visually related to the established system?
- Are borders restrained?
- Does the page avoid generic AI-website styling?
- Does the design remain coherent without relying on animation?

If most answers are yes, the page is likely consistent with the design system.

---

## 21. Design tokens

All values below come from sections 1 to 20 unless marked **derived**. Derived values were added to fill gaps (see section 22) and should be confirmed or replaced if the project has established values.

```css
:root {
  /* Core colors */
  --color-light: #F0EDF4;
  --color-dark: #211B28;
  --color-shadow: #450D50;

  /* Signature shadows (preserve exactly) */
  --shadow-primary: 18px 18px 16px rgb(69 13 80 / 20%);
  --shadow-depth: 4px 4px 4px rgb(69 13 80 / 25%);

  /* Radius and container */
  --radius: 10px;
  --container-max: 1200px;
  --page-pad: clamp(16px, 4vw, 48px);

  /* Spacing scale */
  --space-4: 4px;   --space-8: 8px;   --space-12: 12px;  --space-16: 16px;
  --space-20: 20px; --space-24: 24px; --space-32: 32px;  --space-40: 40px;
  --space-48: 48px; --space-56: 56px; --space-64: 64px;  --space-80: 80px;
  --space-96: 96px; --space-128: 128px;

  /* Derived: text tones (contrast verified on --color-light) */
  --color-text: var(--color-dark);                  /* 14.48:1 */
  --color-text-muted: rgb(33 27 40 / 70%);          /* 5.78:1  */
  --color-text-disabled: rgb(33 27 40 / 50%);       /* 3.16:1, disabled only */
  --color-border-control: rgb(33 27 40 / 50%);      /* 3.16:1, input boundary */

  /* Derived: shadow states for small controls */
  --shadow-hover: 8px 8px 8px rgb(69 13 80 / 22%);
  --shadow-pressed: 2px 2px 2px rgb(69 13 80 / 25%);

  /* Derived: focus and touch */
  --focus-ring: 2px solid var(--color-dark);
  --focus-offset: 2px;
  --tap-min: 44px;

  /* Derived: gutter (mobile first) */
  --gutter: 16px;
}

@media (min-width: 768px)  { :root { --gutter: 20px; } }
@media (min-width: 1024px) { :root { --gutter: 24px; } }
```

Motion tokens are defined in `references/animation.md` section 26. Keep both token sets together in the page's stylesheet.

---

## 22. State and tone tokens

These fill the parts of the system that sections 11 and 17 describe but do not give values for.

### Text tones

| Role | On light surface | On dark surface | Contrast |
|---|---|---|---|
| Primary text | `--color-dark` | `--color-light` | 14.48:1 |
| Muted (labels, metadata, supporting text) | `rgb(33 27 40 / 70%)` | `rgb(240 237 244 / 70%)` | 5.78:1 / 7.69:1 |
| Disabled | `rgb(33 27 40 / 50%)` | `rgb(240 237 244 / 50%)` | 3.16:1 / 4.58:1 |

Use muted text for secondary information, never for essential content smaller than body size. Disabled text is exempt from the normal 4.5:1 requirement but must stay readable.

### Shadow states

| Element | Rest | Hover | Pressed |
|---|---|---|---|
| Button or small control | `--shadow-depth` | `--shadow-hover` | `--shadow-pressed` |
| Elevated or interactive card | `--shadow-primary` | `--shadow-primary` plus `translateY(-2px)` | `--shadow-primary`, no movement |

Cards keep the exact signature shadow and show hover through movement only, so the signature values are never altered. `--shadow-hover` and `--shadow-pressed` are **derived**, not original values.

### Focus

- Ring: `outline: 2px solid var(--color-dark); outline-offset: 2px;` on light surfaces, and `--color-light` on dark surfaces. Both reach 14.48:1 on their own surface.
- Use `:focus-visible` so the ring shows for keyboard users.
- The ring is an outline shape, so it does not rely on color alone.

### Disabled

- Use the `disabled` attribute (or `aria-disabled="true"` for links) rather than styling alone.
- Text uses the disabled tone, the shadow is removed, and there is no hover movement.
- Keep the 1px border visible so the control is still recognizable.

---

## 23. Form controls and icons

### Form controls

- Inputs, textareas, and selects use the 10px radius.
- Every field has a visible label above it. A placeholder is never the only label.
- The field boundary is `1px solid var(--color-border-control)`, which reaches 3.16:1 on the light surface, so the control is perceivable without relying on shadow.
- Focus uses the focus ring from section 22.
- Errors use text and an icon as well as a semantic color. Link the message with `aria-describedby` and set `aria-invalid="true"`.
- Required fields are marked in text, not by color alone.

### Icons

- Use inline SVG with `currentColor` so icons follow the text tones.
- Use even sizes (16, 20, 24px) and one consistent stroke width.
- Decorative icons get `aria-hidden="true"`. Icon-only buttons need an accessible name.
- Do not add icons only to decorate.

---

## 24. Themes and forced colors

### Themes

The default page is light: `--color-light` as the surface and `--color-dark` as text. Dark surfaces are for emphasis (navigation, a featured block, a primary control), not a full dark theme.

The signature shadow `#450D50` against `#211B28` has only 1.14:1 contrast, so depth does not read on dark surfaces. On a dark surface, separate elements with a surface step or a `1px solid rgb(240 237 244 / 50%)` border instead of relying on the shadow.

A full dark theme is not part of the default system. Build one only on request, with the roles swapped (light as text, dark as surface), and record it as an assumption.

For a light-only page, declare it in `<head>` so form controls and scrollbars match:

```html
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#F0EDF4">
```

### Forced colors

Shadows are removed in forced-colors mode, so controls need a border that survives it. The `1px solid transparent` border from section 12 becomes visible there. Keep focus on `outline`, which forced-colors mode preserves.

```css
.card, .button, .input {
  border: 1px solid transparent;
}

@media (forced-colors: active) {
  .card, .button, .input {
    border-color: CanvasText;
  }
}
```

---

## 25. Additional checks

Run these together with the signature test in section 20:

- [ ] Only the three core colors, the derived opacity tones, and functional semantic colors are used.
- [ ] Signature shadow values are exact, and derived state shadows appear only on small controls.
- [ ] No signature shadow is clipped by an `overflow: hidden` ancestor.
- [ ] All shadows fall in the same direction.
- [ ] Lower-emphasis text uses the muted tone and keeps at least 4.5:1 contrast.
- [ ] Border widths are the only odd values. Every padding, margin, gap, and fixed size is on the even scale.
- [ ] Every control has a tap area of at least 44px.
- [ ] Inputs have a visible label and a boundary with at least 3:1 contrast.
- [ ] The focus ring is visible on both light and dark surfaces.
- [ ] Cards, buttons, and inputs keep a visible boundary in forced-colors mode.
- [ ] Dark surfaces do not depend on the purple shadow for separation.
- [ ] Rubik loads with a fallback stack and `font-display: swap`, without a layout jump.
- [ ] Images have explicit dimensions or an `aspect-ratio`.
- [ ] Semantic colors appear only for a real functional state, and always with text or an icon.