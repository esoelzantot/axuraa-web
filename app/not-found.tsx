import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export const metadata = { title: "Page not found" };

export default function NotFound() {
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
        color: "#ffffff",
      }}
    >
      <p style={{ color: "#D04A1D", fontWeight: 700, letterSpacing: "0.1em" }}>404</p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", margin: 0 }}>Page not found</h1>
      <p style={{ color: "#9CA3AF", maxWidth: 480 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href={`/${DEFAULT_LOCALE}`}
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
        Back to home
      </Link>
    </section>
  );
}
