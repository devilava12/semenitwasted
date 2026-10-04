# SEMENITWASTED — PORTFOLIO PAGE SPECIFICATION

## 01. PROJECT OVERVIEW

Project:
semenitwasted Portfolio

Page:
Portfolio / Work Listing

Purpose:
Membuat halaman portfolio yang nantinya digunakan untuk menampilkan kumpulan karya,
project, eksperimen, dan pekerjaan kreatif.

Current State:
Implementasi fase awal telah aktif di portfolio.html, portfolio.css, dan portfolio.js, terhubung langsung dengan index.html.
Koleksi karya saat ini difokuskan khusus pada Personal Projects yang disajikan dalam bentuk desain web (web layout cards & browser preview frames) yang memuat eksplorasi desain karakter, sistem ikon vektor, dan konsep web UI.

Primary Goal:
Menyediakan struktur portfolio modular berbasis data (portfolioData) yang siap menerima karya personal baru maupun karya klien di masa depan tanpa mengubah layout utama.

---

# 02. DESIGN DIRECTION

Primary visual direction:

- Bento Grid
- Soft UI / Neumorphism (Restrained)
- Minimal Monochrome
- Clean Editorial
- Modern Portfolio
- Soft tactile interface

Visual character:

- Minimal
- Calm
- Soft
- Spacious
- Premium
- Slightly playful
- Editorial
- Not overly decorative

IMPORTANT:

Jangan membuat seluruh interface menjadi full neumorphism.

Neumorphism digunakan sebagai visual treatment pada:
- cards
- buttons
- filters
- floating elements
- CTA
- selected states

Struktur utama tetap menggunakan Bento Grid dan layout editorial.

---

# 03. COLOR SYSTEM (LOCKED BY SKILL.MD)

Sesuai kontrak desain `SKILL.md`, palet inti portofolio adalah **monokrom murni**:

```css
:root {
  --color-light: #F0EDF4;
  --color-dark: #211B28;
  --color-shadow: #450D50;
}
```

## Color Roles & Constraints
- **Primary Surfaces & Canvas:** Menggunakan `--color-light` (`#F0EDF4`) dan variasi kartu terang netral.
- **Text & Contrast Hierarchy:** Menggunakan `--color-dark` (`#211B28`) untuk teks utama dan kontras tinggi.
- **Shadow Color:** Nilai `#450D50` dikhususkan secara eksklusif untuk sistem bayangan berbobot presisi.
- **Aturan Ketat:** Jangan menambahkan warna aksen, gradasi buatan, atau palet tambahan pada UI pembungkus kecuali karya seni asli atau desain Figma yang disetujui memintanya. Warna visual harus berasal secara alami dari konten karya seni/desain itu sendiri (misalnya ilustrasi karakter, badge vektor, atau ikon asli).

---

# 04. GRID SYSTEM

Desktop layout:

Container:
1440px viewport reference

Grid:
12 columns

Column width:
approximately 80px

Horizontal gap:
24px

Vertical gap:
16px

Container:
Centered

The layout must remain aligned to the 12-column grid.

Cards may span multiple columns.

Do not force every card to use the same width.

---

# 05. SPACING SYSTEM (EVEN-NUMBER SCALE)

Sesuai aturan `SKILL.md`, semua dimensi kotak, margin, padding, dan jarak wajib menggunakan **skala angka genap**:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128 px
```

Preferred usage:
- **4–32px:** Komponen internal, gap elemen kecil, padding tombol.
- **40–128px:** Spasi antar seksi besar dan pemisah layout halaman.
- Hindari nilai ganjil (misal 5px, 9px, 15px) untuk menjaga konsistensi raster dan ritme visual.

---

# 06. BORDER RADIUS (LOCKED SIGNATURE RADIUS)

Sesuai aturan `SKILL.md`:
- **Default / Signature Radius:** **10px** untuk semua kartu (cards), kontrol, tombol, dan kontainer.
- **Pill Radius:** **999px** untuk pill filter, status badge kecil, dan tombol tag.
- Hindari penggunaan sudut terlalu bulat (seperti 20px / 28px) agar antarmuka tetap berkarakter terstruktur, taktil, dan konsisten dengan master Figma.

---

# 07. SHADOW SYSTEM (FIXED EXACT VALUES)

Sesuai aturan `SKILL.md`, nilai bayangan dikunci secara eksak dan **tidak boleh direinterpretasi, diganti, atau diubah opasitasnya**:

```css
:root {
  --shadow-primary: 18px 18px 16px rgb(69 13 80 / 20%);
  --shadow-depth: 4px 4px 4px rgb(69 13 80 / 25%);
}
```

- **Primary Shadow:** `#450D50`, opasitas 20%, X 18, Y 18, blur 16. Digunakan untuk kartu utama dan elevasi taktil.
- **Secondary / Depth Shadow:** `#450D50`, opasitas 25%, X 4, Y 4, blur 4. Digunakan saat ada objek yang berada di belakang atau saling menumpuk untuk menegaskan kedalaman.
- Gunakan bayangan secara selektif. Neumorphism berfungsi sebagai perlakuan permukaan (*surface treatment*) yang terkendali, bukan diaplikasikan ke setiap elemen.

---

# 08. TYPOGRAPHY

Typography direction:

- modern sans-serif (Rubik)
- clean
- strong hierarchy
- highly readable

Suggested hierarchy:

H1:
56–72px desktop
Bold / 700

H2:
36–48px
Bold / 700

H3:
24–32px
Semi-bold / 600

Body:
16–18px
Regular / 400

Small:
12–14px
Medium / 500

Labels:
11–13px
Medium / 500
Uppercase
Letter spacing approximately 0.12em

Avoid excessive typography styles.

---

# 09. PAGE STRUCTURE

The page should follow this structure:

1. Navbar
2. Hero / Portfolio Introduction
3. Category Filter
4. Bento Portfolio Grid
5. More Works / Empty State
6. Design Statement
7. CTA
8. Footer

---

# 10. NAVBAR

Structure:

LEFT:
semenitwasted

RIGHT:
Home
Portfolio
About
Contact
Theme Toggle

Portfolio should be visually marked as the active page.

Active Portfolio treatment:
Background: #211B28
Text: #FCFAFD
Radius: 999px

Navbar should remain visually light.

Do not create a large floating neumorphic navbar.

---

# 11. HERO SECTION

Purpose:
Introduce the portfolio page without making the hero excessively large.

Content:

Eyebrow:
PORTFOLIO

Main heading:
Selected works,
experiments & ideas

Supporting text:
A collection of personal design, character illustration, icon systems,
web UI, and tactile visual experiments.

Primary button:
Explore Projects →

Secondary button:
About Me

Right-side visual:
Monochrome abstract tactile visual card.
The visual must NOT represent a fake portfolio project.
Use abstract geometric shapes, subtle depths, and clean monochrome alignment.

---

# 12. CATEGORY FILTER

Place the filter directly below the hero.

Categories:
All
Web Design
Character
Icons
Branding
Experiments
Personal

Right side:
Sort: Latest

---

# 13. BENTO GRID

This is the primary component of the page.
Use the 12-column grid.
Cards must have different sizes.

Recommended initial layout:

ROW 1:
Web Design: 6 columns
Icon Design: 3 columns
Illustration / Character: 3 columns

ROW 2:
Branding: 4 columns
Featured: 8 columns

ROW 3:
Experiments: 6 columns
Personal: 3 columns
Audio-Visual: 3 columns

---

# 14. PERSONAL PROJECT CARDS (WEB PRESENTATION FORMAT)

Semua karya portofolio disajikan dalam format presentasi web design:
setiap kartu dilengkapi bingkai preview browser (top bar titik kontrol macOS dan address bar),
menampilkan eksplorasi desain karakter, sistem ikon vektor, dan konsep web design.

## CARD 01 — WEB DESIGN
Title: Tactile Neumorphic Web Studio
Description: Personal web interface exploration focusing on soft tactile surfaces, subtle depth, and editorial typography.
Category: Web (Label: Web Design)
Span: 6 columns
Preview Type: web-layout-1
Tags: ["Personal Project", "Web UI", "Soft Neumorphism"]

---

## CARD 02 — ICON DESIGN
Title: Minimal Icon System
Description: Structured vector icon set designed with 24px pixel grids, smooth curves, and microstock optimization.
Category: Icons (Label: Icon Design)
Span: 3 columns
Preview Type: icon-grid
Tags: ["Icon Grid", "Vector Art"]

---

## CARD 03 — CHARACTER ILLUSTRATION
Title: Character Design & Avatar
Description: Original character universe and signature personal brand avatar in playful expressive vector illustrations.
Category: Illustration (Label: Character)
Span: 3 columns
Preview Type: character-avatar
Tags: ["Character Art", "Mascot"]

---

## CARD 04 — BRANDING
Title: Personal Brand Identity
Description: Visual identity guidelines, monochrome balance, and minimalist vector typography system.
Category: Branding (Label: Branding)
Span: 4 columns
Preview Type: branding-swatch
Tags: ["Brand Guide", "Typography", "Palette"]

---

## CARD 05 — EXPERIMENTS
Title: Playful UI Experiments
Description: Interactive micro-animation sandbox, tactile button physics, and custom state switchers.
Category: Experiment (Label: Experiments)
Span: 6 columns
Preview Type: experiment-controls
Tags: ["UI Labs", "Micro-Interactions", "Prototype"]

---

## CARD 06 — PERSONAL
Title: Creative Sketchbook & Archive
Description: Work-in-progress vector doodles, conceptual draft cards, and creative ideas.
Category: Personal (Label: Personal)
Span: 3 columns
Preview Type: sketchbook-preview
Tags: ["Drafts", "Vector Notes"]

---

## CARD 07 — AUDIO-VISUAL
Title: Audio-Visual Sandbox
Description: Conceptual ambient player card blending vector graphics with tactile sound toggles.
Category: Experiment (Label: Experiment)
Span: 3 columns
Preview Type: audio-visual-preview
Tags: ["Ambient", "Sound & Vector"]

---

# 15. FEATURED CARD (DOMINANT DARK CARD)

Create one visually dominant card spanning 8 columns.

Background: #211B28
Text: #FCFAFD
Span: 8 columns

Content:
Label: FEATURED PERSONAL WORK
Title: Selected Work: Character Meets Web UI
Description: A flagship personal exploration fusing expressive character illustration with an interactive modular web canvas. Built to feel tactile, lively, and quietly premium.
Preview Layout: Browser window frame gelap berisi integrasi avatar-illustration.png di sisi kiri, dan panel ringkasan arsitektur Figma-to-code serta status badge di sisi kanan.
CTA: Explore Showcase →

---

# 16. CARD DESIGN

Standard card:
Background: #FCFAFD
Border: #E4DCE9
Radius: 10px (Locked by SKILL.md)
Padding: 24px (Even number)
Shadow: Fixed primary shadow

---

# 17. CARD HOVER

Desktop hover behavior:
Card moves upward approximately 2–4px.
Shadow subtly deepens.
Transition: 200–250ms (translateY(-2px / -4px)).
Avoid exaggerated animations.

---

# 18. EMPTY STATE

Title: More works coming soon
Description: This space will grow as new personal projects, character explorations, and web experiments come together.
Visual: Small "+" tactile card.
Style: Surface Soft #F5F0F8, Border #E4DCE9, Radius 10px.

---

# 19. DESIGN STATEMENT

Quote:
"Good design is not about adding more. It's about making the right things clear."
— semenitwasted

Background: #FCFAFD / Soft monochrome
Radius: 10px
Text: #211B28

---

# 20. CTA SECTION

Card:
Background: #FCFAFD
Radius: 10px
Shadow: Fixed primary shadow

Content:
Title: Have an idea in mind?
Text: Let's create something useful, simple and visually interesting.
Button: Get in touch → (Background: #211B28, Text: #FCFAFD)

---

# 21. FOOTER

Minimal footer.
LEFT: semenitwasted / Design · Icons · Illustration · Web
RIGHT: Instagram · Behance · GitHub · Adobe Stock

---

# 22. RESPONSIVE DESIGN

Desktop: >= 1200px (12-column grid)
Tablet: 768px – 1199px (8-column grid)
Mobile: < 768px (4-column grid / stacked)

---

# 23. MOBILE NAVIGATION

Desktop: Home, Portfolio, About, Contact
Mobile: Hamburger button with clean drawer navigation.

---

# 24. ACCESSIBILITY

- Semantic HTML
- Clear contrast between light and dark surfaces
- Visible keyboard focus states
- Meaningful alt text on illustrations and icons

---

# 25. PERFORMANCE

- WebP/SVG formats
- Intrinsic image sizing
- No bloated animation libraries; pure CSS transitions

---

# 26. COMPONENT STRUCTURE

Navbar → HeroPortfolio → CategoryFilter → BentoGrid → EmptyPortfolioState → DesignStatement → ContactCTA → Footer

---

# 27. PORTFOLIO DATA MODEL

Portfolio items diimplementasikan secara modular dalam array `portfolioData` di `portfolio.js`:

```javascript
{
  id: "web-tactile-studio",
  title: "Tactile Neumorphic Web Studio",
  category: "Web",
  categoryLabel: "Web Design",
  description: "Personal web interface exploration focusing on soft tactile surfaces, subtle depth, and editorial typography.",
  span: "col-span-6",
  tags: ["Personal Project", "Web UI", "Soft Neumorphism"],
  urlText: "semenitwasted.com/lab/tactile",
  previewType: "web-layout-1",
  featured: false,
  ctaText: "View Concept →"
}
```

---

# 28. FUTURE PROJECT PAGE

Arsitektur link dan kartu sudah disiapkan untuk mengarah ke individual case study saat diperlukan.

---

# 29. DESIGN PRINCIPLES (FROM SKILL.MD)

1. Keep the interface tactile and restrained monochrome.
2. The artwork is the hero; do not distract with gratuitous UI effects.
3. Use Bento Grid to express priority and relationships.
4. Preserve exact locked shadow tokens.
5. Adhere to 10px signature radius and even-numbered spacing.
6. Anti-AI-slop: No fake projects, fake metrics, or random stock graphics.

---

# 30. IMPORTANT CONSTRAINTS

Do NOT:
- Invent fake projects, metrics, or credentials.
- Add unapproved accent colors or excessive gradients to the UI.
- Use odd-numbered spacing or dimensions.
- Use arbitrary border radii (stick to 10px signature radius).

---

# 31. CSS COLOR VARIABLES & LOCKED DESIGN TOKENS

```css
:root {
  /* Core Monochrome Palette (SKILL.md Section 3) */
  --color-light: #F0EDF4;
  --color-dark: #211B28;
  --color-shadow: #450D50;

  /* Surfaces & Borders */
  --background: var(--color-light);
  --surface: #FCFAFD;
  --surface-soft: #F5F0F8;
  --border: #E4DCE9;

  /* Text & Hierarchy */
  --text-primary: var(--color-dark);
  --text-secondary: #756A7D;
  --strong: var(--color-dark);
  --disabled: #D5CCD9;

  /* Exact Fixed Shadow Tokens (SKILL.md Section 3) */
  --shadow-primary: 18px 18px 16px rgb(69 13 80 / 20%);
  --shadow-depth: 4px 4px 4px rgb(69 13 80 / 25%);

  /* Signature Radius (SKILL.md Section 3) */
  --radius-card: 10px;
  --radius-sm: 8px;
  --radius-pill: 999px;

  /* Typography */
  --font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

[data-theme="dark"] {
  --background: #191420;
  --surface: #221B2B;
  --surface-soft: #2B2336;
  --border: #3B3248;

  --text-primary: #F7F4FA;
  --text-secondary: #AFA6B7;
  --strong: #FAF8FC;
  --disabled: #554A62;

  --shadow-primary: 18px 18px 24px rgba(0, 0, 0, 0.45);
  --shadow-depth: 4px 4px 8px rgba(0, 0, 0, 0.35);
}
```

---

# 32. FINAL VISUAL DIRECTION

"Bento Grid portfolio meets restrained, tactile monochrome UI."
Clean, premium, craft-focused, respectful of the artwork.

---

# 33. DEVELOPMENT PRIORITY & STATUS

[x] PHASE 1: Global layout, Color system, Typography, 12-column grid
[x] PHASE 2: Navbar (Active pill & theme toggle), Hero, Category filter
[x] PHASE 3: Bento portfolio grid, Personal project cards, Featured card (Dark)
[x] PHASE 4: Empty state ("More works coming soon"), Design statement quote, CTA, Footer
[x] PHASE 5: Responsive layout (12-col desktop, 8-col tablet, 4-col stacked mobile)
[x] PHASE 6: Hover & tactile micro-interactions (translateY -2px/4px, fixed shadow elevation)
[x] PHASE 7: Accessibility (Contrast, ARIA attributes, semantic HTML)
[x] PHASE 8: Performance optimization (Pure vector SVG visuals, lazy loading)
[x] PHASE 9: Portfolio data architecture (portfolioData engine & live filter)
[ ] PHASE 10: Penambahan item personal project lanjutan ke portfolioData di masa depan

---

# END OF SPECIFICATION
