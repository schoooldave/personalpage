import { describe, expect, it } from "vitest";
import {
  buildLanguageLinks,
  localizePath,
  locales,
  normalizeLocale,
  stripLocalePrefix,
} from "./config";

describe("i18n config", () => {
  it("exposes the supported locales in canonical order", () => {
    expect(locales).toEqual(["zh-CN", "en", "ja"]);
  });

  it("normalizes only supported locale tags", () => {
    expect(normalizeLocale("zh-CN")).toBe("zh-CN");
    expect(normalizeLocale("en")).toBe("en");
    expect(normalizeLocale("ja")).toBe("ja");
    expect(normalizeLocale("fr")).toBeNull();
  });

  it("strips only supported locale prefixes from paths", () => {
    expect(stripLocalePrefix("/cases/dms")).toBe("/cases/dms");
    expect(stripLocalePrefix("/en/cases/dms")).toBe("/cases/dms");
    expect(stripLocalePrefix("/ja/cases/dms")).toBe("/cases/dms");
    expect(stripLocalePrefix("/zh-CN/cases/dms")).toBe("/cases/dms");
    expect(stripLocalePrefix("/en")).toBe("/");
  });

  it("localizes paths by adding or replacing locale prefixes", () => {
    expect(localizePath("/cases/dms", "zh-CN")).toBe("/cases/dms");
    expect(localizePath("/cases/dms", "en")).toBe("/en/cases/dms");
    expect(localizePath("/en/cases/dms", "ja")).toBe("/ja/cases/dms");
    expect(localizePath("/ja", "en")).toBe("/en");
  });

  it("builds language links for the current page in every locale", () => {
    expect(buildLanguageLinks("/en/cases/dms")).toEqual([
      { locale: "zh-CN", label: "中", href: "/cases/dms" },
      { locale: "en", label: "EN", href: "/en/cases/dms" },
      { locale: "ja", label: "日", href: "/ja/cases/dms" },
    ]);
  });
});
