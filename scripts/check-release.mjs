import { readFileSync } from 'node:fs';

if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const pr = event.pull_request;
  if (pr?.base?.ref === 'main' && (pr.head.ref !== 'develop' || pr.head.repo?.full_name !== pr.base.repo?.full_name)) {
    console.error('Production changes must use a develop to main pull request from this repository.');
    process.exit(1);
  }
}
console.log('Release branch policy verified.');
