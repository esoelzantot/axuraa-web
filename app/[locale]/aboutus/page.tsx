import type { Metadata } from "next";
import { getHistory } from "@/service/ApoutUs/history";
import { getActiveTeamMembers } from "@/service/TeamMembers/TeamMembers";
import { getHomeTrackRecord } from "@/service/TrackRecord/trackrecord";
import AboutUs from "@/components/pages/AboutUs/AboutUs";
import { Locale } from "@/lib/i18n";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description: "Our story, mission, values and the team behind Axuraa.",
};

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const [history, team, trackRecord] = await Promise.all([
    getHistory(),
    getActiveTeamMembers(),
    getHomeTrackRecord(locale),
  ]);

  return (
    <AboutUs
      historyData={history.data ?? null}
      teamMembers={team.data ?? null}
      trackRecord={trackRecord.data ?? null}
    />
  );
}
