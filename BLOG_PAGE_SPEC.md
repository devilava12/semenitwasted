# SEMENITWASTED — BLOG MAIN PAGE SPECIFICATION (`blog.html`)

## 01. PURPOSE & OVERVIEW

- **Project:** semenitwasted Personal Website & Design System
- **Owner & Author:** I Putu Dicky Adi Pranatha
- **Target File:** `blog.html` (didukung oleh `blog.css`, `blog.js`, dan `blog-data.js`)
- **Primary Goal:** Menyediakan halaman katalog/arsip tulisan (*blog main page / thoughts hub*) yang tenang, berbobot, mudah dipindai (*scannable*), dan selaras dengan estetika **Minimal Monochrome Bento** serta **Restrained Neumorphism** khas semenitwasted.
- **Positioning Konten:** Berfokus pada catatan proses desain, eksplorasi sistem desain (*design systems*), web/creative coding, refleksi pengalaman produk/dukungan pengguna (*product & support reflections*), serta catatan teknologi personal (*devlogs*).

---

## 02. COMMUNITY & FORUM INSIGHTS (REDDIT & HACKER NEWS SYNTHESIS)

Berdasarkan diskusi mendalam di komunitas pengembang dan desainer (*r/webdev, r/web_design, Hacker News*), halaman katalog blog yang disukai pembaca memiliki karakteristik sebagai berikut:

### A. Fitur Wajib (Must-Haves)
1. **Metadata yang Jelas & Transparan:**
   - **Tanggal Publikasi Asli** (`<time datetime="...">`) dan tanggal update jika ada. Pembaca teknis sangat benci artikel tanpa tanggal karena tidak tahu apakah artikel masih relevan.
   - **Estimasi Waktu Baca (*Estimated Reading Time*)**: Cth. `4 min read` — membantu pembaca mengukur komitmen waktu sebelum membuka halaman.
   - **Ringkasan / Excerpt Padat (1–2 kalimat)**: Pembaca ingin tahu inti isi artikel sebelum mengklik judul. Hindari *clickbait* atau judul abstrak tanpa konteks.
2. **Kategori & Filter Topik Terarah (Pill Filters):**
   - Batasi menjadi 4–6 topik utama (misal: *All, Design Systems, Frontend, Support & UX, Notes*), bukan puluhan tag acak yang membingungkan.
3. **Pencarian Cepat (*Instant Search*):**
   - Filter real-time judul & ringkasan langsung di browser tanpa reload halaman.
4. **Tipografi Terbaca & Nyaman di Mata:**
   - Kontras warna yang lembut (bukan hitam pekat di atas putih murni), hierarki judul tegas, dan jarak spasi bernapas (*whitespace*).
5. **Dukungan RSS Feed:**
   - Komunitas developer dan kreator independen sangat mengapresiasi tautan RSS feed (`/feed.xml` atau `rss.xml`) untuk pembaca setia tanpa algoritma medsos.

### B. Anti-Pola yang Harus Dihindari (What Readers Dislike)
- ❌ **Infinite Scroll tanpa ujung:** Mengacaukan orientasi pembaca dan menghalangi akses ke footer. Lebih disukai pagination bersih atau kartu arsip berbasis tahun/kelompok.
- ❌ **Pop-up / Overlay:** Tidak ada popup newsletter agresif saat baru membuka halaman.
- ❌ **Kartu dengan tinggi timpang (*mismatched height chaos*):** Grid bento harus memiliki tata letak teratur dan rapi.
- ❌ **Bloatware & Framework Berlebih:** Halaman blog harus ringan, instan dimuat (< 1 detik), dan ramah aksesibilitas.

---

## 03. DESIGN SYSTEM & VISUAL TOKENS CONTRACT

Mengikuti kontrak desain baku semenitwasted:

### Core Palette
```css
:root {
  --color-light: #F0EDF4;   /* Surface, canvas, background */
  --color-dark: #211B28;    /* Text utama, kontras tinggi, border halus */
  --color-shadow: #450D50;  /* Signature tactile shadow tint */
  --color-muted: #6E6277;   /* Metadata, sub-label, deskripsi sekunder */
  --color-border: rgba(33, 27, 40, 0.08); /* Garis batas kartu lembut */
}

[data-theme="dark"] {
  --color-light: #16121C;   /* Dark canvas */
  --color-dark: #ECE8F2;    /* Dark mode text utama */
  --color-shadow: #0A060E;  /* Dark mode shadow */
  --color-muted: #9E93A8;   /* Dark mode muted text */
  --color-border: rgba(236, 232, 242, 0.1);
}
```

### Signature Shadows & Geometry
- **Primary Shadow (Kartu & Hero):** `18px 18px 16px rgb(69 13 80 / 20%)` (Light) / `14px 14px 20px rgb(0 0 0 / 45%)` (Dark)
- **Depth / Control Shadow:** `4px 4px 4px rgb(69 13 80 / 25%)`
- **Border Radius:**
  - Kartu Bento & Container: `10px`
  - Tag & Filter Pills: `999px` (full pill)
  - Search Input: `10px`
- **Spacing Scale:** Menggunakan skala bilangan genap (`4, 8, 12, 16, 20, 24, 32, 40, 48, 64px`).
- **Max Container Width:** `1200px` (konsisten dengan `portfolio.html`).

---

## 04. PAGE HIERARCHY & INFORMATION ARCHITECTURE (`blog.html`)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Global Navigation (site-chrome.js): Home | Portfolio | About | Library | Blog [Active] | Contact │
├────────────────────────────────────────────────────────────────────────┤
│ [1. Hero & Controls]                                                   │
│   - Badge: "WRITING & THOUGHTS"                                        │
│   - H1: "Articles, notes & process logs."                              │
│   - Subtitle: Explorations in design systems, code & product support.  │
│   - [Search Input] + [Topic Filter Pills: All | Design | Code | Notes] │
├────────────────────────────────────────────────────────────────────────┤
│ [2. Featured Article Bento Card (Span 2/Full)]                        │
│   - Badge: "LATEST ESSAY" · 5 min read · Oct 2026                      │
│   - H2: Judul Artikel Unggulan                                         │
│   - Excerpt: Ringkasan mendalam 2-3 baris                              │
│   - CTA Button: "Read Article ↗"                                       │
├────────────────────────────────────────────────────────────────────────┤
│ [3. Articles Bento Grid (2 Col Responsive)]                            │
│   ┌──────────────────────────────┐  ┌──────────────────────────────┐   │
│   │ Card 1: Article              │  │ Card 2: Article              │   │
│   │ [Category Pill] · 3 min read │  │ [Category Pill] · 7 min read │   │
│   │ H3: Judul Tulisan            │  │ H3: Judul Tulisan            │   │
│   │ Excerpt ringkas              │  │ Excerpt ringkas              │   │
│   │ Date & Tags                  │  │ Date & Tags                  │   │
│   └──────────────────────────────┘  └──────────────────────────────┘   │
│   ... (Card 3, Card 4, Card 5)                                         │
├────────────────────────────────────────────────────────────────────────┤
│ [4. Bottom Bento Strip: RSS & Connect]                                 │
│   - Kartu 1: RSS Feed Link (Subscribe via reader)                      │
│   - Kartu 2: Have a question or feedback? Link to contact.html         │
├────────────────────────────────────────────────────────────────────────┤
│ Footer (Hak Cipta semenitwasted, tahun, status)                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 05. SECTION BREAKDOWN & CONTENT SPECIFICATION

### 1. Header & Navigation Integration
- Menggunakan `site-chrome.js` yang diperbarui:
  ```javascript
  { id: 'blog', label: 'Blog', href: 'blog.html' }
  ```
- Menandai atribut aktif `data-active-page="blog"`.

### 2. Page Hero & Controls Section
- **Kategori Badge:** `Writing & Field Notes` (Pill radius `999px`).
- **H1:** `Thoughts, devlogs, & design notes.`
- **Intro Paragraph:**
  > Catatan berkala seputar arsitektur sistem desain, pengalaman mendukung produk dan pengguna, serta eksplorasi kode kreatif oleh I Putu Dicky Adi Pranatha.
- **Search & Filter Bar:**
  - **Input Search:** Box taktil dengan ikon kaca pembesar, placeholder *"Search articles by keyword..."*.
  - **Category Pills:**
    - `All` (Default aktif)
    - `Design Systems`
    - `Frontend & Code`
    - `Product & Support`
    - `Reflections`
  - Dilengkapi indikator jumlah artikel (*counter* kecil di tiap pill, cth: `All (6)`).

### 3. Featured Article Card (Bento Spotlight)
- Menampilkan 1 tulisan terbaru atau terpenting dalam ukuran kartu penuh.
- Layout:
  - Bagian Kiri/Atas: Metadata (*Tag Kategori, Tanggal rilis, Waktu baca*).
  - Judul (H2): Ukuran besar dengan tipografi tegas.
  - Ringkasan: Paragraf padat tentang apa yang dibahas dan mengapa penting.
  - Aksen Taktil: Border halus dan bayangan `--shadow-primary`.
  - Link/Aksi: Tombol bento *"Read Essay →"*.

### 4. Articles Grid (The Catalog)
- Ditampilkan dalam grid responsif (2 kolom di desktop, 1 kolom di mobile).
- Setiap kartu artikel memuat elemen semantik:
  - `<article class="blog-card">`
  - Header: `<span class="blog-category">` & `<time datetime="YYYY-MM-DD">` & `<span class="read-time">`
  - Judul: `<h3 class="blog-title"><a href="post.html?slug=...">...</a></h3>`
  - Excerpt: `<p class="blog-excerpt">...</p>`
  - Footer kartu: Tag topik (cth: `#tokens`, `#css`, `#ux`).
- **Empty State:** Jika hasil pencarian tidak ditemukan, tampilkan kartu ramah bertuliskan *"No articles found for '<keyword>'. Try another query or reset filters."*

### 5. Utilities & Connection Card
- Satu strip kartu bento di bagian bawah sebelum footer:
  - **Card A (RSS Feed):** Penjelasan singkat bahwa blog mendukung RSS reader independen + tombol copy link feed.
  - **Card B (Discussion / Feedback):** Tautan ke [contact.html](file:///f:/Vector%20project/figma%202/contact.html) bagi pembaca yang ingin berdiskusi atau bertukar pikiran mengenai topik yang ditulis.

---

## 06. DATA ARCHITECTURE (`blog-data.js`)

Untuk menjaga kemudahan pemeliharaan (*low maintenance*) dan integrasi instan tanpa backend database rumit, data artikel disimpan dalam format JavaScript Object array yang terstruktur:

```javascript
export const blogPosts = [
  {
    slug: "building-tactile-design-systems",
    title: "Membangun Sistem Desain Taktil: Dari Figma ke CSS Tokens",
    date: "2026-10-15",
    updatedDate: null,
    readingTime: "6 min read",
    category: "Design Systems",
    tags: ["CSS", "Design Tokens", "Neumorphism"],
    featured: true,
    excerpt: "Bagaimana membatasi efek neumorphism agar tetap fungsional, kontras, dan memiliki hierarki visual yang jelas tanpa jatuh ke dalam tren dekoratif berlebihan.",
    contentUrl: "posts/building-tactile-design-systems.html" // atau template post.html?slug=...
  },
  {
    slug: "customer-support-to-product-design",
    title: "Melihat Antarmuka dari Kacamata Dukungan Pelanggan",
    date: "2026-09-28",
    updatedDate: null,
    readingTime: "4 min read",
    category: "Product & Support",
    tags: ["UX", "Customer Support", "Product"],
    featured: false,
    excerpt: "Pelajaran berharga yang didapat dari ribuan tiket troubleshooting teknis: antarmuka terbaik adalah antarmuka yang tidak membuat pengguna merasa tersesat.",
    contentUrl: "posts/customer-support-to-product-design.html"
  }
];
```

---

## 07. ACCESSIBILITY (A11Y) & PERFORMANCE REQUIREMENTS

1. **Semantic HTML:**
   - Gunakan `<main>`, `<header>`, `<section>`, `<article>`, `<time>`, dan heading level yang berurutan (`h1` → `h2` → `h3`).
2. **Keyboard Navigation & Focus States:**
   - Seluruh filter pill dan link kartu dapat diakses via `Tab`, dengan outline fokus jelas `--color-dark`.
3. **Screen Readers:**
   - Tombol search memiliki `aria-label="Search articles"`.
   - Filter pill memiliki `role="button"` dan status `aria-pressed="true/false"`.
4. **Performance:**
   - Zero external framework overhead (Pure Vanilla JS & CSS).
   - Instant search dijalankan secara *debounced* di sisi klien.
   - Waktu muat halaman ditargetkan `< 300ms`.

---

## 08. IMPLEMENTATION ROADMAP

- [ ] **Langkah 1:** Tambahkan menu `Blog` pada daftar halaman di `site-chrome.js`.
- [ ] **Langkah 2:** Buat file data awal `blog-data.js` berisi 2–3 draft artikel awal.
- [ ] **Langkah 3:** Implementasikan `blog.html` sesuai spesifikasi hierarki di atas.
- [ ] **Langkah 4:** Tulis styling `blog.css` dengan menerapkan token bento dan neumorphism.
- [ ] **Langkah 5:** Buat logika filter dan search interaktif di `blog.js`.
- [ ] **Langkah 6:** Uji kontras Light/Dark mode dan kelancaran di mobile viewport.
