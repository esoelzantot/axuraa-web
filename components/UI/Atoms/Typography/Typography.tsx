import React, { JSX } from 'react';
import styles from './Typography.module.css';
import { TypographyVariant, TypographyProps } from '@/types/Generals/typographyTypes';

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  component: Component = 'p',
  className = '',
  color,
  align,
  gutterBottom = false,
  noWrap = false,
  animation,
  stagger,
  children,
  style,
  ...props
}) => {
  const classes = [
    styles.typography,
    styles[variant],
    gutterBottom && styles.gutterBottom,
    noWrap && styles.noWrap,
    animation && styles[animation],
    stagger && styles[`stagger${stagger}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const dynamicStyles = {
    ...style,
    ...(color && { color }),
    ...(align && { textAlign: align }),
  };

  return (
    <Component className={classes} style={dynamicStyles} {...props}>
      {children}
    </Component>
  );
};

export default React.memo(Typography);