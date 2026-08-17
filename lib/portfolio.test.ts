import { describe, expect, it } from "vitest";
import { fieldNoteJudgments, fieldNotes, portfolioSummary, workCases } from "./portfolio";

describe("portfolio content baseline", () => {
  it("keeps the recruiter-facing summary grounded", () => {
    expect(portfolioSummary.role).toContain("产品");
    expect(portfolioSummary.proof).toContain("现场");
  });

  it("exposes the two verified work case entry points", () => {
    expect(workCases.map((item) => item.id)).toEqual(["dms", "sfa"]);
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

  it("exposes the three ordered FMCG judgments", () => {
    expect(fieldNoteJudgments.map((item) => item.title)).toEqual([
      "数据不等于价值",
      "系统不等于流程",
      "上线不等于改变",
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
