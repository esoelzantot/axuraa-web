'use client';
import React from 'react';
import styles from './OurDevelopmentContainer.module.css';
import OurDevelopmentProcess from '@/components/UI/Atoms/OurDevelopmentProcess/OurDevelopmentProcess';

interface DevelopmentStep {
  id: string | number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface OurDevelopmentContainerProps {
  steps: DevelopmentStep[];
  className?: string;
}

const OurDevelopmentContainer: React.FC<OurDevelopmentContainerProps> = ({ 
  steps,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {steps.map((step) => (
        <OurDevelopmentProcess
          key={step.id}
          icon={step.icon}
          title={step.title}
          description={step.description}
        />
      ))}
    </div>
  );
};

export default React.memo(OurDevelopmentContainer);