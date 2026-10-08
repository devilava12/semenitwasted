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

---

## 9. Focus behavior

Keyboard focus must remain clearly visible.

Focus animation may use:

- subtle border appearance
- small shadow change
- surface change

Do not animate focus in a way that makes the focus indicator difficult to perceive.

Focus must remain visible even when motion is disabled.

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
