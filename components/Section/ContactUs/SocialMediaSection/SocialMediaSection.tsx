import React from "react";
import SectionHead from "@/components/Layout/SectionHead/SectionHead";
import styles from "./SocialMediaSection.module.css";
import SocialMediaCard from "@/components/UI/Muscles/SocilaCard/SocialMediaCard";
import { SocialMediaPlatform } from "@/types/Generals/socialTypes";

interface SocialMediaSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  platforms?: SocialMediaPlatform[];
  className?: string;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  eyebrow = "Social Media",
  title = "Follow Us on Social Media",
  subtitle = "Stay up to date with our latest news and projects.",
  platforms = [],
  className = "",
}) => {
  if (platforms.length === 0) return null;

  return (
    <section className={`${styles.section} ${className}`} aria-labelledby="contact-social">
      <div className={styles.container}>
        <SectionHead id="contact-social" eyebrow={eyebrow} title={title} intro={subtitle} />

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
