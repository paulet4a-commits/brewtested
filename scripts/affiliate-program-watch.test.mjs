import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { SOURCES, assertAllowed, isPublicIP, resolvePublicAddresses, inspectBody, fetchPublicSource, createSnapshot } from './affiliate-program-watch.mjs';

const publicBody = text => Buffer.from(`<html><main><h1>Affiliate program</h1><p>${text} Our partner program has terms, eligibility, attribution and monthly payment details. Review these official conditions before participating.</p></main></html>`);
const now = new Date('2026-10-15T12:00:00Z');

test('allowlist rejects query, alternate path, private host and non-HTTPS', () => {
  for (const source of SOURCES) assert.doesNotThrow(() => assertAllowed(source.url));
  for (const url of ['http://www.beehiiv.com/partners', 'https://www.beehiiv.com/partners?token=anything', 'https://www.beehiiv.com/account', 'https://127.0.0.1/partners']) {
    assert.throws(() => assertAllowed(url));
  }
});

test('private, mapped, multicast and mixed DNS answers are blocked', async () => {
  for (const address of ['127.0.0.1', '10.0.0.1', '100.64.0.1', '169.254.169.254', '172.16.1.1', '192.168.0.1', '198.18.0.1', '224.0.0.1', '::1', '::ffff:8.8.8.8', 'fe80::1', '2001:db8::1', '2001:0000::1', '2::1']) assert.equal(isPublicIP(address), false, address);
  assert.equal(isPublicIP('8.8.8.8'), true);
  assert.equal(isPublicIP('2606:4700:4700::1111'), true);
  await assert.rejects(resolvePublicAddresses('example.com', async () => [{ address: '8.8.8.8', family: 4 }, { address: '127.0.0.1', family: 4 }]));
});

test('local mode never fetches and never claims observation', async () => {
  const snapshot = await createSnapshot({ now, fetcher: () => { throw new Error('must-not-call'); } });
  assert.equal(snapshot.requestsAttempted, 0);
  assert.equal(snapshot.changes.notObserved.length, 4);
});

test('meaningful hashes ignore navigation changes but observe changed conditions', () => {
  const first = publicBody('Commission 5%.');
  const second = Buffer.from(first.toString().replace('<main>', '<nav>Different menu</nav><main>'));
  assert.notEqual(inspectBody(first).bodyDigest, inspectBody(second).bodyDigest);
  assert.equal(inspectBody(first).meaningfulDigest, inspectBody(second).meaningfulDigest);
  assert.notEqual(inspectBody(first).meaningfulDigest, inspectBody(publicBody('Commission 7%.')).meaningfulDigest);
  assert.ok(inspectBody(first).evidenceExcerpt.length <= 280);
});

test('gate responses never leak challenge text as valid policy evidence', () => {
  const result = inspectBody(publicBody('Verify you are human.'));
  assert.equal(result.status, 'blocked');
  assert.equal(result.evidenceExcerpt, null);
  assert.equal(result.meaningfulDigest, null);
  // A captcha widget in an otherwise readable page's signup form is not a gate.
  const readableWithWidget = Buffer.from(publicBody('Commission 5%.').toString().replace('</html>', '<footer><div class="g-recaptcha"></div></footer></html>'));
  assert.equal(inspectBody(readableWithWidget).status, 'observed');
});

test('failed fetch remains notObserved and cannot resolve or approve prior terms', async () => {
  const previous = await createSnapshot({ now: new Date('2026-10-14T12:00:00Z'), publicMode: true, fetcher: async () => inspectBody(publicBody('Commission 5%.')) });
  const current = await createSnapshot({ now, previous, publicMode: true, fetcher: async () => { throw new Error('do not log private error'); } });
  assert.equal(current.changes.notObserved.length, 4);
  assert.ok(current.observations.every(row => row.reviewDue && row.meaningfulDigest === null));
  assert.equal(JSON.stringify(current).includes('private error'), false);
});

test('same-day prior public snapshot suppresses all four repeat attempts', async () => {
  const previous = await createSnapshot({ now, publicMode: true, fetcher: async () => inspectBody(publicBody('Commission 5%.')) });
  const current = await createSnapshot({ now, previous, publicMode: true, fetcher: () => { throw new Error('must-not-call'); } });
  assert.equal(current.requestsAttempted, 0);
  assert.ok(current.observations.every(row => row.error === 'daily-budget-already-used'));
  const third = await createSnapshot({ now, previous: current, publicMode: true, fetcher: () => { throw new Error('must-not-call'); } });
  assert.equal(third.requestsAttempted, 0);
  assert.equal(third.dailyBudget.attempts, 4);
});

test('failed day preserves last observed digest for comparison after recovery', async () => {
  const previous = await createSnapshot({ now: new Date('2026-10-13T12:00:00Z'), publicMode: true, fetcher: async () => inspectBody(publicBody('Commission 5%.')) });
  const failed = await createSnapshot({ now: new Date('2026-10-14T12:00:00Z'), previous, publicMode: true, fetcher: async () => { throw new Error('failed'); } });
  const recovered = await createSnapshot({ now, previous: failed, publicMode: true, fetcher: async () => inspectBody(publicBody('Commission 7%.')) });
  assert.equal(failed.changes.notObserved.length, 4);
  assert.equal(recovered.changes.changed.length, 4);
});

test('redirects do not trigger a second request; checked DNS answer is pinned', async () => {
  let calls = 0;
  const result = await fetchPublicSource(SOURCES[0], {
    resolver: async () => [{ address: '8.8.8.8', family: 4 }],
    requester: (_url, options, callback) => {
      calls++;
      options.lookup('docs.apify.com', {}, (_err, address) => assert.equal(address, '8.8.8.8'));
      const req = new EventEmitter();
      req.end = () => callback({ statusCode: 302, headers: { location: 'https://127.0.0.1/private' }, destroy() {} });
      req.destroy = () => {};
      return req;
    },
  });
  assert.equal(calls, 1);
  assert.equal(result.error, 'redirect-not-followed');
  assert.equal(JSON.stringify(result).includes('127.0.0.1'), false);
});

function fakeResponseSource(headers, body) {
  return {
    resolver: async () => [{ address: '8.8.8.8', family: 4 }],
    requester: (_url, options, callback) => {
      assert.equal(options.headers['accept-encoding'], 'identity');
      const req = new EventEmitter();
      req.destroy = () => {};
      req.end = () => {
        const response = new EventEmitter();
        Object.assign(response, { statusCode: 200, headers, destroy() {} });
        callback(response);
        response.emit('data', body);
        response.emit('end');
      };
      return req;
    },
  };
}

test('official markdown response is accepted without decompression or extra request', async () => {
  const body = Buffer.from('# Affiliate program\nCommission and cookie conditions. Our public partner terms specify customer eligibility, monthly payment, attribution and payout requirements for all participants.');
  const result = await fetchPublicSource(SOURCES[0], fakeResponseSource({ 'content-type': 'text/markdown; charset=utf-8' }, body));
  assert.equal(result.status, 'observed');
  assert.equal(result.meaningfulDigest.length, 64);
});

test('2 MiB body bound yields only bounded response metadata, never a body digest', async () => {
  const headers = { 'content-type': 'text/html', 'content-length': String(2 * 1024 * 1024 + 1), etag: '"public-version-2"', 'last-modified': 'Wed, 14 Oct 2026 12:00:00 GMT' };
  const result = await fetchPublicSource(SOURCES[1], fakeResponseSource(headers, Buffer.alloc(0)));
  assert.equal(result.status, 'metadataOnly');
  assert.equal(result.coverage, 'response-metadata-only');
  assert.equal(result.bodyDigest, null);
  assert.equal(result.meaningfulDigest, null);
  assert.equal(result.evidenceExcerpt, null);
  assert.equal(result.metadata.etagDigest.length, 64);
  assert.equal(result.metadata.lastModified, '2026-10-14T12:00:00.000Z');
  const streamed = await fetchPublicSource(SOURCES[1], fakeResponseSource({ 'content-type': 'text/html' }, Buffer.alloc(2 * 1024 * 1024 + 1)));
  assert.equal(streamed.status, 'metadataOnly');
  assert.equal(streamed.meaningfulDigest, null);
});
