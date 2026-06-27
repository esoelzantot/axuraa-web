// types/Generals/socialTypes.ts

import { FC, SVGProps} from 'react';

export interface SocialMediaPlatform {
  name: string;
  link: string;
  icon: FC<SVGProps<SVGSVGElement>> | string; // Support both React component and string path
}
export interface SocialMediaSectionProps {
  title?: string;
  subtitle?: string;
  platforms: SocialMediaPlatform[];
  className?: string;
}

export type SocialIconType = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'github' | 'discord';