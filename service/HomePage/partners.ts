import { PartnersResponse } from '@/types/HomePage/partnersTypes';
import { ENDPOINTS } from '../api/APIs';

/**
 * Get partners data from the API
 */
export const getPartners = async (): Promise<PartnersResponse> => {
    try {
        const response = await fetch(ENDPOINTS.Home.partners, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Failed to fetch partners data',
            };
        }

        return {
            success: true,
            data,
            message: 'Partners data fetched successfully',
        };
    } catch (error) {
        console.error('Error fetching partners data:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
};
