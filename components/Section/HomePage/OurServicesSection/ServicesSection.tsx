import React from "react";
import Link from "next/link";
import styles from "./ServicesSection.module.css";
import Card from "@/components/UI/Atoms/Card/Card";
import Badge from "@/components/UI/Atoms/Badge/Badge";
import DirectionCard from "@/components/UI/Atoms/Card/DirectionCard";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import { ServiceItem, filterServices, serviceIconSrc } from "@/service/Services/services";
import { Locale, localize } from "@/lib/i18n";

interface ServicesSectionProps {
  services: ServiceItem[];
  locale: Locale;
}

const FALLBACK_SERVICES = [
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

const ServicesSection = ({ services, locale }: ServicesSectionProps) => {
  const items = filterServices(services, "service").slice(0, 3);
  const cards = items.length
    ? items.map((s) => ({
        id: s._id as string | null,
        title: localize(s.title, locale),
        description: localize(s.description, locale),
        icon: serviceIconSrc(s.icon),
      }))
    : FALLBACK_SERVICES;

  return (
    <section className={styles.servicesSection}>
      <Badge text="Our Services" show={true} />
      <SectionHeader
        title1="How we help"
        title2="Businesses Grow?"
        subtitle="Discover our comprehensive suite of services designed to elevate your digital presence"
        titleLayout="column"
      />

      <div className={styles.servicesGrid}>
        {cards.map((card) => {
          const content = (
            <Card
              title={card.title}
              description={card.description}
              iconSrc={card.icon}
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
        <DirectionCard
          title="See All Services"
          description="Explore our full catalog"
          iconSrc="/assets/DirectionIcon.svg"
          href={`/${locale}/service`}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
