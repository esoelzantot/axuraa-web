import { ENDPOINTS } from '../api/APIs';

/**
 * Email contact item structure
 */
export interface EmailContact {
    name: string;
    email: string;
    description: string;
    icon: string;
}

/**
 * Social link item structure
 */
export interface SocialLink {
    name: string;
    url: string;
}

/**
 * Contact information data structure
 */
export interface ContactInformationData {
    emails: EmailContact[];
    phone: string;
    socialLinks: SocialLink[];
}

/**
 * Response type for contact information API
 */
export interface ContactInformationResponse {
    success: boolean;
    data?: ContactInformationData;
    message?: string;
    error?: string;
}

/**
 * Get contact information data from the API
 */
export const getContactInformation = async (): Promise<ContactInformationResponse> => {
    try {
        const response = await fetch(ENDPOINTS.General.contactInformation, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Failed to fetch contact information',
            };
        }

        return {
            success: true,
            data,
            message: 'Contact information fetched successfully',
        };
    } catch (error) {
        console.error('Error fetching contact information:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
};
