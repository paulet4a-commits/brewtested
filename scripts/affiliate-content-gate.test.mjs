import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectPost } from './affiliate-ops.mjs';
import { blockingFindings } from './affiliate-content-gate.mjs';

function reportFor(text) {
  return { schema: 'affiliate-operations/v1', findings: inspectPost(text, 'example.mdx', '2026-10-15').findings };
}

test('blocks the original unsupported sieve-test claim before a publish', () => {
  const report = reportFor('We measured grind consistency by sifting the same dose through sieves.');
  assert.equal(blockingFindings(report).length, 1);
});

test('editorial comparison and genuinely unknown measurements remain publishable', () => {
  const report = reportFor('We compared published specifications. Noise measurements are unavailable.');
  report.findings.push({ type: 'product_stale', source: 'products.ts', detail: 'Needs review' });
  assert.equal(blockingFindings(report).length, 0);
});

test('unknown registry shape cannot silently pass the publication gate', () => {
  assert.equal(blockingFindings({ schema: 'affiliate-operations/v1', findings: [{ type: 'product_parser_unknown' }] }).length, 1);
  assert.throws(() => blockingFindings({ schema: 'other', findings: [] }));
});
