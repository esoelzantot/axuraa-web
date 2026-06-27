'use client';
import React, { useState, useEffect } from 'react';
import styles from './SocialMediaCard.module.css';
import { SocialMediaCardProps } from '@/types/Generals/cardTypes';

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ 
  Icon: IconComponent, 
  label, 
  link,
}) => {
  const [iconSize, setIconSize] = useState(52);

  useEffect(() => {
    const updateIconSize = () => {
      if (window.innerWidth <= 480) {
        setIconSize(20);
      } else if (window.innerWidth <= 768) {
        setIconSize(52);
      } else {
        setIconSize(60);
      }
    };
    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* SVG gradient definition - hidden but accessible */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="socialIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#D04A1D', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#902501', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      <div 
        className={styles.card} 
        onClick={handleClick}
      >
        <div className={styles.iconCircle}>
          <IconComponent 
            width={iconSize} 
            height={iconSize}
          />
        </div>
        <span className={styles.label}>{label}</span>
      </div>
    </>
  );
};

export default SocialMediaCard;