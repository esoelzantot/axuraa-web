"use client";

import React from "react";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import styles from "./SocialMediaSection.module.css";
import SocialMediaCard from "@/components/UI/Muscles/SocilaCard/SocialMediaCard";
import { SocialMediaPlatform } from "@/types/Generals/socialTypes";

interface SocialMediaSectionProps {
  title1?: string;
  title2?: string;
  subtitle?: string;
  platforms?: SocialMediaPlatform[];
  className?: string;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  title1 = "Follow us on",
  title2 = "social media",
  subtitle = "Stay up to date with our latest news and projects",
  platforms = [],
  className = "",
}) => {
  return (
    <section className={`${styles.section} ${className}`}>
      {/* Gradient used by every SocialMediaCard icon (defined once to keep ids unique). */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="socialIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D04A1D" />
            <stop offset="100%" stopColor="#902501" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionHeader
            title1={title1}
            title2={title2}
            subtitle={subtitle}
            titleColor="#FFFFFF"
            textAlign="center"
          />
        </div>

        <div className={styles.cardsGrid}>
          {platforms.map((platform) => (
            <SocialMediaCard
              key={platform.name}
              Icon={platform.icon}
              label={platform.name}
              link={platform.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
