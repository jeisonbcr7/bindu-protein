import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

// Infrastructure values come exclusively from the production environment.
const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
const account = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const projectName = process.env.CLOUDFLARE_PROJECT_NAME?.trim();
const expectedHost = process.env.CLOUDFLARE_EXPECTED_HOSTNAME?.trim();
const fail = message => { console.error(message); process.exit(1); };
if (process.env.GITHUB_REF !== 'refs/heads/main') fail('Production deployments require the main branch.');
if (!token || /\s/.test(token)) fail('CLOUDFLARE_API_TOKEN must contain only the token, without a Bearer prefix or command. Update this secret in the production environment.');
if (!/^[a-f0-9]{32}$/i.test(account || '')) fail('CLOUDFLARE_ACCOUNT_ID must contain the 32-character Account ID, not a URL. Update this secret in production.');
if (!/^[a-z0-9][a-z0-9-]*$/.test(projectName || '')) fail('CLOUDFLARE_PROJECT_NAME must contain only the exact Pages project name, without a URL. Update this secret in production.');
if (!/^[a-z0-9.-]+\.pages\.dev$/.test(expectedHost || '')) fail('CLOUDFLARE_EXPECTED_HOSTNAME must contain the Pages hostname, without https:// or a trailing slash. Update this secret in production.');
try {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects/${projectName}`, {
    headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    // Only numeric status/error codes are safe to print; response messages may include private values.
    const codes = Array.isArray(data?.errors) ? data.errors.map(error => error?.code).filter(Number.isSafeInteger) : [];
    console.error(`Cloudflare project lookup failed: HTTP ${response.status}${codes.length ? `; API codes ${codes.join(', ')}` : ''}.`);
    if (response.status === 401 || response.status === 403) {
      fail('Cloudflare refused authorization. Check the token is active, has Account > Cloudflare Pages > Edit for the selected account, and CLOUDFLARE_ACCOUNT_ID is the Account ID rather than the Zone ID.');
    }
    if (response.status === 404) {
      const listing = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects`, {
        headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000),
      });
      const listed = await listing.json().catch(() => null);
      if (listing.ok && listed?.success) fail('The account is accessible, but this Pages project was not found. Correct CLOUDFLARE_PROJECT_NAME using the project name from Workers & Pages.');
      fail('The account or project could not be found or accessed. Verify Account ID, project name and token account scope.');
    }
    if (response.status === 429 || response.status >= 500) fail('Cloudflare returned a temporary service error. Retry this workflow later.');
    fail('Cloudflare rejected the project lookup. Check the numeric API code, Account ID, project name and token permissions.');
  }
  const project = data.result;
  if (project?.name !== projectName) fail('Cloudflare returned a different project. Check CLOUDFLARE_PROJECT_NAME. No files were published.');
  if (project?.subdomain !== expectedHost) fail('The project was found, but CLOUDFLARE_EXPECTED_HOSTNAME does not match its Pages hostname. Correct this secret. No files were published.');
  const branch = project.production_branch;
  if (typeof branch !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(branch)) fail('A valid production branch could not be verified.');
  for (const value of [project.subdomain, ...(project.domains || []), branch]) {
    if (typeof value === 'string' && value) console.log(`::add-mask::${value.replaceAll('\r', '%0D').replaceAll('\n', '%0A')}`);
  }
  const result = spawnSync(process.execPath, [resolve('node_modules/wrangler/bin/wrangler.js'), 'pages', 'deploy', 'dist', `--project-name=${projectName}`, `--branch=${branch}`], {
    encoding: 'utf8', timeout: 300000, maxBuffer: 8 * 1024 * 1024,
    env: { ...process.env, CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: account, WRANGLER_SEND_METRICS: 'false' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  // Wrangler can print infrastructure details; do not publish its output or logs.
  if (result.status !== 0 || result.error) fail('Production deployment failed. Review deployment status in the private Cloudflare dashboard.');
  console.log('Production deployment completed successfully.');
} catch {
  fail('Production deployment could not be completed. No infrastructure details were logged.');
}
