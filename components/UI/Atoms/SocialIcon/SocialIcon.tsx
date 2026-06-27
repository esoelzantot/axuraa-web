import React from 'react';
import Image from 'next/image';
import styles from './SocialIcon.module.css';

import { SocialIconProps } from '@/types/Generals/iconsTypes';

const SocialIcon: React.FC<SocialIconProps> = ({
  icon,
  label,
  showLabel = false,
  alt = 'Social icon'
}) => {
  // Check if the icon URL is external (starts with http)
  const isExternalUrl = icon.startsWith('http');
  
  return (
    <div className={styles.socialIconWrapper}>
      <div className={styles.socialIcon}>
        <div className={styles.iconCircle}>
           {/* Render as a masked div to allow coloring */}
           <div 
             className={styles.iconImage}
             style={{
               maskImage: `url(${icon})`,
               WebkitMaskImage: `url(${icon})`,
             }}
             role="img"
             aria-label={alt}
           />
        </div>
      </div>
      {showLabel && label && (
        <p className={styles.label}>{label}</p>
      )}
    </div>
  );
};

export default SocialIcon;