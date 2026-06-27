/** SocialIcon component props interface from path :
 * @/components/UI/Atoms/SocialIcon/SocialIcon.tsx 
 * */

export interface SocialIconProps {
  icon: string;
  label?: string;
  showLabel?: boolean;
  alt?: string;
}

/** LinkWithIcon component props interface from path :
 * @/components/UI/Atoms/SeeAll/SeeAll.tsx 
 * */

export interface LinkWithIconProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}