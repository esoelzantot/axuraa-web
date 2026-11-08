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

  return (
    <>
      {/* The #socialIconGradient fill is defined once in SocialMediaSection. */}
      <a
        className={styles.card}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className={styles.iconCircle}>
          <IconComponent 
            width={iconSize} 
            height={iconSize}
          />
        </div>
        <span className={styles.label}>{label}</span>
      </a>
    </>
  );
};

export default SocialMediaCard;