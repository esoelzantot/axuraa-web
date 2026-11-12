import type { Locale } from "@/lib/i18n";
import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";

export interface TeamMemberRole {
  _id: string;
  title: string;
  level: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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

type TeamMembersResult = { success: boolean; data?: TeamMember[]; error?: string };

export const getAllTeamMembers = async (lang: Locale = "en"): Promise<TeamMembersResult> => {
  const res = await http<{ status?: string; message?: string; data?: TeamMember[] }>(
    `${ENDPOINTS.TeamMembers.getAll}?lang=${lang}`,
  );
  if (!res.ok) return { success: false, error: res.error };
  if (res.json.status !== "success" || !Array.isArray(res.json.data)) {
    return { success: false, error: res.json.message || "Failed to fetch team members" };
  }
  return { success: true, data: res.json.data };
};

/** Active members only. */
export const getActiveTeamMembers = async (lang: Locale = "en"): Promise<TeamMembersResult> => {
  const result = await getAllTeamMembers(lang);
  if (!result.success || !result.data) return result;
  return {
    success: true,
    data: result.data.filter((member) => member.status === "active"),
  };
};
