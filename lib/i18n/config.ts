export const locales = ["zh-CN", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  "zh-CN": "中",
  en: "EN",
  ja: "日",
};

export type LanguageLink = {
  locale: Locale;
  label: string;
  href: string;
};

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function normalizeLocale(value: string): Locale | null {
  return isLocale(value) ? value : null;
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    const prefix = `/${locale}`;
    if (pathname === prefix) {
      return "/";
    }
    if (pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length);
    }
  }

  return pathname;
}

export function localizePath(pathname: string, locale: Locale): string {
  const basePath = stripLocalePrefix(pathname);
  if (locale === "zh-CN") {
    return basePath;
  }

  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function buildLanguageLinks(pathname: string): LanguageLink[] {
  return locales.map((locale) => ({
    locale,
    label: localeLabels[locale],
    href: localizePath(pathname, locale),
  }));
}
