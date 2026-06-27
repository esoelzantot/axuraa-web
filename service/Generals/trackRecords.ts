import { RatingItem } from '@/types/HomePage/ratingTypes';
import { ENDPOINTS } from '../api/APIs';

/**
 * Response type for track records API
 */

export interface TrackRecordsResponse {
  success: boolean;
  data?: TrackRecordData;
  message?: string;
  error?: string;
}

/**
 * Data structure for the Track Records section
 */
export interface TrackRecordData {
  title: string;
  records: RatingItem[];
}

/**
 * Get track records data from the API
 */
export const getTrackRecords = async (): Promise<TrackRecordsResponse> => {
  try {
    const response = await fetch(ENDPOINTS.General.trackRecords, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Failed to fetch track records data',
      };
    }

    return {
      success: true,
      data: data.data ?? data,
      message: 'Track records data fetched successfully',
    };
  } catch (error) {
    console.error('Error fetching track records data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};