# Indexing Checklist

One-time setup items. Check off as you complete them.

## Google Search Console

- [ ] Domain property verified: `brewtested.pulsedash-app.com`
  - Go to: https://search.google.com/search-console/
  - Add property → Domain → enter `brewtested.pulsedash-app.com`
  - Verify via DNS TXT record (your DNS registrar panel)
- [ ] Sitemap submitted: `https://brewtested.pulsedash-app.com/sitemap-index.xml`
  - In GSC: Sitemaps → enter URL → Submit
- [ ] Homepage URL inspected and "Request indexing" clicked
  - GSC → URL Inspection → `https://brewtested.pulsedash-app.com/`
- [ ] Top money pages "Request indexing" clicked (do 10 per day max)

## Priority URL inspection order

1. `https://brewtested.pulsedash-app.com/`
2. `https://brewtested.pulsedash-app.com/espresso/`
3. `https://brewtested.pulsedash-app.com/posts/gaggia-classic-pro-vs-breville-bambino-plus/`
4. `https://brewtested.pulsedash-app.com/posts/best-grinder-for-breville-bambino-plus/`
5. `https://brewtested.pulsedash-app.com/posts/best-grinder-for-gaggia-classic-pro/`
6. `https://brewtested.pulsedash-app.com/data/espresso-setup-matrix/`
7. `https://brewtested.pulsedash-app.com/data/grinder-pairing-matrix/`
8. `https://brewtested.pulsedash-app.com/posts/baratza-encore-esp-vs-sette-270/`
9. `https://brewtested.pulsedash-app.com/posts/best-home-espresso-setup-beginners/`
10. `https://brewtested.pulsedash-app.com/posts/best-espresso-machine-under-300/`

## Bing Webmaster Tools

- [ ] Site verified: https://www.bing.com/webmasters/
  - Add site → verify via XML file OR DNS record
- [ ] Sitemap submitted to Bing
- [ ] IndexNow key verified
  - Key: `e7f3a8d2c5b1e4f9a6d0b3c8f2e5a9d1`
  - Key file URL: `https://brewtested.pulsedash-app.com/e7f3a8d2c5b1e4f9a6d0b3c8f2e5a9d1.txt`
  - Test: `curl https://brewtested.pulsedash-app.com/e7f3a8d2c5b1e4f9a6d0b3c8f2e5a9d1.txt`

## IndexNow (automated)

- [x] Key file created: `public/e7f3a8d2c5b1e4f9a6d0b3c8f2e5a9d1.txt`
- [x] Submit script: `scripts/indexnow-submit.mjs`
- [ ] Run after each deploy: `pnpm submit:indexnow`

## Analytics

- [ ] Plausible goals configured: outbound clicks on amazon.com links
- [ ] Amazon Associates: product links report enabled
- [ ] Email form: submission confirmed in Plausible or ConvertKit

## Status

Last updated: 2026-05-19
