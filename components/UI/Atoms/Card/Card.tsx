'use client';

/**
 * ===== Card Component =====
 * A reusable card component with hover effects and customizable content.
 * Features:
 * - Customizable icon, title, description, and link
 * - Smooth hover animations
 * - Responsive design
 */

import React, { useState } from 'react';
import styles from './Card.module.css';

import { CardProps } from '@/types/Generals/cardTypes';

const Card: React.FC<CardProps> = ({
   icon,
  iconSrc = "/assets/CardIcon.svg",  
  title,
  description,
  borderRadius
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    // Main card container with hover state handling
    // Uses CSS modules for styling and applies hover class when isHovered is true
    <div 
      className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
      style={borderRadius ? ({ '--card-border-radius': borderRadius } as React.CSSProperties) : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article" // Better accessibility
      aria-label={title} // Better accessibility
    >
      {/* Decorative background layers for visual effect */}
      <div className={styles.dotsLayer1} aria-hidden="true" />
      <div className={styles.dotsLayer2} aria-hidden="true" />
      <div className={styles.dotsLayer3} aria-hidden="true" />

      {/* Main content area of the card */}
      <div className={styles.content}>
        {/* Icon section - falls back to default shield icon if none provided */} 
         
         <div className={styles.iconWrapper}>
           {icon || (
              // eslint-disable-next-line @next/next/no-img-element -- icon URLs come from the CMS (any host) and need onError fallback
              <img 
                src={imageError ? "/assets/CardIcon.svg" : (iconSrc || "/assets/CardIcon.svg")} 
                alt="" 
                className={styles.cardIcon}
                onError={handleImageError}
              />
           )}
        </div>

        {/* Card title and description */}

        <h3 className={styles.title}>{title}</h3>


         <p className={styles.description}>{description}</p>

        {/* Optional link that appears on hover */}
        {/* {link && (
          <a 
            href="#" 
            className={styles.link}
            aria-label={`Learn more about ${title}`}
          >
            {link} <FiArrowRight className={styles.arrowIcon} />
          </a>
        )} */}
      </div>
    </div>
  );
};


export default React.memo(Card);
