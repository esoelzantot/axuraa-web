import type { Metadata } from "next";
import { getAllServices, filterServices } from "@/service/Services/services";
import BusinessSolutions from "@/components/pages/BusinessSolutions/BusinessSolutions";
import { Locale, localize } from "@/lib/i18n";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Business Solutions",
  description: "Ready-made business solutions from Axuraa, tailored to the way you work.",
};

export default async function BusinessSolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const result = await getAllServices(locale);

  const services = filterServices(result.data, "solution").map((service) => ({
    id: service._id,
    title: localize(service.title, locale),
    description: localize(service.description, locale),
    features: (service.what_we_do?.units ?? []).map((u) => localize(u, locale)).filter(Boolean),
    buttonText: "Learn More",
    iconUrl: service.icon?.trim() || "",
  }));

  return <BusinessSolutions services={services} locale={locale} />;
}
