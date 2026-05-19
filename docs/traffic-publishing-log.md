# Traffic Publishing Log

Tracks all social/platform posts with public URLs and click data.
Update 24h clicks column the following day.

| Date | Platform | Public URL | Promoted Page | Asset Used | Account | Status | 24h Clicks | Notes |
|------|----------|-----------|---------------|------------|---------|--------|------------|-------|
| 2026-05-18 | Pinterest | — | /posts/gaggia-classic-pro-vs-breville-bambino-plus/ | Pollinations.ai OG image (1000×1500) | paulet4a5 | BLOCKED | — | "İsteğiniz tamamlanamadı" save error; Pinterest blocking save API for github.io domain |
| 2026-05-18 | Pinterest | — | /posts/baratza-encore-esp-vs-sette-270/ | Pollinations.ai OG image (1000×1500) | paulet4a5 | BLOCKED | — | Same save error; image scraping works, save API call fails |
| 2026-05-18 | Reddit | https://www.reddit.com/r/espresso/ | /posts/gaggia-classic-pro-vs-breville-bambino-plus/ | traffic-pack Reddit drafts | u/BrewTestedReviews | POSTED | — | Phase 1 (no links). Comment on beginner machine thread. |
| 2026-05-18 | Reddit | https://www.reddit.com/r/espresso/ | /posts/gaggia-classic-pro-vs-breville-bambino-plus/ | traffic-pack Reddit drafts | u/BrewTestedReviews | POSTED | — | Comment on Gaggia vs Bambino comparison thread. |

---

## Weekly Traffic Report

### Week of 2026-05-12 to 2026-05-18

| Metric | Value | Notes |
|--------|-------|-------|
| Total pages | 161+ | Deployed via GitHub Pages |
| Pinterest pins | 31 | Board: Coffee & Kitchen Gear Reviews |
| Reddit comments | 2 | r/espresso — Phase 1, no links |
| Plausible sessions | — | Check plausible.io/brewtested.pulsedash-app.com |
| Amazon clicks | — | Check Amazon Associates dashboard |
| Amazon sales | 0 | Week 1 target: 5 |

### Week of 2026-05-19 to 2026-05-25

| Metric | Value | Notes |
|--------|-------|-------|
| Pinterest pins added | 0 | Save API blocked — investigate domain/account restriction |
| Reddit comments | — | Continue Phase 1 commenting |
| New content deployed | 3 | best-grinder-for-breville-bambino-plus, baratza-encore-esp-vs-sette-270, best-espresso-grinder-under-300 |

---

## Pinterest Block Investigation

**Symptom:** "Üzgünüz! İsteğiniz tamamlanamadı." on Kaydet (Save) click
**Image scrape:** Works (Pollinations.ai portrait images loading correctly)
**Board/Title:** All set correctly
**Possible causes:**
1. `paulet4a-commits.github.io` domain flagged by Pinterest spam filters
2. Account temporarily rate-limited from previous session retry loops
3. Pinterest API maintenance window (around 00:40 UTC)

**Next steps:**
- Try again after 24h cooldown
- Try creating pin with Pollinations.ai image URL directly (Boş Pin flow + manual image URL)
- If still blocked, check Pinterest account standing at pinterest.com/settings/
