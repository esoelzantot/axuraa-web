import { ENDPOINTS } from "../api/APIs";
import { http, unwrap } from "../api/http";

export interface PartnerItem {
  id: number;
  name: string;
  icon?: string; // current backend field
  logo?: string; // documented alternative
  website?: string;
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

export const getHomePartners = async (): Promise<ApiResponse<PartnersResponse>> => {
  const res = await http(ENDPOINTS.Home.partners);
  if (!res.ok) return { success: false, error: res.error };
  const data = unwrap<PartnersResponse>(res.json);
  if (!Array.isArray(data?.partners)) {
    return { success: false, error: "Invalid partners response" };
  }
  return { success: true, data };
};
