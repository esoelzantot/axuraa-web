import React from 'react';
import Icon from '@/components/UI/Atoms/Icon/Icon';
import Typography from '@/components/UI/Atoms/Typography/Typography';
import { MVCardProps } from '@/types/AboutUsPage/Mission&Vision/mvCardTypes';
import Image from 'next/image';
import styles from './M&VCard.module.css';

const MVCard: React.FC<MVCardProps> = ({
  title,
  description,
  iconProps,
  className = '',
  animation = true,
}) => {
  return (
    <div className={`${styles.card} ${animation ? styles.animated : ''} ${className}`}>
      <div className={styles.circleWrapper}>
        <Image
          src="/assets/circle.svg"
          alt="Decorative circle"
          width={400}
          height={400}
          className={styles.circle}
          priority
        />
      </div>
      <div className={styles.iconWrapper}>
        <Icon {...iconProps} noHover={true} className="iconContainer" />
      </div>
      
      <Typography
        variant="h4"
        component="h3"
        className={styles.title}
        gutterBottom
      >
        {title}
      </Typography>
      
      <Typography
        variant="body1"
        component="p"
        className={styles.description}
        color="rgba(255, 255, 255, 0.7)"
      >
        {description}
      </Typography>
    </div>
  );
};

export default MVCard;