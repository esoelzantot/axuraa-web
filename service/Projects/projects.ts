import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";
import { Locale, Localized } from "@/lib/i18n";

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
  title: Localized;
  description: Localized;
  icon: string;
}

export interface CaseStudyResult {
  value: string;
  description: Localized;
}

export interface ProjectService {
  _id: string;
  services_id: {
    _id: string;
    title: Localized;
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
  message: Localized;
}

export interface ProjectItem {
  _id: string;
  title: Localized;
  subTitle: Localized;
  project_manager: string;
  overview: Localized;
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

type ProjectsBody = { data?: ProjectItem[] | { projects?: ProjectItem[] }; projects?: ProjectItem[] };

export const getAllProjects = async (lang: Locale = "en"): Promise<ProjectsApiResult> => {
  const res = await http<ProjectsBody>(`${ENDPOINTS.Projects.getAll}?lang=${lang}`);
  if (!res.ok) return { success: false, error: res.error };

  const { data, projects } = res.json;
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.projects)
      ? data.projects
      : Array.isArray(projects)
        ? projects
        : [];

  return { success: true, data: list };
};
