// types/AboutUsPage/Mission&Vision/mvCardTypes.ts
import { IconTypes } from './iconTypes';

export interface MVCardProps {
  title: string;
  description: string;
  iconProps: IconTypes;
  className?: string;
  animation?: boolean;
}