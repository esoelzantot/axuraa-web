"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useDictionary from "@/hooks/useDictionary";
import Typography from "@/components/UI/Atoms/Typography/Typography";
import styles from "./SpecialCard.module.css";
import Image from "next/image";

import { SpecialCardProps } from "@/types/Generals/cardTypes";

const SpecialCard: React.FC<SpecialCardProps> = ({
  title: titleProp,
  subtitle: subtitleProp,
  primaryButtonText: primaryProp,
  secondaryButtonText: secondaryProp,
  onPrimaryClick,
  onSecondaryClick,
  className = "",
}) => {
  const router = useRouter();
  const { t, locale } = useDictionary();
  const title = titleProp ?? t.about.cta.title;
  const subtitle = subtitleProp ?? t.about.cta.subtitle;
  const primaryButtonText = primaryProp ?? t.about.cta.primary;
  const secondaryButtonText = secondaryProp ?? t.about.cta.secondary;

  return (
    <div className={`${styles.specialCard} ${className}`} data-reveal="zoom">
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
            type="button"
            onClick={onPrimaryClick ?? (() => router.push(`/${locale}/contact#contact-form`))}
          >
            {primaryButtonText}
          </button>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            type="button"
            onClick={onSecondaryClick ?? (() => router.push(`/${locale}/portfolio`))}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialCard;
