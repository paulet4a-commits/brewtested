import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const md = (value) => String(value ?? 'not measured').replace(/[\r\n|<>\x60]/g, ' ').slice(0, 220);
export function summarize(site, programs) {
  if (site.schema !== 'affiliate-operations/v1' || programs.schema !== 'affiliate-program-watch/v1') throw new Error('Unsupported report schema');
  const types = new Map();
  for (const finding of site.findings) types.set(finding.type, (types.get(finding.type) ?? 0) + 1);
  const observations = Array.isArray(programs.observations) ? programs.observations : [];
  const siteObservations = site.public?.observations ?? [];
  const siteOK = siteObservations.filter((item) => item.status === 200).length;
  const programOK = observations.filter((item) => item.status === 'observed').length;
  const programReview = observations.filter((item) => item.reviewDue === true || item.status !== 'observed').length;
  const lines = [
    '# Affiliate operations review',
    '',
    `Coverage: owned HTTP ${siteOK}/${siteObservations.length} returned 200; official program text ${programOK}/${observations.length} observed. Program reviews outstanding: ${programReview}. A completed workflow means reports were produced, not that sources or the business are healthy.`,
    '',
    `Observed: ${md(site.observedAt)}. Source: bounded owned-site HTTP and local source audit; separate official-program page observations.`,
    '',
    '| Observation | Result |',
    '|---|---|',
    `| Source files | ${site.summary.posts ?? 'unknown'} (not a unique live article count) |`,
    `| Active code products | ${site.summary.activeCodeProducts ?? 'unknown'} |`,
    `| Unverified code products | ${site.summary.unverifiedCodeProducts ?? 'unknown'} |`,
    `| Product review dates past threshold | ${site.summary.staleCodeProducts ?? 'unknown'} |`,
    `| Approved code routes | ${site.summary.approvedCodeRoutes ?? 'unknown'} (account approval not verified) |`,
    `| Physical-test claim candidates | ${['personal_testing_claim','testing_volume_claim','testing_duration_claim'].reduce((n,t)=>n+(types.get(t)??0),0)} |`,
    `| Site HTTP observations | ${site.public?.observations?.length ?? 0} |`,
    `| Program observations | ${observations.length} |`,
    '| Account traffic, sales and revenue | Not measured by this job |',
    '',
    '## Site health and changes',
    '',
    `Baseline: ${md(site.changes?.baseline)}; added ${site.changes?.added?.length ?? 0}, changed ${site.changes?.changed?.length ?? 0}, resolved ${site.changes?.resolved?.length ?? 0}, not observed again ${site.changes?.notObserved?.length ?? 0}.`,
    '',
  ];
  for (const item of site.public?.observations ?? []) lines.push(`- ${md(item.kind)}: ${md(item.url)} — ${md(item.status ?? item.error)}`);
  lines.push('', '## Official program observations', '');
  for (const item of observations) lines.push(`- ${md(item.id ?? item.programId ?? item.url)} — ${md(item.state ?? item.status)}; change: ${md(item.change)}; reviewDue: ${md(item.reviewDue)}; reason: ${md(item.error ?? 'none')}; metadata comparison: ${md(item.metadataComparison ?? 'not applicable')}. A changed page requires review; it is not an approval or an automatically accepted term.`);
  lines.push('', '## Next work', '',
    '1. Investigate owned-site access failures and any new evidence-gate failures.',
    '2. Review changed official terms before changing links, applications or claims.',
    '3. Verify current product facts for the existing homepage buying guides. Do not refresh dates without a real review.',
    '4. Read authorized GSC/analytics and affiliate account reports to select the first five traffic experiments; do not infer traffic from sitemap counts.',
    '5. Complete existing program and payout checks through the protected account session. Keep coffee and creator/developer audiences relevant.',
    '',
    'This scheduled observer does not run a model, publish content, send messages, apply to programs, or process money. Artifacts are dated observations; native program trackers and provider accounts remain authoritative.',
    '');
  return lines.join('\n');
}

async function main(args) {
  const flags = new Map();
  for (let i = 0; i < args.length; i += 2) {
    if (!['--site', '--programs', '--output'].includes(args[i]) || !args[i+1]) throw new Error('Expected --site file.json --programs file.json --output file.md');
    flags.set(args[i], args[i+1]);
  }
  if (flags.size !== 3) throw new Error('Missing report paths');
  const site = JSON.parse(await readFile(flags.get('--site'), 'utf8'));
  const programs = JSON.parse(await readFile(flags.get('--programs'), 'utf8'));
  await writeFile(flags.get('--output'), summarize(site, programs), { flag: 'wx', mode: 0o600 });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2)).catch((error) => { console.error(error.message); process.exitCode=1; });
