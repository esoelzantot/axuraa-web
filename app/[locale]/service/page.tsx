// app/[locale]/services/page.tsx
import { getAllServices, ServiceItem } from "@/service/Services/services";
import ServicesPage from "@/components/pages/Services/ServicesPage";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function ServiceIndexPage({ params }: PageProps) {
    const { locale } = await params;
    const typedLocale = locale as "en" | "ar";

    const result = await getAllServices(typedLocale);
    const services = result.data?.filter(
        (s: ServiceItem) => s.type === "service" && s.is_active
    ) ?? [];

    return <ServicesPage services={services} locale={typedLocale} />;
}