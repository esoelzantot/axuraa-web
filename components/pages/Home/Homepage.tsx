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
import { cmsText, getDictionary } from "@/lib/dictionaries";

/**
 * Home page (`/[locale]`), rendered on the server.
 * All sections get their data from here (one parallel round of requests,
 * cached by the data cache) instead of each section fetching in the browser.
 */
const Homepage = async ({ locale }: { locale: Locale }) => {
  const [contact, services, projects, clients, partners, trackRecord] = await Promise.all([
    getContactInformation(locale),
    getAllServices(locale),
    getAllProjects(locale),
    getAllClients(),
    getHomePartners(),
    getHomeTrackRecord(locale),
  ]);

  const serviceList = services.data ?? [];
  const t = getDictionary(locale);
  // Track-record labels only come back in English from the CMS; translate the known ones.
  const ratingItems = toRatingItems(trackRecord.data?.records).map((item) => ({
    ...item,
    label: cmsText(item.label, locale),
  }));

  return (
    <div className={styles.homePage}>
      <HeroSection
        primaryHref={`/${locale}#contact-home-form`}
        title1={t.home.hero.title1}
        title2={t.home.hero.title2}
        subtitle1={t.home.hero.subtitle}
        badgeText={t.hero.innovationBadge}
        showStatusBadge={false}
        backgroundType="Hexagon"
        height="100vh"
        partners={partners.data?.partners}
      />

      <div id="home-page" style={{ margin: 0, padding: 0, height: 0 }} />
      <ServicesSection services={serviceList} locale={locale} />
      <BusinessSection services={serviceList} locale={locale} />

      <RatingSection
        badgeText={t.home.trackRecord.badge}
        title1={t.home.trackRecord.title1}
        title2={t.home.trackRecord.title2}
        subtitle={cmsText(trackRecord.data?.title, locale) || t.home.trackRecord.subtitle}
        ratingItems={ratingItems}
      />

      <ProjectSection
        badgeText={t.home.projects.badge}
        title1={t.home.projects.title1}
        title2={t.home.projects.title2}
        subtitle={t.home.projects.subtitle}
        seeAllText={t.home.projects.seeAll}
        projects={projects.data ?? []}
        services={serviceList}
        locale={locale}
      />

      <WorkerSection
        badgeText={t.home.clients.badge}
        title1={t.home.clients.title1}
        title2={t.home.clients.title2}
        subtitle={t.home.clients.subtitle}
        clients={clients.data ?? []}
        locale={locale}
      />

      {/* Anchor target for "Start a Project" buttons (#contact-home-form). */}
      <div id="contact-home-form" style={{ margin: 0, padding: 0, height: 0 }} />

      <ContactSection
        badgeText={t.home.contact.badge}
        title1={t.home.contact.title1}
        title2={t.home.contact.title2}
        subtitle={t.home.contact.subtitle}
        contactData={contact.data ?? null}
      />
    </div>
  );
};

export default Homepage;
