import { ENDPOINTS } from '../api/APIs';

/**
 * Contact information types
 */
export interface ContactEmail {
  name: string;
  email: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string; // Optional icon URL from API
}

export interface ContactInformation {
  title: string;
  emails: ContactEmail[];
  phone: string;
  socialLinks: SocialLink[];
}

/**
 * Response type for contact information API
 */
export interface ContactInformationResponse {
  success: boolean;
  data?: ContactInformation;
  message?: string;
  error?: string;
}

/**
 * Get contact information from API
 */
export const getContactInformation = async (): Promise<ContactInformationResponse> => {
  try {
    console.log('=== CONTACT INFORMATION API DEBUG ===');
    console.log('Fetching contact information from:', ENDPOINTS.General.contactInformation);
    
    const response = await fetch(ENDPOINTS.General.contactInformation, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status, response.ok);

    const data = await response.json();
    console.log('Contact information response:', data);
    console.log('Response structure:', {
      title: data?.title,
      hasEmails: !!data?.emails,
      emailsCount: data?.emails?.length || 0,
      hasPhone: !!data?.phone,
      hasSocialLinks: !!data?.socialLinks,
      socialLinksCount: data?.socialLinks?.length || 0
    });

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to fetch contact information (${response.status})`,
      };
    }

    return {
      success: true,
      data: data,
      message: 'Contact information fetched successfully',
    };
  } catch (error) {
    console.error('=== CONTACT INFORMATION API ERROR ===');
    console.error('Error fetching contact information:', error);
    console.error('Endpoint:', ENDPOINTS.General.contactInformation);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred while fetching contact information',
    };
  }
};