import React, { useState } from 'react';
import styles from './DevolpercCard.module.css';

import { DevolperCardProps } from '@/types/Generals/cardTypes';

const DevolperCard: React.FC<DevolperCardProps> = ({ 
  testimonial = "Codevera delivered beyond our expectations, great working flow and dynamic teams",
  authorName = "Amr Elbaroudy",
  authorRole = "UI/UX designer",
  avatarSrc = "/assets/ProfileCard.svg"
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getAvatarSrc = () => {
    if (imageError || !avatarSrc || avatarSrc === null) {
      return "/assets/ProfileCard.svg";
    }
    return avatarSrc;
  };

  return (
    <div className={styles.card}>
      <div className={styles.testimonialText}>
        {testimonial}
      </div>
      
      <div className={styles.authorContainer}>
        <img 
          src={getAvatarSrc()} 
          alt={authorName} 
          width="50" 
          height="50"
          className={styles.avatar}
          onError={handleImageError}
        />
        <div className={styles.authorInfo}>
          <p className={styles.authorName}>{authorName}</p>
          <p className={styles.authorRole}>{authorRole}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DevolperCard);