import type { Metadata } from "next";
import { getContactInformation } from "@/service/Contact/contactinformation";
import Contact from "@/components/pages/Contact/Contact";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getDictionary(locale as Locale).meta.contact;
}

export default async function ContactUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const result = await getContactInformation(locale as Locale);
  return <Contact contactData={result.data ?? null} />;
}
