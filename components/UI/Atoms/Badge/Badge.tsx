import React from 'react';
import styles from './Badge.module.css';
import { BadgeProps } from '@/types/Generals/badgeTypes';

const Badge: React.FC<BadgeProps> = ({ 
  text, 
  show = true,
  className = '',
  style = {},
  width = 'auto',
  height = 'auto',
  reveal = true,
}) => {
  if (!show) {
    return null;
  }

  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${styles.badge_container} ${className}`}
      style={containerStyle}
      data-reveal={reveal ? "zoom" : undefined}
    >
      <div className={styles.badge}>
        <span className={styles.badgeDot}></span>
        <p className={styles.badgeContent}>{text}</p>
      </div>
    </div>
  );
};

export default React.memo(Badge);