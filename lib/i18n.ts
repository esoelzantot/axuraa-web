/** Languages the site and the backend support. */
export type Locale = "en" | "ar";

/** Locales the site ships (UI dictionaries live in lib/dictionaries). */
export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "ar"];
export const DEFAULT_LOCALE: Locale = "en";

/** Cookie that remembers the visitor's language choice (read by proxy.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isSupportedLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);

/** Text direction for a locale. */
export const localeDir = (locale: Locale): "rtl" | "ltr" => (locale === "ar" ? "rtl" : "ltr");

/** Reads the locale from the first path segment, falling back to the default. */
export const localeFromPath = (pathname: string | null | undefined): Locale => {
  const segment = pathname?.split("/")[1];
  return isSupportedLocale(segment) ? segment : DEFAULT_LOCALE;
};

/** Same page in another language: swaps (or adds) the locale prefix of a path. */
export const pathForLocale = (pathname: string, locale: Locale): string => {
  const segments = (pathname || "/").split("/");
  if (isSupportedLocale(segments[1])) segments[1] = locale;
  else segments.splice(1, 0, locale);
  return segments.join("/").replace(/\/$/, "") || `/${locale}`;
};

/**
 * The API returns plain strings when called with `?lang=`, but some nested
 * fields still come back as `{ en, ar }` objects. This handles both.
 */
export function localize(field: unknown, locale: Locale = DEFAULT_LOCALE): string {
  if (field == null) return "";
  if (typeof field === "string") return field;
  if (typeof field === "number") return String(field);
  if (typeof field === "object") {
    const f = field as Partial<Record<string, unknown>>;
    const value = f[locale] ?? f.en ?? Object.values(f)[0];
    return typeof value === "string" ? value : "";
  }
  return "";
}

/** A localized field as returned by the API: either already resolved or `{ en, ar }`. */
export type Localized = string | { en?: string; ar?: string };
