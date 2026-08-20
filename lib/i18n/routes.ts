import { localizePath, type Locale } from "./config";

export function localizedCasePath(slug: string, locale: Locale): string {
  return localizePath(`/cases/${slug}`, locale);
}

export function localizedNotePath(slug: string, locale: Locale): string {
  return localizePath(`/notes/${slug}`, locale);
}
