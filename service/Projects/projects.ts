import { ENDPOINTS } from '../api/APIs';

export interface LocalizedField {
  en: string;
  ar: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  bio: string;
}

export interface Client {
  _id: string;
  name: string;
  company_name?: string;
  email?: string;
  phone_number?: string;
  country?: string;
  description?: string;
  social_media?: string[];
  image_url?: string;
  project_count?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  id?: string;
}

export interface ProjectFeature {
  title: LocalizedField;
  description: LocalizedField;
  icon: string;
}

export interface CaseStudyResult {
  value: string;
  description: string;
}

export interface ProjectService {
  _id: string;
  services_id: {
    _id: string;
    title: LocalizedField;
    id: string;
  };
  projects_id: string;
}

export interface Testimonial {
  _id: string;
  client_id: {
    _id: string;
    name: string;
    company_name?: string;
    description?: string;
    image_url?: string;
    id?: string;
  };
  project_id: string;
  message: LocalizedField;
}

export interface ProjectItem {
  _id: string;
  title: LocalizedField;
  subTitle: LocalizedField;
  project_manager: string;
  overview: LocalizedField;
  main_image_url?: string;
  second_image_url?: string;
  technology_stack: string[];
  technologies_used?: string[];
  case_study_results: CaseStudyResult[];
  team_members: TeamMember[];
  client_id: Client;
  features: ProjectFeature[];
  services: ProjectService[];
  status: string;
  location: string;
  start_work: string;
  end_work?: string;
  url_deployment?: string;
  testimonials?: Testimonial[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  id?: string;
}

export interface ProjectsApiResult {
  success: boolean;
  data?: ProjectItem[];
  error?: string;
}

export interface ProjectApiResult {
  success: boolean;
  data?: ProjectItem;
  error?: string;
}

export const getAllProjects = async (
  lang: 'en' | 'ar' = 'en'
): Promise<ProjectsApiResult> => {
  try {
    const url = `${ENDPOINTS.Projects.getAll}?lang=${lang}`;
    console.log('=== PROJECTS API DEBUG ===');
    console.log('Fetching all projects from:', url);
    console.log('ENDPOINTS.Projects.getAll:', ENDPOINTS.Projects.getAll);

    const response = await fetch(url, {
      method: 'GET',
    });

    console.log('Response status:', response.status, response.ok);
    console.log('Response headers:', response.headers);

    const json = (await response.json()) as any;
    console.log('=== PROJECTS API DEBUG ===');
    console.log('Raw response:', response);
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    console.log('Projects API Response JSON:', JSON.stringify(json, null, 2));
    console.log('Response data structure:', {
      hasData: !!json?.data,
      hasProjects: !!json?.data?.projects,
      projectsLength: json?.data?.projects?.length || 0,
      dataType: typeof json?.data,
      projectsType: typeof json?.data?.projects,
      fullJson: json
    });

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || `Failed to load projects: ${response.status}`,
      };
    }

    // Try different possible structures
    let projects: ProjectItem[] = [];
    
    if (Array.isArray(json?.data)) {
      projects = json.data;
      console.log('Using json.data directly');
    } else if (Array.isArray(json?.data?.projects)) {
      projects = json.data.projects;
      console.log('Using json.data.projects');
    } else if (Array.isArray(json?.projects)) {
      projects = json.projects;
      console.log('Using json.projects');
    } else {
      console.log('No projects array found in response');
    }
    
    console.log('Extracted projects:', projects);
    console.log('Number of projects extracted:', projects.length);
    
    // Debug: Check if projects have _id fields
    if (projects.length > 0) {
      console.log('First project structure:', projects[0]);
      console.log('First project _id:', projects[0]._id);
      console.log('First project keys:', Object.keys(projects[0]));
    }

    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    console.log('=== PROJECTS API ERROR ===');
    console.log('Error type:', typeof error);
    console.log('Error message:', error instanceof Error ? error.message : error);
    console.log('Full error:', error);
    
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while loading projects',
    };
  }
};

export const getProjectById = async (
  id: string,
  lang: 'en' | 'ar' = 'en'
): Promise<ProjectApiResult> => {
  try {
    const url = `${ENDPOINTS.Projects.getById(id)}?lang=${lang}`;
    console.log('Fetching project by ID:', url);

    const response = await fetch(url, {
      method: 'GET',
    });

    const json = (await response.json()) as any;
    console.log('Project API Response:', json);

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || `Failed to load project: ${response.status}`,
      };
    }

    const project: ProjectItem = json?.data?.project ?? null;

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.log('Project API Error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while loading the project',
    };
  }
};
