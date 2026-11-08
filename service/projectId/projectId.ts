import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";
import { ProjectItem, ProjectApiResult } from "../Projects/projects";
import { Locale } from "@/lib/i18n";

const OBJECT_ID = /^[0-9a-fA-F]{24}$/;

export const getProjectById = async (
  id: string,
  lang: Locale = "en",
): Promise<ProjectApiResult> => {
  if (!OBJECT_ID.test(id)) {
    return { success: false, error: "Invalid project ID" };
  }

  const res = await http<{ data?: ProjectItem | { project?: ProjectItem } }>(
    `${ENDPOINTS.Projects.getById(id)}?lang=${lang}`,
  );
  if (!res.ok) return { success: false, error: res.error };

  const data = res.json.data;
  const project =
    data && "project" in data ? data.project : (data as ProjectItem | undefined);

  if (!project?._id) return { success: false, error: "Project not found" };
  return { success: true, data: project };
};
