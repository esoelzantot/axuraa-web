"use client";

import Link from "next/link";
import useDictionary from "@/hooks/useDictionary";

/** Localized 404 (not-found pages get no params, so the locale comes from the URL). */
export default function NotFound() {
  const { t, locale } = useDictionary();

  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "8rem 1.5rem 4rem",
        textAlign: "center",
        color: "var(--text)",
      }}
    >
      <title>{t.notFound.title}</title>
      <p style={{ color: "#D04A1D", fontWeight: 700, letterSpacing: "0.1em" }}>404</p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", margin: 0 }}>{t.notFound.title}</h1>
      <p style={{ color: "var(--text-muted)", maxWidth: 480 }}>{t.notFound.text}</p>
      <Link
        href={`/${locale}`}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          borderRadius: 999,
          background: "linear-gradient(90deg, #D04A1D 0%, #902501 100%)",
          color: "#ffffff",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        {t.notFound.back}
      </Link>
    </section>
  );
}
