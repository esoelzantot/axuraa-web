// components/Section/AboutUs/MainSection/MainSection.tsx
import React from "react";
import styles from "./MainSection.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import Rating from "@/components/UI/Atoms/RatingComponents/Rating";
import { RatingItem } from "@/types/HomePage/ratingTypes";
import { TrackRecordData } from "@/service/TrackRecord/trackrecord";
import { Locale } from "@/lib/i18n";
import { cmsText, getDictionary } from "@/lib/dictionaries";

// Fallback counters (used when the CMS returns nothing); labels come from the dictionary.
const STATIC_STATS: Omit<RatingItem, "label">[] = [
  { id: 1, value: 8, icon: "/assets/RatingIcon.svg", suffix: "+" },
  { id: 2, value: 150, icon: "/assets/RatingIcon.svg", suffix: "+" },
  { id: 3, value: 45, icon: "/assets/RatingIcon.svg", suffix: "" },
  { id: 4, value: 98, icon: "/assets/RatingIcon.svg", suffix: "%" },
];

interface Props {
  trackRecord: TrackRecordData | null; // ← receives data, never fetches
  locale: Locale;
}

const MainSection = ({ trackRecord, locale }: Props) => {
  const t = getDictionary(locale);
  const ratingItems: RatingItem[] =
    trackRecord?.records?.map((record) => ({
      id: record.id,
      value: record.value,
      label: cmsText(record.label, locale),
      icon: record.icon || "/assets/RatingIcon.svg",
      suffix: record.suffix || "",
    })) ?? STATIC_STATS.map((item, i) => ({ ...item, label: t.about.stats[i] })); // ← fallback if null

  return (
    <div className={styles.mainSection}>
      <div className={styles.heroWrapper}>
        <HeroSection
          badgeText={t.hero.whoWeAre}
          title1={t.about.hero.title1}
          title2={t.about.hero.title2}
          subtitle1={t.about.hero.subtitle}
          backgroundType="Alphabet"
          showTrustedSection={false}
          showPrimaryButton={false}
          showSecondaryButton={false}
          showBadge={false}
          height="70vh"
        />
      </div>
      <div className={styles.ratingWrapper}>
        <Rating items={ratingItems} duration={2000} maxValue={150} />
      </div>
    </div>
  );
};

export default React.memo(MainSection);
