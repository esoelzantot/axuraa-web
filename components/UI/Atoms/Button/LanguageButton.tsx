"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./LanguageButton.module.css";
import { SUPPORTED_LOCALES, isSupportedLocale, localeFromPath } from "@/lib/i18n";

interface LanguageButtonProps {
  className?: string;
}

const LANGUAGES = {
  en: { name: "English", flag: "https://flagcdn.com/w40/gb.png" },
  ar: { name: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
} as const;

/** Toggles to the next supported locale, keeping the rest of the path. */
export const LanguageButton = ({ className = "" }: LanguageButtonProps) => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const current = localeFromPath(pathname);
  const next = SUPPORTED_LOCALES[(SUPPORTED_LOCALES.indexOf(current) + 1) % SUPPORTED_LOCALES.length];
  const language = LANGUAGES[current];

  const switchLanguage = () => {
    const segments = pathname.split("/");
    if (isSupportedLocale(segments[1])) segments[1] = next;
    else segments.splice(1, 0, next);
    router.push(segments.join("/").replace(/\/$/, "") || `/${next}`);
    router.refresh();
  };

  return (
    <div className={className}>
      <button
        type="button"
        className={`${styles.languageButton} ${current === "ar" ? styles.rtl : ""}`}
        onClick={switchLanguage}
        aria-label={`Switch language to ${LANGUAGES[next].name}`}
      >
        <span className={styles.flag}>
          <Image
            src={language.flag}
            alt=""
            width={40}
            height={30}
            className={styles.flagImage}
            unoptimized
          />
        </span>
        <span className={styles.languageName}>{language.name}</span>
      </button>
    </div>
  );
};
