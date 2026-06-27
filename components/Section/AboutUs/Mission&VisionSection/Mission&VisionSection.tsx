import React from "react";
import MVCard from "@/components/UI/Muscles/Mission&VisionCards/M&VCard";
import styles from "./Mission&VisionSection.module.css";

const MissionVisionSection: React.FC = () => {
  const missionData = {
    title: "Our Mission",
    description:
      "To empower organizations with scalable, intelligent software solutions that drive efficiency and unlock new growth opportunities. We strive to demystify technology and make enterprise-grade innovation accessible to ambitious businesses.",
    iconSrc: "/assets/flag.svg",
  };

  const visionData = {
    title: "Our Vision",
    description:
      "To be the global benchmark for software engineering excellence, fostering a world where businesses of all sizes can seamlessly adapt to the digital evolution without technical barriers or complexity.",
    iconSrc: "/assets/eye.svg",
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          {/* Mission Card */}
          <MVCard
            title={missionData.title}
            description={missionData.description}
            iconProps={{
              iconSrc: missionData.iconSrc,
              backgroundColor: "rgba(208, 74, 29, 0.10)",
              background_Radius: "rounded",
              width: 34,
              height: 34,
              alt: "Mission icon",
              // noHover: false, // Enable hover effect
            }}
            className={styles.animatedCard}
          />

          {/* Vision Card */}
          <MVCard
            title={visionData.title}
            description={visionData.description}
            iconProps={{
              iconSrc: visionData.iconSrc,
              backgroundColor: "rgba(208, 74, 29, 0.10)",
              background_Radius: "rounded",
              width: 34,
              height: 34,
              alt: "Vision icon",
              // noHover: false, // Enable hover effect
              // animation: true, // Uncomment to enable pulse animation
            }}
            className={styles.animatedCard}
          />
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;