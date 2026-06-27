// components/Sections/HistoryJourney/HistoryJourney.tsx
import React from "react";
import styles from "./HistoryJourney.module.css";
import Typography from "@/components/UI/Atoms/Typography/Typography";
import StatusBadge from "@/components/UI/Atoms/StatusBadge/StatusBadge";
import Step from "@/components/UI/Atoms/Step/Step";
import {
  HistoryJourneyProps,
  HistoryJourneyData,
} from "@/types/AboutUsPage/History/JourneyTypes";

const HistoryJourney: React.FC<HistoryJourneyProps> = ({ data }) => {
  // Static data - will be replaced with API data in the future
  const defaultData: HistoryJourneyData = {
    title: "A Journey of Continuous Evolution",
    timeline: [
      {
        year: "2015",
        title: "The Beginning",
        description:
          "Founded by two engineers in a small garage in San Francisco with a vision to simplify enterprise software.",
      },
      {
        year: "2018",
        title: "Global Reach",
        description:
          "Expanded operations to Europe and closed our 50th major project. Team grew to 20 specialists.",
      },
      {
        year: "2021",
        title: "Innovation Leap",
        description:
          "Launched our proprietary cloud migration framework, helping clients reduce costs by an average of 40%.",
      },
      {
        year: "2024",
        title: "Industry Leaders",
        description:
          "Recognized as a top software solutions provider, serving Fortune 500 clients globally with a dedicated team of 45+ experts.",
      },
    ],
  };

  const journeyData = data || defaultData;

  return (
    <section className={styles.history_journey}>
      <div className={styles.container}>
        <div className={styles.header}>
          <StatusBadge text="OUR HISTORY" className={styles.badge} />

          <Typography
            variant="h2"
            component="h2"
            className={styles.title}
            gutterBottom
          >
            {journeyData.title}
          </Typography>
        </div>

        <div className={styles.timeline}>
          {journeyData.timeline.map((item, index) => (
            <Step
              key={`${item.year}-${index}`}
              year={item.year}
              title={item.title}
              description={item.description}
              isLast={index === journeyData.timeline.length - 1}
              isActive={index === 0}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(HistoryJourney);
