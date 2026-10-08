# Typography

This document defines the default typography system for the personal static web builder.

The typography system supports the visual language in `references/design-system.md`: clean, friendly, contemporary, spacious, and content-first.

Explicit user instructions or an approved design reference may override these defaults.

---

## 1. Typeface

The default typeface is **Rubik**.

Use Rubik consistently across the page unless the user explicitly requests another typeface or the existing project already has an established typography system that must be preserved.

```css
font-family: "Rubik", sans-serif;
```

Do not introduce multiple font families by default.

A secondary typeface may be introduced only when it has a clear design purpose and the user explicitly requests or approves the change.

---

## 2. Typography character

Typography should feel:

- clean
- friendly
- contemporary
- slightly rounded
- approachable
- confident without being aggressive

Avoid typography that feels:

- overly corporate
- excessively futuristic
- overly playful
- ornamental
- compressed
- unnecessarily dramatic

Typography should support the content rather than compete with it.

---

## 3. Type hierarchy

Every page should establish a clear hierarchy between:

1. Page title
2. Section heading
3. Subsection or project title
4. Body text
5. Labels
6. Metadata
7. Supporting text

Do not make every text element visually prominent.

The strongest typographic emphasis should generally be reserved for the page's primary purpose and important content.

---

## 4. Recommended scale

Use an even-number scale as the default.

Baseline reference:

```text
Display / large hero: 56–64px
H1:                  48px
H2:                  40px
H3:                  32px
H4:                  24px
Large body / intro:  20px
Body:                16px
Small body:          14px
Caption / metadata:  12px
```

These are starting points, not mandatory values for every page.

Choose the smallest size that maintains the intended hierarchy.

When a page does not need a large display treatment, do not add one merely because the scale exists.

---

## 5. Mobile type scale

Typography should adapt rather than simply shrink proportionally.

A practical mobile baseline:

```text
Display / large hero: 40–48px
H1:                  36–40px
H2:                  32px
H3:                  24px
H4:                  20px
Large body / intro:  18px
Body:                16px
Small body:          14px
Caption / metadata:  12px
```

Keep the resulting values even numbers.

Do not reduce body text below a comfortable reading size simply to fit more content.

---

## 6. Responsive typography

Typography should remain fluid enough to prevent abrupt visual jumps between breakpoints.

When useful, use CSS functions such as:

```css
clamp()
```

to interpolate heading sizes.

Example:

```css
font-size: clamp(40px, 5vw, 64px);
```

The exact implementation should be adapted to the page.

Do not use fluid typography simply because it is available.

The final rendered sizes must still preserve:

- hierarchy
- readability
- visual balance
- even-number intent where practical

---

## 7. Line height

Use line height to establish readable rhythm.

Recommended starting points:

```text
Display / H1:     1.05–1.15
H2 / H3:          1.1–1.2
Body:             1.5–1.7
Small text:       1.4–1.6
```

Headings should generally use tighter line height.

Body copy should have more generous line height.

Avoid excessively tight body text.

Avoid excessive line height that causes short paragraphs to feel disconnected.

---

## 8. Letter spacing

Use letter spacing sparingly.

Default:

```text
Headings: usually normal or slightly tight
Body:     normal
Labels:   normal or slightly positive
```

Do not use extreme negative tracking for large headlines.

Do not use large positive tracking merely to make small labels appear more decorative.

Letter spacing should support readability and hierarchy rather than become a visual effect.

---

## 9. Text width and measure

Readable text width is more important than filling the entire container.

For body copy, prefer a comfortable line length.

A practical baseline is approximately:

```text
45–75 characters per line
```

Long-form text may use a narrower content measure than the overall page container.

Do not allow paragraphs to stretch across the full 1200px page container simply because space is available.

For short labels, buttons, navigation, and metadata, natural content width is preferred.

---

## 10. Page title

Each page should normally have one clear page-level `<h1>`.

The H1 should communicate the page's actual purpose.

Examples:

```html
<h1>About Me</h1>
<h1>Selected Work</h1>
<h1>Services</h1>
<h1>Contact</h1>
```

Do not create multiple competing H1 elements merely for visual composition.

The H1 may be visually large, but semantic hierarchy and visual hierarchy do not need to be identical.

---

## 11. Heading hierarchy

Use semantic heading levels in order:

```text
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
      └── H3
```

Do not skip levels merely to obtain a specific visual size.

If an H3 needs to look visually larger than an H2 for design reasons, style it visually without changing the semantic level.

---

## 12. Body copy

Body text should remain straightforward and easy to scan.

Prefer:

- short paragraphs
- meaningful grouping
- clear spacing
- concise supporting copy
- natural language

Avoid:

- unnecessary marketing language
- long blocks of text
- excessive bolding
- repeated statements
- AI-generated filler

Typography should make the page easier to understand, not merely make it look polished.

---

## 13. Labels and metadata

Labels and metadata should be visually subordinate.

Useful sizes:

```text
14px
12px
```

Use weight, spacing, position, or surface contrast to distinguish metadata instead of making it excessively small.

Metadata should remain readable on mobile.

Do not use tiny text as a decorative texture.

---

## 14. Font weight

Use a restrained weight hierarchy.

A practical baseline:

```text
Regular:   400
Medium:    500
SemiBold:  600
Bold:      700
```

Use heavier weights selectively.

Suggested use:

```text
400 → body and supporting text
500 → labels, navigation, secondary emphasis
600 → headings, buttons, important UI
700 → major display emphasis when needed
```

Do not make every heading bold.

Do not use many weights within one component without a clear hierarchy.

---

## 15. Text color

Use the monochrome color system.

Primary text:

```text
#211B28
```

Light text on dark surfaces:

```text
#F0EDF4
```

Muted text should be derived from the same monochrome family rather than introducing arbitrary colors.

Maintain sufficient contrast.

Do not use the shadow color `#450D50` as a decorative text accent by default.

---

## 16. Links

Links should be recognizable as interactive elements.

Use:

- clear text
- meaningful labels
- appropriate hover/focus states
- sufficient contrast

Do not rely solely on subtle color differences to communicate that text is a link.

When a link is visually presented as a button, use a semantic link if it navigates and a button if it performs an action.

---

## 17. Buttons

Button typography should align with the design system.

Default:

- Rubik
- medium or semibold weight
- readable label
- clear hierarchy
- comfortable line height
- no unnecessary uppercase styling

Avoid excessively small button text.

Keep button labels concise.

Do not use typography alone to make a button look decorative.

---

## 18. Text inside cards

Card typography should follow content hierarchy.

Typical structure:

```text
Card label / category
        ↓
Card title
        ↓
Description
        ↓
Metadata / action
```

The title should be visually dominant.

Supporting copy should not compete with the title.

Avoid filling cards with unnecessary text simply to balance the visual layout.

---

## 19. Text wrapping

Design headings and important labels to wrap naturally.

Avoid hardcoded line breaks unless the line break is intentionally part of the design.

Do not use:

```css
white-space: nowrap;
```

on text that may need to wrap on narrow screens unless overflow behavior is intentionally handled.

Check long titles at intermediate and mobile widths.

---

## 20. Text overflow

Prevent:

- clipped headings
- overflowing buttons
- broken navigation
- hidden content
- horizontal page scrolling caused by text

Allow content to wrap when appropriate.

For long technical strings, URLs, filenames, or other unavoidable content, use controlled breaking or scrolling rather than allowing the page layout to break.

---

## 21. Spacing around typography

Typography should use the spacing scale from `design-system.md`.

Do not rely on default browser margins.

Establish deliberate spacing between:

- heading and supporting text
- label and heading
- paragraph groups
- text and buttons
- text and media

Prefer smaller gaps within a typographic group and larger gaps between groups.

Example:

```text
Label → heading:       8–12px
Heading → description: 12–20px
Paragraph → paragraph: 16–24px
Content group → group: 32–64px
```

All chosen values should remain even numbers.

---

## 22. Typography and spacious layout

The overall design system is spacious.

Use whitespace around typography to create hierarchy.

Do not compensate for weak hierarchy by making text unnecessarily large.

A smaller heading with strong spacing can be more effective than an oversized heading surrounded by little breathing room.

Typography, spacing, and surface treatment should work together.

---

## 23. Accessibility

Typography must remain accessible across viewport sizes.

Ensure:

- sufficient contrast
- readable body size
- clear hierarchy
- visible focus states
- adequate line height
- no essential information hidden by truncation
- no dependence on color alone

Do not sacrifice readability for visual minimalism.

---

## 24. Performance

Use the existing project's font-loading strategy when available.

If Rubik must be loaded:

- avoid unnecessary font weights
- load only weights actually used
- avoid duplicate font sources
- avoid blocking page rendering unnecessarily

Do not add additional font families without a clear reason.

---

## 25. Typography exceptions

The typography system may be intentionally modified when:

- the user explicitly requests another font
- an approved design reference specifies different typography
- an existing project convention must be preserved
- a specific visual experiment requires a different typographic treatment

Keep the exception scoped.

Do not allow one experimental component to unintentionally redefine typography for the entire website.

---

## 26. Typography final check

Before shipping, confirm:

- [ ] Rubik is used by default.
- [ ] The page has a clear H1.
- [ ] Heading levels follow semantic order.
- [ ] Typography hierarchy is visually obvious.
- [ ] Body text remains readable.
- [ ] Text measure is comfortable.
- [ ] Font weights are used deliberately.
- [ ] Typography remains readable on mobile.
- [ ] Headings do not cause horizontal overflow.
- [ ] Button and navigation text remain usable.
- [ ] Text contrast is sufficient.
- [ ] Typography spacing follows the even-number system.
- [ ] No unnecessary font families or weights were introduced.
- [ ] Typography supports the spacious visual character of the design system.
