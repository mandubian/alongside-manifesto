#!/usr/bin/env node
// check-site — the telling must match the text.
//
// docs/index.html mirrors MANIFESTO.md: the ten commitments and the
// version line must appear verbatim (whitespace-normalized), and every
// Q&A question excerpted on the page must exist in QA.md. Run on every
// push (.github/workflows/check.yml). Zero dependencies.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const md = readFileSync(join(root, 'MANIFESTO.md'), 'utf8');
const qa = readFileSync(join(root, 'QA.md'), 'utf8');
const html = readFileSync(join(root, 'docs', 'index.html'), 'utf8');

const norm = (s) => s
  .replace(/<\/?[a-z][^>]*>/gi, '')        // strip tags entirely (page side)
  .replace(/\*\*/g, '').replace(/\*/g, '') // strip md emphasis (text side)
  .replace(/\s+/g, ' ')
  .trim();
const page = norm(html);

let failures = 0;
const check = (ok, msg) => { if (!ok) { failures += 1; console.error(`✗ ${msg}`); } };

// 1 · the version
const version = md.match(/\*Version ([\d.]+) —/)?.[1];
check(version != null, 'MANIFESTO.md has a version line');
check(version != null && page.includes(`draft v${version}`), `the page names version ${version}`);

// 2 · the ten commitments: body verbatim, title present
const paras = md.split(/\n\n+/).filter((p) => /^\*\*\d+\./.test(p));
check(paras.length === 10, `MANIFESTO.md yields ten commitments (found ${paras.length})`);
for (const para of paras) {
  const m = para.match(/^\*\*(\d+)\.\s*([^*]+)\*\*\s*([\s\S]*)$/);
  const [, n, title, body] = m;
  check(page.includes(norm(body)), `commitment ${n}'s text appears on the page verbatim`);
  check(page.includes(title.trim().replace(/\.$/, '')), `commitment ${n}'s title appears on the page`);
}

// 3 · every Q&A question on the page exists in QA.md
const questions = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((m) => m[1].trim());
for (const q of questions) {
  check(qa.includes(q), `Q&A excerpt "${q}" exists in QA.md`);
}
check(questions.length >= 5, 'the page carries Q&A excerpts');

if (failures > 0) { console.error(`${failures} check(s) failed`); process.exit(1); }
console.log(`site matches the text: 10 commitments, version ${version}, ${questions.length} Q&A excerpts verified`);
