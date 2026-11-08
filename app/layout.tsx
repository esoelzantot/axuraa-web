import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import ChatBot from "@/components/UI/Atoms/ChatBot/ChatBot";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: ["Axuraa", "software agency", "web development", "mobile apps", "business solutions"],
  openGraph: { siteName: SITE_NAME, type: "website" },
};

// No `maximumScale`: users must be able to pinch-zoom (WCAG 1.4.4).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE} className={styles.html}>
      <body className={`${roboto.variable} ${styles.body}`}>
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
        <ChatBot />
      </body>
    </html>
  );
}
