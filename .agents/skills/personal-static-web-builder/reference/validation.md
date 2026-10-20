# Web Builder Validation

Use this checklist after implementing or revising a page with `web-builder-SKILL.md`.

In this skill that file is `SKILL.md` (skill name `personal-static-web-builder`). The older name above refers to the same instructions.

Sections 1 to 10 are the core checklist. Sections 11 to 16 add the order of work, how to run the check scripts that live in the other reference files, two further scripts, a completion-summary template, and additional checks.

The goal is not merely to confirm that the page runs. The page must fulfill its purpose, remain consistent with the selected design system, and feel intentionally composed at the actual rendered size.

## 1. Source-of-truth check

- [ ] The user's explicit instructions and supplied references were followed.
- [ ] Existing approved pages/components were reused or matched where appropriate.
- [ ] The page uses the correct design system for this project; no unrelated visual style was introduced.
- [ ] Existing project conventions and technical constraints were preserved.
- [ ] Content is accurate or clearly identified as placeholder content.

## 2. Spaciousness and spacing hierarchy

Evaluate the rendered result, not only CSS values.

- [ ] Major page sections have enough separation to read as distinct groups.
- [ ] Page title and introductory copy have comfortable breathing room.
- [ ] Related elements sit closer together than unrelated groups.
- [ ] Card padding prevents content from feeling cramped or touching the edges.
- [ ] Inside complex cards, headings, descriptions, demos, metadata, and code blocks are visually separated.
- [ ] Repeated cards do not visually merge into one continuous wall of content.
- [ ] Spacing follows the even-number scale and existing responsive rules where practical.
- [ ] Whitespace supports hierarchy instead of appearing accidental.
- [ ] The page has not been made unnecessarily long by increasing every margin or padding value.
- [ ] Content has not been compressed just to fit more above the fold.

If the page feels cramped, identify the specific cause before changing values:
1. insufficient space between major sections;
2. crowded card internals;
3. weak grouping between content blocks;
4. too many controls or competing elements;
5. excessive text/code density;
6. inconsistent spacing relationships.

Fix the cause, then inspect the result again. Do not increase every spacing value indiscriminately.

Reference values when judging spacing:

- section gaps of 96 / 64 / 48px on desktop / tablet / mobile, and gutters of 24 / 20 / 16px (`responsive.md` section 6).
- card padding starting values are in `responsive.md` section 10. They are starting points, not rules.
- judge the rendered result at the viewports in section 5. If no rendered view is available, say the spacing review was code-level only (section 9).

## 3. Visual consistency

- [ ] Colors, typography, radius, shadows, borders, and surfaces follow the applicable design-system references.
- [ ] Neumorphism and shadows are restrained and used intentionally.
- [ ] Buttons, cards, pills, and repeated components share consistent interaction states.
- [ ] The page feels related to other approved pages without forcing every page into the same composition.
- [ ] Repeated elements are consistent, but the layout still suits the page's purpose.
- [ ] No decorative element has been added without a clear purpose.

The token check in section 13 lists colors, shadows, radii, and easing values that are not part of the design system. It lists candidates only. Judge each one.

## 4. Content hierarchy and readability

- [ ] The primary purpose and main content are easy to identify.
- [ ] Headings establish a clear hierarchy.
- [ ] Body text and supporting text are readable at the tested viewport.
- [ ] Line lengths and text density are comfortable.
- [ ] Dense content, such as documentation or code, is grouped and scannable.
- [ ] The page does not depend on animation or hover to reveal essential information.

Type scale and text measure are in `typography.md`. Essential content must also be present in the HTML and readable without JavaScript (`seo.md` section 25).

## 5. Responsive review

When browser/rendering tools are available, inspect at least one desktop, one intermediate, and one mobile viewport.

- [ ] Content order remains logical.
- [ ] Page padding and section spacing adapt to the viewport.
- [ ] Cards and grids reflow without clipping or awkward gaps.
- [ ] Navigation and controls remain usable.
- [ ] No horizontal page overflow appears unexpectedly.
- [ ] Long code, tables, and media remain readable or have intentional overflow handling.
- [ ] The mobile layout is composed for mobile rather than merely squeezed down from desktop.

Which widths to use:

- this checklist asks for at least three: one desktop, one intermediate, one mobile.
- `SKILL.md` section 16 names about 375, 768, 1024, and 1280px.
- `responsive.md` section 20 gives the fuller set (320, 390, 768, 900, 1024, 1200, and one pixel either side of the 768 and 1024 breakpoints).

Use the fuller set when tools allow it. Measurements come from `responsive-check.py` (`responsive.md` section 28), or from the static `responsive-static-check.py` (section 29) when there is no browser.

## 6. Interaction and accessibility

- [ ] Links navigate to valid destinations.
- [ ] Buttons and controls perform the action their appearance promises.
- [ ] Hover, active, focus, disabled, loading, and success states are appropriate where applicable.
- [ ] Keyboard navigation and visible focus states work.
- [ ] Semantic HTML and accessible labels are used.
- [ ] Contrast and reduced-motion behavior have been considered.
- [ ] Touch controls are usable without relying on hover.

The details are in `accessibility.md`. Its scripts walk the page with the keyboard and find focus indicators that are missing or hidden. They cannot judge whether the focus order is logical, so look at that yourself.

## 7. Technical and delivery checks

- [ ] The project build or validation command succeeds when available.
- [ ] No obvious console errors or missing assets remain.
- [ ] No dead links, fake interactions, or fake success messages remain.
- [ ] Static deployment requirements are preserved when applicable.
- [ ] Performance basics (image sizing, font loading, unnecessary scripts/effects) have been reviewed.
- [ ] No P0 or P1 issue remains.

Where to check each item:

- console errors, failed requests, broken images, and internal links or anchors: `console-check.py` (section 14).
- performance basics: `performance.md` section 39, and the shell commands in its section 38.
- title, description, canonical, JSON-LD, and links in the page head: `seo.md` section 36.
- if there is no build step, say "no build step". Do not write "build passed".

## 8. Review severity

Report issues by practical impact:

- **P0 — Blocker:** The page cannot be used, has materially false content, or has a critical security/accessibility issue.
- **P1 — High:** The primary task is broken, there is a major responsive failure, or a critical interaction does not work.
- **P2 — Medium:** A noticeable visual, usability, accessibility, or performance issue that does not block the primary task.
- **P3 — Low:** Minor polish or consistency issue with limited user impact.

Do not inflate cosmetic preferences into blockers. Fix P0/P1 issues before completion; address P2 issues where practical.

The SEO, accessibility, and performance reference files each list their own examples for these four levels. The levels mean the same thing everywhere. When one problem appears in more than one area, report it once at the highest level and name the areas.

Examples from the reference files:

- **P0:** a site-wide `noindex` or `Disallow: /` left on production; a keyboard trap; navigation that cannot be operated without a mouse.
- **P1:** horizontal overflow on mobile; focus hidden behind a sticky header; a placeholder shipped in the title, description, or structured data; the main image or font blocking the first render.
- **P2:** muted text slightly below 4.5:1; missing `og:image`; a Bento card that leaves an awkward empty area on tablet; images without `srcset`.
- **P3:** minor wording of metadata or alt text; an off-token value with no visible effect.

## 9. Verification honesty

- [ ] State whether rendered/browser verification was actually performed.
- [ ] If no rendered preview was available, say that the review was code-level only.
- [ ] Do not claim screenshot comparison, interaction testing, or build success unless it happened.
- [ ] Summarize important changes, checks performed, and remaining limitations.

Wording that matches the evidence:

```text
Ran the scripts and looked at the screenshots → "Checked in headless Chromium at 375, 768, 1024, and 1280px. No horizontal overflow was measured."
Read the code only                            → "Code-level review only. A rendered view was not available."
A script reported items                       → name the items you judged intentional and why.
Nothing measured for speed                    → do not give a score, an LCP value, or "passes Lighthouse".
No screen reader used                         → say so. Do not write "WCAG compliant".
```

## 10. Final ship gate

A page is ready when:

- [ ] It fulfills the user's request.
- [ ] It is consistent with the chosen visual system.
- [ ] Spacing hierarchy and spaciousness have been deliberately reviewed.
- [ ] Desktop, intermediate, and mobile layouts have been checked when tools permit.
- [ ] Important interactions and accessibility basics have been checked.
- [ ] Technical checks have been performed where available.
- [ ] No P0/P1 issue remains.
- [ ] Verification limits are clearly stated.

Run this gate together with `SKILL.md` section 18, and keep the completion summary short (section 15).

## 11. Order of work

Run the checks in this order. Cheap checks come first, so most problems are found before the slower ones.

1. **Source of truth (section 1).** Reread the request. List the placeholders.
2. **Static checks (no browser needed).** Run the SEO, typography, responsive-static, accessibility-static, and token checks (section 12). Fix what they find.
3. **Rendered checks (when a browser is available).** Run the responsive check with screenshots, the accessibility browser check, and the console check. Open the screenshots and look at them. A script cannot judge whether the page feels composed.
4. **Manual passes.** Tab through the page. Turn on reduced motion. Look at spacing and hierarchy (sections 2 to 4).
5. **Performance basics.** Run the shell commands in `performance.md` section 38 and review its section 39 list.
6. **Fix and re-run.** Re-run only the checks that failed, then the ones that the fix could have affected.
7. **Write the summary (section 15).** Say what was checked and what was not.

For one small page, the minimum is the static checks, one pass of the three rendered checks, and a look at the screenshots at the three viewports in section 5.

---

## 12. Running the check scripts

The scripts are written inside the reference files, so they travel with the skill. This command copies them out to a folder outside the deployed output directory. Run it once per task.

```sh
python3 -I - <references-dir> <checks-dir> <<'PY'
import re, sys
from pathlib import Path

refs, out = Path(sys.argv[1]), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
plan = {
    'seo.md': ['seo-check.py'],
    'typography.md': ['typography-check.py'],
    'responsive.md': ['responsive-check.py', 'responsive-static-check.py'],
    'accessibility.md': ['a11y-browser-check.py', 'a11y-static-check.py'],
    'validation.md': ['token-check.py', 'console-check.py'],
}
for name, targets in plan.items():
    path = refs / name
    if not path.is_file():
        print('! missing reference file: %s' % name)
        continue
    blocks = re.findall(r'```python\n(.*?)```', path.read_text(encoding='utf-8'), re.S)
    if len(blocks) != len(targets):
        print('! %s: expected %d script(s), found %d' % (name, len(targets), len(blocks)))
        continue
    for target, block in zip(targets, blocks):
        (out / target).write_text(block, encoding='utf-8')
        print('wrote', out / target)
PY
```

Then run the checks against the static output directory (called `<output-dir>` here):

```sh
# Static: Python standard library only
python3 -I <checks-dir>/seo-check.py <output-dir>
python3 -I <checks-dir>/typography-check.py <output-dir>
python3 -I <checks-dir>/responsive-static-check.py <output-dir>
python3 -I <checks-dir>/a11y-static-check.py <output-dir>
python3 -I <checks-dir>/token-check.py <output-dir>

# Rendered: needs Python Playwright and Chromium that are already installed
python3 -I <checks-dir>/responsive-check.py <output-dir> --shots <screenshot-dir>
python3 -I <checks-dir>/a11y-browser-check.py <output-dir>
python3 -I <checks-dir>/console-check.py <output-dir>
```

| Script | Defined in | Covers |
|---|---|---|
| `seo-check.py` | `seo.md` section 36 | title, H1, description, canonical, language, JSON-LD, internal links |
| `typography-check.py` | `typography.md` section 32 | font sizes, weights, families, heading order |
| `responsive-static-check.py` | `responsive.md` section 29 | viewport, `100vw`, breakpoints, fixed widths |
| `responsive-check.py` | `responsive.md` section 28 | overflow at each width, tap targets, screenshots |
| `a11y-static-check.py` | `accessibility.md` | labels, names, landmarks, `alt`, ARIA misuse, contrast values |
| `a11y-browser-check.py` | `accessibility.md` | focus visibility, hidden focus, forced colors, reduced motion |
| `token-check.py` | section 13 | colors, shadows, radii, easing outside the design system |
| `console-check.py` | section 14 | console errors, failed requests, broken images, internal links |

Notes:

- do not put the scripts or screenshots inside the output directory. They would be deployed.
- if Playwright or a browser is missing, run only the static scripts and say the rendered review could not be done (section 9). Do not download a browser during the task.
- a reported item is not always an error. Confirm each one and record which you judged intentional.
- exit code 1 only means a script printed at least one item. It does not mean the page is broken.

---

## 13. Design token drift check

This script finds values that do not belong to the design system: colors outside the three palette colors, shadows that are not the signature or derived shadows, radii other than 10px, easing keywords instead of the motion token, and `transition: all`. It reads CSS files, `<style>` blocks, and inline `style` attributes.

Save as `token-check.py` outside the deployed output directory, then run `python3 -I token-check.py <output-dir>`:

```python
import re, sys
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
skip = ('node_modules', '.git')
ALLOWED_HEX = {'#f0edf4', '#211b28', '#450d50'}
ALLOWED_RGB = {(240, 237, 244), (33, 27, 40), (69, 13, 80)}
SHADOWS = {
    '18px 18px 16px rgb(69 13 80 / 20%)', '4px 4px 4px rgb(69 13 80 / 25%)',
    '8px 8px 8px rgb(69 13 80 / 22%)', '2px 2px 2px rgb(69 13 80 / 25%)',
}
NAMED = r'\b(white|black|red|green|blue|gray|grey|silver|orange|yellow|purple|pink|brown|navy|teal|cyan|magenta)\b'
problems = 0

def flag(where, msg):
    global problems
    problems += 1
    print("  ! %s: %s" % (where, msg))

def norm(v):
    v = re.sub(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)',
               lambda m: 'rgb(%s %s %s / %s%%)' % (m.group(1), m.group(2), m.group(3), round(float(m.group(4)) * 100)), v)
    return re.sub(r'\s+', ' ', v.strip().rstrip(';'))

files = [p for p in sorted(root.rglob('*')) if p.suffix in ('.css', '.html') and not any(s in p.parts for s in skip)]
for p in files:
    raw = p.read_text(encoding='utf-8', errors='replace')
    css = '\n'.join(re.findall(r'<style[^>]*>(.*?)</style>', raw, re.S | re.I)) if p.suffix == '.html' else raw
    if p.suffix == '.html':
        css += '\n' + '\n'.join(re.findall(r'style="([^"]*)"', raw))
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    rel = p.relative_to(root)
    for h in set(re.findall(r'#[0-9a-fA-F]{3,8}\b', css)):
        if h.lower() not in ALLOWED_HEX:
            flag(rel, "color outside the palette: %s" % h)
    for m in re.finditer(r'rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)', css):
        if tuple(int(x) for x in m.groups()) not in ALLOWED_RGB:
            flag(rel, "rgb color outside the palette: %s" % m.group(0))
    if re.search(r'\bhsla?\(', css):
        flag(rel, "hsl color found (the palette is defined in hex/rgb)")
    for m in re.finditer(r'(?<![-\w])(color|background(?:-color)?|border(?:-[a-z]+)?-color|border|fill|stroke)\s*:\s*([^;}]*)', css):
        if re.search(NAMED, m.group(2), re.I):
            flag(rel, "named color in %s: %s" % (m.group(1), m.group(2).strip()))
    for m in re.finditer(r'(?<![-\w])box-shadow\s*:\s*([^;}]+)', css):
        v = norm(m.group(1))
        if v in ('none', 'inherit', 'initial') or 'var(' in v:
            continue
        parts = [x.strip() for x in re.split(r',\s*(?![^()]*\))', v)]
        if not all(x in SHADOWS or x.startswith('inset') or re.match(r'^0 0 0 \d+px', x) for x in parts):
            flag(rel, "shadow not in the system (confirm intended): %s" % v)
    for m in re.finditer(r'(?<![-\w])border-radius\s*:\s*([^;}]+)', css):
        v = m.group(1).strip()
        if 'var(' in v or v in ('0', '0px', '50%', '100%', 'inherit') or v == '10px':
            continue
        if re.search(r'\b9{3,4}px\b', v):
            flag(rel, "pill radius (confirm intended; pills are not a default): %s" % v)
        else:
            flag(rel, "radius is not the 10px token: %s" % v)
    if re.search(r'transition\s*:\s*all\b', css):
        flag(rel, "transition: all (name the properties)")
    for m in re.finditer(r'(?<![-\w])(?:transition|animation)(?:-timing-function)?\s*:[^;}]*(?<![-\w])(ease-in-out|ease-in|ease-out|ease)(?![-\w])', css):
        flag(rel, "easing keyword instead of the motion token: %s" % m.group(1))

print("\n%d item(s) to confirm" % problems)
sys.exit(1 if problems else 0)
```

Notes:

- the palette is `#F0EDF4`, `#211B28`, `#450D50`. The text-tone tokens in `design-system.md` section 22 (for example `rgb(33 27 40 / 70%)`) pass, because they are built from the palette.
- a project that defines its own approved palette should say so, and the report should be judged against that palette. Do not change the page to satisfy the script.
- a pill radius or an extra shadow is not forbidden. The script asks you to confirm that it is intended.
- it does not check spacing, type sizes, or fonts. The responsive and typography scripts do.

---

## 14. Console, asset, and link check

This script loads each page in a headless browser and reports:

- console errors and warnings, and uncaught script errors
- requests to the same site that fail or return 400 or higher
- images that did not load
- internal links that return an error, anchors (`#name`) with no matching `id`, and placeholder links (`href="#"`)

External links are counted but not checked. Requests to other hosts that fail (for example in an offline environment) are shown as a note.

Requirements: Python with Playwright and a Chromium browser already installed. Do not download browsers during a task.

Save as `console-check.py` outside the deployed output directory, then run `python3 -I console-check.py <output-dir>`:

```python
import argparse, functools, http.server, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument('root')
ap.add_argument('--widths', default='375,1280')
args = ap.parse_args()

root = Path(args.root).resolve()
pages = sorted(p for p in root.rglob('*.html') if not p.name.startswith('_') and 'node_modules' not in p.parts)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=str(root)))
threading.Thread(target=server.serve_forever, daemon=True).start()
base = 'http://127.0.0.1:%d' % server.server_address[1]

PAGE_JS = """
() => ({
  links: Array.from(document.querySelectorAll('a[href]')).map(a => ({ raw: a.getAttribute('href'), href: a.href })),
  ids: Array.from(document.querySelectorAll('[id]')).map(e => e.id),
  brokenImages: Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.getAttribute('src'))
})
"""

problems = 0
status_cache = {}

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
            ctx = browser.new_context(viewport={'width': w, 'height': 800})
            page = ctx.new_page()
            errors, failed, external = [], [], set()
            page.on('console', lambda m: errors.append('console %s: %s' % (m.type, m.text[:120])) if m.type in ('error', 'warning') else None)
            page.on('pageerror', lambda e: errors.append('script error: %s' % str(e)[:120]))
            page.on('response', lambda r: failed.append('%d %s' % (r.status, r.url.replace(base, ''))) if r.status >= 400 and r.url.startswith(base) else None)
            page.on('requestfailed', lambda r: (external.add(r.url.split('/')[2]) if not r.url.startswith(base) else failed.append('failed ' + r.url.replace(base, ''))))
            page.goto(url, wait_until='load')
            page.wait_for_timeout(300)
            info = page.evaluate(PAGE_JS)
            print('%-24s %5dpx' % (rel, w))
            seen = set(f.split(' ', 1)[1] for f in failed if f[0].isdigit())
            for e in errors:
                if 'Failed to load resource' not in e:
                    flag(e)
            for f in sorted(set(failed)):
                if f.startswith('failed ') and f.split(' ', 1)[1] in seen:
                    continue
                flag('request failed: ' + f)
            for s in info['brokenImages']:
                flag('image did not load: ' + s)
            ext = 0
            for l in info['links']:
                raw, href = l['raw'].strip(), l['href']
                if raw.startswith(('mailto:', 'tel:', 'javascript:')):
                    continue
                if raw == '#':
                    flag('placeholder link href="#"')
                elif raw.startswith('#'):
                    if raw[1:] not in info['ids']:
                        flag('anchor target not found: ' + raw)
                elif href.startswith(base):
                    target = href.split('#')[0]
                    if target not in status_cache:
                        status_cache[target] = ctx.request.get(target).status
                    if status_cache[target] >= 400:
                        flag('internal link returns %d: %s' % (status_cache[target], raw))
                else:
                    ext += 1
            if ext:
                print('    note: %d external link(s) not checked' % ext)
            if external:
                print('    note: requests to other hosts failed (offline?): %s' % ', '.join(sorted(external)))
            ctx.close()
    browser.close()
server.shutdown()
print('\n%d problem(s)' % problems)
sys.exit(1 if problems else 0)
```

Notes:

- it serves the output directory from a local server. A site that depends on a server-side redirect or on `_redirects` rules will not behave the same way here as on Cloudflare Pages.
- root-relative links work because the output directory is served as the site root.
- a clean result means no error was seen in this run. It does not prove the page works in every browser.

---

## 15. Completion summary template

Keep it short and write it in the user's language. Use only the lines that apply.

```text
Built:         [what was built and which files]
Assumptions:   [decisions made when the request was open]
Placeholders:  [each one the user still needs to fill]
Checked:       [which checks were run, at which widths, with what tool]
Not checked:   [anything not verified, and why]
Remaining:     [open issues, each with P0 to P3]
```

Rules:

- list only checks that were actually run (section 9).
- every item in `Placeholders` is a bracketed value that still exists in the output, including alt text and metadata.
- do not list the steps taken. List the result.

---

## 16. Additional checks

Add to the checklists above:

### Process

- [ ] The check scripts were extracted outside the output directory
- [ ] Static checks were run before the rendered checks
- [ ] Every item a script reported was either fixed or recorded as intentional
- [ ] After a fix, the failed checks were run again

### Rendered review

- [ ] Screenshots were opened and looked at, not only the script output
- [ ] Widths tested are listed in the completion summary, with any that were not tested
- [ ] The keyboard was used to go through the page, or the summary says it was not

### Content and delivery

- [ ] The token check reported no unexplained color, shadow, or radius
- [ ] The console check reported no error, failed request, or broken internal link
- [ ] Every placeholder is listed in the completion summary
- [ ] No score, timing, or compliance claim appears without a measurement behind it