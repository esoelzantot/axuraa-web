"use client";

import React from "react";
import useDictionary from "@/hooks/useDictionary";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./ProjectCart.module.css";
import { ProjectCardProps } from "@/types/Generals/cardTypes";
import { useSpotlight } from "@/components/UI/Atoms/HomeServiceCard/HomeServiceCard";

const MAX_TAGS = 3;

/**
 * Project card — built on the same design as the Services page card:
 * dark surface with cursor glow, gradient border on hover, outlined index
 * number, a tile + label row (the tile holds the project's key result),
 * 2-line title, description, chips and an arrow CTA. The project image sits
 * in a frame at the top. The whole card links to the case study.
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
  index,
}) => {
  const { t } = useDictionary();
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();
  const tags = categories.length > 0 ? categories : category ? [category] : [];
  const shown = tags.slice(0, MAX_TAGS);
  const extra = tags.length - shown.length;
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;
  const href = `/${locale || "en"}/case-study/${id}`;
  const remote = imageUrl.startsWith("http") && !imageUrl.includes("res.cloudinary.com");

  return (
    <article ref={ref} className={styles.card} onPointerMove={onPointerMove}>
      <span className={styles.spotlight} aria-hidden="true" />

      <div className={styles.frame}>
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 380px"
          className={styles.image}
          unoptimized={remote}
        />
        <span className={styles.shade} aria-hidden="true" />
      </div>

      <div className={styles.body}>
        {number && (
          <span className={styles.index} aria-hidden="true">
            {number}
          </span>
        )}

        <div className={styles.top}>
          {percentage && <div className={styles.resultTile}>{percentage}</div>}
          <span className={styles.kind}>{t.common.caseStudy}</span>
        </div>

        <h3 className={styles.title} title={title}>
          {title}
        </h3>
        {description && (
          <p className={styles.description} title={description}>
            {description}
          </p>
        )}

        {shown.length > 0 && (
          <ul className={styles.tags} aria-label={t.common.categories}>
            {shown.map((tag) => (
              <li key={tag} className={styles.tag} title={tag}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.tagText}>{tag}</span>
              </li>
            ))}
            {extra > 0 && <li className={`${styles.tag} ${styles.more}`}>+{extra}</li>}
          </ul>
        )}

        <div className={styles.footer}>
          <Link href={href} className={styles.cta}>
            <span className={styles.ctaLabel}>{t.common.viewCaseStudy}</span>
            <span className={styles.ctaIcon} aria-hidden="true">
              <ArrowUpRight size={18} strokeWidth={2} />
            </span>
            <span className={styles.srOnly}>: {title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
