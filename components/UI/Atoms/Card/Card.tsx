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
import { FiArrowRight } from 'react-icons/fi';
import styles from './Card.module.css';

import { CardProps } from '@/types/Generals/cardTypes';

const Card: React.FC<CardProps> = ({
   icon,
  iconSrc = "/assets/CardIcon.svg",  
  title,
  description,
  link = "Read more >",
  borderRadius = "0 0 68.087px 0"
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
      style={{ '--card-border-radius': borderRadius } as React.CSSProperties}
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
              <img 
                src={imageError ? "/assets/CardIcon.svg" : (iconSrc || "/assets/CardIcon.svg")} 
                alt={title || 'Card icon'} 
                className={styles.cardIcon}
                onError={handleImageError}
              />
           )}
        </div>

        {/* Card title and description */}

        <h2 className={styles.title}>{title}</h2>


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
