import { ENDPOINTS } from "../api/APIs";
import { http, unwrap } from "../api/http";
import { Locale } from "@/lib/i18n";
import { RatingItem } from "@/types/HomePage/ratingTypes";

export interface TrackRecordItem {
  id: number;
  label: string;
  value: number;
  icon: string;
  suffix?: "" | "%" | "+";
}

export interface TrackRecordData {
  title: string;
  records: TrackRecordItem[];
}

export interface TrackRecordApiResult {
  success: boolean;
  data?: TrackRecordData;
  error?: string;
}

/** Maps API records to the `Rating` component's items, inferring a suffix when the API omits it. */
export const toRatingItems = (records: TrackRecordItem[] | undefined): RatingItem[] =>
  (records ?? []).map((record) => ({
    id: record.id,
    value: record.value,
    label: record.label,
    icon: "/assets/RatingIcon.svg",
    showIcon: true,
    suffix: record.suffix ?? (record.value >= 1000 ? "+" : record.value === 100 ? "%" : ""),
  }));

export const getHomeTrackRecord = async (
  lang: Locale = "en",
): Promise<TrackRecordApiResult> => {
  const res = await http(`${ENDPOINTS.Home.trackRecord}?lang=${lang}`);
  if (!res.ok) return { success: false, error: res.error };
  return { success: true, data: unwrap<TrackRecordData>(res.json) };
};
