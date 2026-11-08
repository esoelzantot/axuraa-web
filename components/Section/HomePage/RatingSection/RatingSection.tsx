import React from "react";
import styles from "./RatingSection.module.css";
import Badge from "@/components/UI/Atoms/Badge/Badge";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import Rating from "@/components/UI/Atoms/RatingComponents/Rating";
import { RatingSectionProps } from "@/types/HomePage/ratingTypes";

/** Track-record counters. Data is fetched on the server and passed in. */
const RatingSection: React.FC<RatingSectionProps> = ({
  badgeText,
  title1,
  title2,
  subtitle,
  ratingItems = [],
}) => (
  <section id="rating-section" className={styles.RatingSection}>
    <Badge text={badgeText} show={true} />
    <SectionHeader title1={title1} title2={title2} subtitle={subtitle} titleLayout="column" />
    {ratingItems.length > 0 && <Rating items={ratingItems} duration={1500} maxValue={100} />}
  </section>
);

export default RatingSection;
