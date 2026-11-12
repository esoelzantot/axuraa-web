"use client";

import { useEffect, useId } from "react";
import styles from "./ThemeToggle.module.css";
import useDictionary from "@/hooks/useDictionary";
import { THEME_COLORS, THEME_STORAGE_KEY, Theme } from "./theme";

const currentTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

const applyTheme = (theme: Theme, persist: boolean) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage unavailable: the choice lasts for this page only */
    }
  }
};

/**
 * Light / dark switch. The icon morphs sun ⇄ moon from CSS alone (driven by
 * <html data-theme>, so server and client markup match), and the new theme is
 * revealed as a circle growing from the button where View Transitions exist.
 */
const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { t } = useDictionary();
  const maskId = `theme-mask-${useId().replace(/:/g, "")}`;

  // Follow OS changes until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (saved !== "light" && saved !== "dark") applyTheme(e.matches ? "light" : "dark", false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = currentTheme() === "light" ? "dark" : "light";
    const root = document.documentElement;
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty(
      "--theme-r",
      `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`,
    );

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyTheme(next, true));
      return;
    }
    // Fallback: short colour cross-fade (instant under reduced motion).
    if (!reduce) root.classList.add("theme-fading");
    applyTheme(next, true);
    window.setTimeout(() => root.classList.remove("theme-fading"), 400);
  };

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className}`}
      onClick={toggle}
      aria-label={t.theme.toggle}
      title={t.theme.toggle}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="#fff" />
          <circle className={styles.bite} cx="17" cy="7" r="7" fill="#000" />
        </mask>
        <circle className={styles.core} cx="12" cy="12" r="8" fill="currentColor" mask={`url(#${maskId})`} />
        <g className={styles.rays} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="12" y1="1.6" x2="12" y2="3.4" transform={`rotate(${i * 45} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
};

export default ThemeToggle;
