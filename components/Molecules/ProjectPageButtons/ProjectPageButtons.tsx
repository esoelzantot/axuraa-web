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
}

const ProjectPageButtons: React.FC<ProjectPageButtonsProps> = ({
  activeFilter,
  onFilterChange,
  className = "",
  filters = [],
}) => {
  if (!filters.length) return null;

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.buttonsWrapper}>
        {filters.map((filter) => (
          <ProjectButton
            key={filter}
            variant={activeFilter === filter ? "primary" : "outline"}
            onClick={() => onFilterChange(filter)}
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
