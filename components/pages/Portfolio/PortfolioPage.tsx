// components/pages/Portfolio/PortfolioPage.tsx
"use client";

import React, { useMemo, useState } from "react";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import ProjectsGrid from "@/components/Section/PortfolioPage/ProjectsGrid.tsx/ProjectsGrid";
import styles from "./PortfolioPage.module.css";
import ProjectPageButtons from "@/components/Molecules/ProjectPageButtons/ProjectPageButtons";
import { ProjectItem } from "@/service/Projects/projects";
import { ServiceItem } from "@/service/Services/services";
import { transformProjects } from "@/lib/transformProjectsFormServices";

interface Props {
  projects: ProjectItem[];
  services: ServiceItem[];
  locale: "en" | "ar";
}

const PortfolioPage = ({ projects, services, locale }: Props) => {
  const [activeFilter, setActiveFilter] = useState("All");

  // console.log("PortfolioPage received projects:", projects);
  // console.log("PortfolioPage received services:", services);

  // Build filter list from services
  const filters = useMemo(() => {
    const titles = services
      .map((s) =>
        typeof s.subtitle === "string"
          ? s.subtitle
          : (s.subtitle as any)[locale] || (s.subtitle as any).en,
      )
      .filter((t): t is string => typeof t === "string" && t.trim() !== "");
    return ["All", ...Array.from(new Set(titles))];
  }, [services, locale]);

  const allProjects = useMemo(
    () => transformProjects(projects, services, locale),
    [projects, services, locale],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return allProjects;
    return allProjects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter, allProjects]);

  return (
    <div className={styles.portfolioPage}>
      <HeroSection
        primaryHref={`/${locale}/contact#contact-form`}
        title1="Architecting the Future of"
        title2="Digital Business."
        subtitle1="At Axuraa, we don't just write code. We build the digital infrastructure that powers the world's most ambitious companies."
        badgeText="INNOVATION IN PROGRESS"
        showBackgroundDots={false}
        showAnimatedCircles={true}
        showBadge={false}
        showTrustedSection={false}
        showPrimaryButton={true}
        showSecondaryButton={false}
        showEllipseDecorations={true}
        showStatusBadge={true}
        backgroundType="Circle"
        height="75vh"
      />

      <div className={styles.projectsSection}>
        <ProjectPageButtons
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filters={filters}
        />
        <div className={styles.container}>
          {filteredProjects.length === 0 ? (
            <div className={styles.sectionError}>No projects found.</div>
          ) : (
            <ProjectsGrid projects={filteredProjects} locale={locale} />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PortfolioPage);
