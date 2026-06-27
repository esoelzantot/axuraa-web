// types/AboutUsPage/History/JourneyTypes.ts

/**
 * Represents a single timeline item in the history journey
 */
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

/**
 * Data structure for the History Journey section
 */
export interface HistoryJourneyData {
  title: string;
  timeline: TimelineItem[];
}

/**
 * Props for the HistoryJourney component
 */
export interface HistoryJourneyProps {
  data?: HistoryJourneyData;
  className?: string;
  onItemClick?: (item: TimelineItem, index: number) => void;
}

/**
 * Props for the HistoryCard component
 */
export interface HistoryCardProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Data for the HistoryCard component
 */
export interface HistoryCardData {
  title?: string;
  subtitle?: string;
  icon?: string;
}

/**
 * Props for the HistorySection component (combines both)
 */
export interface HistorySectionProps {
  journeyData?: HistoryJourneyData;
  cardData?: HistoryCardData;
  className?: string;
}

/**
 * Complete API response format for History Section
 */
export interface HistorySectionApiResponse {
  success: boolean;
  data: {
    journey: HistoryJourneyData;
    card: HistoryCardData;
  };
  message?: string;
}

export interface StepProps {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
  isActive?: boolean;
  index?: number;
}