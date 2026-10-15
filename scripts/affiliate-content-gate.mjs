import { pathToFileURL } from 'node:url';
import { runAudit } from './affiliate-ops.mjs';

export function blockingFindings(report) {
  if (report.schema !== 'affiliate-operations/v1' || !Array.isArray(report.findings)) throw new Error('Unsupported audit report');
  return report.findings.filter((item) => [
    'personal_testing_claim', 'testing_volume_claim', 'testing_duration_claim',
    'raw_routing_mdx', 'product_parser_unknown',
  ].includes(item.type));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = await runAudit();
  const blocked = blockingFindings(report);
  if (blocked.length) {
    for (const item of blocked) console.error(`${item.type}: ${item.source} — ${item.detail}`);
    console.error(`Content evidence gate: ${blocked.length} blocking source finding(s). No original physical test evidence is registered.`);
    process.exitCode = 1;
  } else {
    console.log(`Content evidence gate passed for ${report.summary.posts} source files. Product freshness and remaining editorial claims require separate review.`);
  }
}
