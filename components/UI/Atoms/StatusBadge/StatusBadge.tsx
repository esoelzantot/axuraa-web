import React from 'react';
import styles from './StatusBadge.module.css';
import { SectionBadgeProps } from '@/types/HomePage/contactTypes';


const StatusBadge: React.FC<SectionBadgeProps> = ({ 
  text, 
  style,
  className = '',
  reveal = true,
}) => {
  const combinedStyles = { ...style };

  return (
    <div 
      className={`${styles.statusBadge} ${className}`} 
      style={combinedStyles}
      data-reveal={reveal ? "zoom" : undefined}
    >
      <span className={styles.badgeText}>
        {text}
      </span>
    </div>
  );
};

export default React.memo(StatusBadge);