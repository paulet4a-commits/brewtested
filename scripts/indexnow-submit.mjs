/**
 * IndexNow submission script.
 * Submits top money pages to IndexNow API (Bing + Yandex pick it up).
 * Run after deploy: pnpm submit:indexnow
 */

const HOST = 'brewtested.pulsedash-app.com';
const KEY = 'e7f3a8d2c5b1e4f9a6d0b3c8f2e5a9d1';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const TOP_URLS = [
  '/',
  '/espresso/',
  '/methodology/',
  '/llms.txt',
  '/data/espresso-setup-matrix/',
  '/data/grinder-pairing-matrix/',
  '/data/coffee-gear-complaint-index/',
  '/posts/gaggia-classic-pro-vs-breville-bambino-plus/',
  '/posts/best-grinder-for-breville-bambino-plus/',
  '/posts/best-grinder-for-gaggia-classic-pro/',
  '/posts/baratza-encore-esp-vs-sette-270/',
  '/posts/best-home-espresso-setup-beginners/',
  '/posts/best-espresso-machine-under-300/',
  '/posts/best-espresso-grinder-under-200/',
  '/posts/best-espresso-grinder-under-300/',
].map((path) => `https://${HOST}${path}`);

async function submitIndexNow() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: TOP_URLS,
  };

  console.log(`Submitting ${TOP_URLS.length} URLs to IndexNow...`);
  console.log('Payload:', JSON.stringify(payload, null, 2));

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (response.ok || response.status === 202) {
    console.log(`✓ IndexNow accepted: HTTP ${response.status}`);
  } else {
    const body = await response.text().catch(() => '');
    console.error(`✗ IndexNow failed: HTTP ${response.status} — ${body}`);
    process.exit(1);
  }
}

submitIndexNow().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
