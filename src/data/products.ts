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
};
