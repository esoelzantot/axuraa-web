/** Theme handling shared by the inline init script and the toggle. */
export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "axuraa-theme";

/** Browser-bar colour per theme (matches --bg). */
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#191b1f",
  light: "#f6f4f1",
};

/**
 * Runs in <head> before first paint: the saved choice, otherwise the OS
 * preference. Sets <html data-theme> so there is no flash of the wrong theme.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",t);d.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?${JSON.stringify(
  THEME_COLORS.light,
)}:${JSON.stringify(THEME_COLORS.dark)})}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;
