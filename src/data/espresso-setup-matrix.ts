export interface EspressoSetup {
  tier: string;
  budgetRange: string;
  machine: { name: string; price: number; productKey: string };
  grinder: { name: string; price: number; productKey: string };
  accessories: string[];
  totalEstimate: number;
  bestUserProfile: string;
  upgradePathFrom?: string;
  upgradePathTo?: string;
  notes: string;
  lastReviewed: string;
}

export const espressoSetupMatrix: EspressoSetup[] = [
  {
    tier: 'Entry',
    budgetRange: '$400–500',
    machine: { name: 'Breville Bambino Plus', price: 450, productKey: 'breville-bambino-plus' },
    grinder: { name: 'Baratza Encore ESP', price: 170, productKey: 'baratza-encore-esp' },
    accessories: ['Kitchen scale ($15)', 'WDT tool ($15)'],
    totalEstimate: 650,
    bestUserProfile: 'First-time home espresso, makes milk drinks daily, wants quick results',
    upgradePathTo: 'Intermediate',
    notes: 'Bambino Plus auto steam wand handles microfoam without technique. Good shots in 30–50 attempts. Encore ESP matches machine quality tier without over-investing.',
    lastReviewed: '2026-05-19',
  },
  {
    tier: 'Entry (manual enthusiast)',
    budgetRange: '$450–550',
    machine: { name: 'Gaggia Classic Pro', price: 450, productKey: 'gaggia-classic-pro' },
    grinder: { name: 'Baratza Encore ESP', price: 170, productKey: 'baratza-encore-esp' },
    accessories: ['Kitchen scale ($15)', 'WDT tool ($15)', 'Distribution tool ($25)'],
    totalEstimate: 675,
    bestUserProfile: 'First-time espresso, willing to learn manual technique, plans long-term ownership',
    upgradePathTo: 'Intermediate',
    notes: 'Gaggia Classic Pro takes 100+ shots to consistency vs Bambino\'s 30–50. Reward: 10–15 year lifespan, full modability, 58mm commercial portafilter. Add PID mod (~$50) for temperature stability.',
    lastReviewed: '2026-05-19',
  },
  {
    tier: 'Intermediate',
    budgetRange: '$600–750',
    machine: { name: 'Gaggia Classic Pro', price: 450, productKey: 'gaggia-classic-pro' },
    grinder: { name: 'Eureka Mignon Specialità', price: 185, productKey: 'eureka-mignon-specialita' },
    accessories: ['Kitchen scale ($20)', 'WDT tool ($15)', 'Bottomless portafilter ($25)', 'Puck screen ($15)'],
    totalEstimate: 710,
    bestUserProfile: '3–6 months into espresso, wants flat-burr clarity, quiet kitchen, keeper grinder',
    upgradePathFrom: 'Entry',
    upgradePathTo: 'Advanced',
    notes: 'Eureka Mignon Specialità: near-silent, under 0.2g retention, flat 55mm burrs. The grinder you keep when you eventually upgrade the machine. Outperforms Encore ESP noticeably at this stage.',
    lastReviewed: '2026-05-19',
  },
  {
    tier: 'Intermediate (precision)',
    budgetRange: '$700–850',
    machine: { name: 'Gaggia Classic Pro', price: 450, productKey: 'gaggia-classic-pro' },
    grinder: { name: 'Baratza Sette 270', price: 320, productKey: 'baratza-sette-270' },
    accessories: ['Kitchen scale ($20)', 'WDT tool ($15)', 'Bottomless portafilter ($25)'],
    totalEstimate: 830,
    bestUserProfile: 'Daily puller (2+ shots), repeatability priority, willing to tolerate noise',
    upgradePathFrom: 'Entry',
    notes: 'Sette 270: 270 micro-steps, 4-second grind, direct portafilter, near-zero retention. Loud (~90dB). Best grinder under $400 for high-frequency espresso production.',
    lastReviewed: '2026-05-19',
  },
  {
    tier: 'Budget flat burr',
    budgetRange: '$350–450',
    machine: { name: 'Breville Bambino', price: 300, productKey: 'breville-bambino' },
    grinder: { name: 'DF64 Gen 2', price: 130, productKey: 'df64-gen2' },
    accessories: ['Kitchen scale ($15)', 'WDT tool ($15)', 'Distribution tool ($25)'],
    totalEstimate: 485,
    bestUserProfile: 'Budget-conscious, wants flat-burr flavor, comfortable with hands-on workflow',
    notes: 'DF64 Gen 2 delivers 64mm flat burrs at $130 — unusual for the price. Near-zero retention, single-dose design. Requires bellows, QC varies unit-to-unit. Best flat-burr value if you verify alignment on arrival.',
    lastReviewed: '2026-05-19',
  },
  {
    tier: 'Minimalist / apartment',
    budgetRange: '$500–600',
    machine: { name: 'Breville Bambino Plus', price: 450, productKey: 'breville-bambino-plus' },
    grinder: { name: '1Zpresso JX-Pro', price: 200, productKey: '1zpresso-jx-pro' },
    accessories: ['Kitchen scale ($15)'],
    totalEstimate: 665,
    bestUserProfile: '1–2 shots per day, noise-sensitive, small kitchen, wants silent morning workflow',
    notes: '1Zpresso JX-Pro is silent and produces grind quality rivaling $300 electric grinders. Trade-off: 45–60 seconds of hand-grinding per dose. Bambino Plus auto steam wand handles milk without noise.',
    lastReviewed: '2026-05-19',
  },
];
