"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/i18n";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  /** Path without the locale, e.g. "/portfolio" or "/service/123". */
  href: string;
};

/**
 * A `Link` that prefixes the current locale. Lets server components (Header,
 * Footer in the root layout) build locale-aware links without knowing the locale.
 */
const LocalizedLink = ({ href, ...rest }: Props) => {
  const locale = localeFromPath(usePathname());
  const path = href.startsWith("/") ? href : `/${href}`;
  return <Link href={`/${locale}${path === "/" ? "" : path}`} {...rest} />;
};

export default LocalizedLink;
