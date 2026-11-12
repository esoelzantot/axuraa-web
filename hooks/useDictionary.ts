"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, localeDir } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

/** UI dictionary for the locale in the current URL (client components). */
const useDictionary = () => {
  const locale = localeFromPath(usePathname());
  return { t: getDictionary(locale), locale, dir: localeDir(locale) };
};

export default useDictionary;
