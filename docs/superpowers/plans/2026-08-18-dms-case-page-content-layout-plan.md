# DMS 项目详情页内容与版式优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 DMS 详情页从项目摘要升级为招聘方可快速阅读的完整项目档案。

**Architecture:** 保留现有 Next.js 动态案例页和 `caseDetails` 数据驱动方式。通过扩充 DMS 数据字段、重组案例页 JSX 区块和更新案例页 CSS，实现内容与版式同步升级，不改动其他项目路由。

**Tech Stack:** Next.js App Router、React、TypeScript、CSS Modules、现有 Vitest 数据测试。

---

### Task 1: 扩充 DMS 案例数据

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/lib/portfolio.ts`
- Test: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/lib/portfolio.test.ts`

- [x] **Step 1: 增加 DMS 页面所需字段**

在 `caseDetails.dms` 中增加 `judgment`、`background`、`tensions`、`method` 和 `learning` 字段；内容只使用已通过事实 Gate 的信息，不加入未核验的 31 省、619 家经销商等数字。

- [x] **Step 2: 增加数据边界测试**

验证 DMS 项目名称、周期、三组核心指标和页面结构字段存在，并确认页面数据不包含未核验规模数字。

- [x] **Step 3: 运行数据测试**

运行：`npm test -- lib/portfolio.test.ts`  
结果：当前环境禁止写入 Vitest 临时目录和缓存文件，测试进程未进入断言执行；已通过静态内容扫描和浏览器 DOM 验证补充检查。

### Task 2: 重组 DMS 详情页内容层级

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/cases/[slug]/page.tsx`

- [x] **Step 1: 保留现有首屏基础信息**

首屏显示项目标签、项目名称、项目周期、角色和一句话项目判断。

- [x] **Step 2: 增加项目判断与背景区块**

在核心指标后增加“问题从哪里开始”和“我看到的核心矛盾”，分别呈现项目背景、总部/销售/经销商之间的价值与成本错位。

- [x] **Step 3: 将推进过程改为阶段线**

使用 `method` 数据渲染五个阶段：一线调研、需求与流程、研发协作、培训上线、数据治理；每个阶段显示阶段名称和用户动作。

- [x] **Step 4: 强化个人贡献区**

将现有动作列表改成编号贡献卡，突出判断、设计、协调和持续治理四类动作。

- [x] **Step 5: 增加项目沉淀区**

在结果区之后增加“项目留下的方法”，呈现数据治理、伙伴价值和异常—诊断—行动—反馈闭环的经验总结。

### Task 3: 重构案例页版式

**Files:**
- Modify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/cases/[slug]/case.module.css`

- [x] **Step 1: 建立首屏和证据模块层级**

让标题、角色/周期和项目判断形成首屏强层级；三组核心指标使用独立网格展示。

- [x] **Step 2: 建立背景、矛盾和贡献分区**

使用暖白背景、橙色编号、细分隔线和短段落，避免长文本连续堆叠。

- [x] **Step 3: 建立阶段线和贡献卡响应式布局**

桌面端采用横向阶段线或多列布局；移动端改为纵向排列，不产生横向滚动。

- [x] **Step 4: 保持公开边界和项目切换可见**

公开边界使用低强调信息区，底部保留返回工作档案和下一个项目入口。

### Task 4: 验证 DMS 页面

**Files:**
- Verify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/app/cases/[slug]/page.tsx`
- Verify: `/Users/schooldave/Documents/Project_FMCG_AI/60_网站开发/portfolio/lib/portfolio.ts`

- [x] **Step 1: 验证本地页面内容**

打开 `http://localhost:3000/cases/dms`，确认页面包含项目名称、2023—2025、600+、约80%、约70%→约90%、背景、矛盾、五阶段推进过程、个人贡献、结果边界和项目沉淀。

- [x] **Step 2: 验证页面事实边界**

确认页面不出现未核验规模数字，也不把项目上线直接表述为销售增长或经销商经营改善。

- [x] **Step 3: 验证移动端结构**

在窄屏宽度下确认标题、指标、阶段线和贡献卡均可读，页面无横向溢出。

- [x] **Step 4: 记录验证结果**

测试命令受环境缓存权限影响，已使用浏览器 DOM 验证和静态内容扫描作为补充；视觉检查确认桌面视口首屏与内容区正常显示。
