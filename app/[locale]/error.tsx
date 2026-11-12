"use client";

import { useEffect } from "react";
import useDictionary from "@/hooks/useDictionary";

/** Route-level error boundary: keeps the header/footer and offers a retry. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useDictionary();
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", margin: 0 }}>{t.error.title}</h1>
      <p style={{ color: "var(--text-muted)", maxWidth: 480 }}>
        {t.error.text}
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          borderRadius: 999,
          border: "none",
          background: "linear-gradient(90deg, #D04A1D 0%, #902501 100%)",
          color: "#ffffff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {t.error.retry}
      </button>
    </section>
  );
}
