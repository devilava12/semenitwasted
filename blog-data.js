/**
 * semenitwasted — Blog Data Repository
 * Koleksi data artikel dan catatan berkala oleh I Putu Dicky Adi Pranatha
 * Universal loader: compatible with window global, file://, and ES modules
 */

(function (root) {
  'use strict';

  const BLOG_CATEGORIES = [
    { id: 'all', label: 'All Topics' },
    { id: 'design-systems', label: 'Design Systems' },
    { id: 'frontend-code', label: 'Frontend & Code' },
    { id: 'product-support', label: 'Product & Support' },
    { id: 'reflections', label: 'Reflections' }
  ];

  const BLOG_POSTS = [
    {
      id: 'post-14',
      slug: 'sisi-gelap-vibe-coding-dan-kebutuhan-pagar-pembatas',
      title: 'Sisi Gelap Vibe Coding dan Cara Membangun Pagar Pembatas agar Kode Tidak Hancur',
      date: '2026-10-28',
      formattedDate: '28 Oktober 2026',
      readingTime: '8 min read',
      category: 'frontend-code',
      categoryLabel: 'Frontend & Code',
      tags: ['Vibe Coding', 'AI Engineering', 'Technical Debt', 'Web Development', 'Guardrails'],
      featured: true,
      excerpt: 'Vibe coding itu seperti menyuruh robot menyusun istana mainan secepat kilat: seru dan instan, tapi rawan ambruk kalau tidak dipasangi pagar pengaman yang kokoh.',
      contentUrl: 'blog/sisi-gelap-vibe-coding-dan-kebutuhan-pagar-pembatas.html',
      coverImage: 'assets/blog/Vibe%20Coding%20Behind%20the%20Firewall.webp',
      coverAlt: 'Ilustrasi Vibe Coding Behind the Firewall menampilkan suasana ruang kerja developer dengan proteksi firewall saat mengeksplorasi kode AI',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-13',
      slug: 'kenapa-chatbot-ai-sering-membuat-pelanggan-frustrasi',
      title: 'Kenapa Chatbot AI Sering Membuat Pelanggan Frustrasi dan Kapan Harus Menyerahkannya ke Manusia',
      date: '2026-10-27',
      formattedDate: '27 Oktober 2026',
      readingTime: '8 min read',
      category: 'product-support',
      categoryLabel: 'Product & Support',
      tags: ['Customer Support', 'Chatbot AI', 'Product Strategy', 'UX Ethics', 'Human Handoff'],
      featured: false,
      excerpt: 'Chatbot AI sering bikin kesal bukan karena bodoh, melainkan karena robot tanpa perasaan dipaksa menyelesaikan masalah genting saat orang sedang panik. Simak ulasan sederhana dan solusinya.',
      contentUrl: 'blog/kenapa-chatbot-ai-sering-membuat-pelanggan-frustrasi.html',
      coverImage: 'assets/blog/Frustrated%20Anime%20Girl%20and%20Chatbot.webp',
      coverAlt: 'Ilustrasi perempuan merasa frustrasi di depan laptop dan smartphone menghadapi jawaban chatbot AI yang kaku dan berulang',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-12',
      slug: 'jualan-laris-di-medsos-tapi-belum-punya-website',
      title: 'Jualan Laris di Medsos tapi Belum Punya Website: Kapan Waktu yang Tepat Punya Toko Sendiri?',
      date: '2026-10-26',
      formattedDate: '26 Oktober 2026',
      readingTime: '7 min read',
      category: 'product-support',
      categoryLabel: 'Product & Support',
      tags: ['E-Commerce', 'David Alfa Sunarna', 'Owned Asset', 'Digital Strategy', 'Website Bisnis'],
      featured: false,
      excerpt: 'Jualan di medsos itu seperti numpang jualan di halaman orang lain. Pelajari kenapa kamu butuh website toko sendiri dan kapan waktu yang tepat untuk memulainya.',
      contentUrl: 'blog/jualan-laris-di-medsos-tapi-belum-punya-website.html',
      coverImage: 'assets/blog/Pemilik%20Toko%20Online%20Sedang%20Berpikir.webp',
      coverAlt: 'Ilustrasi pemilik toko online sedang berpikir di depan laptop merenungkan strategi memiliki website toko sendiri',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-11',
      slug: 'bahaya-desain-serba-instan-dan-kebutuhan-jeda-berpikir',
      title: 'Bahaya Desain Serba Instan Ketika Pengguna Justru Butuh Jeda untuk Berpikir',
      date: '2026-10-26',
      formattedDate: '26 Oktober 2026',
      readingTime: '7 min read',
      category: 'product-support',
      categoryLabel: 'Product & Support',
      tags: ['Intentional Friction', 'Product & Support', 'UX Design', 'Error Prevention'],
      featured: false,
      excerpt: 'Menghilangkan semua friksi pada antarmuka digital adalah resep bencana bagi tindakan berisiko tinggi. Pelajari cara merancang intentional friction yang melindungi pengguna.',
      contentUrl: 'blog/bahaya-desain-serba-instan-dan-kebutuhan-jeda-berpikir.html',
      coverImage: 'assets/blog/Neon%20Creative%20Desk%20at%20Sunset.webp',
      coverAlt: 'Ilustrasi meja kerja kreatif bernuansa neon saat matahari terbenam yang merefleksikan jeda berpikir di tengah antarmuka serba cepat',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-10',
      slug: 'membedakan-kaya-tampilan-dan-sejahtera-finansial',
      title: 'Membedakan Kaya Tampilan dan Sejahtera Finansial Tanpa Terjebak Perlombaan Status',
      date: '2026-10-24',
      formattedDate: '24 Oktober 2026',
      readingTime: '11 min read',
      category: 'reflections',
      categoryLabel: 'Reflections',
      tags: ['Personal Finance', 'Reflections', 'Mindset', 'Life Design'],
      featured: false,
      excerpt: 'Kekayaan sejati tidak diukur dari kemewahan yang tampak di media sosial, melainkan dari ketenangan batin, kesehatan arus kas 10-20-30-40, dan angka cukup.',
      contentUrl: 'blog/membedakan-kaya-tampilan-dan-sejahtera-finansial.html',
      coverImage: 'assets/blog/Cyber-Luxury%20Jet%20Glamour.webp',
      coverAlt: 'Ilustrasi perempuan berbusana mewah berkilau di dalam kabin jet pribadi bersama kucing kesayangannya, merefleksikan daya pikat gaya hidup kaya tampilan dan perlombaan status semu',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-9',
      slug: 'node2shell-dan-sejarah-nodejs',
      title: 'Node2Shell Membongkar Celah di Perbatasan JavaScript dan C, dan Sejarah Node.js Menjelaskan Asalnya',
      date: '2026-10-24',
      formattedDate: '24 Oktober 2026',
      readingTime: '15 min read',
      category: 'frontend-code',
      categoryLabel: 'Frontend & Code',
      tags: ['Node.js', 'Web Security', 'CVE-2026-111497', 'Brotli'],
      featured: false,
      excerpt: 'Bedah CVE-2026-111497 (Node2Shell): bug decoder Brotli di Node.js, cara ditemukan, kenapa bisa ada, dan sejarah 17 tahun Node yang melatarinya.',
      contentUrl: 'blog/node2shell-dan-sejarah-nodejs.html',
      coverImage: 'assets/blog/Node2Shell_%20Debugging%20Through%20the%20Night.webp',
      coverAlt: 'Ilustrasi developer perempuan begadang mencari penyebab bug Node2Shell di depan laptop berstiker Node.js, ditemani kucing tidur dan diagram visual overflow buffer Brotli libbrotlidec',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-8',
      slug: 'php2shell-dan-sejarah-php',
      title: 'PHP2Shell Mengguncang Sebagian Besar Web, dan Sejarah PHP Menjelaskan Kenapa Itu Bisa Terjadi',
      date: '2026-10-23',
      formattedDate: '23 Oktober 2026',
      readingTime: '12 min read',
      category: 'frontend-code',
      categoryLabel: 'Frontend & Code',
      tags: ['PHP', 'Web Security', 'CVE-2026-109618', 'Backend Architecture'],
      featured: false,
      excerpt: 'Bedah tuntas krisis PHP2Shell, bagaimana celah RCE mesin PHP ditemukan, konsekuensinya bagi jutaan server, serta akar sejarah 30 tahun PHP.',
      contentUrl: 'blog/php2shell-dan-sejarah-php.html',
      coverImage: 'assets/blog/Ruina%E2%80%99s%20Neon%20Cybersecurity%20Crisis.webp',
      coverAlt: 'Ilustrasi Ruina panik di depan laptop saat krisis keamanan siber PHP2Shell melanda server web',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-7',
      slug: 'kenapa-pesan-error-cantik-membuat-pengguna-panik',
      title: 'Kenapa Pesan Error yang Terlihat Cantik Justru Membuat Pengguna Makin Panik',
      date: '2026-10-22',
      formattedDate: '22 Oktober 2026',
      readingTime: '5 min read',
      category: 'product-support',
      categoryLabel: 'Product & Support',
      tags: ['UX Writing', 'Error State', 'Product Support', 'Customer Experience'],
      featured: false,
      excerpt: 'Pesan error visual yang estetik sering gagal menenangkan pengguna. Pelajari cara merancang pesan kesalahan yang jelas, solutif, dan mengurangi tiket komplain.',
      contentUrl: 'blog/kenapa-pesan-error-cantik-membuat-pengguna-panik.html',
      coverImage: 'assets/blog/Overwhelmed%20by%20Error%20Messages.webp',
      coverAlt: 'Ilustrasi pengguna merasa kewalahan dan panik dikelilingi berbagai jendela pesan error pop-up di depan laptop',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-6',
      slug: 'memilih-karakter-visual-website-2026',
      title: 'Memilih Karakter Visual Website di Tahun 2026 Tanpa Terjebak Tren yang Cepat Usang',
      date: '2026-10-20',
      formattedDate: '20 Oktober 2026',
      readingTime: '6 min read',
      category: 'design-systems',
      categoryLabel: 'Design Systems',
      tags: ['Web Design 2026', 'Tactile UI', 'Bento Grid', 'Design Systems'],
      featured: true,
      excerpt: 'Pelajari arah gaya visual website terbaik di tahun 2026. Temukan cara memilih desain berkarakter kuat tanpa mengorbankan kecepatan akses dan kenyamanan baca.',
      contentUrl: 'blog/memilih-karakter-visual-website-2026.html',
      coverImage: 'assets/blog/cover-style-website-2026.webp',
      coverAlt: 'Ilustrasi studio desain editorial senja dengan tipografi Memilih Karakter Visual Website di Tahun 2026 Tanpa Terjebak Tren yang Cepat Usang, meja kerja desainer, buku web design, dan laptop berlatar pemandangan kota ungu',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-1',
      slug: 'membangun-sistem-desain-taktil',
      title: 'Membangun Sistem Desain Taktil: Dari Figma ke CSS Tokens',
      date: '2026-10-15',
      formattedDate: '15 Oktober 2026',
      readingTime: '6 min read',
      category: 'design-systems',
      categoryLabel: 'Design Systems',
      tags: ['CSS Tokens', 'Neumorphism', 'Design Tokens'],
      featured: false,
      excerpt: 'Bagaimana merancang efek tactile surface dan neumorphism yang tetap kontras, fungsional, dan memiliki hierarki tajam tanpa terjebak estetika artifisial berlebihan.',
      contentUrl: 'blog/membangun-sistem-desain-taktil.html',
      coverImage: 'assets/blog/cover-design-systems.svg',
      coverAlt: 'Diagram token sistem desain taktil dan swatch warna monokrom',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-2',
      slug: 'melihat-antarmuka-dari-kacamata-dukungan-pelanggan',
      title: 'Melihat Antarmuka dari Kacamata Dukungan Pelanggan',
      date: '2026-09-28',
      formattedDate: '28 September 2026',
      readingTime: '4 min read',
      category: 'product-support',
      categoryLabel: 'Product & Support',
      tags: ['UX', 'Support', 'Product Mindset'],
      featured: false,
      excerpt: 'Pelajaran berharga dari ribuan sesi troubleshooting teknis: antarmuka terbaik bukan yang paling banyak fitur animasi, melainkan yang tidak membingungkan pengguna saat mereka tertekan.',
      contentUrl: 'blog/melihat-antarmuka-dari-kacamata-dukungan-pelanggan.html',
      coverImage: 'assets/blog/cover-customer-support.svg',
      coverAlt: 'Ilustrasi bento tiket troubleshooting dan penyelesaian antarmuka UX',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-3',
      slug: 'mengapa-web-pribadi-perlu-kembali-ke-prinsip-sederhana',
      title: 'Mengapa Web Pribadi Perlu Kembali ke Prinsip Sederhana & Cepat',
      date: '2026-08-14',
      formattedDate: '14 Agustus 2026',
      readingTime: '6 min read',
      category: 'reflections',
      categoryLabel: 'Reflections',
      tags: ['IndieWeb', 'Web Performance', 'Minimalism'],
      featured: false,
      excerpt: 'Refleksi atas tren web modern yang semakin sarat dependensi berat. Mengapa HTML, CSS terukur, dan RSS feed kembali menjadi ruang digital paling menyenangkan untuk dirawat.',
      contentUrl: 'blog/mengapa-web-pribadi-perlu-kembali-ke-prinsip-sederhana.html',
      coverImage: 'assets/blog/cover-simple-web.webp',
      coverAlt: 'Ilustrasi studio kerja di teras pesisir yang cerah dengan laptop menampilkan kode HTML sederhana, kartu melayang HTML, CSS, Fast Instant Loading, RSS, dan tumpukan buku web development',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-4',
      slug: 'mikro-interaksi-taktil-pada-komponen-web',
      title: 'Mikro-Interaksi Taktil: Memberi Rasa Tekan pada Tombol Web',
      date: '2026-07-22',
      formattedDate: '22 Juli 2026',
      readingTime: '5 min read',
      category: 'frontend-code',
      categoryLabel: 'Frontend & Code',
      tags: ['CSS Motion', 'Transitions', 'Micro-interactions'],
      featured: false,
      excerpt: 'Eksperimen detail transisi cubic-bezier dan perubahan bayangan ganda untuk menghasilkan sensasi klik fisik yang lembut namun tegas pada elemen antarmuka.',
      contentUrl: 'blog/mikro-interaksi-taktil-pada-komponen-web.html',
      coverImage: 'assets/blog/cover-micro-interactions.svg',
      coverAlt: 'Diagram tiga status tombol: default, hover, dan pressed dengan kurva easing',
      author: 'I Putu Dicky Adi Pranatha'
    },
    {
      id: 'post-5',
      slug: 'eksplorasi-monokrom-kontras-tanpa-warna-dekoratif',
      title: 'Eksplorasi Monokrom: Menggali Kontras Tanpa Warna Dekoratif',
      date: '2026-06-10',
      formattedDate: '10 Juni 2026',
      readingTime: '4 min read',
      category: 'design-systems',
      categoryLabel: 'Design Systems',
      tags: ['Monochrome', 'Typography', 'Hierarchy'],
      featured: false,
      excerpt: 'Membatasi palet warna ke dua spektrum utama memaksa kita mengasah senjata paling fundamental dalam desain grafis: bobot tipografi, ritme spasi, dan kejelasan struktur.',
      contentUrl: 'blog/eksplorasi-monokrom-kontras-tanpa-warna-dekoratif.html',
      coverImage: 'assets/blog/cover-monochrome.svg',
      coverAlt: 'Studi dualitas kanvas terang dan gelap dengan rasio kontras 14 banding 1',
      author: 'I Putu Dicky Adi Pranatha'
    }
  ];

  // Expose to window / global scope
  root.BLOG_CATEGORIES = BLOG_CATEGORIES;
  root.BLOG_POSTS = BLOG_POSTS;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BLOG_CATEGORIES, BLOG_POSTS };
  }
})(typeof window !== 'undefined' ? window : this);
