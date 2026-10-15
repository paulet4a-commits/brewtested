/** Zero-dependency, read-only affiliate operations audit. No accounts, models or publishing. */
import { createHash } from 'node:crypto';
import { lookup } from 'node:dns/promises';
import https from 'node:https';
import { isIP } from 'node:net';
import { readdir, readFile, lstat, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const ORIGIN = 'https://brewtested.pulsedash-app.com';
const DAY = 86_400_000;
const MAX_BYTES = 1_048_576;
const hash = (value) => createHash('sha256').update(value).digest('hex');
const isoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? '') && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

export function safeUrl(value, base = ORIGIN) {
  const url = new URL(value, base);
  if (url.origin !== ORIGIN || url.username || url.password || url.search || url.hash) throw new Error('URL outside public allowlist');
  return url;
}

export function publicIPv4(address) {
  if (isIP(address) !== 4) return false;
  const [a, b, c] = address.split('.').map(Number);
  return !(a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 168 || b === 0 || (b === 2))) ||
    (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) ||
    (a === 203 && b === 0 && c === 113));
}

// Pin each request to a DNS answer checked before opening the socket. Redirects are never followed.
export async function resolvePublicIPv4(hostname, signal, resolver = lookup) {
  if (signal.aborted) throw new Error('TIMEOUT');
  let abort;
  const aborted = new Promise((_, reject) => {
    abort = () => reject(new Error('TIMEOUT'));
    signal.addEventListener('abort', abort, { once: true });
  });
  try {
    const answers = await Promise.race([resolver(hostname, { all: true, family: 4 }), aborted]);
    if (signal.aborted) throw new Error('TIMEOUT');
    if (!answers.length || answers.some(({ address }) => !publicIPv4(address))) throw new Error('NON_PUBLIC_DNS');
    return answers;
  } finally { signal.removeEventListener('abort', abort); }
}

async function publicGet(value, { signal, remainingMs }) {
  const url = safeUrl(value);
  const answers = await resolvePublicIPv4(url.hostname, signal);
  return new Promise((done, reject) => {
    const req = https.get(url, {
      signal, agent: false, timeout: Math.min(5000, remainingMs),
      headers: { 'user-agent': 'BrewTestedOps/1.0 (+read-only site health)', accept: 'text/html,text/plain,application/xml,text/xml' },
      lookup: (_host, options, cb) => options.all ? cb(null, [answers[0]]) : cb(null, answers[0].address, 4),
    }, (res) => {
      const chunks = [];
      let size = 0;
      res.on('data', (chunk) => {
        size += chunk.length;
        if (size > MAX_BYTES) { req.destroy(new Error('BODY_LIMIT')); return; }
        chunks.push(chunk);
      });
      res.on('error', reject);
      res.on('end', () => done({ status: res.statusCode, text: Buffer.concat(chunks).toString('utf8'), bytes: size }));
    });
    req.on('timeout', () => req.destroy(new Error('TIMEOUT')));
    req.on('error', reject);
  });
}

export function compare(previous, current) {
  const before = new Map((previous?.findings ?? []).map((item) => [item.id, item]));
  const after = new Map(current.findings.map((item) => [item.id, item]));
  const observed = new Map((current.public?.observations ?? []).map((item) => [item.url, item]));
  const oldHttp = new Map((previous?.public?.observations ?? []).map((item) => [item.url, item]));
  const absent = [...before.keys()].filter((id) => !after.has(id));
  const actuallyResolved = (id) => before.get(id).type !== 'http_attention' || observed.get(before.get(id).source)?.status === 200;
  return {
    baseline: previous ? 'compared' : 'first_run',
    added: [...after.keys()].filter((id) => !before.has(id)),
    resolved: absent.filter(actuallyResolved),
    notObserved: absent.filter((id) => !actuallyResolved(id)),
    changed: [...after.keys()].filter((id) => before.has(id) && JSON.stringify(before.get(id)) !== JSON.stringify(after.get(id))),
    unchanged: [...after.keys()].filter((id) => before.has(id) && JSON.stringify(before.get(id)) === JSON.stringify(after.get(id))),
    // The caller can notify only added findings. This tool sends no messages.
    sourceChanged: previous ? previous.sourceDigest !== current.sourceDigest : null,
    httpChanged: [...observed.keys()].filter((url) => {
      const a = oldHttp.get(url), b = observed.get(url);
      return a && (a.status !== b.status || a.error !== b.error || a.bodyDigest !== b.bodyDigest);
    }),
  };
}

function finding(type, source, detail, identity = detail) {
  return { id: hash(`${type}|${source}|${identity}`).slice(0, 20), type, source, detail, evidenceLevel: 'static_code', action: 'review' };
}

export function inspectPost(text, source, today) {
  const findings = [];
  const header = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const reviewDate = header.match(/^(?:updatedDate|lastReviewed):\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const date = reviewDate ?? header.match(/^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const dateState = !date || !isoDate(date) ? 'unknown' : Date.parse(date) > Date.parse(today) ? 'future' : 'dated';
  if (dateState !== 'dated') findings.push(finding('content_date_unknown', source, dateState, 'date'));
  const patterns = [
    ['personal_testing_claim', /\b(?:we|I)\s+(?:brewed|tested|measured|pulled|personally tested)\b/gi],
    ['testing_volume_claim', /\b(?:brewed|pulled|tested)\s+\d+\+?\s+(?:shots|espressos|cups)\b/gi],
    ['testing_duration_claim', /\bover\s+\d+\s+weeks?\s+(?:of\s+)?(?:testing|brewing|use)\b/gi],
  ];
  for (const [type, pattern] of patterns) {
    for (const match of text.matchAll(pattern)) {
      const line = text.slice(0, match.index).split('\n').length;
      const item = finding(type, source, `L${line}: evidence needs human review`, `${match[0].toLowerCase()}|${line}`);
      item.claim = match[0];
      item.evidenceVerified = false;
      findings.push(item);
    }
  }
  const rawLinks = [...text.matchAll(/https?:\/\/(?:www\.)?(?:amazon\.(?:com|co\.uk|ca|com\.au|de|fr|co\.jp)\/(?:dp|gp\/product)\/|amzn\.to\/)/gi)].length;
  if (rawLinks) findings.push(finding(source.endsWith('.mdx') ? 'raw_routing_mdx' : 'raw_routing_legacy', source, `${rawLinks} raw affiliate URL occurrence(s)`, 'routing'));
  const ageDays = dateState === 'dated' ? Math.floor((Date.parse(today) - Date.parse(date)) / DAY) : null;
  return { source, date: date ?? null, dateState, ageDays, reviewDate: reviewDate ?? null, reviewEvidence: 'not_verified', rawLinks, findings };
}

// Narrow, non-executing parser: data literals only. Comments and strings cannot impersonate fields.
function literalRegistry(text) {
  const marker = text.match(/export\s+const\s+products\b[^=]*=/);
  if (!marker) throw new Error('Unknown registry');
  let cursor = marker.index + marker[0].length;
  let token;
  const duplicateKeys = new Set();
  function next() {
    while (cursor < text.length) {
      if (/\s/.test(text[cursor])) { cursor++; continue; }
      if (text.startsWith('//', cursor)) { const end = text.indexOf('\n', cursor); cursor = end < 0 ? text.length : end + 1; continue; }
      if (text.startsWith('/*', cursor)) { const end = text.indexOf('*/', cursor + 2); if (end < 0) throw new Error('Unclosed comment'); cursor = end + 2; continue; }
      break;
    }
    const char = text[cursor++];
    if (char === '"' || char === "'") {
      let value = '', closed = false;
      while (cursor < text.length) {
        const ch = text[cursor++];
        if (ch === char) { closed = true; break; }
        if (ch === '\\') {
          const escape = text[cursor++];
          if (escape === 'u' || escape === 'x') {
            const length = escape === 'u' ? 4 : 2, digits = text.slice(cursor, cursor + length);
            if (!new RegExp(`^[0-9a-f]{${length}}$`, 'i').test(digits)) throw new Error('Unsupported escape');
            value += String.fromCharCode(parseInt(digits, 16)); cursor += length;
          } else value += ({ n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' })[escape] ?? escape;
        } else value += ch;
      }
      if (!closed) throw new Error('Unclosed string');
      token = { type: 'string', value }; return;
    }
    const word = text.slice(cursor - 1).match(/^(?:[A-Za-z_$][\w$]*|-?\d+(?:\.\d+)?)/)?.[0];
    if (word) { cursor += word.length - 1; token = { type: /^-?\d/.test(word) ? 'number' : 'word', value: word }; return; }
    token = { type: char, value: char };
  }
  function take(type) { if (token.type !== type) throw new Error('Unsupported literal'); next(); }
  function value(depth = 0) {
    if (depth > 12) throw new Error('Registry nesting limit');
    if (token.type === '{') {
      const result = new Map(); next();
      while (token.type !== '}') {
        if (!['string', 'word', 'number'].includes(token.type)) throw new Error('Unsupported key');
        const key = token.value; next(); take(':');
        if (depth === 0 && result.has(key)) duplicateKeys.add(key);
        result.set(key, value(depth + 1));
        if (token.type !== '}') take(',');
      }
      next(); return result;
    }
    if (token.type === '[') {
      const result = []; next();
      while (token.type !== ']') { result.push(value(depth + 1)); if (token.type !== ']') take(','); }
      next(); return result;
    }
    const item = token; next();
    if (item.type === 'string') return item.value;
    if (item.type === 'number') return Number(item.value);
    if (item.type === 'word' && ['true', 'false', 'null'].includes(item.value)) return JSON.parse(item.value);
    throw new Error('Unsupported expression');
  }
  next();
  const entries = value();
  if (!(entries instanceof Map)) throw new Error('Unknown registry');
  return { entries, duplicateKeys };
}

export function inspectProducts(text, today) {
  let parsed;
  try { parsed = literalRegistry(text); } catch { return { parseStatus: 'unknown', products: [], findings: [finding('product_parser_unknown', 'src/data/products.ts', 'registry shape not recognized')] }; }
  const { entries, duplicateKeys } = parsed;
  const products = [], findings = [];
  for (const [key, body] of entries) {
    if (!(body instanceof Map)) return { parseStatus: 'unknown', products: [], findings: [finding('product_parser_unknown', 'src/data/products.ts', 'registry shape not recognized')] };
    const status = body.get('status');
    if (status === 'discontinued') continue;
    const date = body.get('lastReviewed') ?? body.get('lastVerified');
    const threshold = body.get('staleAfterDays') ?? 45;
    const ageDays = isoDate(date) ? Math.floor((Date.parse(today) - Date.parse(date)) / DAY) : null;
    const freshness = ageDays === null || ageDays < 0 || !Number.isSafeInteger(threshold) || threshold < 1 ? 'unknown' : ageDays > threshold ? 'stale' : 'within_threshold';
    const merchants = body.get('merchants') ?? [];
    if (!Array.isArray(merchants) || merchants.some((item) => !(item instanceof Map))) return { parseStatus: 'unknown', products: [], findings: [finding('product_parser_unknown', 'src/data/products.ts', 'registry shape not recognized')] };
    const approved = merchants.filter((item) => item.get('approved') === true).length;
    const pending = merchants.filter((item) => item.get('approved') === false).length;
    products.push({ key, status: status ?? null, date: date ?? null, ageDays, threshold, freshness, approvedCodeRoutes: approved, pendingCodeRoutes: pending });
    if (freshness !== 'within_threshold') findings.push(finding(`product_${freshness}`, `src/data/products.ts#${key}`, `last review ${date ?? 'unknown'}; threshold ${threshold} days`, 'freshness'));
  }
  for (const key of duplicateKeys) findings.push(finding('duplicate_product_key', `src/data/products.ts#${key}`, 'Duplicate registry key; last definition wins', 'duplicate'));
  return { parseStatus: entries.size ? 'static_registry_observed' : 'unknown', registryEntries: entries.size, duplicateKeys: [...duplicateKeys], products, findings };
}

async function readLimited(path) {
  const stat = await lstat(path);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > MAX_BYTES) throw new Error('unsupported source file');
  return readFile(path, 'utf8');
}

async function postFiles(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) result.push(...await postFiles(join(dir, entry.name)));
    else if (/\.mdx?$/.test(entry.name)) result.push(join(dir, entry.name));
  }
  return result.sort();
}

// Conservatively obey Disallow directives in every group. Unknown robots blocks crawling.
export function robotsAllows(text, pathname) {
  for (const line of text.split(/\r?\n/)) {
    const rule = line.replace(/#.*$/, '').match(/^\s*Disallow:\s*(\S*)/i)?.[1];
    if (!rule) continue;
    const escaped = rule.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$');
    if (new RegExp(`^${escaped}`).test(pathname)) return false;
  }
  return true;
}

export async function checkPublic({ request = publicGet, maxRequests = 10, budgetMs = 30_000, maxLinks = 3, today = new Date().toISOString().slice(0, 10) } = {}) {
  if (!isoDate(today)) throw new Error('Invalid sampling date');
  const deadline = Date.now() + budgetMs;
  const observations = [], seen = new Set();
  async function get(value, kind) {
    const url = safeUrl(value).href;
    if (seen.has(url) || seen.size >= maxRequests || Date.now() >= deadline) return null;
    seen.add(url);
    const controller = new AbortController();
    const remainingMs = Math.min(6000, deadline - Date.now());
    const timeout = setTimeout(() => controller.abort(), remainingMs);
    try {
      const result = await request(url, { signal: controller.signal, remainingMs });
      const observation = { url, kind, status: result.status, bytes: result.bytes, bodyDigest: hash(result.text), evidenceLevel: 'http_observation' };
      observations.push(observation);
      return result;
    } catch (error) {
      const known = ['TIMEOUT', 'NON_PUBLIC_DNS', 'BODY_LIMIT'];
      observations.push({ url, kind, status: null, error: known.includes(error.message) ? error.message : 'NETWORK_ERROR', evidenceLevel: 'http_attempt' });
      return null;
    } finally { clearTimeout(timeout); }
  }
  const robots = await get('/robots.txt', 'robots');
  if (!robots || robots.status !== 200) return { observations, requests: seen.size, crawlState: 'blocked_robots_unknown' };
  const allowed = (value) => robotsAllows(robots.text, safeUrl(value).pathname);
  const home = allowed('/') ? await get('/', 'landing') : null;
  const sitemapValues = [...robots.text.matchAll(/^Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!sitemapValues.length) sitemapValues.push('/sitemap-index.xml');
  const candidates = new Set();
  const sitemapQueue = sitemapValues.slice(0, 2);
  for (let index = 0; index < sitemapQueue.length && index < 3; index++) {
    try {
      if (!allowed(sitemapQueue[index])) continue;
      const sitemap = await get(sitemapQueue[index], 'sitemap');
      if (sitemap?.status !== 200) continue;
      const isIndex = /<sitemapindex\b/i.test(sitemap.text);
      for (const item of sitemap.text.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)) {
        try {
          const url = safeUrl(item[1].replace(/&amp;/g, '&')).href;
          if (isIndex && sitemapQueue.length < 3) sitemapQueue.push(url);
          else if (!isIndex) candidates.add(url);
        } catch { /* Never follow external or query-bearing sitemap values. */ }
      }
    } catch { /* Unsupported URL omitted. */ }
  }
  for (const item of home?.text.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi) ?? []) {
    try { const url = safeUrl(item[1]); if (!/\.(?:css|js|png|jpe?g|svg|ico|webp|woff2?)$/i.test(url.pathname)) candidates.add(url.href); } catch { /* bounded internal GETs only */ }
  }
  const eligible = [...candidates].filter((url) => !seen.has(url) && allowed(url)).sort();
  const articles = eligible.filter((url) => /^\/posts\/.+/.test(safeUrl(url).pathname));
  const otherPages = eligible.filter((url) => !/^\/posts\/.+/.test(safeUrl(url).pathname));
  // UTC day rotation is reproducible without randomness; one run cannot repeat a URL.
  const rotate = (urls) => {
    if (!urls.length) return [];
    const offset = Math.floor(Date.parse(today) / DAY) % urls.length;
    return [...urls.slice(offset), ...urls.slice(0, offset)];
  };
  const sampleCandidates = [...rotate(articles), ...rotate(otherPages)];
  let sampled = 0;
  for (const url of sampleCandidates) {
    if (sampled >= maxLinks || seen.size >= maxRequests || Date.now() >= deadline) break;
    if (seen.has(url) || !allowed(url)) continue;
    sampled++;
    await get(url, 'sampled_internal_link');
  }
  return { observations, requests: seen.size, crawlState: 'sampled', sampleDate: today, sampleStrategy: 'daily_rotating_articles_first', discoveredInternalUrls: candidates.size, sampledLinks: sampled };
}

export async function runAudit({ root = ROOT, today = new Date().toISOString().slice(0, 10), publicChecks = false, previous = null } = {}) {
  if (!isoDate(today)) throw new Error('Invalid audit date');
  const posts = [], findings = [], digests = [];
  for (const path of await postFiles(join(root, 'src/content/posts'))) {
    const source = relative(root, path).replaceAll('\\', '/');
    const text = await readLimited(path);
    digests.push([source, hash(text)]);
    const post = inspectPost(text, source, today);
    findings.push(...post.findings);
    delete post.findings;
    posts.push(post);
  }
  const registry = await readLimited(join(root, 'src/data/products.ts'));
  digests.push(['src/data/products.ts', hash(registry)]);
  const productAudit = inspectProducts(registry, today);
  findings.push(...productAudit.findings);
  const publicAudit = publicChecks ? await checkPublic({ today }) : { crawlState: 'not_requested', observations: [], requests: 0 };
  for (const observation of publicAudit.observations) {
    if (observation.status !== 200) {
      const item = finding('http_attention', observation.url, `HTTP ${observation.status ?? observation.error}`, 'status');
      item.evidenceLevel = observation.evidenceLevel;
      findings.push(item);
    }
  }
  const uniqueFindings = [...new Map(findings.map((item) => [item.id, item])).values()].sort((a, b) => a.id.localeCompare(b.id));
  const report = {
    schema: 'affiliate-operations/v1', observedAt: new Date().toISOString(), auditDate: today,
    scope: { local: ['src/content/posts/**/*.md', 'src/content/posts/**/*.mdx', 'src/data/products.ts'], publicOrigin: publicChecks ? ORIGIN : null, accounts: 'not_accessed', publisher: 'disabled', models: 'none', newPaidServices: 0 },
    limits: { maxRequests: 10, maxResponseBytes: MAX_BYTES, publicBudgetMs: 30_000, maxSampledLinks: 3, redirects: 'never_followed', publicHostAllowlist: [new URL(ORIGIN).hostname] },
    unknown: ['traffic', 'sales', 'commissions', 'account approvals', 'payment setup', 'claim supporting evidence', 'published/local content parity', 'all unsampled URLs'],
    sourceDigest: hash(JSON.stringify(digests)), posts,
    productRegistry: { ...productAudit, findings: undefined, accountApprovalEvidence: 'not_verified' },
    public: publicAudit, findings: uniqueFindings,
    summary: {
      posts: posts.length,
      activeCodeProducts: productAudit.parseStatus === 'unknown' ? null : productAudit.products.filter((p) => p.status === 'active').length,
      unverifiedCodeProducts: productAudit.parseStatus === 'unknown' ? null : productAudit.products.filter((p) => p.status === 'unverified').length,
      reviewQueueProducts: productAudit.parseStatus === 'unknown' ? null : productAudit.products.length,
      staleCodeProducts: productAudit.parseStatus === 'unknown' ? null : productAudit.products.filter((p) => p.freshness === 'stale').length,
      approvedCodeRoutes: productAudit.parseStatus === 'unknown' ? null : productAudit.products.reduce((n, p) => n + p.approvedCodeRoutes, 0),
      findings: uniqueFindings.length,
    },
  };
  report.changes = compare(previous, report);
  return report;
}

async function main(args) {
  let output, previousPath, publicChecks = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--public') publicChecks = true;
    else if (args[i] === '--output' && args[i + 1]) output = args[++i];
    else if (args[i] === '--previous' && args[i + 1]) previousPath = args[++i];
    else if (args[i] === '--help') { console.log('node scripts/affiliate-ops.mjs [--public] [--previous report.json] [--output NEW-report.json]'); return; }
    else throw new Error('Unknown or incomplete argument');
  }
  let previous = null;
  if (previousPath) {
    if (!/\.json$/i.test(previousPath) || /(?:^|[\\/])(?:client_secret|password|token|auth|secret)/i.test(previousPath)) throw new Error('Unsupported previous report path');
    previous = JSON.parse(await readLimited(resolve(previousPath)));
    if (previous.schema !== 'affiliate-operations/v1' || !Array.isArray(previous.findings)) throw new Error('Invalid previous report');
    if (Boolean(previous.scope.publicOrigin) !== publicChecks) throw new Error('Previous report must have the same public/local scope');
  }
  const report = await runAudit({ publicChecks, previous });
  const json = `${JSON.stringify(report, null, 2)}\n`;
  if (output) {
    if (!/\.json$/i.test(output)) throw new Error('Output must be a new JSON file');
    // Existing files (including symlinks) are never overwritten. Parent directory must exist.
    await writeFile(resolve(output), json, { flag: 'wx', mode: 0o600 });
  } else process.stdout.write(json);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch(() => { console.error('Affiliate audit failed; check arguments, source files, or report path. No credentials were read.'); process.exitCode = 1; });
}
