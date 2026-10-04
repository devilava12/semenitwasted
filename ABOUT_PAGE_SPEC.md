# About Page Spec — semenitwasted

## Purpose

Create a concise personal portfolio page that introduces I Putu Dicky Adi Pranatha and makes his experience easy to scan. This is a **personal portfolio**, not an “About Us” company page. The page should connect his customer/product support background with product development and design experience.

## Audience and positioning

- **Audience:** prospective clients, technical and creative peers, and decision makers.
- **Positioning:** **Customer Support · Product Support · Designer**.
- **Core story:** understands products from the user and support side, and has also contributed to product development and design.
- Keep the tone clear, human, and professional. Avoid corporate or promotional language.

## Design system

- Style: Minimal Monochrome Bento with subtle Soft UI / Neumorphism.
- Core colors: background `#F0EDF4`; primary text/surface `#211B28` (use contrast-safe text and surface treatments where needed).
- Primary shadow: `#450D50` at 20%, X `18px`, Y `18px`, blur `16px`.
- Secondary/depth shadow: `#450D50` at 25%, X `4px`, Y `4px`, blur `4px`.
- Default radius: `10px`.
- Use even-number values for spacing, sizing, and layout dimensions; preserve the specified `10px` radius.
- Use shadows sparingly. Maintain clear edges and readable contrast; don’t let neumorphism reduce affordance.

## Page hierarchy and recommended copy

### 1. Intro / hero

**H1:** I Putu Dicky Adi Pranatha

**Role line:** Customer Support · Product Support · Designer

**Intro copy:**

> I’m a Bali-based designer and product support professional with a background in information technology, customer support, product implementation, and digital design. I enjoy working across people, products, and visual communication—from helping users solve technical problems to contributing to interfaces and digital experiences.

Show location as **Gianyar, Bali**. Keep phone and email in the contact area rather than crowding the intro.

### 2. What I Do

**H2:** What I Do

Use three concise Bento cards. Each card title is an **H3**.

1. **Product & Customer Support** — Technical support, customer assistance, troubleshooting, product demos, user training, and implementation support.
2. **UI/UX & Visual Design** — UI/UX and graphic design, including interface work with Figma and visual work with Adobe Illustrator.
3. **Digital & Creative Tools** — WordPress and Elementor, digital content creation, YouTube management, and microstock design.

Treat these as areas of experience, not claims of mastery or service guarantees.

### 3. Experience

**H2:** Experience

Present as a short reverse-chronological timeline, with dates, role, organization, and one or two factual sentences per entry. Do not invent metrics, client names, outcomes, or project details.

#### 2023–Present — Freelance Designer & Digital Creative

> Independent design and digital creative work.

Keep this entry deliberately brief unless the owner supplies specific services, projects, or examples to feature.

#### 2020–2022 — IT Support, Customer Support & SME Product Development

**PT Bima Sakti Alterra**

> Supported users of Smart Presence and contributed as a subject matter expert to new feature and product development. Also helped with UI/UX design for internal websites and coordinated interface planning with developers.

#### 2015–2020 — IT Support & Customer Support

**PT Bima Sakti Sanjaya**

> Supported Smart Presence users through troubleshooting, onsite implementation, user training, onboarding, and product demonstrations. Coordinated technical issues with internal teams and assisted with operational device distribution.

### 4. Implementation experience

**H2:** Product Implementation

Keep this as a compact Bento card or callout near Experience, not a second long work history.

> My implementation work has included onsite setup, user training, onboarding, product demonstrations, and follow-up support to help clients use Smart Presence.

This copy summarizes the supplied Sanjaya experience; don’t imply ongoing Smart Presence work.

### 5. Education

**H2:** Education

**S1 in Information Technology** — STIKOM Bali, 2014

### 6. Tools and skills

**H2:** Tools & Skills

Group as compact labels or short lists; don’t repeat the entire CV as paragraphs.

- **Support & product:** Customer Support, Technical Support, Product Support, Troubleshooting, User Training, Product Demo & Presentation, Implementation Support, Problem Solving, Team Collaboration, SME Product Development.
- **Design & content:** UI/UX Design, Graphic Design, Figma, Adobe Illustrator, Microstock Design, Content Creation, YouTube Management.
- **Web tools:** WordPress, Elementor, Antigravity.

### 7. Calls to action and contact

**H2:** Let’s Talk

> Have a project or a question? Feel free to get in touch.

- Primary CTA: **Contact Me** → email link `mailto:dickydante@gmail.com`.
- Secondary CTA: **Download CV** → link to the real CV asset only after it is added; do not create a dead link or imply an unavailable file exists.
- Primary email: `dickydante@gmail.com`. Use this address for all About-page contact actions.
- Contact details: `081353185001`, `dickydante@gmail.com`, Gianyar, Bali.
- Social links: LinkedIn `https://www.linkedin.com/in/reionnyx/`; Instagram `https://www.instagram.com/reionportfolio/`.
- Use valid absolute `https://` URLs for external profile links in implementation.

## Eye flow

1. Name and role establish who the page is about.
2. Two short intro sentences establish the support-to-product-and-design story.
3. Three What I Do cards provide a quick capability scan.
4. Experience timeline gives evidence and chronology.
5. Implementation, education, and grouped tools add useful detail without turning the page into a full CV.
6. Contact and Download CV close the page with clear next actions.

## Semantic HTML and SEO

- Use one `<main>` and one descriptive `<h1>`; organize major sections with `<section aria-labelledby="…">` and `<h2>` headings.
- Use `<article>` for each experience entry/card where appropriate; use `<ol>` for the chronological timeline if it reads naturally.
- Keep heading order logical: H1 → H2 → H3. Don’t select heading levels for visual size.
- Set a page-specific `<title>` and meta description, e.g. title **About — I Putu Dicky Adi Pranatha | semenitwasted** and description **Meet Dicky, a Bali-based customer and product support professional and designer with experience in product implementation, UI/UX, and digital creative work.**
- Use descriptive link text, a canonical URL only when the production URL is confirmed, and appropriate Open Graph metadata if the site already supports it.
- Do not add unsupported structured data, reviews, job titles, or claims.

## Accessibility

- Maintain WCAG AA contrast for text and interactive elements; verify the specified colors in actual foreground/background combinations.
- All controls must work by keyboard and show a visible focus state.
- Don’t rely on color, shadow, or icon alone to communicate meaning.
- Give meaningful images concise alt text; mark decorative images with empty alt text. Avoid adding a portrait unless an approved image is supplied.
- Use descriptive accessible names for social links and sufficient touch target sizes.
- Respect reduced-motion preferences; animation is optional and must not carry essential information.

## Responsive Bento behavior

- Desktop: use a restrained Bento grid with an obvious reading order; intro and primary story receive the strongest visual priority. Timeline remains linear and easy to follow.
- Tablet: reduce columns and card spans without reordering content in a way that breaks the reading sequence.
- Mobile: single-column stack; cards become full width, timeline dates remain visible, CTAs are easy to tap, and contact links wrap without horizontal scrolling.
- Use CSS Grid/Flexbox with fluid container widths and even-number spacing/sizing values. Verify at narrow, medium, and wide viewport widths.

## Anti-AI-slop and factual constraints

- Prefer specific, plain language drawn from the supplied work history.
- Avoid phrases such as “passionate problem solver,” “results-driven,” “cutting-edge,” “seamlessly bridging,” “transforming ideas,” and generic claims of excellence.
- No invented achievements, numbers, client names, awards, testimonials, years beyond those supplied, or proficiency levels.
- Don’t imply employment at PT Bima Sakti Alterra after 2022. The freelance period is supplied as 2023–Present, but no detailed freelance projects were supplied.
- Keep About copy concise; the page supplements the CV rather than reproducing it.

## Component architecture

Suggested reusable components, adapted to the existing project conventions:

- `AboutHero` — name, role, intro, location.
- `CapabilityGrid` / `CapabilityCard` — three What I Do cards.
- `ExperienceTimeline` / `ExperienceItem` — date, role, organization, summary.
- `ImplementationCard` — compact implementation summary.
- `EducationCard` — qualification, institution, year.
- `SkillGroups` — categorized skills and tools.
- `ContactCTA` — email, phone, profile links, and CV link when the asset exists.

Keep content data separate from presentation where the current stack makes that practical. Follow the existing naming, styling, and routing patterns; don’t introduce a new framework for this page.

## Suggested content data shape

```js
const aboutPage = {
  name: "I Putu Dicky Adi Pranatha",
  role: "Customer Support · Product Support · Designer",
  location: "Gianyar, Bali",
  intro: [
    "I’m a Bali-based designer and product support professional with a background in information technology, customer support, product implementation, and digital design.",
    "I enjoy working across people, products, and visual communication—from helping users solve technical problems to contributing to interfaces and digital experiences."
  ],
  experience: [
    { period: "2023–Present", role: "Freelance Designer & Digital Creative", organization: null, summary: "Independent design and digital creative work." },
    { period: "2020–2022", role: "IT Support, Customer Support & SME Product Development", organization: "PT Bima Sakti Alterra", summary: "Supported Smart Presence users; contributed product-development expertise and internal website UI/UX work with developers." },
    { period: "2015–2020", role: "IT Support & Customer Support", organization: "PT Bima Sakti Sanjaya", summary: "Supported Smart Presence users through troubleshooting, implementation, training, onboarding, demos, and internal coordination." }
  ],
  education: { qualification: "S1 in Information Technology", institution: "STIKOM Bali", year: "2014" },
  contact: {
    phone: "081353185001",
    email: "dickydante@gmail.com",
    linkedin: "https://linkedin.com/in/reionnyx",
    instagram: "https://instagram.com/reionportfolio",
    cvUrl: null
  }
};
```

Use `null`/omission for data that has not been supplied. Keep skills/tools in grouped arrays or the repository’s existing content format.

## Visual QA checklist

- Match the current portfolio’s monochrome Bento language, color tokens, subtle shadow treatment, `10px` radius, and even-number sizing/spacing rule.
- Check text contrast and visible focus styles against each surface.
- Confirm all sections, headings, and links are clear at desktop, tablet, and mobile widths.
- Check keyboard navigation, external link behavior, email/phone actions, and that Download CV is hidden or safely omitted until a real file exists.
- Confirm no placeholder text, dead links, unsupported claims, or duplicated CV-length content remain.

## Implementation order

1. Inspect the existing route/page, shared layout, CSS tokens, typography, and reusable card patterns.
2. Add the About page content and semantic section structure using the existing stack.
3. Build the intro and What I Do Bento cards, then the experience timeline and supporting sections.
4. Add responsive layout, accessible focus/contrast treatments, SEO metadata, and working contact links.
5. Connect Download CV only when the actual CV file and target path are available.
6. Review at desktop, tablet, and mobile widths against the visual QA checklist; revise copy or layout without adding unsupported facts.
