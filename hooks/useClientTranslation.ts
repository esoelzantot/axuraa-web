"use client";

import { useState, useEffect } from "react";

interface TranslationData {
  [key: string]: any;
}

const useClientTranslation = (namespace: string = "common") => {
  const [translations, setTranslations] = useState<TranslationData>({});
  const [locale, setLocale] = useState<string>("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Get locale from URL
        const pathLocale = window.location.pathname.split("/")[1] || "en";
        setLocale(pathLocale);

        // Load translation file
        const response = await fetch(
          `/locales/${pathLocale}/${namespace}.json`,
        );
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        }
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();

    // Listen for URL changes (language switching)
    const handlePopState = () => {
      loadTranslations();
    };

    window.addEventListener("popstate", handlePopState);

    // Also listen for custom language change events
    const handleLanguageChange = () => {
      loadTranslations();
    };

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, [namespace]);

  const t = (key: string, fallback?: string): string => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return (typeof value === "string" ? value : fallback || key) as string;
  };

  return { t, locale, loading };
};

export default useClientTranslation;
