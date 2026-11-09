"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./TeamCard.module.css";
import { TeamCardProps } from "@/types/AboutUsPage/Team/TeamCard";

const FALLBACK_IMAGE = "/assets/bavly.jpg";

/**
 * Team member card: framed portrait on a glowing backdrop, numbered tag,
 * name + role below. Everything is visible without hover (touch-friendly).
 */
const TeamCard: React.FC<TeamCardProps> = ({ name, role, imageUrl, index }) => {
  const [imageError, setImageError] = useState(false);
  const src = !imageError && imageUrl?.trim() ? imageUrl.trim() : FALLBACK_IMAGE;
  // Cloudinary is whitelisted in next.config; any other remote host is served as-is.
  const unoptimized = src.startsWith("http") && !src.includes("res.cloudinary.com");

  return (
    <article className={styles.card}>
      <div className={styles.frame}>
        <span className={styles.backdrop} aria-hidden="true" />
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 480px) 45vw, 224px"
          className={styles.image}
          onError={() => setImageError(true)}
          unoptimized={unoptimized}
        />
        <span className={styles.shade} aria-hidden="true" />
        {typeof index === "number" && (
          <span className={styles.tag} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        {role && (
          <p className={styles.role}>
            <span className={styles.roleDot} aria-hidden="true" />
            {role}
          </p>
        )}
      </div>
    </article>
  );
};

export default TeamCard;
