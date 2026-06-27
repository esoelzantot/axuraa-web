import React from 'react';
import styles from './ContactInfoCard.module.css';
import Image from 'next/image';
import { ContactInfoCardProps } from '@/types/Generals/cardTypes';


const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ 
  icon, 
  label, 
  value,
  onClick
}) => {
  return (
    <div className={styles.contactCard} onClick={onClick}>
      <div className={styles.iconContainer}>
        <Image 
          src={icon} 
          alt={label} 
          width={32} 
          height={32}
          className={styles.iconImage}
        />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
};
export default React.memo(ContactInfoCard);