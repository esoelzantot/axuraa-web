/** Worker interface representing a worker's details 
 * from path :
 * @/components/Section/HomePage/WorkerSection/WorkerSection.tsx 
*/

export interface Worker {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface WorkerSectionProps {
  badgeText: string;
  title1: string;
  title2: string;
  subtitle: string;

}