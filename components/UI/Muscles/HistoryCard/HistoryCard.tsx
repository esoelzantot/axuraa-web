// components/UI/HistoryCard/HistoryCard.tsx
import React from 'react';
import Image from 'next/image';
import styles from './HistoryCard.module.css';
import Typography from '@/components/UI/Atoms/Typography/Typography';
import Icon from '@/components/UI/Atoms/Icon/Icon';
import { HistoryCardProps } from '@/types/AboutUsPage/History/JourneyTypes';

const HistoryCard: React.FC<HistoryCardProps> = ({
  title = "Writing History",
  subtitle = "One line of code at a time.",
  icon = "/assets/paper.svg",
  className = "",
  onClick
}) => {
  return (
    <div 
      className={`${styles.history_card} ${className}`}
      onClick={onClick}
    >
      {/* Animated Background Circles */}
      {/* <div className={styles.circles_container}>
        <Image
          src="/assets/circle.svg"
          alt=""
          width={400}
          height={400}
          className={`${styles.circle} ${styles.circle_1}`}
        />
        <Image
          src="/assets/circle.svg"
          alt=""
          width={300}
          height={300}
          className={`${styles.circle} ${styles.circle_2}`}
        />
        <Image
          src="/assets/circle.svg"
          alt=""
          width={350}
          height={350}
          className={`${styles.circle} ${styles.circle_3}`}
        />
      </div> */}

      {/* Content */}
      <div className={styles.content}>
        {/* Icon Container with Icon Component */}
        <div className={styles.icon_container}>
          <Icon
            iconSrc={icon}
            alt={title}
            width={40}
            height={40}
            backgroundColor="rgba(249, 115, 22, 0.1)"
            background_Radius="rounded"
            className={styles.icon_background}
            noPadding={true}
            noHover={true}
            animation={true}
          />
        </div>

        {/* Text Content */}
        <div className={styles.text_content}>
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
            className={styles.subtitle}
          >
            {subtitle}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HistoryCard);