import { createHash } from 'node:crypto';
import { lookup } from 'node:dns/promises';
import { request } from 'node:https';
import { isIP } from 'node:net';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const SCHEMA = 'affiliate-program-watch/v1';
export const SOURCES = Object.freeze([
  { id: 'apify', url: 'https://docs.apify.com/legal/affiliate-program-terms-and-conditions' },
  { id: 'beehiiv', url: 'https://www.beehiiv.com/partners' },
  { id: 'lifeboost', url: 'https://lifeboostcoffee.com/pages/affiliate' },
  { id: 'whole-latte-love', url: 'https://www.wholelattelove.com/pages/events' },
].map(Object.freeze));
const MAX_BODY = 2 * 1024 * 1024;
const SOURCE_TIMEOUT_MS = 5000;
const TOTAL_TIMEOUT_MS = 30000;
const digest = value => createHash('sha256').update(value).digest('hex');
const failure = (error, status = 'unknown') => ({ status, error, bodyDigest: null, meaningfulDigest: null, evidenceExcerpt: null });

export function responseMetadata(headers, httpStatus = 200) {
  const etag = typeof headers.etag === 'string' ? headers.etag : null;
  const lastModified = Date.parse(headers['last-modified'] ?? '');
  const contentLength = Number(headers['content-length']);
  const metadata = {
    httpStatus,
    contentType: String(headers['content-type'] ?? '').split(';')[0].trim().toLowerCase().slice(0, 80),
    contentLength: Number.isSafeInteger(contentLength) && contentLength >= 0 ? contentLength : null,
    etagDigest: etag ? digest(etag) : null,
    lastModified: Number.isFinite(lastModified) ? new Date(lastModified).toISOString() : null,
  };
  return { ...failure('body-too-large', 'metadataOnly'), coverage: 'response-metadata-only',
    metadata, metadataDigest: digest(JSON.stringify(metadata)),
    limitation: 'Full source body exceeded 2 MiB; no policy text or meaningful body digest was observed.' };
}

export function assertAllowed(url) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash ||
      (parsed.port && parsed.port !== '443') || !SOURCES.some(source => source.url === url)) {
    throw new Error('target-not-allowlisted');
  }
  return parsed;
}

// Conservative global-unicast filter. IPv4-mapped IPv6 is deliberately rejected.
export function isPublicIP(address) {
  if (isIP(address) === 4) {
    const [a, b] = address.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && [0, 168].includes(b)) ||
      (a === 198 && [18, 19, 51].includes(b)) || (a === 203 && b === 0));
  }
  // Accept only 2000::/3 global unicast, excluding documentation/transition ranges.
  if (isIP(address) === 6) {
    const value = address.toLowerCase();
    return /^[23][0-9a-f]{3}:/.test(value) && !/^(2001:|2002:|3fff:)/.test(value);
  }
  return false;
}

export async function resolvePublicAddresses(host, resolver = lookup) {
  const addresses = await resolver(host, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(entry => !isPublicIP(entry.address))) throw new Error('dns-nonpublic-blocked');
  return addresses;
}

export function meaningfulText(html) {
  const main = html.match(/<(?:main|article)\b[^>]*>([\s\S]*?)<\/(?:main|article)>/i)?.[1] ?? html;
  return main.replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|nav|header|footer|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|amp|quot|apos|lt|gt);/gi, value =>
      ({ '&nbsp;': ' ', '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' })[value.toLowerCase()])
    .replace(/\s+/g, ' ').trim();
}

export function inspectBody(body) {
  const html = body.toString('utf8');
  // Public source text is untrusted evidence and never executable instructions.
  const text = meaningfulText(html);
  if (/(?:verify (?:you are|that you are) (?:a )?human|access denied|access to this (?:page|site).{0,40}denied|checking your browser|just a moment|complete the captcha|captcha challenge|automated (?:access|requests).{0,40}(?:blocked|denied)|robots?(?:\.txt)?.{0,40}(?:disallow|denied|blocked)|sign in to continue|log in to continue|enable javascript and cookies to continue)/i.test(text) ||
      /(?:cf-chl-|challenge-platform|challenges\.cloudflare\.com)/i.test(html)) {
    return failure('access-gate-or-robot-denial', 'blocked');
  }
  if (text.length < 100) return failure('insufficient-public-evidence');
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) ?? [text];
  const relevant = sentences.filter(value => /affiliate|partner|commission|cookie|payout|payment|collaborat/i.test(value));
  const excerpt = (relevant.length ? relevant : sentences).slice(0, 2).join(' ').trim().slice(0, 280);
  return { status: 'observed', error: null, bodyDigest: digest(body), meaningfulDigest: digest(text), evidenceExcerpt: excerpt };
}

export async function fetchPublicSource(source, { resolver = lookup, requester = request } = {}) {
  const url = assertAllowed(source.url);
  let timer;
  let active;
  let expired = false;
  const timeout = new Promise(resolveTimeout => {
    timer = setTimeout(() => { expired = true; active?.destroy(); resolveTimeout(failure('source-timeout')); }, SOURCE_TIMEOUT_MS);
  });
  const operation = (async () => {
    let addresses;
    try { addresses = await resolvePublicAddresses(url.hostname, resolver); }
    catch (error) { return failure(error.message === 'dns-nonpublic-blocked' ? error.message : 'dns-resolution-failed', 'blocked'); }
    if (expired) return failure('source-timeout');
    return new Promise(resolveRequest => {
      let settled = false;
      const done = value => { if (!settled) { settled = true; resolveRequest(value); } };
      active = requester(url, {
        method: 'GET',
        agent: false,
        headers: { 'user-agent': 'AffiliateProgramWatch/1.0 Agent/AffiliateProgramWatch', accept: 'text/html,text/plain,text/markdown', 'accept-encoding': 'identity' },
        // Pin checked DNS answers; TLS certificate/hostname verification remains on.
        lookup: (_host, options, callback) => options?.all
          ? callback(null, addresses)
          : callback(null, addresses[0].address, addresses[0].family),
      }, response => {
        const code = response.statusCode ?? 0;
        if (code !== 200) {
          response.destroy();
          return done(failure(code >= 300 && code < 400 ? 'redirect-not-followed' : `http-${code}`, [401, 403, 429].includes(code) ? 'blocked' : 'unknown'));
        }
        if (!/^(?:text\/html|text\/plain|text\/markdown|application\/xhtml\+xml)(?:;|$)/i.test(response.headers['content-type'] ?? '') ||
            !['identity', undefined].includes(response.headers['content-encoding'])) {
          response.destroy(); return done(failure('unsupported-response-type'));
        }
        if (Number(response.headers['content-length']) > MAX_BODY) {
          response.destroy(); return done(responseMetadata(response.headers, code));
        }
        const chunks = [];
        let bytes = 0;
        response.on('data', chunk => {
          bytes += chunk.length;
          if (bytes > MAX_BODY) { done(responseMetadata(response.headers, code)); response.destroy(); }
          else chunks.push(chunk);
        });
        response.on('end', () => done(inspectBody(Buffer.concat(chunks))));
        response.on('aborted', () => done(failure('response-aborted')));
        response.on('error', () => done(failure('response-error')));
      });
      active.on('error', () => done(failure('request-failed')));
      active.end();
    });
  })();
  try { return await Promise.race([operation, timeout]); }
  catch { return failure('request-failed'); }
  finally { clearTimeout(timer); }
}

export function validatePrevious(previous) {
  if (previous === null) return null;
  if (previous?.schema !== SCHEMA || !Array.isArray(previous.observations) ||
      !Number.isFinite(Date.parse(previous.observedAt))) throw new Error('invalid-previous-snapshot');
  if (previous.dailyBudget && (!/^\d{4}-\d{2}-\d{2}$/.test(previous.dailyBudget.date ?? '') ||
      !Number.isInteger(previous.dailyBudget.attempts) || previous.dailyBudget.attempts < 0 || previous.dailyBudget.attempts > 4)) throw new Error('invalid-previous-budget');
  const seen = new Set();
  for (const row of previous.observations) {
    if (!SOURCES.some(source => source.id === row.id) || seen.has(row.id)) throw new Error('invalid-previous-source');
    seen.add(row.id);
    if (row.status === 'observed' && !/^[a-f0-9]{64}$/.test(row.meaningfulDigest ?? '')) throw new Error('invalid-previous-digest');
  }
  return previous;
}

export async function createSnapshot({ publicMode = false, previous = null, now = new Date(), fetcher = fetchPublicSource } = {}) {
  validatePrevious(previous);
  const observedAt = now.toISOString();
  const start = Date.now();
  const observations = [];
  const budgetDate = observedAt.slice(0, 10);
  const carriedAttempts = previous?.dailyBudget?.date === budgetDate ? previous.dailyBudget.attempts
    : previous?.mode === 'public' && previous.observedAt.slice(0, 10) === budgetDate ? previous.requestsAttempted : 0;
  const sameDayBudgetUsed = carriedAttempts > 0;
  let requestsAttempted = 0;
  for (const source of SOURCES) {
    let observation;
    if (!publicMode) observation = failure('local-mode-no-http', 'notObserved');
    else if (sameDayBudgetUsed) observation = failure('daily-budget-already-used', 'notObserved');
    else if (Date.now() - start + SOURCE_TIMEOUT_MS > TOTAL_TIMEOUT_MS) observation = failure('total-time-budget-exhausted', 'notObserved');
    else {
      requestsAttempted++;
      try { observation = await fetcher(source); }
      catch { observation = failure('source-observation-failed'); }
    }
    const old = previous?.observations.find(row => row.id === source.id);
    const oldDigest = old?.status === 'observed' ? old.meaningfulDigest : old?.lastObserved?.meaningfulDigest;
    const knownOldDigest = /^[a-f0-9]{64}$/.test(oldDigest ?? '') ? oldDigest : null;
    const change = observation.status !== 'observed' ? 'notObserved'
      : !knownOldDigest ? 'added'
        : knownOldDigest === observation.meaningfulDigest ? 'unchanged' : 'changed';
    observations.push({ id: source.id, sourceURL: source.url, observedAt, ...observation, change,
      metadataComparison: observation.status !== 'metadataOnly' ? null
        : !old?.metadataDigest ? 'firstMetadataObservation'
          : old.metadataDigest === observation.metadataDigest ? 'unchanged' : 'changed',
      lastObserved: observation.status === 'observed' ? { observedAt, meaningfulDigest: observation.meaningfulDigest }
        : knownOldDigest ? { observedAt: old?.lastObserved?.observedAt ?? previous.observedAt, meaningfulDigest: knownOldDigest } : null,
      reviewDue: observation.status !== 'observed' || change !== 'unchanged',
      possibleOpportunityReviewAction: observation.status !== 'observed'
        ? 'Kaynak gözlenemedi; son doğrulanmış koşulları veya hesabın onayını değiştirme. Manuel erişim/durum kontrolü gerekiyor.'
        : change === 'unchanged' ? null : 'Resmî kaynak metni ilk kez görüldü veya değişti; insan koşul/uygunluk incelemesine al. Onay ya da komisyon çıkarımı yapma.',
    });
  }
  return { schema: SCHEMA, observedAt, mode: publicMode ? 'public' : 'local', requestsAttempted,
    dailyBudget: { date: budgetDate, attempts: carriedAttempts + requestsAttempted },
    sourceTrust: 'untrusted-public-evidence-only',
    acceptance: 'No program approval, commission interpretation, contract acceptance, or delivery claim is produced.',
    dailyBudgetScope: 'At most four source attempts per run. Same-day prior public snapshot suppresses repeats; scheduler must persist the prior snapshot and serialize daily runs.',
    observations,
    changes: Object.fromEntries(['added', 'changed', 'unchanged', 'notObserved'].map(key => [key, observations.filter(row => row.change === key).map(row => row.id)])),
  };
}

async function main(args) {
  let output;
  let previousPath;
  let publicMode = false;
  const seen = new Set();
  for (let index = 0; index < args.length; index++) {
    const flag = args[index];
    if (seen.has(flag)) throw new Error('duplicate-argument');
    seen.add(flag);
    if (flag === '--public') publicMode = true;
    else if (['--output', '--previous'].includes(flag)) {
      const value = args[++index];
      if (!value || value.startsWith('--')) throw new Error('missing-path-argument');
      if (flag === '--output') output = resolve(value); else previousPath = resolve(value);
    } else throw new Error('unknown-argument');
  }
  if (!output) throw new Error('usage: --output new.json [--previous old.json] [--public]');
  if (output === previousPath) throw new Error('output-must-not-replace-previous');
  const previous = previousPath ? validatePrevious(JSON.parse(await readFile(previousPath, 'utf8'))) : null;
  const report = await createSnapshot({ publicMode, previous });
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
  console.log(JSON.stringify({ schema: SCHEMA, mode: report.mode, requestsAttempted: report.requestsAttempted, changes: report.changes }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch(error => {
    // Fixed messages only: no remote text, addresses, private paths or auth values.
    const message = /^(?:usage:|duplicate-argument|missing-path-argument|unknown-argument|output-must-not-replace-previous|invalid-previous-)/.test(error.message)
      ? error.message : 'snapshot-command-failed';
    console.error(message);
    process.exitCode = 1;
  });
}
