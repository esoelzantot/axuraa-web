import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n";

/**
 * Locale guard (Next.js 16 "proxy", formerly middleware).
 * Paths without a supported locale prefix are redirected to the default locale,
 * e.g. `/contact` → `/en/contact`. Unknown pages then hit a real 404 instead of
 * being rendered as the home page with a bogus locale.
 */
export function proxy(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl;
  if (pathname === "/") return NextResponse.next();

  const firstSegment = pathname.split("/")[1];
  if (isSupportedLocale(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  url.search = search;
  url.hash = hash;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (assets in /public).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
