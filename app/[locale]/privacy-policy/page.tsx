import type { Metadata } from "next";
import LegalPage from "@/components/pages/Legal/LegalPage";
import { Locale } from "@/lib/i18n";
import { loadDictionary, loadLegalDoc } from "@/lib/dictionaries/server";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return (await loadDictionary(locale as Locale)).meta.privacy;
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalPage kind="privacy" locale={locale as Locale} doc={await loadLegalDoc("privacy", locale as Locale)} />;
}
