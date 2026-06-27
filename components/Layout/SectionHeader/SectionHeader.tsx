'use client';
import React from 'react';
import styles from './SectionHeader.module.css';
import { SectionHeaderProps } from '@/types/Generals/sectionHeaderTypes';

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title1,
  title2,
  subtitle,
  className = '',
  textAlign = 'center',
  titleLayout = 'row',
}) => {
  return (
    <div 
      className={`${styles.header} ${className}`}
      style={{ 
        textAlign: textAlign,
        alignItems: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center'
      }}
    >
      {(title1 || title2) && (
        <div className={styles.titleGroup}>
          <h2 
            className={styles.unifiedTitle} 
            style={{ 
              flexDirection: titleLayout,
              display: titleLayout === 'row' ? 'inline-block' : 'flex'
            }}
          >
            {title1 && <span className={styles.titlePartWhite}>{title1}</span>}
            {title2 && <span className={styles.titlePartGradient}>{title2}</span>}
          </h2>
        </div>
      )}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};
export default React.memo(SectionHeader);