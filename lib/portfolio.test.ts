import { describe, expect, it } from "vitest";
import { caseDetails, fieldNoteJudgments, fieldNotes, portfolioSummary, systemProcessNote, workCases } from "./portfolio";

describe("portfolio content baseline", () => {
  it("keeps the recruiter-facing summary grounded", () => {
    expect(portfolioSummary.role).toContain("产品");
    expect(portfolioSummary.proof).toContain("现场");
  });

  it("exposes the two verified work case entry points", () => {
    expect(workCases.map((item) => item.id)).toEqual(["dms", "sfa"]);
  });

  it("keeps the DMS case grounded and structured for the case page", () => {
    const dms = caseDetails.dms;
    expect(dms.title).toBe("全国分销数据治理项目");
    expect(dms.period).toBe("2023—2024");
    expect(dms.signals.map(([value]) => value)).toEqual(["65%", "800+", "约 80%"]);
    expect(dms.method).toHaveLength(5);
    expect(dms.contributions).toHaveLength(4);
    expect(dms.tensions).toHaveLength(3);
    expect(JSON.stringify(dms)).not.toMatch(/Top 300|2025 年 10 月|80\+|31省|619家|70万\+/);
  });

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

  it("keeps SFA claims within the confirmed responsibility boundary", () => {
    const serialized = JSON.stringify(caseDetails.sfa);
    expect(serialized).toContain("业务团队负责指标定义与评分规则");
    expect(serialized).toContain("上级经理统筹整体营销产品规划");
    expect(serialized).not.toMatch(/我定义了评分标准|整体营销产品方向负责人|提升\d+%/);
  });

  it("keeps Field Notes judgment, evidence, projection, and boundary separate", () => {
    const note = fieldNotes[0];
    expect(note.title).toBe("数据不等于价值");
    expect(note.subtitle).toContain("为什么企业获得了更多渠道数据");
    expect(note.judgment).toBeTruthy();
    expect(note.evidence).toBeTruthy();
    expect(note.aiProjection).toBeTruthy();
    expect(note.boundary).toBeTruthy();
  });

  it("exposes the three essay movements and five data-value chain steps", () => {
    const note = fieldNotes[0];
    expect(note.movements).toHaveLength(3);
    expect(note.movements.every((movement) => movement.paragraphs.length >= 2)).toBe(true);
    expect(note.roles.map((role) => role.title)).toEqual(["总部", "销售", "经销商"]);
    expect(note.valueChain.map((step) => step.label)).toEqual([
      "稳定采集",
      "数据可靠",
      "形成判断",
      "推动行动",
      "结果反馈",
    ]);
  });

  it("exposes the system-is-not-process article as three distinct process breaks", () => {
    expect(systemProcessNote.title).toBe("系统不等于业务闭环");
    expect(systemProcessNote.comparison.system).toHaveLength(3);
    expect(systemProcessNote.comparison.real).toHaveLength(3);
    expect(systemProcessNote.sections.map((section) => section.title)).toEqual([
      "判断不是点击",
      "例外不是错误",
      "责任不是状态",
    ]);
  });

  it("exposes the three ordered FMCG judgments", () => {
    expect(fieldNoteJudgments.map((item) => item.title)).toEqual([
      "数据不等于价值",
      "系统不等于业务闭环",
      "上线不等于持续使用",
    ]);
    expect(fieldNoteJudgments.every((item) => item.body.length > 20)).toBe(true);
    expect(fieldNoteJudgments.map((item) => item.number)).toEqual(["01", "02", "03"]);
    expect(fieldNoteJudgments.map((item) => item.track.map((step) => step.label))).toEqual([
      ["采集", "可信", "决策"],
      ["系统", "机制", "行动"],
      ["部署", "使用", "采用"],
    ]);
    expect(
      fieldNoteJudgments.every((item) =>
        item.track.every((step) => step.note.length >= 8),
      ),
    ).toBe(true);
  });
});
