import React from 'react';
import Image from 'next/image';
import styles from './SuccessStories.module.css';

interface Metric {
  label: string;
  value: string;
  valueColor?: string;
}

interface SuccessStoryCardProps {
  iconUrl?: string;
  title: string;
  description: string;
  metrics?: Metric[];
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({
  iconUrl,
  title,
  description,
  metrics,
  className = '',
  onClick,
  style
}) => {
  return (
    <div 
      className={`${styles.successStory} ${className}`}
      onClick={onClick}
      style={style}
    >
      <div className={styles.iconContainer}>
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt=""
            width={16}
            height={16}
          />
        ) : (
          <div className={styles.iconPlaceholder} />
        )}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      {metrics && metrics.length > 0 && (
        <div className={styles.metricsContainer}>
          {metrics.slice(0, 4).map((metric, index) => (
            <div key={index} className={styles.metricRow}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <span 
                className={styles.metricValue}
                style={{ color: metric.valueColor || '#F46535' }}
              >
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SuccessStoryCard);