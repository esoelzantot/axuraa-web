import React from 'react';
import ProjectButton from '@/components/UI/Atoms/ProjectButton/ProjectButton';
import styles from './TechnologiesUsed.module.css';

interface TechnologiesUsedProps {
  technologies: string[];
  title?: string;
  className?: string;
}

const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({ 
  technologies, 
  title = 'Technologies Used',
  className = '' 
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.technologiesGrid}>
        {technologies.map((tech, index) => (
          <ProjectButton 
            key={index} 
            variant="primary"
            className={styles.techButton}
          >
            {tech}
          </ProjectButton>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TechnologiesUsed);