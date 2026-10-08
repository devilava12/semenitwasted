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
