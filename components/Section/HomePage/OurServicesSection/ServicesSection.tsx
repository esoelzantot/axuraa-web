import React from "react";
import Link from "next/link";
import styles from "./ServicesSection.module.css";
import HomeServiceCard from "@/components/UI/Atoms/HomeServiceCard/HomeServiceCard";
import Badge from "@/components/UI/Atoms/Badge/Badge";
import SeeAllCard from "@/components/UI/Atoms/HomeServiceCard/SeeAllCard";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import { ServiceItem, filterServices } from "@/service/Services/services";
import { Locale, localize } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

interface ServicesSectionProps {
  services: ServiceItem[];
  locale: Locale;
}

const linkStyle: React.CSSProperties = { display: "block", height: "100%", color: "inherit", textDecoration: "none" };

const ServicesSection = ({ services, locale }: ServicesSectionProps) => {
  const t = getDictionary(locale).home.services;
  const items = filterServices(services, "service").slice(0, 3);
  const cards = items.map((s) => ({
        id: s._id as string | null,
        title: localize(s.title, locale),
        description: localize(s.description, locale),
        icon: s.icon?.trim() || "",
      }));

  return (
    <section className={styles.servicesSection}>
      <Badge text={t.badge} show={true} />
      <SectionHeader
        title1={t.title1}
        title2={t.title2}
        subtitle={t.subtitle}
        titleLayout="column"
      />

      <div className={styles.servicesGrid} data-reveal-stagger>
        {cards.map((card, index) => {
          const content = (
            <HomeServiceCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              index={index}
              corner="bottom-right"
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
          title={t.seeAllTitle}
          description={t.seeAllDescription}
          href={`/${locale}/service`}
          corner="bottom-right"
        />
      </div>
    </section>
  );
};

export default ServicesSection;
