# Responsive Design

This document defines the default responsive behavior for the personal static web builder.

The responsive system extends the visual rules in `references/design-system.md`. Its purpose is to make each page feel intentionally designed at every viewport rather than treating mobile as a smaller desktop layout.

Explicit user instructions or an approved design reference may override these defaults.

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

---

## 19. Responsive reading order

The DOM and visual reading order should remain logical.

When a multi-column desktop layout becomes a stacked mobile layout:

1. primary content should appear first
2. supporting content should follow
3. related content should remain grouped
4. decorative elements should not interrupt important information

Do not rely on CSS ordering to create a completely different information hierarchy unless there is a clear accessibility and UX reason.

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
