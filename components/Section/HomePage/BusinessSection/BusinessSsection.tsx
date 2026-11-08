import React from "react";
import Link from "next/link";
import styles from "./BusinessSsection.module.css";
import HomeServiceCard from "@/components/UI/Atoms/HomeServiceCard/HomeServiceCard";
import Badge from "@/components/UI/Atoms/Badge/Badge";
import SeeAllCard from "@/components/UI/Atoms/HomeServiceCard/SeeAllCard";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import { ServiceItem, filterServices } from "@/service/Services/services";
import { Locale, localize } from "@/lib/i18n";

interface BusinessSectionProps {
  services: ServiceItem[];
  locale: Locale;
}

const FALLBACK_SOLUTIONS = [
  {
    id: null,
    title: "Cybersecurity",
    description: "Protect your digital assets with our comprehensive cybersecurity solutions.",
    icon: "/assets/CardIcon.svg",
  },
  {
    id: null,
    title: "Web Development",
    description: "Custom web applications built with modern technologies to meet your business needs.",
    icon: "/assets/CardIcon.svg",
  },
  {
    id: null,
    title: "IT Consulting",
    description: "Expert advice to optimize your IT infrastructure and strategy.",
    icon: "/assets/CardIcon.svg",
  },
];

const linkStyle: React.CSSProperties = { display: "block", height: "100%", color: "inherit", textDecoration: "none" };

const BusinessSection = ({ services, locale }: BusinessSectionProps) => {
  const items = filterServices(services, "solution").slice(0, 3);
  const cards = items.length
    ? items.map((s) => ({
        id: s._id as string | null,
        title: localize(s.title, locale),
        description: localize(s.description, locale),
        icon: s.icon?.trim() || "",
      }))
    : FALLBACK_SOLUTIONS;

  return (
    <section className={styles.servicesSection}>
      <Badge text="Business solutions" show={true} />
      <SectionHeader
        title1="Solutions built"
        title2="for your Business"
        subtitle="Ready-made products we tailor to the way your business works"
        titleLayout="column"
      />
      <div className={styles.servicesGrid}>
        {cards.map((card, index) => {
          const content = (
            <HomeServiceCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              index={index}
              corner="top-right"
              interactive={Boolean(card.id)}
            />
          );
          return card.id ? (
            <Link key={card.id} href={`/${locale}/service/${card.id}`} style={linkStyle}>
              {content}
            </Link>
          ) : (
            <div key={card.title}>{content}</div>
          );
        })}
        <SeeAllCard
          title="See All Solutions"
          description="Explore our full catalog"
          href={`/${locale}/businessSolutions`}
          corner="top-right"
        />
      </div>
    </section>
  );
};

export default BusinessSection;
