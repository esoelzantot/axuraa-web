'use client'
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import styles from './SeeAll.module.css';

import { LinkWithIconProps } from '@/types/Generals/iconsTypes';

const LinkWithIcon: React.FC<LinkWithIconProps> = ({ 
  href = "/en/portfolio", 
  children, 
  className = '' 
}) => {
  return (
    <div className={`${styles.linkContainer} ${className}`}>
      <a href={href} className={styles.link}>
        {children} <FiArrowRight className={styles.arrowIcon} />
      </a>
    </div>
  );
};

export default React.memo(LinkWithIcon);