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
