// app/[locale]/service/[serviceId]/page.tsx
import { getServiceById } from "@/service/serviceId/serviceId";
import ServicePage from "@/components/pages/ServicePage/ServicePage";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ serviceId: string; locale: string }>;
}

export default async function ServicePageWrapper({ params }: PageProps) {
  const { serviceId, locale } = await params;
  const typedLocale = locale as "en" | "ar";

  const result = await getServiceById(serviceId, typedLocale);

  if (!result.success || !result.data) notFound();

  return <ServicePage service={result.data} locale={typedLocale} />;
}
