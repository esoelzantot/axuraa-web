import React from 'react';
import styles from './DotsBackground.module.css';
interface DotsBackgroundProps {
  side?: 'left' | 'right' | 'both';
  className?: string;
}
const DotsBackground: React.FC<DotsBackgroundProps> = ({ 
  side = 'both',
  className = '' 
}) => {
  return (
    <div className={`${styles.dotsBackground} ${className}`}>
      {(side === 'left' || side === 'both') && (
        <div className={`${styles.dots} ${styles.leftDots}`}></div>
      )}
      {(side === 'right' || side === 'both') && (
        <div className={`${styles.dots} ${styles.rightDots}`}></div>
      )}
    </div>
  );
};
export default React.memo(DotsBackground);