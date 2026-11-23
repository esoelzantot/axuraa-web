"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";
import { OverridesContext } from "@/components/Layout/DictionaryProvider/DictionaryProvider";
import { localeFromPath, localeDir, type Locale } from "@/lib/i18n";
import { mergeDictionary } from "@/lib/dictionaries/overrides";

/** UI dictionary, with the dashboard's edits, for the locale in the current URL (client components). */
const useDictionary = () => {
  const overrides = useContext(OverridesContext);
  const locale = localeFromPath(usePathname());
  const dictionaryFor = (l: Locale) => mergeDictionary(l, overrides[l]);
  return { t: dictionaryFor(locale), locale, dir: localeDir(locale), dictionaryFor };
};

export default useDictionary;
