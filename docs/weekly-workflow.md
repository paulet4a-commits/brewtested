# Weekly Operations Workflow — BrewTested

Target: $5k/month affiliate revenue
Stack: Astro + GitHub Pages + Amazon Associates + Direct affiliates (pending)

---

## Monday — GSC + Analytics Review (30 min)

1. **Google Search Console:**
   - Check "Performance" → last 28 days
   - Sort by impressions, find pages with >100 impressions + <2% CTR
   - These need title/meta rewrites (high visibility, low click = title mismatch)
   - Target: rewrite 2-3 titles per week

2. **Plausible Analytics:**
   - Check "Affiliate Click" custom event goal (set up at plausible.io → Goals)
   - Which pages have most affiliate clicks?
   - Which products are clicked most?
   - Pages with high traffic + low clicks = CTA placement issue

3. **Action:** Update `docs/reports/gsc-YYYY-MM-DD.md` with top opportunities

---

## Tuesday — Claim Cleanup (20 min)

```bash
cd /c/workspace/affiliate-system/site
pnpm audit:claims 2>&1 | tee docs/reports/claims-$(date +%Y-%m-%d).md
```

- Review new flags
- Fix any MUST FIX items immediately (fake testing claims)
- Batch SOFTEN items — fix 3-5 per week
- Update `docs/reports/claim-audit-YYYY-MM-DD.md`

---

## Wednesday — Traffic Asset Publish (60 min)

1. **Pinterest:**
   - Pick one money page from `docs/traffic-packs/`
   - Generate image: `https://image.pollinations.ai/prompt/[encoded]?model=flux&width=1000&height=1500&nologo=true`
   - Post 1 pin using pin-builder/?tab=save_from_url
   - Schedule: 1 pin/day Mon-Fri for the week

2. **Reddit:**
   - Check r/espresso, r/Coffee for threads matching money page topics
   - Post 1 helpful answer from `docs/traffic-packs/` drafts
   - Never post affiliate links directly — link to site only when directly relevant
   - Account: u/BrewTestedReviews

3. **YouTube Shorts (if available):**
   - Record 1 Short using script from `docs/traffic-packs/`
   - Upload to YouTube, link in bio to `/espresso/`

---

## Thursday — Affiliate Outreach (30 min)

1. Check `docs/direct-affiliate-outreach.md` for pending applications
2. Follow up on any applications >7 days old with no response
3. For new merchants: apply via Impact.com / CJ / ShareASale

4. **When approval comes in:**
   ```bash
   # In src/data/products.ts, for that merchant's products:
   # Change: approved: false
   # To:     approved: true
   cd /c/workspace/affiliate-system/site
   pnpm build  # verify routing audit passes
   git add -p && git commit -m "feat: activate [merchant] direct affiliate routing"
   git push origin main
   ```

5. Run affiliate status report:
   ```bash
   pnpm report:affiliate
   ```

---

## Friday — Revenue Routing Audit (15 min)

```bash
cd /c/workspace/affiliate-system/site
pnpm build  # all 3 audits run automatically
pnpm report:affiliate  # merchant routing dashboard
pnpm audit:claims      # claim quality check
```

Review:
- Are any high-AOV products still Amazon-only that should have staged merchants?
- Are any recently approved merchants not yet in products.ts?
- Any build failures from the gates?

Update `docs/direct-affiliate-outreach.md` with latest status.

---

## Monthly — Content Audit (2 hours)

1. **Stale content:**
   ```bash
   pnpm audit:products  # flags products not reviewed in 30-45 days
   ```
   Update `lastReviewed` dates for money-page products.

2. **Internal links:**
   - Every espresso/grinder page should link to `/espresso/`
   - At least 5 internal links per money page

3. **Traffic pack coverage:**
   - Which money pages still have no traffic pack? Create one.
   - Which packs have been published? Mark in tracker.

4. **Noindex review:**
   - Any noindex pages that have improved in quality and should be re-indexed?
   - Any new duplicate/thin pages that should be noindexed?

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm build` | Full build with all 3 audit gates |
| `pnpm audit:keys` | Check productKey references in posts |
| `pnpm audit:products` | Check stale products |
| `pnpm audit:affiliate` | Check raw affiliate links in .mdx |
| `pnpm audit:claims` | Check risky phrases (warn-only) |
| `pnpm report:affiliate` | Merchant routing status dashboard |

## Revenue Targets

| Month | Sales Target | Revenue Target | Key Milestone |
|-------|-------------|----------------|---------------|
| Month 1 | 5 sales | $200-400 | First Amazon conversion |
| Month 2 | 20 sales | $800-1,500 | First direct affiliate live |
| Month 3 | 50 sales | $2,000-3,500 | Pinterest traffic meaningful |
| Month 6 | 150 sales | $5,000+ | Direct affiliates primary source |
