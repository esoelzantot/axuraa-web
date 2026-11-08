/** Languages the backend can return content in. */
export type Locale = "en" | "ar";

/**
 * Locales the site actually ships translations for (see public/locales/*).
 * Add "ar" here once public/locales/ar/*.json exists and the RTL styles are ready.
 */
export const SUPPORTED_LOCALES: readonly Locale[] = ["en"];
export const DEFAULT_LOCALE: Locale = "en";

export const isSupportedLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);

/** Reads the locale from the first path segment, falling back to the default. */
export const localeFromPath = (pathname: string | null | undefined): Locale => {
  const segment = pathname?.split("/")[1];
  return isSupportedLocale(segment) ? segment : DEFAULT_LOCALE;
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
