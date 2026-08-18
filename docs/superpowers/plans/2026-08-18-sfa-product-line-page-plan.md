# SFA Product Line Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/cases/sfa` as a product-line practice page with a clear product lifecycle, two independent representative iterations, and an evidence-bounded product judgment.

**Architecture:** Keep shared case routing and the DMS implementation unchanged. Expand `caseDetails.sfa` into a structured content model, render it through a dedicated `SfaCaseContent` component, and isolate SFA-specific layout rules in a separate CSS module. Use content-data tests to protect evidence boundaries and page structure.

**Tech Stack:** Next.js 14, React 18, TypeScript, CSS Modules, Vitest

---

## File map

- Modify `lib/portfolio.ts`: store structured SFA product-line content.
- Modify `lib/portfolio.test.ts`: update stale DMS assertions and add SFA structure/evidence tests.
- Create `app/cases/[slug]/SfaCaseContent.tsx`: render the SFA-only content hierarchy.
- Create `app/cases/[slug]/sfa.module.css`: own SFA product-line, lifecycle, and dual-case layouts.
- Modify `app/cases/[slug]/page.tsx`: delegate the SFA branch to `SfaCaseContent`; leave DMS markup unchanged.

### Task 1: Protect the current evidence baseline with content tests

**Files:**
- Modify: `lib/portfolio.test.ts`

- [ ] **Step 1: Replace the stale DMS expectations**

Update the existing DMS test so it matches the confirmed content already present in `portfolio.ts`:

```ts
expect(dms.period).toBe("2023—2024");
expect(dms.signals.map(([value]) => value)).toEqual(["65%", "800+", "约 80%"]);
expect(JSON.stringify(dms)).not.toMatch(/Top 300|2025 年 10 月|80\+|31省|619家|70万\+/);
```

- [ ] **Step 2: Add a failing SFA product-line structure test**

```ts
it("structures SFA as a product line with two independent iterations", () => {
  const sfa = caseDetails.sfa;
  expect(sfa.title).toBe("SFA 销售执行产品线实践");
  expect(sfa.domains).toEqual([
    "门店拜访",
    "活动执行",
    "陈列检查",
    "费用采集",
    "门店评分",
    "主数据",
    "权限管理",
  ]);
  expect(sfa.lifecycle).toHaveLength(7);
  expect(sfa.iterations.map((item) => item.id)).toEqual([
    "high-potential-store",
    "permission-governance",
  ]);
  expect(sfa.iterations.every((item) => item.problem && item.contribution.length && item.outcome.length)).toBe(true);
});
```

- [ ] **Step 3: Add a failing responsibility-boundary test**

```ts
it("keeps SFA claims within the confirmed responsibility boundary", () => {
  const serialized = JSON.stringify(caseDetails.sfa);
  expect(serialized).toContain("业务团队负责指标定义与评分规则");
  expect(serialized).toContain("上级经理统筹整体营销产品规划");
  expect(serialized).not.toMatch(/我定义了评分标准|整体营销产品方向负责人|提升\d+%/);
});
```

- [ ] **Step 4: Run the tests and verify the new SFA tests fail**

Run:

```bash
npm test -- lib/portfolio.test.ts
```

Expected: the updated DMS test passes; the two new SFA tests fail because `domains`, `lifecycle`, and `iterations` do not exist yet.

- [ ] **Step 5: Commit the test baseline**

```bash
git add lib/portfolio.test.ts
git commit -m "test: define SFA product line content contract"
```

### Task 2: Build the structured SFA content model

**Files:**
- Modify: `lib/portfolio.ts`

- [ ] **Step 1: Update the SFA work-case entry**

Use this public-facing entry:

```ts
{
  id: "sfa",
  title: "SFA 销售执行产品线实践",
  period: "2022—2023",
  metric: "持续迭代",
  metricLabel: "从功能交付到关系治理",
}
```

- [ ] **Step 2: Replace the current flat SFA fields with structured product-line data**

Keep `label`, `role`, `signals`, and `boundary`, and add the following fields inside `caseDetails.sfa`:

```ts
summary: "长期负责销售执行产品线，把门店拜访、活动执行和管理要求转化为可运行的产品能力，并在持续迭代中处理一线负担、数据规则与组织关系问题。",
judgment: "SFA 的长期价值，不是上线了多少功能，而是让业务要求更容易执行、一线复杂度能够被看见，并把重复问题沉淀为可维护的流程、数据和关系模型。",
domains: ["门店拜访", "活动执行", "陈列检查", "费用采集", "门店评分", "主数据", "权限管理"],
lifecycle: [
  { title: "需求承接", body: "理解总部职能和一线销售提出的业务问题。" },
  { title: "需求澄清", body: "明确目标、使用角色、流程、字段和判断规则。" },
  { title: "产品方案", body: "设计页面、数据格式、配置逻辑和权限关系。" },
  { title: "研发协同", body: "拆解需求、协调资源并处理实现差异。" },
  { title: "测试验收", body: "验证功能、计算规则、数据结果和异常场景。" },
  { title: "上线发布", body: "完成发布准备、使用支持和问题收集。" },
  { title: "持续治理", body: "区分功能缺陷、流程问题、主数据问题和组织关系问题。" },
],
iterations: [
  {
    id: "high-potential-store",
    number: "01",
    title: "高潜门店评分",
    subtitle: "把复杂业务标准产品化",
    problem: "业务希望用更精细的门店指标识别重点与高潜门店，为资源分配和门店管理提供依据。",
    evidence: ["必进与自选 SKU", "货架与陈列位置", "陈列形式与排面占比", "价格与货龄", "检查覆盖与分项得分"],
    responsibility: "业务团队负责指标定义与评分规则；我负责把规则转化为可配置、可执行和可追踪的产品能力。",
    contribution: ["整体产品架构与数据格式", "评分配置和页面展示设计", "研发资源协调", "测试与发布"],
    outcome: ["活动成功上线，形成多维门店检查、评分和追踪流程", "评分复杂、一线填写负担和计算异常成为后续迭代需要处理的问题"],
    insight: "总部获得单项管理精度时，一线承担的是所有需求叠加后的执行成本。",
  },
  {
    id: "permission-governance",
    number: "02",
    title: "权限关系治理",
    subtitle: "从功能异常追到业务关系",
    problem: "组织和区域职能调整后，主管与一线人员出现门店不可见和审批异常。",
    evidence: ["组织关系变化", "职位与人员归属", "门店可见范围", "审批链路异常"],
    responsibility: "上级经理统筹整体营销产品规划并提出优化方向；我负责权限问题的具体方案和落地推进。",
    contribution: ["定位问题原因", "梳理组织与门店关系", "整理关系模型改造方案", "协调业务与研发", "推动测试上线和结果跟踪"],
    outcome: ["门店不可见问题减少", "组织调整对权限使用的影响降低", "后续组织调整未再大规模出现同类问题"],
    insight: "反复出现的权限故障，往往不是页面配置问题，而是动态业务关系没有被系统稳定表达。",
  },
],
```

Remove the obsolete flat `context`, `actions`, `outcomes`, and `flow` properties from `caseDetails.sfa` after the new renderer is wired in Task 4.

- [ ] **Step 3: Update SFA signals and public boundary**

```ts
signals: [
  ["多场景", "销售执行产品范围"],
  ["完整闭环", "从需求到上线反馈"],
  ["持续治理", "从功能迭代到关系模型"],
],
boundary: "公司、品牌、组织编码和人员信息不公开；高潜门店评分不宣称由我定义业务指标，权限治理结果保持定性表达。",
```

- [ ] **Step 4: Run the content tests**

Run:

```bash
npm test -- lib/portfolio.test.ts
```

Expected: all tests in `lib/portfolio.test.ts` pass.

- [ ] **Step 5: Commit the structured content**

```bash
git add lib/portfolio.ts lib/portfolio.test.ts
git commit -m "feat: structure SFA product line evidence"
```

### Task 3: Create the SFA-specific page component

**Files:**
- Create: `app/cases/[slug]/SfaCaseContent.tsx`
- Create: `app/cases/[slug]/sfa.module.css`

- [ ] **Step 1: Create the SFA content renderer**

Create `SfaCaseContent.tsx`:

```tsx
import { caseDetails } from "@/lib/portfolio";
import styles from "./sfa.module.css";

const sfa = caseDetails.sfa;

export function SfaCaseContent() {
  return <>
    <section className={styles.judgment}>
      <p className={styles.label}>01 / PRODUCT LINE</p>
      <p>{sfa.judgment}</p>
      <div className={styles.domains}>
        {sfa.domains.map((domain) => <span key={domain}>{domain}</span>)}
      </div>
    </section>

    <section className={styles.lifecycleSection}>
      <p className={styles.label}>02 / PRODUCT LIFECYCLE</p>
      <h2>日常迭代如何形成完整闭环</h2>
      <div className={styles.lifecycle}>
        {sfa.lifecycle.map((step, index) => <article key={step.title}>
          <b>{String(index + 1).padStart(2, "0")}</b>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.iterations}>
      <p className={styles.label}>03 / REPRESENTATIVE ITERATIONS</p>
      <h2>两个代表性迭代</h2>
      {sfa.iterations.map((iteration) => <article className={styles.iteration} key={iteration.id}>
        <header>
          <b>{iteration.number}</b>
          <div><h3>{iteration.title}</h3><p>{iteration.subtitle}</p></div>
        </header>
        <div className={styles.problem}><strong>业务问题</strong><p>{iteration.problem}</p></div>
        <div className={styles.evidence}>{iteration.evidence.map((item) => <span key={item}>{item}</span>)}</div>
        <div className={styles.caseGrid}>
          <div><strong>责任边界</strong><p>{iteration.responsibility}</p></div>
          <div><strong>我的动作</strong><ul>{iteration.contribution.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><strong>结果</strong><ul>{iteration.outcome.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <blockquote>{iteration.insight}</blockquote>
      </article>)}
    </section>
  </>;
}
```

- [ ] **Step 2: Add the SFA CSS module**

Create `sfa.module.css` with these layout responsibilities:

```css
.label{font-size:11px;letter-spacing:.14em;color:#f4511e}
.judgment,.lifecycleSection,.iterations{padding:72px 0;border-bottom:1px solid #11111633}
.judgment>p:nth-child(2){max-width:800px;font-family:'Noto Serif SC',serif;font-size:30px;line-height:1.65}
.domains,.evidence{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px}
.domains span,.evidence span{padding:8px 12px;border:1px solid #11111633;font-size:12px}
.lifecycleSection h2,.iterations>h2{font-family:'Noto Serif SC',serif;font-size:32px;margin:24px 0 30px}
.lifecycle{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #11111633}
.lifecycle article{padding:22px 18px;border-right:1px solid #11111633;border-bottom:1px solid #11111633}
.lifecycle b,.iteration header>b{color:#f4511e;font-size:12px}
.lifecycle h3{font-family:'Noto Serif SC',serif;font-size:18px;margin:18px 0 10px}
.lifecycle p{font-size:13px;line-height:1.75;opacity:.72}
.iteration{padding:48px 0;border-top:1px solid #11111633}
.iteration header{display:grid;grid-template-columns:70px 1fr;gap:20px;margin-bottom:32px}
.iteration h3{font-family:'Noto Serif SC',serif;font-size:34px;margin:0}
.iteration header p{margin:8px 0 0;color:#f4511e}
.problem{display:grid;grid-template-columns:160px 1fr;gap:20px;margin-bottom:22px}
.problem p{max-width:720px;margin:0;font-size:17px;line-height:1.8}
.caseGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#11111633;margin-top:24px}
.caseGrid>div{background:#f3f0e9;padding:24px}
.caseGrid p,.caseGrid li{font-size:14px;line-height:1.75;opacity:.76}
.caseGrid ul{padding-left:18px}
.iteration blockquote{margin:28px 0 0;padding:20px 24px;border-left:3px solid #f4511e;font-family:'Noto Serif SC',serif;font-size:20px;line-height:1.7}
@media(max-width:900px){.lifecycle{grid-template-columns:repeat(2,1fr)}.caseGrid{grid-template-columns:1fr}}
@media(max-width:720px){.judgment,.lifecycleSection,.iterations{padding:50px 0}.judgment>p:nth-child(2){font-size:23px}.lifecycle{display:block}.lifecycle article{border-right:0}.iteration header,.problem{display:block}.iteration header>b{display:block;margin-bottom:12px}.iteration h3{font-size:28px}}
```

- [ ] **Step 3: Type-check the new component**

Run:

```bash
npx tsc --noEmit --incremental false
```

Expected: PASS with no TypeScript errors.

- [ ] **Step 4: Commit the SFA renderer**

```bash
git add app/cases/[slug]/SfaCaseContent.tsx app/cases/[slug]/sfa.module.css
git commit -m "feat: add SFA product line case sections"
```

### Task 4: Wire the SFA renderer into the shared case route

**Files:**
- Modify: `app/cases/[slug]/page.tsx`
- Modify: `lib/portfolio.ts`

- [ ] **Step 1: Import the dedicated component**

Add:

```tsx
import { SfaCaseContent } from "./SfaCaseContent";
```

- [ ] **Step 2: Replace only the non-DMS branch**

In the existing conditional, keep everything from `{isDms ? <>` through its closing `</>` unchanged. Replace the current non-DMS fragment beginning with `: <>` and ending with `</>}` with exactly:

```tsx
: <SfaCaseContent />}
```

Do not modify DMS labels, sections, data, or metric notes during this task.

- [ ] **Step 3: Remove obsolete flat SFA fields**

Delete `context`, `actions`, `outcomes`, and `flow` from `caseDetails.sfa`. Confirm no remaining references:

```bash
rg "detail\.(context|actions|outcomes|flow)|caseDetails\.sfa\.(context|actions|outcomes|flow)" app lib
```

Expected: no matches.

- [ ] **Step 4: Run tests and type checking**

```bash
npm test -- lib/portfolio.test.ts
npx tsc --noEmit --incremental false
```

Expected: content tests pass and TypeScript reports no errors.

- [ ] **Step 5: Commit route integration**

```bash
git add app/cases/[slug]/page.tsx lib/portfolio.ts
git commit -m "feat: present SFA as a product line practice"
```

### Task 5: Verify content hierarchy and responsive behavior

**Files:**
- Modify if needed: `app/cases/[slug]/sfa.module.css`
- Modify if needed: `app/cases/[slug]/SfaCaseContent.tsx`

- [ ] **Step 1: Start the local site**

```bash
npm run dev
```

Expected: Next.js reports a reachable local URL.

- [ ] **Step 2: Verify the desktop page at 1440px**

Open `/cases/sfa` and confirm:

- the first major section says `PRODUCT LINE`;
- seven business-domain tags are visible;
- the lifecycle contains seven ordered steps;
- high-potential scoring and permission governance are two separate large sections;
- each case contains problem, boundary, contribution, outcome, and insight;
- the public-boundary panel and footer remain visible.

- [ ] **Step 3: Verify the mobile page at 390px**

Confirm:

- lifecycle steps stack without horizontal scrolling;
- case grids become one column;
- long Chinese copy does not clip;
- domain and evidence tags wrap;
- each case title remains visually separate.

- [ ] **Step 4: Verify the DMS regression boundary**

Open `/cases/dms` and confirm its eight sections, metrics, and copy remain unchanged.

- [ ] **Step 5: Run final automated checks**

```bash
npm test
npx tsc --noEmit --incremental false
npm run build
```

Expected: tests pass, TypeScript reports no errors, and Next.js completes a production build. If Vitest cannot create its temporary cache because of environment permissions, record the exact environment error and rely on the targeted test output plus TypeScript/build results; do not treat the permission failure as a code assertion failure.

- [ ] **Step 6: Commit final visual fixes if any**

```bash
git add app/cases/[slug]/SfaCaseContent.tsx app/cases/[slug]/sfa.module.css
git commit -m "style: refine SFA product line layout"
```
