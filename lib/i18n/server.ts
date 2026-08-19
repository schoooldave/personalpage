import { headers } from "next/headers";
import { normalizeLocale, type Locale } from "./config";

export function getRequestLocale(): Locale {
  return normalizeLocale(headers().get("x-site-locale") ?? "") ?? "zh-CN";
}
