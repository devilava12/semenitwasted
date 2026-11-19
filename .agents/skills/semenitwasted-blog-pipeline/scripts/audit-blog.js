#!/usr/bin/env node
/**
 * Static Blog Auditor for semenitwasted (blog-article-writing + blog-curator + eli5)
 *
 * Mechanically verifies:
 * 1. Zero Em Dash ("—" / "&mdash;") in title, meta description, H1/H2/H3, and article prose
 * 2. Zero visual dividers (<hr>, ---) inside article.post-prose
 * 3. No forbidden chapter/closing headings (Pendahuluan, Kesimpulan, Penutup, Mengenal, Memahami)
 * 4. AI cliché phrases & naskah-id patterns + ELI5 minimizers in prose
 * 5. Technical SEO & JSON-LD @graph parity (https://semenitwasted.web.id/blog/<slug>, dates, images, internal links)
 * 6. Word count & Brysbaert 200 WPM reading time parity + blog-data.js sync
 *
 * Usage:
 *   node audit-blog.js blog/<slug>.html [blog/<slug2>.html ...] [--strict]
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
  return process.cwd();
}

function stripTags(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&bull;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function lineNumberAt(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (text.charCodeAt(i) === 10) line++;
  }
  return line;
}

const BANNED_AI_PHRASES = [
  { pattern: /\bdi era digital( ini)?\b/i, severity: 'FAIL', label: 'naskah-id cosmic opener ("di era digital")' },
  { pattern: /\btidak dapat dipungkiri\b/i, severity: 'FAIL', label: 'naskah-id cliché ("tidak dapat dipungkiri")' },
  { pattern: /\bmenyelami lebih dalam\b/i, severity: 'FAIL', label: 'AI cliché ("menyelami lebih dalam")' },
  { pattern: /\blanskap yang terus berkembang\b/i, severity: 'FAIL', label: 'AI cliché ("lanskap yang terus berkembang")' },
  { pattern: /\bmemainkan peran (penting|krusial)\b/i, severity: 'FAIL', label: 'AI cliché ("memainkan peran penting/krusial")' },
  { pattern: /\bmerupakan bukti nyata\b/i, severity: 'FAIL', label: 'AI cliché ("merupakan bukti nyata")' },
  { pattern: /\bmemanfaatkan potensi penuh\b/i, severity: 'FAIL', label: 'AI cliché ("memanfaatkan potensi penuh")' },
  { pattern: /\bpada bagian ini\b/i, severity: 'FAIL', label: 'AI transition ("pada bagian ini")' },
  { pattern: /\bbagian ini akan membahas\b/i, severity: 'FAIL', label: 'AI transition ("bagian ini akan membahas")' },
  { pattern: /\bdapat disimpulkan bahwa\b/i, severity: 'FAIL', label: 'AI closing cliché ("dapat disimpulkan bahwa")' },
  { pattern: /\bsolusi revolusioner\b/i, severity: 'FAIL', label: 'naskah-id inflated claim ("solusi revolusioner")' },
  { pattern: /\bdari hasil analisis menunjukkan\b/i, severity: 'WARN', label: 'naskah-id missing subject ("dari hasil analisis menunjukkan")' },
  { pattern: /\bseperti yang kita ketahui( bersama)?\b/i, severity: 'WARN', label: 'ELI5 minimizer ("seperti yang kita ketahui")' },
  { pattern: /\btentu saja sangat mudah\b/i, severity: 'WARN', label: 'ELI5 minimizer ("tentu saja sangat mudah")' },
  { pattern: /\btetikus\b/i, severity: 'WARN', label: 'Unfamiliar stiff translation ("tetikus" -> use "mouse")' },
  { pattern: /\bpapan ketik\b/i, severity: 'WARN', label: 'Unfamiliar stiff translation ("papan ketik" -> use "keyboard")' },
  { pattern: /\bperamban\b/i, severity: 'WARN', label: 'Unfamiliar stiff translation ("peramban" -> use "browser")' },
  { pattern: /\blokapasar\b/i, severity: 'WARN', label: 'Unfamiliar stiff translation ("lokapasar" -> use "marketplace")' },
  { pattern: /\bgalat\b/i, severity: 'WARN', label: 'Unfamiliar stiff translation ("galat" -> use "error")' },
  { pattern: /\bpranala\b/i, severity: 'WARN', label: 'Unfamiliar stiff translation ("pranala" -> use "link" or "tautan")' },
  { pattern: /\bjendela sembul\b/i, severity: 'WARN', label: 'Unfamiliar stiff translation ("jendela sembul" -> use "pop-up")' }
];

const FORBIDDEN_HEADING_RE = /^(pendahuluan|kesimpulan|penutup|conclusion|final thoughts|closing|mengenal\b|memahami\b)/i;

function extractProseRegion(html) {
  const openMatch = html.match(/<article\b[^>]*class=["'][^"']*post-prose[^"']*["'][^>]*>/i);
  if (!openMatch) return null;
  const startIdx = openMatch.index;
  const endIdx = html.indexOf('</article>', startIdx);
  if (endIdx === -1) return null;
  return {
    startIdx,
    endIdx: endIdx + '</article>'.length,
    startLine: lineNumberAt(html, startIdx),
    raw: html.slice(startIdx, endIdx + '</article>'.length)
  };
}

function auditBlogFile(filePath, root, blogPosts) {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');
  const slug = path.basename(filePath, '.html');
  const findings = [];

  // 1. Canonical URL check (blog-curator section 1)
  const expectedCanonical = `https://semenitwasted.web.id/blog/${slug}`;
  const canonicalMatch = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (!canonicalMatch) {
    findings.push({ severity: 'FAIL', rule: 'seo-canonical', location: rel, detail: 'Missing <link rel="canonical">.' });
  } else if (canonicalMatch[1] !== expectedCanonical) {
    findings.push({
      severity: 'FAIL',
      rule: 'seo-canonical-url',
      location: rel,
      detail: `Canonical "${canonicalMatch[1]}" does not match expected "${expectedCanonical}".`
    });
  }

  if (/semenitwasted\.(my\.id|com)\b/i.test(html)) {
    findings.push({
      severity: 'FAIL',
      rule: 'seo-wrong-domain',
      location: rel,
      detail: 'Found legacy/wrong domain (semenitwasted.my.id or .com). Always use https://semenitwasted.web.id.'
    });
  }

  // 2. Title & Meta Description checks
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? stripTags(titleMatch[1]) : '';
  if (!titleText) {
    findings.push({ severity: 'FAIL', rule: 'seo-title', location: rel, detail: 'Missing <title>.' });
  } else if (/—|&mdash;/i.test(titleMatch[1])) {
    findings.push({ severity: 'FAIL', rule: 'zero-em-dash-title', location: rel, detail: '<title> contains an em dash (— / &mdash;).' });
  }

  const descMatch = html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i)
    || html.match(/<meta\b[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
  const descText = descMatch ? descMatch[1].replace(/\s+/g, ' ').trim() : '';
  if (!descText) {
    findings.push({ severity: 'FAIL', rule: 'seo-meta-description', location: rel, detail: 'Missing <meta name="description">.' });
  } else if (/—|&mdash;/i.test(descText)) {
    findings.push({ severity: 'FAIL', rule: 'zero-em-dash-meta', location: rel, detail: 'Meta description contains an em dash (—).' });
  }

  // 3. Required DOM landmarks (blog-article-writing section 04.1)
  const requiredDom = [
    { re: /id=["']readingProgressBar["']/i, name: '#readingProgressBar' },
    { re: /\bdata-site-chrome\b/i, name: '[data-site-chrome]' },
    { re: /id=["']main-content["']/i, name: '#main-content' },
    { re: /class=["'][^"']*post-tldr-card[^"']*["']/i, name: '.post-tldr-card' },
    { re: /class=["'][^"']*post-prose[^"']*["']/i, name: 'article.post-prose' },
    { re: /class=["'][^"']*post-navigator[^"']*["']/i, name: 'nav.post-navigator' }
  ];
  for (const item of requiredDom) {
    if (!item.re.test(html)) {
      findings.push({ severity: 'FAIL', rule: 'dom-structure', location: rel, detail: `Missing required blog DOM component: ${item.name}.` });
    }
  }

  // 4. JSON-LD & Date synchronization (blog-curator sections 6 & 9)
  const ldMatches = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  let blogPostingNode = null;
  if (ldMatches.length === 0) {
    findings.push({ severity: 'FAIL', rule: 'schema-missing', location: rel, detail: 'Missing application/ld+json structured data.' });
  } else {
    for (const m of ldMatches) {
      try {
        const parsed = JSON.parse(m[1]);
        const graph = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
        for (const node of graph) {
          if (node && (node['@type'] === 'BlogPosting' || node['@type'] === 'Article')) {
            blogPostingNode = node;
          }
        }
      } catch (e) {
        findings.push({ severity: 'FAIL', rule: 'schema-invalid-json', location: rel, detail: `Invalid JSON-LD: ${e.message}` });
      }
    }
    if (!blogPostingNode) {
      findings.push({ severity: 'WARN', rule: 'schema-blogposting', location: rel, detail: 'No BlogPosting/Article node found in JSON-LD.' });
    }
  }

  const timeMatch = html.match(/<time\b[^>]*datetime=["']([^"']+)["']/i);
  const visibleIsoDate = timeMatch ? timeMatch[1].slice(0, 10) : null;
  if (!visibleIsoDate) {
    findings.push({ severity: 'WARN', rule: 'date-time-tag', location: rel, detail: 'Missing <time datetime="YYYY-MM-DD"> in post header.' });
  } else if (blogPostingNode && blogPostingNode.datePublished) {
    const schemaDate = String(blogPostingNode.datePublished).slice(0, 10);
    if (schemaDate !== visibleIsoDate) {
      findings.push({
        severity: 'FAIL',
        rule: 'date-mismatch',
        location: rel,
        detail: `Visible <time datetime="${visibleIsoDate}"> does not match JSON-LD datePublished "${schemaDate}".`
      });
    }
  }

  // 5. Heading hierarchy & forbidden headings & em-dash in headings
  const headingRe = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let hm;
  let h1Count = 0;
  let prevLevel = 0;
  while ((hm = headingRe.exec(html)) !== null) {
    const level = Number(hm[1].slice(1));
    const rawHeading = hm[2];
    const cleanHeading = stripTags(rawHeading);
    const lineNo = lineNumberAt(html, hm.index);

    if (level === 1) h1Count++;
    if (prevLevel > 0 && level > prevLevel + 1) {
      findings.push({
        severity: 'FAIL',
        rule: 'heading-hierarchy-skip',
        location: `${rel}:${lineNo}`,
        detail: `Skipped heading level from <h${prevLevel}> to <h${level}> ("${cleanHeading}").`
      });
    }
    prevLevel = level;

    if (/—|&mdash;/i.test(rawHeading)) {
      findings.push({
        severity: 'FAIL',
        rule: 'zero-em-dash-heading',
        location: `${rel}:${lineNo}`,
        detail: `Heading <h${level}> contains an em dash ("${cleanHeading}").`
      });
    }

    if (level >= 2 && FORBIDDEN_HEADING_RE.test(cleanHeading)) {
      findings.push({
        severity: 'FAIL',
        rule: 'forbidden-cliche-heading',
        location: `${rel}:${lineNo}`,
        detail: `Heading <h${level}> uses forbidden cliché label ("${cleanHeading}").`
      });
    }
  }
  if (h1Count !== 1) {
    findings.push({ severity: 'FAIL', rule: 'single-h1', location: rel, detail: `Expected 1 <h1>, found ${h1Count}.` });
  }

  // 6. Prose audit (Zero Em Dash, Zero <hr>/---, AI phrases, ELI5 minimizers, word count & reading time)
  const prose = extractProseRegion(html);
  if (prose) {
    // Exclude AUTO_TOC block from prose text checks
    const proseWithoutToc = prose.raw.replace(/<!-- AUTO_TOC_START -->[\s\S]*?<!-- AUTO_TOC_END -->/gi, (m) => m.replace(/[^\n]/g, ' '));
    const proseLines = proseWithoutToc.split(/\r?\n/);

    proseLines.forEach((line, idx) => {
      const absLine = prose.startLine + idx;
      const lineNoCode = line.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi, '');

      if (/—|&mdash;/i.test(lineNoCode)) {
        findings.push({
          severity: 'FAIL',
          rule: 'zero-em-dash-prose',
          location: `${rel}:${absLine}`,
          detail: 'Em dash (— or &mdash;) found inside article.post-prose (violates blog-article-writing & eli5).'
        });
      }

      if (/<hr\b/i.test(line) || /^\s*(---|___|===)\s*$/.test(stripTags(line))) {
        findings.push({
          severity: 'FAIL',
          rule: 'zero-visual-dividers',
          location: `${rel}:${absLine}`,
          detail: 'Visual divider (<hr> or ---) found inside article.post-prose.'
        });
      }

      const plainLine = stripTags(lineNoCode);
      for (const item of BANNED_AI_PHRASES) {
        if (item.pattern.test(plainLine)) {
          findings.push({
            severity: item.severity,
            rule: 'anti-ai-tell',
            location: `${rel}:${absLine}`,
            detail: `Detected ${item.label}.`
          });
        }
      }
    });

    // Word count & Brysbaert 200 WPM reading time check
    const plainProse = stripTags(proseWithoutToc);
    const wordCount = plainProse ? plainProse.split(/\s+/).filter(Boolean).length : 0;
    const codeAndTableCount = ((proseWithoutToc.match(/<(pre|table)\b/gi) || []).length);
    const expectedMinutes = Math.max(1, Math.ceil(wordCount / 200)) + (codeAndTableCount > 3 ? 1 : 0);

    const readTimeMatch = html.match(/(\d+)\s+min\s+read/i);
    if (readTimeMatch) {
      const shownMin = Number(readTimeMatch[1]);
      if (Math.abs(shownMin - expectedMinutes) > 4) {
        findings.push({
          severity: 'WARN',
          rule: 'brysbaert-reading-time',
          location: rel,
          detail: `Displayed "${shownMin} min read" diverges from Brysbaert 200 WPM estimate (~${expectedMinutes} min for ${wordCount} words).`
        });
      }
    }
  }

  // 7. Image accessibility & CLS check (width, height, alt)
  const imgRe = /<img\b[^>]*>/gi;
  let im;
  while ((im = imgRe.exec(html)) !== null) {
    const tag = im[0];
    const lineNo = lineNumberAt(html, im.index);
    if (!/\balt\s*=/i.test(tag)) {
      findings.push({ severity: 'FAIL', rule: 'img-alt', location: `${rel}:${lineNo}`, detail: '<img> missing alt attribute.' });
    }
    if (!/\bwidth\s*=/i.test(tag) || !/\bheight\s*=/i.test(tag)) {
      findings.push({ severity: 'WARN', rule: 'img-dimensions-cls', location: `${rel}:${lineNo}`, detail: '<img> missing explicit width/height attributes (CLS prevention).' });
    }
  }

  // 8. Internal link integrity (Zero 404s)
  const linkRe = /<a\b[^>]*href=["']([^"'#]+)["'][^>]*>/gi;
  let lm;
  while ((lm = linkRe.exec(html)) !== null) {
    const href = lm[1].trim();
    const lineNo = lineNumberAt(html, lm.index);
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;

    let targetPath;
    if (href.startsWith('/')) {
      const cleanRel = href.replace(/^\//, '') || 'index.html';
      targetPath = path.join(root, cleanRel.endsWith('.html') ? cleanRel : `${cleanRel}.html`);
    } else {
      targetPath = path.resolve(path.dirname(filePath), href);
    }

    if (!fs.existsSync(targetPath) && !fs.existsSync(path.join(root, href.replace(/^\//, '')))) {
      findings.push({
        severity: 'FAIL',
        rule: 'broken-internal-link',
        location: `${rel}:${lineNo}`,
        detail: `Internal link href="${href}" points to missing file.`
      });
    }
  }

  // 9. blog-data.js registration sync
  const postEntry = blogPosts.find((p) => p && p.slug === slug);
  if (!postEntry) {
    findings.push({
      severity: 'FAIL',
      rule: 'blog-data-registration',
      location: rel,
      detail: `Slug "${slug}" is not registered in blog-data.js.`
    });
  } else {
    if (visibleIsoDate && postEntry.date !== visibleIsoDate) {
      findings.push({
        severity: 'FAIL',
        rule: 'blog-data-date-sync',
        location: rel,
        detail: `blog-data.js date ("${postEntry.date}") differs from HTML <time datetime="${visibleIsoDate}">.`
      });
    }
  }

  return findings;
}

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const scanAll = args.includes('--all');
  let files = args.filter((a) => !a.startsWith('--'));

  const root = findRepoRoot();
  const { BLOG_POSTS = [] } = fs.existsSync(path.join(root, 'blog-data.js'))
    ? require(path.join(root, 'blog-data.js'))
    : { BLOG_POSTS: [] };

  if (scanAll) {
    const blogDir = path.join(root, 'blog');
    files = fs.readdirSync(blogDir)
      .filter((f) => f.endsWith('.html') && f !== 'coming-soon.html')
      .map((f) => path.join(blogDir, f));
  }

  if (files.length === 0) {
    console.error('Usage: node audit-blog.js blog/<slug>.html [...] [--all] [--strict]');
    process.exit(1);
  }

  console.log('# semenitwasted Blog Editorial, ELI5 & Technical SEO Audit\n');

  let totalFail = 0;
  let totalWarn = 0;

  for (const rawFile of files) {
    const filePath = path.resolve(rawFile);
    if (!fs.existsSync(filePath)) {
      console.error(`[ERROR] File not found: ${rawFile}`);
      totalFail++;
      continue;
    }

    const rel = path.relative(root, filePath).replace(/\\/g, '/');
    const findings = auditBlogFile(filePath, root, BLOG_POSTS);
    const fails = findings.filter((f) => f.severity === 'FAIL');
    const warns = findings.filter((f) => f.severity === 'WARN');
    totalFail += fails.length;
    totalWarn += warns.length;

    if (findings.length === 0) {
      console.log(`- ✅ **${rel}**: PASS (0 issues)`);
    } else {
      console.log(`- **${rel}**: ${fails.length} FAIL, ${warns.length} WARN`);
      for (const f of findings) {
        const icon = f.severity === 'FAIL' ? '❌' : '⚠️';
        console.log(`  - ${icon} \`[${f.severity}]\` (${f.rule}) **${f.location}** — ${f.detail}`);
      }
    }
  }

  console.log(`\nSummary: ${totalFail} FAIL, ${totalWarn} WARN.`);
  if (totalFail > 0 || (strict && totalWarn > 0)) {
    process.exitCode = 1;
  }
}

main();
