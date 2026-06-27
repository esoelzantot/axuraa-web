/** Button component props interface from path : @/components/UI/Atoms/Button/Button.tsx */
import React from 'react';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
type ButtonSize = 'small' | 'medium' | 'large';


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  animation?: string;
  className?: string;
  hoverColor?: string;
  hoverBgColor?: string;
  hoverShadow?: string;
  transitionDuration?: string;
}

export interface LanguageButtonProps {
  className?: string;
}


export interface StartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export interface ViewButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}