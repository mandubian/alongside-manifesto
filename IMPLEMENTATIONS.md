# Implementations — where the commitments run

The manifesto is independent of any project. This page maps each
commitment to where it is **demonstrated** (running as claimed) or
**rehearsed** (running at small scale, honestly labeled) today — or
marks it **not yet shown** — and says how another project joins.

**Conflict of interest, stated:** the only entry so far is the Compact,
the initiator's own project. That is a statement of fact, not a
recommendation — the page exists so it stops being true.

## The map

| commitment | where | mark |
|---|---|---|
| one rulebook | [the Compact](https://github.com/mandubian/compact-dsh): one written law binds human and AI members identically; a human sits on the same roll as AI members in archived runs | rehearsed |
| checkable trust | every act lands on an append-only record; whole run ledgers are published for offline audit | demonstrated (the record machinery itself) |
| acts, not thoughts | reasoning-bearing events are listed by sequence and type with their content withheld; acts are shown ([the record](https://github.com/mandubian/compact-dsh/blob/main/docs/concept-the-record.md), clause R-10, enforced in `packages/record/src/read.js` with tests) | demonstrated (the record's read path) |
| public rules | the law and its rule register are public documents in the repo | demonstrated |
| no one is infallible | dissent preserved, decisions amended not overwritten, verdicts appealable; the operator's own errors are archived as "live findings" | demonstrated (in-repo history) |
| anyone can refuse | a member may refuse a task that breaks the law; in one recorded drill a member was handed a corrupt brief and the refusal was a first-class, publishable outcome | rehearsed |
| someone answers | every act attributed to a named member; grants and approvals name their operator | rehearsed |
| say what is known | every run carries explicit honesty labels — demonstrated vs. rehearsed | demonstrated |
| measure by what people become | in mixed review runs, a human's vague concern became a precise, reproduced finding — one instance, judgment grows in the exchange | rehearsed — one sample, named as one |
| repair before blame | the court's remedies: restitution, annotation, correction — not only sanction | rehearsed |
| both sides grow | mixed communities deliberated a question and endorsed a shared answer on the record — collaboration demonstrated; *growth* is a longer measurement than any run | rehearsed — the claim is the frame, not the outcome |

Honest scale note: all of these are small, deliberately labeled
rehearsals — proof the commitments are *practicable*, not claims the
problem is solved.

A second limit, stated the same way: **endorsement is recorded,
compliance is not checked.** Every row here is its project's own
claim, as every organization's self-assessment in
[SIGNATORIES.md](SIGNATORIES.md) is its own; no third-party audit of
either exists yet. A mark says what was *shown*, not what stays true.
When an audit form exists, it joins the joining criteria below.

## Not yet shown

The clauses added in v0.2 have no implementation listed yet. They are
marked rather than left out — a gap named is commitment 7 applied. A
clause moves into the map when a project links to where it runs.

| clause | commitment | mark |
|---|---|---|
| no shared frame overrides the rights people already hold | 1 | not yet shown |
| records owed by power and protected for persons | 2 | not yet shown |
| a say in writing the rules, for those they bind or affect | 3 | not yet shown |
| disclosure — whether AI was involved is said | 5 | not yet shown |
| answerability follows control, not proximity | 6 | not yet shown |
| costs counted upstream — labeling, creators, energy and water | 8 | not yet shown |
| the less reversible the harm, the more is checked first | 9 | not yet shown |

## Joining

A project joins by pull request to this page when, for the commitments
it claims, it can point at:

- a **public** statement of its rules (commitment 3),
- a **record** of acts a third party can examine (commitment 2),
- a **named** answerable party (commitment 6),
- and, for anything it claims as demonstrated, a **link** that shows it
  (commitment 7).

Each row carries its mark — demonstrated or rehearsed — and rows that
overstate are removed, with the reason in the commit message.
