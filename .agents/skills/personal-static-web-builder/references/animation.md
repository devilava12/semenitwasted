# Animation

This document defines the default motion and interaction system for the personal static web builder.

Animation is a subtle enhancement to the experience, not the primary visual feature. Motion should improve feedback, hierarchy, spatial understanding, and perceived polish without distracting from content or slowing the user's task.

Explicit user instructions or an approved design reference may override these defaults.

---

## 1. Motion philosophy

Use motion when it helps the user:

- understand a state change
- recognize an interaction
- follow a spatial relationship
- notice newly available content
- understand hierarchy
- receive feedback
- experience a small amount of personality

Do not animate simply because an element can be animated.

The primary priority is **user experience over visual spectacle**.

When animation does not improve the experience, omit it.

---

## 2. Default motion character

The default motion language is:

- subtle
- smooth
- short
- tactile
- restrained
- purposeful
- slightly expressive

Motion should feel like a natural extension of the tactile Neumorphic visual system.

Avoid motion that makes the interface feel:

- flashy
- noisy
- game-like
- overly futuristic
- slow
- unpredictable

---

## 3. Motion hierarchy

Not every element needs animation.

Prioritize motion in this order:

1. Important user feedback
2. Primary interactions
3. Page/section introduction
4. Content hierarchy
5. Secondary decorative enhancement

If a page already communicates hierarchy clearly without motion, do not add additional animation merely for decoration.

---

## 4. Page entrance

Page entrance animation is allowed by default.

Use a subtle sequence such as:

```text
initial:
opacity: 0
transform: translateY(8px–16px)

final:
opacity: 1
transform: translateY(0)
```

Use a restrained stagger when multiple elements appear together.

A typical sequence may be:

```text
page identity / heading
↓
supporting text
↓
primary action
↓
main content
```

Do not delay important content excessively.

The page should remain understandable immediately even if animation is disabled or unavailable.

Avoid animating every small element independently.

Do not hold back the largest above-the-fold element (the heading or image that is most likely to be the Largest Contentful Paint) behind a long entrance. Keep its entrance within roughly 300ms, or leave it unanimated. See section 27 for a pattern that keeps content visible when JavaScript or animation is unavailable.

---

## 5. Scroll reveal

Subtle scroll-triggered reveal is allowed.

When an element enters the viewport, it may use:

- opacity
- small vertical translation
- very small scale adjustment when appropriate

Preferred baseline:

```text
translateY: 8–16px
opacity: 0 → 1
```

The movement should be subtle enough that users primarily notice the content, not the animation.

### Rules

- Reveal content only when the effect improves hierarchy.
- Avoid excessive stagger.
- Do not make users wait for essential information.
- Do not repeatedly animate the same content every time it enters the viewport unless there is a strong UX reason.
- Prefer one-time reveal.
- Respect reduced-motion preferences.
- Do not apply scroll reveal to content that is already visible on first load. Use the page entrance for that content instead.

Use `IntersectionObserver` or an equivalent efficient viewport mechanism rather than continuously polling scroll position.

---

## 6. Animation timing

Use broadly accepted UI motion ranges as a practical baseline.

```text
Micro interaction:   120–180ms
Standard UI change:   180–280ms
Content reveal:       300–500ms
Larger spatial move:  400–600ms
```

These are guidance ranges, not rigid values.

Prefer the shortest duration that still communicates the intended movement.

Avoid making routine interactions feel slow.

For common hover and button interactions, approximately 180–220ms is usually sufficient.

For entrance/reveal animation, approximately 300–450ms is usually sufficient.

---

## 7. Easing

Prefer natural easing.

Default:

```css
cubic-bezier(0.2, 0.8, 0.2, 1)
```

This can be used for general UI transitions and subtle movement.

For simple state changes, standard CSS easing such as:

```css
ease
```

may also be appropriate.

Avoid:

- exaggerated elastic/bounce easing
- dramatic backtracking
- long cinematic easing
- inconsistent easing between related components

Motion should feel controlled and tactile.

---

## 8. Hover behavior

Hover interactions should reinforce the existing semenitwasted tactile character.

Allowed effects include:

- subtle upward movement
- small shadow adjustment
- surface change
- minimal border reinforcement
- very small image scale
- slight depth change

Typical movement:

```text
translateY: -2px
```

Typical image enhancement:

```text
scale: 1.01–1.03
```

Use only when the element benefits from it.

Do not combine every hover effect at once.

A card might use:

```text
slight elevation
+
small shadow change
```

while an image card might use:

```text
subtle image scale
```

Choose the smallest useful effect.

Hover must never be required to understand or access essential information.

Wrap hover-only movement and shadow changes in `@media (hover: hover) and (pointer: fine)`. Touch devices otherwise keep a "stuck" hover state after a tap. Keep `:active` and `:focus-visible` feedback outside that query so it still works on every device.

---

## 9. Focus behavior

Keyboard focus must remain clearly visible.

Focus animation may use:

- subtle border appearance
- small shadow change
- surface change

Do not animate focus in a way that makes the focus indicator difficult to perceive.

Focus must remain visible even when motion is disabled.

Style focus with `:focus-visible` so the indicator appears for keyboard users, and let it appear immediately or with a very short transition so it never lags behind the user's keystroke.

---

## 10. Button interaction

Buttons should feel slightly physical and tactile.

Recommended state progression:

```text
Default
  ↓
Hover
slightly elevated / visually emphasized
  ↓
Active / Pressed
slightly reduced depth
```

Possible behavior:

```text
hover:
transform: translateY(-1px to -2px)

active:
transform: translateY(0) or a very small positive movement
```

The exact implementation should follow the button's surface treatment.

Do not use large scale changes.

Avoid:

```text
scale(1.1)
scale(0.9)
```

for ordinary buttons.

The interaction should feel like pressing a physical interface element, not triggering an animation effect.

---

## 11. Card interaction

Interactive cards may use subtle tactile feedback.

Preferred options:

### Elevation

```text
hover → slightly more elevated
```

### Movement

```text
hover → translateY(-2px)
```

### Surface

```text
hover → subtle surface/border adjustment
```

### Image

```text
hover → scale(1.01–1.03)
```

Do not stack all effects unless the component genuinely benefits from it.

Non-interactive cards should not look interactive merely because they have a hover animation.

---

## 12. Signature Neumorphic interaction

Because Neumorphism is part of the visual system, motion may reinforce perceived depth.

For example:

```text
Default:
elevated surface

Hover:
slightly increased elevation

Active:
reduced elevation / pressed surface
```

Use shadow changes carefully.

Do not create multiple animated shadow layers.

Do not use large glow effects.

The user should perceive a subtle change in physical depth.

Transitioning `box-shadow` on a few elements is fine. If many shadowed elements animate at once, or profiling shows dropped frames, keep the shadow static and crossfade it with `opacity` on a single pseudo-element instead of animating the shadow values.

---

## 13. Magnetic buttons

Magnetic interaction is **not a default behavior**.

It may be used selectively for a large, high-intent CTA near the end of a page, such as:

- Contact Me
- Start a Project
- Get in Touch
- similar primary conversion actions

Only use magnetic behavior when it improves the interaction and does not distract from the task.

Do not use magnetic effects for:

- navigation
- ordinary buttons
- repeated cards
- every CTA
- mobile interactions

### Implementation principles

- Keep the movement very small.
- Use pointer proximity rather than large cursor-following movement.
- Return smoothly to the resting position.
- Disable it for touch devices.
- Disable it when `prefers-reduced-motion` is enabled.
- Preserve normal click/tap behavior.
- Attach the effect only when `matchMedia('(hover: hover) and (pointer: fine)')` matches and reduced motion is not requested. Cap the displacement at a few pixels (under roughly 8px).

The CTA must remain perfectly usable without the magnetic effect.

---

## 14. Image motion

Images may receive subtle interaction when appropriate.

Allowed:

- very small scale
- subtle position shift
- controlled reveal
- soft opacity transition

Avoid:

- aggressive zoom
- rotation
- distortion
- constant floating
- infinite movement

The image content remains the primary focus.

---

## 15. Navigation motion

Navigation transitions should be quick and predictable.

Suitable examples:

- menu open/close
- active state transition
- subtle underline/border appearance
- mobile menu reveal

Avoid:

- long menu animations
- large navigation movement
- blocking transitions
- animation required to understand navigation

Navigation must remain usable when motion is disabled.

A closed menu must be removed from the tab order (apply `visibility: hidden` after the exit transition, or use `inert`), and `aria-expanded` on its toggle must stay in sync. An element with `display: none` cannot be transitioned, so animate `transform`/`opacity` and switch visibility afterwards. See section 28.

---

## 16. No default page transitions

Full page-to-page transitions are not part of the default system.

Do not add:

- page fade-out/fade-in
- curtain transitions
- large route animations
- loading animations between normal pages

unless explicitly requested.

For a static personal website, direct navigation should remain fast and predictable.

---

## 17. Avoid large effects

Do not use by default:

- aggressive parallax
- 3D rotation
- large floating elements
- cursor-following decorations
- continuous decorative animation
- animated gradients
- excessive blur animation
- dramatic scale transitions
- bouncing UI
- cinematic page transitions

These effects can be introduced only when the user explicitly asks for an experiment and the effect serves the experience.

---

## 18. Performance

Prefer transform and opacity for animation.

Good candidates:

```css
transform
opacity
```

Use layout-affecting properties carefully.

Avoid animating properties that cause unnecessary layout recalculation when a transform-based solution is sufficient.

Do not create continuous animation loops without a clear purpose.

Disconnect observers and clean up animation resources when components are removed or no longer needed.

Additional rules:

- List the exact properties in `transition` (for example `transition: transform 200ms, box-shadow 200ms`). Do not use `transition: all`.
- Use `will-change` only briefly on an element that is actively animating. Never apply it globally or to many elements at rest.
- Use CSS transitions and keyframes first. Do not add an animation library (GSAP, Framer Motion, and similar) unless the user asks for one, because it adds weight to a static site.
- For one-time reveals, call `unobserve` on each element after it has been revealed.
- Animation must not cause layout shift. Reserve space for content before it appears and animate only `transform` and `opacity` where possible.

---

## 19. Reduced motion

Always respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable or reduce non-essential motion */
}
```

When reduced motion is enabled:

- remove large transforms
- remove decorative movement
- minimize stagger
- reduce transition duration
- preserve immediate visibility
- preserve functional feedback

Do not remove essential state communication.

A user should still receive clear feedback without animation.

If `scroll-behavior: smooth` is used for in-page anchor links, apply it only inside `@media (prefers-reduced-motion: no-preference)`. Section 26 shows how to switch all of these values from one place.

---

## 20. Touch and mobile

Hover-based animation must not be required on touch devices.

For mobile:

- keep interaction simple
- avoid cursor-dependent effects
- avoid large movement
- avoid heavy scroll animations
- avoid animations that interfere with scrolling

Magnetic buttons should be disabled on touch devices.

Tap/click must remain the primary interaction.

---

## 21. Scroll performance

Use efficient viewport detection.

Preferred approach:

```javascript
IntersectionObserver
```

Avoid continuously running scroll handlers for simple reveal effects when an observer can perform the task.

If scroll-based animation is genuinely required, keep the work lightweight and avoid expensive DOM calculations on every frame.

Native CSS scroll-driven animations may be used only as a progressive enhancement guarded by `@supports`. `IntersectionObserver` remains the default.

---

## 22. Stagger

Stagger may be used when multiple related elements appear together.

Use small delays.

Example:

```text
element 1 → 0ms
element 2 → 50ms
element 3 → 100ms
element 4 → 150ms
```

Do not create long chains of delayed content.

The user should never wait for a sequence to finish before being able to use the page.

Cap the total stagger at about 300ms (roughly six items). Beyond that, group elements or reveal them together. Drive each delay from a CSS variable such as `--i` (see section 26).

---

## 23. Animation consistency

Related components should use related motion.

For example:

```text
all standard cards:
similar hover duration

all primary buttons:
similar interaction timing

all section reveals:
similar entrance behavior
```

Do not give every component a unique animation style.

Consistency makes subtle animation feel intentional.

---

## 24. UX priority rule

When deciding whether to add an animation, evaluate it in this order:

1. Does it improve usability?
2. Does it clarify feedback or hierarchy?
3. Does it support spatial understanding?
4. Does it add subtle personality?
5. Does it introduce distraction or delay?

If the animation does not provide a meaningful benefit, do not add it.

The system prioritizes **user experience over user interface decoration**.

---

## 25. Animation final check

Before shipping, confirm:

- [ ] Page entrance is subtle and does not delay access to content.
- [ ] Scroll reveals are purposeful and generally one-time.
- [ ] Hover states reinforce the tactile visual system.
- [ ] Buttons feel slightly physical without exaggerated movement.
- [ ] Interactive cards use restrained motion.
- [ ] Magnetic behavior is used only when genuinely useful for a large primary CTA.
- [ ] Magnetic behavior is disabled on touch and reduced-motion contexts.
- [ ] No default page transition was added.
- [ ] No aggressive parallax or decorative continuous motion was added.
- [ ] Motion primarily uses transform and opacity where appropriate.
- [ ] Timing is short and consistent.
- [ ] Related components use related motion.
- [ ] `prefers-reduced-motion` is respected.
- [ ] The page remains fully usable without animation.
- [ ] Animation improves the user experience rather than merely decorating the interface.

---

## 26. Motion tokens

Define motion values once as CSS custom properties and reuse them everywhere. This is what keeps related components consistent (section 23) and lets reduced motion be handled in a single place (section 19).

```css
:root {
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --dur-micro: 150ms;        /* 120–180ms */
  --dur-ui: 200ms;           /* 180–280ms: hover, buttons, cards */
  --dur-reveal: 400ms;       /* 300–500ms: entrance and scroll reveal */
  --dur-move: 500ms;         /* 400–600ms: larger spatial move */
  --reveal-distance: 12px;   /* 8–16px */
  --lift: -2px;              /* hover movement */
  --stagger-step: 50ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --reveal-distance: 0px;
    --lift: 0px;
    --dur-reveal: 150ms;
    --dur-move: 150ms;
    --stagger-step: 0ms;
  }
}

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

With reduced motion on, movement is removed but opacity, color, border, and shadow feedback remain, so users still see clear state changes.

Components then use the tokens instead of one-off values:

```css
.card {
  transition: transform var(--dur-ui) var(--ease-out),
              box-shadow var(--dur-ui) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(var(--lift)); }
}
```

---

## 27. Entrance and reveal pattern

Content must stay visible when JavaScript fails, is disabled, or `IntersectionObserver` is missing. Hide elements only after JavaScript has confirmed it can reveal them.

Set a flag class from a tiny inline script in `<head>`:

```html
<script>document.documentElement.classList.add('js')</script>
```

Hide the initial state only under that flag:

```css
.js .reveal {
  opacity: 0;
  transform: translateY(var(--reveal-distance));
  transition: opacity var(--dur-reveal) var(--ease-out),
              transform var(--dur-reveal) var(--ease-out);
  transition-delay: calc(var(--i, 0) * var(--stagger-step));
}

.js .reveal.is-visible {
  opacity: 1;
  transform: none;
}
```

Reveal once, then stop observing:

```javascript
(() => {
  const items = document.querySelectorAll('.reveal');
  const show = (el) => el.classList.add('is-visible');

  if (!('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(show);
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        show(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  items.forEach((el) => io.observe(el));
})();
```

Set `--i` per element in the markup (`style="--i: 2"`) for stagger. Do not put `.reveal` on the LCP element or on a large hero image (section 4).

---

## 28. Menus and expanding content

Menus, accordions, and disclosure panels have the same two risks: hidden content that can still be focused, and animation that depends on `display` or `height`.

Rules:

- Keep `aria-expanded` on the toggle in sync with the real state, and connect it to the panel with `aria-controls`.
- Closed content must not be focusable. Use `inert`, or apply `visibility: hidden` after the exit transition finishes.
- Escape should close an open menu, and focus should return to its toggle.
- If no animation is needed, prefer the native `<details>` and `<summary>` elements.
- For a short panel that must grow in height, animate a grid row instead of `height: auto`. This changes layout, so use it only for a small number of panels.

```css
.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-ui) var(--ease-out);
}

.panel[data-open="true"] { grid-template-rows: 1fr; }

.panel > .panel-inner {
  overflow: hidden;
  visibility: hidden;
  transition: visibility 0s linear var(--dur-ui);
}

.panel[data-open="true"] > .panel-inner {
  visibility: visible;
  transition-delay: 0s;
}
```

For a slide-in mobile menu, animate `transform` and `opacity` only, and handle visibility the same way.

---

## 29. Feedback states

Feedback animation (success, error, copied, toast) must reflect real state.

- Show success only after the action actually succeeded. Never animate a fake success.
- On a static page, a form can only report success if the user's external endpoint returned it.
- Announce changes with `aria-live="polite"`, and use `role="alert"` for errors.
- Do not communicate a state through motion or color alone. Pair it with text or an icon.
- Keep the animation micro-length (`--dur-micro`). Under reduced motion, keep the opacity and color change and drop any movement.

---

## 30. Additional checks

Run these together with section 25:

- [ ] Content is fully visible with JavaScript disabled and when `IntersectionObserver` is unavailable.
- [ ] No `.reveal` is applied to the LCP element or to above-the-fold content.
- [ ] Hover effects are limited to hover-capable pointers, and touch devices show no stuck hover.
- [ ] `:focus-visible` is used, and the focus indicator is visible with reduced motion enabled.
- [ ] No `transition: all`, and `will-change` is not applied globally.
- [ ] Durations, easing, distance, and stagger come from the motion tokens, with no one-off values.
- [ ] Revealed elements are unobserved after the one-time reveal.
- [ ] Closed menus and panels are not focusable, and `aria-expanded` matches the real state.
- [ ] Smooth scrolling, if used, is disabled under reduced motion.
- [ ] Total stagger stays within about 300ms.
- [ ] Animation causes no layout shift.
- [ ] No animation library was added without the user asking for it.
- [ ] Verified with reduced-motion emulation in the browser when a browser is available, or the limitation is stated.