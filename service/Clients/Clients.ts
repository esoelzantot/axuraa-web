// API Base URL and endpoints
import { ENDPOINTS } from '../api/APIs';

export { ENDPOINTS };

// TypeScript interfaces for Client data
export interface LocalizedField {
  en: string;
  ar: string;
}

export interface ClientProject {
  _id: string;
  title: LocalizedField;
  main_image_url: string | null;
  client_id: string;
  status: string;
  id: string;
}

export interface ClientTestimonial {
  _id: string;
  client_id: string;
  rating: number;
  message: LocalizedField;
}

export interface ClientItem {
  _id: string;
  name: string;
  company_name: string | null;
  email: string;
  phone_number: string;
  country: string;
  description: string;
  social_media: string[];
  image_url: string | null;
  project_count: number;
  createdAt: string;
  updatedAt: string;
  projects: ClientProject[];
  testimonials: ClientTestimonial[];
  id: string;
}

export interface ClientsApiResponse {
  status: string;
  message?: string;
  data: ClientItem[];
}

export interface ClientsApiResult {
  success: boolean;
  data?: ClientItem[];
  error?: string;
}

/**
 * Fetch all clients from API
 * @returns Promise<ClientsApiResult> - Result with clients data or error
 */
export const getAllClients = async (): Promise<ClientsApiResult> => {
  try {
    const response = await fetch(ENDPOINTS.Clients.getAll, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse: ClientsApiResponse = await response.json();

    if (apiResponse.status === 'success') {
      return {
        success: true,
        data: apiResponse.data,
      };
    } else {
      return {
        success: false,
        error: apiResponse.message || 'Failed to fetch clients',
      };
    }
  } catch (error) {
    console.error('=== CLIENTS API ERROR ===');
    console.error('Error fetching clients:', error);
    console.error('Endpoint:', ENDPOINTS.Clients.getAll);
    
    // Return fallback data instead of error to prevent UI crashes
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Get clients with locale-specific data transformation
 * @param locale - Language locale ('en' | 'ar')
 * @returns Promise<ClientsApiResult> - Result with localized clients data
 */
export const getAllClientsWithLocale = async (locale: 'en' | 'ar' = 'en'): Promise<ClientsApiResult> => {
  try {
    const result = await getAllClients();
    
    if (result.success && result.data) {
      // Transform data to include locale-specific fields
      const transformedClients = result.data.map(client => ({
        ...client,
        displayName: client.name,
        displayDescription: client.description,
        displayCountry: client.country,
        projects: client.projects.map(project => ({
          ...project,
          displayTitle: project.title[locale],
        })),
        testimonials: client.testimonials.map(testimonial => ({
          ...testimonial,
          displayMessage: testimonial.message[locale],
        })),
      }));
      
      return {
        success: true,
        data: transformedClients,
      };
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching clients with locale:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};