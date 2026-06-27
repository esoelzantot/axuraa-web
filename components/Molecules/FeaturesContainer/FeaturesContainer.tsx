import React from 'react';
import styles from './FeaturesContainer.module.css';
import FeatureCard from '@/components/UI/Atoms/FeatureCard/FeatureCard';

interface Feature {
  id: string | number;
  title: string;
  description: string;
  iconUrl?: string;
}

interface FeaturesContainerProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  className?: string;
}

const FeaturesContainer: React.FC<FeaturesContainerProps> = ({
//   title = 'Features & Capabilities',
//   subtitle = 'Comprehensive web services designed to design, build, and scale your digital presence from concept to launch.',
  features = [],
  className = ''
}) => {
  return (
    <section className={`${styles.featuresContainer} ${className}`}>
      {/* <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div> */}
      
      <div className={styles.cardsGrid}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            url={feature.iconUrl}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(FeaturesContainer);