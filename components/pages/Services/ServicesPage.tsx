// components/pages/Services/ServicesPage.tsx
"use client";

import React from "react";
import styles from "./ServicesPage.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import ServiceCard from "@/components/Molecules/ServiceCard/ServiceCard";
import { ServiceItem } from "@/service/Services/services";

interface Props {
  services: ServiceItem[];
  locale: "en" | "ar";
}

const ServicesPage: React.FC<Props> = ({ services, locale }) => {
  return (
    <div className={styles.servicesPage}>
      <HeroSection
        primaryHref={`/${locale}/contact#contact-form`}
        title1="Architecting the Future of"
        title2="Digital Business."
        subtitle1="At Axuraa, we don't just write code. We build the digital infrastructure that powers the world's most ambitious companies."
        badgeText="INNOVATION IN PROGRESS"
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

      <div className={styles.servicesContainer}>
        {services.length === 0 && (
          <p style={{ color: "#fff", textAlign: "center" }}>
            No services available.
          </p>
        )}

        {services.map((service) => {
          // API returns plain strings — no locale extraction needed
          const title =
            typeof service.title === "string"
              ? service.title
              : service.title?.[locale] || service.title || "";

          const description =
            typeof service.description === "string"
              ? service.description
              : service.description?.[locale] || service.description || "";

          const features = service.what_we_do?.units
            ? service.what_we_do.units
                .map((u) => (typeof u === "string" ? u : u[locale] || u || ""))
                .filter(Boolean)
            : [];

          return (
            <ServiceCard
              key={service._id}
              id={service._id}
              title={title}
              description={description}
              features={features}
              iconUrl={service.icon}
              locale={locale}
              buttonText={locale === "ar" ? "عرض التفاصيل" : "Learn More"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ServicesPage);
