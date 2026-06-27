import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import ChatBot from "@/components/UI/Atoms/ChatBot/ChatBot";
import { Suspense } from "react";
import PerLoading from "@/components/UI/Muscles/PreLoading/PreLoading";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Axuraa",
  description: "project management agency",
  keywords: ["Axuraa", "project management agency", "Axuraa Agency"],
  // favicon: "/assets/favicon.ico",
};
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={styles.html}>
      <body className={`${roboto.variable} ${styles.body}`}>
        <div className={styles.wrapper}>
          <Header />
          <Suspense
            fallback={<PerLoading />}
          >
            <main className={styles.main}>{children}</main>
            <Footer />
          </Suspense>
        </div>
        <ChatBot />
      </body>
    </html>
  );
}
