// components/pages/ServicePage/ServicePage.tsx
"use client";

import React from "react";
import styles from "./ServicePage.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import TechnologiesUsed from "@/components/Molecules/TechnologiesUsed/TechnologiesUsed";
import FeaturesContainer from "@/components/Molecules/FeaturesContainer/FeaturesContainer";
import OurDevelopmentContainer from "@/components/Molecules/OurDevelopmentContainer.tsx/OurDevelopmentContainer";
import SuccessStoriesContainer from "@/components/Molecules/SuccessStoriesContainer/SuccessStoriesContainer";
import Image from "next/image";
import ServicePackagesContainer from "@/components/Molecules/ServicePackagesContainer/ServicePackagesContainer";
import StatusBadge from "@/components/UI/Atoms/StatusBadge/StatusBadge";
import { ServiceItem } from "@/service/serviceId/serviceId";

// Helper — handles both plain strings and localized objects
function getStr(field: unknown, locale: "en" | "ar"): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const f = field as Record<string, string>;
    return f[locale] || f["en"] || Object.values(f)[0] || "";
  }
  return "";
}

interface Props {
  service: ServiceItem;
  locale: "en" | "ar";
}

const developmentProcess = [
  {
    id: 1,
    title: "Discovery",
    description:
      "We analyze your requirements and create a detailed project plan.",
    icon: "1",
  },
  {
    id: 2,
    title: "Design",
    description:
      "Our designers create wireframes and UI/UX designs for your approval.",
    icon: "2",
  },
  {
    id: 3,
    title: "Development",
    description:
      "Our developers bring the design to life with clean, efficient code.",
    icon: "3",
  },
  {
    id: 4,
    title: "Testing",
    description:
      "We thoroughly test all features to ensure quality and performance.",
    icon: "4",
  },
  {
    id: 5,
    title: "Launch & Support",
    description:
      "We deploy your project and provide ongoing support and maintenance.",
    icon: "5",
  },
];

const servicePackages = [
  {
    title: "Starter Package",
    description: "Perfect for small businesses",
    price: "$99/month",
    features: [
      "5 pages website",
      "Mobile responsive",
      "Basic SEO",
      "Contact form",
      "1 month support",
      "E-commerce integration",
      "Analytics dashboard",
    ],
    isPopular: false,
    hasButtonBackground: false,
    hasShadow: false,
  },
  {
    title: "Professional Package",
    description: "Ideal for growing businesses",
    price: "$199/month",
    features: [
      "10 pages website",
      "Mobile responsive",
      "Advanced SEO",
      "Contact form",
      "3 months support",
      "E-commerce integration",
      "Analytics dashboard",
    ],
    isPopular: true,
    hasButtonBackground: true,
    hasShadow: true,
  },
  {
    title: "Enterprise Package",
    description: "For large scale businesses",
    price: "$399/month",
    features: [
      "Unlimited pages",
      "Mobile responsive",
      "Premium SEO",
      "Advanced forms",
      "6 months support",
      "E-commerce integration",
      "Analytics dashboard",
    ],
    isPopular: false,
    hasButtonBackground: false,
    hasShadow: false,
  },
];

const ServicePage: React.FC<Props> = ({ service, locale }) => {
  const features =
    service.features?.map((f, i) => ({
      id: i + 1,
      title: getStr(f.title, locale),
      description: getStr(f.description, locale),
      iconUrl: f.icon || "/assets/Frame.svg",
    })) ?? [];

  const successStories =
    service.projects?.map(({ projects_id: p }) => ({
      id: p._id,
      title: getStr(p.title, locale),
      description: getStr(p.overview, locale),
      iconUrl: p.main_image_url || "/assets/Frame.svg",
      metrics:
        p.case_study_results?.map((r) => ({
          label: getStr(r.description, locale),
          value: r.value,
          valueColor: "#D04A1D",
        })) ?? [],
    })) ?? [];

  const technologies = service.technologies_used?.map((t) => t.name) ?? [];

  const units = service.what_we_do?.units ?? [];

  return (
    <div className={styles.servicePage}>
      <HeroSection
        primaryHref={`/${locale}/contact#contact-form`}
        title1={getStr(service.title, locale) || "Service"}
        title2=""
        subtitle1={getStr(service.description, locale) || "Service description"}
        badgeText="INNOVATION IN PROGRESS"
        showBackgroundDots={false}
        showAnimatedCircles={true}
        showBadge={false}
        showTrustedSection={false}
        showPrimaryButton={true}
        showSecondaryButton={false}
        showEllipseDecorations={true}
        showStatusBadge={true}
        backgroundType="Circle"
        height="70vh"
      />

      <div className={styles.contentSection1}>
        <div className={styles.contentSection2}>
          <h1 className={styles.contentSection2Title}>What We Do</h1>
          <p className={styles.contentSection2Description}>
            {getStr(service.what_we_do?.description, locale) ||
              "Our experts build exceptional digital experiences."}
          </p>
          <ul className={styles.serviceList}>
            {units.length > 0 ? (
              units.map((unit, i) => (
                <li key={i} className={styles.serviceItem}>
                  <svg
                    className={styles.serviceIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 1.66675C5.4 1.66675 1.66666 5.40008 1.66666 10.0001C1.66666 14.6001 5.4 18.3334 10 18.3334C14.6 18.3334 18.3333 14.6001 18.3333 10.0001C18.3333 5.40008 14.6 1.66675 10 1.66675ZM8.33333 15L3.33333 10.0001L4.55 8.78341L8.33333 12.5584L15.45 5.44175L16.6667 6.66675L8.33333 15Z"
                      fill="#D04A1D"
                    />
                  </svg>
                  <span className={styles.serviceContent}>
                    {getStr(unit, locale)}
                  </span>
                </li>
              ))
            ) : (
              <li className={styles.serviceItem}>
                <svg
                  className={styles.serviceIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 1.66675C5.4 1.66675 1.66666 5.40008 1.66666 10.0001C1.66666 14.6001 5.4 18.3334 10 18.3334C14.6 18.3334 18.3333 14.6001 18.3333 10.0001C18.3333 5.40008 14.6 1.66675 10 1.66675ZM8.33333 15L3.33333 10.0001L4.55 8.78341L8.33333 12.5584L15.45 5.44175L16.6667 6.66675L8.33333 15Z"
                    fill="#D04A1D"
                  />
                </svg>
                <span className={styles.serviceContent}>
                  Custom application and platform development
                </span>
              </li>
            )}
          </ul>
        </div>
        <TechnologiesUsed technologies={technologies} />
      </div>

      <div className={styles.FeaturesCapabilities}>
        <div className={styles.FeaturesCapabilitiesContent}>
          <StatusBadge
            text="OUR FEATURES"
            className={styles.FeaturesStatusBadge}
          />
          <h1 className={styles.FeaturesCapabilitiesTitle}>
            Features & Capabilities
          </h1>
          <p className={styles.FeaturesCapabilitiesDescription}>
            {getStr((service as any).description_features, locale) ||
              "Comprehensive services designed to build and scale your digital presence."}
          </p>
        </div>
        <div className={styles.FeaturesCapabilitiesContainer}>
          <FeaturesContainer features={features} />
        </div>
      </div>

      <div className={styles.OurDevelopmentProcess}>
        <div className={styles.OurDevelopmentProcessContent}>
          <StatusBadge
            text="OUR PROCESS"
            className={styles.DevelopmentStatusBadge}
          />
          <h1 className={styles.OurDevelopmentProcessTitle}>
            Our Development Process
          </h1>
          <p className={styles.OurDevelopmentProcessDescription}>
            A systematic approach that ensures a high-quality product through
            discovery, design, implementation, and support.
          </p>
        </div>
        <div className={styles.OurDevelopmentContainer}>
          <OurDevelopmentContainer steps={developmentProcess} />
        </div>
      </div>

      <div className={styles.SuccessStories}>
        <StatusBadge text="OUR STORIES" className={styles.StoriesStatusBadge} />
        <div className={styles.SuccessStoriesContent}>
          <h1 className={styles.SuccessStoriesTitle}>Success Stories</h1>
          <p className={styles.SuccessStoriesDescription}>
            {getStr((service as any).description_stories, locale) ||
              "Real results demonstrating measurable improvements in digital performance."}
          </p>
        </div>
        <div className={styles.SuccessStoriesContainer}>
          <SuccessStoriesContainer stories={successStories} />
        </div>
        <div className={styles.testimonialSection}>
          <div className={styles.testimonialContent}>
            <Image
              src="/assets/SuccessStories/AndAnd.svg"
              alt="And"
              className={styles.andIcon}
              width={30}
              height={30}
            />
            <p className={styles.testimonialText}>
              "The team completely transformed our online presence. Their design
              sense is brilliant, and the development process was smooth and
              transparent."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorIcon}>
                <Image
                  src="/assets/SuccessStories/Frame.png"
                  alt="Author"
                  className={styles.authorImage}
                  width={28}
                  height={28}
                />
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Sarah Johnson</span>
                <span className={styles.authorRole}>CEO, TechStart Inc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ServicePackages}>
        <div className={styles.ServicePackagesContent}>
          <StatusBadge text="OUR PACKAGES" />
          <h1 className={styles.ServicePackagesTitle}>Service Packages</h1>
          <p className={styles.ServicePackagesDescription}>
            Choose the solution that fits your business needs.
          </p>
        </div>
        <div className={styles.ServicePackagesContainer}>
          <ServicePackagesContainer
            packages={servicePackages}
            locale={locale}
          />
        </div>
        <div className={styles.ctaSection}>
          <div className={styles.ctaText}>
            <h1 className={styles.ctaText1}>Free Project Consultation</h1>
            <p className={styles.ctaText2}>
              Get a comprehensive evaluation of your project goals with our
              complimentary assessment.
            </p>
          </div>
          <button
            className={styles.ctaButton}
            onClick={() =>
              (window.location.href = `/${locale}/contact#contact-form`)
            }
          >
            Schedule Free Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServicePage);
