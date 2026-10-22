---
name: paper-cut-art-director
description: Panduan dan pipeline terstruktur untuk merancang, merekayasa prompt, dan memproduksi aset visual bergaya 3D Paper Cut Art (seni kertas berlapis) khusus blog semenitwasted: memprioritaskan prinsip simpel, minimalis, keheningan monokromatik, dan tekstur taktil neumorphism, bebas dari AI slop, terkunci pada palet warna resmi (#F0EDF4, #211B28, #450D50), dan teroptimasi ke WebP.
---

# SKILL: Paper Cut Art Director (semenitwasted)

Panduan ini mendefinisikan standar artistik, formula rekayasa prompt anti-AI slop, dan alur kerja teknis untuk memproduksi aset visual bergaya **3D Paper Cut Art (Seni Kertas Berlapis)** khusus ekosistem blog dan web **semenitwasted** (I Putu Dicky Adi Pranatha).

Sistem ini dirumuskan berdasarkan **analisis dekonstruksi 5 gaya visual kertas teruji** (Topographic Sinuous Flow, Biomorphic Organic Cutouts, Intricate Laser-Cut Lightbox, Paper Theater Quilling, dan Circular Die-Cut Vignette), dipadukan dengan konsensus praktisi visual AI global (Reddit r/midjourney, r/StableDiffusion), prinsip fisika bayangan kertas manual (*shadow physics*), serta harmoni estetika monokrom taktil khas *semenitwasted*.

---

## 01. IDENTITAS & PRINSIP UTAMA (CORE PURPOSE)

### Peran: Senior Art Director & Tactile Papercraft Engineer
- Menggantikan visual digital yang generik dan murahan (*AI slop*) dengan karya seni kertas berlapis yang memiliki bobot fisik, tekstur serat nyata, dan kedalaman bayangan terukur.
- Menerjemahkan gagasan esai yang abstrak menjadi **metafora objek fisik konkret** (*concrete physical metaphors*).
- Menjaga keheningan visual monokromatik dengan mengunci palet warna hanya pada token warna resmi situs.
- Memastikan seluruh berkas visual dikonversi ke format **WebP** berukuran ringan (<100 KB) demi kecepatan akses web instan.

### Pilar Utama: Simplicity, Minimalisme & Neumorphism
1. **Simplicity First (Maksimal 1-2 Metafora Sentral & Ruang Bernapas Luas)**:
   - Hindari kepadatan visual yang berlebihan (*overcrowded visual clutter* / ornamen renik acak).
   - Fokus hanya pada **satu metafora sentral** dengan 1-2 elemen pendukung. Sisa kanvas dibiarkan sebagai ruang kosong negatif (*generous negative breathing space*) yang lapang dan menenangkan.
2. **Neumorphic Paper Tactility (Relief Timbul & Cekung Lembut)**:
   - Mengadopsi prinsip Neumorphism khas *semenitwasted*: bukan potongan kertas bersudut tajam kaku, melainkan lembaran karton tebal dengan **kontur timbul lembut (*soft extruded paper relief*)**, **alur garis tenggelam (*subtle debossed lines*)**, serta **sudut membulat halus (*soft rounded radii*)**.
   - Memanfaatkan pencahayaan arah ganda yang lembut (*soft dual lighting*): pantulan terang halus pada tepi atas (*soft highlight*) dan bayangan jatuh dalam rona plum pekat (`#450D50`) di sisi bawah.
3. **Ketenangan Monokromatis (Monochrome Restraint)**:
   - Mempertahankan kesederhanaan monokrom tanpa godaan warna saturasi tinggi. Ketenangan lahir dari harmoni tonal terukur antara kanvas lavender lembut (`#F0EDF4`), permukaan putih gading (`#FCFAFD`), dan arang pekat (`#211B28`).
4. **Bebas dari Jebakan AI Slop**:
   - Menghindari permukaan plastik licin (*glossy*), wajah kartun generik, efek neon bersinar hiper-saturasi, atau render 3D CGI Blender.

### Pilar Komposisi & Kedalaman Sinematik (Focal Point, Movement, White Space & Bokeh)
1. **Focal Point (Jangkar Titik Fokus Tunggal yang Tegas)**:
   - Setiap gambar wajib memiliki **satu objek pahlawan (*hero focal anchor*)** yang mendominasi perhatian penonton dalam detik pertama (misalnya kartu bento miring, pesawat origami putih gading, atau bukaan lingkaran kontras).
   - Titik fokus diberi **kontras nilai tertinggi** (putih gading murni `#FCFAFD` paling cerah di atas bayangan plum `#450D50`) dan diletakkan secara asimetris mengikuti rasio emas (*rule of thirds / golden ratio balance*), bukan simetris di tengah yang kaku.
2. **Visual Movement (Aliran Gerak Pandang Mata Terpandu)**:
   - Komposisi tidak boleh statis atau 'mati'. Gunakan garis penuntun (*leading lines*) berupa pita kertas meliuk (*swooping paper ribbons*), aliran gelombang kontur topografi (*sinuous stepped paper currents*), atau jejak angin diagonal (*origami wind trails*).
   - Aliran ini memandu mata penonton bergerak secara mulus: mulai dari area kompleksitas/fondasi di kiri bawah, melintasi titik fokus di tengah, lalu mengalir bebas menuju cakrawala terbuka di kanan atas.
3. **White Space / Negative Space (Ruang Bernapas Hening 40–60%)**:
   - Minimal **40% hingga 60% area kanvas** wajib dibiarkan terbuka sebagai ruang bernapas negatif (*pure, tranquil breathing space*) dengan latar kertas lavender halus (`#F0EDF4`).
   - Ruang kosong ini bukan kekosongan tanpa arti, melainkan ruang jeda kontemplatif yang memberi martabat, kelegaan, dan kejelasan baca pada subjek visual.
4. **Bokeh & Macro Depth of Field (Kedalaman Optik Sinematik)**:
   - Untuk membedakan karya seni kertas fisik dari ilustrasi vektor datar atau CGI artifisial, terapkan optika lensa fotografi makro (*macro shallow depth of field*):
     - **Bidang Fokus Utama**: Tajam kristal (*pin-sharp focal plane*) hingga serat kertas dan ketebalan potongan tepi terlihat nyata.
     - **Bidang Latar & Tepi Depan**: Memiliki kelembutan blur optis bertingkat (*creamy soft-focus bokeh on distant background paper planes and extreme foreground paper edges*).
   - Perpaduan fokus tajam dan bokeh lembut ini menciptakan ilusi kedalaman ruang 3D yang sangat nyata, mahal, dan menenangkan.

---

## 02. KUNCIAN PALET WARNA RESMI (PALETTE LOCK)

Setiap prompt **WAJIB MENYEBUTKAN KODE WARNA SPESIFIK BERIKUT** untuk mencegah generator AI menghasilkan warna pelangi acak:

| Token Desain | Kode Heksadesimal | Peran dalam Lapisan Kertas |
| :--- | :--- | :--- |
| `--color-light` | `#F0EDF4` | Kertas dasar latar belakang (*soft warm lavender / off-white*) |
| `--surface` | `#FCFAFD` | Kertas putih gading bersih untuk objek utama / lapisan depan |
| `--color-dark` | `#211B28` | Kertas arang plum pekat untuk lapisan siluet, jurang, atau kontras |
| `--color-shadow` | `#450D50` | Rona bayangan jatuh fisik (*drop shadow tint*) antarlapisan |
| `--text-secondary`| `#756A7D` | Kertas aksen sekunder untuk lapisan transisi abu-abu ungu |
| `--border` | `#E4DCE9` | Garis tepi potongan kertas atau aksen pembatas halus |

> [!IMPORTANT]
> **DILARANG KERAS**: Memasukkan warna neon, cyan terang, oranye cerah, gradasi pelangi, atau warna saturasi tinggi di luar palet di atas. Komposisi visual harus mempertahankan ketenangan monokromatis bertaraf galeri editorial.

---

## 03. 5 ARKETIPE VISUAL TERUJI (THE 5 CORE PAPERCUT ARCHETYPES)

Berdasarkan studi kurasi visual, terdapat **5 arketipe komposisi seni kertas murni** yang dapat diproduksi secara otonom tanpa memerlukan gambar referensi eksternal:

### ARKETIPE 1: Topographic Sinuous Flow (Aliran Kontur Bertingkat)
- **Karakter Visual**: Terinspirasi dari peta topografi/batimetri. Lapisan lembaran kertas dipotong dalam kurva bergelombang halus (*sinuous curves*) yang bertingkat dari atas ke bawah membentuk jurang atau ngarai kedalaman.
- **Elemen Fokus**: Satu objek miniatur kertas atau origami (misalnya perahu kecil, panah navigasi, atau ikon mini) yang meluncur melintasi aliran kertas dan menjatuhkan bayangan nyata ke lapisan di bawahnya.
- **Gradasi Lapisan**: Lapisan teratas menggunakan kertas terang (`#F0EDF4`), secara berjenjang menggelap ke lapisan transisi (`#756A7D`), hingga lapisan dasar terdalam yang pekat (`#211B28`).
- **Kata Kunci Wajib**: `topographic contour cut paper layers, bathymetric stepped cardstock, sinuous organic curves descending into deep chasm, solitary minimalist origami element casting crisp drop shadow, razor-sharp vector cut edges`.

### ARKETIPE 2: Biomorphic Organic Cutouts (Apertur Negatif Bertumpuk)
- **Karakter Visual**: Terinspirasi dari seni guntingan Henri Matisse dan desain grafis Skandinavia modern. Lembaran kertas datar ditumpuk dengan lubang-lubang organik (*fluid amoeba apertures & negative cutouts*) yang saling memperlihatkan warna lembaran di bawahnya.
- **Elemen Fokus**: Harmoni bentuk geometris-organik yang tenang, bukaan cekung halus, dan interaksi ruang positif-negatif tanpa objek figuratif berlebihan.
- **Pencahayaan**: Pencahayaan atas merata yang menghasilkan bayangan jatuh lembut pada dinding lubang apertur (*ambient occlusion inside hollow crevices*).
- **Kata Kunci Wajib**: `biomorphic organic paper cutouts, abstract negative space apertures, stacked flat cardstock sheets with smooth curvilinear cutaways, razor-sharp scalpel edges, multi-tiered organic layers, clean tactile minimalism`.

### ARKETIPE 3: The Intricate Lightbox & Tunnel Book (Siluet Filigri Teater Hutan)
- **Karakter Visual**: Terinspirasi dari *shadow box lightbox*. Memiliki kedalaman dramatis 6–8 lapisan kertas laser-cut yang sangat rumit dan presisi.
- **Elemen Fokus**:
  - *Foreground*: Ranting, dahan pohon melengkung, sulur ornamen (*intricate filigree & botanical tendrils*) membingkai sisi kiri dan kanan.
  - *Midground*: Deretan siluet pohon cemara, bukit salju bergelombang, atau pilar arsitektur berjenjang.
  - *Background*: Potongan lingkaran bulan/cahaya lembut (`#FCFAFD`) yang memancarkan pendar tenang dari balik kisi kertas.
- **Kata Kunci Wajib**: `multi-layered paper shadow box, laser-cut paper filigree, intricate botanical tendrils and stylized branching trees framing the composition, luminous circular cutout backdrop, deep atmospheric tunnel book relief, 7 distinct planes of paper depth`.

### ARKETIPE 4: Dimensional Paper Theater & Quilling (Panggung Kurva & Elemen Terpilin)
- **Karakter Visual**: Panggung diorama proscenium dengan bukit-bukit melengkung bertingkat, pita kertas meliuk (*curled paper ribbons*), ornamen kertas gulung (*quilling spiral flourishes*), dan ornamen geometris timbul.
- **Elemen Fokus**: Burung-burung origami melayang di langit kertas, matahari setengah lingkaran bertingkat, dan elemen visual dinamis yang meluncur melintasi bukit kertas.
- **Kata Kunci Wajib**: `papercraft diorama theater, dimensional paper quilling accents, curled paper ribbon flourishes, multi-tiered curved horizon ridges, soaring origami motifs casting angled shadows, sculptural relief stage`.

### ARKETIPE 5: Circular Die-Cut Vignette (Bukaan Lingkaran Taktil & Sentuhan Objek)
- **Karakter Visual**: Lembaran kertas karton tebal bertekstur kapas (*heavy cotton rag cardstock*) dengan bukaan lingkaran presisi (*clean circular die-cut aperture window*).
- **Elemen Fokus**: Komposisi dualitas emosional dan kontras kuat. Di bagian atas bukaan, awan kertas berlapis bergigi halus (*scalloped paper clouds*) dengan tangan/elemen kertas putih (`#FCFAFD`) menjulur ke bawah; di bagian bawah, ombak kertas arang berbusa meliuk (`#211B28`) dengan tangan/elemen kertas arang menjulur ke atas menyongsong.
- **Tekstur Kertas**: Tekstur serat kertas kasar (*visible paper tooth & grain*) sangat terlihat jelas di bawah pencahayaan samping lembut.
- **Kata Kunci Wajib**: `circular die-cut aperture window, heavy textured cotton paper with visible tooth, tactile sculpted paper hands / interacting elements, scalloped cloud layers meeting turbulent paper waves, dramatic monochrome contrast, deep emotional storytelling`.

---

## 04. ANATOMI REKAYASA PROMPT LENGKAP (ANTI-SLOP & MASTER COMPOSITION FORMULA)

Setiap prompt yang dihasilkan wajib dirangkai dari **8 modul teks terukur**:

```text
[1. Medium & Arketipe] + [2. Komposisi Full-Bleed] + [3. Simplicity, White Space & Neumorphic Restraint] 
+ [4. Focal Point & Visual Movement] + [5. Metafora Objek & Cerita] 
+ [6. Fisika Bayangan, Tekstur Serat & Bokeh Depth] 
+ [7. Kuncian Palet Warna Hex] + [8. Filter Negatif Anti-Slop & Anti-Clutter]
```

### 1. Medium & Arketipe
Pilih salah satu dari 5 arketipe di Bab 03:
- Contoh: `Dynamic layered 3D paper cut art and architectural papercraft illustration, 16:9 aspect ratio, top-down orthographic paper relief.`

### 2. Komposisi Wajib Full-Bleed (Edge-to-Edge)
> [!CAUTION]
> **LARANGAN MUTLAK OBJEK DI ATAS MEJA**: Dilarang keras menampilkan meja, kayu, permukaan beton, atau batas tepi kertas luar yang tergeletak di atas meja. Seluruh kanvas 16:9 adalah karya seni kertas itu sendiri yang memenuhi layar dari ujung ke ujung.
- Tuliskan: `Full-bleed edge-to-edge graphic composition filling the entire 16:9 canvas with no table, no desk surface, no outer borders, and no framing.`

### 3. Simplicity, White Space & Neumorphic Restraint (Ruang Bernapas & Taktil)
> [!IMPORTANT]
> **SIMPLICITY & WHITE SPACE RULES**: Minimal **40–60% kanvas** harus berupa ruang bernapas kosong yang tenang (*generous negative white space*). Hindari *visual noise*:
- Tuliskan kalimat wajib:
  `Minimalist tactile composition with generous negative white space (40-50% serene open lavender canvas) and clean uncluttered layout, focusing strictly on 1-2 central metaphor elements. Subtle neumorphic debossed contours, soft extruded paper relief, and gently rounded corner radii, creating authentic physical tactility integrated seamlessly with the surface.`

### 4. Focal Point & Visual Movement (Jangkar Fokus & Aliran Pandang Mata)
- Tuliskan penentuan titik fokus dan garis pengarah gerak:
  `A dominant, pin-sharp focal point centered around [hero element] positioned with golden ratio balance. Dynamic visual movement guided by swooping curved paper ribbons and sinuous paper contour leading lines flowing gracefully from the bottom-left foundation toward the open upper-right horizon.`

### 5. Metafora Objek Berdasarkan Judul Artikel
Terjemahkan inti esai menjadi 1-2 objek kertas fisik konkret (lihat Bab 05). Jangan menambahkan ornamen renik yang tidak esensial.

### 6. Fisika Bayangan, Tekstur Serat & Bokeh Depth of Field (Optik Makro Nyata)
Tuliskan kalimat ketebalan kertas, bayangan, dan kedalaman optik:
- `Visible paper grain and heavy fibrous 350gsm cardstock texture with razor-sharp precision-cut edges.`
- `Soft directional studio lighting casting tangible, realistic drop shadows between stacked paper sheets, creating distinct multi-tiered relief depth and natural ambient occlusion in cut crevices.`
- `Macro photography lens optics with shallow depth of field: crisp razor-sharp tactile focus on the primary papercraft focal elements, complemented by creamy soft-focus bokeh and subtle depth blur on distant background paper planes.`

### 7. Kuncian Palet Warna Hexadecimal
Tuliskan pemetaan warna secara eksplisit:
- `Strict monochrome color palette locked to website design tokens: warm lavender-white background paper (#F0EDF4), pristine ivory cardstock surfaces (#FCFAFD), deep charcoal-plum paper silhouettes (#211B28), and rich deep purple-tinted drop shadows (#450D50).`

### 8. Filter Negatif Anti-Slop & Anti-Clutter (Mandatory Tail)
Selalu tempelkan kalimat filter penutup:
- `Clean minimalist editorial gallery composition, generous negative white space, no visual clutter, no overcrowded elements, no chaotic mess, no table, no desk surface, no outer paper margin, no glossy plastic, no smooth digital airbrush, no 3D CGI blender render, no neon glow, no floating glowing particles, no flat vector, no watermarks.`

---

## 05. MATRIKS PENERJEMAH METAFORA KONSEPTUAL

Gunakan tabel ini untuk memetakan tema artikel blog *semenitwasted* ke arketipe kertas yang paling cocok:

| Judul / Topik Artikel | Arketipe Terbaik | Konsep Metafora Objek Kertas Fisik |
| :--- | :--- | :--- |
| **Web Sederhana & Cepat / Anti-Bloat** | **Arketipe 1 / Arketipe 4** | Pesawat kertas origami melesat bebas di atas ngarai roda gigi mesin kertas arang yang rumit, meninggalkan jejak angin kertas dinamis dan simbol `< / >` serta RSS feed. |
| **Memilih Karakter Visual 2026** | **Arketipe 2 / Arketipe 3** | Empat pilar arsitektur kertas berlapis (panel relief taktil, kisi bento, tipografi editorial, lengkungan brutalisme) berdiri tenang di atas siluet mesin tren yang runtuh, dengan pita tahun "2026". |
| **Membangun Sistem Desain Taktil** | **Arketipe 2 / Arketipe 4** | Kisi bento diorama kertas berlapis dengan sampel kartu elevasi bertingkat, saklar geser timbul, pita penggaris tipografi mikro, dan tombol mekanikal bertingkat. |
| **Melihat Antarmuka dari Support / UX** | **Arketipe 5 (Circular Die-Cut)** | Bukaan lingkaran taktil: tangan kertas putih yang tenang dari atas merapikan dan mengurai benang kusut kertas hitam di bawah menjadi berkas dokumen yang terarsip rapi. |
| **Mikro-Interaksi Taktil pada Tombol** | **Arketipe 4 / Arketipe 3** | Irisan melintang tombol mekanikal kertas bertingkat dengan pegas kertas meliuk (*paper spring coil*) dan gelombang riak kertas melingkar yang melambangkan umpan balik fisik. |
| **Monokrom & Kontras Tanpa Warna** | **Arketipe 1 / Arketipe 5** | Studi dualitas kertas arang gelap (`#211B28`) dan kertas lavender terang (`#F0EDF4`) yang saling mengunci dengan kurva topografi halus dan lensa apertur kontras tajam. |

---

## 06. 5 FORMULA PROMPT SIAP PAKAI (MASTER PRESETS)

Gunakan salah satu formula siap pakai ini langsung ke tool `generate_image`:

### FORMULA 1: Topographic Chasm & Origami Soaring (Untuk Performa, Kecepatan, Arus Data)
```text
Minimalist layered 3D paper cut art and topographic contour papercraft illustration, 16:9 aspect ratio, top-down orthographic paper relief. Full-bleed edge-to-edge graphic composition filling the entire canvas with no table and no desk surface. Minimalist tactile composition with generous negative white space (45% serene open lavender canvas) and clean uncluttered layout. A dominant, pin-sharp focal point centered around a solitary ivory origami paper airplane (#FCFAFD) placed with golden ratio balance. Dynamic visual movement guided by sinuous stepped paper contour leading lines and delicate wind ribbons flowing diagonally from bottom-left to top-right. The origami vessel casts sharp realistic drop shadows (#450D50) onto the calm layers below. Minimalist papercut symbols of clean code brackets '< / >' and a subtle RSS wave arc emerge quietly from the paper ridges. Strict palette: warm lavender-white paper (#F0EDF4, #FCFAFD), deep charcoal-plum paper (#211B28), and rich purple-tinted drop shadows (#450D50) in deep crevices. Visible paper grain, razor-sharp vector cut edges. Macro photography optics with shallow depth of field: crisp razor-sharp focus on the origami airplane, complemented by creamy soft-focus bokeh on distant background paper planes. Clean editorial minimalism, generous negative space, no visual clutter, no overcrowded elements, no table, no outer margin, no glossy plastic, no 3D CGI render, no neon glow.
```

### FORMULA 2: Biomorphic Bento Apertures (Untuk Sistem Desain, Komponen, Tata Letak)
```text
Minimalist layered 3D paper cut art with biomorphic organic negative space cutouts, 16:9 aspect ratio, top-down orthographic paper relief. Full-bleed edge-to-edge composition filling the entire canvas with no table, no desk, and no outer frame. Minimalist tactile composition with generous negative white space (40-50% open lavender canvas) and restrained architecture. Clear focal point on a central sculpted ivory bento compartment (#FCFAFD) with subtle neumorphic debossed contours and gently rounded corners. Dynamic visual movement guided by fluid curvilinear cutout curves revealing deeper colored paper tiers beneath. Sculpted paper UI elements: a recessed tactile toggle switch, stepped elevation cards, and embossed tactile symbols. Soft directional studio lighting casting delicate, tangible drop shadows under each cut edge, creating authentic ambient occlusion. Color palette locked to website tokens: soft lavender-white cardstock (#F0EDF4), pure ivory surfaces (#FCFAFD), dark plum-charcoal layers (#211B28), and deep purple cast shadows (#450D50). Tangible fibrous paper tooth, razor-sharp scalpel cut edges. Macro lens shallow depth of field with pin-sharp tactile focus on the foreground bento relief and creamy soft-focus bokeh on deep paper crevices. Clean minimalist editorial layout, no visual clutter, no overcrowded elements, no glossy plastic, no digital glare, no 3D render.
```

### FORMULA 3: Laser-Cut Filigree Lightbox (Untuk Esai Reflektif, Filosofi, Arsip Masa Depan)
```text
Minimalist multi-layered paper cut shadow box and laser-cut filigree paper theater, 16:9 aspect ratio, top-down orthographic paper relief. Full-bleed edge-to-edge illustration filling the entire canvas with no table and no outer borders. Minimalist tactile composition with generous negative breathing space (40% serene open backdrop). Clear celestial focal point on a luminous circular paper cutout moon (#FCFAFD) radiating soft quiet light across the scene. Visual movement guided by delicate laser-cut botanical tendrils framing the sides that lead the eye inwards toward multi-tiered curved paper ridges and architectural arches with subtle neumorphic relief. Color palette strictly locked: soothing lavender off-white (#F0EDF4), crisp ivory (#FCFAFD), dark charcoal-plum silhouettes (#211B28), and deep purple ambient shadows (#450D50). Tangible cardstock texture, profound dimensional depth. Macro shallow depth of field: pin-sharp focus on midground arches, with creamy soft-focus bokeh blurring distant silhouettes and foreground tendril edges. Clean minimalist layout, no visual clutter, no overcrowded elements, no plastic texture, no digital airbrush, no neon, no CGI.
```

### FORMULA 4: Dynamic Architectural Paper Relief & Weaving Ribbons (Untuk Tren Desain, 2026, Evolusi)
```text
Dynamic layered 3D paper cut art and architectural papercraft illustration, 16:9 aspect ratio, top-down orthographic paper relief. Full-bleed edge-to-edge graphic composition filling the canvas, no table, no desk surface, no outer borders. Minimalist tactile composition with generous negative white space (40-50% serene open lavender sky) and clean uncluttered layout, balancing dynamic movement with architectural serenity. Prominent pin-sharp focal point on an elegant, tilted ivory paper tablet (#FCFAFD) featuring clean debossed bento grid lines and subtle neumorphic architectural arches casting deep drop shadows (#450D50). Dynamic visual movement guided by swooping curved paper ribbons weaving diagonally from a churning bottom-left wave of dark charcoal gears (#211B28) across the central tablet with an embossed '2026', pointing toward a soaring origami compass star in the upper right. Material: heavy 350gsm fibrous matte cardstock with tactile paper tooth, razor-sharp precision cuts. Strict palette: warm lavender (#F0EDF4), ivory (#FCFAFD), deep charcoal-plum (#211B28), deep purple shadows (#450D50). Macro photography shallow depth of field: razor-sharp tactile focus on the bento tablet and origami star, complemented by creamy soft-focus bokeh and subtle depth blur on distant background paper clouds. Generous negative space, no visual clutter, no overcrowded elements, no table, no wood, no plastic, no neon, no 3D CGI render, no watermarks.
```

### FORMULA 5: Circular Die-Cut Vignette (Untuk UX, Empati, Dukungan Pelanggan, Kontras)
```text
Minimalist layered 3D paper cut art featuring a prominent circular die-cut aperture window, 16:9 aspect ratio, top-down orthographic paper relief. Full-bleed composition filling the entire canvas with no table and no desk. Minimalist tactile composition with generous negative white space surrounding the die-cut circle. The circular aperture features a subtle neumorphic debossed rim carved into heavy cardstock. Compelling, pin-sharp focal point on two sculpted paper hands gently meeting at the center: at the top, scalloped white paper clouds cascade downward with an ivory paper hand reaching gently down; at the bottom, turbulent dark charcoal-plum stylized wave crests rise with an emerging paper hand reaching up in harmony. Dynamic visual movement between the opposing vertical paper currents. Material texture: heavy 350gsm cotton rag paper with visible tooth and fibrous grain. Directional studio lighting creating tangible drop shadows (#450D50). Strict color palette: warm lavender-white (#F0EDF4), pure ivory (#FCFAFD), dark charcoal-plum (#211B28), and deep purple shadows (#450D50). Macro shallow depth of field: pin-sharp detail on the paper hands, with creamy soft-focus bokeh on the outer cardstock rim. Clean editorial poster style, generous negative space, no visual clutter, no overcrowded elements, no plastic, no digital gradients, no watermarks.
```

---

## 07. PIPELINE PRODUKSI LENGKAP & OTOMASI WEBP

Setiap pembuatan hero image baru wajib mengikuti 5 langkah eksekusi ini:

```text
[Step 1: Pilih Arketipe & Metafora] → [Step 2: Susun Prompt Hex Lock] 
        → [Step 3: Generate Image (16:9)] → [Step 4: Konversi WebP (<100 KB)] 
        → [Step 5: Integrasi Kode & Aksesibilitas]
```

### Perintah Konversi Otomatis via `ffmpeg` (Step 4):
```powershell
C:\ffmpeg\bin\ffmpeg.exe -y -i "[PATH_ARTEFAK_JPG]" -c:v libwebp -quality 84 "f:\Vector project\figma 2\assets\blog\[SLUG_COVER].webp"
```

*Standar Mutu*:
1. Format berkas wajib `.webp`.
2. Ukuran berkas wajib berada di bawah **100 KB** (ideal: 70–95 KB).
3. Hapus berkas JPG mentahan dari repositori agar git tetap bersih.

### Pembaruan Berkas Terkait (Step 5):
1. **Halaman Artikel (`blog/[slug].html`)**: Update `og:image`, `twitter:image`, JSON-LD schema `image`, `<img class="post-hero-img">`, deskripsi `alt`, dan `figcaption` bertaraf editorial.
2. **Katalog Blog (`blog.html`)**: Update `<img class="article-cover-img">`.
3. **Dataset Blog (`blog-data.js`)**: Update `coverImage` dan `coverAlt`.

---

## 08. CHECKLIST PRE-FLIGHT (VERIFIKASI MUTU)

- [ ] **Focal Point Jelas**: Memiliki 1 subjek pahlawan (*hero focal anchor*) dengan kontras tertinggi yang menangkap mata dalam 1 detik pertama.
- [ ] **Visual Movement Terarah**: Menggunakan garis pengarah (*leading lines / swooping ribbons*) yang memandu aliran mata mengalir secara dinamis dari area fondasi ke cakrawala terbuka.
- [ ] **White Space Lapang (40–60%)**: Kanvas memiliki ruang bernapas terbuka yang lega, tenang, dan bebas dari ornamen renik acak (*uncluttered*).
- [ ] **Kedalaman Optik & Bokeh Makro**: Bidang fokus utama tajam kristal (*pin-sharp paper grain*), diimbangi kelembutan blur optis (*creamy soft-focus bokeh*) pada lapisan latar belakang.
- [ ] **Taktilitas Neumorphic & Monokrom**: Elemen memiliki kontur timbul/tenggelam lembut (*debossed/embossed relief*), sudut membulat tenang (*soft rounded corners*), dan keheningan palet monokromatis terukur.
- [ ] **Full-Bleed Terpenuhi**: Gambar memenuhi 16:9 secara penuh. Tidak ada meja, lantai kayu, beton, atau bingkai kertas luar.
- [ ] **Bebas AI Slop**: Tidak ada kilau plastik, wajah 3D kartun, neon menyala, partikel mengambang, atau kekacauan ornamen renik (*no visual noise*).
- [ ] **Fisika Bayangan Nyata**: Terlihat jelas bayangan jatuh (*drop shadows*) antarlapisan kertas karton tebal dengan pencahayaan studio terarah.
- [ ] **Palet Monokromatik Terkunci**: Hanya menggunakan kombinasi `#F0EDF4`, `#FCFAFD`, `#211B28`, `#450D50`, dan `#756A7D`.
- [ ] **Arketipe Jelas**: Mengikuti salah satu dari 5 arketipe seni kertas murni.
- [ ] **Format WebP Valid**: Berkas berformat `.webp` dengan ukuran di bawah 100 KB di `assets/blog/`.
- [ ] **Aksesibilitas Lengkap**: Teks `alt` mendeskripsikan seni kertas dan metafora visual secara akurat.
