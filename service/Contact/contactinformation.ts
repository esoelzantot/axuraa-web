import { ENDPOINTS } from "../api/APIs";
import { http, unwrap } from "../api/http";

export interface ContactEmail {
  name: string;
  email: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface ContactInformation {
  title: string;
  emails: ContactEmail[];
  phone: string;
  socialLinks: SocialLink[];
}

export interface ContactInformationResponse {
  success: boolean;
  data?: ContactInformation;
  error?: string;
}

export const getContactInformation = async (): Promise<ContactInformationResponse> => {
  const res = await http(ENDPOINTS.General.contactInformation);
  if (!res.ok) return { success: false, error: res.error };
  return { success: true, data: unwrap<ContactInformation>(res.json) };
};
