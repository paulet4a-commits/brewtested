#!/usr/bin/env node
/**
 * AI Answer Engine Readiness Audit
 * Checks top money pages for signals that improve AI citability:
 * QuickVerdict, evidence base, methodology link, ProductCard, schema, etc.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '../src/content/posts');
const PAGES_DIR = join(__dirname, '../src/pages');

const ESPRESSO_SLUGS = [
  'gaggia-classic-pro-vs-breville-bambino-plus.mdx',
  'best-grinder-for-breville-bambino-plus.mdx',
  'baratza-encore-esp-vs-sette-270.mdx',
  'best-espresso-grinder-under-300.mdx',
  'best-home-espresso-setup-beginners.mdx',
  'best-grinder-for-gaggia-classic-pro.mdx',
  'best-espresso-machine-under-300.mdx',
  'breville-barista-express-vs-bambino-plus.mdx',
  'best-automatic-espresso-machine.mdx',
  'best-espresso-grinder-under-200.mdx',
];

const CHECKS = [
  {
    id: 'quick-verdict',
    label: 'QuickVerdict component',
    test: (content) => content.includes('<QuickVerdict'),
  },
  {
    id: 'evidence-base',
    label: 'Evidence base (source types)',
    test: (content) =>
      /amazon verified|r\/espresso|home-barista|reddit/i.test(content),
  },
  {
    id: 'methodology-link',
    label: 'Methodology link',
    test: (content) => content.includes('/methodology/'),
  },
  {
    id: 'product-card',
    label: 'ProductCard component',
    test: (content) => content.includes('<ProductCard'),
  },
  {
    id: 'affiliate-disclosure',
    label: 'Affiliate disclosure',
    test: (content) =>
      content.includes('affiliateDisclosure: true') ||
      content.includes('Amazon Associate'),
  },
  {
    id: 'pub-date',
    label: 'pubDate in frontmatter',
    test: (content) => /pubDate:\s*\d{4}-\d{2}-\d{2}/.test(content),
  },
  {
    id: 'description',
    label: 'Description in frontmatter',
    test: (content) => /description:\s*".{20,}"/.test(content),
  },
  {
    id: 'internal-links',
    label: 'Internal links (href="/ or href: "/)',
    test: (content) => (content.match(/href[=:]\s*["']\/[^"']+["']/g) || []).length >= 2,
  },
];

function auditFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const slug = basename(filePath);
  const results = CHECKS.map((check) => ({
    id: check.id,
    label: check.label,
    pass: check.test(content),
  }));
  const score = results.filter((r) => r.pass).length;
  return { slug, score, total: CHECKS.length, results };
}

function checkInfraFiles() {
  const infra = [
    { path: join(__dirname, '../public/llms.txt'), label: 'public/llms.txt' },
    { path: join(__dirname, '../public/robots.txt'), label: 'public/robots.txt' },
    { path: join(__dirname, '../src/pages/methodology.astro'), label: 'pages/methodology.astro' },
    { path: join(__dirname, '../src/pages/corrections.astro'), label: 'pages/corrections.astro' },
    { path: join(__dirname, '../src/data/complaint-index.ts'), label: 'data/complaint-index.ts' },
    { path: join(__dirname, '../src/data/espresso-setup-matrix.ts'), label: 'data/espresso-setup-matrix.ts' },
    { path: join(__dirname, '../src/components/QuickVerdict.astro'), label: 'components/QuickVerdict.astro' },
  ];

  console.log('\n=== Infrastructure Files ===');
  let allPresent = true;
  for (const { path, label } of infra) {
    try {
      readFileSync(path);
      console.log(`  ✓ ${label}`);
    } catch {
      console.log(`  ✗ MISSING: ${label}`);
      allPresent = false;
    }
  }
  return allPresent;
}

// Run audit
console.log('BrewTested — AI Answer Engine Readiness Audit');
console.log('=============================================\n');

const infraOk = checkInfraFiles();

console.log('\n=== Money Page Audit ===');
const pageResults = [];
for (const slug of ESPRESSO_SLUGS) {
  const filePath = join(POSTS_DIR, slug);
  try {
    const result = auditFile(filePath);
    pageResults.push(result);
    const status = result.score === result.total ? '✓' : result.score >= result.total - 2 ? '~' : '✗';
    console.log(`\n${status} ${result.slug} (${result.score}/${result.total})`);
    for (const r of result.results) {
      if (!r.pass) console.log(`    MISSING: ${r.label}`);
    }
  } catch {
    console.log(`\n✗ NOT FOUND: ${slug}`);
  }
}

const totalScore = pageResults.reduce((sum, r) => sum + r.score, 0);
const totalPossible = pageResults.reduce((sum, r) => sum + r.total, 0);
const pct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

console.log('\n=== Summary ===');
console.log(`Infrastructure: ${infraOk ? 'ALL PRESENT' : 'MISSING FILES — see above'}`);
console.log(`Pages score: ${totalScore}/${totalPossible} (${pct}%)`);
console.log(`Pages with QuickVerdict: ${pageResults.filter((r) => r.results.find((c) => c.id === 'quick-verdict')?.pass).length}/${pageResults.length}`);

if (pct < 80) {
  console.log('\nACTION REQUIRED: Score below 80%. Add missing signals above.');
  process.exit(1);
} else {
  console.log('\nPASS: AI readiness score meets threshold.');
}
