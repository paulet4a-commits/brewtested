/**
 * Stale product audit — run: node scripts/audit-stale-products.mjs
 * Fails with exit 1 if any active money-page product is stale (lastReviewed > staleAfterDays old).
 * Used as a build gate or weekly cron check.
 */

import { products } from '../src/data/products.ts';

const DEFAULT_STALE_DAYS = 45;
const today = new Date();
const stale = [];
const missing = [];

for (const [key, product] of Object.entries(products)) {
  if (product.status !== 'active') continue;

  const reviewDate = product.lastReviewed ?? product.lastVerified;
  if (!reviewDate) {
    missing.push(key);
    continue;
  }

  const reviewed = new Date(reviewDate);
  const ageDays = Math.floor((today - reviewed) / (1000 * 60 * 60 * 24));
  const threshold = product.staleAfterDays ?? DEFAULT_STALE_DAYS;

  if (ageDays > threshold) {
    stale.push({ key, name: product.name, ageDays, threshold, lastReviewed: reviewDate });
  }
}

if (missing.length > 0) {
  console.warn(`\n⚠ Products missing lastVerified/lastReviewed (${missing.length}):`);
  missing.forEach((k) => console.warn(`  - ${k}`));
}

if (stale.length > 0) {
  console.error(`\n✗ Stale products found (${stale.length}) — update lastReviewed or set status to 'unverified':\n`);
  stale.forEach(({ key, name, ageDays, threshold, lastReviewed }) => {
    console.error(`  ${key}: "${name}" — ${ageDays}d old (threshold: ${threshold}d, last reviewed: ${lastReviewed})`);
  });
  process.exit(1);
}

console.log(`✓ All ${Object.keys(products).length} active products within freshness threshold.`);
