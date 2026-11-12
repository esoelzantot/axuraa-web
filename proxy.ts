import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, Locale, isSupportedLocale } from "@/lib/i18n";

/** Visitor's preferred locale: saved choice first, then the browser's languages. */
const preferredLocale = (request: NextRequest): Locale => {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isSupportedLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((r) => isSupportedLocale(r.lang));
  return match ? (match.lang as Locale) : DEFAULT_LOCALE;
};

/**
 * Locale guard (Next.js 16 "proxy", formerly middleware).
 * Paths without a supported locale prefix (including `/`) are redirected to the
 * visitor's language, e.g. `/contact` → `/ar/contact`.
 */
export function proxy(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl;

  const firstSegment = pathname.split("/")[1];
  if (isSupportedLocale(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  url.hash = hash;
  // 307: the target depends on the visitor, so it must not be cached as permanent.
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (assets in /public).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
