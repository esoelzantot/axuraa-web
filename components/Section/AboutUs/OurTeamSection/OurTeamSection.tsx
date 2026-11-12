// components/Section/AboutUs/OurTeamSection/OurTeamSection.tsx
import React from "react";
import styles from "./OurTeamSection.module.css";
import TeamCard from "@/components/UI/Muscles/TeamCard/TeamCard";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import StatusBadge from "@/components/UI/Atoms/StatusBadge/StatusBadge";
import { TeamMember } from "@/service/TeamMembers/TeamMembers";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

interface TeamSectionProps {
  teamMembers?: TeamMember[];
  locale: Locale;
}

function processTeamMembers(members: TeamMember[], founderSuffix: string): TeamMember[] {
  return members
    .filter((m) => m.is_displayed_in_website)
    .map((member) => {
      const isFounder =
        member.role_id.title.toLowerCase().includes("ceo") ||
        member.bio.toLowerCase().includes("founder");

      if (isFounder && !member.role_id.title.includes("Founder")) {
        return {
          ...member,
          role_id: {
            ...member.role_id,
            title: `${member.role_id.title}${founderSuffix}`,
          },
        };
      }
      return member;
    });
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers = [], locale }) => {
  const t = getDictionary(locale).about.team;
  const displayedMembers = processTeamMembers(teamMembers, t.founderSuffix);

  // Don't render the section at all if no members
  if (displayedMembers.length === 0) return null;

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <StatusBadge text={t.badge} className={styles.badge} />
          <SectionHeader
            title1=""
            title2={t.title}
            subtitle={t.subtitle}
          />
        </div>

        <div className={styles.teamGrid} data-reveal-stagger>
          {displayedMembers.map((member, i) => (
            <TeamCard
              key={member._id}
              index={i}
              name={member.name}
              role={member.role_id.title || member.role_id.description || ""}
              imageUrl={member.image_url}
              description={member.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
