import { ENDPOINTS } from '../api/APIs';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://back-end-axuraa.fly.dev';

// Team Member Role interface
export interface TeamMemberRole {
  _id: string;
  title: string;
  level: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Team Member interface
export interface TeamMember {
  _id: string;
  name: string;
  email: string;
  phone_number?: string | null;
  role_id: TeamMemberRole;
  bio: string;
  image_url: string;
  status: string;
  technologies_used: string[];
  start_at: string;
  is_displayed_in_website: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

// API Response interface
export interface TeamMembersResponse {
  status: string;
  message: string;
  data: TeamMember[];
}

// Get all team members
export const getAllTeamMembers = async (): Promise<{ success: boolean; data?: TeamMember[]; error?: string }> => {
  try {
    const url = ENDPOINTS.TeamMembers.getAll;
    const response = await fetch(url, {
      method: 'GET',
    });

    const json = (await response.json()) as any;

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || `Failed to load team members: ${response.status}`,
      };
    }

    if (json.status === 'success') {
      return {
        success: true,
        data: json.data,
      };
    } else {
      return {
        success: false,
        error: json.message || 'Failed to fetch team members'
      };
    }
  } catch (error) {
    console.error('Error fetching team members:', error);
    return {
      success: false,
      error: 'Failed to fetch team members. Please try again later.'
    };
  }
};

// Get team member by ID
export const getTeamMemberById = async (id: string): Promise<{ success: boolean; data?: TeamMember; error?: string }> => {
  try {
    const url = ENDPOINTS.TeamMembers.getById(id);
    const response = await fetch(url, {
      method: 'GET',
    });

    const json = (await response.json()) as any;

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || `Failed to load team member: ${response.status}`,
      };
    }

    if (json.status === 'success') {
      return {
        success: true,
        data: json.data
      };
    } else {
      return {
        success: false,
        error: json.message || 'Failed to fetch team member'
      };
    }
  } catch (error) {
    console.error('Error fetching team member:', error);
    return {
      success: false,
      error: 'Failed to fetch team member. Please try again later.'
    };
  }
};

// Get active team members only
export const getActiveTeamMembers = async (): Promise<{ success: boolean; data?: TeamMember[]; error?: string }> => {
  try {
    const result = await getAllTeamMembers();
    
    if (result.success && result.data) {
      const activeMembers = result.data.filter(member => member.status === 'active');
      return {
        success: true,
        data: activeMembers
      };
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching active team members:', error);
    return {
      success: false,
      error: 'Failed to fetch active team members. Please try again later.'
    };
  }
};

// Get team members by role level
export const getTeamMembersByRoleLevel = async (level: number): Promise<{ success: boolean; data?: TeamMember[]; error?: string }> => {
  try {
    const result = await getAllTeamMembers();
    
    if (result.success && result.data) {
      const membersByLevel = result.data.filter(member => member.role_id.level === level);
      return {
        success: true,
        data: membersByLevel
      };
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching team members by role level:', error);
    return {
      success: false,
      error: 'Failed to fetch team members by role level. Please try again later.'
    };
  }
};