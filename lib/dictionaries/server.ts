import { cache } from "react";
import { isSupportedLocale, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";
import { getSiteContent } from "@/service/SiteContent/siteContent";
import type { Dictionary } from "./index";
import { getLegalDoc, LEGAL_SHAPE, type LegalDoc } from "./legal";
import { applyOverrides, mergeDictionary, NO_OVERRIDES, type Overrides } from "./overrides";

// One request per render, shared by the layout, the page and its metadata.
const loadOverrides = cache(async (locale: Locale): Promise<Overrides> => {
  if (!isSupportedLocale(locale)) return NO_OVERRIDES;
  return (await getSiteContent(locale)).data ?? NO_OVERRIDES;
});

/** UI strings with the dashboard's edits. Server components only; client ones use `useDictionary`. */
export const loadDictionary = async (locale: Locale): Promise<Dictionary> =>
  mergeDictionary(locale, await loadOverrides(locale));

/** Legal page content with the dashboard's edits. */
export const loadLegalDoc = async (doc: "privacy" | "terms", locale: Locale): Promise<LegalDoc> =>
  applyOverrides(getLegalDoc(doc, locale), await loadOverrides(locale), `legal.${doc}`, LEGAL_SHAPE);

const pick = (overrides: Overrides, keep: (key: string) => boolean): Overrides =>
  Object.fromEntries(Object.entries(overrides).filter(([key]) => keep(key)));

/**
 * What the browser needs: the page's own language without the long legal texts,
 * and from the other languages only the names shown by the language switcher.
 */
export const loadClientOverrides = async (locale: Locale): Promise<Partial<Record<Locale, Overrides>>> =>
  Object.fromEntries(
    await Promise.all(
      SUPPORTED_LOCALES.map(async (l): Promise<[Locale, Overrides]> => [
        l,
        pick(await loadOverrides(l), (key) =>
          l === locale ? !key.startsWith("legal.") : key.startsWith("language."),
        ),
      ]),
    ),
  );
