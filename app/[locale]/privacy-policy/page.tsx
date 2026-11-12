import type { Metadata } from "next";
import LegalPage from "@/components/pages/Legal/LegalPage";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getLegalDoc } from "@/lib/dictionaries/legal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getDictionary(locale as Locale).meta.privacy;
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalPage doc={getLegalDoc("privacy", locale as Locale)} />;
}
