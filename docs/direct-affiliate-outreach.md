# Direct Affiliate Outreach Tracker

Goal: Replace Amazon fallback (3-4% commission, 24h cookie) with direct merchant programs
(8-12% commission, 30-90 day cookies) on all high-AOV espresso/grinder pages.

## Priority Matrix

| Merchant | Program | Commission | Cookie | AOV | Priority |
|----------|---------|-----------|--------|-----|----------|
| Whole Latte Love | Impact.com | ~8% | 30d | $300+ | P0 |
| Seattle Coffee Gear | CJ/direct | ~8% | 30d | $250+ | P0 |
| Prima Coffee | ShareASale | ~8% | 30d | $200+ | P1 |
| Fellow | Fellow.com/affiliates | ~10% | 30d | $100+ | P1 |
| 1st in Coffee | CJ | ~8% | 45d | $200+ | P1 |
| Trade Coffee | Impact.com | ~10% | 30d | $50/sub | P2 |
| Volcanica Coffee | ShareASale | ~10% | 30d | $20 | P3 |
| Lifeboost Coffee | Impact.com | ~15% | 30d | $50 | P2 |

## Application Log

### Whole Latte Love
- **Program URL:** https://www.wholelattelove.com/pages/affiliate-program
- **Network:** Impact.com
- **Status:** APPLIED — PENDING APPROVAL
- **Applied:** 2026-05-19
- **Approved:** —
- **Commission:** ~8%
- **Cookie:** 30 days
- **Notes:** Application started via Impact.com. Awaiting phone SMS verification from user.
- **Next action:** User completes SMS verification → application submits → wait 3-5 business days

### Seattle Coffee Gear
- **Program URL:** https://www.seattlecoffeegear.com/affiliates
- **Network:** CJ Affiliate
- **Status:** NOT YET APPLIED
- **Applied:** —
- **Approved:** —
- **Commission:** ~8%
- **Cookie:** 30 days
- **Notes:** —
- **Next action:** Apply via CJ Affiliate network

### Prima Coffee
- **Program URL:** https://prima-coffee.com/affiliate
- **Network:** ShareASale
- **Status:** NOT YET APPLIED
- **Applied:** —
- **Approved:** —
- **Commission:** ~8%
- **Cookie:** 30 days
- **Notes:** High-quality specialty espresso equipment. Good fit for Gaggia/Rancilio pages.
- **Next action:** Apply via ShareASale network

### Fellow
- **Program URL:** https://fellowproducts.com/pages/affiliate-program
- **Network:** Impact.com
- **Status:** NOT YET APPLIED
- **Applied:** —
- **Approved:** —
- **Commission:** ~10%
- **Cookie:** 30 days
- **Notes:** Fellow Opus is featured product in multiple grinder pages.
- **Next action:** Apply via Impact.com

### 1st in Coffee
- **Program URL:** https://www.1stincoffee.com/affiliate.asp
- **Network:** CJ Affiliate
- **Status:** NOT YET APPLIED
- **Applied:** —
- **Approved:** —
- **Commission:** ~8%
- **Cookie:** 45 days
- **Notes:** —
- **Next action:** Apply via CJ Affiliate

### Trade Coffee
- **Program URL:** https://www.drinktrade.com/pages/affiliate
- **Network:** Impact.com
- **Status:** NOT YET APPLIED
- **Applied:** —
- **Approved:** —
- **Commission:** ~10% + recurring sub
- **Cookie:** 30 days
- **Notes:** Subscription model — recurring commissions possible.
- **Next action:** Apply via Impact.com

### Volcanica Coffee
- **Program URL:** https://volcanicacoffee.com/pages/affiliate-program
- **Network:** ShareASale
- **Status:** NOT YET APPLIED
- **Applied:** —
- **Approved:** —
- **Commission:** ~10%
- **Cookie:** 30 days
- **Notes:** Lower AOV ($20-40). Lower priority than equipment merchants.
- **Next action:** Apply via ShareASale

### Lifeboost Coffee
- **Program URL:** https://lifeboostcoffee.com/pages/affiliate-program
- **Network:** Impact.com
- **Status:** APPLIED — PENDING APPROVAL
- **Applied:** 2026-05-19
- **Approved:** —
- **Commission:** ~15%
- **Cookie:** 30 days
- **Notes:** High commission rate but lower AOV. Good for coffee subscription angle.
- **Next action:** Await approval

## Activating a Merchant (when approved)

1. Open `src/data/products.ts`
2. Find the product(s) that merchant sells
3. Change `approved: false` → `approved: true` on that merchant's entry
4. Run `pnpm build` — ProductCard and AffiliateButton automatically route to direct merchant
5. Verify with `pnpm build` that audit passes
6. Commit: `feat: activate [merchant] direct affiliate routing`

No code changes needed — only the `approved` flag flip.

## Revenue Math

Amazon baseline (espresso machine, $450 AOV):
- Commission: 3% = **$13.50/sale**

Whole Latte Love direct ($450 AOV):
- Commission: 8% = **$36/sale**
- Cookie: 30 days vs 24 hours
- Uplift: **+$22.50/sale (+167%)**

At 20 sales/month: Amazon = $270/mo → Direct = $720/mo
At 50 sales/month: Amazon = $675/mo → Direct = $1,800/mo
