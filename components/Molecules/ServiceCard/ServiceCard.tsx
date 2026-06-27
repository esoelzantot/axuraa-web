// components/Molecules/ServiceCard/ServiceCard.tsx
import React from "react";
import styles from "./ServiceCard.module.css";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconUrl?: string;
  buttonText?: string;
  locale?: string;
  onButtonClick?: () => void;
}

const FALLBACK_ICON = "/assets/safeicon.svg";

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  features,
  iconUrl,
  buttonText = "Learn More",
  locale = "en",
  onButtonClick,
}) => {
  const safeIcon = (() => {
    if (!iconUrl || iconUrl.trim() === "") return FALLBACK_ICON;
    if (iconUrl.startsWith("/")) return iconUrl;
    try {
      new URL(iconUrl);
      return iconUrl;
    } catch {
      return FALLBACK_ICON;
    }
  })();
  return (
    <div className={styles.serviceCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <Image
            src={safeIcon}
            alt={title}
            width={28}
            height={28}
            className={styles.safeIcon}
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <p className={styles.description}>{description}</p>

      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <Image
              src="/assets/trueicon.svg"
              alt="check"
              width={16}
              height={16}
              className={styles.checkIcon}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {onButtonClick ? (
        <button className={styles.learnMoreButton} onClick={onButtonClick}>
          {buttonText}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <Link
          href={`/${locale}/service/${id}`}
          className={styles.learnMoreButton}
        >
          {buttonText}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default React.memo(ServiceCard);
