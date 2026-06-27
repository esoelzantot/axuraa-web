/** Rating section props interface from path :
 * @/components/HomePage/Rating/RatingSection.tsx 
 */

export interface RatingItem {
  id: number;
  value: number;
  label: string;
  icon: string;
  showIcon?: boolean;
  suffix: '' | '%' | '+';
}

/** RatingSection component props interface from path :
 * @/components/HomePage/Rating/RatingSection.tsx 
 */


export interface RatingSectionProps {
  badgeText: string;
  title1: string;
  title2: string;
  subtitle: string;
  ratingItems?: RatingItem[];
}

/** Rating component props interface from path :
 * @/components/UI/Atoms/Rating/Rating.tsx 
 */

export interface RatingProps {
  items: RatingItem[];
  duration?: number;
  maxValue?: number;
  suffix?: '' | '%' | '+';
}