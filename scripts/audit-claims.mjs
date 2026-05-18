/**
 * audit-claims.mjs
 * Warn-only: flag risky/unsupported claims in .mdx content files.
 * Does NOT block build — outputs warnings for manual review.
 *
 * Run: tsx scripts/audit-claims.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CONTENT_DIR = join(__dirname, '../src/content/posts');

// [pattern, reason]
const RISKY_PHRASES = [
  [/we (brewed|tested|measured|pulled|compared|personally tested)/gi, 'fake personal testing claim'],
  [/I (brewed|tested|measured|pulled|personally tested)/gi, 'fake personal testing claim'],
  [/(brewed|pulled|tested)\s+\d+\+?\s+(shots|espressos|cups)/gi, 'unverified volume claim'],
  [/over\s+\d+\s+weeks?\s+(of\s+)?(testing|brewing|use)/gi, 'unverified duration claim'],
  [/café[- ]?quality/gi, 'unqualified café-quality claim — add evidence block'],
  [/rivals?\s+(café|cafe|specialty\s+coffee)/gi, 'rivals-café claim — needs owner evidence'],
  [/same\s+as\s+(grinders?|machines?)\s+costing\s+[23456]x/gi, 'cost-multiple claim — verify or soften'],
  [/cannot\s+compensate/gi, 'strong causal claim — soften or cite source'],
  [/SCAA[- ]?certified/gi, 'certification claim — verify accuracy'],
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

const root = join(__dirname, '..');
const files = walkDir(CONTENT_DIR);
let totalWarnings = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const rel = relative(root, file);
  const fileWarnings = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const [pattern, reason] of RISKY_PHRASES) {
      pattern.lastIndex = 0;
      const match = pattern.exec(line);
      if (match) {
        fileWarnings.push({ line: i + 1, text: line.trim(), match: match[0], reason });
        totalWarnings++;
      }
    }
  }

  if (fileWarnings.length > 0) {
    console.warn(`\n⚠ ${rel}`);
    for (const w of fileWarnings) {
      console.warn(`  L${w.line}: [${w.reason}]`);
      console.warn(`    "${w.match}" in: ${w.text.slice(0, 100)}`);
    }
  }
}

if (totalWarnings === 0) {
  console.log(`✓ No risky claims found in ${files.length} .mdx files.`);
} else {
  console.warn(`\n⚠ ${totalWarnings} claim(s) flagged in ${files.length} .mdx files. Review above — these do not block build.`);
}
