'use client';
import React, { useEffect, useState } from 'react';
import styles from './ProjectSection.module.css';
import Badge from '@/components/UI/Atoms/Badge/Badge';
import SectionHeader from '@/components/Layout/SectionHeader/SectionHeader';
import ProjectCard from '@/components/UI/Muscles/ProjectCard/ProjectCard';
import SeeAll from '@/components/UI/Atoms/SeeAll/SeeAll';

import { ProjectSectionProps } from '@/types/HomePage/projectsTypes';
import { getAllProjects } from '@/service/Projects/projects';
import useClientTranslation from '@/hooks/useClientTranslation';

const ProjectSection: React.FC<ProjectSectionProps> = ({
  badgeText,
  title1,
  title2,
  subtitle,
  projects = [],
  seeAllText = "See All case studies"
}) => {
  const { locale } = useClientTranslation('projects');
 const [apiProjects, setApiProjects] = useState<{
  id: string;
  title: string;
  category: string;
  categories: string[];
  percentage: string;
  description: string;
  imageUrl: string;
}[]>([]);
  const [loading, setLoading] = useState(false);

  

  const portfolioHref = `/${locale}/portfolio`;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const result = await getAllProjects(locale as 'en' | 'ar');

        if (result.success && result.data) {
          const transformedProjects = result.data.slice(0, 3).map(project => {
            // collect all service titles as categories
            const categories = (project.services || [])
              .map(s => s?.services_id?.title?.en || '')
              .filter((c, i, arr) => c && arr.indexOf(c) === i); // dedupe & remove empty

            return {
              id:          project._id,
              title:       project.title?.en || 'Untitled Project',
              category:    categories[0] || project.technology_stack?.[0] || 'General',
              categories:  categories.length > 0 ? categories : [project.technology_stack?.[0] || 'General'],
              percentage:  project.case_study_results?.[0]?.value || '+50%',
              description: project.case_study_results?.[0]?.description || 'Project description',
              imageUrl:    project.main_image_url || '/assets/ProjectImage.png',
            };
          });

          setApiProjects(transformedProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [locale]);

  return (
    <section className={styles.ProjectSection}>
      <Badge text={badgeText} show={true} />
      <SectionHeader
        title1={title1}
        title2={title2}
        subtitle={subtitle}
        titleLayout="column"
      />
      <SeeAll href={portfolioHref}>
        {seeAllText}
      </SeeAll>
      <div className={styles.ProjectGrid}>
        {apiProjects?.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            category={project.category}
            categories={project.categories}  // ← add
            percentage={project.percentage}
            description={project.description}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(ProjectSection);