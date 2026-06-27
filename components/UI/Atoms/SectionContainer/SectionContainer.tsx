import React from 'react';
import styles from './SectionContainer.module.css';
interface SectionContainerProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  background?: 'default' | 'light' | 'dark' | 'gradient' | 'image';
  fullWidth?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  animation?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className = '',
  title,
  subtitle,
  background = 'default',
  fullWidth = false,
  padding = 'medium',
  maxWidth = 'lg',
  animation,
  style,
  children,
}) => {
  const sectionClasses = [
    styles.section,
    styles[`bg-${background}`],
    styles[`padding-${padding}`],
    fullWidth ? styles.fullWidth : styles.contained,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const containerClasses = [
    styles.container,
    maxWidth && styles[`max-width-${maxWidth}`],
  ]
    .filter(Boolean)
    .join(' ');
  const dynamicStyles = {
    ...style,
    ...(animation && { animation }),
  };
  return (
    <section id={id} className={sectionClasses} style={dynamicStyles}>
      <div className={containerClasses}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
};
export default React.memo(SectionContainer);