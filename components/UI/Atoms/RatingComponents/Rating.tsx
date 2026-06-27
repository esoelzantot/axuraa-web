"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Rating.module.css';

import { RatingProps } from '@/types/HomePage/ratingTypes';

const Rating: React.FC<RatingProps> = ({ 
  items, 
  duration = 3000,
  maxValue = 50,
  // suffix = ''
}) => {
  const [counts, setCounts] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const ratingRef = useRef<HTMLDivElement>(null);

  const startCounter = () => {
    setCounts(Array(items.length).fill(0));
    const steps = 60;
    const increment = maxValue / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCounts(prevCounts => 
          prevCounts.map((_, i) => 
            Math.min(Math.floor(increment * currentStep * (items[i].value / maxValue)), items[i].value)
          )
        );
      } else {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  };

  useEffect(() => {
    if (!ratingRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            startCounter();
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: '0px 0px -50px 0px' // Optional: adjust when the animation should start
      }
    );

    observer.observe(ratingRef.current);

    return () => {
      if (ratingRef.current) {
        observer.unobserve(ratingRef.current);
      }
    };
  }, [items, duration, maxValue]);

  return (
    <div className={styles.wrapper} ref={ratingRef}>
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
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