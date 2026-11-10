"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Award,
  BadgeCheck,
  CalendarClock,
  FolderCheck,
  HeartHandshake,
  Rocket,
  Smile,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import styles from "./Rating.module.css";
import { RatingProps } from "@/types/HomePage/ratingTypes";

// Pick an icon that matches what the number counts (labels come from the CMS).
const ICON_RULES: [RegExp, LucideIcon][] = [
  [/launch/i, Rocket],
  [/project/i, FolderCheck],
  [/client|customer/i, Smile],
  [/award|prize/i, Award],
  [/team|member|expert|engineer/i, Users],
  [/year|experience/i, CalendarClock],
  [/retention|satisf|trust/i, HeartHandshake],
  [/quality|success/i, BadgeCheck],
];

const iconFor = (label: string): LucideIcon =>
  ICON_RULES.find(([re]) => re.test(label))?.[1] ?? TrendingUp;

/** Track-record counters: one panel, four cells, numbers count up when scrolled into view. */
const Rating: React.FC<RatingProps> = ({ items, duration = 3000, maxValue = 50 }) => {
  const [counts, setCounts] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const ratingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ratingRef.current;
    if (!node) return;

    let timer: ReturnType<typeof setInterval> | undefined;

    // Counts every item up from 0 each time the block scrolls into view.
    const startCounter = () => {
      if (timer) clearInterval(timer);
      setCounts(Array(items.length).fill(0));
      const steps = 60;
      const increment = maxValue / steps;
      const stepDuration = duration / steps;
      let currentStep = 0;

      timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCounts(
            items.map((item) =>
              Math.min(Math.floor(increment * currentStep * (item.value / maxValue)), item.value),
            ),
          );
        } else if (timer) {
          clearInterval(timer);
        }
      }, stepDuration);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) startCounter();
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [items, duration, maxValue]);

  return (
    <div className={`${styles.wrapper} ${isVisible ? styles.visible : ""}`} ref={ratingRef} data-reveal="zoom">
      {items.map((item, index) => {
        const Icon = iconFor(item.label);
        return (
          <div key={item.id} className={styles.card} style={{ transitionDelay: `${index * 0.12}s` }}>
            {item.showIcon && (
              <span className={styles.iconBox} aria-hidden="true">
                <Icon size={24} strokeWidth={1.75} />
              </span>
            )}
            <div className={styles.number}>
              <span className={styles.value}>{counts[index] || 0}</span>
              {item.suffix && <span className={styles.suffix}>{item.suffix}</span>}
            </div>
            <p className={styles.label}>{item.label}</p>
            <span className={styles.bar} aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Rating);
