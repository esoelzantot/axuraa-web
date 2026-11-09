import React from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./SocialMediaCard.module.css";
import { SocialMediaCardProps } from "@/types/Generals/cardTypes";

// CMS names are lowercase ("linkedin"); show the brands' own spelling.
const DISPLAY_NAMES: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  twitter: "X (Twitter)",
  x: "X",
  youtube: "YouTube",
  github: "GitHub",
};

/** Social platform card (Contact page): icon tile, platform name, follow CTA. */
const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ Icon, label, link }) => {
  const name = DISPLAY_NAMES[label.toLowerCase()] ?? label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <a
      className={styles.card}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} (opens in a new tab)`}
    >
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.tile} aria-hidden="true">
        {typeof Icon === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element -- small icon from the CMS
          <img src={Icon} alt="" width={26} height={26} />
        ) : (
          <Icon width={26} height={26} />
        )}
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{name}</span>
        <span className={styles.hint}>Follow us</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <ArrowUpRight size={16} />
      </span>
    </a>
  );
};

export default SocialMediaCard;
