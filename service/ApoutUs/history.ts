import { ENDPOINTS } from "../api/APIs";
import { http, unwrap } from "../api/http";
import { HistoryJourneyData } from "@/types/AboutUsPage/History/JourneyTypes";
import type { Locale } from "@/lib/i18n";

export interface HistoryResponse {
  success: boolean;
  data?: HistoryJourneyData;
  error?: string;
}

export const getHistory = async (lang: Locale = "en"): Promise<HistoryResponse> => {
  const res = await http(`${ENDPOINTS.AboutUs.history}?lang=${lang}`);
  if (!res.ok) return { success: false, error: res.error };
  return { success: true, data: unwrap<HistoryJourneyData>(res.json) };
};
