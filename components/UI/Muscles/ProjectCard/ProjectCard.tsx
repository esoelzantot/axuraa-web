// components/UI/ProjectCard/ProjectCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import styles from "./ProjectCart.module.css";
import Link from "next/link";

import { ProjectCardProps } from "@/types/Generals/cardTypes";

// ProjectCard.tsx// ProjectCard.tsx
const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  categories = [],  // ← add this prop
  percentage,
  description,
  imageUrl,
  locale = "en",
}) => {
  const displayCategories = categories.length > 0 ? categories : [category];
  console.log("ProjectCard categories:", categories);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={title}
          width={356}
          height={208}
          className={styles.projectImage}
          priority
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {/* Replace single badge with mapped badges */}
        <div className={styles.badgesRow}>
          {displayCategories.map((cat) => (
            <span key={cat} className={styles.badge}>{cat}</span>
          ))}
        </div>

        <div className={styles.statsRow}>
          <div className={styles.percentage}>{percentage}</div>
          <p className={styles.description}>{description}</p>
        </div>

        <Link
          href={`/${locale || "en"}/case-study/${id}`}
          className={styles.readMore}
        >
          Read More
          <FiArrowRight className={styles.arrowIcon} />
        </Link>
      </div>
    </div>
  );
};
export default ProjectCard;