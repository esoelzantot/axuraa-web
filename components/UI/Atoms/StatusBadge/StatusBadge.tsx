import React, { CSSProperties } from 'react';
import styles from './StatusBadge.module.css';
import { SectionBadgeProps } from '@/types/HomePage/contactTypes';


const StatusBadge: React.FC<SectionBadgeProps> = ({ 
  text, 
  style,
  className = '' 
}) => {
  const combinedStyles = { ...style };

  return (
    <div 
      className={`${styles.statusBadge} ${className}`} 
      style={combinedStyles}
    >
      <span className={styles.badgeText}>
        {text}
      </span>
    </div>
  );
};

export default React.memo(StatusBadge);