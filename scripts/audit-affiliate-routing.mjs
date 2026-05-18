/**
 * audit-affiliate-routing.mjs
 * Build gate: fail if raw Amazon links bypass ProductCard/AffiliateButton routing.
 * Raw amazon.com/dp links in MDX/MD content should never exist — all affiliate
 * clicks must go through ProductCard or AffiliateButton so merchant routing,
 * data-merchant tracking, and future direct-affiliate switching all work correctly.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CONTENT_DIR = join(__dirname, '../src/content/posts');

const RAW_AMAZON_PATTERNS = [
  // Markdown links: [text](https://www.amazon.com/dp/...)
  /\[.*?\]\(https?:\/\/(www\.)?amazon\.com\/dp\//g,
  // HTML href: href="https://www.amazon.com/dp/..."
  /href=["']https?:\/\/(www\.)?amazon\.com\/dp\//g,
];

function walkDir(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

const files = walkDir(CONTENT_DIR);
let violations = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const rel = relative(join(__dirname, '..'), file);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const pattern of RAW_AMAZON_PATTERNS) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        console.error(`RAW AMAZON LINK  ${rel}:${i + 1}`);
        console.error(`  ${line.trim()}`);
        violations++;
      }
    }
  }
}

if (violations > 0) {
  console.error(`\n✗ ${violations} raw Amazon link(s) found. Replace with <ProductCard> or <AffiliateButton> components.`);
  process.exit(1);
} else {
  console.log(`✓ No raw Amazon links found in ${files.length} content files.`);
}
