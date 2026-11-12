// components/pages/BusinessSolutions/BusinessSolutions.tsx
"use client";

import React from "react";
import styles from "./BusinessSolutions.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import ServiceCard from "@/components/Molecules/ServiceCard/ServiceCard";

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  iconUrl: string;
}

interface Props {
  services: ServiceCardData[];
  locale: Locale;
}

const BusinessSolutions = ({ services, locale }: Props) => {
  const t = getDictionary(locale);
  return (
    <div className={styles.BusinessPage}>
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
        height="70vh"
        showStatusBadge={true}
        backgroundType="Circle"
      />

      <div className={styles.BusinessContainer} data-reveal-stagger>
        {services.length === 0 ? (
          <div className={styles.sectionError}>{t.common.noServices}</div>
        ) : (
          services.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              index={index}
              variant="solution"
              locale={locale}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(BusinessSolutions);
