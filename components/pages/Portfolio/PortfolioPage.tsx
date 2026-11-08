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
import { Locale, localize } from "@/lib/i18n";

interface Props {
  projects: ProjectItem[];
  services: ServiceItem[];
  locale: Locale;
}

const PortfolioPage = ({ projects, services, locale }: Props) => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Build filter list from services
  const filters = useMemo(() => {
    const titles = services
      .map((s) => localize(s.subtitle, locale) || localize(s.title, locale))
      .filter((t) => t.trim() !== "");
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
        height="70vh"
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
