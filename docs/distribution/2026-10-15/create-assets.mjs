import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

sharp.concurrency(1);
sharp.cache({ memory: 16, files: 0, items: 8 });
const folder = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(folder, '../../reports/2026-10-15-affiliate-distribution-drafts.json');
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const W = 1000, H = 1500;
const font = 'Arial, DejaVu Sans, sans-serif';
const ink = '#203C35', muted = '#5A6860', cream = '#F6F2E7', gold = '#B87D36';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const layouts = {
  'coffee-maker-50': { lines: ['Choosing your', 'next coffee', 'maker?'], sub: 'Start with the details that matter.', checks: ['Capacity for your routine', 'Timers and daily controls', 'Filters and running costs'], label: 'COFFEE MAKER GUIDE' },
  'espresso-100': { lines: ['Ground coffee', 'or capsules?'], sub: 'Choose the workflow before the machine.', checks: ['Preparation steps', 'Included equipment', 'Ongoing coffee costs'], label: 'ESPRESSO BUYING GUIDE' },
  'french-press-30': { lines: ['Choose a', 'French press', 'that fits.'], sub: 'Your mug. Your space. Your routine.', checks: ['Usable capacity', 'Materials and cleaning', 'Matching replacement parts'], label: 'FRENCH PRESS GUIDE' },
  'burr-grinder-100': { lines: ['Manual or', 'electric', 'burr grinder?'], sub: 'Match the controls to your routine.', checks: ['Hand-grinding effort', 'Cup-based controls', 'Timed grinding'], label: 'GRINDER BUYING GUIDE' },
  'classic-bambino': { lines: ['Gaggia Classic', 'or Bambino', 'Plus?'], sub: 'Start with the milk workflow.', checks: ['Milk preparation', 'Exact model revision', 'Basket compatibility'], label: 'ESPRESSO COMPARISON' },
};

const manifest = {
  schema: 'affiliate-pin-creatives/v1', createdAt: new Date().toISOString(),
  source: 'docs/reports/2026-10-15-affiliate-distribution-drafts.json',
  dimensions: { width: W, height: H }, newSpend: 0, published: false,
  method: 'Code-drawn generic SVG coffee illustration and typography; local existing sharp rasterization; no generated product photography.',
  limitations: ['No account posting or profile changes.', 'No traffic, impressions, conversions, orders or income measured.', 'Destination equality and UTM parameters checked locally; live destination availability and article revision not rechecked by this asset task.', 'PNG files do not create clickable links; assign the manifest destination in the Pinterest pin form.', 'No price, stock, review score, hands-on test, or result guarantee in artwork.'],
  visualReview: { status: 'pending', samples: [] },
  assets: [],
};

for (const draft of source.drafts) {
  const layout = layouts[draft.id];
  if (!layout) throw new Error('Unexpected draft id');
  const destination = new URL(draft.destination);
  if (destination.origin !== 'https://brewtested.pulsedash-app.com' || destination.pathname !== draft.articlePath ||
      destination.searchParams.get('utm_source') !== 'pinterest' || destination.searchParams.get('utm_content') !== draft.id ||
      destination.searchParams.get('utm_medium') !== 'organic_social' || destination.searchParams.get('utm_campaign') !== 'buying_guides_20261015') throw new Error('Destination/UTM mismatch');
  const textBoxes = [];
  const parts = [];
  const text = (value, x, baseline, size, weight = 400, color = ink, maxWidth = 860) => {
    const element = `<text x="${x}" y="${baseline}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(value)}</text>`;
    parts.push(element);
    textBoxes.push({ text: value, x, baseline, fontSize: size, fontWeight: weight, maxWidth });
  };
  text('BrewTested', 70, 99, 38, 700);
  text(layout.label, 70, 153, 22, 700, muted);
  layout.lines.forEach((line, i) => text(line, 70, 268 + i * 93, 82, 700));
  text(layout.sub, 70, 533, 30, 400, muted);
  // Abstract cup and steam: no depiction or implied identity of a reviewed product.
  parts.push(`<g transform="translate(675 570)" stroke="${ink}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 30h130v65c0 45-130 45-130 0z"/><path d="M130 44h17c45 0 45 58 0 58h-17"/><path d="M-20 143h178"/><path d="M35 3c-20-27 20-26 0-53M82 3c-20-27 20-26 0-53"/></g>`);
  text('A clear checklist', 70, 652, 41, 700);
  text('before you choose.', 70, 702, 35, 400, muted, 560);
  parts.push(`<rect x="60" y="780" width="880" height="364" rx="34" fill="#FFFFFF"/><rect x="60" y="780" width="12" height="364" rx="6" fill="${gold}"/>`);
  layout.checks.forEach((line, i) => {
    const y = 857 + i * 104;
    parts.push(`<circle cx="116" cy="${y - 12}" r="20" fill="${cream}"/><path d="M107 ${y - 12}l7 7 13-15" stroke="${ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
    text(line, 158, y, 34, 400, ink, 730);
  });
  parts.push(`<rect x="60" y="1204" width="880" height="100" rx="50" fill="${ink}"/>`);
  text('READ THE BUYING GUIDE', 226, 1266, 30, 700, '#FFFFFF', 690);
  text('Research-based comparisons', 70, 1362, 27, 400, muted);
  text('brewtested.pulsedash-app.com', 70, 1422, 35, 700);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${font}"><title>${esc(draft.title)}</title><desc>Editorial buying checklist. ${esc(draft.description)}</desc><metadata>${esc(JSON.stringify({ destination: draft.destination, draftId: draft.id }))}</metadata><rect width="1000" height="1500" fill="${cream}"/><circle cx="992" cy="43" r="205" fill="#E7E3D3"/><a href="${esc(draft.destination)}">${parts.join('')}</a></svg>`;
  // Raster-measure every rendered text line with the exact same font/fallback.
  for (const box of textBoxes) {
    const probe = `<svg xmlns="http://www.w3.org/2000/svg" width="2200" height="260" font-family="${font}"><text x="20" y="150" font-size="${box.fontSize}" font-weight="${box.fontWeight}" fill="${ink}">${esc(box.text)}</text></svg>`;
    const rendered = await sharp(Buffer.from(probe)).trim().png().toBuffer({ resolveWithObject: true });
    const measured = { width: rendered.info.width, height: rendered.info.height };
    if (measured.width > box.maxWidth || box.x + measured.width > 940 || box.baseline + box.fontSize * 0.3 > 1460 || box.baseline - box.fontSize < 35) throw new Error(`Text outside safe bounds: ${draft.id}`);
    box.measured = measured;
    box.safeBoundsPassed = true;
  }
  const svgName = `${draft.id}.svg`, pngName = `${draft.id}.png`;
  await writeFile(path.join(folder, svgName), `${svg}\n`, 'utf8');
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 8 }).toBuffer();
  const metadata = await sharp(png).metadata();
  if (metadata.width !== W || metadata.height !== H) throw new Error('Wrong output dimensions');
  await writeFile(path.join(folder, pngName), png);
  manifest.assets.push({ id: draft.id, title: draft.title, svg: svgName, png: pngName, pngBytes: png.length,
    dimensions: { width: metadata.width, height: metadata.height }, destination: draft.destination,
    caption: `${draft.description} Disclosure: contains affiliate links; as an Amazon Associate, BrewTested earns from qualifying purchases.`,
    altText: `${layout.label.toLowerCase()}: ${layout.lines.join(' ')} Checklist: ${layout.checks.join('; ')}. BrewTested.`,
    status: 'creative_created_not_posted', liveDestinationVerified: false,
    textBounds: { method: 'Each line rasterized and trimmed with the same SVG font, then measured against safe page bounds.', allPassed: textBoxes.every(box => box.safeBoundsPassed), boxes: textBoxes },
  });
}
await writeFile(path.join(folder, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ assets: manifest.assets.length, dimension: `${W}x${H}`, pngBytes: manifest.assets.reduce((sum, asset) => sum + asset.pngBytes, 0), textBoxes: manifest.assets.reduce((sum, asset) => sum + asset.textBounds.boxes.length, 0), textBoundsPassed: manifest.assets.every(asset => asset.textBounds.allPassed), liveDestinationVerified: false }));
