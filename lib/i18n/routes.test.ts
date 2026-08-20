import { describe, expect, it } from "vitest";
import { localizedCasePath, localizedNotePath } from "./routes";

describe("localized content routes", () => {
  it("keeps the current locale on case links", () => {
    expect(localizedCasePath("dms", "en")).toBe("/en/cases/dms");
    expect(localizedCasePath("sfa", "ja")).toBe("/ja/cases/sfa");
    expect(localizedCasePath("dms", "zh-CN")).toBe("/cases/dms");
  });

  it("keeps the current locale on note links", () => {
    expect(localizedNotePath("ai-outlook", "en")).toBe("/en/notes/ai-outlook");
    expect(localizedNotePath("ai-outlook", "ja")).toBe("/ja/notes/ai-outlook");
  });
});
