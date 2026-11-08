"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import styles from "./ProjectCart.module.css";
import { ProjectCardProps } from "@/types/Generals/cardTypes";

/**
 * Project card used on the home page and the portfolio grid.
 * Layout: 16:9 image -> title (2 lines max) -> category tags (2 rows max)
 * -> key result -> "Read More" pinned to the bottom of the card.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  categories = [],
  percentage,
  description,
  imageUrl,
  locale = "en",
}) => {
  const tags = categories.length > 0 ? categories : [category];
  const href = `/${locale || "en"}/case-study/${id}`;
  const remote = imageUrl.startsWith("http") && !imageUrl.includes("res.cloudinary.com");

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.imageContainer} tabIndex={-1} aria-hidden="true">
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 380px"
          className={styles.projectImage}
          unoptimized={remote}
        />
      </Link>

      <div className={styles.content}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>

        <ul className={styles.badgesRow} aria-label="Categories">
          {tags.map((tag) => (
            <li key={tag} className={styles.badge} title={tag}>
              {tag}
            </li>
          ))}
        </ul>

        <div className={styles.statsRow}>
          <span className={styles.percentage}>{percentage}</span>
          <p className={styles.description} title={description}>
            {description}
          </p>
        </div>

        <Link href={href} className={styles.readMore}>
          Read More
          <FiArrowRight className={styles.arrowIcon} aria-hidden="true" />
          <span className={styles.srOnly}> about {title}</span>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
