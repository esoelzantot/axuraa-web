import React from 'react';
import styles from './ProjectButton.module.css';

interface ProjectButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'outline';
}

const ProjectButton: React.FC<ProjectButtonProps> = ({
  children,
  onClick,
  className = '',
  style,
  variant = 'primary'
}) => {
  const variantClass = styles[`button_${variant}`] || '';
  
  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default React.memo(ProjectButton);