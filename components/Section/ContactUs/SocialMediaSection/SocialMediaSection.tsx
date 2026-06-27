"use client";

import React from "react";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import styles from "./SocialMediaSection.module.css";
import SocialMediaCard from "@/components/UI/Muscles/SocilaCard/SocialMediaCard";

interface SocialMediaSectionProps {
  title1?: string;
  title2?: string;
  subtitle?: string;
  platforms?: any[];
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
