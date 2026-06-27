// components/Sections/HistorySection/HistorySection.tsx
import React from "react";
import styles from "./HistorySection.module.css";
import HistoryJourney from "@/components/UI/Muscles/HistoryJourney/HistoryJourney";
import HistoryCard from "@/components/UI/Muscles/HistoryCard/HistoryCard";
import { HistorySectionProps } from "@/types/AboutUsPage/History/JourneyTypes";

const HistorySection: React.FC<HistorySectionProps> = ({
  journeyData,
  cardData,
  className = "",
}) => {
  return (
    <section className={`${styles.history_section} ${className}`}>
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          {/* Left Side - Timeline using HistoryJourney component */}
          <div className={styles.timeline_container}>
            <HistoryJourney data={journeyData} />
          </div>

          {/* Right Side - Card using HistoryCard component */}
          <div className={styles.card_container}>
            <HistoryCard
              title={cardData?.title}
              subtitle={cardData?.subtitle}
              icon={cardData?.icon}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HistorySection);