import React from 'react';
import Image from 'next/image';
import { IconTypes } from '@/types/AboutUsPage/Mission&Vision/iconTypes';
import styles from './Icon.module.css';

interface ExtendedIconTypes extends IconTypes {
  noPadding?: boolean;
  noHover?: boolean;
  animation?: boolean;
  parentHover?: boolean;
}

const Icon: React.FC<ExtendedIconTypes> = ({
  iconSrc,
  icon,
  backgroundColor = 'transparent',
  background_Opacity = 1,
  background_Radius = 'square_corners',
  color = 'currentColor',
  className = '',
  width = 24,
  height = 24,
  alt = 'icon',
  noPadding = false,
  noHover = false,
  animation = false,
  parentHover = false,
}) => {
  // Map background_Radius to CSS class
  const radiusClass = {
    circle: styles.circle,
    rounded: styles.rounded,
    square_rounded: styles.squareRounded,
    square_corners: styles.squareCorners,
  }[background_Radius];

  // Build class names
  const containerClasses = [
    styles.iconContainer,
    radiusClass,
    noPadding ? styles.noPadding : '',
    noHover ? styles.noHover : '',
    animation ? styles.animated : '',
    parentHover ? styles.parentHover : '',
    className
  ].filter(Boolean).join(' ');

  // Use CSS custom properties
  const containerStyle: React.CSSProperties = {
    ['--icon-bg-color' as string]: backgroundColor,
    ['--icon-opacity' as string]: background_Opacity,
    ['--icon-color' as string]: color,
    ['--icon-width' as string]: `${width}px`,
    ['--icon-height' as string]: `${height}px`,
    
  };

  return (
    <div
      className={containerClasses}
      style={containerStyle}
    >
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt={alt}
          width={width}
          height={height}
          className={styles.iconImage}
        />
      ) : icon ? (
        <div className={styles.iconWrapper}>
          {icon}
        </div>
      ) : null}
    </div>
  );
};

export default Icon;