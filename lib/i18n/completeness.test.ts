import { describe, expect, it } from "vitest";
import { siteContent } from "./content";
import { localizedNotes } from "./notes";
import { localizedPortfolio } from "./portfolio";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, shape(child)]),
    );
  }

  return typeof value;
}

describe("locale content completeness", () => {
  for (const [name, collection] of Object.entries({
    siteContent,
    localizedPortfolio,
    localizedNotes,
  })) {
    it(`keeps ${name} structurally aligned across locales`, () => {
      expect(Object.keys(collection)).toEqual(["zh-CN", "en", "ja"]);
      expect(shape(collection.en)).toEqual(shape(collection["zh-CN"]));
      expect(shape(collection.ja)).toEqual(shape(collection["zh-CN"]));
    });
  }
});
