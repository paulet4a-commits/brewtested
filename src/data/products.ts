export interface Product {
  asin: string;
  name: string;
  category: string;
  priceRange: string;
  lastVerified: string;
  status: 'active' | 'discontinued' | 'unverified';
}

export const AFFILIATE_TAG = 'brewtested07-20';

export function affiliateUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export const products: Record<string, Product> = {
  // Espresso Machines
  'gaggia-classic-pro': { asin: 'B07RQ3NL76', name: 'Gaggia Classic Pro', category: 'espresso', priceRange: '$400-500', lastVerified: '2026-05-19', status: 'active' },
  'breville-bambino-plus': { asin: 'B07FBT5VRQ', name: 'Breville Bambino Plus', category: 'espresso', priceRange: '$450-550', lastVerified: '2026-05-19', status: 'active' },
  'breville-barista-express': { asin: 'B006LBWB3C', name: 'Breville Barista Express', category: 'espresso', priceRange: '$550-700', lastVerified: '2026-05-19', status: 'active' },
  'breville-barista-pro': { asin: 'B07J5DMQJH', name: 'Breville Barista Pro', category: 'espresso', priceRange: '$650-800', lastVerified: '2026-05-19', status: 'active' },
  'delonghi-dedica': { asin: 'B01LXMS83T', name: "De'Longhi Dedica EC685M", category: 'espresso', priceRange: '$180-230', lastVerified: '2026-05-19', status: 'active' },
  'delonghi-stilosa': { asin: 'B08CZBKQF5', name: "De'Longhi Stilosa EC260BK", category: 'espresso', priceRange: '$80-130', lastVerified: '2026-05-19', status: 'active' },
  'delonghi-magnifica-evo': { asin: 'B09WZGQVQJ', name: "De'Longhi Magnifica Evo", category: 'espresso', priceRange: '$550-700', lastVerified: '2026-05-19', status: 'active' },
  'nespresso-essenza-mini': { asin: 'B07Q2PWMHG', name: 'Nespresso Essenza Mini', category: 'espresso', priceRange: '$130-180', lastVerified: '2026-05-19', status: 'active' },
  'nespresso-vertuo-next': { asin: 'B0819X2PXB', name: 'Nespresso Vertuo Next', category: 'espresso', priceRange: '$130-180', lastVerified: '2026-05-19', status: 'active' },
  'rancilio-silvia': { asin: 'B000HHL7BK', name: 'Rancilio Silvia', category: 'espresso', priceRange: '$500-600', lastVerified: '2026-05-19', status: 'active' },

  // Budget Grinders
  'cuisinart-dbm-8': { asin: 'B000A38XB8', name: 'Cuisinart DBM-8 Supreme Grind', category: 'grinders', priceRange: '$22-32', lastVerified: '2026-05-18', status: 'active' },
  'javapresse-manual': { asin: 'B00LNFOVKI', name: 'JavaPresse Manual Coffee Grinder', category: 'grinders', priceRange: '$20-30', lastVerified: '2026-05-18', status: 'active' },
  'timemore-chestnut-c2': { asin: 'B09QVDV7FP', name: 'Timemore Chestnut C2 Manual Grinder', category: 'grinders', priceRange: '$55-70', lastVerified: '2026-05-18', status: 'active' },

  // Grinders
  'baratza-encore': { asin: 'B00LW8I37G', name: 'Baratza Encore', category: 'grinders', priceRange: '$150-200', lastVerified: '2026-05-19', status: 'active' },
  'baratza-virtuoso-plus': { asin: 'B07DKGKX64', name: 'Baratza Virtuoso+', category: 'grinders', priceRange: '$180-230', lastVerified: '2026-05-19', status: 'active' },
  'baratza-sette-270': { asin: 'B01LZPOZRR', name: 'Baratza Sette 270', category: 'grinders', priceRange: '$280-340', lastVerified: '2026-05-19', status: 'active' },
  'fellow-opus': { asin: 'B09ZMLTZWY', name: 'Fellow Opus Conical Burr', category: 'grinders', priceRange: '$180-220', lastVerified: '2026-05-19', status: 'active' },
  'oxo-brew-conical': { asin: 'B07CKHQS9X', name: 'OXO Brew Conical Burr', category: 'grinders', priceRange: '$45-65', lastVerified: '2026-05-19', status: 'active' },
  'breville-smart-grinder-pro': { asin: 'B00OXGXW8O', name: 'Breville Smart Grinder Pro', category: 'grinders', priceRange: '$150-200', lastVerified: '2026-05-19', status: 'active' },
  'eureka-mignon-silenzio': { asin: 'B07G14RKTT', name: 'Eureka Mignon Silenzio', category: 'grinders', priceRange: '$230-280', lastVerified: '2026-05-19', status: 'active' },

  // Coffee Makers
  'moccamaster-kbg': { asin: 'B000NGNEOM', name: 'Moccamaster KBG 10-Cup', category: 'coffee-makers', priceRange: '$300-360', lastVerified: '2026-05-19', status: 'active' },
  'breville-precision-brewer': { asin: 'B01MXHDPWQ', name: 'Breville Precision Brewer', category: 'coffee-makers', priceRange: '$180-230', lastVerified: '2026-05-19', status: 'active' },
  'oxo-brew-9cup': { asin: 'B079SF3FTB', name: 'OXO Brew 9-Cup', category: 'coffee-makers', priceRange: '$170-230', lastVerified: '2026-05-19', status: 'active' },
  'keurig-k-elite': { asin: 'B078TRTDKZ', name: 'Keurig K-Elite', category: 'coffee-makers', priceRange: '$110-160', lastVerified: '2026-05-19', status: 'active' },
  'keurig-k-mini': { asin: 'B07GV2S1GS', name: 'Keurig K-Mini', category: 'coffee-makers', priceRange: '$60-90', lastVerified: '2026-05-19', status: 'active' },

  // Pour Over
  'hario-v60-plastic': { asin: 'B001RPMRPW', name: 'Hario V60 Plastic (02)', category: 'pour-over', priceRange: '$8-15', lastVerified: '2026-05-19', status: 'active' },
  'chemex-6cup': { asin: 'B000I1WP7W', name: 'Chemex 6-Cup', category: 'pour-over', priceRange: '$40-55', lastVerified: '2026-05-19', status: 'active' },
  'fellow-stagg-ekg': { asin: 'B077JBQZPX', name: 'Fellow Stagg EKG Electric Kettle', category: 'pour-over', priceRange: '$150-200', lastVerified: '2026-05-19', status: 'active' },

  // French Press
  'bodum-chambord': { asin: 'B00008MBQ7', name: 'Bodum Chambord French Press', category: 'french-press', priceRange: '$30-50', lastVerified: '2026-05-19', status: 'active' },
  'bodum-chambord-34oz': { asin: 'B00008XE8Q', name: 'Bodum Chambord 34oz French Press', category: 'french-press', priceRange: '$22-30', lastVerified: '2026-05-18', status: 'active' },
  'sterlingpro-double-wall': { asin: 'B01MTTMG7Y', name: 'SterlingPro Double Wall French Press', category: 'french-press', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'coffee-gator-french-press': { asin: 'B00SNME7T4', name: 'Coffee Gator French Press', category: 'french-press', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'kona-french-press': { asin: 'B00GXAGN0M', name: 'KONA French Press', category: 'french-press', priceRange: '$18-25', lastVerified: '2026-05-18', status: 'active' },
  'bialetti-moka-express-6cup': { asin: 'B0000CF3Q6', name: 'Bialetti Moka Express 6-Cup', category: 'espresso', priceRange: '$35-50', lastVerified: '2026-05-19', status: 'active' },

  // Portable
  'aeropress-go': { asin: 'B07YVL8SF9', name: 'AeroPress Go', category: 'coffee-makers', priceRange: '$30-45', lastVerified: '2026-05-19', status: 'active' },
  'wacaco-nanopresso': { asin: 'B01MTNQKGU', name: 'Wacaco Nanopresso', category: 'espresso', priceRange: '$60-90', lastVerified: '2026-05-19', status: 'active' },

  // Cold Brew
  'toddy-cold-brew': { asin: 'B0000YOH5E', name: 'Toddy Cold Brew System', category: 'coffee-makers', priceRange: '$40-55', lastVerified: '2026-05-19', status: 'active' },

  // High-frequency ASINs from markdown audit (top missing from registry)
  'bonavita-kettle': { asin: 'B005YR0F40', name: 'Bonavita 1.0L Variable Temp Kettle', category: 'pour-over', priceRange: '$45-65', lastVerified: '2026-05-19', status: 'active' },
  'proctor-silex-12cup': { asin: 'B003KYSLMW', name: 'Proctor Silex 12-Cup Coffee Maker', category: 'coffee-makers', priceRange: '$20-30', lastVerified: '2026-05-19', status: 'active' },
  'hario-v60-filters': { asin: 'B001O0R46I', name: 'Hario V60 Paper Filters (100ct)', category: 'pour-over', priceRange: '$8-12', lastVerified: '2026-05-19', status: 'active' },
  'delonghi-la-specialista': { asin: 'B09HJX1XM4', name: "De'Longhi La Specialista Arte", category: 'espresso', priceRange: '$450-550', lastVerified: '2026-05-19', status: 'active' },
  'breville-dual-boiler': { asin: 'B00BWKDHZS', name: 'Breville Dual Boiler BES920XL', category: 'espresso', priceRange: '$900-1100', lastVerified: '2026-05-19', status: 'active' },
  'philips-3200': { asin: 'B08FQZMQYL', name: 'Philips 3200 LatteGo', category: 'espresso', priceRange: '$450-600', lastVerified: '2026-05-19', status: 'active' },
  'moccamaster-kbt-thermal': { asin: 'B000VHKP44', name: 'Moccamaster KBT Thermal', category: 'coffee-makers', priceRange: '$330-380', lastVerified: '2026-05-19', status: 'active' },
  'wacaco-minipresso': { asin: 'B00ZHUKQKO', name: 'Wacaco Minipresso GR', category: 'espresso', priceRange: '$45-65', lastVerified: '2026-05-19', status: 'active' },
  'nespresso-aeroccino3': { asin: 'B01AHEBBY2', name: 'Nespresso Aeroccino3 Milk Frother', category: 'kitchen', priceRange: '$55-80', lastVerified: '2026-05-19', status: 'active' },
  'zulay-milk-frother': { asin: 'B078RJNSLZ', name: 'Zulay Kitchen Milk Boss Frother', category: 'kitchen', priceRange: '$10-15', lastVerified: '2026-05-19', status: 'active' },
  'keurig-k-supreme-plus': { asin: 'B08D35DKMD', name: 'Keurig K-Supreme Plus', category: 'coffee-makers', priceRange: '$140-190', lastVerified: '2026-05-19', status: 'active' },
  'timemore-c3-pro': { asin: 'B09MTXYD7B', name: 'Timemore Chestnut C3 Pro', category: 'grinders', priceRange: '$100-140', lastVerified: '2026-05-19', status: 'active' },
  'hario-skerton-pro': { asin: 'B06XRHQDVD', name: 'Hario Skerton Pro Manual Grinder', category: 'grinders', priceRange: '$40-60', lastVerified: '2026-05-19', status: 'active' },

  // Coffee Warmers
  'cosori-mug-warmer': { asin: 'B07NJTR7TF', name: 'Cosori Coffee Mug Warmer', category: 'kitchen', priceRange: '$20-28', lastVerified: '2026-05-18', status: 'active' },
  'ember-mug-2': { asin: 'B09B2N8LYN', name: 'Ember Mug 2 (10 oz)', category: 'kitchen', priceRange: '$130-150', lastVerified: '2026-05-18', status: 'active' },
  'mr-coffee-mug-warmer': { asin: 'B00004SULH', name: 'Mr. Coffee Mug Warmer', category: 'kitchen', priceRange: '$10-15', lastVerified: '2026-05-18', status: 'active' },
  'bestinnkits-mug-warmer': { asin: 'B07VVCJFHZ', name: 'Bestinnkits Smart Cup Warmer', category: 'kitchen', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'vobaga-mug-warmer': { asin: 'B07XSVVQQQ', name: 'VOBAGA Coffee Mug Warmer', category: 'kitchen', priceRange: '$18-26', lastVerified: '2026-05-18', status: 'active' },

  // Turkish Coffee Makers
  'bialetti-brikka': { asin: 'B0000CF3Q7', name: 'Bialetti Brikka 2-Cup', category: 'espresso', priceRange: '$40-55', lastVerified: '2026-05-18', status: 'active' },
  'cezve-copper': { asin: 'B07B9NJWMJ', name: 'Bosphorus Copper Cezve/Ibrik', category: 'kitchen', priceRange: '$25-40', lastVerified: '2026-05-18', status: 'active' },
  'vahine-turkish-coffee': { asin: 'B09C6FBRGP', name: 'Arzum Okka Turkish Coffee Machine', category: 'kitchen', priceRange: '$70-90', lastVerified: '2026-05-18', status: 'active' },

  // Pod Coffee Makers
  'keurig-k-duo': { asin: 'B07L6XT34K', name: 'Keurig K-Duo Coffee Maker', category: 'coffee-makers', priceRange: '$130-160', lastVerified: '2026-05-18', status: 'active' },
  'nespresso-vertuo-pop': { asin: 'B0BMS1CRFK', name: 'Nespresso Vertuo Pop', category: 'espresso', priceRange: '$75-100', lastVerified: '2026-05-18', status: 'active' },
  'nespresso-original-essenza': { asin: 'B01M9DXUZ0', name: 'Nespresso Essenza Mini Original', category: 'espresso', priceRange: '$100-130', lastVerified: '2026-05-18', status: 'active' },

  // Budget Coffee Makers (under $50)
  'black-decker-cm0912b': { asin: 'B07CNJL9HT', name: 'BLACK+DECKER 12-Cup CM0912B', category: 'coffee-makers', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'hamilton-beach-49350': { asin: 'B001YQ0M14', name: 'Hamilton Beach 49350 12-Cup', category: 'coffee-makers', priceRange: '$30-40', lastVerified: '2026-05-18', status: 'active' },
  'cuisinart-dcc-450': { asin: 'B00B0BSQCE', name: 'Cuisinart DCC-450BK 4-Cup', category: 'coffee-makers', priceRange: '$35-45', lastVerified: '2026-05-18', status: 'active' },

  // Ultra-Budget Coffee Makers
  'black-decker-5cup': { asin: 'B004HKUEP0', name: 'BLACK+DECKER 5-Cup Coffee Maker', category: 'coffee-makers', priceRange: '$17-24', lastVerified: '2026-05-18', status: 'active' },
  'hamilton-beach-12cup-basic': { asin: 'B001NXD3YC', name: 'Hamilton Beach 12-Cup Coffee Maker', category: 'coffee-makers', priceRange: '$20-28', lastVerified: '2026-05-18', status: 'active' },
  'chulux-single-serve': { asin: 'B07F4K5NWR', name: 'CHULUX Single Serve Coffee Maker', category: 'coffee-makers', priceRange: '$20-28', lastVerified: '2026-05-18', status: 'active' },
  'mr-coffee-5cup': { asin: 'B000G00VH4', name: 'Mr. Coffee 5-Cup Mini Brew', category: 'coffee-makers', priceRange: '$18-25', lastVerified: '2026-05-18', status: 'active' },

  // Gift Sets
  'coffee-gift-set-pour-over': { asin: 'B07FQTCRLN', name: 'Pour Over Coffee Gift Set with Filters', category: 'pour-over', priceRange: '$30-45', lastVerified: '2026-05-18', status: 'active' },
  'chemex-gift-set': { asin: 'B001FVJZ4A', name: 'Chemex Classic Pour-Over Set', category: 'pour-over', priceRange: '$45-65', lastVerified: '2026-05-18', status: 'active' },

  // Moka Pots
  'bialetti-moka-3cup': { asin: 'B000CNY6UK', name: 'Bialetti Moka Express 3-Cup', category: 'espresso', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'grosche-milano': { asin: 'B00JVSVM30', name: 'GROSCHE Milano Stovetop Espresso Maker', category: 'espresso', priceRange: '$20-28', lastVerified: '2026-05-18', status: 'active' },
  'cuisinox-roma': { asin: 'B000I607I6', name: 'Cuisinox Roma 6-Cup Stovetop Espresso Maker', category: 'espresso', priceRange: '$40-55', lastVerified: '2026-05-18', status: 'active' },

  // Pour Over Drippers
  'hario-v60-ceramic': { asin: 'B00QSGNFAE', name: 'Hario V60 Ceramic Coffee Dripper (02)', category: 'pour-over', priceRange: '$20-35', lastVerified: '2026-05-18', status: 'active' },
  'oxo-brew-pourover': { asin: 'B01K7YNG8S', name: 'OXO Brew Pour-Over Coffee Dripper with Water Tank', category: 'pour-over', priceRange: '$25-40', lastVerified: '2026-05-18', status: 'active' },
  'kalita-wave': { asin: 'B00KUOT72A', name: 'Kalita Wave Dripper 185', category: 'pour-over', priceRange: '$20-30', lastVerified: '2026-05-18', status: 'active' },

  // Budget Espresso Machines
  'delonghi-ec155m': { asin: 'B00IXGYEY2', name: "De'Longhi EC155M Manual Espresso Machine", category: 'espresso', priceRange: '$90-130', lastVerified: '2026-05-18', status: 'active' },
  'mr-coffee-ecmp50': { asin: 'B00IXBXRM2', name: 'Mr. Coffee Espresso & Cappuccino Maker ECMP50', category: 'espresso', priceRange: '$75-100', lastVerified: '2026-05-18', status: 'active' },
  'sowtech-espresso': { asin: 'B083BQNTDS', name: 'Sowtech Espresso Machine 3.5 Bar', category: 'espresso', priceRange: '$80-100', lastVerified: '2026-05-18', status: 'active' },
  'gevi-espresso': { asin: 'B07CKY9JGN', name: 'Gevi 20-Bar Espresso Machine', category: 'espresso', priceRange: '$90-130', lastVerified: '2026-05-18', status: 'active' },
  'mr-coffee-cafe-barista': { asin: 'B00KCBT1EK', name: 'Mr. Coffee Café Barista Espresso & Cappuccino Maker', category: 'espresso', priceRange: '$160-210', lastVerified: '2026-05-18', status: 'active' },
  'nespresso-vertuo-plus': { asin: 'B07CTTBT4W', name: 'Nespresso Vertuo Plus Coffee & Espresso Machine', category: 'espresso', priceRange: '$140-180', lastVerified: '2026-05-18', status: 'active' },

  // Drip Coffee Makers (mid-range)
  'cuisinart-dcc-3200': { asin: 'B00MVWGQX0', name: 'Cuisinart DCC-3200 14-Cup Programmable', category: 'coffee-makers', priceRange: '$60-80', lastVerified: '2026-05-18', status: 'active' },
  'hamilton-beach-drip-12cup': { asin: 'B001NXL53W', name: 'Hamilton Beach 12-Cup Programmable Coffee Maker', category: 'coffee-makers', priceRange: '$20-30', lastVerified: '2026-05-18', status: 'active' },
  'mr-coffee-12cup': { asin: 'B000T9SCT2', name: 'Mr. Coffee 12-Cup Programmable Coffee Maker', category: 'coffee-makers', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },

  // Cold Brew Makers
  'oxo-cold-brew': { asin: 'B011670XUQ', name: 'OXO Good Grips Cold Brew Coffee Maker', category: 'coffee-makers', priceRange: '$45-55', lastVerified: '2026-05-18', status: 'active' },
  'takeya-cold-brew': { asin: 'B00DYOYFHI', name: 'Takeya Patented Deluxe Cold Brew Coffee Maker', category: 'coffee-makers', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'county-line-cold-brew': { asin: 'B07CQSLQZT', name: 'County Line Kitchen Cold Brew Mason Jar', category: 'coffee-makers', priceRange: '$18-25', lastVerified: '2026-05-18', status: 'active' },

  // Single Serve & Travel
  'black-decker-brew-n-go': { asin: 'B00005IBX6', name: "BLACK+DECKER Brew 'N Go Personal Coffee Maker", category: 'coffee-makers', priceRange: '$20-28', lastVerified: '2026-05-18', status: 'active' },

  // Ultra-Budget Drip
  'proctor-silex-43501': { asin: 'B000QX4UYY', name: 'Proctor Silex 43501 12-Cup Coffee Maker', category: 'coffee-makers', priceRange: '$15-22', lastVerified: '2026-05-18', status: 'active' },
  'mr-coffee-simple-brew': { asin: 'B000JM6ZFQ', name: 'Mr. Coffee 5-Cup Simple Brew Coffee Maker', category: 'coffee-makers', priceRange: '$18-25', lastVerified: '2026-05-18', status: 'active' },

  // Budget Grinders (blade)
  'mr-coffee-blade-grinder': { asin: 'B003O2WBDC', name: 'Mr. Coffee Electric Blade Coffee Grinder', category: 'grinders', priceRange: '$12-18', lastVerified: '2026-05-18', status: 'active' },
  'hamilton-beach-blade-80393': { asin: 'B005OUXNTO', name: 'Hamilton Beach 80393 Electric Blade Grinder', category: 'grinders', priceRange: '$18-25', lastVerified: '2026-05-18', status: 'active' },

  // Mid-Range Espresso & Drip
  'breville-infuser': { asin: 'B0084RVALO', name: 'Breville BES840XL The Infuser Espresso Machine', category: 'espresso', priceRange: '$250-320', lastVerified: '2026-05-18', status: 'active' },
  'bonavita-8cup': { asin: 'B00LNLTML4', name: 'Bonavita 8-Cup One-Touch Coffee Maker', category: 'coffee-makers', priceRange: '$60-80', lastVerified: '2026-05-18', status: 'active' },
  'black-decker-cm0700b': { asin: 'B07BJFBLVR', name: 'BLACK+DECKER 5-Cup Coffee Maker CM0700B', category: 'coffee-makers', priceRange: '$20-28', lastVerified: '2026-05-18', status: 'active' },
  'cuisinart-dcc-1100': { asin: 'B01AHXBX78', name: 'Cuisinart DCC-1100BK 12-Cup Programmable', category: 'coffee-makers', priceRange: '$45-60', lastVerified: '2026-05-18', status: 'active' },
  'capresso-infinity-plus': { asin: 'B085H1RPYQ', name: 'Capresso Infinity Plus Conical Burr Grinder', category: 'grinders', priceRange: '$90-120', lastVerified: '2026-05-18', status: 'active' },
  'fellow-ode-gen2': { asin: 'B09TGRFNR6', name: 'Fellow Ode Brew Grinder Gen 2', category: 'grinders', priceRange: '$145-175', lastVerified: '2026-05-18', status: 'active' },

  // Coffee Scales
  'hario-v60-scale': { asin: 'B009GPJMOU', name: 'Hario V60 Drip Coffee Scale and Timer', category: 'kitchen', priceRange: '$45-60', lastVerified: '2026-05-18', status: 'active' },
  'jennings-cj4000': { asin: 'B005UGBG20', name: 'Jennings CJ4000 Compact Digital Scale', category: 'kitchen', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'oxo-good-grips-scale': { asin: 'B079D8LN4T', name: 'OXO Good Grips 11lb Food Scale', category: 'kitchen', priceRange: '$40-55', lastVerified: '2026-05-18', status: 'active' },
  'acaia-pearl': { asin: 'B07BQNQ5SM', name: 'Acaia Pearl Coffee Scale', category: 'kitchen', priceRange: '$130-160', lastVerified: '2026-05-18', status: 'active' },

  // Milk Frothers
  'powerlix-milk-frother': { asin: 'B01LDG3NZU', name: 'PowerLix Milk Frother Handheld', category: 'kitchen', priceRange: '$10-18', lastVerified: '2026-05-18', status: 'active' },
  'bonsenkitchen-milk-frother': { asin: 'B07TS46TLM', name: 'Bonsenkitchen Milk Frother Handheld', category: 'kitchen', priceRange: '$12-20', lastVerified: '2026-05-18', status: 'active' },

  // French Press
  'frieling-french-press': { asin: 'B0000CFEF0', name: 'Frieling Double-Wall Stainless Steel French Press', category: 'french-press', priceRange: '$60-80', lastVerified: '2026-05-18', status: 'active' },
  'secura-french-press': { asin: 'B01LWYUQNP', name: 'Secura Stainless Steel French Press', category: 'french-press', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'espro-p6': { asin: 'B012NPZM84', name: 'Espro P6 French Press', category: 'french-press', priceRange: '$70-90', lastVerified: '2026-05-18', status: 'active' },

  // Nespresso Machines
  'nespresso-pixie': { asin: 'B00GPRS9XY', name: 'Nespresso Pixie Original Espresso Machine', category: 'espresso', priceRange: '$140-180', lastVerified: '2026-05-18', status: 'active' },
  'nespresso-lattissima-one': { asin: 'B07WNZFL8B', name: 'Nespresso Lattissima One Espresso Machine', category: 'espresso', priceRange: '$220-270', lastVerified: '2026-05-18', status: 'active' },
  'nespresso-creatista-plus': { asin: 'B072KSMBL9', name: 'Nespresso Creatista Plus Espresso Machine', category: 'espresso', priceRange: '$450-550', lastVerified: '2026-05-18', status: 'active' },

  // Gooseneck Kettles
  'breville-bke820xl': { asin: 'B00KYCKDUK', name: 'Breville BKE820XL Variable Temperature Kettle', category: 'pour-over', priceRange: '$90-120', lastVerified: '2026-05-18', status: 'active' },
  'oxo-brew-kettle': { asin: 'B07WGTF7W4', name: 'OXO Brew Adjustable Temperature Gooseneck Kettle', category: 'pour-over', priceRange: '$90-120', lastVerified: '2026-05-18', status: 'active' },
  'cosori-gooseneck-kettle': { asin: 'B08GJCYRJB', name: 'Cosori Electric Gooseneck Kettle', category: 'pour-over', priceRange: '$35-50', lastVerified: '2026-05-18', status: 'active' },

  // Electric Milk Frothers
  'breville-milk-cafe': { asin: 'B00LKY7JOM', name: 'Breville Milk Café Electric Frother', category: 'kitchen', priceRange: '$80-110', lastVerified: '2026-05-18', status: 'active' },
  'nespresso-aeroccino4': { asin: 'B07QT4HLJ9', name: 'Nespresso Aeroccino 4 Milk Frother', category: 'kitchen', priceRange: '$65-90', lastVerified: '2026-05-18', status: 'active' },
  'instant-pot-milk-frother': { asin: 'B0B4B1KTBJ', name: 'Instant Pot 10oz Electric Milk Frother', category: 'kitchen', priceRange: '$30-45', lastVerified: '2026-05-18', status: 'active' },
  'bodum-bistro-frother': { asin: 'B00DKGKBZA', name: 'Bodum Bistro Electric Milk Frother', category: 'kitchen', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },

  // Keurig
  'keurig-k-classic': { asin: 'B018UQ5EKG', name: 'Keurig K-Classic Coffee Maker', category: 'coffee-makers', priceRange: '$80-110', lastVerified: '2026-05-18', status: 'active' },

  // French Press (additional)
  'mueller-french-press': { asin: 'B07MVTD2MM', name: 'Mueller French Press Double Insulated', category: 'french-press', priceRange: '$18-28', lastVerified: '2026-05-18', status: 'active' },

  // Espresso Grinders
  'bodum-bistro-grinder': { asin: 'B00KNTFWTS', name: 'Bodum BISTRO Burr Coffee Grinder', category: 'grinders', priceRange: '$70-100', lastVerified: '2026-05-18', status: 'active' },
  'capresso-infinity': { asin: 'B0000AR7SY', name: 'Capresso Infinity Conical Burr Grinder', category: 'grinders', priceRange: '$70-100', lastVerified: '2026-05-18', status: 'active' },
  'mr-coffee-burr-grinder': { asin: 'B075Z83F6Y', name: 'Mr. Coffee Automatic Burr Grinder', category: 'grinders', priceRange: '$35-50', lastVerified: '2026-05-18', status: 'active' },

  // Espresso Grinders Under $200
  'wilfa-svart-uniform': { asin: 'B08JCK2RCK', name: 'Wilfa Svart Uniform Grinder', category: 'grinders', priceRange: '$150-175', lastVerified: '2026-05-18', status: 'active' },
  'eureka-mignon-specialita': { asin: 'B07GG9V5VK', name: 'Eureka Mignon Specialita Grinder', category: 'grinders', priceRange: '$165-195', lastVerified: '2026-05-18', status: 'active' },
  'df64-gen2': { asin: 'B09G9TPYVJ', name: 'DF64 Gen 2 Single Dose Grinder', category: 'grinders', priceRange: '$115-140', lastVerified: '2026-05-18', status: 'active' },
  'eureka-mignon-notte': { asin: 'B081YDVMKB', name: 'Eureka Mignon Notte Grinder', category: 'grinders', priceRange: '$95-125', lastVerified: '2026-05-18', status: 'active' },

  // Coffee Makers with Grinder
  'breville-grind-control': { asin: 'B00VGGVQCI', name: 'Breville Grind Control BDC650BSS', category: 'coffee-makers', priceRange: '$220-280', lastVerified: '2026-05-18', status: 'active' },
  'cuisinart-dgb-700': { asin: 'B001A3K7QO', name: 'Cuisinart DGB-700BC Grind & Brew Coffee Maker', category: 'coffee-makers', priceRange: '$60-85', lastVerified: '2026-05-18', status: 'active' },
  'mr-coffee-grinder-combo': { asin: 'B01LXM37DX', name: 'Mr. Coffee 12-Cup Grind and Brew Coffee Maker', category: 'coffee-makers', priceRange: '$50-70', lastVerified: '2026-05-18', status: 'active' },
  'delonghi-magnifica-classic': { asin: 'B000IMB9AW', name: "De'Longhi ESAM3300 Magnifica Super-Automatic", category: 'espresso', priceRange: '$200-280', lastVerified: '2026-05-18', status: 'active' },
  'hamilton-beach-2way-scoop': { asin: 'B0177E4NUW', name: 'Hamilton Beach 2-Way The Scoop Brewer', category: 'coffee-makers', priceRange: '$40-60', lastVerified: '2026-05-18', status: 'active' },

  // Nespresso Latte Machines
  'nespresso-vertuo-creatista': { asin: 'B0BQRJCGRD', name: 'Nespresso Vertuo Creatista', category: 'espresso', priceRange: '$450-550', lastVerified: '2026-05-18', status: 'active' },
  'nespresso-gran-lattissima': { asin: 'B073HWCQKB', name: 'Nespresso Gran Lattissima', category: 'espresso', priceRange: '$320-400', lastVerified: '2026-05-18', status: 'active' },

  // Drip Coffee Makers (additional)
  'bonavita-connoisseur': { asin: 'B008TBRFV0', name: 'Bonavita BV1901TS Connoisseur 8-Cup', category: 'coffee-makers', priceRange: '$80-100', lastVerified: '2026-05-18', status: 'active' },
  'melitta-pour-over-maker': { asin: 'B005FWW0R2', name: 'Melitta Pour Over Coffee Maker', category: 'coffee-makers', priceRange: '$30-45', lastVerified: '2026-05-18', status: 'active' },
  'hamilton-beach-brewstation': { asin: 'B07WLYTH41', name: 'Hamilton Beach BrewStation 12-Cup Coffee Maker', category: 'coffee-makers', priceRange: '$30-45', lastVerified: '2026-05-18', status: 'active' },
  'ninja-ce251': { asin: 'B08FBH19HD', name: 'Ninja CE251 Programmable Coffee Maker', category: 'coffee-makers', priceRange: '$50-70', lastVerified: '2026-05-18', status: 'active' },

  // Super-Automatic Espresso Machines
  'jura-e8': { asin: 'B076H4BQJB', name: 'Jura E8 Automatic Coffee Machine', category: 'espresso', priceRange: '$900-1100', lastVerified: '2026-05-18', status: 'active' },
  'delonghi-dinamica-plus': { asin: 'B09MQQY5LF', name: "De'Longhi Dinamica Plus ECAM37095T", category: 'espresso', priceRange: '$750-950', lastVerified: '2026-05-18', status: 'active' },
  'breville-oracle-touch': { asin: 'B07BKLQCCB', name: 'Breville Oracle Touch Espresso Machine', category: 'espresso', priceRange: '$1400-1700', lastVerified: '2026-05-18', status: 'active' },

  // Office & Additional Coffee Makers
  'hamilton-beach-46310': { asin: 'B009ION2XY', name: 'Hamilton Beach 46310 12-Cup Coffee Maker', category: 'coffee-makers', priceRange: '$20-30', lastVerified: '2026-05-18', status: 'active' },
  'bunn-nhs': { asin: 'B001A05FV2', name: 'BUNN NHS Velocity Brew 10-Cup Coffee Brewer', category: 'coffee-makers', priceRange: '$70-90', lastVerified: '2026-05-18', status: 'active' },
  'melitta-manual-pourover': { asin: 'B00019OQZK', name: 'Melitta Ready Set Joe Single Cup Pour Over', category: 'coffee-makers', priceRange: '$5-10', lastVerified: '2026-05-18', status: 'active' },
  'kitchenaid-cold-brew': { asin: 'B073X7LNXH', name: 'KitchenAid Cold Brew Coffee Maker', category: 'coffee-makers', priceRange: '$70-90', lastVerified: '2026-05-18', status: 'active' },

  // Insulated French Press
  'stanley-french-press': { asin: 'B004TFXI9I', name: 'Stanley Classic Vacuum French Press', category: 'french-press', priceRange: '$35-50', lastVerified: '2026-05-18', status: 'active' },
  'espro-p7': { asin: 'B00JNHNGHK', name: 'Espro P7 Micro-Filter French Press', category: 'french-press', priceRange: '$80-110', lastVerified: '2026-05-18', status: 'active' },
  'bodum-columbia': { asin: 'B000LVCS7O', name: 'Bodum Columbia Double-Wall Stainless French Press', category: 'french-press', priceRange: '$40-60', lastVerified: '2026-05-18', status: 'active' },
  'fellow-clara-french-press': { asin: 'B09GY3S5L1', name: 'Fellow Clara Insulated French Press', category: 'french-press', priceRange: '$55-70', lastVerified: '2026-05-18', status: 'active' },
  'planetary-design-french-press': { asin: 'B07KQVWK4H', name: 'Planetary Design Dual-Screen French Press', category: 'french-press', priceRange: '$30-45', lastVerified: '2026-05-18', status: 'active' },

  // Chemex & Pour Over
  'chemex-8cup': { asin: 'B000BR14VO', name: 'Chemex Classic 8-Cup Pour-Over Coffee Maker', category: 'pour-over', priceRange: '$45-65', lastVerified: '2026-05-18', status: 'active' },
  'chemex-handblown': { asin: 'B000BR15H0', name: 'Chemex Handblown Series Coffee Maker', category: 'pour-over', priceRange: '$55-80', lastVerified: '2026-05-18', status: 'active' },
  'able-kone-filter': { asin: 'B003ZXJZHU', name: 'Able Kone Coffee Filter for Chemex', category: 'pour-over', priceRange: '$35-50', lastVerified: '2026-05-18', status: 'active' },

  // Stovetop Espresso / Moka Pot (additional)
  'bialetti-venus': { asin: 'B00006IUW4', name: 'Bialetti Venus 6-Cup Stainless Moka Pot', category: 'espresso', priceRange: '$30-45', lastVerified: '2026-05-18', status: 'active' },
  'bialetti-moka-induction': { asin: 'B07FKSPWM9', name: 'Bialetti Moka Induction 6-Cup', category: 'espresso', priceRange: '$40-55', lastVerified: '2026-05-18', status: 'active' },

  // Automatic Drip Coffee Makers
  'breville-precision-brewer': { asin: 'B07DKYYDWH', name: 'Breville Precision Brewer 12-Cup', category: 'coffee-makers', priceRange: '$180-220', lastVerified: '2026-05-18', status: 'active' },

  // Camping Coffee Makers
  'gsi-java-drip': { asin: 'B00BRNZ7GO', name: 'GSI Outdoors JavaDrip Ultralight Pour-Over', category: 'coffee-makers', priceRange: '$12-20', lastVerified: '2026-05-18', status: 'active' },
  'wacaco-nanopresso': { asin: 'B07B3LVZCC', name: 'Wacaco Nanopresso Portable Espresso Maker', category: 'espresso', priceRange: '$65-85', lastVerified: '2026-05-18', status: 'active' },
  'stanley-pour-over': { asin: 'B08KGLZPK1', name: 'Stanley Camp Pour Over Coffee Set', category: 'pour-over', priceRange: '$30-45', lastVerified: '2026-05-18', status: 'active' },
  'jetboil-coffee-press': { asin: 'B00D8CGMCE', name: 'Jetboil Coffee Press Kit', category: 'coffee-makers', priceRange: '$20-30', lastVerified: '2026-05-18', status: 'active' },

  // Coffee Canisters
  'airscape-canister': { asin: 'B000TCZLAK', name: 'Airscape Coffee Canister Stainless Steel', category: 'kitchen', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },
  'fellow-atmos-canister': { asin: 'B07GVMLPNR', name: 'Fellow Atmos Vacuum Coffee Canister', category: 'kitchen', priceRange: '$30-40', lastVerified: '2026-05-18', status: 'active' },
  'oxo-pop-canister': { asin: 'B003KKXFKA', name: 'OXO Good Grips POP Coffee Container', category: 'kitchen', priceRange: '$12-20', lastVerified: '2026-05-18', status: 'active' },
  'airscape-kilo': { asin: 'B00HT0CSMW', name: 'Airscape Kilo Coffee Canister (1kg)', category: 'kitchen', priceRange: '$35-50', lastVerified: '2026-05-18', status: 'active' },
  'vssl-java-container': { asin: 'B07K6GXFT8', name: 'VSSL Java Ground Coffee Container', category: 'kitchen', priceRange: '$20-30', lastVerified: '2026-05-18', status: 'active' },

  // Pour-Over Drippers
  'chemex-3cup': { asin: 'B000P4D5HG', name: 'Chemex Classic 3-Cup Pour-Over Coffee Maker', category: 'pour-over', priceRange: '$35-50', lastVerified: '2026-05-18', status: 'active' },
  'melitta-cone-dripper': { asin: 'B00005LMH6', name: 'Melitta Cone Coffee Filter Holder', category: 'pour-over', priceRange: '$5-12', lastVerified: '2026-05-18', status: 'active' },
  'kalita-wave': { asin: 'B00FLYWNYQ', name: 'Kalita Wave Stainless Steel Coffee Dripper', category: 'pour-over', priceRange: '$25-40', lastVerified: '2026-05-18', status: 'active' },
  'oxo-pour-over': { asin: 'B00OXNP914', name: 'OXO Good Grips Pour-Over Coffee Maker', category: 'pour-over', priceRange: '$20-30', lastVerified: '2026-05-18', status: 'active' },

  // AeroPress & Manual Brewing
  'aeropress-original': { asin: 'B0047BIWSK', name: 'AeroPress Coffee and Espresso Maker', category: 'coffee-makers', priceRange: '$35-45', lastVerified: '2026-05-18', status: 'active' },

  // Budget Grinders
  'cuisinart-dbm8': { asin: 'B00019CZZG', name: 'Cuisinart DBM-8 Supreme Grind Burr Mill', category: 'grinders', priceRange: '$30-45', lastVerified: '2026-05-18', status: 'active' },
  'wilfa-svart-nino': { asin: 'B07HTZF9FQ', name: 'Wilfa Svart Nino Coffee Grinder', category: 'grinders', priceRange: '$45-60', lastVerified: '2026-05-18', status: 'active' },

  // Gift / Bundles
  'starbucks-variety-pack': { asin: 'B08KGJ95YS', name: 'Starbucks Coffee Variety Pack', category: 'coffee-beans', priceRange: '$25-35', lastVerified: '2026-05-18', status: 'active' },

  // Coffee Accessories
  'oxo-coffee-scale': { asin: 'B00KPVPTG4', name: 'OXO Good Grips Coffee Scale', category: 'kitchen', priceRange: '$30-40', lastVerified: '2026-05-18', status: 'active' },
  'hario-v60-kettle-stovetop': { asin: 'B06W2NWZWJ', name: 'Hario V60 Drip Coffee Kettle (Stovetop)', category: 'pour-over', priceRange: '$25-40', lastVerified: '2026-05-18', status: 'active' },
  'contigo-autoseal': { asin: 'B07YLZL5VV', name: 'Contigo Autoseal Travel Mug', category: 'kitchen', priceRange: '$20-30', lastVerified: '2026-05-18', status: 'active' },
};
