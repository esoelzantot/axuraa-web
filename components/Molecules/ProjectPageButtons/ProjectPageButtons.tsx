// components/Molecules/ProjectPageButtons/ProjectPageButtons.tsx
"use client";
import React from "react";
import ProjectButton from "@/components/UI/Atoms/ProjectButton/ProjectButton";
import styles from "./ProjectPageButtons.module.css";

interface ProjectPageButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
  filters: string[];
  /** Accessible name of the filter group. */
  label?: string;
}

const ProjectPageButtons: React.FC<ProjectPageButtonsProps> = ({
  activeFilter,
  onFilterChange,
  className = "",
  filters = [],
  label = "Filter projects",
}) => {
  if (!filters.length) return null;

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.buttonsWrapper} role="group" aria-label={label}>
        {filters.map((filter) => (
          <ProjectButton
            key={filter}
            variant={activeFilter === filter ? "primary" : "outline"}
            onClick={() => onFilterChange(filter)}
            title={filter}
            pressed={activeFilter === filter}
            className={`${styles.filterButton} ${
              activeFilter === filter ? styles.active : ""
            }`}
          >
            {filter}
          </ProjectButton>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProjectPageButtons);
