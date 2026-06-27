import { ENDPOINTS } from '../api/APIs';
import { HistoryJourneyData } from '@/types/AboutUsPage/History/JourneyTypes';

/**
 * Response type for history API
 */
export interface HistoryResponse {
  success: boolean;
  data?: HistoryJourneyData;
  message?: string;
  error?: string;
}

/**
 * Get history data from the API
 */
export const getHistory = async (): Promise<HistoryResponse> => {
  try {
    const response = await fetch(ENDPOINTS.AboutUs.history, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Failed to fetch history data',
      };
    }

    return {
      success: true,
      data,
      message: 'History data fetched successfully',
    };
  } catch (error) {
    console.error('Error fetching history data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};