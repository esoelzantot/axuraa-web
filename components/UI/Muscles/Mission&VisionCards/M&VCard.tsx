import React from "react";
import { Eye, Target } from "lucide-react";
import { MVCardProps } from "@/types/AboutUsPage/Mission&Vision/mvCardTypes";
import styles from "./M&VCard.module.css";

/**
 * Mission / Vision card: icon tile, title, statement.
 * Decorated with concentric glow rings and an accent bar.
 */
const MVCard: React.FC<MVCardProps> = ({ title, description, className = "" }) => {
  const isVision = /vision/i.test(title);
  const Icon = isVision ? Eye : Target;

  return (
    <article className={`${styles.card} ${className}`}>
      <span className={styles.rings} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>

      <div className={styles.top}>
        <span className={styles.iconTile} aria-hidden="true">
          <Icon size={26} strokeWidth={1.75} />
        </span>
        <span className={styles.kind}>{isVision ? "Where we're going" : "Why we exist"}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
};

export default MVCard;
