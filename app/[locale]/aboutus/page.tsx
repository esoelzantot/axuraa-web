import type { Metadata } from "next";
import { getHistory } from "@/service/ApoutUs/history";
import { getActiveTeamMembers } from "@/service/TeamMembers/TeamMembers";
import { getHomeTrackRecord } from "@/service/TrackRecord/trackrecord";
import AboutUs from "@/components/pages/AboutUs/AboutUs";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getDictionary(locale as Locale).meta.about;
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const [history, team, trackRecord] = await Promise.all([
    getHistory(locale),
    getActiveTeamMembers(locale),
    getHomeTrackRecord(locale),
  ]);

  return (
    <AboutUs
      historyData={history.data ?? null}
      teamMembers={team.data ?? null}
      trackRecord={trackRecord.data ?? null}
      locale={locale}
    />
  );
}
