# SEO — Static Personal Web Builder

## 1. Purpose

This document defines the SEO and information-structure rules for the general-purpose static personal web builder.

SEO is treated primarily as a **structure and discoverability layer**, not as a marketing layer that dictates the visual design.

The website should be easy for:

- people to read and understand,
- search engines to crawl and interpret,
- AI systems and other machine-readable systems to understand,
- users looking for the person's services to discover the site.

The visual identity remains the primary design direction. SEO should be integrated into that design without making the interface feel like an SEO-driven website.

Sections 1 to 31 are the core rules. Sections 32 to 37 add implementation details: a head template, language handling, URLs on Cloudflare Pages, a structured-data example, checks that work without external tools, and additional checks.

For visual or motion questions, defer to `design-system.md` and `animation.md`. This file governs structure, metadata, and discoverability.

---

## 2. SEO Priority

Use this priority order:

1. User purpose and readable content
2. Visual design and established design system
3. Clear information architecture
4. Semantic HTML and document structure
5. Search discoverability
6. Machine-readable metadata and structured data

SEO must not distort the visual hierarchy or user experience.

If an SEO technique makes the page harder to understand, visually inconsistent, repetitive, or unnatural, prefer the clearer user-facing solution.

---

## 3. Primary Website Positioning

The default website functions as a **digital business card / personal professional website**.

The website should make the person's professional identity understandable quickly.

For the default semenitwasted context, the positioning should naturally communicate relevant capabilities such as:

- icon designer
- icon design
- web designer
- website design
- static website / personal website work when relevant

These terms should appear naturally in meaningful content.

Do not turn the page into a keyword list.

These terms are the default for the semenitwasted context only. For a different person or profession, take the positioning terms from the content the user supplies, not from this list.

---

## 4. Source of Truth

Follow this order:

1. User's explicit current instruction
2. User-provided content and approved copy
3. Approved design references and implementation
4. This SEO specification
5. Existing project/framework conventions
6. Minimal implementation assumptions

Never invent personal facts, clients, projects, credentials, achievements, statistics, testimonials, URLs, social profiles, or business claims for SEO purposes.

If a fact is needed for metadata and is not supplied, apply the missing-information rule in section 23.

---

## 5. Information Architecture

SEO begins with a clear information hierarchy.

Every page should answer:

- What is this page about?
- Who is it for?
- What should the user understand first?
- What action or next step is relevant?

Use a logical content sequence.

A typical personal page may follow:

1. Primary identity / introduction
2. Main capabilities or services
3. Selected work or supporting evidence
4. Supporting information
5. Contact / next action

The exact structure can change according to the requested page.

Do not force every page into the same structure.

For a single-page site, the same sequence becomes sections of one page with in-page anchors (`#work`, `#contact`). Do not split content into extra pages only for SEO.

Leave out any part of the sequence the person has no content for. An empty "Services" section is worse than no section.

---

## 6. Semantic HTML

Use semantic HTML wherever practical.

Prefer:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<aside>`
- `<footer>`
- `<h1>` through `<h6>`
- `<p>`
- `<ul>` / `<ol>`
- `<button>`
- `<a>`
- `<form>`
- `<label>`

Avoid using generic `<div>` elements when a semantic element communicates the purpose more clearly.

Semantic structure should support both accessibility and machine interpretation.

Also:

- use exactly one `<main>` per page
- give each `<nav>` an `aria-label` when a page has more than one
- use `<a>` for navigation and `<button>` for actions, never a clickable `<div>`
- use `<figure>` and `<figcaption>` for images that have a caption
- use `<time datetime="...">` for dates when dates are shown
- keep `<header>` and `<footer>` meaningful rather than wrapping every block in them

---

## 7. Heading Structure

Each page should normally have one clear primary `<h1>`.

The H1 should communicate the page's main subject naturally.

Use headings according to content hierarchy:

- H1 — page subject
- H2 — major sections
- H3 — subsections or related content
- H4+ — only when genuinely necessary

Do not choose heading levels because of visual size.

Typography should control appearance; heading levels should communicate structure.

Do not insert keywords into headings unnaturally.

Also:

- the H1 must be visible content. Do not hide it with `display: none`, and do not move it off-screen.
- a visually restyled H1 is fine as long as it stays readable.
- do not skip levels (H2 followed directly by H4).
- a Bento card title is a heading (H2 or H3 according to its place in the hierarchy), not a styled `<div>` or `<p>`.
- a single-page site still has exactly one H1.

---

## 8. Content and Keywords

Use keywords naturally based on the actual content and purpose of the website.

For the default personal-business-card positioning, relevant terminology may include:

- icon designer
- icon design
- custom icon design
- web designer
- web design
- website design
- personal website
- static website

Only use a term when it accurately describes the person's actual offering or content.

Avoid:

- keyword stuffing,
- repeated phrases solely for SEO,
- hidden keywords,
- unnatural sentence construction,
- irrelevant trending keywords,
- large blocks of SEO text that provide little user value.

A concise, useful sentence is preferable to several repetitive keyword variations.

Write terms in the language of the page. See section 33.

---

## 9. Page Titles

Every indexable page should have a unique, descriptive `<title>`.

Recommended pattern:

`[Page Topic] — [Person / Brand]`

or, when more useful:

`[Service / Topic] | [Person / Brand]`

Keep titles concise and readable.

The title should reflect the actual page content.

Do not create titles containing claims or keywords that the page does not support.

If the person's name or brand is not provided, use a clear placeholder rather than inventing one.

Guidelines (not hard limits):

- aim for roughly 50 to 60 characters, which usually displays without truncation
- each page has its own unique title
- exactly one `<title>` per page, inside `<head>`
- the home page can use `[Person / Brand] — [Role]`
- use the same bracketed placeholder style as the page content, for example `[Nama Anda]`, and list it in the completion summary so it is replaced before launch

---

## 10. Meta Description

Every important indexable page should have a useful meta description when practical.

The description should:

- summarize the actual page,
- explain its value to the user,
- use relevant terminology naturally,
- avoid keyword stuffing,
- avoid invented claims,
- remain understandable when displayed outside the website.

AI may generate a draft meta description from the supplied page content.

If the page contains placeholder content, the metadata must not turn those placeholders into false personal claims.

Guidelines (not hard limits):

- aim for roughly 120 to 160 characters
- write a natural sentence, not a list of keywords
- each page has its own unique description
- search engines may rewrite the description shown in results, so the page content itself must also carry the message

---

## 11. Open Graph and Social Sharing

For public pages, support Open Graph metadata when practical.

Typical fields:

- `og:title`
- `og:description`
- `og:type`
- `og:url`
- `og:image`
- `og:site_name`

Use an appropriate social preview image when one is actually available.

Do not invent an image URL.

If a social preview image has not been supplied or created, omit the image metadata rather than referencing a fictional asset.

Use page-specific values when the page benefits from them.

Also:

- `og:image` needs an absolute URL. If the domain is unknown, omit the image tag (see section 32).
- a common preview size is 1200 × 630 px (about 1.91:1). Use JPG, PNG, or WebP.
- when `og:image` is present, add `og:image:alt` with a short description of the image.
- `og:url` must equal the canonical URL.
- use `og:type` of `website` for the home page and general pages, and `article` for articles. Do not pick a type that does not fit.
- `og:locale` (for example `id_ID`) is optional and must match the page language.

---

## 12. Social / X Card Metadata

When relevant to the project, provide social card metadata for platforms that support it.

Typical fields may include:

- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

Do not add unnecessary metadata simply for completeness.

The values should remain consistent with the page's canonical title and description.

Also:

- use `twitter:card` with `summary_large_image` when a roughly 1.91:1 image exists, otherwise `summary`.
- X can fall back to the Open Graph tags for title, description, and image. When the Open Graph set is complete, `twitter:card` alone is enough and the other `twitter:*` tags can be omitted.

---

## 13. Canonical URLs

Use a canonical URL for indexable pages when the real site URL is known.

The canonical URL should represent the preferred public URL of the page.

Do not invent a domain.

If the domain is unknown during development:

- use a clearly marked placeholder only when the project's implementation requires one, or
- leave the canonical value configurable until deployment.

Canonical URLs should not point to unrelated pages.

Also:

- use an absolute `https` URL.
- one canonical per page, placed in `<head>`, normally pointing to the page itself.
- match the canonical to the URL form used in the sitemap, `og:url`, and internal links (see section 34), including trailing slash.
- if the domain is unknown, omit the canonical tag rather than shipping a made-up domain, and list "add canonical after deploy" in the completion summary.

---

## 14. URL and Slug Rules

There is no rigid universal slug format.

Choose URLs that are:

- understandable,
- reasonably short,
- relevant to the page,
- consistent with the existing project.

Prefer readable paths such as:

- `/about`
- `/services`
- `/contact`
- `/work`

when they accurately represent the page.

Do not rename existing routes unnecessarily.

Preserve existing project conventions when they are already established.

Also:

- use lowercase letters, digits, and hyphens. Avoid spaces, underscores, uppercase, and non-ASCII characters in paths.
- do not include file extensions in public links (`/about/` not `/about.html`).
- avoid dates and numbers in slugs unless they carry meaning.
- on Cloudflare Pages, `about/index.html` is served at `/about/`. Choose one URL form and use it everywhere (see section 34).

---

## 15. Sitemap

For multi-page public static websites, provide a sitemap when practical.

Typically:

`/sitemap.xml`

Include public indexable pages that should be discoverable.

Do not include:

- private pages,
- development-only pages,
- duplicate routes,
- pages explicitly marked `noindex`.

The sitemap should remain consistent with the actual deployed routes.

For a very small site, implementation can remain simple.

Also:

- list absolute URLs in `<loc>` (`https://...`), matching the canonical URLs exactly.
- include `<lastmod>` only when a real date is known. Do not generate dates.
- a sitemap needs the real domain. If it is unknown, do not ship a sitemap that contains a made-up domain. Tell the user to generate it at deploy time instead.
- a single-page site does not need a sitemap.
- minimal valid file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc></url>
</urlset>
```

`example.com` here is only a format example. Never copy it into a real project.

---

## 16. Robots.txt

Provide:

`/robots.txt`

when the project benefits from explicit crawler instructions.

The default should not accidentally block the public website.

If a sitemap exists, the robots file may reference its public URL.

Do not use `robots.txt` as a substitute for correct page-level indexing controls.

Do not block CSS, JavaScript, or important assets required for understanding the rendered page unless there is a specific reason.

Minimal file that allows everything:

```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

Also:

- include the `Sitemap:` line only when a sitemap exists and the real domain is known.
- never ship `Disallow: /` on a production site.
- allowing or blocking specific AI crawlers is the owner's decision. Do not add such rules unless the user asks.
- Cloudflare Pages preview deployments are normally not meant to be indexed. Verify this on the deployed preview rather than assuming it, and do not copy preview rules into the production files.

---

## 17. Indexing Controls

Use indexing directives intentionally.

Normal public pages should generally remain indexable.

Use `noindex` only when there is a clear reason, such as:

- temporary/private content,
- duplicate utility pages,
- internal-only pages,
- development or staging content.

Do not add `noindex` simply because a page has placeholder content during development unless the project specifically requires it.

Also:

- page-level control is `<meta name="robots" content="noindex">` or an `X-Robots-Tag` header set in `_headers`.
- do not block a `noindex` page in `robots.txt`. A crawler that cannot fetch the page cannot see the directive.
- a `noindex` page is not listed in the sitemap and does not need a canonical to another page.
- if `noindex` was added for staging, removing it is part of the launch checklist (see section 37).

---

## 18. Structured Data / JSON-LD

Structured data is **conditional**.

Use it when it provides meaningful machine-readable context for the page.

Possible schema types include:

- `Person`
- `WebSite`
- `WebPage`
- `ProfilePage`
- `Article`
- other appropriate schema types when genuinely applicable

Do not add structured data simply to increase the amount of code.

Every structured-data claim must be supported by visible or otherwise valid project information.

Never invent:

- job titles,
- company affiliations,
- ratings,
- reviews,
- social profiles,
- addresses,
- awards,
- client relationships,
- statistics.

Keep JSON-LD synchronized with the actual page content.

Also:

- JSON-LD is data, not executable script: `<script type="application/ld+json">` does not conflict with a no-inline-script rule.
- use valid JSON: double quotes, no trailing commas, no comments.
- use `"@context": "https://schema.org"`.
- omit any property whose value is unknown. Do not leave empty strings or bracketed placeholders.
- a personal profile page usually fits `ProfilePage` with a `Person` as `mainEntity`. See section 35.
- structured data does not guarantee any special display in search results.

---

## 19. Personal / Professional Entity Clarity

Because the website functions partly as a digital business card, the site should make the person's professional identity easy to understand.

Where accurate, clearly communicate:

- person's name,
- professional role,
- primary capabilities,
- relevant services,
- portfolio/work,
- contact path.

The goal is not to repeat these terms everywhere.

The goal is to make the relationship between **person → profession → services → work → contact** clear.

This also improves machine interpretation without requiring artificial SEO copy.

Also:

- spell the person's name identically in `<title>`, H1, footer, and structured data.
- the contact path must be a real link (`mailto:`, `tel:`, or a form that works), not text inside an image.

---

## 20. Internal Linking

Use internal links when they improve navigation and understanding.

Links should have descriptive labels.

Prefer:

`View Icon Design Work`

over:

`Click here`

Link related pages where useful:

- About → Work
- Services → Work
- Work → Contact
- relevant service → relevant portfolio item

Do not add links purely to increase the number of internal links.

Also:

- the same label should not point to different destinations.
- the main navigation is consistent across pages, and every public page is reachable from it.
- if the design uses a short label such as "Selengkapnya" or "View", add context with visually hidden text (for example `<span class="sr-only">tentang proyek ikon</span>`) so the link is descriptive out of context. Do not use hidden text to add keywords.

---

## 21. Image SEO

Images should have meaningful filenames when practical.

Prefer:

`custom-line-icon-set.webp`

over:

`IMG_4821.webp`

Use descriptive `alt` text when the image communicates meaningful information.

Decorative images may use empty alt text where appropriate.

Do not stuff keywords into alt text.

Do not describe visual details that provide no useful information.

Example:

Good:

`alt="Custom line icon set designed for a finance application"`

Avoid:

`alt="best icon designer Bali custom icon design icon designer"`

If the actual subject is unknown, do not invent it.

Also:

- always include the `alt` attribute. Use `alt=""` for decorative images.
- do not start with "image of" or "photo of".
- write `alt` in the page language.
- always set `width` and `height` (see `performance.md`).
- decorative inline SVG icons use `aria-hidden="true"`. A meaningful SVG gets `role="img"` and an `aria-label`.
- text that appears inside an image must also exist as HTML text.

---

## 22. Links and External URLs

Use real URLs only when they are supplied, verified, or already present in the project.

Never invent:

- portfolio URLs,
- social profiles,
- Behance/Dribbble links,
- LinkedIn profiles,
- business pages,
- client websites.

Broken or fictional URLs are worse than omitted links.

Also:

- use `https` for external URLs.
- external links that open in a new tab use `target="_blank"` with `rel="noopener noreferrer"`.
- `mailto:` and `tel:` links are created only from contact details the user supplied. Write `tel:` numbers in international format.
- a missing URL is shown as visible placeholder text (for example `[Link Behance]`), not as `href="#"` and not as a made-up domain.

---

## 23. Content Integrity

SEO must never override content integrity.

The AI may generate:

- metadata drafts,
- heading suggestions,
- keyword suggestions,
- semantic structure,
- JSON-LD structure based on known information.

The AI must not fabricate facts to improve discoverability.

If information is missing:

1. use neutral wording,
2. use a clearly identifiable placeholder where appropriate,
3. or omit the claim.

Never convert placeholder text into an apparently factual SEO statement.

Placeholders in metadata are allowed in drafts only in the same visible bracketed form used in the page (for example `[Nama Anda]`). They must be listed in the completion summary and must never appear in JSON-LD.

---

## 24. AI / Machine Discoverability

The website should be understandable to both traditional search engines and AI-driven discovery systems through clear information architecture.

Prioritize:

- explicit identity,
- clear professional terminology,
- semantic HTML,
- descriptive headings,
- useful page titles,
- meaningful metadata,
- consistent internal linking,
- accurate structured data when relevant,
- readable visible content.

Do not use hidden text, keyword stuffing, or machine-only content intended to manipulate ranking.

The goal is **clear information**, not manipulation.

Also:

- `llms.txt` and similar files are optional and have no confirmed effect on search ranking. Do not add them unless the user asks.
- do not add text, comments, or metadata aimed at AI crawlers that is not meant for human readers.

---

## 25. Content Visibility

Important information should exist as real page content whenever possible.

Do not rely exclusively on:

- images containing text,
- canvas-rendered text,
- client-side effects,
- hover-only information,
- animation-only content.

The primary professional identity and service information should remain readable in the document structure.

Also:

- content that is invisible until a scroll animation runs must still be in the HTML and visible when JavaScript is off (use the `.js` flag pattern in `animation.md`).
- content in tabs or accordions should be in the HTML. Prefer `<details>` and `<summary>` where the design allows.
- the page must remain readable with JavaScript disabled.

---

## 26. Performance and SEO

SEO implementation should not unnecessarily harm performance.

Prefer:

- static HTML where practical,
- optimized images,
- modern image formats when appropriate,
- lazy loading for below-the-fold media,
- reserved image dimensions,
- minimal JavaScript,
- efficient CSS,
- no unnecessary third-party scripts.

Do not add large libraries only for SEO features that can be implemented simply.

Also:

- do not add analytics, tag managers, or tracking scripts for SEO purposes.
- do not lazy-load the main above-the-fold image. See `performance.md` for LCP handling.
- layout shift hurts page experience. Reserve space for images and fonts as described in `performance.md`.

---

## 27. Static Deployment

The default target is a static website suitable for platforms such as Cloudflare Pages.

SEO implementation should work without requiring a backend runtime.

The build should produce the required public files and metadata as part of the static output.

Typical public files may include:

- HTML pages
- CSS
- JavaScript when necessary
- images/assets
- `robots.txt`
- `sitemap.xml`

If the existing project uses a framework, preserve its established static-generation conventions.

Also:

- `robots.txt` and `sitemap.xml` live at the root of the output directory so they resolve at `/robots.txt` and `/sitemap.xml`.
- add `404.html`, `_headers`, and `_redirects` only when needed (see section 34).

---

## 28. SEO and Visual Design

SEO must remain subordinate to the established visual design system.

Do not:

- add visible keyword blocks,
- add unnecessary text solely for search engines,
- repeat headings,
- create visually awkward SEO sections,
- add generic footer keyword lists,
- sacrifice spacing or hierarchy for metadata,
- create dense text areas that conflict with the design.

The semenitwasted visual character remains the primary visible experience.

SEO should work **inside the design**, not compete with it.

Also:

- the footer contains name, contact, and copyright. No keyword lists or link farms.
- visually hidden text is for genuine context (labels, link context) only. Never use it to carry keywords.
- do not shrink, fade, or move text off-screen to hide it.

---

## 29. SEO Validation

Before shipping, check:

### Structure

- [ ] Page has a clear subject
- [ ] H1 represents the page subject
- [ ] Heading hierarchy is logical
- [ ] Semantic HTML is used where appropriate
- [ ] Important information is present as readable content

### Metadata

- [ ] Title exists
- [ ] Title matches actual page content
- [ ] Meta description is useful
- [ ] Open Graph metadata is configured when appropriate
- [ ] Social card metadata is configured when appropriate
- [ ] Canonical is correct when domain is known

### Discoverability

- [ ] Relevant professional terminology appears naturally
- [ ] Internal links are meaningful
- [ ] Images have appropriate filenames/alt text
- [ ] Sitemap is generated when appropriate
- [ ] robots.txt does not accidentally block public content
- [ ] Indexing directives are intentional

### Structured Data

- [ ] JSON-LD is used only when useful
- [ ] Structured-data claims match real information
- [ ] No fabricated entities or claims exist

### Integrity

- [ ] No keyword stuffing
- [ ] No hidden SEO text
- [ ] No invented personal facts
- [ ] No fictional URLs
- [ ] Placeholder content is clearly distinguishable
- [ ] Metadata does not turn placeholders into false claims

### Technical

- [ ] Static deployment remains functional
- [ ] Public routes resolve correctly
- [ ] Assets resolve correctly
- [ ] No unnecessary SEO-related JavaScript is introduced
- [ ] No obvious broken links or metadata references

---

## 30. SEO Severity

Classify issues using:

### P0 — Blocker

Examples:

- public pages accidentally blocked from crawling,
- canonical points to an unrelated domain/page,
- major content is inaccessible to normal users,
- deployment prevents the intended public pages from being discovered.

### P1 — High

Examples:

- missing or incorrect primary page title,
- broken sitemap,
- incorrect canonical on important pages,
- major heading/content structure is misleading,
- important public page accidentally marked `noindex`.

### P2 — Medium

Examples:

- missing useful meta description,
- incomplete social metadata,
- weak internal linking,
- missing meaningful image metadata,
- structured data could improve machine understanding.

### P3 — Low

Examples:

- minor metadata wording improvements,
- optional optimization,
- small naming refinements.

Do not inflate minor SEO preferences into blockers.

Additional examples by severity:

- P0: a site-wide `noindex` or `Disallow: /` left on the production site
- P1: a placeholder or invented value shipped in the title, description, Open Graph tags, or JSON-LD
- P1: canonical or sitemap URLs that use a wrong or made-up domain
- P1: no H1, or more than one H1 that competes for the page subject
- P2: `og:image` present but not an absolute URL, or `og:url` that differs from the canonical
- P2: images without `alt` attributes
- P3: title or description length outside the suggested range

---

## 31. Final SEO Principle

The website should feel like a well-designed personal website first.

A useful rule:

> **Make the information obvious to people, then make the structure obvious to machines.**

The strongest SEO outcome for this project comes from combining:

**clear identity + useful content + semantic structure + accurate metadata + consistent visual design.**

Never sacrifice the semenitwasted user experience merely to satisfy an SEO checklist.

---

## 32. Head essentials

Every page `<head>` should contain the essentials below. Include optional lines only under the stated condition.

```html
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[Nama Anda] — [Peran]</title>
  <meta name="description" content="[Deskripsi singkat 1-2 kalimat]">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#F0EDF4">

  <!-- Only when the real domain is known -->
  <link rel="canonical" href="https://DOMAIN/PATH/">
  <meta property="og:url" content="https://DOMAIN/PATH/">

  <!-- Open Graph -->
  <meta property="og:title" content="[Nama Anda] — [Peran]">
  <meta property="og:description" content="[Deskripsi singkat 1-2 kalimat]">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="[Nama Anda]">

  <!-- Only when a real image file exists AND the domain is known -->
  <meta property="og:image" content="https://DOMAIN/assets/NAMA-FILE.jpg">
  <meta property="og:image:alt" content="[Deskripsi gambar]">

  <meta name="twitter:card" content="summary_large_image">

  <!-- Only when a favicon file is supplied -->
  <link rel="icon" href="/assets/NAMA-FILE.svg" type="image/svg+xml">
</head>
```

Rules:

- `<meta charset>` comes first so it is inside the first 1024 bytes.
- the bracketed values and `DOMAIN`, `PATH`, `NAMA-FILE` are templates. Replace them with supplied values, or delete the line. Do not ship them.
- `color-scheme` and `theme-color` match the tokens in `design-system.md`.
- use `twitter:card` of `summary` when no large image exists.
- do not reference a favicon or social image file that does not exist in the project.

---

## 33. Language and terminology

- set `<html lang>` to the language of the visible content (for example `id` or `en`). See `SKILL.md`.
- write the title, description, Open Graph text, `alt` text, and structured-data text in the same language as the page.
- mark an inline phrase in another language with `lang` on that element, for example `<span lang="en">icon designer</span>`.
- do not add `hreflang` for a site that has a single language version. Add it only when equivalent pages in other languages really exist.
- use the terms the content naturally uses. For an Indonesian page, `desainer ikon`, `desain ikon`, `desainer web`, and `desain website` are natural, and `web designer` is also commonly used. Pick the form that reads naturally and do not stack both forms in one sentence to cover keywords.
- the English keyword list in section 8 is a reference for meaning, not a requirement to write English copy.

---

## 34. URL consistency, redirects, and 404 on Cloudflare Pages

- choose one URL form per page and use it everywhere: canonical, `og:url`, sitemap, internal links, and navigation.
- default form for new projects is a folder with `index.html`, served as `/about/`.
- use root-relative internal links (`/about/`) so they work on the custom domain and on the `*.pages.dev` address.
- verify the resolved URL form after deployment, because redirect behavior between `/about`, `/about/`, and `/about.html` is handled by the platform.
- add `404.html` at the output root so missing routes show a helpful page. It should contain a link back to the home page, keep the normal site design, and stay out of the sitemap.
- add `_redirects` only when a route is renamed or removed. Example: `/old-path /new-path/ 301`. Do not rename routes without a reason (section 14).
- choose one host form (with or without `www`) for the canonical. Redirecting the other host is configured on the platform or DNS side, not in page HTML.
- the canonical points to the custom domain once it is known, not to the `*.pages.dev` address.

---

## 35. Structured data example

A personal profile page can use `ProfilePage` with a `Person`:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "<supplied name>",
    "jobTitle": "<supplied role>",
    "description": "<same text as the meta description>",
    "url": "<canonical URL>",
    "sameAs": ["<supplied profile URL>"]
  }
}
```

Rules:

- the `<...>` values are explanations, not content. Replace each with a supplied value or delete the property.
- if the person's name is not supplied, omit the whole JSON-LD block. Add it when the name is known.
- `url` is included only when the real domain is known.
- `sameAs` contains only profile URLs the user supplied. Omit it when there are none.
- never include `AggregateRating`, `Review`, `award`, `worksFor`, `address`, or similar properties unless the user supplied the facts and they are visible on the page.
- every value must match the visible page text.
- no bracketed placeholder may appear in JSON-LD.

---

## 36. Validation without external tools

Use these checks when Lighthouse, a browser, or online validators are unavailable. They read the built files only.

Per-page report and problems. Save as `seo-check.py` outside the deployed output directory, then run `python3 -I seo-check.py <output-dir>`:

```python
import json, re, sys
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
pages = sorted(p for p in root.rglob('*.html') if not p.name.startswith('_') and 'node_modules' not in p.parts)
problems = 0

def flag(page, msg):
    global problems
    problems += 1
    print(f"  ! {page}: {msg}")

for p in pages:
    t = p.read_text(encoding='utf-8', errors='replace')
    rel = p.relative_to(root)
    n = lambda pat: len(re.findall(pat, t, re.I))
    print(f"{rel}: title={n(r'<title[\s>]')} h1={n(r'<h1[\s>]')} "
          f"description={n(r'<meta[^>]+name=[\"\']description')} "
          f"canonical={n(r'<link[^>]+rel=[\"\']canonical')} "
          f"lang={'yes' if re.search(r'<html[^>]+lang=', t, re.I) else 'NO'}")
    if n(r'<title[\s>]') != 1: flag(rel, "needs exactly one <title>")
    if n(r'<h1[\s>]') != 1: flag(rel, "needs exactly one <h1>")
    if not re.search(r'<html[^>]+lang=', t, re.I): flag(rel, "missing <html lang>")
    if re.search(r'name=["\']robots["\'][^>]*noindex', t, re.I): flag(rel, "noindex present (intended?)")
    if re.search(r'(content|href)=["\'][^"\']*\[[^\]]+\]', t): flag(rel, "bracketed placeholder inside a metadata or link attribute")
    if re.search(r'<title[^>]*>[^<]*\[[^<]*</title>', t, re.I): flag(rel, "placeholder in <title> (ok in draft, list in summary)")
    for m in re.finditer(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', t, re.S | re.I):
        try:
            json.loads(m.group(1))
        except Exception as e:
            flag(rel, f"invalid JSON-LD: {e}")
        if re.search(r'"[^"]*\[[A-Za-z][^"]*\][^"]*"', m.group(1)):
            flag(rel, "bracketed placeholder inside JSON-LD")
    # internal links must resolve to a file
    for h in re.findall(r'<a[^>]+href=["\'](/[^"\'#?]*)', t, re.I):
        base = h.rstrip('/')
        cands = [base, base + '.html', base + '/index.html'] if base else ['index.html']
        if not any((root / c.lstrip('/')).is_file() for c in cands):
            flag(rel, f"internal link does not resolve: {h}")

print(f"\n{len(pages)} page(s) checked, {problems} problem(s)")
sys.exit(1 if problems else 0)
```

It reports, per HTML file: number of `<title>` and `<h1>` elements, presence of description, canonical, and `<html lang>`, `noindex`, bracketed placeholders in metadata or link attributes, invalid or placeholder-bearing JSON-LD, and internal root-relative links that do not resolve to a file. A `noindex` or title placeholder is reported so it can be confirmed as intended; it is not always an error.

Quick searches:

```sh
# leftover noindex in pages or headers (should be empty for production)
grep -rn "noindex" --include='*.html' --include='_headers' <output-dir>

# placeholders left in metadata
grep -rnE 'content="\[' --include='*.html' <output-dir>

# robots.txt must not block the whole site
grep -n "Disallow: /$" <output-dir>/robots.txt

# sitemap entries (compare against the real pages)
grep -o "<loc>[^<]*</loc>" <output-dir>/sitemap.xml
```

State in the completion summary which checks were run and which could not be run (for example, no network to confirm the deployed URL form).

---

## 37. Additional checks

Add to the checklist in section 29:

### Head and metadata

- [ ] `<html lang>` matches the visible language
- [ ] Exactly one `<title>` and one H1 per page
- [ ] Each page has a unique title and description
- [ ] Canonical, `og:url`, sitemap URL, and internal links use the same URL form
- [ ] `og:image` is an absolute URL to an existing file, or the tag is omitted
- [ ] No bracketed placeholder remains in `<title>`, description, Open Graph tags, or JSON-LD, or each remaining one is listed in the completion summary

### Indexing

- [ ] No `noindex` or `Disallow: /` remains on a production build unless the user asked for it
- [ ] A `noindex` page is not blocked in `robots.txt`
- [ ] `robots.txt` and `sitemap.xml` are at the output root
- [ ] No sitemap or canonical uses a made-up domain

### Content

- [ ] The H1 is visible and not hidden
- [ ] Content is readable with JavaScript disabled
- [ ] Contact path is a real link, not text in an image
- [ ] Missing URLs are visible placeholders, not `href="#"`
- [ ] Hidden text is used only for genuine labels or link context, never for keywords

### Cloudflare Pages

- [ ] `404.html` exists when the site has more than one page
- [ ] `_headers` and `_redirects` exist only when needed
- [ ] URL form was checked on the deployed site, or noted as unverified