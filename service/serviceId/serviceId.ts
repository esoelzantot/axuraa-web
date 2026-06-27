import { ENDPOINTS } from '../api/APIs';

export interface LocalizedField {
  en: string;
  ar: string;
}

export interface ServiceUnit {
  en: string;
  ar: string;
}

export interface Technology {
  _id?: string;
  name: string;
  icon?: string;
}

export interface ServiceFeature {
  _id: string;
  title: LocalizedField;
  description: LocalizedField;
  icon?: string;
}

export interface ServiceProject {
  _id: string;
  services_id: string;
  projects_id: {
    _id: string;
    title: LocalizedField;
    main_image_url?: string;
    client_id: string;
    project_manager: string;
    overview: LocalizedField;
    case_study_results: Array<{
      description: LocalizedField;
      value: string;
    }>;
    status: string;
    subTitle?: LocalizedField;
    location?: string;
    start_work?: string;
  };
  priority: number;
}

export interface ServiceItem {
  _id: string;
  icon?: string;
  title: LocalizedField;
  subtitle?: LocalizedField;
  description: LocalizedField;
  what_we_do?: {
    description?: LocalizedField;
    units?: ServiceUnit[];
  };
  technologies_used?: Technology[];
  features?: ServiceFeature[];
  projects?: ServiceProject[];
  description_features?: LocalizedField;
  description_stories?: LocalizedField;
  type?: string;
  is_active?: boolean;
}

export interface ServiceApiResult {
  success: boolean;
  data?: ServiceItem;
  error?: string;
}

export const getServiceById = async (
  id: string,
  lang: 'en' | 'ar' = 'en'
): Promise<ServiceApiResult> => {
  try {
    const url = `${ENDPOINTS.Services.getById(id)}?lang=${lang}`;
    console.log('Calling API URL:', url);

    const response = await fetch(url, {
      method: 'GET',
    });

    const json = (await response.json()) as any;
    console.log('API Response:', json);
    console.log('Response status:', response.status, response.ok);

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || `Failed to load service: ${response.status}`,
      };
    }

    const service = json?.data ?? null;
    console.log('Extracted service:', service);
    console.log('Service properties:', {
      hasType: service?.hasOwnProperty('type'),
      hasIsActive: service?.hasOwnProperty('is_active'),
      type: service?.type,
      is_active: service?.is_active,
      serviceId: service?._id
    });

    // Temporarily disable validation to debug
    if (service) {
      console.log('Service found, returning success');
      return {
        success: true,
        data: service,
      };
    } else {
      console.log('No service data found');
      return {
        success: false,
        error: 'Service not found',
      };
    }
  } catch (error) {
    console.log('API call error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while loading the service',
    };
  }
};