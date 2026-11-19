#!/usr/bin/env node
/**
 * Live Blog Context & SSOT Extractor for semenitwasted (blog-data.js + blog/*.html)
 *
 * Usage:
 *   node extract-blog-context.js --index
 *   node extract-blog-context.js --template
 */

'use strict';

const fs = require('fs');
const path = require('path');

function findRepoRoot() {
  const candidates = [
    process.cwd(),
    path.resolve(__dirname, '../../../..'),
    path.resolve(__dirname, '../../..')
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'blog-data.js'))) {
      return dir;
    }
  }
  console.error('[ERROR] Could not locate blog-data.js from cwd or skill path.');
  process.exit(1);
}

function main() {
  const args = process.argv.slice(2);
  const root = findRepoRoot();
  const { BLOG_CATEGORIES = [], BLOG_POSTS = [] } = require(path.join(root, 'blog-data.js'));

  const published = BLOG_POSTS.filter((p) => p && p.slug && p.slug !== 'coming-soon');
  const maxIdNum = BLOG_POSTS.reduce((max, p) => {
    const m = String(p.id || '').match(/^post-(\d+)$/);
    return m ? Math.max(max, Number(m[1])) : max;
  }, 0);

  if (args.length === 0 || args.includes('--index')) {
    console.log('# semenitwasted Live Blog Repository Index (`blog-data.js`)\n');
    console.log(`- **Canonical Domain:** \`https://semenitwasted.web.id\``);
    console.log(`- **Next Post ID:** \`post-${maxIdNum + 1}\``);
    console.log(`- **Categories:** ${BLOG_CATEGORIES.map((c) => `\`${c.id}\` (${c.label})`).join(', ')}`);
    console.log(`- **Published Articles:** ${published.length}\n`);

    console.log('| ID | Date | Category | Reading Time | Slug (`blog/<slug>.html`) | Title |');
    console.log('|---|---|---|---|---|---|');
    for (const p of published) {
      console.log(`| \`${p.id}\` | ${p.date} | \`${p.category}\` | ${p.readingTime} | \`${p.slug}\` | ${String(p.title).replace(/\|/g, '/')} |`);
    }
    console.log('');
  }

  if (args.includes('--template')) {
    const latest = published[0];
    console.log('# Canonical HTML & Schema Blueprint (`blog/*.html`)\n');
    console.log(`Reference template file: \`${latest ? latest.contentUrl : 'blog/ssh-adalah-cara-kerja-dan-kisah-celah-xz-utils.html'}\`\n`);
    console.log('## Required DOM & Metadata Structure');
    console.log('1. `<html lang="id">`');
    console.log('2. `<head>`:');
    console.log('   - `<title>[Judul SEO] | semenitwasted</title>` (0 em dash)');
    console.log('   - `<meta name="description" content="...">` (140-160 chars, matches `blog-data.js` excerpt)');
    console.log('   - `<link rel="canonical" href="https://semenitwasted.web.id/blog/<slug>">` (no `.html`, always `.web.id`)');
    console.log('   - Open Graph & Twitter card meta (`og:type="article"`, `og:url`, `og:title`, `og:description`, `og:image`)');
    console.log('   - `<script type="application/ld+json">` with `@graph`: `WebSite`, `Organization`, `Person`, `WebPage`, `BlogPosting` (`headline`, `description`, `image`, `datePublished`, `dateModified`, `articleSection`, `keywords`, `wordCount`, `timeRequired`, `author`, `citation`), `BreadcrumbList`');
    console.log('   - Stylesheets: `../assets/fonts/rubik.css`, `../portfolio.css`, `../blog.css` + `<script src="../site-chrome.js"></script>`');
    console.log('3. `<body>`:');
    console.log('   - `<div class="reading-progress-bar" id="readingProgressBar" aria-hidden="true"></div>`');
    console.log('   - `<div class="portfolio-page-wrapper blog-page-wrapper">`');
    console.log('   - `<div data-site-chrome data-active-page="blog" data-base-path="../"></div>`');
    console.log('   - `<main class="post-main" id="main-content">`');
    console.log('     - `<nav class="post-breadcrumb" aria-label="Breadcrumbs">`');
    console.log('     - `<header class="post-header">` (`<h1 class="post-title">`, `.post-meta-row` with `<time datetime="YYYY-MM-DD">`, `X min read`, `.category-pill-sm`)');
    console.log('     - `<figure class="post-hero-figure">` (`img.post-hero-img` with explicit `width`, `height`, `alt`, `loading="eager"`, `fetchpriority="high"`)');
    console.log('     - Optional attribution `.post-tldr-card` (if inspired by video/podcast/paper)');
    console.log('     - `<div class="post-tldr-card" role="region" aria-label="Quick Summary">` (2-3 bullet summary)');
    console.log('     - `<article class="post-prose">` (Intro with BLUF directly at top -> `<h2>`/`<h3>` sections -> `<h2 id="referensi">Referensi</h2>`; `build.js` auto-injects `AUTO_TOC` before first `<h2>`)');
    console.log('     - `<!-- AUTO_RELATED_START --> ... <!-- AUTO_RELATED_END -->` (auto-managed by `node build.js`)');
    console.log('     - `<nav class="post-navigator" aria-label="Article navigation">` (prev & related `.post-nav-card` links)');
    console.log('   - `<footer class="portfolio-footer">` + reading progress scroll script');
  }
}

main();
