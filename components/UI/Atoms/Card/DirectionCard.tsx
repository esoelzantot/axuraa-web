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
import styles from './DirectionCard.module.css';
import { useRouter } from 'next/navigation';

import { CardProps } from '@/types/Generals/cardTypes';

interface DirectionCardProps extends CardProps {
  onClick?: () => void;
  href?: string;
}

const DirectionCard: React.FC<DirectionCardProps> = ({
   icon,
  iconSrc = "/assets/DirectionIcon.svg",  
  title,
  description,
  borderRadius,
  onClick,
  href
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    // Main card container with hover state handling
    // Uses CSS modules for styling and applies hover class when isHovered is true
    <div 
      className={`${styles.card} ${isHovered ? styles.hovered : ''} ${(onClick || href) ? styles.clickable : ''}`}
      style={borderRadius ? ({ '--card-border-radius': borderRadius } as React.CSSProperties) : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button" // Better accessibility for clickable elements
      aria-label={title} // Better accessibility
      tabIndex={0} // Make focusable for keyboard navigation
    >
      {/* Decorative background layers for visual effect */}
      {/* <div className={styles.dotsLayer1} aria-hidden="true" />
      <div className={styles.dotsLayer2} aria-hidden="true" />
      <div className={styles.dotsLayer3} aria-hidden="true" /> */}

      {/* Main content area of the card */}
      <div className={styles.content}>
        {/* Icon section - falls back to default shield icon if none provided */} 
         
         <div className={styles.iconWrapper}>
           {icon || (
              // eslint-disable-next-line @next/next/no-img-element -- icon URLs come from the CMS (any host)
              <img 
                src={iconSrc || "/assets/DirectionIcon.svg"} 
                alt="" 
                className={styles.cardIcon}
              />
           )}
        </div>

        {/* Card title and description */}

        <h3 className={styles.title}>{title}</h3>


         <p className={styles.description}>{description}</p>

      </div>
    </div>
  );
};



export default React.memo(DirectionCard);
