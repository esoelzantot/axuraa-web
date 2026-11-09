"use client";

import React, { useState } from "react";
import { Quote, Star } from "lucide-react";
import styles from "./DevolpercCard.module.css";
import { DevolperCardProps } from "@/types/Generals/cardTypes";

const FALLBACK_AVATAR = "/assets/ProfileCard.svg";

/**
 * Client testimonial card (home "What Our Clients Say").
 * Keeps the signature leaf shape (two rounded corners) and gradient border;
 * the square corner carries the quote badge.
 */
const DevolperCard: React.FC<DevolperCardProps> = ({
  testimonial = "",
  authorName = "",
  authorRole = "",
  avatarSrc = FALLBACK_AVATAR,
  rating,
}) => {
  const [imageError, setImageError] = useState(false);
  const src = !imageError && avatarSrc ? avatarSrc : FALLBACK_AVATAR;
  const stars = rating ? Math.max(0, Math.min(5, Math.round(rating))) : 0;

  return (
    <article className={styles.card}>
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        &rdquo;
      </span>
      <span className={styles.quoteBadge} aria-hidden="true">
        <Quote size={18} strokeWidth={2.5} />
      </span>

      {stars > 0 && (
        <div className={styles.stars} role="img" aria-label={`Rated ${stars} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={14} className={i < stars ? styles.starOn : styles.starOff} aria-hidden="true" />
          ))}
        </div>
      )}

      <blockquote className={styles.text}>{testimonial}</blockquote>

      <footer className={styles.author}>
        <span className={styles.avatarRing}>
          {/* eslint-disable-next-line @next/next/no-img-element -- avatar URLs come from the CMS (any host) and need onError fallback */}
          <img
            src={src}
            alt=""
            width={44}
            height={44}
            className={styles.avatar}
            onError={() => setImageError(true)}
          />
        </span>
        <span className={styles.authorInfo}>
          <span className={styles.name}>{authorName}</span>
          {authorRole && <span className={styles.role}>{authorRole}</span>}
        </span>
      </footer>
    </article>
  );
};

export default React.memo(DevolperCard);
