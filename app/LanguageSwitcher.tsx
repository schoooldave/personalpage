import Link from "next/link";
import { buildLanguageLinks, type Locale } from "@/lib/i18n/config";
import styles from "./language-switcher.module.css";

type LanguageSwitcherProps = {
  locale: Locale;
  pathname: string;
};

export default function LanguageSwitcher({ locale, pathname }: LanguageSwitcherProps) {
  return (
    <nav className={styles.switcher} aria-label="Language switcher">
      {buildLanguageLinks(pathname).map((item) => (
        <Link
          key={item.locale}
          className={`${styles.link} ${item.locale === locale ? styles.active : ""}`}
          href={item.href}
          aria-current={item.locale === locale ? "page" : undefined}
          lang={item.locale === "zh-CN" ? "zh-Hans" : item.locale}
          prefetch={false}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
