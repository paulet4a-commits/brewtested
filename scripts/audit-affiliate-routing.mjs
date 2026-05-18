/**
 * audit-affiliate-routing.mjs
 * Build gate: fail if raw Amazon/affiliate links bypass ProductCard/AffiliateButton.
 *
 * .mdx files  → HARD FAIL  (migrated, must use components)
 * .md files   → WARN only  (legacy unmigrated, expected to have raw links)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CONTENT_DIR = join(__dirname, '../src/content/posts');

// All affiliate URL patterns that should not appear raw in content files
const RAW_AFFILIATE_PATTERNS = [
  // Amazon dp links (any region)
  /\[.*?\]\(https?:\/\/(www\.)?amazon\.(com|co\.uk|ca|com\.au|de|fr|co\.jp)\/dp\//g,
  /href=["']https?:\/\/(www\.)?amazon\.(com|co\.uk|ca|com\.au|de|fr|co\.jp)\/dp\//g,
  // Amazon gp/product links
  /\[.*?\]\(https?:\/\/(www\.)?amazon\.(com|co\.uk|ca)\/gp\/product\//g,
  /href=["']https?:\/\/(www\.)?amazon\.(com|co\.uk|ca)\/gp\/product\//g,
  // amzn.to shortlinks
  /\[.*?\]\(https?:\/\/amzn\.to\//g,
  /href=["']https?:\/\/amzn\.to\//g,
];

function walkDir(dir, ext) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full, ext));
    } else if (entry.endsWith(ext)) {
      files.push(full);
    }
  }
  return files;
}

function scanFiles(files, root) {
  const violations = [];
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const rel = relative(root, file);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const pattern of RAW_AFFILIATE_PATTERNS) {
        pattern.lastIndex = 0;
        if (pattern.test(line)) {
          violations.push({ rel, line: i + 1, text: line.trim() });
        }
      }
    }
  }
  return violations;
}

const root = join(__dirname, '..');
const mdxFiles = walkDir(CONTENT_DIR, '.mdx');
const mdFiles = walkDir(CONTENT_DIR, '.md');

// Hard violations: .mdx files must never have raw links
const hardViolations = scanFiles(mdxFiles, root);

// Soft violations: .md files are legacy, warn only
const softViolations = scanFiles(mdFiles, root);

if (softViolations.length > 0) {
  console.warn(`⚠ ${softViolations.length} raw affiliate link(s) in legacy .md files (non-blocking — migrate to .mdx to fix):`);
  const byFile = {};
  for (const v of softViolations) {
    (byFile[v.rel] = byFile[v.rel] ?? []).push(v.line);
  }
  for (const [file, lines] of Object.entries(byFile)) {
    console.warn(`  ${file}: lines ${lines.join(', ')}`);
  }
}

if (hardViolations.length > 0) {
  console.error(`\n✗ ${hardViolations.length} raw affiliate link(s) in .mdx files — replace with <ProductCard> or <AffiliateButton>:`);
  for (const v of hardViolations) {
    console.error(`  ${v.rel}:${v.line}  ${v.text}`);
  }
  process.exit(1);
}

console.log(`✓ No raw affiliate links in ${mdxFiles.length} .mdx files. (${mdFiles.length} legacy .md files skipped.)`);
