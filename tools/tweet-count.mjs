#!/usr/bin/env node
// tweet-count — the copy is a claim about length; the check makes it
// true. Walks every ```tweet block in ANNOUNCEMENT.md and counts it
// the way X does: every URL (http…) weighs 23, everything else 1.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const md = readFileSync(join(root, 'ANNOUNCEMENT.md'), 'utf8');

const blocks = [...md.matchAll(/```tweet\n([\s\S]*?)```/g)].map((m) => m[1].trimEnd());
if (blocks.length === 0) { console.error('✗ no tweet blocks found'); process.exit(1); }

let failures = 0;
for (const [i, b] of blocks.entries()) {
  const n = b.replace(/https?:\/\/\S+/g, 'x'.repeat(23)).length;
  const first = b.split('\n')[0].slice(0, 40);
  const ok = n <= 280;
  if (!ok) failures += 1;
  console.log(`${ok ? '✓' : '✗'} tweet ${i + 1} (${n}/280): ${first}…`);
}
if (failures > 0) { console.error(`${failures} tweet(s) over the limit`); process.exit(1); }
console.log(`all ${blocks.length} tweets fit 280`);
