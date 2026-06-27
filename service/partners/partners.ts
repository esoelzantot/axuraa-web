// Partners API Service

export interface PartnerItem {
  id: number;
  name: string;
  icon: string; // Current backend field
  logo?: string; // Documented alternative
  website: string;
}

export interface PartnersResponse {
  title: string;
  partners: PartnerItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetches partners data from the home partners API
 * @returns Promise<ApiResponse<PartnersResponse>>
 */
export const getHomePartners = async (): Promise<ApiResponse<PartnersResponse>> => {
  try {
    const response = await fetch('https://back-end-axuraa.fly.dev/api/v1/site/home/partners');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PartnersResponse = await response.json();
    
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error fetching partners:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch partners'
    };
  }
};

/**
 * Fetches partners data with optional locale support
 * @param locale - Optional locale parameter for localized responses
 * @returns Promise<ApiResponse<PartnersResponse>>
 */
export const getHomePartnersWithLocale = async (locale?: string): Promise<ApiResponse<PartnersResponse>> => {
  try {
    const url = locale 
      ? `https://back-end-axuraa.fly.dev/api/v1/site/home/partners?locale=${locale}`
      : 'https://back-end-axuraa.fly.dev/api/v1/site/home/partners';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PartnersResponse = await response.json();
    
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error fetching partners:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch partners'
    };
  }
};


// export type { PartnersResponse, ApiResponse };