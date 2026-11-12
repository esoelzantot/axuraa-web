"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./LanguageTransition.module.css";
import { Locale, isSupportedLocale, localeFromPath } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

/** Event the language switcher fires; this component runs the transition and the navigation. */
export const LANGUAGE_SWITCH_EVENT = "axuraa:language-switch";
export interface LanguageSwitchDetail {
  href: string;
  locale: Locale;
  x: number;
  y: number;
}

// Survives a remount of the layout during the switch, so the exit animation still plays.
const STORAGE_KEY = "axuraa-language-switch";
const ENTER_MS = 520;
const LEAVE_MS = 560;

type Phase = "idle" | "enter" | "covered" | "leave";

/** Starts a language switch (used by the switcher; falls back to plain navigation). */
export const requestLanguageSwitch = (detail: LanguageSwitchDetail) =>
  window.dispatchEvent(new CustomEvent<LanguageSwitchDetail>(LANGUAGE_SWITCH_EVENT, { detail }));

/**
 * Full-screen language transition: a brand circle grows from the switcher,
 * shows the target language's name, the page changes behind it, then it fades away.
 */
const LanguageTransition = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [target, setTarget] = useState<{ locale: Locale; x: number; y: number } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

  // Start: cover the screen, then navigate.
  useEffect(() => {
    const onSwitch = (e: Event) => {
      const { href, locale, x, y } = (e as CustomEvent<LanguageSwitchDetail>).detail;
      // (Reduced motion: same flow, the CSS swaps the circle for a short fade.)
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ locale, x, y, at: Date.now() }));
      } catch {
        /* storage unavailable: the exit just won't survive a remount */
      }
      setTarget({ locale, x, y });
      setPhase("enter");
      later(() => {
        setPhase("covered");
        router.push(href);
      }, ENTER_MS);
    };
    window.addEventListener(LANGUAGE_SWITCH_EVENT, onSwitch);
    const pending = timers.current;
    return () => {
      window.removeEventListener(LANGUAGE_SWITCH_EVENT, onSwitch);
      pending.forEach(clearTimeout);
    };
  }, [router]);

  // Finish: once the URL is in the new language (also right after a remount), reveal the page.
  useEffect(() => {
    let saved: { locale: string; x: number; y: number; at: number } | null = null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      saved = raw ? JSON.parse(raw) : null;
    } catch {
      saved = null;
    }
    if (!saved || !isSupportedLocale(saved.locale) || Date.now() - saved.at > 8000) return;
    if (localeFromPath(pathname) !== saved.locale) return;

    const { locale, x, y } = saved;
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    // Covered right away (this also covers a freshly remounted layout), let the
    // new page paint underneath, then lift the cover.
    const cover = setTimeout(() => {
      setTarget({ locale, x, y });
      setPhase((p) => (p === "leave" ? p : "covered"));
    }, 0);
    const start = setTimeout(() => setPhase("leave"), 160);
    const done = setTimeout(() => {
      setPhase("idle");
      setTarget(null);
    }, 160 + LEAVE_MS);
    return () => {
      clearTimeout(cover);
      clearTimeout(start);
      clearTimeout(done);
    };
  }, [pathname]);

  if (phase === "idle" || !target) return null;

  const t = getDictionary(target.locale);
  return (
    <div
      className={`${styles.overlay} ${styles[phase]}`}
      style={{ ["--x" as string]: `${target.x}px`, ["--y" as string]: `${target.y}px` }}
      aria-hidden="true"
    >
      <div className={styles.content} lang={target.locale} dir={target.locale === "ar" ? "rtl" : "ltr"}>
        <span className={styles.glyph}>{t.language[target.locale]}</span>
        <span className={styles.bar} />
      </div>
    </div>
  );
};

export default LanguageTransition;
