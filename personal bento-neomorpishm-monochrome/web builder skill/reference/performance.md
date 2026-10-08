# Performance — Static Personal Web Builder

## 1. Purpose

This document defines the performance principles for the general-purpose static personal web builder.

The default project is a lightweight static website intended for platforms such as Cloudflare Pages.

Performance should keep the website:

- fast to load,
- responsive to interaction,
- stable while rendering,
- efficient on common devices and networks,
- maintainable,
- suitable for static deployment.

Performance is important, but it must remain aligned with the established visual design.

---

## 2. Performance Priority

Use this priority order:

1. User experience
2. Visual design and established design system
3. Clear content and structure
4. Functional interaction
5. Performance optimization
6. Numerical performance scores

Do not change an intentional visual decision merely to improve a benchmark score.

The goal is a website that **feels fast and remains visually correct**, not a website optimized exclusively for synthetic metrics.

---

## 3. Expected Project Weight

The default website is expected to be relatively lightweight because it is primarily:

- static,
- content-focused,
- minimally dependent on JavaScript,
- not dependent on a backend runtime,
- not expected to contain large media libraries by default.

A simple personal page may therefore require very little optimization beyond good implementation practices.

Do not introduce unnecessary performance complexity when the actual page is already small.

---

## 4. Static-First Architecture

Prefer static output whenever possible.

Use:

- pre-rendered HTML,
- static CSS,
- minimal JavaScript,
- optimized assets,
- static metadata.

Avoid introducing:

- server-side runtimes without a real requirement,
- unnecessary APIs,
- client-side data fetching,
- large JavaScript frameworks or libraries for simple interactions,
- runtime dependencies that could be replaced with static content.

If an existing framework is already used, preserve its conventions and use its static-generation capabilities where appropriate.

---

## 5. JavaScript

Use JavaScript only when it provides meaningful functionality or UX.

Good uses include:

- navigation interaction,
- menu toggles,
- form behavior,
- intentional animation,
- interactive components,
- progressive enhancement.

Avoid JavaScript for things that HTML/CSS can handle naturally.

Do not:

- add libraries for trivial interactions,
- duplicate static content in JavaScript,
- load large dependencies for small effects,
- execute unnecessary code on every page.

Prefer progressive enhancement:

> The page should remain understandable and usable without unnecessary client-side JavaScript.

---

## 6. JavaScript Loading

When JavaScript is required:

- load only what the page needs,
- prefer modern module loading,
- defer non-critical scripts,
- avoid blocking initial rendering unnecessarily,
- split page-specific functionality where appropriate.

Do not load a large global JavaScript bundle when only one page requires a small interaction.

---

## 7. CSS

Keep CSS maintainable and efficient.

Prefer:

- reusable design tokens,
- shared component styles,
- CSS variables,
- predictable selectors,
- modern layout systems such as Grid and Flexbox.

Avoid:

- excessive selector nesting,
- duplicated styles,
- unnecessary animation rules,
- large unused CSS,
- inline styles repeated across many elements.

The existing design system should be represented through reusable variables rather than duplicated values.

---

## 8. Images

Image optimization is a standard requirement whenever images are used.

Prefer:

- AVIF or WebP when appropriate,
- responsive image sizes,
- appropriate compression,
- correctly sized source images,
- lazy loading for below-the-fold images,
- explicit `width` and `height` or equivalent aspect-ratio reservation.

Do not serve a 3000px-wide image when a 600px-wide image is sufficient.

However, **image sharpness is allowed to take priority when it is visually important**.

If a user explicitly requests preservation of image sharpness or quality:

1. use an appropriate source resolution,
2. choose a suitable format,
3. use controlled compression,
4. avoid excessive optimization that creates visible artifacts.

Performance optimization must not unnecessarily degrade important visual assets.

---

## 9. Images Above the Fold

Images that are immediately visible may need different treatment from below-the-fold images.

Do not blindly lazy-load the primary visual asset if doing so noticeably delays the first meaningful visual experience.

Consider:

- correct source dimensions,
- efficient format,
- appropriate priority,
- avoiding unnecessary JavaScript-based loading.

The actual treatment should depend on the page composition.

---

## 10. Fonts

Typography is part of the visual identity.

The default typography uses **Rubik**.

Prefer self-hosting the font when practical.

A self-hosted setup can reduce dependency on external font providers and gives the project more control over:

- loading,
- caching,
- privacy,
- availability,
- deployment behavior.

If the local font files are not currently available, obtain the appropriate font files from a legitimate source before implementing self-hosting.

Do not use an unknown or modified font file.

Only include the font weights actually required by the design.

The default supported weights are:

- 400
- 500
- 600
- 700

Avoid loading unused weights.

Use appropriate `font-display` behavior so text does not remain invisible while the font loads.

A suitable fallback font stack should remain available.

---

## 11. Font Performance

Avoid loading multiple font families unless the design explicitly requires them.

Do not load:

- unused weights,
- unused styles,
- unnecessary language subsets,
- duplicate font files.

If a font subset can safely cover the actual content, it may be used.

Typography quality should remain visually consistent with the design system.

---

## 12. Third-Party Dependencies

Avoid third-party scripts by default.

Examples include:

- analytics,
- chat widgets,
- tracking systems,
- external embeds,
- marketing pixels,
- unnecessary CDN libraries.

A third-party service may be introduced when the user explicitly requests it or when it provides meaningful required functionality.

When introducing one:

- understand its loading cost,
- avoid blocking critical rendering,
- load it only where needed,
- do not add it globally without a reason.

---

## 13. Animation Performance

Animation rules are primarily defined in `animation.md`.

From a performance perspective:

Prefer:

- `transform`,
- `opacity`,
- compositor-friendly properties.

Avoid animating layout-heavy properties unnecessarily, such as:

- `width`,
- `height`,
- `top`,
- `left`,
- large changes to layout geometry.

Avoid expensive continuous effects.

The default motion system should remain subtle and tactile.

Do not add animation merely because it is technically possible.

---

## 14. Scroll Reveal Performance

Scroll reveal should use an efficient mechanism such as `IntersectionObserver`.

Avoid:

- continuous scroll event calculations for simple reveals,
- expensive DOM queries on every scroll frame,
- repeated layout measurements,
- large numbers of simultaneously animated elements.

Scroll reveal must never interfere with normal scrolling.

---

## 15. Interaction Responsiveness

Interactions should feel immediate.

Avoid long delays before:

- buttons respond,
- navigation opens,
- forms respond,
- important content becomes usable.

Use appropriate transition timing from `animation.md`.

Performance should support the tactile character of the interface rather than make interactions feel sluggish.

---

## 16. Layout Stability

Avoid unexpected layout movement while content loads.

Use:

- explicit image dimensions,
- aspect-ratio reservations,
- predictable component sizing,
- stable typography loading,
- reserved space for dynamic content when necessary.

Pay particular attention to:

- images,
- fonts,
- navigation,
- cards,
- buttons,
- embedded content.

Avoid inserting content above already-rendered content without reserved space.

---

## 17. Core Web Vitals

Use Core Web Vitals as quality indicators.

Relevant metrics include:

- **LCP — Largest Contentful Paint**
- **INP — Interaction to Next Paint**
- **CLS — Cumulative Layout Shift**

These metrics help identify real user-experience problems.

Do not treat them as absolute numbers that must be maximized at any cost.

A slightly lower synthetic score may be acceptable when the alternative would damage:

- image quality,
- typography,
- interaction quality,
- intentional animation,
- visual hierarchy,
- overall design fidelity.

The objective is healthy real-world performance.

---

## 18. Lighthouse

Lighthouse may be used as a validation and diagnostic tool.

Relevant categories include:

- Performance
- Accessibility
- Best Practices
- SEO

Use Lighthouse to identify structural and implementation problems.

Do not optimize exclusively for the score.

If a change increases the score but makes the website visually worse or less usable, do not automatically accept the change.

Treat the score as evidence, not as the final design authority.

---

## 19. Caching

Use caching appropriately for static assets.

Long-lived caching is particularly useful for assets that are safely immutable or fingerprinted.

Good candidates may include:

- hashed CSS,
- hashed JavaScript,
- versioned images,
- font files.

HTML documents may require different caching behavior because they can change independently of versioned assets.

Do not apply aggressive immutable caching to files that are expected to change at the same URL.

---

## 20. Compression

Serve text-based assets with modern compression when supported by the deployment platform.

Relevant assets include:

- HTML,
- CSS,
- JavaScript,
- SVG,
- JSON,
- other text-based resources.

Brotli is preferred when supported.

Gzip may be used as a fallback when appropriate.

For already compressed image formats, additional compression may provide little benefit and should not be assumed necessary.

Cloudflare Pages and similar static hosting platforms may provide compression automatically; do not duplicate infrastructure unnecessarily.

---

## 21. Asset Naming and Organization

Keep assets organized and predictable.

Use descriptive filenames.

Prefer:

`icon-design-finance.webp`

over:

`image-final-final-2.webp`

For generated build assets, framework-managed hashing is acceptable and often preferable.

Avoid unnecessarily large asset directories containing unused files.

Remove unused assets when safe to do so.

---

## 22. SVG

SVG is useful for:

- icons,
- logos,
- simple illustrations,
- vector graphics.

Prefer SVG when it provides a meaningful size or quality advantage.

Optimize SVG files without damaging required visual detail.

Avoid embedding enormous unnecessary SVG markup into HTML.

Inline SVG may be appropriate when:

- the icon needs CSS styling,
- the SVG is small,
- interaction requires direct access to the SVG.

External SVG files may be preferable for reusable static assets.

---

## 23. Icon and UI Asset Strategy

The default visual identity uses iconography heavily.

Prefer:

- lightweight SVG,
- CSS shapes when genuinely simpler,
- existing optimized assets.

Avoid loading an entire icon library when only a few icons are required.

Do not replace carefully designed visual assets with generic icons merely to reduce file size.

Visual fidelity remains important.

---

## 24. HTML Size

Keep HTML reasonably concise and semantic.

Avoid generating large amounts of duplicated markup.

However, do not aggressively minimize markup if doing so makes the code difficult to maintain or harms semantic structure.

Readable, maintainable HTML is preferred over premature micro-optimization.

---

## 25. Preloading and Resource Hints

Use resource hints only when they provide a clear benefit.

Possible tools include:

- `preload`
- `preconnect`
- `dns-prefetch`

Do not add them automatically.

Incorrect preloading can compete with more important resources and make performance worse.

For a small static site, the default should be to keep resource hints minimal.

---

## 26. Above-the-Fold Experience

The first viewport should become useful quickly.

Prioritize:

- primary heading,
- primary identity,
- key visual,
- primary navigation,
- main call to action.

Avoid delaying the core experience behind:

- heavy animations,
- JavaScript initialization,
- unnecessary image loading,
- external services.

The user should understand the purpose of the page quickly.

---

## 27. Mobile Performance

The website should remain responsive on common mobile devices and networks.

Pay particular attention to:

- JavaScript execution,
- image sizes,
- font loading,
- animation,
- touch interaction,
- layout stability.

Do not assume desktop performance represents mobile performance.

However, do not create a separate low-quality visual design simply to reduce resource usage.

---

## 28. Responsive Asset Loading

When the same image is used across different screen sizes, consider responsive image delivery.

Use appropriate mechanisms such as:

- `srcset`
- `sizes`
- responsive image components provided by the framework

when they materially reduce unnecessary downloads.

Do not add complex image pipelines to pages that contain only small or simple assets.

---

## 29. Reduced Motion

Respect:

`prefers-reduced-motion: reduce`

When reduced motion is enabled:

- minimize non-essential movement,
- disable large spatial animation,
- reduce reveal effects,
- disable magnetic interaction,
- preserve content and functionality.

Performance and accessibility should work together here.

---

## 30. Browser Support

Support modern browsers in common use.

Do not optimize the implementation around obsolete browsers unless the user explicitly requires it.

Prefer progressive enhancement and broadly supported web standards.

If a modern feature is important to the design, provide a reasonable fallback where practical.

Do not introduce excessive compatibility code for browsers that are outside the project's intended audience.

---

## 31. Performance and Design Exceptions

Performance rules may be relaxed when a visual requirement genuinely matters.

Examples:

- preserving sharpness of an important portfolio image,
- keeping an intentional tactile animation,
- retaining a specific visual effect that defines the brand,
- loading a required font weight for correct typography.

When making an exception:

1. keep the cost as small as reasonably possible,
2. confirm the visual benefit is meaningful,
3. avoid allowing one exception to create unnecessary dependencies elsewhere.

Performance should support the design, not erase it.

---

## 32. Performance Validation

Before shipping, inspect:

### Architecture

- [ ] Static output is used where appropriate
- [ ] No unnecessary backend/runtime dependency exists
- [ ] JavaScript is minimal and purposeful
- [ ] Third-party dependencies are justified

### Assets

- [ ] Images use appropriate formats
- [ ] Images are correctly sized
- [ ] Below-fold images are lazy-loaded where appropriate
- [ ] Important visual assets retain acceptable sharpness
- [ ] Fonts contain only required weights
- [ ] Unused assets are removed where safe

### Rendering

- [ ] Above-the-fold content appears quickly
- [ ] Layout remains stable during loading
- [ ] Typography loads without unacceptable invisible text
- [ ] No major layout shifts occur
- [ ] Interaction remains responsive

### Animation

- [ ] Transform/opacity are preferred for animation
- [ ] Scroll reveal is efficient
- [ ] No unnecessary continuous effects exist
- [ ] Reduced-motion behavior works

### Delivery

- [ ] Static assets can be cached appropriately
- [ ] Text resources are compressed when supported
- [ ] No unnecessary preload/resource hints exist
- [ ] Deployment configuration does not introduce avoidable overhead

### Validation

- [ ] Lighthouse has been checked when available
- [ ] Core Web Vitals have been considered
- [ ] Desktop and mobile behavior have been checked
- [ ] Intermediate widths have been considered
- [ ] Performance problems are classified by severity

---

## 33. Performance Severity

Use the same severity model across the project.

### P0 — Blocker

Examples:

- page fails to load,
- critical interaction is unusable,
- severe rendering failure,
- deployment produces unusable output.

### P1 — High

Examples:

- major visible content is delayed unnecessarily,
- severe layout shift,
- interaction becomes noticeably unresponsive,
- large unnecessary dependency affects the whole site.

### P2 — Medium

Examples:

- oversized image with an easy optimization,
- unnecessary JavaScript,
- inefficient animation,
- missing caching opportunity,
- avoidable font-loading inefficiency.

### P3 — Low

Examples:

- minor asset optimization,
- small unused resource,
- optional Lighthouse improvement,
- small implementation refinement.

Do not turn minor benchmark differences into blockers.

---

## 34. Final Performance Principle

The default performance philosophy is:

> **Build the simplest website that delivers the intended design well.**

For this project, a lightweight static website should naturally perform well when it avoids unnecessary complexity.

The goal is not:

> “Get the highest possible performance score.”

The goal is:

> **“Make the website feel fast, remain visually faithful, and avoid unnecessary technical weight.”**

The best implementation combines:

**simple architecture + minimal JavaScript + optimized assets + stable rendering + thoughtful motion + sensible delivery + visual fidelity.**
