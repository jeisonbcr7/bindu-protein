import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

// Infrastructure values come exclusively from the production environment.
const token = process.env.CLOUDFLARE_API_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const projectName = process.env.CLOUDFLARE_PROJECT_NAME;
const expectedHost = process.env.CLOUDFLARE_EXPECTED_HOSTNAME;
const fail = message => { console.error(message); process.exit(1); };
if (process.env.GITHUB_REF !== 'refs/heads/main') fail('Production deployments require the main branch.');
if (!token || !/^[a-f0-9]{32}$/i.test(account || '') || !/^[a-z0-9][a-z0-9-]*$/.test(projectName || '') || !/^[a-z0-9.-]+\.pages\.dev$/.test(expectedHost || '')) {
  fail('Production secrets are missing or invalid. Check the deployment guide.');
}
try {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects/${projectName}`, {
    headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) fail('Could not verify the deployment target. Check the account and Pages token permissions.');
  const data = await response.json();
  const project = data.result;
  if (!data.success || project?.name !== projectName || project?.subdomain !== expectedHost) fail('Deployment target verification failed. No files were published.');
  const branch = project.production_branch;
  if (typeof branch !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(branch)) fail('A valid production branch could not be verified.');
  for (const value of [project.subdomain, ...(project.domains || []), branch]) {
    if (typeof value === 'string' && value) console.log(`::add-mask::${value.replaceAll('\r', '%0D').replaceAll('\n', '%0A')}`);
  }
  const result = spawnSync(process.execPath, [resolve('node_modules/wrangler/bin/wrangler.js'), 'pages', 'deploy', 'dist', `--project-name=${projectName}`, `--branch=${branch}`], {
    encoding: 'utf8', timeout: 300000, maxBuffer: 8 * 1024 * 1024,
    env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  // Wrangler can print infrastructure details; do not publish its output or logs.
  if (result.status !== 0 || result.error) fail('Production deployment failed. Review deployment status in the private Cloudflare dashboard.');
  console.log('Production deployment completed successfully.');
} catch {
  fail('Production deployment could not be completed. No infrastructure details were logged.');
}
