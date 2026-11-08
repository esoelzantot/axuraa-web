import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";
import { Localized } from "@/lib/i18n";

export interface ClientProject {
  _id: string;
  title: Localized;
  main_image_url: string | null;
  client_id: string;
  status: string;
  id: string;
}

export interface ClientTestimonial {
  _id: string;
  client_id: string;
  rating: number;
  message: Localized;
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

export interface ClientsApiResult {
  success: boolean;
  data?: ClientItem[];
  error?: string;
}

export const getAllClients = async (): Promise<ClientsApiResult> => {
  const res = await http<{ status?: string; message?: string; data?: ClientItem[] }>(
    ENDPOINTS.Clients.getAll,
  );
  if (!res.ok) return { success: false, error: res.error };
  if (!Array.isArray(res.json.data)) {
    return { success: false, error: res.json.message || "Failed to fetch clients" };
  }
  return { success: true, data: res.json.data };
};
