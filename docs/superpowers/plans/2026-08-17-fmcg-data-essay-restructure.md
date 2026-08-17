# FMCG Data Essay Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current `/notes` mixed project-and-essay page with a concise FMCG industry essay centered on the hidden cost/value asymmetry of data contribution.

**Architecture:** Keep the page server-rendered and keep the existing `EvidencePortal` client component as the only interactive evidence layer. Move the article’s content model into `lib/portfolio.ts`, render the three editorial movements and the value-chain summary from `app/notes/page.tsx`, and use `notes.module.css` plus `essay.module.css` for the new hierarchy and responsive layout.

**Tech Stack:** Next.js App Router, React/TypeScript, CSS Modules, existing clip-path evidence portal, Vitest, ESLint.

---

### Task 1: Replace the field-note content model

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/lib/portfolio.ts`
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/lib/portfolio.test.ts`

- [ ] Update the first `fieldNotes` item title to `数据不等于价值` and subtitle to the question `为什么企业获得了更多渠道数据，却没有同步获得更真实的经营判断？`.
- [ ] Replace the current project-first thought paragraphs with content fields for the three movements: role/value asymmetry, continuous collection, and judgment-to-action.
- [ ] Add structured values for the three role cards: 总部、销售、经销商; each must include its benefit/cost statement.
- [ ] Add the five-step chain labels: 稳定采集、数据可靠、形成判断、推动行动、结果反馈.
- [ ] Keep DMS evidence facts limited to the existing verified values: 600+重点经销商、约80%销售业务覆盖、上传率约70%→90%; preserve the boundary that these do not prove sales growth.
- [ ] Update the focused portfolio tests to assert the new title, question, three movement count, five chain steps, and evidence boundary.
- [ ] Run `npm test -- lib/portfolio.test.ts`; expect the focused portfolio tests to pass.
- [ ] Commit only the content-model changes with `git add lib/portfolio.ts lib/portfolio.test.ts && git commit -m "content: restructure FMCG data essay"`.

### Task 2: Rebuild the `/notes` editorial layout

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/notes/page.tsx`
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/notes/notes.module.css`
- Modify only if needed: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/notes/essay.module.css`

- [ ] Render the header with only the title, the industry question, and a short explanation of the hidden role/cost asymmetry; remove `阶段性理解` and unnecessary first-person framing.
- [ ] Render a dark full-width thesis band containing the central judgment: 总部获得可见性，销售与经销商承担采集成本，贡献与收益不对称时采集容易变成管理任务.
- [ ] Render three role cards with clear distinction between benefit and cost; use a horizontal three-column layout on desktop and a vertical layout on mobile.
- [ ] Render exactly three editorial movements, each with a number, heading, two or three paragraphs, one pull quote, and one compact experience-source block.
- [ ] Render the five-step value chain after the movements as a concise summary track, not five separate content chapters.
- [ ] Render a dark conclusion band containing the final industry judgment and the existing data-boundary statement.
- [ ] Keep `<EvidencePortal />` attached to the experience-source area so the existing circular evidence interaction remains available without moving project details into the main article.
- [ ] Add responsive rules preventing horizontal overflow and keeping readable line lengths; preserve `focus-visible` and reduced-motion styles.
- [ ] Run `curl -sS -o /dev/null -w '%{http_code}\\n' http://localhost:3000/notes`; expect `200`.
- [ ] Commit the page and style changes with `git add app/notes && git commit -m "feat: redesign FMCG industry essay page"`.

### Task 3: Perform the minimum verification

**Files:**
- No new files.

- [ ] Run `npm test -- lib/portfolio.test.ts app/notes/evidence-portal.test.ts`; expect all focused tests to pass.
- [ ] Run `npm run lint`; expect no ESLint warnings or errors.
- [ ] Check `curl -sS -o /dev/null -w '%{http_code}\\n' http://localhost:3000/notes`; expect `200`.
- [ ] Manually check only the essential flow: article first screen shows the industry question, three movements are readable, evidence source remains available, circular portal opens/closes, mobile view has no horizontal overflow.
- [ ] Leave unrelated existing worktree changes untouched.
