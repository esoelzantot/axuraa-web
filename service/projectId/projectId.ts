import { ENDPOINTS } from '../api/APIs';
import { ProjectItem, ProjectApiResult } from '../Projects/projects';

export const getProjectById = async (
  id: string,
  lang: 'en' | 'ar' = 'en'
): Promise<ProjectApiResult> => {
  try {
    // Check if ID is a valid MongoDB ObjectId format (24-character hex string)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (!isValidObjectId) {
      console.log('=== PROJECT BY ID API DEBUG ===');
      console.log('Invalid ObjectId format:', id);
      console.log('Expected 24-character hex string, got:', typeof id, id);
      
      return {
        success: false,
        error: `Invalid project ID format: "${id}". Expected MongoDB ObjectId format (24-character hex string).`,
      };
    }

    const url = `${ENDPOINTS.Projects.getById(id)}?lang=${lang}`;
    console.log('=== PROJECT BY ID API DEBUG ===');
    console.log('Fetching project by ID from:', url);
    console.log('Project ID:', id);

    const response = await fetch(url, {
      method: 'GET',
    });

    console.log('Response status:', response.status, response.ok);

    const json = (await response.json()) as any;
    // console.log('=== PROJECT BY ID API DEBUG ===');
    // console.log('Raw response JSON:', JSON.stringify(json, null, 2));
    // console.log('Response data structure:', {
    //   hasData: !!json?.data,
    //   hasProject: !!json?.data?.project,
    //   dataType: typeof json?.data,
    //   dataKeys: json?.data ? Object.keys(json.data) : 'no data',
    //   fullJson: json
    // });

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || `Failed to load project: ${response.status}`,
      };
    }

    // API returns the project object directly under data
    const project = json?.data as ProjectItem | undefined;
    console.log('Extracted project:', project);
    console.log('Project title:', project?.title);
    console.log('Project exists:', !!project);

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.log('=== PROJECT BY ID API ERROR ===');
    console.log('Error type:', typeof error);
    console.log('Error message:', error instanceof Error ? error.message : error);
    console.log('Full error:', error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while loading the project',
    };
  }
};