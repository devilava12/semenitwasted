# Typography

This document defines the default typography system for the personal static web builder.

The typography system supports the visual language in `references/design-system.md`: clean, friendly, contemporary, spacious, and content-first.

Explicit user instructions or an approved design reference may override these defaults.

Sections 1 to 26 are the core rules. Sections 27 to 33 add implementation details: type tokens and a fluid scale, base CSS, resizing and user settings, form controls and special text, language and content length, a check script, and additional checks.

Where this file overlaps `design-system.md` (typeface, line length, text tones), the two agree. Any difference is called out in the section concerned.

---

## 1. Typeface

The default typeface is **Rubik**.

Use Rubik consistently across the page unless the user explicitly requests another typeface or the existing project already has an established typography system that must be preserved.

```css
font-family: "Rubik", sans-serif;
```

Do not introduce multiple font families by default.

A secondary typeface may be introduced only when it has a clear design purpose and the user explicitly requests or approves the change.

In production CSS, use the full fallback stack from `design-system.md` section 13. The one-line form above is the short form.

```css
font-family: "Rubik", system-ui, -apple-system, "Segoe UI", sans-serif;
```

A system monospace stack for code is not an additional loaded typeface (see section 30).

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

Rubik's rounded forms already give the friendly character. Do not add text effects to get it: no gradient-filled text, outlined text, or `text-shadow`. They add noise and reduce contrast.

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

Build hierarchy with a few clear steps (size, weight, tone, spacing). Do not apply all of them to every element. Tone means full text color versus muted text color.

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

Pixel values are the design intent. Implement them as `rem` (px ÷ 16) so text respects the user's browser font-size setting. The fluid implementation of this scale is in section 27, and the reasoning is in section 29.

12px is the smallest size in the system. Do not go below it.

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

Body stays 16px on mobile. The mobile values apply below 768px (see `responsive.md`). Between mobile and desktop, interpolate with the fluid scale in section 27 instead of jumping.

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

Additional rules for fluid sizes:

- bound `clamp()` with `rem` values and use a `rem + vw` preferred value (example in section 27). A `vw`-only value can prevent text from growing when the user raises the browser's default font size.
- apply fluid sizing to display and headings only. Body text, labels, and buttons stay fixed.
- check the result at 320, 375, 768, 1024, and 1280px.

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

Also:

- set `line-height` as a unitless number so it scales with the font size. Set it on `body`, then override for headings.
- line-heights are exempt from the even-number rule, like hairline borders (`design-system.md` section 6).
- single-line labels and buttons may use 1.2 to 1.4. The 44px tap area comes from padding or `min-height`, not from line-height.

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

Use `em` units so spacing scales with font size. Starting points: about `-0.01em` on large headings and about `0.02em` on small labels. Stay roughly between `-0.02em` and `0.04em` unless there is a documented reason.

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

Implement the measure with `max-width` in `ch` (for example `65ch`) on text blocks instead of fixed pixel widths. `ch` is based on the width of the "0" glyph, so the result is approximate.

`design-system.md` section 13 suggests 60 to 75 characters for body paragraphs. That sits inside the 45 to 75 range here. Use the lower end (45 to 60) in narrow cards and side columns. The measure applies to paragraphs, not to the card grid.

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

Write the H1 in the language of the page. The examples above are English. For an Indonesian page, use for example `Tentang Saya`, `Karya Pilihan`, `Layanan`, `Kontak`.

A home page H1 should say who the person is and what they do (for example name and role), not "Home" or "Welcome". See `seo.md` sections 7 and 19.

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

Implement this with size classes tied to the scale (for example `.text-h2` applied to an `<h3>`), so visual size is independent of the element. Do not use a `<p>` or `<div>` styled as a heading. A Bento card title is a heading (H2 or H3 by its place in the hierarchy).

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

Also:

- use `<strong>` for real importance and `<em>` for stress. Do not use bold or italic as layout.
- italics are not part of the default font load. Use `<em>` sparingly, and load an italic face only if the design needs it.
- write paragraphs in sentence case. Do not set paragraphs in all caps.

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

Also:

- 12px is the smallest size. Metadata may use the muted tone (`--color-text-muted`), which keeps its contrast (`design-system.md` section 22).
- essential information (a date someone needs, a price, a required field note) is not set in the muted tone below body size, and should be 14px or larger.

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

Also:

- two or three weights per page are usually enough.
- load only the weights used (section 24). If a weight is not loaded, the browser may synthesize it (a faux bold), which looks heavier and uneven. Check headings and buttons for this.
- Rubik's published weight range is wider (300 to 900). This system uses only 400 to 700.

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

Use the tone tokens from `design-system.md` section 21: `--color-text` and `--color-text-muted`. Muted text keeps 5.78:1 on the light surface and 7.69:1 on the dark surface (`design-system.md` section 22).

Also:

- do not use `--color-text-disabled` for readable content.
- do not lower text contrast with `opacity` on a text container. Use the tone tokens.
- text placed over an image needs a solid surface behind it. Do not rely on `text-shadow`.

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

Also:

- inline links inside paragraphs keep an underline or another non-color cue. Good defaults are `text-underline-offset: 0.2em` and `text-decoration-thickness: 1px`.
- navigation and card links may omit the underline when their position and styling make them clearly interactive.
- focus uses the `:focus-visible` outline from `design-system.md`.

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

Also:

- buttons and inputs do not inherit the page font by default. Set `font: inherit` (section 30).
- `white-space: nowrap` on a button is acceptable only for a short label that was checked at 320px.
- keep a 44px minimum tap area.

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

Starting sizes (derived, not from the original rules):

```text
Card label / category:  12–14px
Card title:             20–24px (H4), or 24–32px for a featured card
Description:            14–16px
Metadata / action:      12–14px
```

Keep descriptions to two or three lines. Truncate with a line clamp only when the full text is available elsewhere (section 30).

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

Also:

- `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs are optional enhancements. A browser that does not support them ignores them, and the layout still works.
- do not use `<br>` inside headings for rhythm.

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

Practical rules:

- add `overflow-wrap: anywhere` (or `break-word`) to elements that may contain long strings.
- add `min-width: 0` to flex and grid children that hold long text, so they can shrink.
- use `overflow-x: auto` on `pre` and wide tables.
- test with a very long unbroken string and with the longest real heading at 320px.

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

Use the spacing tokens (`--space-8`, `--space-12`, and so on) from `design-system.md` section 21. A simple flow rule keeps vertical rhythm predictable (see section 28).

---

## 22. Typography and spacious layout

The overall design system is spacious.

Use whitespace around typography to create hierarchy.

Do not compensate for weak hierarchy by making text unnecessarily large.

A smaller heading with strong spacing can be more effective than an oversized heading surrounded by little breathing room.

Typography, spacing, and surface treatment should work together.

When a page feels crowded, first remove text or add spacing before reducing the font size.

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

Specific rules:

- body text is at least 16px and metadata at least 12px.
- normal text needs 4.5:1 contrast. Large text (24px, or about 18.66px in bold) needs 3:1.
- content must remain usable when text is enlarged to 200% and when line, paragraph, and letter spacing are increased. Do not give text containers a fixed `height`. Use `min-height` (see section 29).
- do not communicate meaning with weight or color alone.
- see `accessibility.md` for the full accessibility rules.

---

## 24. Performance

Use the existing project's font-loading strategy when available.

If Rubik must be loaded:

- avoid unnecessary font weights
- load only weights actually used
- avoid duplicate font sources
- avoid blocking page rendering unnecessarily

Do not add additional font families without a clear reason.

Loading details are in `performance.md` sections 10 and 11: self-hosting, WOFF2 only, one variable file or static files (not both), `font-display: swap`, preload with `crossorigin`, and fallback tuning with `size-adjust`. Do not load fonts with `@import`.

---

## 25. Typography exceptions

The typography system may be intentionally modified when:

- the user explicitly requests another font
- an approved design reference specifies different typography
- an existing project convention must be preserved
- a specific visual experiment requires a different typographic treatment

Keep the exception scoped.

Do not allow one experimental component to unintentionally redefine typography for the entire website.

Scope the change with a class, or override a custom property on that component (for example `--font-sans`). Do not change `body`. Mention the exception in the completion summary.

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

---

## 27. Type tokens and fluid scale

These tokens implement the scales in sections 4 and 5. They are derived starting points: the endpoints are the values from sections 4 and 5, and the interpolation between them is an addition. Confirm or replace them if the project has established values.

```css
:root {
  --font-sans: "Rubik", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* Fluid headings: rem bounds, rem + vw preferred value */
  --text-display: clamp(2.5rem, 1.5rem + 3vw, 4rem);      /* 40 → 64px */
  --text-h1:      clamp(2.25rem, 1.5rem + 2vw, 3rem);     /* 36 → 48px */
  --text-h2:      clamp(2rem, 1.25rem + 1.5vw, 2.5rem);   /* 32 → 40px */
  --text-h3:      clamp(1.5rem, 1rem + 1.5vw, 2rem);      /* 24 → 32px */
  --text-h4:      clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem); /* 20 → 24px */
  --text-intro:   clamp(1.125rem, 1.05rem + 0.25vw, 1.25rem); /* 18 → 20px */

  /* Fixed sizes */
  --text-body:    1rem;      /* 16px */
  --text-small:   0.875rem;  /* 14px */
  --text-caption: 0.75rem;   /* 12px */

  --leading-display: 1.1;
  --leading-heading: 1.15;
  --leading-body: 1.6;
  --leading-small: 1.5;

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  --measure: 65ch;
}
```

Resolved sizes in px (calculated from the formulas above):

| Token | 320–375px | 640px | 768px | 1024px | 1280px+ |
|---|---|---|---|---|---|
| display | 40 | 43 | 47 | 55 | 62–64 |
| h1 | 36 | 37 | 39 | 45 | 48 |
| h2 | 32 | 32 | 32 | 35 | 39–40 |
| h3 | 24 | 26 | 28 | 31 | 32 |
| h4 | 20 | 21 | 21 | 23 | 24 |
| intro | 18 | 18 | 19 | 19 | 20 |

Rules:

- the endpoints are even numbers. Values between them are interpolated and may be odd. Even-number intent applies to the design values, not to every pixel in a fluid range.
- use the display size only when the page has a hero that needs it (section 4).
- the preferred values are tuned so mobile lands on the section 5 values and desktop on the section 4 values.

---

## 28. Base typography CSS

A starting point for the page stylesheet. Adapt it to the project.

```css
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: var(--leading-body);
  font-weight: var(--weight-regular);
  color: var(--color-text);
}

h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote, figure { margin: 0; }

h1, h2, h3, h4 {
  font-weight: var(--weight-semibold);
  line-height: var(--leading-heading);
  text-wrap: balance;
}

h1 { font-size: var(--text-h1); line-height: var(--leading-display); }
h2 { font-size: var(--text-h2); }
h3 { font-size: var(--text-h3); }
h4 { font-size: var(--text-h4); }

p, li { max-width: var(--measure); text-wrap: pretty; }

/* Vertical rhythm inside a text group */
.flow > * + * { margin-top: var(--space-16); }

/* Visual size independent of the heading level */
.text-h2 { font-size: var(--text-h2); line-height: var(--leading-heading); }
.text-h3 { font-size: var(--text-h3); line-height: var(--leading-heading); }

.text-muted   { color: var(--color-text-muted); }
.text-small   { font-size: var(--text-small); line-height: var(--leading-small); }
.text-caption { font-size: var(--text-caption); line-height: var(--leading-small); }

/* Inline links keep a non-color cue */
p a, li a {
  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-decoration-thickness: 1px;
}

/* Long strings must not break the layout */
.break { overflow-wrap: anywhere; }
```

Notes:

- `.text-h2` and similar classes let an `<h3>` look like an H2 without changing semantics (section 11).
- the `.flow` spacing uses a token from `design-system.md`. Use larger tokens between groups (section 21).
- if the page sets `p { max-width: ... }` and a card needs full width, override it on that card instead of removing the rule.

---

## 29. Resizing and user settings

Typography must survive the ways people change text size.

- **Browser default font size.** Sizes in `rem` follow it. Sizes in `px` do not. This is why the scale is implemented in `rem` (section 4).
- **Browser zoom (up to 200% or more).** The layout should reflow without horizontal scrolling (see `responsive.md`) and no text should be clipped.
- **Text-only enlargement or spacing changes.** Do not use fixed `height` on text containers, cards, or buttons that hold text. Use `min-height` and padding.
- **Line, paragraph, and letter spacing overrides.** Text must stay visible and readable if a user stylesheet increases spacing. Avoid designs where a small spacing increase causes overlap.

Manual test, when a browser is available:

1. Set the browser's default font size to a larger value and reload. Headings and body should grow, and no text should be cut off.
2. Zoom to 200%. Check there is no horizontal scrolling at a narrow window width.
3. Check the longest heading, the longest button label, and the longest navigation item.

If no browser is available, say so in the completion summary and run the check in section 32.

---

## 30. Form controls, lists, quotes, code, and special text

**Form controls**

- inputs, textareas, selects, and buttons do not inherit the page font. Set them explicitly:

```css
input, textarea, select, button {
  font: inherit;
  color: inherit;
}
```

- keep text inside inputs at 16px or larger. Some mobile browsers zoom the page when a smaller input is focused.
- labels are visible text at 14px or larger. A placeholder is not a label.
- error and help text uses 14px, with a tone that keeps 4.5:1 contrast.

**Lists**

- keep list text at body size with 8 to 12px between items.
- keep visible markers or a clear equivalent. Do not remove bullets without replacing the structure visually.

**Quotes**

- `<blockquote>` uses the intro size (20px) or body size, with regular or medium weight. Do not use a different typeface.
- attribute only real quotes. Do not invent testimonials.

**Code and technical text**

- use the system monospace stack (`--font-mono`) only when the content is code. It is not a loaded typeface.
- use `overflow-x: auto` on `pre` so wide code scrolls inside its block instead of widening the page.

**Truncation**

- a line clamp is acceptable only for card previews whose full text is available on another page or in the same page, because essential information must not be hidden (section 23).

```css
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 31. Language and content length

- set `<html lang>` to the language of the content (see `SKILL.md`). Mark phrases in another language with `lang` on the element.
- Indonesian copy can run longer than English for the same meaning. Test buttons, navigation, and card titles with the real copy, not with short English text.
- Indonesian has long words and affixed forms. Do not enable automatic hyphenation as a fix. Fix the layout (wider container, smaller size step, or allowing wrapping) instead.
- placeholders such as `[Nama Anda]` use the same typography as final text, so the layout is tested with realistic length. Replace them before launch.
- use punctuation consistently across the site: follow `seo.md` section 9 for the dash style in titles, and pick one quote style (straight or curly) and one ellipsis style.

---

## 32. Checking without a browser

Use this when no browser or visual tool is available. It reads CSS (including `<style>` blocks) and HTML only. It cannot judge visual hierarchy, so it complements the manual checks.

Save as `typography-check.py` outside the deployed output directory, then run `python3 -I typography-check.py <output-dir>`:

```python
import re, sys
from html.parser import HTMLParser
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
skip = ('node_modules', '.git')
problems = 0

def flag(where, msg):
    global problems
    problems += 1
    print("  ! %s: %s" % (where, msg))

# ---- CSS checks (also scans <style> blocks in HTML)
def css_of(path):
    t = path.read_text(encoding='utf-8', errors='replace')
    if path.suffix == '.html':
        return '\n'.join(re.findall(r'<style[^>]*>(.*?)</style>', t, re.S | re.I))
    return t

files = [p for p in root.rglob('*') if p.suffix in ('.css', '.html') and not any(s in p.parts for s in skip)]
families = set()
for p in sorted(files):
    css = re.sub(r'/\*.*?\*/', '', css_of(p), flags=re.S)
    if not css.strip():
        continue
    rel = p.relative_to(root)
    for m in re.finditer(r'font-size\s*:\s*([^;}]+)', css):
        v = m.group(1).strip()
        for px in re.findall(r'(?<![\w.-])(\d+(?:\.\d+)?)px', v):
            if float(px) < 12:
                flag(rel, "font-size below 12px: %s" % v)
            elif float(px) % 2:
                flag(rel, "odd px font-size (design intent is even): %s" % v)
        if 'vw' in v and 'rem' not in v and 'clamp' not in v:
            flag(rel, "vw-only font-size does not scale with user settings: %s" % v)
    for m in re.finditer(r'font-weight\s*:\s*([^;}]+)', css):
        v = m.group(1).strip()
        if v not in ('400', '500', '600', '700', 'normal', 'bold', 'inherit') and 'var(' not in v:
            flag(rel, "font-weight outside the 400-700 set: %s" % v)
    for m in re.finditer(r'(?<![-\w])font-family\s*:\s*([^;}]+)', css):
        first = m.group(1).split(',')[0].strip().strip('"\'')
        if first.startswith('var(') or first == 'inherit':
            continue
        families.add(first)
    if re.search(r'white-space\s*:\s*nowrap', css):
        flag(rel, "white-space: nowrap found (confirm overflow is handled)")
    if re.search(r'text-shadow\s*:', css):
        flag(rel, "text-shadow found (not part of the system)")
    if re.search(r'letter-spacing\s*:\s*-?[\d.]+px', css):
        flag(rel, "letter-spacing in px (use em)")
    if re.search(r'@import[^;]*font', css, re.I):
        flag(rel, "@import for fonts (use link/preload or self-host)")
print("font-family first names used: %s" % (sorted(families) or 'none'))
extra = [f for f in families if f.lower() not in ('rubik', 'system-ui', 'ui-monospace', 'sfmono-regular', 'menlo', 'consolas', 'monospace', 'sans-serif')]
if extra:
    flag('css', "font families besides Rubik: %s" % extra)

# ---- HTML heading checks
class H(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.levels = []
    def handle_starttag(self, tag, attrs):
        if re.fullmatch(r'h[1-6]', tag):
            self.levels.append(int(tag[1]))

for p in sorted(root.rglob('*.html')):
    if any(s in p.parts for s in skip):
        continue
    h = H()
    h.feed(p.read_text(encoding='utf-8', errors='replace'))
    rel = p.relative_to(root)
    if h.levels.count(1) != 1:
        flag(rel, "expected exactly one h1, found %d" % h.levels.count(1))
    prev = 0
    for lv in h.levels:
        if prev and lv > prev + 1:
            flag(rel, "heading level jumps from h%d to h%d" % (prev, lv))
        prev = lv

print("\n%d problem(s)" % problems)
sys.exit(1 if problems else 0)
```

It reports: font sizes below 12px, odd `px` font sizes, `vw`-only font sizes, font weights outside 400 to 700, `white-space: nowrap`, `text-shadow`, `letter-spacing` in `px`, `@import` of fonts, font families other than Rubik and the system stacks, pages with other than one `<h1>`, and heading levels that skip.

A reported item is not always an error. For example, a short button label may legitimately use `nowrap`. Confirm each item, and say in the completion summary which ones are intentional.

---

## 33. Additional checks

Add to the checklist in section 26:

### Scale and units

- [ ] Font sizes are in `rem`, and 12px is the smallest size
- [ ] Fluid headings use `clamp()` with `rem` bounds, not `vw` alone
- [ ] Body, labels, and buttons are not fluid
- [ ] Line-height is unitless
- [ ] Letter spacing is in `em`

### Text and links

- [ ] Paragraph measure is limited with `ch`, not a fixed pixel width
- [ ] Inline links have an underline or another non-color cue
- [ ] Muted text is not used for essential information smaller than body size
- [ ] No `text-shadow`, gradient text, or outlined text is used

### Controls and forms

- [ ] Inputs, buttons, selects, and textareas use `font: inherit`
- [ ] Input text is 16px or larger
- [ ] Labels are visible text, not placeholders

### Resilience

- [ ] Text containers use `min-height`, not fixed `height`
- [ ] The page works with a larger browser default font size and at 200% zoom
- [ ] Long strings wrap or scroll inside their own block
- [ ] The longest real heading, button label, and navigation item were checked at 320px
- [ ] Headings that look different from their level use a size class, not a different element

### Fonts

- [ ] Only weights that are actually loaded are used
- [ ] No faux bold or faux italic appears
- [ ] The font stack includes the system fallback