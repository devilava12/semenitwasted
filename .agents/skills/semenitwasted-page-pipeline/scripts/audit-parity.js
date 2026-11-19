#!/usr/bin/env node
/**
 * Static Library Parity Auditor for semenitwasted pages.
 *
 * Reads canonical easing & motion rules LIVE from library.html and scans target
 * HTML/CSS files for motion drift, token conflicts, accessibility gaps, and
 * vibe-coding-guardrails regressions.
 *
 * Usage:
 *   node audit-parity.js <file1> [file2 ...] [--strict]
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
  return process.cwd();
}

function readCanonicalMotionFromLibrary(root) {
  const libPath = path.join(root, 'library.html');
  const fallback = {
    easeOut: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    durations: ['150ms', '200ms', '400ms', '500ms']
  };
  if (!fs.existsSync(libPath)) return fallback;

  const html = fs.readFileSync(libPath, 'utf8');
  const easeMatch = html.match(/--ease-out:\s*(cubic-bezier\([^)]+\))/);
  const durMatches = [...html.matchAll(/--dur-[a-z]+:\s*(\d+ms)/g)].map((m) => m[1]);
  return {
    easeOut: easeMatch ? normalizeSpaces(easeMatch[1]) : fallback.easeOut,
    durations: durMatches.length > 0 ? [...new Set(durMatches)] : fallback.durations
  };
}

function normalizeSpaces(str) {
  return String(str || '')
    .replace(/\s+/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/(^|[(\s,])\.(\d)/g, '$10.$2')
    .trim();
}

function stripCssComments(css) {
  // Preserve line count by replacing comment contents with newlines where present
  return css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

function auditCssText(label, rawCss, canonical) {
  const findings = [];
  const css = stripCssComments(rawCss);
  const lines = css.split(/\r?\n/);

  let hasTransitionOrAnim = false;
  let hasHoverMotion = false;
  let inHoverBlock = false;
  let braceBalance = 0;

  lines.forEach((line, idx) => {
    const lineNo = idx + 1;

    if (/\b(transition|animation)\s*:/.test(line)) {
      hasTransitionOrAnim = true;
    }

    // 1. Check rogue cubic-bezier curves not matching library.html --ease-out
    const bezierMatches = [...line.matchAll(/cubic-bezier\([^)]+\)/g)];
    for (const bm of bezierMatches) {
      const normalized = normalizeSpaces(bm[0]);
      if (normalized !== canonical.easeOut) {
        findings.push({
          severity: 'FAIL',
          rule: 'motion-easing-parity',
          location: `${label}:${lineNo}`,
          detail: `Off-library cubic-bezier "${normalized}". Expected canonical library.html --ease-out ("${canonical.easeOut}") or var(--ease-out).`
        });
      }
    }

    // 2. Check transition: all (performance & accidental layout transition risk)
    if (/transition\s*:\s*all\b/i.test(line)) {
      findings.push({
        severity: 'WARN',
        rule: 'motion-no-transition-all',
        location: `${label}:${lineNo}`,
        detail: 'Avoid "transition: all". Explicitly transition compositor/visual properties (transform, box-shadow, opacity, border-color).'
      });
    }

    // 3. Check layout-thrashing properties inside transition
    const transMatch = line.match(/transition(?:-property)?\s*:\s*([^;]+)/i);
    if (transMatch) {
      const val = transMatch[1];
      const badProps = ['width', 'height', 'margin', 'padding', 'top', 'left', 'right', 'bottom', 'font-size'];
      for (const prop of badProps) {
        if (new RegExp(`(^|[,\\s])${prop}(\\s|,|$)`, 'i').test(val)) {
          findings.push({
            severity: 'WARN',
            rule: 'motion-compositor-only',
            location: `${label}:${lineNo}`,
            detail: `Transition touches layout property "${prop}". Prefer GPU-composited transform/opacity unless intentional (e.g. nav underline/progress bar).`
          });
        }
      }
      if (/\b(ease-in-out|ease-in)\b/i.test(val)) {
        findings.push({
          severity: 'WARN',
          rule: 'motion-easing-consistency',
          location: `${label}:${lineNo}`,
          detail: 'Uses "ease-in-out"/"ease-in" instead of var(--ease-out) from library.html.'
        });
      }
    }

    // Track hover blocks modifying transform/box-shadow
    if (/:hover\b/.test(line)) {
      inHoverBlock = true;
      braceBalance = 0;
    }
    if (inHoverBlock) {
      for (const ch of line) {
        if (ch === '{') braceBalance++;
        else if (ch === '}') braceBalance--;
      }
      if (/\b(transform|box-shadow)\s*:/.test(line)) {
        hasHoverMotion = true;
      }
      if (braceBalance <= 0 && line.includes('}')) {
        inHoverBlock = false;
      }
    }
  });

  // 4. Global CSS structural checks
  if (hasTransitionOrAnim && !/@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/i.test(css)) {
    findings.push({
      severity: 'FAIL',
      rule: 'a11y-reduced-motion',
      location: label,
      detail: 'Missing @media (prefers-reduced-motion: reduce) fallback required by library.html (#tokens & #motion).'
    });
  }

  if (hasHoverMotion && !/@media\s*\([^)]*hover\s*:\s*hover[^)]*\)/i.test(css)) {
    findings.push({
      severity: 'WARN',
      rule: 'touch-hover-guard',
      location: label,
      detail: 'Hover transform/shadow found without @media (hover: hover) and (pointer: fine) guard (see library.html #cmp-buttons & animation.md).'
    });
  }

  if (!/:focus-visible\b/.test(css)) {
    findings.push({
      severity: 'WARN',
      rule: 'a11y-focus-visible',
      location: label,
      detail: 'No :focus-visible rule detected in stylesheet (verify focus ring parity with library.html #anim-focus-indicator).'
    });
  }

  if (!/\[data-theme=["']dark["']\]/.test(css)) {
    findings.push({
      severity: 'WARN',
      rule: 'dark-theme-parity',
      location: label,
      detail: 'No [data-theme="dark"] overrides detected (verify dark mode parity with library.css & site-chrome.js).'
    });
  }

  return findings;
}

function auditHtmlText(label, html, canonical) {
  const findings = [];

  if (!/<html[^>]+lang=["'][^"']+["']/i.test(html)) {
    findings.push({ severity: 'FAIL', rule: 'html-lang', location: label, detail: 'Missing <html lang="...">.' });
  }

  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const headText = headMatch ? headMatch[1] : html;
  const titleCount = (headText.match(/<title[\s>]/gi) || []).length;
  if (titleCount !== 1) {
    findings.push({ severity: 'FAIL', rule: 'seo-title', location: label, detail: `Expected 1 <title> in <head>, found ${titleCount}.` });
  }

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) {
    findings.push({ severity: 'FAIL', rule: 'a11y-single-h1', location: label, detail: `Expected 1 <h1>, found ${h1Count}.` });
  }

  if (!/id=["']main-content["']/i.test(html)) {
    findings.push({ severity: 'WARN', rule: 'guardrail-main-content', location: label, detail: 'Missing id="main-content" semantic landmark (vibe-coding-guardrails).' });
  }

  if (!/site-chrome\.js/i.test(html)) {
    findings.push({ severity: 'WARN', rule: 'guardrail-site-chrome', location: label, detail: 'Page does not include site-chrome.js (verify whether shared navbar/theme is intended).' });
  }

  const deadHrefMatches = [...html.matchAll(/<a\b[^>]*href=["'](#|\s*)["'][^>]*>/gi)];
  if (deadHrefMatches.length > 0) {
    findings.push({
      severity: 'WARN',
      rule: 'guardrail-zero-dead-links',
      location: label,
      detail: `Found ${deadHrefMatches.length} anchor(s) with empty or "#" href. Verify zero dead links (vibe-coding-guardrails).`
    });
  }

  // Audit inline <style> blocks too
  const styleRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let sm;
  let blockIndex = 0;
  while ((sm = styleRe.exec(html)) !== null) {
    blockIndex++;
    findings.push(...auditCssText(`${label}[style#${blockIndex}]`, sm[1], canonical));
  }

  return findings;
}

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const files = args.filter((a) => !a.startsWith('--'));

  if (files.length === 0) {
    console.error('Usage: node audit-parity.js <file1> [file2 ...] [--strict]');
    process.exit(1);
  }

  const root = findRepoRoot();
  const canonical = readCanonicalMotionFromLibrary(root);

  console.log(`# Library Parity Static Audit`);
  console.log(`Canonical easing from library.html: \`${canonical.easeOut}\` | Durations: ${canonical.durations.join(', ')}\n`);

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
    const content = fs.readFileSync(filePath, 'utf8');
    const ext = path.extname(filePath).toLowerCase();

    let findings = [];
    if (ext === '.css') {
      findings = auditCssText(rel, content, canonical);
    } else if (ext === '.html' || ext === '.htm') {
      findings = auditHtmlText(rel, content, canonical);
    } else {
      console.log(`- **${rel}**: skipped (unsupported extension ${ext})`);
      continue;
    }

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
