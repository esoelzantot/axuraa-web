/** Project section props interface from path :
 * @/components/HomePage/Projects/ProjectSection.tsx 
 */
export interface Project {
  id: string;
  title: string;
  category: string;
  percentage: string;
  description: string;
  imageUrl: string;
}

/** ProjectSection component props interface from path :
 * @/components/HomePage/Projects/ProjectSection.tsx 
 */

export interface ProjectSectionProps {
  badgeText: string;
  title1: string;
  title2: string;
  subtitle: string;
  projects?: Project[];
  seeAllHref?: string;
  seeAllText?: string;
}