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

---

## 13. Canonical URLs

Use a canonical URL for indexable pages when the real site URL is known.

The canonical URL should represent the preferred public URL of the page.

Do not invent a domain.

If the domain is unknown during development:

- use a clearly marked placeholder only when the project's implementation requires one, or
- leave the canonical value configurable until deployment.

Canonical URLs should not point to unrelated pages.

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

---

## 16. Robots.txt

Provide:

`/robots.txt`

when the project benefits from explicit crawler instructions.

The default should not accidentally block the public website.

If a sitemap exists, the robots file may reference its public URL.

Do not use `robots.txt` as a substitute for correct page-level indexing controls.

Do not block CSS, JavaScript, or important assets required for understanding the rendered page unless there is a specific reason.

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

---

## 31. Final SEO Principle

The website should feel like a well-designed personal website first.

A useful rule:

> **Make the information obvious to people, then make the structure obvious to machines.**

The strongest SEO outcome for this project comes from combining:

**clear identity + useful content + semantic structure + accurate metadata + consistent visual design.**

Never sacrifice the semenitwasted user experience merely to satisfy an SEO checklist.
