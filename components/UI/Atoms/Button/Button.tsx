import React from 'react';
import styles from './Button.module.css';
import { ButtonProps } from '@/types/Generals/buttonTypes';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  animation,
  className = '',
  hoverColor,
  hoverBgColor,
  hoverShadow,
  transitionDuration = '0.3s',
  style,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[color],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const dynamicStyles = {
    ...style,
    ...(animation && { animation }),
    '--hover-color': hoverColor,
    '--hover-bg-color': hoverBgColor,
    '--hover-shadow': hoverShadow,
    '--transition-duration': transitionDuration,
  } as React.CSSProperties;
  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      style={dynamicStyles}
      {...props}
    >
      {loading && <span className={styles.loader}></span>}
      {startIcon && !loading && <span className={styles.startIcon}>{startIcon}</span>}
      <span className={styles.label}>{children}</span>
      {endIcon && !loading && <span className={styles.endIcon}>{endIcon}</span>}
    </button>
  );
};
export default React.memo(Button);