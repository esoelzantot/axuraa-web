// components/pages/AboutUs/AboutUs.tsx
"use client";

import styles from "./AboutUs.module.css";
import MainSection from "@/components/Section/AboutUs/MainSection/MainSection";
import MissionVisionSection from "@/components/Section/AboutUs/Mission&VisionSection/Mission&VisionSection";
import HistorySection from "@/components/Section/AboutUs/HistorySection/HistorySection";
import WhyUs from "@/components/Section/AboutUs/WhyUsSection/WhyUs";
import SpecialCard from "@/components/UI/Muscles/SpecialCard/SpecialCard";
import OurTeamSection from "@/components/Section/AboutUs/OurTeamSection/OurTeamSection";
import { TeamMember } from "@/service/TeamMembers/TeamMembers";
import { HistoryJourneyData } from "@/types/AboutUsPage/History/JourneyTypes";
import { TrackRecordData } from "@/service/TrackRecord/trackrecord";
import type { Locale } from "@/lib/i18n";

interface Props {
  historyData: HistoryJourneyData | null;
  teamMembers: TeamMember[] | null;
  trackRecord: TrackRecordData | null;
  locale: Locale;
}

const AboutUs = ({ historyData, teamMembers, trackRecord, locale }: Props) => {
  return (
    <div className={styles.container}>
      <MainSection trackRecord={trackRecord} locale={locale} />
      <MissionVisionSection locale={locale} />
      <HistorySection journeyData={historyData ?? undefined} locale={locale} />
      <WhyUs locale={locale} />
      <OurTeamSection teamMembers={teamMembers ?? undefined} locale={locale} />
      <SpecialCard />
    </div>
  );
};

export default AboutUs;
