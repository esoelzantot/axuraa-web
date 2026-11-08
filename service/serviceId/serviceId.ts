import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";
import { Locale, Localized } from "@/lib/i18n";

export interface Technology {
  _id?: string;
  name: string;
  icon?: string;
}

export interface ServiceFeature {
  _id: string;
  title: Localized;
  description: Localized;
  icon?: string;
}

export interface ServiceProject {
  _id: string;
  services_id: string;
  projects_id: {
    _id: string;
    title: Localized;
    main_image_url?: string;
    client_id: string;
    project_manager: string;
    overview: Localized;
    case_study_results: Array<{
      description: Localized;
      value: string;
    }>;
    status: string;
    subTitle?: Localized;
    location?: string;
    start_work?: string;
  };
  priority: number;
}

export interface ServiceItem {
  _id: string;
  icon?: string;
  title: Localized;
  subtitle?: Localized;
  description: Localized;
  what_we_do?: {
    description?: Localized;
    units?: Localized[];
  };
  technologies_used?: Technology[];
  features?: ServiceFeature[];
  projects?: ServiceProject[];
  description_features?: Localized;
  description_stories?: Localized;
  type?: string;
  is_active?: boolean;
}

export interface ServiceApiResult {
  success: boolean;
  data?: ServiceItem;
  error?: string;
}

const OBJECT_ID = /^[0-9a-fA-F]{24}$/;

export const getServiceById = async (
  id: string,
  lang: Locale = "en",
): Promise<ServiceApiResult> => {
  if (!OBJECT_ID.test(id)) return { success: false, error: "Invalid service ID" };

  const res = await http<{ data?: ServiceItem }>(`${ENDPOINTS.Services.getById(id)}?lang=${lang}`);
  if (!res.ok) return { success: false, error: res.error };

  const service = res.json.data;
  if (!service?._id || service.is_active === false) {
    return { success: false, error: "Service not found" };
  }
  return { success: true, data: service };
};
