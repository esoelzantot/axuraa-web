import { ENDPOINTS } from '../api/APIs';
import { ContactRequest, ContactResponse } from '@/types/Generals/contactForm';

/**
 * Create a new contact request
 */
export const create = async (contactData: ContactRequest): Promise<ContactResponse> => {
    console.log('=== CONTACT FORM API DEBUG ===');
    console.log('Creating contact request with data:', contactData);
    console.log('Services array:', contactData.services_interest);
    console.log('Services detail:', JSON.stringify(contactData.services_interest, null, 2));
    
    try {
    const response = await fetch(ENDPOINTS.Contact.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    console.log('Response status:', response.status, response.ok);

    const data = await response.json();
    console.log('Response data:', data);
    console.log('Response structure:', {
      status: data?.status,
      message: data?.message,
      hasData: !!data?.data,
      dataKeys: data?.data ? Object.keys(data.data) : 'no data',
      errors: data?.errors
    });

    if (!response.ok) {
      return {
        success: false,
        error: data.errors?.join(', ') || data.message || `Failed to submit contact request (${response.status})`,
      };
    }

    // Check if the API response matches expected structure
    if (data.status === 'success' && data.data) {
      return {
        success: true,
        data: data.data.contactRequest || data.data,
        message: data.message || 'Contact request submitted successfully',
      };
    } else {
      return {
        success: false,
        error: data.message || 'Unexpected response format from server',
      };
    }
  } catch (error) {
    console.error('=== CONTACT FORM API ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : error);
    console.error('Full error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred while submitting the contact request',
    };
  }
};
