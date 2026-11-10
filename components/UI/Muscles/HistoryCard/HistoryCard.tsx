// components/UI/HistoryCard/HistoryCard.tsx
import React from "react";
import { PenLine } from "lucide-react";
import styles from "./HistoryCard.module.css";
import { HistoryCardProps } from "@/types/AboutUsPage/History/JourneyTypes";

/** "Writing History" card: centered icon (with orbit rings), title and tagline. */
const HistoryCard: React.FC<HistoryCardProps> = ({
  title = "Writing History",
  subtitle = "One line of code at a time.",
  className = "",
  onClick,
}) => {
  const words = title.trim().split(/\s+/);
  const last = words.pop();

  return (
    <div className={`${styles.history_card} ${className}`} onClick={onClick}>
      <span className={styles.texture} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.iconWrap} aria-hidden="true">
          <span className={styles.orbit} />
          <span className={`${styles.orbit} ${styles.orbitOuter}`} />
          <span className={styles.icon_container}>
            <PenLine size={26} strokeWidth={1.9} />
          </span>
        </span>
        <h3 className={styles.title}>
          {words.length > 0 && <>{words.join(" ")} </>}
          <span className={styles.accent}>{last}</span>
        </h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default React.memo(HistoryCard);
