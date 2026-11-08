import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/service/projectId/projectId";
import CaseStudyPage from "@/components/pages/CaseStudyPage/CaseStudyPage";
import { Locale, localize } from "@/lib/i18n";

/** Shared by /[locale]/case-study/[projectId] and /[locale]/portfolio/[projectId]. */
export type CaseStudyParams = Promise<{ projectId: string; locale: string }>;

const loadProject = cache((id: string, locale: Locale) => getProjectById(id, locale));

export async function caseStudyMetadata({ params }: { params: CaseStudyParams }): Promise<Metadata> {
  const { projectId, locale } = await params;
  const { data } = await loadProject(projectId, locale as Locale);
  if (!data) return {};
  return {
    title: localize(data.title, locale as Locale),
    description: localize(data.overview, locale as Locale).slice(0, 160) || undefined,
  };
}

export async function CaseStudyRoute({ params }: { params: CaseStudyParams }) {
  const { projectId, locale } = await params;
  const result = await loadProject(projectId, locale as Locale);
  if (!result.success || !result.data) notFound();
  return <CaseStudyPage project={result.data} locale={locale as Locale} />;
}
