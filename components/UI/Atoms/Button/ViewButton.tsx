import React from 'react';
import Image from 'next/image';
import styles from './ViewButton.module.css';
import ViewIconButton from '@/public/assets/ViewIconbutton.svg';
import { ViewButtonProps } from '@/types/Generals/buttonTypes';

const ViewButton: React.FC<ViewButtonProps> = ({ 
  children, 
  className = '',
  onClick,
  ...props 
}) => {
  return (
    <button
      className={`${styles.viewButton} ${className}`}
      onClick={(e) => {
        console.log('ViewButton clicked!');
        if (onClick) onClick(e);
      }}
      {...props}
    >
      <span className={styles.buttonContent}>
        <span className={styles.buttonText}>
          {children}
        </span>
        <span className={styles.iconWrapper}>
          <Image 
            src={ViewIconButton} 
            alt="View" 
            width={20} 
            height={20} 
            className={styles.buttonIcon}
            style={{ width: 'auto', height: 'auto' }}
          />
        </span>
      </span>
    </button>
  );
};

export default React.memo(ViewButton);