#!/usr/bin/env node
/**
 * Live SSOT Extractor for semenitwasted library.html & library.css
 *
 * Reads library.html (#motion, #tokens, #components) and library.css ([data-theme="dark"])
 * directly at runtime so sub-agents always extract live values without stale caches.
 *
 * Usage:
 *   node extract-library-spec.js --index
 *   node extract-library-spec.js --master
 *   node extract-library-spec.js --section motion|tokens|components
 *   node extract-library-spec.js --ids token-master-export,anim-tactile-lift,cmp-buttons
 *   node extract-library-spec.js --dark-tokens
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
    if (fs.existsSync(path.join(dir, 'library.html'))) {
      return dir;
    }
  }
  console.error('[ERROR] Could not locate library.html from cwd or skill path.');
  process.exit(1);
}

function decodeHtmlEntities(str) {
  return String(str || '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rarr;/g, '->')
    .replace(/&larr;/g, '<-')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&middot;/g, '·')
    .replace(/&times;/g, '×')
    .replace(/&ge;/g, '>=')
    .replace(/&le;/g, '<=')
    .replace(/&nbsp;/g, ' ');
}

function stripTags(str) {
  return decodeHtmlEntities(String(str || '').replace(/<[^>]+>/g, ' '))
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

function extractSections(html) {
  const sectionDefs = [
    { key: 'motion', id: 'animationCatalog', anchor: '#motion' },
    { key: 'tokens', id: 'tokensCatalog', anchor: '#tokens' },
    { key: 'components', id: 'componentsCatalog', anchor: '#components' }
  ];

  const found = sectionDefs.map((def) => {
    const idx = html.indexOf(`id="${def.id}"`);
    return { ...def, start: idx };
  }).filter((s) => s.start !== -1).sort((a, b) => a.start - b.start);

  return found.map((sec, i) => ({
    ...sec,
    end: i + 1 < found.length ? found[i + 1].start : html.length
  }));
}

function extractArticles(html, sections) {
  const articles = [];
  const openTagRe = /<article\b[^>]*class="[^"]*bento-anim-card[^"]*"[^>]*>/g;
  let match;

  while ((match = openTagRe.exec(html)) !== null) {
    const startIdx = match.index;
    const openTag = match[0];

    // Depth-aware scan for matching </article>
    let depth = 1;
    let cursor = startIdx + openTag.length;
    const tagRe = /<\/?article\b[^>]*>/g;
    tagRe.lastIndex = cursor;
    let endIdx = html.length;
    let innerMatch;
    while ((innerMatch = tagRe.exec(html)) !== null) {
      if (innerMatch[0].startsWith('</')) {
        depth--;
        if (depth === 0) {
          endIdx = innerMatch.index + innerMatch[0].length;
          break;
        }
      } else {
        depth++;
      }
    }

    const block = html.slice(startIdx, endIdx);
    const id = (openTag.match(/\bid="([^"]+)"/) || [])[1] || 'unknown';
    const category = (openTag.match(/\bdata-category="([^"]+)"/) || [])[1] || '';

    const sec = sections.find((s) => startIdx >= s.start && startIdx < s.end);
    const sectionKey = sec ? sec.key : 'other';
    const anchor = sec ? sec.anchor : '';

    const titleMatch = block.match(/<h2[^>]*class="[^"]*anim-title[^"]*"[^>]*>([\s\S]*?)<\/h2>/);
    const title = titleMatch ? stripTags(titleMatch[1]) : id;

    const descMatch = block.match(/<p[^>]*class="[^"]*anim-desc[^"]*"[^>]*>([\s\S]*?)<\/p>/);
    const desc = descMatch ? stripTags(descMatch[1]) : '';

    const metaTag = ((block.match(/<span[^>]*class="[^"]*meta-tag[^"]*"[^>]*>([\s\S]*?)<\/span>/) || [])[1]);
    const timingBadge = ((block.match(/<span[^>]*class="[^"]*timing-badge[^"]*"[^>]*>([\s\S]*?)<\/span>/) || [])[1]);

    const specs = [];
    const specRe = /<div[^>]*class="[^"]*spec-item[^"]*"[^>]*>[\s\S]*?<span[^>]*class="[^"]*spec-label[^"]*"[^>]*>([\s\S]*?)<\/span>[\s\S]*?<span[^>]*class="[^"]*spec-value[^"]*"[^>]*>([\s\S]*?)<\/span>[\s\S]*?<\/div>/g;
    let sm;
    while ((sm = specRe.exec(block)) !== null) {
      specs.push({ label: stripTags(sm[1]), value: stripTags(sm[2]) });
    }

    const snippets = [];
    const codeRe = /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/g;
    let cm;
    while ((cm = codeRe.exec(block)) !== null) {
      snippets.push(decodeHtmlEntities(cm[1]).trim());
    }

    articles.push({
      id,
      section: sectionKey,
      anchor,
      category,
      title,
      metaTag: metaTag ? stripTags(metaTag) : '',
      timingBadge: timingBadge ? stripTags(timingBadge) : '',
      desc,
      specs,
      snippets,
      startLine: lineNumberAt(html, startIdx),
      endLine: lineNumberAt(html, endIdx)
    });
  }

  return articles;
}

function extractDarkThemeBlock(css) {
  const idx = css.indexOf('[data-theme="dark"] {');
  if (idx === -1) return null;
  let depth = 0;
  let end = idx;
  for (let i = idx; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return {
    startLine: lineNumberAt(css, idx),
    endLine: lineNumberAt(css, end),
    code: css.slice(idx, end).trim()
  };
}

function printIndex(articles) {
  console.log('# semenitwasted Library SSOT Index (`library.html`)\n');
  for (const secKey of ['motion', 'tokens', 'components']) {
    const items = articles.filter((a) => a.section === secKey);
    const label = secKey === 'motion'
      ? 'Motion & Animation (`#motion`)'
      : secKey === 'tokens'
        ? 'Design Tokens (`#tokens`)'
        : 'Components & UI (`#components`)';
    console.log(`## ${label} — ${items.length} items\n`);
    console.log('| ID | Category | Title | Timing / Scope | Key Specs | Lines |');
    console.log('|---|---|---|---|---|---|');
    for (const a of items) {
      const specSummary = a.specs.map((s) => `${s.label}: ${s.value}`).join('; ') || '—';
      console.log(`| \`${a.id}\` | ${a.category} | ${a.title} | ${a.timingBadge || '—'} | ${specSummary.replace(/\|/g, '/')} | L${a.startLine}-L${a.endLine} |`);
    }
    console.log('');
  }
}

function printArticles(items) {
  for (const a of items) {
    console.log(`### \`${a.id}\` — ${a.title} (\`library.html#L${a.startLine}-L${a.endLine}\`)`);
    console.log(`- **Section:** \`${a.anchor}\` (${a.category}) | **Tag:** ${a.metaTag || '—'} | **Badge:** ${a.timingBadge || '—'}`);
    if (a.desc) console.log(`- **Summary:** ${a.desc}`);
    if (a.specs.length > 0) {
      console.log(`- **Specs:** ${a.specs.map((s) => `**${s.label}:** \`${s.value}\``).join(' · ')}`);
    }
    if (a.snippets.length > 0) {
      for (const code of a.snippets) {
        console.log('\n```css');
        console.log(code);
        console.log('```\n');
      }
    } else {
      console.log('- **Snippets:** _(none in HTML; inspect `library.css` / `library.js` for live rules)_\n');
    }
  }
}

function printDarkTokens(darkBlock) {
  if (!darkBlock) {
    console.log('_(No `[data-theme="dark"]` root block found in `library.css`)_');
    return;
  }
  console.log(`### Dark Theme Root Tokens (\`library.css#L${darkBlock.startLine}-L${darkBlock.endLine}\`)\n`);
  console.log('```css');
  console.log(darkBlock.code);
  console.log('```\n');
}

function main() {
  const args = process.argv.slice(2);
  const root = findRepoRoot();
  const libraryHtml = fs.readFileSync(path.join(root, 'library.html'), 'utf8');
  const libraryCssPath = path.join(root, 'library.css');
  const libraryCss = fs.existsSync(libraryCssPath) ? fs.readFileSync(libraryCssPath, 'utf8') : '';

  const sections = extractSections(libraryHtml);
  const articles = extractArticles(libraryHtml, sections);
  const darkBlock = extractDarkThemeBlock(libraryCss);

  if (args.length === 0 || args.includes('--index')) {
    printIndex(articles);
    return;
  }

  if (args.includes('--master')) {
    const master = articles.filter((a) => a.id === 'token-master-export');
    printArticles(master);
    printDarkTokens(darkBlock);
    return;
  }

  if (args.includes('--dark-tokens')) {
    printDarkTokens(darkBlock);
  }

  const secIdx = args.indexOf('--section');
  if (secIdx !== -1 && args[secIdx + 1]) {
    const secKey = args[secIdx + 1].toLowerCase().replace(/^#/, '');
    const items = articles.filter((a) => a.section === secKey);
    if (items.length === 0) {
      console.error(`[ERROR] Unknown section "${secKey}". Use: motion, tokens, or components.`);
      process.exit(1);
    }
    printArticles(items);
  }

  const idsIdx = args.indexOf('--ids');
  if (idsIdx !== -1 && args[idsIdx + 1]) {
    const requested = args[idsIdx + 1].split(',').map((s) => s.trim().replace(/^#/, '')).filter(Boolean);
    const matched = [];
    const missing = [];
    for (const reqId of requested) {
      const exact = articles.find((a) => a.id === reqId);
      if (exact) {
        matched.push(exact);
      } else {
        missing.push(reqId);
      }
    }
    if (matched.length > 0) printArticles(matched);
    if (missing.length > 0) {
      console.error(`[WARN] Unmatched library IDs: ${missing.join(', ')}`);
      process.exitCode = 1;
    }
  }
}

main();
