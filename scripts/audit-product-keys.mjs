/**
 * Product key audit — run: pnpm audit:keys
 * Scans all MDX/MD posts for productKey="..." usages and validates every key
 * exists in src/data/products.ts. Fails build with exit 1 if any are missing.
 */

// @ts-check
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dir = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dir, '..');

// Extract keys from products.ts via regex (avoids TS compilation)
const productsTs = readFileSync(join(root, 'src/data/products.ts'), 'utf8');
const registryKeys = new Set(
  [...productsTs.matchAll(/^\s+'([a-z0-9-]+)':\s*\{/gm)].map((m) => m[1])
);

// Recursively collect all .md and .mdx files under src/content/posts/
function collectFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
    } else if (/\.(mdx?)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const postsDir = join(root, 'src/content/posts');
const allFiles = collectFiles(postsDir);

const errors = [];

for (const file of allFiles) {
  const content = readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/productKey="([^"]+)"/g)];
  for (const match of matches) {
    const key = match[1];
    if (!registryKeys.has(key)) {
      errors.push({ file: file.replace(root, '').replace(/\\/g, '/'), key });
    }
  }
}

if (errors.length > 0) {
  console.error(`\n✗ Unknown productKey references found (${errors.length}) — add to src/data/products.ts:\n`);
  for (const { file, key } of errors) {
    console.error(`  "${key}" in ${file}`);
  }
  process.exit(1);
}

console.log(`✓ All productKey references valid (registry: ${registryKeys.size} keys, posts: ${allFiles.length} files).`);
