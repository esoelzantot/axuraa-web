import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";
import { Locale, Localized } from "@/lib/i18n";

/**
 * Service as returned by `GET /services?lang=xx`.
 * With `lang` set, text fields are usually plain strings, but they are typed as
 * `Localized` so callers always go through `localize()`.
 */
export interface ServiceItem {
  _id: string;
  id: string;
  icon?: string;
  title: Localized;
  subtitle?: Localized;
  description: Localized;
  what_we_do?: {
    description?: Localized;
    units?: Localized[];
  };
  technologies_used?: { name: string }[];
  type?: "service" | "solution" | string;
  is_active?: boolean;
  projects?: {
    projects_id: {
      title: Localized;
      overview?: Localized;
      subTitle?: Localized;
      main_image_url?: string;
      case_study_results?: {
        description?: Localized;
        value?: string;
      }[];
    };
  }[];
  features?: {
    title: Localized;
    description: Localized;
  }[];
}

export interface ServicesApiResult {
  success: boolean;
  data?: ServiceItem[];
  error?: string;
}

export const getAllServices = async (lang: Locale = "en"): Promise<ServicesApiResult> => {
  const res = await http<{ data?: ServiceItem[] }>(`${ENDPOINTS.Services.getAll}?lang=${lang}`);
  if (!res.ok) return { success: false, error: res.error };
  return { success: true, data: Array.isArray(res.json.data) ? res.json.data : [] };
};

/** Active services of the given type ("service" or "solution"). */
export const filterServices = (services: ServiceItem[] | undefined, type: "service" | "solution") =>
  (services ?? []).filter((s) => s.type === type && s.is_active === true);
