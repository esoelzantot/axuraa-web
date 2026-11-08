import type { Metadata } from "next";
import { getAllProjects } from "@/service/Projects/projects";
import { getAllServices } from "@/service/Services/services";
import PortfolioPage from "@/components/pages/Portfolio/PortfolioPage";
import { Locale } from "@/lib/i18n";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Case studies and projects delivered by Axuraa.",
};

export default async function Portfolio({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const [projects, services] = await Promise.all([getAllProjects(locale), getAllServices(locale)]);
  return (
    <PortfolioPage projects={projects.data ?? []} services={services.data ?? []} locale={locale} />
  );
}
