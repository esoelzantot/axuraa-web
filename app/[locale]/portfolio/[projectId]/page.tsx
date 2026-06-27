// app/[locale]/case-study/[projectId]/page.tsx
import { getProjectById } from '@/service/projectId/projectId';  // ← add this
import CaseStudyPage from '@/components/pages/CaseStudyPage/CaseStudyPage';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ projectId: string; locale: string }>;
}

export default async function CaseStudyPageWrapper({ params }: PageProps) {
    const { projectId, locale } = await params;

    // console.log('Page params:', { projectId, locale });

    const typedLocale = locale as 'en' | 'ar';
    const result = await getProjectById(projectId, typedLocale);

    console.log('Project API result:', result.data);

    // console.log('Project title:', result.data?.title);

    if (!result.success || !result.data) notFound();

    return <CaseStudyPage project={result.data} locale={typedLocale} />;
}