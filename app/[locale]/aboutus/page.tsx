// app/about-us/page.tsx  (or app/en/about-us/page.tsx)
import { getHistory } from "@/service/ApoutUs/history";
import { getActiveTeamMembers } from "@/service/TeamMembers/TeamMembers";
import { getHomeTrackRecord } from "@/service/TrackRecord/trackrecord";
import AboutUs from "@/components/pages/AboutUs/AboutUs";

export default async function AboutUsPage() {
  const [historyResult, teamResult, trackRecordResult] = await Promise.all([
    getHistory(),
    getActiveTeamMembers(),
    getHomeTrackRecord("en"),
  ]);

  return (
    <AboutUs
      historyData={historyResult.data ?? null}
      teamMembers={teamResult.data ?? null}
      trackRecord={trackRecordResult.data ?? null}
    />
  );
}
