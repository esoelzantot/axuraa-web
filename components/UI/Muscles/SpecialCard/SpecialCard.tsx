import React from "react";
import Typography from "@/components/UI/Atoms/Typography/Typography";
import styles from "./SpecialCard.module.css";
import Image from "next/image";

import { SpecialCardProps } from "@/types/Generals/cardTypes";

const SpecialCard: React.FC<SpecialCardProps> = ({
  title = "Ready to Innovate?",
  subtitle = "Join the list of forward-thinking companies that trust Axuraa to deliver excellence.",
  primaryButtonText = "Contact Us",
  secondaryButtonText = "View Case Studies",
  onPrimaryClick,
  onSecondaryClick,
  className = "",
}) => {
  return (
    <div className={`${styles.specialCard} ${className}`}>
      {/* Animated blur circles background */}
      <div className={styles.blurContainer}>
        <Image
          src="/assets/Blur-circle.svg"
          alt=""
          className={`${styles.blurCircle} ${styles.blurCircle1}`}
          width={80}
          height={80}
        />
        <Image
          src="/assets/Blur-circle-2.svg"
          alt=""
          className={`${styles.blurCircle} ${styles.blurCircle2}`}
          width={100}
          height={100}
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <Typography
          variant="h2"
          component="h2"
          className={styles.title}
          align="center"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          className={styles.subtitle}
          align="center"
          gutterBottom
        >
          {subtitle}
        </Typography>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={() => (window.location.href = "/en/contact")}
          >
            {primaryButtonText}
          </button>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => (window.location.href = "/en/portfolio")}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialCard;
