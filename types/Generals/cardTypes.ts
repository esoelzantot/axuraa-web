/** Card component props interface  from path :
 * @/components/UI/Atoms/Card/Card.tsx
 * @/components/UI/Atoms/Card/DirectionCard.tsx
 * */

export interface CardProps {
  icon?: React.ReactNode;
  iconSrc?: string;
  title: string;
  description: string;
  link?: string;
  borderRadius?: string;
}

/** ContactInfoCard component props interface from path :
 * @/components/UI/Atoms/ContactForm/ContactInfoCard.tsx
 * */

export interface ContactInfoCardProps {
  icon: string; // Now expects the path to the image
  label: string;
  value: string;
  onClick?: () => void; // Added onClick handler
}

/** ProjectCard component props interface from path :
 * @/components/UI/Muscles/ProjectCard/ProjectCard.tsx
 * */

export interface ProjectCardProps {
  id: string;
  title: string;
  categories: string[];
  category: string;
  percentage: string;
  description: string;
  imageUrl: string;
  locale?: string;
}

/** DevolperCard component props interface from path :
 * @/components/UI/Atoms/DevoleperCard/DevolpercCard.tsx
 * */

export interface DevolperCardProps {
  testimonial: string;
  authorName: string;
  authorRole: string;
  avatarSrc: string;
}

/** SpecialCard component props interface from path :
 * @/components/UI/Muscles/SpecialCard/SpecialCard.tsx
 * */
export interface SpecialCardProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

/** ValueCard component props interface from path :
 * @/components/UI/Muscles/ValueCard/ValueCard.tsx
 * */
export interface ValueCardProps {
  icon: string;
  //   iconSrc?: string;
  title: string;
  description: string;
  iconColor?: string;
}

/** SocialMediaCard component props interface from path :
 * @/components/UI/Muscles/SocialMediaCard/SocialMediaCard.tsx
 * */
import { FC, SVGProps } from "react";

export interface SocialMediaCardProps {
  Icon: FC<SVGProps<SVGSVGElement>> | string; // Support both React component and string path
  label: string;
  link: string;
}
