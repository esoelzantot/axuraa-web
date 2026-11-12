import type { Locale } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { ar } from "./ar";

export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

/** UI strings for a locale (server or client; dictionaries are static modules). */
export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale] ?? en;

/**
 * Text from the CMS for the current locale. A few endpoints only return
 * English; known strings get their Arabic translation from `cms`.
 */
export const cmsText = (text: string | null | undefined, locale: Locale): string => {
  if (!text) return "";
  return getDictionary(locale).cms[text.trim()] ?? text;
};
