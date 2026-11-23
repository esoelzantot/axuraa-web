import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";
import type { Locale } from "@/lib/i18n";

export interface SiteContentResult {
  success: boolean;
  /** Dotted dictionary path → text or list, for the requested language. */
  data?: Record<string, unknown>;
  error?: string;
}

/** Site texts edited in the dashboard. Older backends answer 404: no edits. */
export const getSiteContent = async (lang: Locale): Promise<SiteContentResult> => {
  const res = await http<{ data?: unknown }>(`${ENDPOINTS.General.siteContent}?lang=${lang}`);
  if (!res.ok) return { success: false, error: res.error };
  const data = res.json.data;
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { success: false, error: "Invalid site content response" };
  }
  return { success: true, data: data as Record<string, unknown> };
};
