import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { getAllServices, filterServices } from "@/service/Services/services";
import ServicesPage from "@/components/pages/Services/ServicesPage";
import { Locale } from "@/lib/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getDictionary(locale as Locale).meta.services;
}

export default async function ServiceIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const result = await getAllServices(locale);
  return <ServicesPage services={filterServices(result.data, "service")} locale={locale} />;
}
