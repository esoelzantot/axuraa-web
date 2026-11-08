"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Rating.module.css";

import { RatingProps } from "@/types/HomePage/ratingTypes";

const Rating: React.FC<RatingProps> = ({
  items,
  duration = 3000,
  maxValue = 50,
  // suffix = ''
}) => {
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
    <div className={styles.wrapper} ref={ratingRef}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`${styles.card} ${isVisible ? styles.cardVisible : ""}`}
          style={{ transitionDelay: `${index * 0.15}s` }}
        >
          {item?.showIcon && (
            <div className={styles.iconBox}>
              <Image
                src={item.icon}
                alt={`${item.label} icon`}
                width={40}
                height={40}
                className={styles.icon}
              />
            </div>
          )}
          <div className={styles.number}>
            {counts[index] || 0}
            {item.suffix}
          </div>
          <p className={styles.subtitle}>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Rating);
