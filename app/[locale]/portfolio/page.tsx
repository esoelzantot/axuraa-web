// app/[locale]/portfolio/page.tsx
import { getAllProjects } from "@/service/Projects/projects";
import { getAllServices } from "@/service/Services/services";
import PortfolioPage from "@/components/pages/Portfolio/PortfolioPage";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Portfolio({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale = locale as "en" | "ar";

  const [projectsResult, servicesResult] = await Promise.all([
    getAllProjects(typedLocale),
    getAllServices(typedLocale),
  ]);

  console.log("Projects Result:", projectsResult);
  console.log("Services Result:", servicesResult);

  return (
    <PortfolioPage
      projects={projectsResult.data ?? []}
      services={servicesResult.data ?? []}
      locale={typedLocale}
    />
  );
}
