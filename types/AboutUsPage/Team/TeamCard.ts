export interface TeamCardProps {
  name: string;
  role: string;
  imageUrl: string;
  description?: string;
  /** Position in the team list; shown as a numbered tag. */
  index?: number;
}