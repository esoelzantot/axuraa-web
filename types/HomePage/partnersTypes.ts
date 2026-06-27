/**
 * Partner item type
 */
export interface Partner {
  id: number;
  name: string;
  icon: string;
  website: string;
}

/**
 * Partners data structure
 */
export interface PartnersData {
  title: string;
  partners: Partner[];
}

/**
 * Response type for partners API
 */
export interface PartnersResponse {
  success: boolean;
  data?: PartnersData;
  message?: string;
  error?: string;
}
