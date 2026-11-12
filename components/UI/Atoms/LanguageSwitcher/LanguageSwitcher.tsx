"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import styles from "./LanguageSwitcher.module.css";
import { LOCALE_COOKIE, Locale, SUPPORTED_LOCALES, localeFromPath, pathForLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { requestLanguageSwitch } from "@/components/Layout/LanguageTransition/LanguageTransition";

interface LanguageSwitcherProps {
  /** "compact" (EN / ع) for the nav bar, "full" (English / العربية) for the mobile drawer. */
  variant?: "compact" | "full";
  className?: string;
  onSwitch?: () => void;
}

/** Remember the choice for a year so `/` and unprefixed links open in this language. */
const rememberLocale = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
};

/**
 * Language switcher: a pill with one link per language and a sliding thumb.
 * Each option links to the same page in that language (real anchors with
 * hrefLang, so it works without JS and search engines can follow them).
 */
const LanguageSwitcher = ({ variant = "compact", className = "", onSwitch }: LanguageSwitcherProps) => {
  const pathname = usePathname() || "/";
  const current = localeFromPath(pathname);
  const t = getDictionary(current);
  const activeIndex = SUPPORTED_LOCALES.indexOf(current);

  return (
    <div
      role="group"
      className={`${styles.switcher} ${variant === "full" ? styles.full : ""} ${className}`}
      aria-label={t.language.label}
      style={{ ["--active" as string]: activeIndex }}
    >
      <Globe className={styles.globe} size={16} aria-hidden="true" />
      <span className={styles.track}>
        <span className={styles.thumb} aria-hidden="true" />
        {SUPPORTED_LOCALES.map((locale) => {
          const names = getDictionary(locale).language;
          const isActive = locale === current;
          return (
            <Link
              key={locale}
              href={pathForLocale(pathname, locale)}
              hrefLang={locale}
              lang={locale}
              className={`${styles.option} ${isActive ? styles.active : ""}`}
              aria-current={isActive ? "true" : undefined}
              aria-label={isActive ? names[locale] : t.language.switchTo(names[locale])}
              onClick={(e) => {
                rememberLocale(locale);
                onSwitch?.();
                // New tab / window: let the browser handle it.
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                const rect = e.currentTarget.getBoundingClientRect();
                requestLanguageSwitch({
                  href: pathForLocale(pathname, locale),
                  locale,
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                });
              }}
            >
              {variant === "full" ? names[locale] : locale === "ar" ? names.arShort : names.enShort}
            </Link>
          );
        })}
      </span>
    </div>
  );
};

export default LanguageSwitcher;
