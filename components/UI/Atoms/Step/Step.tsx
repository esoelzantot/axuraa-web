// components/UI/Step/Step.tsx
import React from 'react';
import styles from './Step.module.css';
import Typography from '../Typography/Typography';
import { StepProps } from '@/types/AboutUsPage/History/JourneyTypes';


const Step: React.FC<StepProps> = ({ 
  year, 
  title, 
  description, 
  isLast = false,
  isActive = false,
  index = 0
}) => {
  return (
    <div 
      className={`${styles.step_container} ${isLast ? styles.last : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className={styles.step_indicator}>
        <div className={`${styles.step_circle} ${isActive ? styles.active : ''}`}>
          <div className={styles.step_circle_inner} />
        </div>
        {!isLast && <div className={styles.step_line} />}
      </div>
      
      <div className={styles.step_content}>
        <Typography 
          variant="h5" 
          component="h3" 
          className={styles.step_title}
          gutterBottom
        >
          {year} - {title}
        </Typography>
        
        <Typography 
          variant="body1" 
          className={styles.step_description}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default React.memo(Step);