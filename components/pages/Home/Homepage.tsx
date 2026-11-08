import React from "react";
import styles from "./Homepage.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import ContactSection from "@/components/Section/HomePage/ContactSection/ContactSection";
import ServicesSection from "@/components/Section/HomePage/OurServicesSection/ServicesSection";
import BusinessSection from "@/components/Section/HomePage/BusinessSection/BusinessSsection";
import RatingSection from "@/components/Section/HomePage/RatingSection/RatingSection";
import ProjectSection from "@/components/Section/HomePage/ProjectSection/ProjectSection";
import WorkerSection from "@/components/Section/HomePage/WorkerSection/WorkerSection";
import { getContactInformation } from "@/service/Contact/contactinformation";
import { getAllServices } from "@/service/Services/services";
import { getAllProjects } from "@/service/Projects/projects";
import { getAllClients } from "@/service/Clients/Clients";
import { getHomePartners } from "@/service/partners/partners";
import { getHomeTrackRecord, toRatingItems } from "@/service/TrackRecord/trackrecord";
import { Locale } from "@/lib/i18n";

/**
 * Home page, rendered on the server for both `/` and `/[locale]`.
 * All sections get their data from here (one parallel round of requests,
 * cached by the data cache) instead of each section fetching in the browser.
 */
const Homepage = async ({ locale }: { locale: Locale }) => {
  const [contact, services, projects, clients, partners, trackRecord] = await Promise.all([
    getContactInformation(),
    getAllServices(locale),
    getAllProjects(locale),
    getAllClients(),
    getHomePartners(),
    getHomeTrackRecord(locale),
  ]);

  const serviceList = services.data ?? [];

  return (
    <div className={styles.homePage}>
      <HeroSection
        primaryHref={`/${locale}#contact-home-form`}
        title1="Welcome to Axuraa"
        title2="Building Digital Excellence"
        subtitle1="Transforming ideas into powerful digital experiences."
        badgeText="INNOVATION IN PROGRESS"
        showStatusBadge={false}
        backgroundType="Hexagon"
        height="100vh"
        partners={partners.data?.partners}
      />

      <div id="home-page" style={{ margin: 0, padding: 0, height: 0 }} />
      <ServicesSection services={serviceList} locale={locale} />
      <BusinessSection services={serviceList} locale={locale} />

      <RatingSection
        badgeText="Our Achievements"
        title1="Our Track Record"
        title2="in Numbers"
        subtitle={trackRecord.data?.title || "Results we have delivered for our clients"}
        ratingItems={toRatingItems(trackRecord.data?.records)}
      />

      <ProjectSection
        badgeText="Our Projects"
        title1="A Showcase of"
        title2="Our Recent Work"
        subtitle="Explore some of the projects we've delivered for our clients"
        seeAllText="View All Projects"
        projects={projects.data ?? []}
        services={serviceList}
        locale={locale}
      />

      <WorkerSection
        badgeText="Our Clients"
        title1="What Our"
        title2="Clients Say"
        subtitle="Hear from the businesses we have partnered with"
        clients={clients.data ?? []}
        locale={locale}
      />

      {/* Anchor target for "Start a Project" buttons (#contact-home-form). */}
      <div id="contact-home-form" style={{ margin: 0, padding: 0, height: 0 }} />

      <ContactSection
        badgeText="Contact Us"
        title1="Let's Build"
        title2="Something Great Together"
        subtitle="Reach out to discuss your next project with our team"
        contactData={contact.data ?? null}
      />
    </div>
  );
};

export default Homepage;
