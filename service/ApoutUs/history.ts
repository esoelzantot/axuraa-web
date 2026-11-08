import { ENDPOINTS } from "../api/APIs";
import { http, unwrap } from "../api/http";
import { HistoryJourneyData } from "@/types/AboutUsPage/History/JourneyTypes";

export interface HistoryResponse {
  success: boolean;
  data?: HistoryJourneyData;
  error?: string;
}

export const getHistory = async (): Promise<HistoryResponse> => {
  const res = await http(ENDPOINTS.AboutUs.history);
  if (!res.ok) return { success: false, error: res.error };
  return { success: true, data: unwrap<HistoryJourneyData>(res.json) };
};
