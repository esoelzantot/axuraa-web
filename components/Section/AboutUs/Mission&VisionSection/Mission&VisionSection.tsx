import React from "react";
import MVCard from "@/components/UI/Muscles/Mission&VisionCards/M&VCard";
import styles from "./Mission&VisionSection.module.css";
import useDictionary from "@/hooks/useDictionary";

const MissionVisionSection: React.FC = () => {
  const { mission, vision } = useDictionary().t.about;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.cardsGrid} data-reveal-stagger>
          <MVCard variant="mission" kind={mission.kind} title={mission.title} description={mission.description} />
          <MVCard variant="vision" kind={vision.kind} title={vision.title} description={vision.description} />
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
