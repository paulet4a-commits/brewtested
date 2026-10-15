import test from 'node:test';
import assert from 'node:assert/strict';
import { getEventListeners } from 'node:events';
import { safeUrl, publicIPv4, resolvePublicIPv4, inspectPost, inspectProducts, compare, checkPublic, robotsAllows } from './affiliate-ops.mjs';

test('public URL boundary rejects credentials, external hosts, local IPs, ports and query strings', () => {
  for (const url of ['http://brewtested.pulsedash-app.com/', 'https://evil.example/', 'https://127.0.0.1/', 'https://user:pass@brewtested.pulsedash-app.com/', 'https://brewtested.pulsedash-app.com:444/', '/?secret=value', '/#fragment']) {
    assert.throws(() => safeUrl(url));
  }
  assert.equal(safeUrl('/reviews/').pathname, '/reviews/');
  for (const ip of ['127.0.0.1', '10.1.2.3', '192.168.1.1', '169.254.169.254', '100.100.1.1', '198.18.0.1', '203.0.113.1', '::1', '224.1.1.1']) assert.equal(publicIPv4(ip), false, ip);
  assert.equal(publicIPv4('1.1.1.1'), true);
});

test('review date takes priority and claims remain unverified candidates', () => {
  const result = inspectPost('---\npubDate: 2026-01-01\nupdatedDate: 2026-10-14\n---\nWe tested 25 cups. https://amazon.com/dp/ABC', 'review.mdx', '2026-10-15');
  assert.equal(result.ageDays, 1);
  assert.equal(result.findings.filter((f) => f.evidenceVerified === false).length, 2);
  assert.ok(result.findings.some((f) => f.type === 'raw_routing_mdx'));
  assert.equal(inspectPost('---\npubDate: 2026-02-31\n---', 'x.md', '2026-10-15').dateState, 'unknown');
  assert.equal(inspectPost('---\npubDate: 2027-01-01\n---', 'x.md', '2026-10-15').dateState, 'future');
});

test('registry parser identifies stale and missing dates without executing code', () => {
  const registry = `export const products: Record<string, Product> = {
  'old': { status: 'active', lastVerified: '2026-05-19', merchants: [{approved: false}] },
  'fresh': { status: 'active', lastReviewed: '2026-10-14', merchants: [{approved: true}] },
  'unknown': { status: 'active' },
  'retired': { status: 'discontinued' },
}; throw new Error('MUST NOT EXECUTE');`;
  const result = inspectProducts(registry, '2026-10-15');
  assert.equal(result.products.length, 3);
  assert.deepEqual(result.products.map((p) => p.freshness), ['stale', 'within_threshold', 'unknown']);
  assert.equal(result.products[1].approvedCodeRoutes, 1);
  assert.equal(result.findings.length, 2);
});

test('stable findings deduplicate and substantive status changes remain visible', () => {
  const original = { sourceDigest: 'a', findings: [{ id: 'one', detail: '404' }, { id: 'removed' }] };
  const same = compare(original, original);
  assert.deepEqual(same.added, []);
  assert.equal(same.unchanged.length, 2);
  const changed = compare(original, { sourceDigest: 'b', findings: [{ id: 'one', detail: '500' }, { id: 'new' }] });
  assert.deepEqual(changed.changed, ['one']);
  assert.deepEqual(changed.resolved, ['removed']);
  assert.deepEqual(changed.added, ['new']);
  assert.equal(changed.sourceChanged, true);
});

test('duplicate product keys use the last definition, including inactive replacements', () => {
  const registry = `export const products: Record<string, Product> = {
  'one': { status: 'active', lastVerified: '2026-01-01' },
  'two': { status: 'active', lastVerified: '2026-01-01' },
  'one': { status: 'active', lastVerified: '2026-10-14' },
  'two': { status: 'discontinued' },
};`;
  const result = inspectProducts(registry, '2026-10-15');
  assert.equal(result.products.length, 1);
  assert.equal(result.products[0].freshness, 'within_threshold');
  assert.deepEqual(result.duplicateKeys, ['one', 'two']);
});

test('a previously failing URL is not marked fixed if robots or request budget prevents observation', () => {
  const previous = { findings: [{ id: 'http', type: 'http_attention', source: 'https://brewtested.pulsedash-app.com/review/' }], public: { observations: [] } };
  const missing = compare(previous, { findings: [], public: { observations: [] } });
  assert.deepEqual(missing.resolved, []);
  assert.deepEqual(missing.notObserved, ['http']);
  const healthy = compare(previous, { findings: [], public: { observations: [{ url: previous.findings[0].source, status: 200 }] } });
  assert.deepEqual(healthy.resolved, ['http']);
});

test('robots rules are conservative across groups and wildcard paths', () => {
  assert.equal(robotsAllows('User-agent: *\nDisallow: /private/\nDisallow: /*secret', '/private/report'), false);
  assert.equal(robotsAllows('Disallow: /*secret', '/something-secret'), false);
  assert.equal(robotsAllows('Disallow:', '/'), true);
});

test('offline public crawl bounds calls, skips external links and follows only safe sitemap entries', async () => {
  const calls = [];
  const request = async (url) => {
    calls.push(url);
    const path = new URL(url).pathname;
    const text = path === '/robots.txt' ? 'User-agent: *\nDisallow: /private\nSitemap: https://brewtested.pulsedash-app.com/sitemap-index.xml' :
      path === '/' ? '<a href="/private/report">hidden</a><a href="https://127.0.0.1/">bad</a><a href="/about/">about</a>' :
      path === '/sitemap-index.xml' ? '<sitemapindex><loc>https://brewtested.pulsedash-app.com/sitemap-0.xml</loc></sitemapindex>' :
      path === '/sitemap-0.xml' ? '<urlset><loc>https://evil.example/</loc><loc>https://brewtested.pulsedash-app.com/review/</loc></urlset>' : 'page';
    return { status: 200, text, bytes: text.length };
  };
  const report = await checkPublic({ request, maxRequests: 5 });
  assert.equal(report.requests, 5);
  assert.equal(calls.length, 5);
  assert.ok(calls.every((url) => safeUrl(url)));
  assert.ok(calls.every((url) => !url.includes('private')));
});

test('unknown robots stops crawling; redirect is observed without following location', async () => {
  let calls = 0;
  const report = await checkPublic({ request: async () => { calls++; return { status: 302, text: '', bytes: 0, location: 'http://127.0.0.1/' }; } });
  assert.equal(calls, 1);
  assert.equal(report.crawlState, 'blocked_robots_unknown');
  assert.equal(report.observations[0].status, 302);
});

test('daily ages do not create changed finding spam but crossing the freshness threshold does', () => {
  const registry = `export const products: Record<string, Product> = {
  'one': { status: 'active', lastVerified: '2026-01-01' },
};`;
  const before = inspectProducts(registry, '2026-10-15');
  const after = inspectProducts(registry, '2026-10-16');
  assert.notEqual(before.products[0].ageDays, after.products[0].ageDays);
  assert.deepEqual(compare(before, after).changed, []);
  assert.deepEqual(compare(before, after).added, []);
  const fresh = inspectProducts(registry, '2026-01-02');
  assert.equal(compare(fresh, before).added.length, 1);
});

test('registry comments and strings cannot impersonate status or approval properties', () => {
  const registry = `export const products: Record<string, Product> = {
  'one': {
    // status: 'active', lastVerified: '2026-01-01', approved: true
    status: 'unverified', name: "status: 'active'", merchants: [{approved: false}],
  },
  'two': { name: "approved: true status: 'discontinued'", /* status: 'discontinued' */ status: 'active', lastVerified: '2026-10-14', merchants: [{url: 'https://example.com/', approved: false}] },
};`;
  const result = inspectProducts(registry, '2026-10-15');
  assert.equal(result.products.length, 2);
  assert.equal(result.products[0].status, 'unverified');
  assert.equal(result.products[1].key, 'two');
  assert.equal(result.products[1].approvedCodeRoutes, 0);
  assert.equal(result.products[1].pendingCodeRoutes, 1);
  assert.equal(inspectProducts("export const products = { 'one': makeProduct() };", '2026-10-15').parseStatus, 'unknown');
});

test('DNS resolution removes abort listeners after success, failure, or abort', async () => {
  const controller = new AbortController();
  assert.equal((await resolvePublicIPv4('allowed.example', controller.signal, async () => [{address: '1.1.1.1', family: 4}])).length, 1);
  assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
  await assert.rejects(resolvePublicIPv4('allowed.example', controller.signal, async () => [{address: '127.0.0.1', family: 4}]), /NON_PUBLIC_DNS/);
  assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
  const pending = resolvePublicIPv4('allowed.example', controller.signal, async () => new Promise(() => {}));
  controller.abort();
  await assert.rejects(pending, /TIMEOUT/);
  assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
  await assert.rejects(resolvePublicIPv4('allowed.example', controller.signal, async () => assert.fail('must not resolve after abort')), /TIMEOUT/);
});

test('failed internal links consume sample and request budgets without retries', async () => {
  const calls = [];
  const report = await checkPublic({ maxLinks: 3, request: async (url) => {
    calls.push(url);
    const path = new URL(url).pathname;
    if (path === '/robots.txt') return { status: 200, text: 'User-agent: *\nDisallow:', bytes: 28 };
    if (path === '/') return { status: 200, text: Array.from({length: 20}, (_, i) => `<a href="/review-${i}/">Review</a>`).join(''), bytes: 700 };
    if (path === '/sitemap-index.xml') return { status: 404, text: '', bytes: 0 };
    throw new Error('TIMEOUT');
  } });
  assert.equal(report.sampledLinks, 3);
  assert.equal(report.requests, 6);
  assert.equal(calls.length, 6);
  assert.equal(report.observations.filter((item) => item.kind === 'sampled_internal_link').length, 3);
});

test('an all-unverified registry remains valid and retains all 246 stale products in its queue', () => {
  const rows = Array.from({ length: 246 }, (_, i) => `  'product-${i}': { status: 'unverified', lastVerified: '2026-05-19' },`);
  const result = inspectProducts(`export const products: Record<string, Product> = {\n${rows.join('\n')}\n};`, '2026-10-15');
  assert.equal(result.parseStatus, 'static_registry_observed');
  assert.equal(result.registryEntries, 246);
  assert.equal(result.products.filter((p) => p.status === 'active').length, 0);
  assert.equal(result.products.filter((p) => p.status === 'unverified').length, 246);
  assert.equal(result.products.filter((p) => p.freshness === 'stale').length, 246);
  assert.equal(result.findings.filter((p) => p.type === 'product_stale').length, 246);
  assert.equal(inspectProducts("export const products = { 'old': {status:'discontinued'} };", '2026-10-15').parseStatus, 'static_registry_observed');
});
