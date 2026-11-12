// types/AboutUsPage/Mission&Vision/mvCardTypes.ts
import { IconTypes } from './iconTypes';

export interface MVCardProps {
  title: string;
  description: string;
  /** Picks the icon (target / eye). */
  variant: "mission" | "vision";
  /** Small label next to the icon, e.g. "Why we exist". */
  kind: string;
  /** @deprecated kept for older callers; the card draws its own icon. */
  iconProps?: IconTypes;
  className?: string;
  animation?: boolean;
}