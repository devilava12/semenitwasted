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

## Baseline

Use WCAG 2.2 as the accessibility reference, with Level AA as the practical target where applicable.

The skill does not require every possible accessibility criterion to be treated as a blocker. Accessibility is not a reason to override a deliberate visual decision unless the issue materially affects usability, access to functionality, or comprehension.

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

## Focus States

Focus states may use the existing semenitwasted visual language rather than introducing a visually unrelated accessibility treatment.

Preferred approaches:

- Subtle outline or border treatment.
- A controlled shadow change.
- A surface or depth change consistent with the Neumorphic character.
- A combination of these when necessary for visibility.

The focus state must remain visibly distinguishable from the unfocused state. Do not remove the browser focus indicator without replacing it with an equally usable custom indication.

Focus styling should not create layout shift.

## Contrast

Contrast may be adjusted when necessary to improve readability while staying within the semenitwasted monochrome system.

Prefer:

- Adjusting text/surface values within the existing palette direction.
- Using the existing dark/light relationship more effectively.
- Strengthening contrast only where needed.

Do not introduce arbitrary colors simply to satisfy contrast requirements when an appropriate monochrome solution exists.

When practical, target WCAG 2.2 AA contrast requirements for normal text, large text, and meaningful UI elements.

## Text Alternatives

Meaningful images should have concise, useful alternative text.

Decorative images should use empty alternative text (`alt=""`) when appropriate so they are not unnecessarily announced by assistive technology.

Do not invent detailed descriptions for imagery when the image's actual purpose or content is unknown.

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

## Navigation and Structure

For pages with substantial content, consider a skip link so keyboard users can move directly to the main content.

Navigation should:

- Have a clear semantic structure.
- Maintain a logical reading and tab order.
- Clearly communicate the current state where applicable.
- Remain usable on mobile.

A skip link should remain visually unobtrusive when not focused and become clearly visible when focused.

## Motion

Accessibility should work with the existing subtle motion system.

Respect `prefers-reduced-motion: reduce`:

- Reduce or disable non-essential entrance motion.
- Reduce or disable scroll-reveal movement.
- Disable magnetic interaction effects.
- Avoid decorative animation that continues indefinitely.
- Preserve essential state changes and functionality.

Reduced motion should not remove information or make controls ambiguous.

## Touch and Mobile

Interactive targets should generally be large enough to use comfortably on touch devices, with around 44×44px as a practical reference when appropriate.

Do not force every visual element to become 44×44px if that would unnecessarily distort the design; prioritize actual interactive controls.

Avoid hover-only functionality on touch devices.

## Screen Readers

Use semantic HTML as the primary accessibility mechanism.

Use accessible names for controls when their visible text does not already provide a sufficient name.

Use ARIA only when needed for:

- Custom interactive components.
- Dynamic state.
- Relationships not adequately represented by native HTML.
- Meaningful status information that needs to be announced.

Avoid excessive ARIA, redundant roles, and duplicated accessible labels.

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

## Content and Accessibility

Do not invent accessibility-related content that is not supported by the user's information.

Do not invent:

- Image descriptions for unknown imagery.
- Form requirements that the user did not specify.
- Status messages or claims that are not real.
- Accessibility statements claiming compliance that was not actually tested.

If content is placeholder content, keep it clearly identifiable as placeholder content.

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

## Severity

Accessibility findings should be classified realistically:

- **P0 — Blocker:** Essential functionality is inaccessible or unusable.
- **P1 — High:** A major interaction, navigation path, or important content is significantly difficult to access.
- **P2 — Medium:** Noticeable accessibility issue with a reasonable workaround.
- **P3 — Low:** Minor improvement or refinement.

Do not classify a purely stylistic accessibility preference as a blocker when the interface remains usable.

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
