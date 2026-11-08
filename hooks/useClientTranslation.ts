"use client";

import { usePathname } from "next/navigation";
import { Locale, localeFromPath } from "@/lib/i18n";

import enCommon from "@/public/locales/en/common.json";
import enNavlink from "@/public/locales/en/navlink.json";

type Dictionary = Record<string, unknown>;

/**
 * Translations are bundled (not fetched at runtime), so text renders on the
 * server and the first paint shows real labels instead of raw keys.
 * Only the namespaces used by client components are bundled; import more here as needed.
 * Add a locale by importing its files here and listing it in SUPPORTED_LOCALES.
 */
const RESOURCES: Partial<Record<Locale, Record<string, Dictionary>>> = {
  en: {
    common: enCommon,
    navlink: enNavlink,
  },
};

const useClientTranslation = (namespace: string = "common") => {
  const locale = localeFromPath(usePathname());
  const dictionary = RESOURCES[locale]?.[namespace] ?? RESOURCES.en?.[namespace] ?? {};

  const t = (key: string, fallback?: string): string => {
    let value: unknown = dictionary;
    for (const part of key.split(".")) {
      value = value && typeof value === "object" ? (value as Dictionary)[part] : undefined;
    }
    return typeof value === "string" ? value : (fallback ?? key);
  };

  return { t, locale, loading: false };
};

export default useClientTranslation;
