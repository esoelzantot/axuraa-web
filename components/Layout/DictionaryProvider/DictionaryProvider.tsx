"use client";

import { createContext } from "react";
import type { Locale } from "@/lib/i18n";
import type { Overrides } from "@/lib/dictionaries/overrides";

type LocaleOverrides = Partial<Record<Locale, Overrides>>;

export const OverridesContext = createContext<LocaleOverrides>({});

interface Props {
  overrides: LocaleOverrides;
  children: React.ReactNode;
}

/** Hands the dashboard's text edits (fetched by the layout) to client components. */
const DictionaryProvider = ({ overrides, children }: Props) => (
  <OverridesContext.Provider value={overrides}>{children}</OverridesContext.Provider>
);

export default DictionaryProvider;
