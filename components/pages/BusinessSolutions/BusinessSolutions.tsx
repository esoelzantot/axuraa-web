// components/pages/BusinessSolutions/BusinessSolutions.tsx
"use client";

import React from "react";
import styles from "./BusinessSolutions.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
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
  locale: string;
}

const BusinessSolutions = ({ services, locale }: Props) => {
  return (
    <div className={styles.BusinessPage}>
      <HeroSection
        primaryHref={`/${locale}/contact#contact-form`}
        title1="Architecting Future of"
        title2="Digital Business."
        subtitle1="At Axuraa, we don't just write code. We build digital infrastructure that powers world's most ambitious companies."
        badgeText="INNOVATION IN PROGRESS"
        showBackgroundDots={false}
        showAnimatedCircles={true}
        showEllipseDecorations={true}
        showBadge={false}
        showTrustedSection={false}
        showPrimaryButton={true}
        showSecondaryButton={false}
        height="75vh"
        showStatusBadge={true}
        backgroundType="Circle"
      />

      <div className={styles.BusinessContainer}>
        {services.length === 0 ? (
          <div className={styles.sectionError}>No services available.</div>
        ) : (
          services.map((service) => (
            <ServiceCard key={service.id} {...service} locale={locale} />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(BusinessSolutions);
