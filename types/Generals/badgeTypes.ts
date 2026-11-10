/**
 * Badge component props interface from path :
 * @/components/UI/Atoms/Badge/Badge.tsx 
 */

export interface BadgeProps {
  text: string;
  show?: boolean;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  /** Animate in on scroll (off for badges inside the hero). */
  reveal?: boolean;
}
