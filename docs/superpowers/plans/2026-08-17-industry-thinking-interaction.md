# 02 行业思考交互设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 02「行业思考」改造成桌面端悬停切换、移动端滚动阅读的编辑式互动内容区。

**Architecture:** 保留现有 `FieldNotesPreview` 的场景数据和桌面端 sticky 容器，重做场景内部的判断导航与内容舞台。桌面端用 React 状态驱动当前判断，移动端保留纵向场景并通过现有响应式布局呈现。动效全部使用 CSS transform/opacity，背景图只做低幅度视差。

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Vitest.

---

### Task 1: 调整判断导航数据与交互状态

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/FieldNotesPreview.tsx`
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/lib/portfolio.ts`
- Test: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/field-notes/scene-progress.test.ts`

- [ ] **Step 1: 写出判断导航的最小数据断言**

在现有 portfolio 测试中增加断言：三个判断的导航文案依次为“数据不等于价值”“系统不等于流程”“上线不等于改变”，且每个判断都有正文和编号。

- [ ] **Step 2: 运行测试确认断言失败**

Run: `npm test -- --run app/field-notes/scene-progress.test.ts`

Expected: 新增文案断言因当前数据未满足而失败。

- [ ] **Step 3: 更新判断数据与状态边界**

保留现有事实型正文和 track 数据，将三个判断的展示标题统一为确认过的概括性判断。新增一个桌面端 `hoveredJudgment` 状态；没有悬停时回退到当前滚动场景，移动端不依赖该状态。

- [ ] **Step 4: 运行测试确认通过**

Run: `npm test -- --run app/field-notes/scene-progress.test.ts`

Expected: PASS。

- [ ] **Step 5: 提交数据与状态改动**

Run: `git add app/FieldNotesPreview.tsx lib/portfolio.ts app/field-notes/scene-progress.test.ts && git commit -m "feat: define industry judgment navigation"`

### Task 2: 重做 02 桌面端内容舞台

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/FieldNotesPreview.tsx`
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/fieldnotes.module.css`

- [ ] **Step 1: 替换现有纵向 relationship track**

将每个 scene 内的 SVG 曲线和三节点轨道替换为无边框判断导航。导航项只展示编号和标题，当前项通过橙色编号、短横线和文字颜色表达，不新增卡片边框。

- [ ] **Step 2: 增加内容切换层**

保留当前判断的大标题和正文作为主内容，使用同一舞台叠放三组内容；通过 `opacity`、`transform: translate3d` 和 `pointer-events` 控制当前项。所有移动属性使用 transform，避免布局重排。

- [ ] **Step 3: 增加背景图低幅度视差**

复用现有 pointer CSS 变量，让右侧背景图和半透明巨型编号只产生小范围位移，不新增 WebGL、canvas 或第三方动画依赖。

- [ ] **Step 4: 加入 reduced-motion 退化**

在 `prefers-reduced-motion: reduce` 下关闭视差和复杂过渡，保持判断内容可见并使用即时切换。

- [ ] **Step 5: 运行 lint 与测试**

Run: `npm test -- --run`

Expected: 全部测试通过。

Run: `npm run lint`

Expected: 无 ESLint 错误。

- [ ] **Step 6: 提交桌面端实现**

Run: `git add app/FieldNotesPreview.tsx app/fieldnotes.module.css && git commit -m "feat: redesign industry thinking stage"`

### Task 3: 完成移动端滚动阅读与视觉验收

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/fieldnotes.module.css`
- Test: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/field-notes/scene-progress.test.ts`

- [ ] **Step 1: 固定移动端内容顺序**

在 `max-width: 760px` 下取消 sticky 场景叠放，三个判断按顺序展示；导航项和正文全部可读，不依赖 hover 或 pointer enter。

- [ ] **Step 2: 降低移动端动画幅度**

移动端只保留淡入和小幅上移，禁用背景图视差、巨型数字移动和 SVG 轨道动画。

- [ ] **Step 3: 验证桌面与移动构建**

Run: `npm run build`

Expected: Next.js production build 成功。

Run: `npm test -- --run && npm run lint`

Expected: 全部测试和 lint 通过。

- [ ] **Step 4: 在本地浏览器验收 02**

检查 1440px 桌面宽度下鼠标经过三个判断时：编号、标题、正文、背景图同步变化；检查 390px 移动宽度下滚动可读三个判断，页面无横向溢出、无明显卡顿。

- [ ] **Step 5: 提交最终实现**

Run: `git add app/fieldnotes.module.css app/field-notes/scene-progress.test.ts && git commit -m "test: verify responsive industry thinking interaction"`

## Self-review checklist

- 设计规格中的桌面悬停、移动滚动、轻视差、reduced-motion 和验收边界均有对应任务。
- 没有引入第三方图片、代码或品牌素材；只复用已有项目结构与 CSS 动画能力。
- 没有改动 01、首页 Banner 或案例详情页。
- 没有新增依赖，避免因为追求效果导致加载和维护成本上升。
