import React from 'react';
import styles from './ValueCard.module.css';
import Image from 'next/image';

import { ValueCardProps } from '@/types/Generals/cardTypes';

const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  iconColor = '#3b82f6'
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper} style={{ color: iconColor }}>
        <Image src={icon} alt={title} width={50} height={50} style={{ width: 'auto', height: 'auto' }} />
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default React.memo(ValueCard);