import { ENDPOINTS } from '../api/APIs';

export interface LocalizedField {
  en: string;
  ar: string;
}

export interface ServiceUnit {
  en: string;
  ar: string;
}

export interface ServiceItem {
  _id: string;
  id: string;
  icon?: string;
  title: string;           // ← plain string, NOT LocalizedField
  subtitle?: string;       // ← plain string
  description: string;     // ← plain string
  what_we_do?: {
    description?: string;  // ← plain string
    units?: string[];      // ← array of strings, not ServiceUnit[]
  };
  technologies_used?: { name: string }[];
  type?: string;
  is_active?: boolean;
  projects?: {
    projects_id: {
      title: string;
      overview?: string;
      subTitle?: string;
      main_image_url?: string;
      case_study_results?: {
        description?: string;
        value?: string;
      }[];
    };
  }[];
  features?: {
    title: string;
    description: string;
  }[];
}

export interface ServicesApiResult {
  success: boolean;
  data?: ServiceItem[];
  error?: string;
}

export const getAllServices = async (
  lang: 'en' | 'ar' = 'en'
): Promise<ServicesApiResult> => {
  try {
    const url = `${ENDPOINTS.Services.getAll}?lang=${lang}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    const json = (await response.json()) as any;

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || `Failed to load services: ${response.status}`,
      };
    }

    // IMPORTANT: match your real response: data is an ARRAY
    const services: ServiceItem[] = Array.isArray(json?.data) ? json.data : [];

    return {
      success: true,
      data: services,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while loading services',
    };
  }
};