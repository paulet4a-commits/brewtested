/**
 * report-affiliate-status.mjs
 * Affiliate revenue dashboard: shows which products need direct merchant attention.
 *
 * Run: tsx scripts/report-affiliate-status.mjs
 */

// @ts-check
import { products } from '../src/data/products.ts';

const all = Object.entries(products).filter(([, p]) => p.status === 'active');

const amazonOnly = [];       // no merchants array at all
const stagingPending = [];   // has merchants but all approved:false
const directActive = [];     // at least one approved:true merchant
const highAovAmazonOnly = []; // high AOV stuck on Amazon

for (const [key, product] of all) {
  const merchants = product.merchants ?? [];
  const approvedMerchants = merchants.filter((m) => m.approved);

  if (approvedMerchants.length > 0) {
    directActive.push({ key, product, merchants: approvedMerchants });
  } else if (merchants.length > 0) {
    stagingPending.push({ key, product, merchants });
  } else {
    amazonOnly.push({ key, product });
    if (product.aovTier === 'high') {
      highAovAmazonOnly.push({ key, product });
    }
  }
}

console.log('\n=== AFFILIATE ROUTING STATUS REPORT ===\n');

console.log(`✓ Direct affiliate active (${directActive.length} products):`);
for (const { key, product, merchants } of directActive) {
  console.log(`  ${key} → ${merchants.map((m) => m.name).join(', ')}`);
}

console.log(`\n⏳ Staged/pending approval (${stagingPending.length} products):`);
for (const { key, product, merchants } of stagingPending) {
  const names = merchants.map((m) => m.name).join(', ');
  const aov = product.aovTier ? ` [AOV: ${product.aovTier}]` : '';
  console.log(`  ${key}${aov} → pending: ${names}`);
}

console.log(`\n⚠ Amazon-only / no merchant staged (${amazonOnly.length} products):`);
for (const { key, product } of amazonOnly) {
  const aov = product.aovTier ? ` [AOV: ${product.aovTier}]` : '';
  console.log(`  ${key}${aov}`);
}

if (highAovAmazonOnly.length > 0) {
  console.log(`\n🔴 HIGH-PRIORITY: High-AOV products stuck on Amazon-only (${highAovAmazonOnly.length}):`);
  for (const { key, product } of highAovAmazonOnly) {
    console.log(`  ${key} — ${product.name} (${product.priceRange})`);
  }
}

const totalActive = all.length;
const pctDirect = ((directActive.length / totalActive) * 100).toFixed(1);
const pctPending = ((stagingPending.length / totalActive) * 100).toFixed(1);
const pctAmazon = ((amazonOnly.length / totalActive) * 100).toFixed(1);

console.log(`\n--- SUMMARY ---`);
console.log(`Total active products: ${totalActive}`);
console.log(`Direct active: ${directActive.length} (${pctDirect}%)`);
console.log(`Pending approval: ${stagingPending.length} (${pctPending}%)`);
console.log(`Amazon-only: ${amazonOnly.length} (${pctAmazon}%)`);
console.log('');
