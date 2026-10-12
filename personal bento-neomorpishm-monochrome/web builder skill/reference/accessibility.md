# Accessibility

## Purpose

Accessibility is a supporting implementation layer for the semenitwasted visual system. The design identity and user experience remain the primary priority; once the visual design is established, adapt the implementation to provide sensible accessibility without unnecessarily changing the established aesthetic.

## Priority

Use this order when resolving accessibility decisions:

1. Preserve the approved semenitwasted visual identity and interaction character.
2. Keep the interface usable and understandable.
3. Apply practical WCAG 2.2 guidance where it can be incorporated without materially damaging the visual system.
4. Prefer small implementation adjustments over redesigning established components solely for accessibility.

Accessibility should improve the implementation, not turn the design into a generic accessibility-first visual system.

Priority 1 yields only when a visual decision materially affects usability, access to functionality, or comprehension (see Baseline). A personal visual preference alone does not outweigh it.

The sections above are the core rules. The sections after the Final Accessibility Checklist add concrete patterns, a WCAG 2.2 criteria map, two check scripts, and additional checks.

## Baseline

Use WCAG 2.2 as the accessibility reference, with Level AA as the practical target where applicable.

The skill does not require every possible accessibility criterion to be treated as a blocker. Accessibility is not a reason to override a deliberate visual decision unless the issue materially affects usability, access to functionality, or comprehension.

For a static personal site, the criteria that matter most are mapped to sections of this file in "WCAG 2.2 AA criteria map". It lists which criteria are in scope and where each one is handled.

## Semantic HTML First

Prefer native semantic HTML before adding ARIA:

- Use `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer` when structurally appropriate.
- Use real headings (`h1`–`h6`) in a logical hierarchy.
- Use `button` for actions and `a` for navigation.
- Use native form elements and labels.
- Use lists for actual lists.
- Keep document structure meaningful even when CSS changes the visual layout.

Use ARIA only when native HTML cannot adequately communicate the component's role, state, or relationship.

Examples of appropriate ARIA usage include dynamic controls that genuinely need state information such as `aria-expanded`, provided the state remains synchronized with the actual UI.

Do not add ARIA attributes merely to make markup appear more accessible.

Also:

- use exactly one `main` per page, and give each `nav` an `aria-label` when there is more than one.
- a `section` is only exposed as a landmark when it has an accessible name. Do not label every section.
- use `details` and `summary` for simple disclosure when the design allows.
- do not add `role="button"` to a `div`. Use a `button`.
- do not repeat the role in a redundant attribute (`<nav role="navigation">`).

## Keyboard Interaction

All essential interactive functionality should remain usable without a mouse.

Check:

- Logical keyboard order.
- Visible focus indication.
- Links and buttons are reachable with `Tab`.
- Interactive controls can be activated with normal keyboard interaction.
- Expandable navigation and controls expose their state when needed.
- Keyboard users are not trapped inside a component.
- No important action depends exclusively on hover.

Keyboard support should be implemented using native controls whenever possible.

Also:

- the focus order follows the order in the HTML. Do not use positive `tabindex` values.
- `tabindex="0"` is for scrollable regions that would otherwise be unreachable. `tabindex="-1"` is for elements that receive focus from a script or a skip link (for example `main`).
- a custom menu closes with `Escape` and returns focus to the control that opened it (see "Implementation patterns").
- anything that can be done by dragging also has a click or tap alternative.
- a scrollable region (a wide table, a code block) is reachable and scrollable by keyboard.

## Focus States

Focus states may use the existing semenitwasted visual language rather than introducing a visually unrelated accessibility treatment.

Preferred approaches:

- Subtle outline or border treatment.
- A controlled shadow change.
- A surface or depth change consistent with the Neumorphic character.
- A combination of these when necessary for visibility.

The focus state must remain visibly distinguishable from the unfocused state. Do not remove the browser focus indicator without replacing it with an equally usable custom indication.

Focus styling should not create layout shift.

Implementation:

- use `:focus-visible` so the indicator appears for keyboard use without adding noise for mouse clicks.
- use the focus tokens from `design-system.md`: `--focus-ring: 2px solid var(--color-dark)` and `--focus-offset: 2px`. An outline does not take layout space, so it does not cause shift.
- on dark surfaces use the light color for the ring so it stays visible.
- a shadow change alone is a weak indicator. Shadows are low contrast, and forced-colors mode removes them entirely. If the Neumorphic shadow change is used, pair it with an outline (a transparent outline is enough, because forced-colors mode shows it).
- an outline can be clipped by an ancestor with `overflow: hidden`. Leave room, or keep the ring inside the element.
- a sticky or fixed header must not cover the focused element. Set `scroll-padding-top` on `html` to the header height (WCAG 2.2: Focus Not Obscured).

## Contrast

Contrast may be adjusted when necessary to improve readability while staying within the semenitwasted monochrome system.

Prefer:

- Adjusting text/surface values within the existing palette direction.
- Using the existing dark/light relationship more effectively.
- Strengthening contrast only where needed.

Do not introduce arbitrary colors simply to satisfy contrast requirements when an appropriate monochrome solution exists.

When practical, target WCAG 2.2 AA contrast requirements for normal text, large text, and meaningful UI elements.

Required ratios:

- 4.5:1 for normal text.
- 3:1 for large text (24px, or about 18.66px in bold) and for UI components and graphics needed to identify a control.

Values for the default tokens (see `design-system.md` section 22):

```text
Primary text on light:    14.48:1
Muted text on light:       5.78:1   (on dark: 7.69:1)
Control border on light:   3.16:1
Disabled text:             3.16:1   (exempt from the text requirement)
```

Also:

- check muted text again when it is placed on a tinted surface or over an image.
- text over an image needs a solid surface behind it.
- a text input must have a visible boundary that reaches 3:1. Use `--color-border-control`, not a shadow alone. A button that is identified by its text does not need a border for this purpose.
- a link that is distinguished from surrounding text by color alone needs a non-color cue. The default is an underline.
- compute a ratio with the contrast command in "Checking without a browser".

## Text Alternatives

Meaningful images should have concise, useful alternative text.

Decorative images should use empty alternative text (`alt=""`) when appropriate so they are not unnecessarily announced by assistive technology.

Do not invent detailed descriptions for imagery when the image's actual purpose or content is unknown.

Decision guide:

```text
Informative image     → concise alt describing what it shows
Image inside a link   → alt describes the destination or action
Decorative image      → alt=""
Text inside an image  → alt repeats the text (better: use real text)
Icon-only button      → accessible name on the button (aria-label or hidden text)
Inline SVG icon       → aria-hidden="true" when decorative; role="img" and aria-label when meaningful
CSS background image  → decorative only. Never the only carrier of content.
```

Also:

- write `alt` in the page language.
- while the content is unknown, use the visible bracketed placeholder form (`alt="[Deskripsi gambar]"`) and list it in the completion summary.
- never start with "image of" or "photo of".

## Forms

Forms should remain understandable and usable with keyboard and assistive technology.

- Give controls visible labels where appropriate.
- Associate labels with their inputs.
- Use native input types where useful.
- Provide clear required/optional information.
- Make error states understandable.
- Do not communicate important information through color alone.
- Keep focus behavior predictable.

Form styling should remain consistent with the semenitwasted surface, radius, shadow, spacing, and typography system.

Also:

- associate every label with its control using `for` and `id`, or by wrapping. A placeholder is not a label.
- add `autocomplete` values where they apply (`name`, `email`, `tel`) so browsers and assistive technology can identify the purpose of the field.
- mark required fields with both the `required` attribute and visible text. Do not use color alone.
- an error message is text next to the field, connected with `aria-describedby`, and the field gets `aria-invalid="true"`. The message says what is wrong and how to fix it.
- group related radios or checkboxes in `fieldset` with a `legend`.
- do not ask the user to enter the same information twice in one flow.
- a status or success message that appears after an action goes in an element with `role="status"` that already exists in the HTML before it is filled.
- do not render a form that appears to send when nothing receives it (see `SKILL.md`).

Markup examples are in "Implementation patterns".

## Navigation and Structure

For pages with substantial content, consider a skip link so keyboard users can move directly to the main content.

Navigation should:

- Have a clear semantic structure.
- Maintain a logical reading and tab order.
- Clearly communicate the current state where applicable.
- Remain usable on mobile.

A skip link should remain visually unobtrusive when not focused and become clearly visible when focused.

Also:

- the skip link is the first focusable element in the page. Its target is the `main` element, which has `id="main"` and `tabindex="-1"`.
- mark the current page in the navigation with `aria-current="page"` and style it with more than color (weight or underline).
- keep the order and wording of navigation links the same on every page.
- put contact or help in the same place on every page.
- the page needs a unique `title`, a `lang` attribute, and a single `h1` (see "Page-level requirements").
- on mobile, the menu control is a `button` with `aria-expanded` (see `responsive.md`).

## Motion

Accessibility should work with the existing subtle motion system.

Respect `prefers-reduced-motion: reduce`:

- Reduce or disable non-essential entrance motion.
- Reduce or disable scroll-reveal movement.
- Disable magnetic interaction effects.
- Avoid decorative animation that continues indefinitely.
- Preserve essential state changes and functionality.

Reduced motion should not remove information or make controls ambiguous.

Also:

- the reduced-motion handling itself is defined in `animation.md` (the motion tokens and the `scroll-behavior` rule). Do not duplicate it here. Check that infinite animations are also stopped, because switching tokens does not stop a keyframe loop.
- moving, blinking, or auto-updating content that lasts more than five seconds needs a way to pause, stop, or hide it. Prefer not to use it.
- nothing flashes more than three times in any one second.
- do not autoplay video with sound. Video that autoplays is muted, has controls, and does not carry essential information.
- when JavaScript decides on motion, read `matchMedia('(prefers-reduced-motion: reduce)')` and listen for changes.

## Touch and Mobile

Interactive targets should generally be large enough to use comfortably on touch devices, with around 44×44px as a practical reference when appropriate.

Do not force every visual element to become 44×44px if that would unnecessarily distort the design; prioritize actual interactive controls.

Avoid hover-only functionality on touch devices.

Also:

- the practical target is 44px. WCAG 2.2 level AA requires at least 24 by 24 CSS px for a target, unless there is enough space around it or the target is an inline link in text.
- keep about 8px between adjacent targets.
- do not lock the page orientation, and do not block pinch zoom.
- a gesture (swipe, long press) always has a visible alternative.
- content that appears on hover or focus follows the rules in "Hover and focus content".

## Screen Readers

Use semantic HTML as the primary accessibility mechanism.

Use accessible names for controls when their visible text does not already provide a sufficient name.

Use ARIA only when needed for:

- Custom interactive components.
- Dynamic state.
- Relationships not adequately represented by native HTML.
- Meaningful status information that needs to be announced.

Avoid excessive ARIA, redundant roles, and duplicated accessible labels.

Also:

- when a control shows visible text, its accessible name starts with that same text. Do not use an `aria-label` that differs from the visible label (WCAG: Label in Name).
- never put `aria-hidden="true"` on something focusable.
- `aria-label` on a plain `div` or `span` is not announced reliably. Use real text or a proper role.
- do not leave empty headings, empty links, or empty buttons.
- visually hidden text uses the `.sr-only` class in "Implementation patterns". It is for genuine context (an icon button's name, the extra context of a link), never for keywords.
- mark an inline phrase in another language with `lang` on that element.

## Visual Design Preservation

Accessibility adjustments must remain visually consistent with semenitwasted.

Do not automatically:

- Replace the monochrome palette with a generic high-contrast theme.
- Remove the Neumorphic character.
- Replace tactile buttons with generic accessibility controls.
- Add thick borders everywhere.
- Add excessive labels or helper text purely for compliance.
- Turn every card into a heavily outlined panel.

Instead, make the smallest effective adjustment that improves accessibility while preserving the approved design.

Examples of the smallest effective adjustment:

```text
Muted text too faint            → use the muted token (5.78:1) instead of a lighter value
Shadow-only focus               → keep the shadow, add the token outline
Input defined by shadow only    → add a 1px border using --color-border-control
Icon-only button                → add an accessible name, keep the icon
Small tap target                → add padding or min-height, keep the visual size
Boundaries vanish in forced colors → 1px solid transparent border at rest
Current page shown by color     → add underline or weight
```

## Content and Accessibility

Do not invent accessibility-related content that is not supported by the user's information.

Do not invent:

- Image descriptions for unknown imagery.
- Form requirements that the user did not specify.
- Status messages or claims that are not real.
- Accessibility statements claiming compliance that was not actually tested.

If content is placeholder content, keep it clearly identifiable as placeholder content.

Also:

- do not add an accessibility statement, a "WCAG compliant" badge, or any compliance claim unless the user supplies it and it was actually tested.
- accessible names and `alt` text are written in the page language. Placeholders follow the visible bracketed form.
- list unresolved placeholders (alt text, labels) in the completion summary.

## Testing

When a browser or rendered-page inspection path is available, check at minimum:

- Keyboard navigation.
- Visible focus states.
- Heading hierarchy.
- Landmark structure.
- Link and button semantics.
- Form labels and states.
- Text and UI contrast.
- Image alternative text.
- Reduced-motion behavior.
- Mobile/touch usability.

Do not claim accessibility testing that was not performed.

If browser or assistive-technology testing is unavailable, perform code-level checks and state the limitation rather than implying full WCAG verification.

A manual keyboard pass, when a browser is available:

1. Press `Tab` from the top of the page and go through every stop. Each one should be visible, in a sensible order, and not hidden behind a sticky header.
2. Use `Shift+Tab` to go backwards.
3. Activate links with `Enter` and buttons with `Enter` or `Space`.
4. Open and close any menu with the keyboard. `Escape` closes it and focus returns to its button.
5. Zoom to 200% and check that nothing is lost.
6. Turn on reduced motion and forced colors (browser emulation is enough) and look again.

Scripts for the parts that can be measured are in "Checking with a headless browser" and "Checking without a browser". Automated checks find only part of the problems. They cannot judge whether alt text is useful, whether labels make sense, or whether the reading order is logical.

Suggested wording for the completion summary:

```text
Accessibility checked: [what was run, at which widths]
Not checked: screen reader testing, [anything else]
```

## Severity

Accessibility findings should be classified realistically:

- **P0 — Blocker:** Essential functionality is inaccessible or unusable.
- **P1 — High:** A major interaction, navigation path, or important content is significantly difficult to access.
- **P2 — Medium:** Noticeable accessibility issue with a reasonable workaround.
- **P3 — Low:** Minor improvement or refinement.

Do not classify a purely stylistic accessibility preference as a blocker when the interface remains usable.

Examples:

- **P0:** a keyboard trap; navigation or the contact method cannot be operated by keyboard; a form that cannot be submitted without a mouse.
- **P1:** no visible focus on the main navigation; body text below 3:1 contrast; form fields without labels; focus hidden behind a sticky header.
- **P2:** muted metadata slightly below 4.5:1; missing `aria-current`; a missing `autocomplete`; an infinite decorative animation without reduced-motion handling.
- **P3:** a redundant role; wording of an `alt` text; a skip link that is not styled as nicely as it could be.

## Final Accessibility Checklist

Before shipping, verify:

- [ ] Semantic HTML is used appropriately.
- [ ] Essential interactions work with keyboard.
- [ ] Focus is visible and consistent with the visual identity.
- [ ] Contrast is reasonable and WCAG 2.2 AA is targeted where applicable.
- [ ] Images have appropriate alternative text treatment.
- [ ] Forms have usable labels and states.
- [ ] ARIA is used only where necessary.
- [ ] Mobile controls are touch-friendly.
- [ ] Hover-only functionality is avoided.
- [ ] `prefers-reduced-motion` is respected.
- [ ] No accessibility adjustment unnecessarily damages the semenitwasted design system.
- [ ] Accessibility verification claims match the tests actually performed.

## Page-level requirements

Every page needs:

- `<html lang="...">` matching the visible language (see `SKILL.md`). Mark phrases in another language with `lang` on the element.
- a unique, descriptive `<title>` (see `seo.md`).
- a viewport meta that does not block zoom (see `responsive.md`).
- exactly one `main`, a top-level `header` and `footer`, and labelled `nav` elements when there are several.
- one `h1`, with headings in order and no skipped levels (see `typography.md`).
- a skip link as the first focusable element when the page has substantial content.
- the same navigation order and wording on every page, and contact or help in the same place.
- no content that can only be reached by hover, drag, or a path-based gesture.

---

## Implementation patterns

Starting patterns that use the tokens from `design-system.md` section 21. Adapt them to the project.

```css
/* Visually hidden text. For genuine context only, never for keywords. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* Skip link: hidden above the page until focused */
.skip-link {
  position: absolute;
  left: var(--space-16);
  top: -80px;
  z-index: 100;
  padding: var(--space-12) var(--space-16);
  background: var(--color-dark);
  color: var(--color-light);
  border-radius: var(--radius);
}
.skip-link:focus-visible { top: var(--space-16); }

/* main receives focus from the skip link but is not interactive */
main:focus { outline: none; }

/* Focus indicator */
:focus-visible {
  outline: var(--focus-ring);
  outline-offset: var(--focus-offset);
}
.on-dark :focus-visible { outline-color: var(--color-light); }

/* Current page: more than color */
[aria-current="page"] {
  font-weight: var(--weight-semibold);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
```

Notes:

- `.sr-only` uses `white-space: nowrap` on purpose. The typography check reports it, and that report can be ignored for this class.
- the skip link text is real, short, and in the page language.
- `[aria-current="page"]` assumes the weight token from `typography.md` section 27.

Skip link and landmark:

```html
<body>
  <a class="skip-link" href="#main">Lewati ke konten utama</a>
  <header>
    <nav aria-label="Utama">
      <ul>
        <li><a href="/" aria-current="page">Beranda</a></li>
        <li><a href="/about/">Tentang</a></li>
      </ul>
    </nav>
  </header>
  <main id="main" tabindex="-1">
    <h1>[Judul halaman]</h1>
  </main>
</body>
```

Form field with hint and error (the error paragraph and `aria-invalid` are added only when the field is invalid):

```html
<div class="field">
  <label for="email">Email (wajib)</label>
  <input id="email" name="email" type="email" autocomplete="email" required
         aria-describedby="email-hint email-error" aria-invalid="true">
  <p id="email-hint">Contoh: nama@domain.com</p>
  <p id="email-error">Format email belum benar. Tambahkan tanda @ dan nama domain.</p>
</div>

<p id="form-status" role="status"></p>
```

Icon button and external link:

```html
<button type="button" aria-label="Tutup menu">
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24">...</svg>
</button>

<a href="[URL yang diberikan]" target="_blank" rel="noopener noreferrer">
  Behance <span class="sr-only">(membuka tab baru)</span>
</a>
```

Menu that opens and closes: the toggle button has `aria-expanded` that matches the real state, `Escape` closes the menu and returns focus to the button, and a link inside the menu closes it. A complete pattern is in `responsive.md`.

---

## Hover and focus content

If extra content appears on hover or keyboard focus (a tooltip, a dropdown, a preview), it must be:

- **dismissible:** it can be closed without moving the pointer or focus, usually with `Escape`.
- **hoverable:** the pointer can move onto the new content without it disappearing.
- **persistent:** it stays until the user dismisses it, moves away, or the information is no longer valid.

Do not put essential information only in a tooltip or `title` attribute. Touch and keyboard users cannot rely on hover.

---

## Forced colors and high contrast

Shadows are removed in forced-colors (high contrast) mode. The design system handles this with a `1px solid transparent` border at rest and an `outline` for focus. See `design-system.md` section 24.

Also:

- do not use `forced-color-adjust: none` to protect the look. Use it only on a small element that cannot work otherwise, such as a color swatch.
- do not rely on a background color alone to show state (selected, current, active).
- test with the emulation in "Checking with a headless browser". It reports a focus indicator that exists only as a shadow.

---

## WCAG 2.2 AA criteria map

Level A and AA criteria that most affect a static personal site, and where each is handled. This map does not claim compliance. It says where to look.

| Criterion | Level | Handled in |
|---|---|---|
| 1.1.1 Non-text content | A | Text Alternatives |
| 1.3.1 Info and relationships | A | Semantic HTML First, Forms |
| 1.3.2 Meaningful sequence | A | Navigation and Structure, `responsive.md` section 19 |
| 1.3.4 Orientation | AA | Touch and Mobile |
| 1.3.5 Identify input purpose | AA | Forms (`autocomplete`) |
| 1.4.1 Use of color | A | Contrast, Forms |
| 1.4.3 Contrast (minimum) | AA | Contrast |
| 1.4.4 Resize text | AA | `typography.md` section 29 |
| 1.4.5 Images of text | AA | Text Alternatives, `seo.md` section 25 |
| 1.4.10 Reflow | AA | `responsive.md` |
| 1.4.11 Non-text contrast | AA | Contrast |
| 1.4.12 Text spacing | AA | `typography.md` section 29 |
| 1.4.13 Content on hover or focus | AA | Hover and focus content |
| 2.1.1 Keyboard, 2.1.2 No keyboard trap | A | Keyboard Interaction |
| 2.2.2 Pause, stop, hide | A | Motion |
| 2.3.1 Three flashes or below | A | Motion |
| 2.4.1 Bypass blocks | A | Navigation and Structure |
| 2.4.2 Page titled | A | Page-level requirements |
| 2.4.3 Focus order | A | Keyboard Interaction |
| 2.4.4 Link purpose (in context) | A | Screen Readers, `seo.md` section 20 |
| 2.4.6 Headings and labels | AA | Forms, `typography.md` |
| 2.4.7 Focus visible | AA | Focus States |
| 2.4.11 Focus not obscured (minimum) | AA | Focus States |
| 2.5.3 Label in name | A | Screen Readers |
| 2.5.7 Dragging movements | AA | Keyboard Interaction |
| 2.5.8 Target size (minimum) | AA | Touch and Mobile |
| 3.1.1 Language of page | A | Page-level requirements |
| 3.1.2 Language of parts | AA | Screen Readers |
| 3.2.3 Consistent navigation | AA | Navigation and Structure |
| 3.2.4 Consistent identification | AA | Navigation and Structure |
| 3.2.6 Consistent help | A | Navigation and Structure |
| 3.3.1 Error identification | A | Forms |
| 3.3.2 Labels or instructions | A | Forms |
| 3.3.3 Error suggestion | AA | Forms |
| 3.3.7 Redundant entry | A | Forms |
| 4.1.2 Name, role, value | A | Semantic HTML First, Screen Readers |
| 4.1.3 Status messages | AA | Forms |

Not applicable to a typical static site with no login: 3.3.8 Accessible authentication.

---

## Checking with a headless browser

If a headless browser is available, the script below walks the page with the `Tab` key and reports:

- a focus stop with no visible change (it compares screenshots of the element before and after focus, including 40px around it for shadows)
- a focused element that is hidden behind another element or off screen
- a focused link or button with no readable name
- a possible keyboard trap (the tab limit is reached)

It does this in the default mode and in forced-colors mode, which finds a focus indicator that exists only as a shadow. It also emulates reduced motion and reports animations that keep running and smooth scrolling that stays on.

Requirements: Python with Playwright and a Chromium browser already installed. Do not download browsers during a task. If Playwright is missing, use "Checking without a browser".

Save as `a11y-browser-check.py` outside the deployed output directory, then run:

```sh
python3 -I a11y-browser-check.py <output-dir> --widths 375,1280
```

```python
import argparse, functools, http.server, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument('root')
ap.add_argument('--widths', default='375,1280')
ap.add_argument('--max-tabs', type=int, default=80)
args = ap.parse_args()

root = Path(args.root).resolve()
pages = sorted(p for p in root.rglob('*.html') if not p.name.startswith('_') and 'node_modules' not in p.parts)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=str(root)))
threading.Thread(target=server.serve_forever, daemon=True).start()
base = 'http://127.0.0.1:%d' % server.server_address[1]

SNAP = """
() => {
  const sel = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [tabindex]:not([tabindex="-1"])';
  const out = {};
  let n = 0;
  for (const el of document.querySelectorAll(sel)) {
    if (el.disabled || !el.getClientRects().length) continue;
    el.setAttribute('data-a11y-i', String(n));
    const r = el.getBoundingClientRect();
    out[n] = [r.left + scrollX, r.top + scrollY, r.width, r.height];
    n++;
  }
  return out;
}
"""

ACTIVE = """
() => {
  const el = document.activeElement;
  if (!el || el === document.body || !el.hasAttribute('data-a11y-i')) return null;
  const r = el.getBoundingClientRect();
  const x = Math.min(Math.max(r.left + r.width / 2, 0), innerWidth - 1);
  const y = Math.min(Math.max(r.top + r.height / 2, 0), innerHeight - 1);
  const top = document.elementFromPoint(x, y);
  const inView = r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  const label = (el.getAttribute('aria-label') || el.innerText || el.value || el.getAttribute('alt') || '').trim().slice(0, 30);
  return { i: el.getAttribute('data-a11y-i'), tag: el.tagName.toLowerCase(), label: label,
           inView: inView,
           obscured: !!top && !(el.contains(top) || top.contains(el)) };
}
"""

ANIM = """
() => ({
  infinite: document.getAnimations().filter(a => a.playState === 'running' && a.effect && a.effect.getComputedTiming().iterations === Infinity).length,
  smooth: getComputedStyle(document.documentElement).scrollBehavior === 'smooth'
})
"""

problems = 0
def flag(msg):
    global problems
    problems += 1
    print('    ! ' + msg)

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    for p in pages:
        rel = p.relative_to(root).as_posix()
        url = base + '/' + (rel[:-10] if rel.endswith('index.html') else rel)
        for w in [int(x) for x in args.widths.split(',')]:
            for mode, opts in (('default', {}), ('forced-colors', {'forced_colors': 'active'}), ('reduced-motion', {'reduced_motion': 'reduce'})):
                ctx = browser.new_context(viewport={'width': w, 'height': 800}, **opts)
                page = ctx.new_page()
                page.goto(url, wait_until='load')
                head = '%-24s %5dpx %-15s' % (rel, w, mode)
                if mode == 'reduced-motion':
                    page.wait_for_timeout(300)
                    a = page.evaluate(ANIM)
                    print(head + ' infinite animations: %d' % a['infinite'])
                    if a['infinite']:
                        flag('%d animation(s) keep running with prefers-reduced-motion: reduce' % a['infinite'])
                    if a['smooth']:
                        flag('smooth scrolling is on with prefers-reduced-motion: reduce')
                else:
                    page.add_style_tag(content='html{scroll-behavior:auto !important}')
                    rects = page.evaluate(SNAP)
                    size = page.evaluate('[document.documentElement.scrollWidth, document.documentElement.scrollHeight]')

                    def clip_of(i):
                        x, y, cw, ch = rects[i]
                        x0, y0 = max(x - 40, 0), max(y - 40, 0)
                        x1, y1 = min(x + cw + 40, size[0]), min(y + ch + 40, size[1])
                        if x1 - x0 < 1 or y1 - y0 < 1:
                            return None
                        return {'x': x0, 'y': y0, 'width': x1 - x0, 'height': y1 - y0}

                    before = {}
                    for i in rects:
                        c = clip_of(i)
                        before[i] = page.screenshot(clip=c, full_page=True) if c else None
                    seen, stops = set(), 0
                    msgs = []
                    for _ in range(args.max_tabs):
                        page.keyboard.press('Tab')
                        page.wait_for_timeout(250)
                        info = page.evaluate(ACTIVE)
                        if info is None or info['i'] in seen:
                            break
                        seen.add(info['i'])
                        stops += 1
                        who = '<%s> "%s"' % (info['tag'], info['label'])
                        c = clip_of(info['i'])
                        if c and before.get(info['i']) is not None and page.screenshot(clip=c, full_page=True) == before[info['i']]:
                            msgs.append('no visible focus change on ' + who)
                        if info['obscured'] or not info['inView']:
                            msgs.append('focused element may be hidden or off screen: ' + who)
                        if not info['label'] and info['tag'] in ('a', 'button'):
                            msgs.append('focused control has no readable name: ' + who)
                    print(head + ' %d focus stop(s)' % stops)
                    if stops == args.max_tabs:
                        msgs.append('reached the tab limit; check for a keyboard trap')
                    for m in msgs:
                        flag(m)
                ctx.close()
    browser.close()
server.shutdown()
print('\n%d problem(s)' % problems)
sys.exit(1 if problems else 0)
```

How to read it:

- a `no visible focus change` line is a failure to fix. Add the outline from "Implementation patterns".
- it only reports what it measured. It does not judge whether the indicator has enough contrast, whether the order is sensible, or whether names are meaningful. Check those by looking.
- state in the completion summary what was run and at which widths.

---

## Checking without a browser

This script reads the HTML and CSS only. It reports:

- a missing `lang`, `title`, or `main`, and several `nav` elements without labels
- a viewport that blocks zoom, duplicate `id` values, positive `tabindex`
- images without `alt`, weak `alt` text, links and buttons with no accessible name
- form controls without a label (a placeholder does not count)
- `aria-hidden` on focusable elements, redundant roles, `target="_blank"` without `rel`
- `outline: none` (as a note), a missing `:focus-visible` rule, motion without a reduced-motion rule, and indefinite animations

It also computes contrast between two colors.

Save as `a11y-static-check.py` outside the deployed output directory, then run:

```sh
python3 -I a11y-static-check.py <output-dir>

# contrast: foreground, background, optional foreground opacity (0 to 1)
python3 -I a11y-static-check.py --contrast '#211B28' '#F0EDF4'
python3 -I a11y-static-check.py --contrast '#211B28' '#F0EDF4' 0.7
```

The two contrast commands print 14.48:1 and 5.78:1, matching the token table in `design-system.md`.

```python
import re, sys
from html.parser import HTMLParser
from pathlib import Path

argv = sys.argv[1:]

# ---- contrast mode: astatic.py --contrast FOREGROUND BACKGROUND [ALPHA]
def lum(rgb):
    def ch(c):
        c = c / 255.0
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = rgb
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)

def hexrgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

if argv and argv[0] == '--contrast':
    fg, bg = hexrgb(argv[1]), hexrgb(argv[2])
    a = float(argv[3]) if len(argv) > 3 else 1.0
    fg = tuple(round(a * f + (1 - a) * b) for f, b in zip(fg, bg))
    l1, l2 = sorted((lum(fg), lum(bg)), reverse=True)
    ratio = (l1 + 0.05) / (l2 + 0.05)
    print('contrast %.2f:1  normal text AA %s  large text / UI AA %s' % (
        ratio, 'pass' if ratio >= 4.5 else 'FAIL', 'pass' if ratio >= 3 else 'FAIL'))
    sys.exit(0)

root = Path(argv[0] if argv else '.')
skip = ('node_modules', '.git')
problems = 0

def flag(where, msg):
    global problems
    problems += 1
    print("  ! %s: %s" % (where, msg))

FOCUSABLE = ('a', 'button', 'input', 'select', 'textarea', 'summary')

class P(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.msgs = []
        self.ids = []
        self.open = []          # open a/button records
        self.label_stack = 0
        self.label_for = set()
        self.controls = []
        self.main = 0
        self.navs = []
        self.first_a = None
        self.main_id = None
        self.ids_set = set()
        self.lang = False
        self.title = False
        self.in_title = False
        self.title_text = ''
        self.viewport = ''

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html' and a.get('lang'):
            self.lang = True
        if tag == 'title':
            self.in_title = True
        if tag == 'meta' and a.get('name', '').lower() == 'viewport':
            self.viewport = a.get('content', '')
        if 'id' in a:
            self.ids.append(a['id'])
            self.ids_set.add(a['id'])
        if tag == 'main':
            self.main += 1
            self.main_id = a.get('id')
        if tag == 'nav':
            self.navs.append(bool(a.get('aria-label') or a.get('aria-labelledby')))
        try:
            if int(a.get('tabindex', '0')) > 0:
                self.msgs.append('positive tabindex on <%s>' % tag)
        except ValueError:
            pass
        if a.get('aria-hidden') == 'true' and (tag in FOCUSABLE or 'tabindex' in a):
            self.msgs.append('aria-hidden on a focusable <%s>' % tag)
        role = a.get('role')
        if (tag, role) in (('nav', 'navigation'), ('button', 'button'), ('main', 'main'), ('header', 'banner'), ('footer', 'contentinfo'), ('ul', 'list')):
            self.msgs.append('redundant role="%s" on <%s>' % (role, tag))
        if tag == 'img' and 'alt' not in a:
            self.msgs.append('<img> without alt attribute: %s' % (a.get('src', '')[:50]))
        if tag == 'img' and a.get('alt') and re.search(r'^(image|photo|picture|foto|gambar)\b|\.(jpe?g|png|webp|svg)$', a['alt'].strip(), re.I):
            self.msgs.append('weak alt text: "%s"' % a['alt'])
        if tag == 'a':
            href = a.get('href')
            if self.first_a is None:
                self.first_a = href
            if href is None:
                self.msgs.append('<a> without href')
            elif href.strip() == '#':
                self.msgs.append('<a href="#"> placeholder link')
            if a.get('target') == '_blank' and 'noopener' not in a.get('rel', ''):
                self.msgs.append('target=_blank without rel="noopener"')
        if tag in ('a', 'button'):
            self.open.append({'tag': tag, 'text': '', 'name': bool(a.get('aria-label') or a.get('aria-labelledby'))})
        if self.open:
            if tag == 'img' and a.get('alt'):
                self.open[-1]['text'] += a['alt']
            if tag == 'svg' and (a.get('aria-label') or a.get('aria-labelledby')):
                self.open[-1]['name'] = True
        if tag == 'label':
            self.label_stack += 1
            if a.get('for'):
                self.label_for.add(a['for'])
        if tag in ('input', 'select', 'textarea'):
            if a.get('type', 'text').lower() not in ('hidden', 'submit', 'button', 'reset', 'image'):
                self.controls.append((tag, a, self.label_stack > 0))

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'label' and self.label_stack:
            self.label_stack -= 1
        if tag in ('a', 'button') and self.open:
            rec = self.open.pop()
            if not rec['text'].strip() and not rec['name']:
                self.msgs.append('<%s> with no accessible name' % tag)

    def handle_data(self, data):
        if self.in_title:
            self.title_text += data
        for rec in self.open:
            rec['text'] += data

pages = [p for p in sorted(root.rglob('*.html')) if not p.name.startswith('_') and not any(s in p.parts for s in skip)]
css_files = [p for p in sorted(root.rglob('*.css')) if not any(s in p.parts for s in skip)]
all_css = ''
for p in pages:
    t = p.read_text(encoding='utf-8', errors='replace')
    rel = p.relative_to(root)
    all_css += '\n'.join(re.findall(r'<style[^>]*>(.*?)</style>', t, re.S | re.I)) + '\n'
    ps = P()
    ps.feed(t)
    before = problems
    if not ps.lang: flag(rel, 'missing <html lang>')
    if not ps.title_text.strip(): flag(rel, 'missing or empty <title>')
    if ps.main != 1: flag(rel, 'expected exactly one <main>, found %d' % ps.main)
    if len(ps.navs) > 1 and not all(ps.navs): flag(rel, 'several <nav> elements and some have no aria-label')
    if re.search(r'user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*[01](\.\d+)?\b', ps.viewport, re.I):
        flag(rel, 'viewport blocks zoom')
    dups = sorted(set(i for i in ps.ids if ps.ids.count(i) > 1))
    if dups: flag(rel, 'duplicate id: %s' % ', '.join(dups))
    for tag, a, wrapped in ps.controls:
        named = wrapped or a.get('id') in ps.label_for or a.get('aria-label') or a.get('aria-labelledby')
        if not named:
            extra = ' (placeholder is not a label)' if a.get('placeholder') else ''
            flag(rel, '<%s name="%s"> has no label%s' % (tag, a.get('name', ''), extra))
    for m in sorted(set(ps.msgs)):
        flag(rel, m)
    if problems == before: print("%s: ok" % rel)
    has_skip = ps.first_a and ps.first_a.startswith('#') and ps.first_a[1:] in ps.ids_set
    if not has_skip:
        print("  note %s: no skip link as the first link (consider one for pages with substantial content)" % rel)

for c in css_files:
    all_css += c.read_text(encoding='utf-8', errors='replace') + '\n'
css = re.sub(r'/\*.*?\*/', '', all_css, flags=re.S)
if css.strip():
    if re.search(r'outline\s*:\s*(none|0)\b', css):
        print("  note css: `outline: none/0` found; confirm each is replaced by a visible focus indicator")
    if ':focus-visible' not in css:
        flag('css', 'no :focus-visible rule found')
    motion = re.search(r'\btransition\s*:|\banimation(-name)?\s*:|scroll-behavior\s*:\s*smooth', css)
    if motion and 'prefers-reduced-motion' not in css:
        flag('css', 'motion is used but there is no prefers-reduced-motion rule')
    if re.search(r'animation[^;{}]*\binfinite\b', css):
        flag('css', 'an animation repeats indefinitely (limit it, or provide a way to pause)')
    if 'forced-colors' not in css:
        print("  note css: no forced-colors rule (see the forced colors section)")
print("\n%d page(s) checked, %d problem(s)" % (len(pages), problems))
sys.exit(1 if problems else 0)
```

A reported item is not always an error. Confirm each one and say in the completion summary which are intentional. This script cannot tell whether an `alt` text is useful, whether a label is clear, or whether the reading order makes sense.

---

## Additional checks

Add to the Final Accessibility Checklist:

### Page and structure

- [ ] `lang`, a unique `title`, and one `main` exist on every page
- [ ] A skip link is the first focusable element when the page has substantial content
- [ ] Several `nav` elements each have an `aria-label`
- [ ] The current page is marked with `aria-current="page"` and shown by more than color

### Focus and keyboard

- [ ] A focus indicator exists as an outline, not only as a shadow
- [ ] The focused element is not hidden behind a sticky header
- [ ] No positive `tabindex` is used
- [ ] A menu closes with `Escape` and focus returns to its button
- [ ] Scrollable regions can be reached and scrolled by keyboard

### Content and forms

- [ ] Every control has a label, and no placeholder stands in for one
- [ ] Required fields are marked in text, not only by color
- [ ] Errors are text, connected to the field, and say how to fix the problem
- [ ] Icon-only buttons have an accessible name
- [ ] Visible text is contained in the accessible name
- [ ] No `aria-hidden` on a focusable element

### Motion and contrast

- [ ] No animation repeats indefinitely without a reduced-motion rule or a way to pause
- [ ] Contrast was computed, not assumed, for any color outside the token set
- [ ] Muted text is not used for essential information below body size

### Honesty

- [ ] No accessibility statement or compliance badge is shown unless supplied and tested
- [ ] The completion summary says what was checked and what was not