import React from "react";
import styles from "./WorkerSection.module.css";
import Badge from "@/components/UI/Atoms/Badge/Badge";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import DevolpercCard from "@/components/UI/Atoms/DevoleperCard/DevolpercCard";
import { HorizontalScroll } from "@/components/UI/Atoms/ScrollComponents/ScrollComponents";
import { WorkerSectionProps } from "@/types/HomePage/workerTypes";
import { localize } from "@/lib/i18n";

/** Client testimonials ("Our Clients") on the home page. */
const WorkerSection: React.FC<WorkerSectionProps> = ({
  badgeText,
  title1,
  title2,
  subtitle,
  clients,
  locale,
}) => {
  const items = clients.slice(0, 6).map((client) => ({
    id: client._id,
    name: client.name,
    role: client.company_name || client.country,
    // Prefer the client's first testimonial, fall back to their description.
    testimonial:
      localize(client.testimonials?.[0]?.message, locale) || client.description || "",
    avatar: client.image_url || "/assets/axuraa.png",
    rating: client.testimonials?.[0]?.rating,
  }));

  if (items.length === 0) return null;

  return (
    <section className={styles.WorkerSection}>
      <Badge text={badgeText} show={true} />
      <SectionHeader title1={title1} title2={title2} subtitle={subtitle} titleLayout="column" />
      <HorizontalScroll className={styles.WorkerGrid}>
        {items.map((client) => (
          <DevolpercCard
            key={client.id}
            testimonial={client.testimonial}
            authorName={client.name}
            authorRole={client.role}
            avatarSrc={client.avatar}
            rating={client.rating}
          />
        ))}
      </HorizontalScroll>
    </section>
  );
};

export default WorkerSection;
