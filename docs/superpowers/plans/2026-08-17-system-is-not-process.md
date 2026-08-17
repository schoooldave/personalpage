# System Is Not Process Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the third FMCG field-note article, “系统不等于流程”, as a distinct page that explains why system steps cannot replace judgment, exception handling, and responsibility.

**Architecture:** Add a structured third article record to `lib/portfolio.ts` while preserving the first two articles. Render the third article through the existing field-note page pattern, using a system-versus-real-process comparison, three editorial sections, compact practice-source links, and the existing evidence portal interaction where appropriate.

**Tech Stack:** Next.js App Router, React/TypeScript, CSS Modules, existing motion/evidence components, Vitest, ESLint.

---

### Task 1: Add the third article content model

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/lib/portfolio.ts`
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/lib/portfolio.test.ts`

- [ ] Add a structured `system-is-not-process` article record without changing the first article’s content.
- [ ] Set its title to `系统不等于流程` and core judgment to `系统可以承载流程，但不能自动生成流程。真实流程还包括判断、例外处理、角色协同和责任承接。`.
- [ ] Add exactly three sections: `判断不是点击`, `例外不是错误`, and `责任不是状态`; each section contains a title, two paragraphs, a pull quote, and one practice-source block.
- [ ] Add comparison data for `系统里的流程` and `真实的流程`, each with three items.
- [ ] Use only verified practice anchors: SFA scoring activity, SFA organization/store permission governance, and product coordination across requirements, model design, R&D, testing, release, and issue tracking.
- [ ] Update `lib/portfolio.test.ts` with focused assertions for the new article title, core judgment, comparison item counts, and three section titles.
- [ ] Run `npm test -- lib/portfolio.test.ts`; expect the focused tests to pass.
- [ ] Commit with `git add lib/portfolio.ts lib/portfolio.test.ts && git commit -m "content: add system is not process essay"`.

### Task 2: Render the third article page

**Files:**
- Create or modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/notes/system-process/page.tsx`
- Create or modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/notes/system-process/system-process.module.css`

- [ ] Render the header with the title, core judgment, and the question “为什么系统里的步骤都对，到了现场却仍然需要反复解释、协调和绕行？”.
- [ ] Render the dark comparison block with the two columns `系统里的流程` and `真实的流程`; keep three items in each column.
- [ ] Render the three article sections with numbered labels, readable long-form paragraphs, one pull quote, and a compact practice-source block.
- [ ] Keep project details subordinate; source links may point to `/cases/sfa` or `/cases/dms` but must not turn the article into a case study.
- [ ] Add the conclusion: `系统的边界，不是能力不足，而是它不能替组织完成理解与协同。`.
- [ ] Add desktop three-column layout and mobile stacked layout with no horizontal overflow.
- [ ] Respect reduced motion and provide focus-visible states for links.
- [ ] Run `curl -sS -o /dev/null -w '%{http_code}\\n' http://localhost:3000/notes/system-process`; expect `200`.
- [ ] Commit with `git add app/notes/system-process && git commit -m "feat: add system is not process article"`.

### Task 3: Connect the article to the existing field-note navigation

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/page.tsx` only if the existing field-note link data requires it
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/notes/page.tsx` only if article navigation requires it

- [ ] Add the third article link using the existing navigation style, with label `系统不等于流程` and href `/notes/system-process`.
- [ ] Preserve the first article’s current URL and the second article’s current draft/entry behavior.
- [ ] Do not modify unrelated homepage or case-page content.

### Task 4: Run minimum verification

**Files:**
- No new files.

- [ ] Run `npm test -- lib/portfolio.test.ts app/notes/evidence-portal.test.ts`; expect all focused tests to pass.
- [ ] Run `npm run lint`; expect no ESLint warnings or errors.
- [ ] Check both `curl -sS -o /dev/null -w '%{http_code}\\n' http://localhost:3000/notes` and the new article URL; expect `200` for both.
- [ ] Manually check the new article’s first screen, comparison block, three sections, source links, mobile layout, and reduced-motion fallback.
- [ ] Leave unrelated existing worktree changes untouched.
