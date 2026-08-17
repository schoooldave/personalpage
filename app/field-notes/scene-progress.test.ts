import { describe, expect, it } from "vitest";

import { clampProgress, sceneFromProgress } from "./scene-progress";
import { fieldNoteJudgments } from "../../lib/portfolio";

describe("clampProgress", () => {
  it.each([
    [-0.2, 0],
    [0.45, 0.45],
    [1.2, 1],
  ])("clamps %s to %s", (value, expected) => {
    expect(clampProgress(value)).toBe(expected);
  });
});

describe("sceneFromProgress", () => {
  it.each([
    [0, 0],
    [0.32, 0],
    [0.34, 1],
    [0.66, 1],
    [0.67, 2],
    [1, 2],
  ])("maps %s to scene %s", (value, expected) => {
    expect(sceneFromProgress(value)).toBe(expected);
  });
});

describe("field note judgment navigation", () => {
  it("exposes concise navigation labels for the three industry judgments", () => {
    expect(fieldNoteJudgments.map((judgment) => judgment.navTitle)).toEqual([
      "数据不等于价值",
      "系统不等于流程",
      "上线不等于改变",
    ]);
    expect(fieldNoteJudgments.map((judgment) => judgment.navLabel)).toEqual([
      "数据价值",
      "系统流程",
      "组织改变",
    ]);
  });
});
