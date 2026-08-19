# Site Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build complete Chinese, English, and Japanese versions of every public page, with stable locale-prefixed routes and a site-wide language switcher.

**Architecture:** Keep one shared component and layout tree, and move user-visible copy into typed locale dictionaries. Existing routes remain the canonical Chinese pages; matching `/en` and `/ja` route wrappers pass locale data into the same page views. A shared route mapper ensures that switching language preserves the current semantic page.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, CSS Modules, Vitest.

---

## File structure

- Create `lib/i18n/config.ts`: supported locales, locale labels, URL helpers and locale guards.
- Create `lib/i18n/config.test.ts`: route conversion and locale validation tests.
- Create `lib/i18n/content.ts`: shared navigation, homepage, personal world and About copy.
- Create `lib/i18n/portfolio.ts`: localized case summaries and full DMS/SFA content.
- Create `lib/i18n/notes.ts`: localized content for all four essays and field-note previews.
- Create `lib/i18n/completeness.test.ts`: recursively verify that English and Japanese match the Chinese content shape.
- Create `app/LocalizedHome.tsx`: locale-aware home page view extracted from the current client page.
- Create `app/LanguageSwitcher.tsx`: accessible language links that preserve the current page.
- Create `app/language-switcher.module.css`: restrained styling shared by all page types.
- Create `app/[locale]/page.tsx`: English/Japanese home route.
- Create `app/[locale]/about/page.tsx`: English/Japanese About route.
- Create `app/[locale]/cases/[slug]/page.tsx`: English/Japanese case routes.
- Create `app/[locale]/notes/page.tsx`: English/Japanese field note 01 route.
- Create `app/[locale]/notes/system-process/page.tsx`: English/Japanese field note 02 route.
- Create `app/[locale]/notes/continuous-use/page.tsx`: English/Japanese field note 03 route.
- Create `app/[locale]/notes/ai-outlook/page.tsx`: English/Japanese AI outlook route.
- Create `app/sitemap.ts`: all Chinese, English and Japanese public URLs.
- Modify current page components: accept a locale/content prop and render dictionaries instead of embedded Chinese strings.
- Modify `app/layout.tsx`: localized metadata defaults and supported-language alternates.

### Task 1: Locale model and semantic route mapping

**Files:**
- Create: `lib/i18n/config.ts`
- Create: `lib/i18n/config.test.ts`

- [ ] **Step 1: Write failing route mapping tests**

```ts
import { describe, expect, it } from "vitest";
import { localizePath, normalizeLocale } from "./config";

describe("localizePath", () => {
  it("keeps Chinese routes unprefixed", () => {
    expect(localizePath("/en/cases/dms", "zh-CN")).toBe("/cases/dms");
  });
  it("preserves the semantic page for English and Japanese", () => {
    expect(localizePath("/cases/dms", "en")).toBe("/en/cases/dms");
    expect(localizePath("/en/notes/ai-outlook", "ja")).toBe("/ja/notes/ai-outlook");
  });
});

describe("normalizeLocale", () => {
  it("accepts only supported locale prefixes", () => {
    expect(normalizeLocale("en")).toBe("en");
    expect(normalizeLocale("ja")).toBe("ja");
    expect(normalizeLocale("fr")).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- lib/i18n/config.test.ts`
Expected: FAIL because `lib/i18n/config.ts` does not exist.

- [ ] **Step 3: Implement locale and route helpers**

```ts
export const locales = ["zh-CN", "en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const localeLabels = { "zh-CN": "中", en: "EN", ja: "日" } as const;

export function normalizeLocale(value: string): Locale | null {
  return value === "en" || value === "ja" || value === "zh-CN" ? value : null;
}

export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|ja)(?=\/|$)/, "");
  return stripped || "/";
}

export function localizePath(pathname: string, locale: Locale): string {
  const base = stripLocalePrefix(pathname);
  return locale === "zh-CN" ? base : `/${locale}${base === "/" ? "" : base}`;
}
```

- [ ] **Step 4: Run the focused test**

Run: `npm test -- lib/i18n/config.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit the locale foundation**

```bash
git add lib/i18n/config.ts lib/i18n/config.test.ts
git commit -m "feat: add locale route mapping"
```

### Task 2: Typed content dictionaries and completeness guard

**Files:**
- Create: `lib/i18n/content.ts`
- Create: `lib/i18n/portfolio.ts`
- Create: `lib/i18n/notes.ts`
- Create: `lib/i18n/completeness.test.ts`
- Modify: `lib/portfolio.ts`

- [ ] **Step 1: Write a failing recursive shape test**

```ts
import { describe, expect, it } from "vitest";
import { siteContent } from "./content";
import { localizedPortfolio } from "./portfolio";
import { localizedNotes } from "./notes";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]));
  }
  return typeof value;
}

describe("locale content completeness", () => {
  for (const collection of [siteContent, localizedPortfolio, localizedNotes]) {
    it("keeps English and Japanese structurally aligned with Chinese", () => {
      expect(shape(collection.en)).toEqual(shape(collection["zh-CN"]));
      expect(shape(collection.ja)).toEqual(shape(collection["zh-CN"]));
    });
  }
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- lib/i18n/completeness.test.ts`
Expected: FAIL because the localized dictionaries do not exist.

- [ ] **Step 3: Extract all Chinese UI copy into `siteContent` and add complete English/Japanese localization**

Use this public interface and populate every field currently rendered by `page.tsx`, `PersonalHero.tsx`, `PersonalWorld.tsx`, `AIOutlook.tsx`, `FieldNotesPreview.tsx`, and `about/page.tsx`:

```ts
import type { Locale } from "./config";

export type SiteContent = {
  nav: { workFiles: string; fieldNotes: string; about: string; enterWork: string; enterPersonal: string };
  personalHero: { eyebrow: string; title: string; body: string; scroll: string };
  personalWorld: {
    reading: { label: string; title: string; body: string };
    piano: { label: string; title: string; body: string };
    ai: { label: string; title: string; body: string };
    ideas: { label: string; title: string; items: string[] };
    ending: { title: string; body: string; about: string; work: string; signature: string };
  };
  workHome: Record<string, string | string[]>;
  about: Record<string, unknown>;
};

export const siteContent: Record<Locale, SiteContent> = {
  "zh-CN": zhSiteContent,
  en: enSiteContent,
  ja: jaSiteContent,
};
```

English and Japanese must be edited as natural portfolio copy, not literal word-for-word output. Keep all dates, percentages, counts, role boundaries and email addresses identical to Chinese.

- [ ] **Step 4: Move all case content to `localizedPortfolio`**

Use the existing Chinese values in `lib/portfolio.ts` as `localizedPortfolio["zh-CN"]`. Add complete `en` and `ja` objects with the same arrays and object keys, including all DMS solution options, tensions, methods, contributions, outcomes and all SFA lifecycle/iteration content.

```ts
export const localizedPortfolio = {
  "zh-CN": { portfolioSummary, workCases, caseDetails },
  en: { portfolioSummary: enSummary, workCases: enWorkCases, caseDetails: enCaseDetails },
  ja: { portfolioSummary: jaSummary, workCases: jaWorkCases, caseDetails: jaCaseDetails },
} as const;
```

- [ ] **Step 5: Move all essay content to `localizedNotes`**

Use the current note objects as Chinese source and provide complete English/Japanese equivalents for headings, paragraphs, evidence captions, boundaries, navigation and calls to action.

```ts
export const localizedNotes = {
  "zh-CN": { fieldNotes, systemProcessNote, continuousUseNote, aiOutlookNote, fieldNoteJudgments },
  en: { fieldNotes: enFieldNotes, systemProcessNote: enSystemProcessNote, continuousUseNote: enContinuousUseNote, aiOutlookNote: enAiOutlookNote, fieldNoteJudgments: enJudgments },
  ja: { fieldNotes: jaFieldNotes, systemProcessNote: jaSystemProcessNote, continuousUseNote: jaContinuousUseNote, aiOutlookNote: jaAiOutlookNote, fieldNoteJudgments: jaJudgments },
} as const;
```

- [ ] **Step 6: Run completeness and existing portfolio tests**

Run: `npm test -- lib/i18n/completeness.test.ts lib/portfolio.test.ts`
Expected: PASS with all locale objects structurally aligned.

- [ ] **Step 7: Commit localized content**

```bash
git add lib/i18n lib/portfolio.ts lib/portfolio.test.ts
git commit -m "feat: add complete English and Japanese content"
```

### Task 3: Shared language switcher

**Files:**
- Create: `app/LanguageSwitcher.tsx`
- Create: `app/language-switcher.module.css`
- Modify: `lib/i18n/config.test.ts`

- [ ] **Step 1: Extend the route-helper test for all switcher targets**

```ts
it("builds every switcher target for the same semantic page", () => {
  expect(buildLanguageLinks("/en/cases/dms")).toEqual([
    { locale: "zh-CN", label: "中", href: "/cases/dms" },
    { locale: "en", label: "EN", href: "/en/cases/dms" },
    { locale: "ja", label: "日", href: "/ja/cases/dms" },
  ]);
});
```

- [ ] **Step 2: Add the minimal accessible component**

```tsx
import Link from "next/link";
import { buildLanguageLinks, type Locale } from "@/lib/i18n/config";
import styles from "./language-switcher.module.css";

export default function LanguageSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  return <nav className={styles.switcher} aria-label="Language">
    {buildLanguageLinks(pathname).map((item) => <Link key={item.locale} href={item.href}
      aria-current={item.locale === locale ? "page" : undefined}>{item.label}</Link>)}
  </nav>;
}
```

- [ ] **Step 3: Style it as part of the current navigation**

Keep the selector compact, text-only and low-motion. Use existing foreground colors, a subtle selected underline, `44px` minimum touch target on small screens and no new animation library.

- [ ] **Step 4: Run the component test**

Run: `npm test -- lib/i18n/config.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit the switcher**

```bash
git add app/LanguageSwitcher.tsx app/language-switcher.module.css lib/i18n/config.ts lib/i18n/config.test.ts
git commit -m "feat: add accessible language switcher"
```

### Task 4: Localize the homepage without changing its design

**Files:**
- Create: `app/LocalizedHome.tsx`
- Modify: `app/page.tsx`
- Modify: `app/PersonalHero.tsx`
- Modify: `app/PersonalWorld.tsx`
- Modify: `app/FieldNotesPreview.tsx`
- Modify: `app/AIOutlook.tsx`
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Extract the existing client implementation into `LocalizedHome`**

```tsx
"use client";
export default function LocalizedHome({ locale }: { locale: Locale }) {
  const copy = siteContent[locale];
  const portfolio = localizedPortfolio[locale];
  const notes = localizedNotes[locale];
  // Preserve current world state, canvas, pointer effects, motion classes and markup hierarchy.
}
```

- [ ] **Step 2: Make the Chinese page a thin wrapper**

```tsx
import LocalizedHome from "./LocalizedHome";
export default function Home() { return <LocalizedHome locale="zh-CN" />; }
```

- [ ] **Step 3: Add the prefixed home wrapper and reject invalid locales**

```tsx
import { notFound } from "next/navigation";
import LocalizedHome from "../LocalizedHome";
import { normalizeLocale } from "@/lib/i18n/config";

export default function LocaleHome({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale);
  if (!locale || locale === "zh-CN") notFound();
  return <LocalizedHome locale={locale} />;
}
```

- [ ] **Step 4: Pass localized copy into all homepage child components**

Replace embedded Chinese text only. Preserve every existing class name, section order, animation trigger and personal/work toggle behavior. Insert `LanguageSwitcher` into the existing top navigation and pass the homepage pathname for the active locale.

- [ ] **Step 5: Run current homepage/motion tests and build**

Run: `npm test && npm run build`
Expected: PASS; `/`, `/en`, and `/ja` are statically generated or server-render without errors.

- [ ] **Step 6: Commit homepage localization**

```bash
git add app lib/i18n
git commit -m "feat: localize personal and work homepages"
```

### Task 5: Localize About and both case pages

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/cases/[slug]/page.tsx`
- Modify: `app/cases/[slug]/SfaCaseContent.tsx`
- Create: `app/[locale]/about/page.tsx`
- Create: `app/[locale]/cases/[slug]/page.tsx`

- [ ] **Step 1: Extract locale-aware page views**

Export `AboutView({ locale })` and `CaseView({ locale, slug })` from focused shared files or from the current route modules. Chinese wrappers pass `zh-CN`; prefixed wrappers validate `en`/`ja` and pass the selected locale.

- [ ] **Step 2: Replace all visible strings with dictionary values**

Cover navigation, section labels, role text, all case details, result labels, public-boundary copy and next-page links. Keep current CSS modules and markup structure unchanged.

- [ ] **Step 3: Add locale-aware static params for case routes**

```ts
export function generateStaticParams() {
  return ["en", "ja"].flatMap((locale) => ["dms", "sfa"].map((slug) => ({ locale, slug })));
}
```

- [ ] **Step 4: Run case and portfolio tests**

Run: `npm test -- lib/portfolio.test.ts lib/i18n/completeness.test.ts && npm run build`
Expected: PASS and all six case URLs build.

- [ ] **Step 5: Commit About and case localization**

```bash
git add app/about app/cases app/'[locale]' lib/i18n
git commit -m "feat: localize about and case pages"
```

### Task 6: Localize all four article pages

**Files:**
- Modify: `app/notes/page.tsx`
- Modify: `app/notes/system-process/page.tsx`
- Modify: `app/notes/continuous-use/page.tsx`
- Modify: `app/notes/ai-outlook/page.tsx`
- Modify: `app/notes/EvidencePortal.tsx`
- Create: the four matching route wrappers under `app/[locale]/notes/`

- [ ] **Step 1: Create locale-aware article views**

Each existing article exports a shared view receiving `locale: Locale`; the Chinese route passes `zh-CN` and each prefixed route validates the locale before rendering.

- [ ] **Step 2: Localize navigation and evidence interactions**

Pass translated labels to `EvidencePortal`; ensure interactive state remains language-independent and every internal article/case/About link uses `localizePath`.

- [ ] **Step 3: Verify article routes and content completeness**

Run: `npm test -- app/notes lib/i18n/completeness.test.ts && npm run build`
Expected: PASS and all twelve article URLs build without fallback text.

- [ ] **Step 4: Commit article localization**

```bash
git add app/notes app/'[locale]'/notes lib/i18n
git commit -m "feat: localize field notes and AI outlook"
```

### Task 7: Localized metadata, sitemap and final visual QA

**Files:**
- Modify: `app/layout.tsx`
- Create: `middleware.ts`
- Create: `app/sitemap.ts`
- Modify: locale route files to export localized metadata.

- [ ] **Step 1: Add a locale request header and set the document language**

`middleware.ts` derives `zh-CN`, `en` or `ja` from the first path segment and writes it to `x-site-locale`. `app/layout.tsx` reads that header and renders `<html lang={locale}>`, so screen readers and browsers receive the correct document language without client-side mutation.

- [ ] **Step 2: Add per-locale metadata and alternates**

Every route must expose a localized title and description plus alternates for `zh-CN`, `en`, `ja` and `x-default`. Set the document language through the route-level locale contract without client-side mutation.

- [ ] **Step 3: Generate all public sitemap entries**

```ts
const pages = ["/", "/about", "/cases/dms", "/cases/sfa", "/notes", "/notes/system-process", "/notes/continuous-use", "/notes/ai-outlook"];
export default function sitemap() {
  return pages.flatMap((path) => locales.map((locale) => ({
    url: `${siteOrigin}${localizePath(path, locale)}`,
    alternates: { languages: Object.fromEntries(locales.map((item) => [item, `${siteOrigin}${localizePath(path, item)}`])) },
  })));
}
```

- [ ] **Step 4: Run automated verification**

Run: `npm test && npm run build`
Expected: all tests pass; build reports no missing routes, type errors or untranslated dictionary shape mismatches.

- [ ] **Step 5: Perform focused browser QA**

Check desktop and mobile widths for all three languages on:

- personal homepage and work-world toggle
- About timeline and contact area
- DMS result timeline
- SFA iteration cards
- one long field-note article
- AI outlook article

Verify language switching preserves each current page, long English/Japanese headings wrap without overlap, existing motion stays smooth, and `/` always opens Chinese.

- [ ] **Step 6: Fix only localization regressions and rerun build**

Do not redesign approved sections. Limit CSS changes to language-dependent wrapping, spacing and selector responsiveness.

- [ ] **Step 7: Commit final metadata and QA fixes**

```bash
git add app lib/i18n
git commit -m "feat: complete trilingual site localization"
```
