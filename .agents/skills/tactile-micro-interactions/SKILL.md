---
name: tactile-micro-interactions
description: Standar rekayasa animasi mikro taktil dan fisika interaksi ala Emil Kowalski (Linear) untuk kartu bento, tombol, switch, dan elemen UI monokrom semenitwasted agar terasa hidup, membal, dan memuaskan saat disentuh.
version: 1.0.0
---

# SKILL: Tactile Micro-Interactions & Interaction Physics (Emil Kowalski Style)

Panduan ini mendefinisikan standar rekayasa animasi mikro (*micro-interactions*), fisika pegas (*spring physics*), dan sensasi sentuhan digital (*tactile feedback*) untuk antarmuka **semenitwasted**. 

Filosofi ini terinspirasi langsung dari karya **Emil Kowalski** (mantan Design Engineer di Linear, kreator Sonner, dan penulis *Animations on the Web*) yang dipadukan dengan identitas **Monokrom Taktil Neomorfik** khas semenitwasted (`#F0EDF4`, `#211B28`, `#450D50`).

---

## 1. FILOSOFI DASAR (MOTION & INTERACTION PHILOSOPHY)

1. **Fisik & Tangible, Bukan Sekadar Visual**:
   Setiap elemen interaktif di layar harus terasa seperti memiliki massa, bobot fisik, dan tegangan pegas nyata di dunia fisik.
2. **Kinerja Tinggi Tanpa Kompromi (Compositor Only)**:
   Seluruh animasi interaksi mikro hanya boleh memanipulasi properti yang dirender langsung oleh GPU/Compositor thread: **`transform`** dan **`opacity`**. Dilarang menganimasikan `width`, `height`, `margin`, `padding`, atau `top/left` yang memicu kalkulasi ulang tata letak (*layout thrashing*).
3. **Cepat, Halus, dan Tidak Menghambat (Unobtrusive)**:
   Animasi tidak boleh membuat pengguna menunggu. Waktu respons maksimal adalah **120ms–250ms**. Pengguna harus merasa aplikasinya cepat, bukan terhambat oleh transisi yang lamban.

---

## 2. ATURAN 4 STATUS FISIK KOMPONEN (THE 4 TACTILE STATES)

Setiap elemen klik (kartu bento, tombol CTA, *chip filter*, *nav-link*, tombol switch) wajib memiliki 4 status taktil yang terdefinisi dengan jelas:

### A. State 1: Rest (Kondisi Diam)
- **Visual**: Bayangan lembut dua lapis (*double soft shadow*), garis batas tepi tipis (*subtle border* `rgba(33, 27, 40, 0.08)`).
- **Transform**: `translateY(0) scale(1)`.
- **Transisi**: Gunakan kurva peluruhan alami saat kursor keluar:
  ```css
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.18s ease;
  ```

### B. State 2: Hover (Mengapung Taktil)
- **Sensasi**: Elemen terasa terangkat mendekati mata pengguna.
- **Transform**: Terangkat ringan `translateY(-2px)`.
- **Bayangan**: Bayangan kontak menyebar lebih lebar dan lebih lembut:
  ```css
  box-shadow: 0 10px 24px -6px rgba(69, 13, 80, 0.12),
              0 2px 6px -1px rgba(33, 27, 40, 0.04);
  ```
- **Border**: Garis tepi menjadi sedikit lebih kontras (`rgba(33, 27, 40, 0.18)`).

### C. State 3: Active / Pressed (Tombol Masuk / Tertekan ke Dalam) — MANDATORY
> [!IMPORTANT]
> Inilah kunci sensasi taktil ala Emil Kowalski: tombol harus terasa **tenggelam** saat jari atau mouse menekannya ke bawah.
- **Sensasi**: Tombol tertekan masuk ke permukaan papan bento (*sink effect*).
- **Transform**: `translateY(1px) scale(0.985)`.
- **Bayangan**: Bayangan luar menyusut drastis, berganti dengan bayangan tekan yang rapat:
  ```css
  box-shadow: 0 2px 4px rgba(69, 13, 80, 0.16),
              inset 0 1px 2px rgba(33, 27, 40, 0.12);
  transition-duration: 0.06s; /* Respon sangat instan saat ditekan */
  ```

### D. State 4: Focus-Visible (Aksesibilitas Terpuji)
- Wajib memiliki ring fokus yang kontras dan bersih saat diakses melalui tombol `Tab` keyboard:
  ```css
  outline: none;
  box-shadow: 0 0 0 2px #F0EDF4, 0 0 0 4px #450D50;
  ```

---

## 3. RUMUS KURVA EASING & PEGAS (EMIL KOWALSKI EASING TOKENS)

Gunakan kurva bezier presisi berikut untuk menghindari kesan animasi CSS default yang kaku:

```css
:root {
  /* Snappy Spring: Membal cepat tanpa goyangan berlebih (terbaik untuk klik/hover) */
  --ease-spring-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Smooth Decel: Perlambatan elegan (terbaik untuk modal masuk, drawer, dropdown) */
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);
  
  /* Gentle Bounce: Sedikit sentuhan membal (terbaik untuk toast notification & badge pill) */
  --ease-spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Instan Press: Sangat cepat untuk aksi sentuh mousedown */
  --ease-press: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 4. SISTEM MIKRO-INTERAKSI SPESIFIK UNTUK ELEMEN SEMENITWASTED

### 1. Kartu Bento (*Bento Card Hover Tilt & Spotlight*)
- Kartu bento tidak boleh hanya diam kaku. Saat kursor melintas, berikan efek sorotan halus (*radial spotlight*) yang mengikuti posisi mouse:
  ```javascript
  // Spotlight Cursor Tracking
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
  ```
  Di dalam CSS:
  ```css
  .bento-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(69, 13, 80, 0.05), transparent 70%);
    pointer-events: none;
    border-radius: inherit;
    transition: opacity 0.3s ease;
  }
  ```

### 2. Tombol Copy Snippet & Haptic Visual
- Saat pengguna mengklik tombol "Copy Code" atau tombol salin tautan:
  1. Ikon menyusut sejenak `scale(0.8)` selama 60ms.
  2. Berganti menjadi tanda centang dan membal membesar `scale(1.15)` dengan `--ease-spring-bounce`.
  3. Kembali ke ukuran normal `scale(1)` setelah 180ms.
  4. Muncul teks *"Tersalin!"* dengan fade-in lembut.

### 3. Reading Progress Bar yang Kenyal
- Garis progress baca di bagian atas tidak boleh bergerak patah-patah per pixel scroll. Gunakan transisi mikro `transition: width 0.1s cubic-bezier(0.16, 1, 0.3, 1)` agar gerakannya terlihat mengalir lembut saat pengguna melakukan scrolling cepat.

### 4. Switch / Toggle Taktil
- Saat toggle digeser:
  - Tombol bundar (*knob*) melebar sedikit secara elastis (`width: 22px` menjadi `26px`) saat sedang ditarik, lalu kembali bulat saat mendarat di posisi aktif (*squash and stretch principle*).

---

## 5. DUKUNGAN AKSESIBILITAS WAJIB (PREFERS-REDUCED-MOTION)

Setiap efek animasi mikro wajib menghormati pengaturan pengguna yang rentan terhadap mabuk visual (*vestibular disorders*):

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. CHECKLIST AUDIT TACTILE MICRO-INTERACTION

Sebelum menandai fitur visual selesai:
- [ ] Tombol memiliki status *pressed* nyata (`translateY(1px) scale(0.985)`).
- [ ] Kurva transisi menggunakan token bezier pegas (`--ease-spring-snappy`), bukan default `ease` atau `linear`.
- [ ] Tidak ada manipulasi properti berat layout (`width`, `height`, `margin`) di dalam hover/active transition.
- [ ] Durasi animasi mikro berada di rentang optimal (100ms - 220ms).
- [ ] Status fokus keyboard (`:focus-visible`) terlihat terang dan bersih.
- [ ] Seluruh animasi ramah pengguna dengan `prefers-reduced-motion`.
