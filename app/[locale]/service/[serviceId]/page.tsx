import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { getServiceById } from "@/service/serviceId/serviceId";
import ServicePage from "@/components/pages/ServicePage/ServicePage";
import { Locale, localize } from "@/lib/i18n";

export const revalidate = 60;

type Params = Promise<{ serviceId: string; locale: string }>;

// Shared between generateMetadata and the page so the API is called once per request.
const loadService = cache((id: string, locale: Locale) => getServiceById(id, locale));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { serviceId, locale } = await params;
  const { data } = await loadService(serviceId, locale as Locale);
  if (!data) return {};
  return {
    title: localize(data.title, locale as Locale),
    description: localize(data.description, locale as Locale).slice(0, 160),
  };
}

export default async function ServicePageWrapper({ params }: { params: Params }) {
  const { serviceId, locale } = await params;
  const result = await loadService(serviceId, locale as Locale);
  if (!result.success || !result.data) notFound();
  return <ServicePage service={result.data} locale={locale as Locale} />;
}
