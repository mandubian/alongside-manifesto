#!/usr/bin/env node
// check-site — the telling must match the text.
//
// docs/index.html mirrors MANIFESTO.md: the ten commitments and the
// version line must appear verbatim (whitespace-normalized); every
// Q&A question excerpted on the page must exist in QA.md, and every
// excerpted sentence must exist in it verbatim — an excerpt may be
// shorter than the answer, never different from it. Run on every push
// and PR (.github/workflows/check.yml). Zero dependencies.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const md = readFileSync(join(root, 'MANIFESTO.md'), 'utf8');
const qa = readFileSync(join(root, 'QA.md'), 'utf8');
const html = readFileSync(join(root, 'docs', 'index.html'), 'utf8');

const norm = (s) => s
  .replace(/<\/?[a-z][^>]*>/gi, '')        // strip tags entirely (page side)
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // md links keep their text
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

// 3 · every Q&A question on the page exists in QA.md, and every
//     excerpted sentence exists in it verbatim — an excerpt may be
//     shorter than the answer, never different from it
const qaNorm = norm(qa);
const excerpts = [...html.matchAll(/<summary>([^<]+)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)];
for (const [, q, a] of excerpts) {
  for (const sentence of norm(a).split(/(?<=[.?!])\s+/)) {
    check(qaNorm.includes(sentence), `excerpt sentence exists in QA.md — "${sentence.slice(0, 60)}…" (question: ${q.trim()})`);
  }
}
const questions = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((m) => m[1].trim());
for (const q of questions) {
  check(qa.includes(q), `Q&A excerpt "${q}" exists in QA.md`);
}
check(questions.length >= 5, 'the page carries Q&A excerpts');

// 5 · the stated QA count is the real one
const qaCount = (qa.match(/^### /gm) || []).length;
const statedCount = html.match(/All (\d+) answers in/)?.[1];
check(statedCount != null && Number(statedCount) === qaCount,
  `the page's QA count (${statedCount}) matches QA.md (${qaCount})`);

// 6 · markdown hygiene, learned the hard way (a72a2f0): no mid-line
//     backslashes, and the text files end with a single newline
for (const f of ['MANIFESTO.md', 'CONCEPTS.md', 'README.md', 'QA.md']) {
  const s = readFileSync(join(root, f), 'utf8');
  check(!s.includes('\\ '), `${f}: no mid-line backslash (a hard break belongs at a line's end)`);
  check(s.endsWith('\n') && !s.endsWith('\n\n'), `${f}: ends with a single newline`);
}

if (failures > 0) { console.error(`${failures} check(s) failed`); process.exit(1); }
console.log(`site matches the text: 10 commitments, version ${version}, ${questions.length} Q&A excerpts verified`);
