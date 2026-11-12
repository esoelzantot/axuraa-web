// components/Sections/HistoryJourney/HistoryJourney.tsx
import React from "react";
import styles from "./HistoryJourney.module.css";
import Typography from "@/components/UI/Atoms/Typography/Typography";
import StatusBadge from "@/components/UI/Atoms/StatusBadge/StatusBadge";
import { cmsText, getDictionary } from "@/lib/dictionaries";
import Step from "@/components/UI/Atoms/Step/Step";
import {
  HistoryJourneyProps,
  HistoryJourneyData,
} from "@/types/AboutUsPage/History/JourneyTypes";

const HistoryJourney: React.FC<HistoryJourneyProps> = ({ data, locale }) => {
  const h = getDictionary(locale).about.history;
  // CMS history (English-only today; known strings are translated) or the static fallback.
  const journeyData: HistoryJourneyData = data
    ? {
        title: cmsText(data.title, locale),
        timeline: data.timeline.map((item) => ({
          ...item,
          title: cmsText(item.title, locale),
          description: cmsText(item.description, locale),
        })),
      }
    : { title: h.fallbackTitle, timeline: h.fallbackTimeline };


  return (
    <section className={styles.history_journey}>
      <div className={styles.container}>
        <div className={styles.header} data-reveal="up">
          <StatusBadge text={h.badge} className={styles.badge} />

          <Typography
            variant="h2"
            component="h2"
            className={styles.title}
            gutterBottom
          >
            {journeyData.title}
          </Typography>
        </div>

        <div className={styles.timeline} data-reveal-stagger="left">
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
