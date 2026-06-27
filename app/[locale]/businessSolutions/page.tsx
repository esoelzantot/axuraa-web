// app/[locale]/businessSolutions/page.tsx
import { getAllServices } from "@/service/Services/services";
import BusinessSolutions from "@/components/pages/BusinessSolutions/BusinessSolutions";

interface PageProps {
  params: Promise<{ locale: string }>; // ← Promise
}

export default async function BusinessSolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale = locale as "en" | "ar";

  const result = await getAllServices(typedLocale);

  const services =
    result.success && result.data
      ? result.data
          .filter((s) => s.type === "solution" && s.is_active === true)
          .map((service) => ({
            id: service._id,
            title:
              typeof service.title === "string"
                ? service.title
                : service.title[typedLocale] || service.title,
            description:
              typeof service.description === "string"
                ? service.description
                : service.description[typedLocale] || service.description,
            features:
              service.what_we_do?.units?.map((u) =>
                typeof u === "string" ? u : u[typedLocale] || u || "",
              ) ?? [],
            buttonText: "Learn More",
            iconUrl: service.icon?.trim() || "/assets/Frame.svg",
          }))
      : [];

  return <BusinessSolutions services={services} locale={typedLocale} />;
}
