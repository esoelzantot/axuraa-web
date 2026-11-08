import React from "react";
import styles from "./ProjectSection.module.css";
import Badge from "@/components/UI/Atoms/Badge/Badge";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import ProjectCard from "@/components/UI/Muscles/ProjectCard/ProjectCard";
import SeeAll from "@/components/UI/Atoms/SeeAll/SeeAll";
import { ProjectSectionProps } from "@/types/HomePage/projectsTypes";
import { transformProjects } from "@/lib/transformProjectsFormServices";

const ProjectSection: React.FC<ProjectSectionProps> = ({
  badgeText,
  title1,
  title2,
  subtitle,
  projects,
  services,
  locale,
  seeAllText = "See All case studies",
}) => {
  // The API already returns strings for `?lang=`; `transformProjects` localizes
  // any field that still comes back as `{ en, ar }`.
  const items = transformProjects(projects.slice(0, 3), services, locale);

  return (
    <section className={styles.ProjectSection}>
      <Badge text={badgeText} show={true} />
      <SectionHeader
        title1={title1}
        title2={title2}
        subtitle={subtitle}
        titleLayout="column"
      />
      <SeeAll href={`/${locale}/portfolio`}>{seeAllText}</SeeAll>
      <div className={styles.ProjectGrid}>
        {items.map((project, index) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            category={project.category}
            categories={project.categories}
            percentage={project.percentage}
            description={project.description}
            imageUrl={project.imageUrl}
            index={index}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
