"use client";

import React, { useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import ServiceIcon from "@/components/UI/Atoms/ServiceIcon/ServiceIcon";
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconUrl?: string;
  buttonText?: string;
  locale?: string;
  /** 0-based position, shown as a large "01" watermark. */
  index?: number;
  /** Small label above the title. */
  variant?: "service" | "solution";
  onButtonClick?: () => void;
}

const MAX_FEATURES = 4;

/**
 * Service / solution card — dark surface with a cursor-following glow,
 * gradient border on hover, large index watermark, icon tile, feature
 * chips and a stretched link (the whole card is clickable).
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  features,
  iconUrl,
  buttonText = "Learn More",
  locale = "en",
  index,
  variant = "service",
  onButtonClick,
}) => {
  const ref = useRef<HTMLElement>(null);

  // Spotlight follows the pointer (desktop pointers only; CSS hides it on touch)
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const shown = features.slice(0, MAX_FEATURES);
  const extra = features.length - shown.length;
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;
  const href = `/${locale}/service/${id}`;

  const action = (
    <>
      <span className={styles.ctaLabel}>{buttonText}</span>
      <span className={styles.ctaIcon} aria-hidden="true">
        <ArrowUpRight size={18} strokeWidth={2} />
      </span>
    </>
  );

  return (
    <article ref={ref} className={styles.card} onPointerMove={onPointerMove}>
      <span className={styles.spotlight} aria-hidden="true" />
      {number && (
        <span className={styles.index} aria-hidden="true">
          {number}
        </span>
      )}

      <div className={styles.top}>
        <div className={styles.iconTile}>
          <ServiceIcon
            icon={iconUrl}
            title={title}
            sizes="56px"
            imageClassName={styles.iconImage}
            svgClassName={styles.iconSvg}
          />
        </div>
        <span className={styles.kind}>{variant === "solution" ? "Solution" : "Service"}</span>
      </div>

      <h3 className={styles.title} title={title}>
        {title}
      </h3>
      <p className={styles.description} title={description}>
        {description}
      </p>

      {shown.length > 0 && (
        <ul className={styles.features}>
          {shown.map((feature, i) => (
            <li key={i} className={styles.feature} title={feature}>
              <Check size={14} strokeWidth={2.5} className={styles.featureIcon} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
          {extra > 0 && <li className={`${styles.feature} ${styles.more}`}>+{extra} more</li>}
        </ul>
      )}

      <div className={styles.footer}>
        {onButtonClick ? (
          <button type="button" className={`${styles.cta} ${styles.stretched}`} onClick={onButtonClick}>
            {action}
          </button>
        ) : (
          <Link href={href} className={`${styles.cta} ${styles.stretched}`} aria-label={`${buttonText}: ${title}`}>
            {action}
          </Link>
        )}
      </div>
    </article>
  );
};

export default React.memo(ServiceCard);
