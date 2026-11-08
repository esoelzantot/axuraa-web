"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./SeeAllCard.module.css";
import type { CardCorner } from "./HomeServiceCard";

interface SeeAllCardProps {
  title: string;
  description: string;
  href: string;
  corner?: CardCorner;
}

/** Branded call-to-action card that closes a home cards grid ("See all …"). */
const SeeAllCard: React.FC<SeeAllCardProps> = ({ title, description, href, corner = "bottom-right" }) => (
  <Link
    href={href}
    className={`${styles.card} ${corner === "top-right" ? styles.cornerTop : styles.cornerBottom}`}
  >
    <span className={styles.pattern} aria-hidden="true" />
    <span className={styles.arrow} aria-hidden="true">
      <ArrowRight size={26} strokeWidth={2} />
    </span>
    <span className={styles.text}>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </span>
  </Link>
);

export default SeeAllCard;
