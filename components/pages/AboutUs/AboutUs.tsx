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

interface Props {
  historyData: HistoryJourneyData | null;
  teamMembers: TeamMember[] | null;
  trackRecord: TrackRecordData | null;
}

const AboutUs = ({ historyData, teamMembers, trackRecord }: Props) => {
  return (
    <div className={styles.container}>
      <MainSection trackRecord={trackRecord} />
      <MissionVisionSection />
      <HistorySection journeyData={historyData ?? undefined} />
      <WhyUs />
      <OurTeamSection teamMembers={teamMembers ?? undefined} />
      <SpecialCard />
    </div>
  );
};

export default AboutUs;
