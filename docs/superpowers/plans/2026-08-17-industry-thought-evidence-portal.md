# Industry Thought Evidence Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible circular evidence portal to `/notes` so the industry essay remains primary while DMS project evidence opens in a distinct animated layer.

**Architecture:** Keep the article server-rendered in `app/notes/page.tsx`. Add a focused client component for opening, animating, closing, focus restoration, and scroll restoration. Keep evidence data in `lib/portfolio.ts`; keep layout and motion styles in `app/notes/notes.module.css`.

**Tech Stack:** Next.js App Router, React client component, TypeScript, CSS transitions/clip-path, existing test setup, ESLint.

---

### Task 1: Define portal state behavior

**Files:**
- Create: `app/notes/evidence-portal.ts`
- Create: `app/notes/evidence-portal.test.ts`

- [ ] Write failing tests for `closed`, `opening`, `open`, and `closing` transitions, saved scroll position, and reduced-motion transitions.
- [ ] Run `npm test -- --runInBand app/notes/evidence-portal.test.ts`; expect failure because helpers do not exist.
- [ ] Implement typed pure transition helpers with scroll position passed as data; keep DOM operations out of this file.
- [ ] Run the focused test again; expect PASS.
- [ ] Commit with `git add app/notes/evidence-portal.ts app/notes/evidence-portal.test.ts && git commit -m "test: define evidence portal state"`.

### Task 2: Build the client evidence portal

**Files:**
- Create: `app/notes/EvidencePortal.tsx`
- Modify: `app/notes/page.tsx`
- Modify: `app/notes/notes.module.css`

- [ ] Add the trigger `查看这项判断从何而来` and a full-viewport evidence layer with `role="dialog"` and `aria-modal="true"`.
- [ ] On open, save `window.scrollY`, lock body scrolling, set the circular origin from the trigger, and focus the close control.
- [ ] On close or Escape, unlock scrolling, restore `window.scrollTo(0, savedScrollY)`, and return focus to the trigger.
- [ ] Read `prefers-reduced-motion`; skip the circular transition when enabled while keeping the same content and focus behavior.
- [ ] Render the four evidence groups: `现实矛盾`, `我的判断`, `推动改变`, `结果验证`, plus `600+` and `70%→90%`.
- [ ] Use `clip-path: circle(0 at var(--portal-x) var(--portal-y))` for closed and `circle(150vmax at var(--portal-x) var(--portal-y))` for open; animate only composited properties and stagger content entrance.

### Task 3: Refine hierarchy and responsive behavior

**Files:**
- Modify: `app/notes/notes.module.css`
- Modify only if needed: `app/notes/essay.module.css`

- [ ] Keep article title, lead, and long-form paragraphs dominant; style the trigger as an editorial link with an orange circular marker, not a primary card.
- [ ] Make the evidence layer visibly distinct with a dark surface, grid dividers, compact labels, and denser evidence layout.
- [ ] Collapse evidence to one column on mobile and prevent horizontal overflow.
- [ ] Add focus-visible outlines, contrast, and a fully usable no-motion fallback.

### Task 4: Verify and commit

- [ ] Run `npm test -- --runInBand`; expect all tests to pass.
- [ ] Run `npm run lint`; expect no lint errors.
- [ ] Run `curl -I http://localhost:3000/notes`; expect HTTP 200.
- [ ] Manually verify open, circular reveal, staggered content, Escape close, focus restoration, scroll restoration, reduced motion, and narrow viewport overflow.
- [ ] Commit with `git add app/notes && git commit -m "feat: add circular project evidence portal"`.
