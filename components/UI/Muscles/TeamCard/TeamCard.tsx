"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./TeamCard.module.css";
import { TeamCardProps } from "@/types/AboutUsPage/Team/TeamCard";

const FALLBACK_IMAGE = "/assets/bavly.jpg";

/** Portrait team card: photo with the name and role always visible (works on touch too). */
const TeamCard: React.FC<TeamCardProps> = ({ name, role, imageUrl }) => {
  const [imageError, setImageError] = useState(false);
  const src = !imageError && imageUrl?.trim() ? imageUrl.trim() : FALLBACK_IMAGE;
  // Cloudinary is whitelisted in next.config; any other remote host is served as-is.
  const unoptimized = src.startsWith("http") && !src.includes("res.cloudinary.com");

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 480px) 45vw, 208px"
          className={styles.image}
          onError={() => setImageError(true)}
          unoptimized={unoptimized}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        {role && <p className={styles.role}>{role}</p>}
      </div>
    </article>
  );
};

export default TeamCard;
