export interface GrinderPairing {
  machineKey: string;
  machineName: string;
  machinePrice: number;
  portafilterSize: string;
  pairings: {
    grinderKey: string;
    grinderName: string;
    grinderPrice: number;
    fit: 'ideal' | 'good' | 'budget';
    reason: string;
    avoidIf?: string;
  }[];
  notRecommended: string[];
  notes: string;
  lastReviewed: string;
}

export const grinderPairingMatrix: GrinderPairing[] = [
  {
    machineKey: 'breville-bambino-plus',
    machineName: 'Breville Bambino Plus',
    machinePrice: 500,
    portafilterSize: '54mm',
    pairings: [
      {
        grinderKey: 'baratza-encore-esp',
        grinderName: 'Baratza Encore ESP',
        grinderPrice: 170,
        fit: 'ideal',
        reason: "Reliable stepless espresso range, easy workflow, matches Bambino's beginner-friendly profile",
      },
      {
        grinderKey: 'df64-gen2',
        grinderName: 'DF64 Gen 2',
        grinderPrice: 130,
        fit: 'good',
        reason: 'Flat burr quality at lowest price; bellows workflow adds a step but shot quality is excellent',
        avoidIf: 'New to espresso — dial-in sensitivity is steep',
      },
      {
        grinderKey: 'eureka-mignon-specialita',
        grinderName: 'Eureka Mignon Specialità',
        grinderPrice: 185,
        fit: 'good',
        reason: "Quietest option; flat burrs; slight overkill for Bambino's capability ceiling but no waste",
      },
      {
        grinderKey: 'breville-smart-grinder-pro',
        grinderName: 'Breville Smart Grinder Pro',
        grinderPrice: 200,
        fit: 'good',
        reason: 'Seamless Breville ecosystem pairing; plug-and-play workflow; stepped adjustment is limiting but usable',
        avoidIf: 'Want stepless precision',
      },
      {
        grinderKey: '1zpresso-jx-pro',
        grinderName: '1Zpresso JX-Pro',
        grinderPrice: 200,
        fit: 'budget',
        reason: 'Best manual option if counter space is critical; grind quality matches Encore ESP',
        avoidIf: 'Pulling 2+ shots per session — hand fatigue is real',
      },
    ],
    notRecommended: ['blade grinders', 'Baratza Encore (non-ESP) — espresso range too coarse'],
    notes: 'Bambino Plus sweet spot is $130–$200 grinder. Machine capability ceiling means $300+ grinders add cost without proportional benefit.',
    lastReviewed: '2026-05-19',
  },
  {
    machineKey: 'gaggia-classic-pro',
    machineName: 'Gaggia Classic Pro',
    machinePrice: 450,
    portafilterSize: '58mm',
    pairings: [
      {
        grinderKey: 'baratza-encore-esp',
        grinderName: 'Baratza Encore ESP',
        grinderPrice: 170,
        fit: 'ideal',
        reason: 'Best starting grinder for Gaggia; reliable, repairable, espresso-optimized range',
      },
      {
        grinderKey: 'eureka-mignon-specialita',
        grinderName: 'Eureka Mignon Specialità',
        grinderPrice: 185,
        fit: 'ideal',
        reason: "Flat burrs reveal what Gaggia's 58mm commercial group can actually do; quietest option in tier",
      },
      {
        grinderKey: 'baratza-sette-270',
        grinderName: 'Baratza Sette 270',
        grinderPrice: 320,
        fit: 'good',
        reason: 'Maximum precision match for Gaggia; 270 micro-steps expose shot quality ceiling',
        avoidIf: 'Noise-sensitive — Sette 270 is the loudest grinder in its class',
      },
      {
        grinderKey: 'df64-gen2',
        grinderName: 'DF64 Gen 2',
        grinderPrice: 130,
        fit: 'good',
        reason: 'Best flat burr value; Gaggia benefits more from flat burrs than Bambino Plus does',
        avoidIf: 'Want hands-off workflow',
      },
      {
        grinderKey: '1zpresso-jx-pro',
        grinderName: '1Zpresso JX-Pro',
        grinderPrice: 200,
        fit: 'budget',
        reason: "Good entry manual option; grind quality reveals Gaggia's potential for single-shot users",
        avoidIf: 'Multi-shot sessions daily',
      },
    ],
    notRecommended: ["Breville Smart Grinder Pro — stepped adjustment limits Gaggia's precision ceiling", 'blade grinders'],
    notes: 'Gaggia Classic Pro responds to grinder quality more than most entry machines. 58mm commercial portafilter amplifies grind differences.',
    lastReviewed: '2026-05-19',
  },
  {
    machineKey: 'breville-barista-express',
    machineName: 'Breville Barista Express',
    machinePrice: 700,
    portafilterSize: '54mm',
    pairings: [
      {
        grinderKey: 'built-in',
        grinderName: 'Built-in conical burr grinder',
        grinderPrice: 0,
        fit: 'ideal',
        reason: 'Integrated for convenience; adequate for beginner workflow; no separate purchase needed',
        avoidIf: 'Planning to upgrade — separate grinder upgrade makes built-in redundant',
      },
    ],
    notRecommended: ['Separate standalone grinder while keeping Barista Express — adds cost and complexity without benefit'],
    notes: 'The Barista Express is designed as an all-in-one. If you want to run a separate grinder, consider Bambino Plus instead to avoid paying twice for a grinder.',
    lastReviewed: '2026-05-19',
  },
  {
    machineKey: 'delonghi-dedica-ec685',
    machineName: "De'Longhi Dedica EC685",
    machinePrice: 180,
    portafilterSize: '51mm',
    pairings: [
      {
        grinderKey: 'baratza-encore-esp',
        grinderName: 'Baratza Encore ESP',
        grinderPrice: 170,
        fit: 'ideal',
        reason: "Reliable, repairable, espresso-range optimized; matches Dedica's beginner profile",
      },
      {
        grinderKey: 'breville-smart-grinder-pro',
        grinderName: 'Breville Smart Grinder Pro',
        grinderPrice: 200,
        fit: 'good',
        reason: "Easy setup, app-like display; slight overkill for Dedica's capability but works well",
      },
      {
        grinderKey: '1zpresso-jx-pro',
        grinderName: '1Zpresso JX-Pro',
        grinderPrice: 200,
        fit: 'budget',
        reason: "Manual option; grind quality exceeds Dedica's capability ceiling — waste for single shot per day",
        avoidIf: 'Multiple shots per session',
      },
    ],
    notRecommended: ['Niche Zero or Sette 270 — grinder exceeds machine capability; money better spent upgrading machine'],
    notes: 'Dedica is a budget entry machine. Best grinder budget here is $100–$170. Spending $300+ on a grinder for a $180 machine is imbalanced.',
    lastReviewed: '2026-05-19',
  },
  {
    machineKey: 'rancilio-silvia',
    machineName: 'Rancilio Silvia',
    machinePrice: 800,
    portafilterSize: '58mm',
    pairings: [
      {
        grinderKey: 'eureka-mignon-specialita',
        grinderName: 'Eureka Mignon Specialità',
        grinderPrice: 185,
        fit: 'ideal',
        reason: "Flat burr precision matches Silvia's commercial 58mm group; quiet; low retention",
      },
      {
        grinderKey: 'baratza-sette-270',
        grinderName: 'Baratza Sette 270',
        grinderPrice: 320,
        fit: 'ideal',
        reason: 'Maximum micro-step precision; Silvia benefits fully from 270-step adjustment once PID-modded',
        avoidIf: 'Noise-sensitive',
      },
      {
        grinderKey: 'df64-gen2',
        grinderName: 'DF64 Gen 2',
        grinderPrice: 130,
        fit: 'good',
        reason: "Flat burr value option; reveals Silvia's potential at lower cost",
      },
      {
        grinderKey: 'niche-zero',
        grinderName: 'Niche Zero',
        grinderPrice: 650,
        fit: 'good',
        reason: 'Premium single-dose option; near-zero retention; quality matches PID-modded Silvia',
        avoidIf: 'Not PID-modded Silvia — precision grinder without precision temperature is imbalanced',
      },
    ],
    notRecommended: ["Baratza Encore ESP — grind quality is below Silvia's capability when PID-modded"],
    notes: 'Silvia without PID mod: any $130–$200 grinder is fine. Silvia with PID mod: invest in Sette 270, Specialità, or Niche Zero to match machine capability.',
    lastReviewed: '2026-05-19',
  },
];
