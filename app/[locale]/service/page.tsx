import type { Metadata } from "next";
import { getAllServices, filterServices } from "@/service/Services/services";
import ServicesPage from "@/components/pages/Services/ServicesPage";
import { Locale } from "@/lib/i18n";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description: "Web, mobile, cloud and AI services from Axuraa.",
};

export default async function ServiceIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const result = await getAllServices(locale);
  return <ServicesPage services={filterServices(result.data, "service")} locale={locale} />;
}
