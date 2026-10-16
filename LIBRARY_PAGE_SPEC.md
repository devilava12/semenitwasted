# SEMENITWASTED — LIBRARY PAGE SPECIFICATION

## 01. PROJECT OVERVIEW

- **Project:** semenitwasted Personal Website & Design System
- **Page Name:** Library (`library.html`, `library.css`, `library.js`)
- **Primary Goal:** Membuat halaman **Library** terpusat sebagai dokumentasi hidup (*living documentation*) dan showcase interaktif untuk standar desain, aset, dan komponen semenitwasted.
- **Scalable Architecture (Multi-Library Hub):** Halaman ini dirancang modular untuk menampung beberapa jenis library (Animation, Design Tokens, Components, Vectors/Icons).
- **Scope Fase 1:** **Animation & Motion Library** — menampilkan katalog interaktif seluruh sistem animasi dan gerak taktil yang didefinisikan pada [animation.md](file:///f:/Vector%20project/figma%202/personal%20bento-neomorpishm-monochrome/web%20builder%20skill/reference/animation.md) lengkap dengan live preview, kontrol interaktif, parameter teknis, dan copyable CSS snippets.
- **Scope Fase 2 (Completed):** **Design Tokens Library** — dokumentasi dan visualizer interaktif lengkap untuk seluruh token CSS `:root` yang didefinisikan pada [design-system.md](file:///f:/Vector%20project/figma%202/personal%20bento-neomorpishm-monochrome/web%20builder%20skill/reference/design-system.md), [typography.md](file:///f:/Vector%20project/figma%202/personal%20bento-neomorpishm-monochrome/web%20builder%20skill/reference/typography.md), dan [animation.md](file:///f:/Vector%20project/figma%202/personal%20bento-neomorpishm-monochrome/web%20builder%20skill/reference/animation.md), mencakup: Core Monochrome Palette, Derived Text Tones, Signature Shadows, Border Radius, Even Spacing Scale, Fluid Typography Scrubber, Motion Tokens, Grid/A11y, dan Master :root Export.

---

## 02. DESIGN DIRECTION & VISUAL SYSTEM

Mengikuti kontrak desain baku yang terkunci pada `SKILL.md` dan `design-system.md`:

### Core Visual Language
- **Bento Grid Layout:** Struktur kartu modular dengan grid teratur dan hierarki visual yang jelas.
- **Restrained Neumorphism & Tactile Surface:** Aksen permukaan dengan kedalaman bayangan taktil, tanpa ornamen berlebihan.
- **Minimal Monochrome:** Estetika bersih, tenang, fokus pada interaksi dan kejelasan konten.
- **Zero AI-Slop:** Tidak ada gradasi neon mencolok, tidak ada floating blobs/orbs, tidak ada dekorasi tanpa fungsi.

### Locked Color System
```css
:root {
  --color-light: #F0EDF4;   /* Surface, canvas, background */
  --color-dark: #211B28;    /* Text utama, kontras tinggi, border halus */
  --color-shadow: #450D50;  /* Warna signature untuk bayangan taktil */
}
```

### Locked Shadow System
```css
:root {
  --shadow-primary: 18px 18px 16px rgb(69 13 80 / 20%); /* Kartu utama & elevasi tinggi */
  --shadow-depth: 4px 4px 4px rgb(69 13 80 / 25%);     /* Kedalaman overlap & micro controls */
}
```

### Dimension, Radius & Spacing Rules
- **Signature Border Radius:** `10px` untuk kartu, preview container, dan tombol kontrol standar.
- **Pill Radius:** `999px` untuk kategori switcher, filter pill, dan status badge.
- **Even-Number Spacing Scale:** `4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128 px`.
- **Viewport Reference:** Max width container `1440px` (atau aligned dengan grid `portfolio.html`).

---

## 03. INFORMATION ARCHITECTURE (PAGE STRUCTURE)

Halaman `library.html` disusun dalam seksi-seksi berikut:

### 1. Site Header & Global Navigation
- Identitas brand `semenitwasted`.
- Menu navigasi konsisten: `Portfolio`, `About`, `Library` (status aktif/current), `Contact`.
- Aksesibilitas navigasi dengan `aria-current="page"`.

### 2. Page Hero & Category Switcher
- **Badge:** `Design System & Living Sandbox`
- **H1:** `Library`
- **Lead Copy:** Dokumentasi hidup dan sandbox interaktif untuk standar desain semenitwasted. Eksplorasi perilaku taktil, nilai token, kurva easing, dan implementasi kode.
- **Library Category Tabs (Scalability Hub):**
  - `Motion & Animation` *(Active / Default)* — Katalog animasi (10 modul).
  - `Design Tokens` *(Active / Implemented)* — Katalog token desain (8 kelompok + Master Export).
  - `Components & UI` *(Upcoming / Disabled / Badge "Soon")*.
  - `Vectors & Icons` *(Upcoming / Disabled / Badge "Soon")*.

### 3. Sandbox Toolbar / Global Controls
Bar kontrol di atas grid animasi untuk mempermudah audit dan uji aksesibilitas:
- **Toggle Reduced Motion Simulator:** Memungkinkan pengunjung atau desainer menguji halaman dalam mode tanpa gerak (`prefers-reduced-motion`) secara langsung via toggle UI.
- **Toggle Slow-Motion (0.5x):** Memperlambat durasi transisi agar kurva easing dan perubahan kedalaman bayangan dapat diamati secara mendalam.
- **Replay All Button:** Memicu ulang seluruh animasi entrance/reveal secara bersamaan.

### 4. Interactive Animation Catalog (Core Grid)
Disusun dalam layout Bento Grid yang memuat seluruh animasi dari `animation.md`. Setiap kartu animasi memuat:
1. **Header Kartu:** Nama animasi (H3) dan kategori (Micro, Standard, Reveal, Spatial).
2. **Interactive Preview Stage:** Canvas interaktif di mana pengguna dapat mengklik, hover, atau menekan tombol `Replay / Trigger` untuk melihat gerakan secara real-time.
3. **UX & Purpose Notes:** Penjelasan singkat kapan dan mengapa animasi ini digunakan (philosophy check).
4. **Technical Parameters Specs:**
   - Property: `transform`, `opacity`, `box-shadow`
   - Duration: misal `180ms – 220ms`
   - Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` atau `ease`
5. **Code Snippet Drawer / Copy CSS:** Tombol copy CSS snippet instan untuk memudahkan implementasi developer.

### 5. Site Footer
- Footer identik dengan halaman `portfolio.html` dan `contact.html` (Copyright, platform links: LinkedIn, Adobe Stock, Canva, The Noun Project, Flaticon).

---

## 04. CATALOG SPECIFICATION: DAFTAR ANIMASI YANG DITAMPILKAN

Berikut 10 modul animasi yang wajib ada pada fase awal Motion Library:

### 1. Tactile Lift (Standard Button Interaction)
- **Kategori:** Primary Interaction
- **Perilaku:** 
  - Rest: Posisi datar dengan border halus.
  - Hover: `translateY(-2px)` dengan elevasi bertambah (`--shadow-depth`).
  - Active/Press: `translateY(0)` (permukaan terasa tertekan fisik).
- **Timing & Easing:** `200ms`, `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Elemen Demo:** Tombol interaktif langsung dengan state label responsif.

### 2. Micro Tactile Lift (Filter Pills & Compact Controls)
- **Kategori:** Micro Interaction
- **Perilaku:** Pengangkatan sangat ringan `translateY(-2px)`, timing cepat `~200ms`, mempertahankan depth shadow (`4px 4px 4px rgb(69 13 80 / 25%)`) pada resting state dan berpindah ke primary shadow (`18px 18px 16px rgb(69 13 80 / 20%)`) serta surface gelap (`#211B28`) saat dipilih (active state).
- **Elemen Demo:** Deretan filter pills identik dengan halaman portofolio (`All`, `Web Design`, `Character`, `Icons`, `Branding`, `Experiments`, `Personal`) dengan dukungan scroll horizontal mulus dan seleksi interaktif.

### 3. Neumorphic Surface & Card Elevation
- **Kategori:** Card & Depth Interaction
- **Perilaku:** Kartu permukaan terang yang bergeser dari elevasi lembut ke elevasi terfokus pada hover (`translateY(-2px)` + transisi `--shadow-primary`).
- **Timing:** `250ms`, `ease`.
- **Elemen Demo:** Miniatur Bento card interaktif.

### 4. Image Subtle Scale
- **Kategori:** Media & Visual Presentation
- **Perilaku:** Pembesaran foto/grafis yang sangat tertahan: `scale(1.02)` saat container di-hover. Dilarang zoom agresif.
- **Timing:** `350ms`, `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Elemen Demo:** Bingkai gambar dengan masking overflow dan indikator skala.

### 5. Page Entrance Sequence & Stagger
- **Kategori:** Spatial & Orientation
- **Perilaku:** Munculnya konten secara hierarkis: Heading (0ms) → Subtitle (50ms) → Action (100ms) → Card (150ms). `translateY(12px) → 0` dan `opacity: 0 → 1`.
- **Timing:** `350ms` per item dengan stagger `50ms`.
- **Elemen Demo:** Box simulasi yang dapat di-replay dengan tombol "Play Entrance Sequence".

### 6. Scroll Reveal (Intersection Observer)
- **Kategori:** Content Reveal
- **Perilaku:** Animasi satu kali (one-time) saat elemen masuk ke dalam viewport: `translateY(16px) → 0` dan `opacity: 0 → 1`.
- **Timing:** `400ms`, `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Elemen Demo:** Viewport scroll simulator internal di dalam kartu.

### 7. Magnetic Button (High-Intent CTA)
- **Kategori:** Specialized Action
- **Perilaku:** Tombol yang bergerak halus beberapa pixel mengikuti kedekatan kursor (*proximity pull*), dan kembali mulus (*spring return*) ke posisi semula saat mouse menjauh.
- **Syarat Khusus:** Wajib dinonaktifkan di layar sentuh (touch/mobile) dan pada `prefers-reduced-motion`.
- **Elemen Demo:** Tombol CTA "Contact Me" dengan area medan magnet interaktif.

### 8. Focus State Indicator
- **Kategori:** Accessibility & Keyboard Interaction
- **Perilaku:** Transisi cincin fokus ganda (kontras tinggi + ring lembut) saat elemen menerima keyboard focus (`:focus-visible`).
- **Timing:** `150ms`, `ease`.
- **Elemen Demo:** Input & link simulasi yang dapat difokuskan dengan tombol `Tab` atau tombol trigger.

### 9. Navigation Indicator Transition
- **Kategori:** Navigation Motion
- **Perilaku:** Pergeseran indikator aktif atau highlight menu saat berpindah item navigasi secara halus.
- **Timing:** `200ms`, `ease`.
- **Elemen Demo:** Mini menu navigasi 3-tab interaktif.

### 10. Tactile Submit Spinner / Micro Feedback
- **Kategori:** State Feedback
- **Perilaku:** Transisi status tombol dari "Submit" ke putaran spinner taktil halus tanpa lonjakan ukuran (zero layout shift).
- **Elemen Demo:** Tombol form simulasi yang mendemonstrasikan status loading -> success feedback.

---

## 04B. DESIGN TOKENS SPECIFICATION: DAFTAR KELOMPOK TOKEN

Berikut 8 modul dan kelompok token desain yang ditampilkan secara interaktif:

### 1. Core Monochrome Palette
- **Token:** `--color-light: #F0EDF4`, `--color-dark: #211B28`, `--color-shadow: #450D50`
- **Rasio Kontras:** 14.48:1 (WCAG AAA) antara kanvas terang dan teks gelap.
- **Interaksi:** Kartu swatch interaktif dengan klik untuk menyalin variabel CSS dan indikator rona.

### 2. Derived Text Tones & Form Boundaries
- **Token:** `--color-text`, `--color-text-muted` (70%), `--color-text-disabled` (50%), `--color-border-control` (50%)
- **Rasio Kontras:** Muted &ge; 4.5:1 (5.78:1 pada kanvas terang, 7.69:1 pada kanvas gelap), Kontrol 3.16:1.
- **Interaksi:** Hirarki teks spesimen dengan tombol mini-copy dan status kontras.

### 3. Signature Shadow & Depth System
- **Token:** `--shadow-primary` (18px 18px 16px 20%), `--shadow-depth` (4px 4px 4px 25%), `--shadow-hover`, `--shadow-pressed`
- **Arah Cahaya:** Top-left &rarr; bottom-right fall.
- **Interaksi:** Sandbox elevasi taktil 4 tingkatan bayangan dengan efek hover dan pressed fisik.

### 4. Border Radius & Geometry Language
- **Token:** `--radius: 10px`, `--radius-card: 10px`, `--radius-pill: 999px`, `--radius-sm: 6px`
- **A11y:** Border `1px solid transparent` untuk ketahanan di Windows High Contrast Mode.
- **Interaksi:** Spesimen bentuk visual 10px, pill, 6px, dan mode forced-colors.

### 5. Strict Even-Number Spacing Scale
- **Token:** 14 tingkat genap baku: `--space-4` hingga `--space-128` (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128 px).
- **Aturan:** Angka ganjil dilarang kecuali garis batas hairline (1px, 2px).
- **Interaksi:** Spacing meter interaktif dengan klik untuk menyalin variabel dan penanda kategori (Internals, Related, Groups, Sections).

### 6. Fluid Typography Scale & Measures
- **Token:** `--font-sans` (Rubik), `--font-mono`, `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-h4`, `--text-intro`, `--text-body` (16px), `--text-small` (14px), `--text-caption` (12px), `--measure: 65ch`.
- **Interaksi:** Scrubber slider lebar viewport (360px &mdash; 1440px) yang menghitung ulang nilai font-size clamp() secara real-time.

### 7. Motion & Timing Tokens
- **Token:** `--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1)`, `--dur-micro: 150ms`, `--dur-ui: 200ms`, `--dur-reveal: 400ms`, `--dur-move: 500ms`, `--reveal-distance: 12px`, `--lift: -2px`, `--stagger-step: 50ms`.
- **Interaksi:** Benchmark runner timing yang menganimasikan 4 puck kecepatan secara simultan untuk perbandingan visual nyata.

### 8. Responsive Grid, Gutters & Accessibility Rules
- **Token:** `--container-max: 1200px` (or 1440px), `--gutter: 16px/20px/24px`, `--tap-min: 44px`, `--focus-ring: 2px solid var(--color-dark)`.
- **Interaksi:** Visualizer matriks 12-8-4 kolom dan tester touch target &ge; 44px.

### 9. Master :root Export Card
- **Fungsi:** Satu blok lengkap seluruh token desain siap disalin dengan satu tombol untuk konsistensi di seluruh halaman proyek.

---

## 05. DATA ARCHITECTURE & CODE STRUCTURE

Untuk menjaga prinsip modularitas dan kemudahan penambahan library baru di kemudian hari:

### Struktur File
```text
f:\Vector project\figma 2\
├── library.html           # Struktur semantic halaman Library
├── library.css            # Styling Bento grid, preview stage, dan animasi
├── library.js             # Controller interaktif, data animasi, & sandbox tool
└── LIBRARY_PAGE_SPEC.md   # Dokumen spesifikasi ini (Source of truth)
```

### Model Data (`library.js`)
Seluruh daftar animasi dimuat dalam array objek terstruktur (`animationsData`), contoh:
```javascript
const animationsData = [
  {
    id: "tactile-lift",
    category: "button",
    title: "Tactile Lift",
    description: "Interaksi tombol taktil dengan elevasi fisik saat di-hover dan penurunan kedalaman saat ditekan.",
    timing: "200ms",
    easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    cssSnippet: `.btn-tactile {\n  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s;\n}\n.btn-tactile:hover {\n  transform: translateY(-2px);\n}\n.btn-tactile:active {\n  transform: translateY(0);\n}`
  },
  // ... modul lainnya
];
```

---

## 06. ACCESSIBILITY & PERFORMANCE REQUIREMENTS

1. **`prefers-reduced-motion` Compliance:**
   - Seluruh animasi di dalam kartu harus otomatis nonaktif atau menjadi transisi instan ketika reduced motion aktif di OS maupun di toggle simulator.
2. **Hardware Acceleration:**
   - Semua pergerakan wajib menggunakan `transform` (`translateY`, `scale`) dan `opacity`. Hindari animasi properti layout seperti `height`, `width`, `margin`, atau `padding`.
3. **Contrast Ratio:**
   - Semua teks penjelasan, kode snippet, dan label parameter wajib memenuhi standar rasio kontras WCAG 2.1 AA terhadap warna canvas `#F0EDF4` dan background kartu.
4. **Keyboard Accessibility:**
   - Semua preview playground dan tombol Replay/Copy dapat dioperasikan penuh menggunakan tombol `Tab` dan `Enter/Space`.

---

## 07. REVIEW & SHIP GATE CHECKLIST

Sebelum rilis, implementasi wajib lulus checklist berikut:
- [x] Berkas `library.html`, `library.css`, dan `library.js` dibuat dan terhubung rapi.
- [x] Navigasi global di seluruh halaman (`portfolio.html`, `about.html`, `contact.html`, `library.html`) memiliki link aktif ke halaman Library.
- [x] Semua 10 animasi dari `animation.md` terdokumentasi dan dapat diuji interaksinya.
- [x] Seluruh 8 kelompok Design Tokens terimplementasi lengkap dengan live preview, copy button, dan master :root export.
- [x] Nilai token warna (`#F0EDF4`, `#211B28`, `#450D50`) dan bayangan terkunci secara presisi.
- [x] Dark mode accessibility: token ungu gelap otomatis dimapping ke luminous lilac `#D8B5E4` (rasio kontras 8.5:1 AAA) pada `[data-theme="dark"]` agar nilai token dan badge tetap jelas terbaca.
- [x] Responsif sempurna pada viewport Desktop (1440px), Tablet (768px), dan Mobile (375px) tanpa overflow horizontal.
- [x] Tombol Copy CSS & Copy Token berfungsi andal dengan umpan balik visual toast.
- [x] Mode simulator Reduced Motion dan Viewport Scrubber berfungsi dengan benar.
- [x] 100% Static Web dan siap dideploy langsung ke Cloudflare Pages.
