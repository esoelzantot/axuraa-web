// components/pages/Services/ServicesPage.tsx
"use client";

import React from "react";
import styles from "./ServicesPage.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import { getDictionary } from "@/lib/dictionaries";
import ServiceCard from "@/components/Molecules/ServiceCard/ServiceCard";
import { ServiceItem } from "@/service/Services/services";
import { Locale, localize } from "@/lib/i18n";

interface Props {
  services: ServiceItem[];
  locale: Locale;
}

const ServicesPage: React.FC<Props> = ({ services, locale }) => {
  const t = getDictionary(locale);
  return (
    <div className={styles.servicesPage}>
      <HeroSection
        primaryHref={`/${locale}/contact#contact-form`}
        title1={t.listingHero.title1}
        title2={t.listingHero.title2}
        subtitle1={t.listingHero.subtitle}
        badgeText={t.hero.innovationBadge}
        showBackgroundDots={false}
        showAnimatedCircles={true}
        showEllipseDecorations={true}
        showBadge={false}
        showTrustedSection={false}
        showPrimaryButton={true}
        showSecondaryButton={false}
        backgroundType="Circle"
        showStatusBadge={true}
        height="70vh"
      />

      <div className={styles.servicesContainer} data-reveal-stagger>
        {services.length === 0 && (
          <p style={{ color: "#fff", textAlign: "center" }}>
            {t.common.noServices}
          </p>
        )}

        {services.map((service, index) => {
          const title = localize(service.title, locale);
          const description = localize(service.description, locale);
          const features = (service.what_we_do?.units ?? [])
            .map((u) => localize(u, locale))
            .filter(Boolean);

          return (
            <ServiceCard
              key={service._id}
              id={service._id}
              title={title}
              description={description}
              features={features}
              iconUrl={service.icon}
              index={index}
              variant="service"
              locale={locale}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ServicesPage);
