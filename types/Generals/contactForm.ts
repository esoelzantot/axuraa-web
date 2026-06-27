
export interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
  services_interest: string[];
}

export interface FormErrors {
  full_name?: string;
  contact?: string;
  services_interest?: string;
  message?: string;
}

export interface ContactRequest {
  full_name: string;
  email?: string;
  phone_number?: string;
  message: string;
  services_interest: string[];
}

export interface ContactResponse {
  success: boolean;
  data?: FormData;
  message?: string;
  error?: string;
}