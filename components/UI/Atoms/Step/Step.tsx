// components/UI/Step/Step.tsx
import React from "react";
import styles from "./Step.module.css";
import { StepProps } from "@/types/AboutUsPage/History/JourneyTypes";

/** One milestone of the history timeline: glowing dot + gradient line, "year - title", text. */
const Step: React.FC<StepProps> = ({ year, title, description, isLast = false, isActive = false }) => (
  <div className={`${styles.step_container} ${isLast ? styles.last : ""} ${isActive ? styles.active : ""}`}>
    <div className={styles.step_indicator} aria-hidden="true">
      <span className={styles.dot} />
      {!isLast && <span className={styles.step_line} />}
    </div>

    <div className={styles.step_content}>
      <h3 className={styles.step_title}>
        <span className={styles.year}>{year}</span>
        <span className={styles.sep} aria-hidden="true" />
        {title}
      </h3>
      <p className={styles.step_description}>{description}</p>
    </div>
  </div>
);

export default React.memo(Step);
