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
  {
    productKey: 'fellow-opus',
    productName: 'Fellow Opus',
    category: 'grinder',
    complaints: [
      {
        category: 'qc-variance',
        summary: 'Early units had retention issues and grind inconsistency; later production improved but QC is less consistent than Baratza',
        frequencyLabel: 'occasional',
      },
      {
        category: 'workflow',
        summary: 'Catch cup alignment requires care; grounds can miss if not centered',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
      {
        category: 'learning-curve',
        summary: 'Dual-mode (espresso/brew) adjustment ring can confuse new users switching between brew methods',
        frequencyLabel: 'occasional',
      },
    ],
    avoidIf: ['Want guaranteed Baratza-level QC consistency', 'Single-use espresso-only workflow (DF64 Gen 2 is better value)'],
    maintenanceRisk: 'low',
    confidence: 'medium',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'Fellow community'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'niche-zero',
    productName: 'Niche Zero',
    category: 'grinder',
    complaints: [
      {
        category: 'workflow',
        summary: 'Single-dose workflow requires bellows or RDT; grind retention is near-zero but burrs need clearing between beans',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
      {
        category: 'build-quality',
        summary: 'Plastic hopper feels inconsistent with the premium price point',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'performance',
        summary: 'Conical burr flavor profile preferred by some; others prefer flat burr brightness — not a defect but worth knowing',
        frequencyLabel: 'rare',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Budget under $600 (price point is hard to justify for beginners)', 'Prefer flat burr flavor profile'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['r/espresso', 'Home-Barista forums', 'YouTube reviews'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'delonghi-dedica-ec685',
    productName: "De'Longhi Dedica EC685",
    category: 'espresso-machine',
    complaints: [
      {
        category: 'performance',
        summary: 'Stock pressurized basket limits shot quality ceiling; requires unpressurized basket mod ($10–$20) for real espresso dialing',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'workflow',
        summary: 'Narrow 51mm portafilter limits tamper and basket accessory options',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'maintenance',
        summary: 'Steam wand panarello tip needs regular cleaning; clogs if milk residue builds up',
        frequencyLabel: 'occasional',
      },
    ],
    avoidIf: ['Want dialing precision without mods', 'Already experienced with 58mm portafilter ecosystem'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'Home-Barista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'breville-barista-express',
    productName: 'Breville Barista Express',
    category: 'espresso-machine',
    complaints: [
      {
        category: 'performance',
        summary: 'Built-in grinder is convenient but limits grind quality ceiling vs standalone burr grinders at same price',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'maintenance',
        summary: 'Two machines in one means more failure points; grinder and machine cannot be serviced independently',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
      {
        category: 'durability',
        summary: 'Grinder burrs need replacement at 500–800kg use; internal access more complex than standalone grinder',
        frequencyLabel: 'occasional',
      },
    ],
    avoidIf: ['Want to upgrade grinder independently', 'Plan to own 8+ years', 'Already own a good standalone grinder'],
    maintenanceRisk: 'medium',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'Home-Barista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'rancilio-silvia',
    productName: 'Rancilio Silvia',
    category: 'espresso-machine',
    complaints: [
      {
        category: 'learning-curve',
        summary: 'Single boiler with no PID requires temperature surfing; shot-to-shot temp variance is high without $150–$200 PID mod',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'maintenance',
        summary: '10–15 minute warm-up time needed for thermal stability; longer than most competitors',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'performance',
        summary: 'With PID mod it competes with machines twice the price; without it, shot consistency suffers',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Not willing to do PID mod', 'Want consistent results without technique investment', 'Morning time pressure (long warm-up)'],
    maintenanceRisk: 'medium',
    confidence: 'high',
    sourceTypes: ['r/espresso', 'Home-Barista forums', 'RancilioSilvia subreddit'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'lelit-mara-x',
    productName: 'Lelit Mara X',
    category: 'espresso-machine',
    complaints: [
      {
        category: 'learning-curve',
        summary: 'E61 heat exchanger has a learning curve for flush timing; pulling back-to-back milk drinks requires workflow adjustment',
        frequencyLabel: 'occasional',
      },
      {
        category: 'maintenance',
        summary: 'Group head requires regular backflushing; more maintenance than thermoblock machines',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'qc-variance',
        summary: 'Some units arrive with minor leaks from group head gasket; inspect on delivery',
        frequencyLabel: 'rare',
      },
    ],
    avoidIf: ['Not willing to learn flush timing for milk drinks', 'Want zero-maintenance operation'],
    maintenanceRisk: 'medium',
    confidence: 'medium',
    sourceTypes: ['r/espresso', 'Home-Barista forums', 'LaMarzoccoHome community'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'eureka-mignon-silenzio',
    productName: 'Eureka Mignon Silenzio',
    category: 'grinder',
    complaints: [
      {
        category: 'performance',
        summary: 'Stepped adjustment (macro-only) has fewer micro-adjustment options than Specialità; harder to fine-tune',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'workflow',
        summary: 'Timer-based dosing requires regular recalibration as burrs heat during session',
        frequencyLabel: 'occasional',
      },
    ],
    avoidIf: ['Need stepless fine-tuning (upgrade to Specialità)', 'Single-dose workflow — not optimized for it'],
    maintenanceRisk: 'low',
    confidence: 'medium',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'Home-Barista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'timemore-chestnut-c3',
    productName: 'Timemore Chestnut C3',
    category: 'grinder',
    complaints: [
      {
        category: 'performance',
        summary: 'Espresso range is limited; designed more for pour-over/AeroPress; struggles below 1.5 clicks for espresso fine-tuning',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'workflow',
        summary: '25–35 turns per dose; less effort than JX-Pro but still tiring for 2+ shots',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Primary use is espresso (1Zpresso JX-Pro is better optimized)', 'Making multiple shots per session'],
    maintenanceRisk: 'low',
    confidence: 'medium',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'YouTube reviews'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'comandante-c40',
    productName: 'Comandante C40',
    category: 'grinder',
    complaints: [
      {
        category: 'workflow',
        summary: '40–50 turns per dose for espresso; premium hand grinder but still tiring for daily multi-shot use',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'performance',
        summary: 'Optimized for filter/pour-over; espresso requires very fine setting that some units struggle to reach consistently',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Espresso is primary brew method', 'Making 2+ shots daily', 'Budget-conscious (1Zpresso JX-Pro matches at $100 less)'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['r/espresso', 'r/coffee', 'Home-Barista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'moccamaster-kbgv',
    productName: 'Moccamaster KBGV',
    category: 'drip-coffee-maker',
    complaints: [
      {
        category: 'build-quality',
        summary: 'Plastic carafe lid is the most common breakage point; replacement available but adds cost',
        frequencyLabel: 'occasional',
      },
      {
        category: 'workflow',
        summary: 'No programmable timer — must be started manually; not ideal for automated morning routines',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'performance',
        summary: 'Brews at 196–205°F (optimal range) but no temperature adjustment — some prefer cooler brew for lighter roasts',
        frequencyLabel: 'rare',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Want programmable brew timer', 'Budget under $250 (cheaper drip makers produce comparable results for most users)'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/coffee', 'Home-Barista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'aeropress',
    productName: 'AeroPress',
    category: 'brewing-device',
    complaints: [
      {
        category: 'workflow',
        summary: 'Manual process requires presence; not hands-off for busy mornings',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'performance',
        summary: 'Single cup only; brewing for 2+ requires multiple cycles',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Brewing for 2+ people regularly', 'Want fully automated morning routine'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/coffee', 'AeroPress community'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'hario-v60',
    productName: 'Hario V60',
    category: 'brewing-device',
    complaints: [
      {
        category: 'learning-curve',
        summary: 'Unforgiving of technique errors — pour rate, water temperature, and grind size all matter significantly',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'workflow',
        summary: 'Requires gooseneck kettle for pour control; not compatible with standard kettles',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['New to pour-over (start with Chemex or Kalita Wave)', 'Don\'t own or want a gooseneck kettle'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/coffee', 'Home-Barista forums'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'nespresso-vertuo-next',
    productName: 'Nespresso Vertuo Next',
    category: 'espresso-machine',
    complaints: [
      {
        category: 'performance',
        summary: 'Proprietary capsule system — locked into Nespresso pods; no third-party alternatives for Vertuo (unlike Original line)',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'durability',
        summary: 'Plastic build feels cheap for the price; reported longevity shorter than Original line machines',
        frequencyLabel: 'occasional',
      },
      {
        category: 'performance',
        summary: 'Does not produce real espresso (centrifusion system); coffee is closer to long-pull Americano',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Want real espresso or plan to transition to manual espresso', 'Object to proprietary pod lock-in', 'Care about environmental pod waste'],
    maintenanceRisk: 'low',
    confidence: 'high',
    sourceTypes: ['Amazon verified reviews', 'r/espresso', 'r/nespresso'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'oxo-brew-9-cup',
    productName: 'OXO Brew 9-Cup',
    category: 'drip-coffee-maker',
    complaints: [
      {
        category: 'durability',
        summary: 'Carafe lid seal can degrade over 2–3 years; replacement lid available',
        frequencyLabel: 'occasional',
      },
      {
        category: 'workflow',
        summary: 'Rainmaker showerhead design is excellent but brew basket is slightly harder to clean than flat-bottom competitors',
        frequencyLabel: 'rare',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Budget under $100 (cheaper SCAA-certified alternatives exist)', 'Need more than 9 cups per brew'],
    maintenanceRisk: 'low',
    confidence: 'medium',
    sourceTypes: ['Amazon verified reviews', 'r/coffee', 'Wirecutter comparison data'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'weber-key',
    productName: 'Weber Key',
    category: 'grinder',
    complaints: [
      {
        category: 'workflow',
        summary: 'Single-dose design requires consistent bean loading; inconsistent loading affects dose accuracy',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
      {
        category: 'build-quality',
        summary: 'Premium price point ($700+) met with premium build; some find catch cup magnets less secure than expected',
        frequencyLabel: 'rare',
      },
    ],
    avoidIf: ['Budget under $600 (DF64 Gen 2 flat burrs at $130)', 'New to espresso — precision advantage not yet usable'],
    maintenanceRisk: 'low',
    confidence: 'low',
    sourceTypes: ['r/espresso', 'Home-Barista forums', 'YouTube grinder reviews'],
    lastReviewed: '2026-05-19',
  },
  {
    productKey: 'rocket-appartamento',
    productName: 'Rocket Appartamento',
    category: 'espresso-machine',
    complaints: [
      {
        category: 'learning-curve',
        summary: 'Heat exchanger machine requires flush before pulling shot to manage boiler temperature; adds 30–60 seconds to workflow',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
      {
        category: 'noise',
        summary: 'Vibratory pump is louder than rotary pump machines; audible in quiet homes during brew',
        frequencyLabel: 'occasional',
        isDesignTradeoff: true,
      },
      {
        category: 'maintenance',
        summary: 'Regular backflushing and annual descaling required; more involved than thermoblock machines',
        frequencyLabel: 'common',
        isDesignTradeoff: true,
      },
    ],
    avoidIf: ['Want minimal maintenance', 'Not willing to learn HX flush timing', 'Budget under $1000 (better value exists at lower tiers)'],
    maintenanceRisk: 'medium',
    confidence: 'medium',
    sourceTypes: ['r/espresso', 'Home-Barista forums', 'Rocket community'],
    lastReviewed: '2026-05-19',
  },
];
