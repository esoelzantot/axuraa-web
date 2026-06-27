import React from 'react';
import styles from './FeatureCard.module.css';
import Image from 'next/image';

interface FeatureCardProps {
  url?: string;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  url,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.iconContainer}>
        <Image
          src={url || "/assets/Frame.svg"}
          alt="Feature Icon"
          width={10}  
          height={10} 
          className={styles.icon}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default FeatureCard;