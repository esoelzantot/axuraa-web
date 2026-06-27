'use client';
import React from 'react';
import styles from './OurDevelopmentProcess.module.css';

interface OurDevelopmentProcessProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const OurDevelopmentProcess: React.FC<OurDevelopmentProcessProps> = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default React.memo(OurDevelopmentProcess);