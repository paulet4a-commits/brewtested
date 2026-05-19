export type ComplaintCategory = 'noise' | 'retention' | 'durability' | 'qc-variance' | 'workflow' | 'learning-curve' | 'maintenance' | 'build-quality' | 'performance';

export interface ProductComplaint {
  productKey: string;
  productName: string;
  category: string;
  complaints: {
    category: ComplaintCategory;
    summary: string;
    frequencyLabel: 'common' | 'occasional' | 'rare';
    isDesignTradeoff?: boolean;
  }[];
  avoidIf: string[];
  maintenanceRisk: 'low' | 'medium' | 'high';
  confidence: 'high' | 'medium' | 'low';
  sourceTypes: string[];
  lastReviewed: string;
}

export const complaintIndex: ProductComplaint[] = [
  {
    productKey: 'baratza-encore-esp',
    productName: 'Baratza Encore ESP',
    category: 'grinder',
    complaints: [
      {
        category: 'retention',
        summary: '0.5–1g of grounds remain in the chute between doses; stale grounds mix into next dose',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'noise',
        summary: 'Motor noise louder than expected for home use; disruptive in quiet mornings',
        frequencyLabel: 'common',
      },
      {
        category: 'learning-curve',
        summary: 'Stepless macro + stepped micro adjustment has a learning curve for new espresso users',
        frequencyLabel: 'occasional',
      },
    ],
    avoidIf: ['You rotate between beans daily and need near-zero retention', 'Early morning grinding in shared living spaces'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'Baratza community forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'baratza-sette-270',
    productName: 'Baratza Sette 270',
    category: 'grinder',
    complaints: [
      {
        category: 'noise',
        summary: 'Loudest grinder in its class (~90dB); disruptive in apartments and early mornings',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'maintenance',
        summary: 'Burrs require replacement at 300–500kg; small hopper needs frequent refilling for 2+ person households',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'qc-variance',
        summary: 'Some units arrive with burr alignment issues worth checking on receipt',
        frequencyLabel: 'occasional',
      },
    ],
    avoidIf: ['Noise-sensitive environment', 'Early morning grinding in apartments', 'Still learning espresso basics (precision advantage not yet tangible)'],
    maintenanceRisk: 'medium',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'Home-Barista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'eureka-mignon-specialita',
    productName: 'Eureka Mignon Specialità',
    category: 'grinder',
    complaints: [
      {
        category: 'workflow',
        summary: 'Timer-based dosing requires calibration to get consistent dose weight',
        frequencyLabel: 'common',
      },
      {
        category: 'workflow',
        summary: 'Single-dose workflow not as intuitive as dial-up hoppers; requires dosing funnel',
        frequencyLabel: 'occasional',
      },
      {
        category: 'learning-curve',
        summary: 'Flat burrs take ~1kg to season before reaching peak performance',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Budget under $150 (DF64 Gen 2 gets flat burrs for $55 less)', 'Casual user who wants simple push-button workflow'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'Home-Barista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'df64-gen2',
    productName: 'DF64 Gen 2',
    category: 'grinder',
    complaints: [
      {
        category: 'qc-variance',
        summary: 'Burr alignment varies unit-to-unit; worth checking on arrival and returning if off',
        frequencyLabel: 'occasional',
      },
      {
        category: 'workflow',
        summary: 'Bellows required to clear retention adds a step to every dose; not hands-off',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'learning-curve',
        summary: 'Dial-in is very sensitive; tiny adjustments have large flavor effects',
        frequencyLabel: 'common',
      },
      {
        category: 'build-quality',
        summary: 'Build quality is functional but not premium; feels cheaper than Eureka Mignon',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Want hands-off workflow', 'Build quality is a priority', 'New to espresso dialing (steep learning curve)'],
    maintenanceRisk: 'medium',
    confidence: 'medium',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'YouTube reviews'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: '1zpresso-jx-pro',
    productName: '1Zpresso JX-Pro',
    category: 'grinder',
    complaints: [
      {
        category: 'workflow',
        summary: '40–60 rotations per dose is tiring for daily use; not practical for 2+ shots per session',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'learning-curve',
        summary: 'Adjustment ring click-to-grind-size mapping requires logging shots to master',
        frequencyLabel: 'occasional',
      },
      {
        category: 'maintenance',
        summary: 'Adjustment collar can slip under heavy daily use',
        frequencyLabel: 'rare',
      },
    ],
    avoidIf: ['Making 2+ shots per session', 'Wrist or hand fatigue concerns', 'Household of 2+ who all drink espresso'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'HomeBarista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'breville-bambino-plus',
    productName: 'Breville Bambino Plus',
    category: 'espresso-machine',
    complaints: [
      {
        category: 'durability',
        summary: 'Typical lifespan 5–8 years; less repairable than Gaggia Classic Pro with fewer available parts',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
      {
        category: 'performance',
        summary: 'Shot quality ceiling lower than Gaggia Classic Pro long-term; limits progression for advanced users',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Planning 10+ year ownership', 'Want to mod or fully repair the machine yourself', 'Interested in espresso craft long-term rather than convenience'],
    maintenanceRisk: 'low',
    confidence: 'medium',
    sourceTypes: ['Amazon verified reviews', 'r/espresso'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'gaggia-classic-pro',
    productName: 'Gaggia Classic Pro',
    category: 'espresso-machine',
    complaints: [
      {
        category: 'learning-curve',
        summary: 'Takes 100+ shots to reach consistent quality; no PID from factory means temperature variation shot-to-shot',
        frequencyLabel: 'common',
      },
      {
        category: 'learning-curve',
        summary: 'Manual steam wand takes 2–4 weeks to learn for milk drinks',
        frequencyLabel: 'common',
      },
      {
        category: 'maintenance',
        summary: 'Heat-up takes 25–30 seconds; needs temperature surfing or PID mod ($50) for precision',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Want consistent results within first month', 'Make milk drinks daily and want auto steam', 'Not willing to invest in the PID mod for temperature precision'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'Home-Barista forums', 'GaggiaClassicPro subreddit'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'breville-smart-grinder-pro',
    productName: 'Breville Smart Grinder Pro',
    category: 'grinder',
    complaints: [
      {
        category: 'performance',
        summary: 'Stepped adjustment (60 settings) limits fine-tuning vs stepless grinders; gaps between steps noticeable',
        frequencyLabel: 'common',
      },
      {
        category: 'workflow',
        summary: 'Static buildup in dry climates causes grounds to scatter',
        frequencyLabel: 'occasional',
      },
      {
        category: 'performance',
        summary: 'Grind timer drifts slightly as burrs warm up during a session',
        frequencyLabel: 'occasional',
      },
    ],
    avoidIf: ['Serious about precision dialing', 'Already experienced with stepless grinders'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso'],
    lastReviewed: '2026-05-19',
  },
];
