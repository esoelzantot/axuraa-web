"use client";

import React, { useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "@/components/UI/Atoms/ServiceIcon/ServiceIcon";
import styles from "./HomeServiceCard.module.css";

export type CardCorner = "bottom-right" | "top-right";

interface HomeServiceCardProps {
  title: string;
  description: string;
  /** Image URL/path or CMS icon name. */
  icon?: string;
  /** 0-based position, shown as "01". */
  index?: number;
  /** Which corner carries the signature large radius. */
  corner?: CardCorner;
  /** Show the "Explore" hint (when the card is wrapped in a link). */
  interactive?: boolean;
}

/** Tracks the pointer so the spotlight follows it (mouse only). */
export const useSpotlight = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
  return { ref, onPointerMove };
};

/**
 * Home-page service/solution card. Same idea as the original card (icon,
 * title, description and one large rounded corner), restyled: glowing
 * signature corner, gradient border, cursor spotlight, orbiting icon ring,
 * index number and an "Explore" hint.
 */
const HomeServiceCard: React.FC<HomeServiceCardProps> = ({
  title,
  description,
  icon,
  index,
  corner = "bottom-right",
  interactive = true,
}) => {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <article
      ref={ref}
      className={`${styles.card} ${corner === "top-right" ? styles.cornerTop : styles.cornerBottom}`}
      onPointerMove={onPointerMove}
    >
      <span className={styles.spotlight} aria-hidden="true" />
      <span className={styles.cornerGlow} aria-hidden="true" />
      {number && (
        <span className={styles.index} aria-hidden="true">
          {number}
        </span>
      )}

      <div className={styles.iconWrap}>
        <span className={styles.orbit} aria-hidden="true" />
        <div className={styles.iconTile}>
          <ServiceIcon
            icon={icon}
            title={title}
            sizes="72px"
            imageClassName={styles.iconImage}
            svgClassName={styles.iconSvg}
          />
        </div>
      </div>

      <div className={styles.text}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>
        <p className={styles.description} title={description}>
          {description}
        </p>
      </div>

      {interactive && (
        <span className={styles.explore} aria-hidden="true">
          Explore <ArrowRight size={16} strokeWidth={2.25} />
        </span>
      )}
    </article>
  );
};

export default React.memo(HomeServiceCard);
