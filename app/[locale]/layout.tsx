import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Arabic, Roboto } from "next/font/google";
import "../globals.css";
import styles from "../layout.module.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import ChatBot from "@/components/UI/Atoms/ChatBot/ChatBot";
import RevealObserver from "@/components/Layout/Reveal/RevealObserver";
import LanguageTransition from "@/components/Layout/LanguageTransition/LanguageTransition";
import { Locale, SUPPORTED_LOCALES, isSupportedLocale, localeDir } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { SITE_NAME } from "@/lib/site";
import { THEME_COLORS, themeInitScript } from "@/components/Layout/Theme/theme";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

// Arabic text face; Latin glyphs inside Arabic pages still come from Roboto.
const plexArabic = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: t.meta.siteDescription,
    keywords: ["Axuraa", "software agency", "web development", "mobile apps", "business solutions"],
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
    },
    alternates: {
      languages: Object.fromEntries(SUPPORTED_LOCALES.map((l) => [l, `/${l}`])),
    },
  };
}

// No `maximumScale`: users must be able to pinch-zoom (WCAG 1.4.4).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout (one per locale): sets `lang` and `dir` on <html> on the server,
 * so Arabic pages render right-to-left from the first byte.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  return (
    // data-theme is set before paint by the inline script, so React must not
    // treat that attribute as a hydration mismatch.
    <html lang={locale} dir={localeDir(locale)} className={styles.html} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={THEME_COLORS.dark} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${roboto.variable} ${plexArabic.variable} ${styles.body}`}>
        <RevealObserver />
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer locale={locale as Locale} />
        </div>
        <ChatBot />
        <LanguageTransition />
      </body>
    </html>
  );
}
