import { LocalizedField } from '@/service/serviceId/serviceId';

// API Base URL
const API_BASE_URL = 'https://back-end-axuraa.fly.dev/api/v1';

// Endpoints
const ENDPOINTS = {
  TrackRecord: {
    getHomeTrackRecord: () => `${API_BASE_URL}/site/home/track-record`,
  },
};

// Interfaces
export interface TrackRecordItem {
  id: number;
  label: string;
  value: number;
  icon: string;
  suffix?: '' | '%' | '+';
}

export interface TrackRecordData {
  title: string;
  records: TrackRecordItem[];
}

export interface TrackRecordApiResult {
  success: boolean;
  data?: TrackRecordData;
  error?: string;
}

// API Functions
export const getHomeTrackRecord = async (
  lang: 'en' | 'ar' = 'en'
): Promise<TrackRecordApiResult> => {
  try {
    const url = `${ENDPOINTS.TrackRecord.getHomeTrackRecord()}?lang=${lang}`;
    console.log('=== TRACK RECORD API DEBUG ===');
    console.log('Fetching track record from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = (await response.json()) as any;
    console.log('Track Record API Response:', json);
    console.log('Response status:', response.status, response.ok);

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || `Failed to load track record: ${response.status}`,
      };
    }

    const trackRecordData = json?.data ?? json;
    console.log('Extracted track record data:', trackRecordData);

    return {
      success: true,
      data: trackRecordData,
    };
  } catch (error) {
    console.log('Track Record API call error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while loading track record',
    };
  }
};