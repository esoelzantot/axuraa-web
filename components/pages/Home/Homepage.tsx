import React from "react";
import styles from "./Homepage.module.css";
import ContactSection from "@/components/Section/HomePage/ContactSection/ContactSection";
import ServicesSection from "@/components/Section/HomePage/OurServicesSection/ServicesSection";
import BusinessSsection from "@/components/Section/HomePage/BusinessSection/BusinessSsection";
import RatingSection from "@/components/Section/HomePage/RatingSection/RatingSection";
import ProjectSection from "@/components/Section/HomePage/ProjectSection/ProjectSection";
import WorkerSection from "@/components/Section/HomePage/WorkerSection/WorkerSection";
import { ContactData } from "../Contact/Contact";

const Homepage = ({ contactData }: { contactData: ContactData | null }) => {
  return (
    <div className={styles.homePage}>
      <ServicesSection />
      <BusinessSsection />

      <RatingSection
        badgeText="Our Achievements"
        title1="How we help "
        title2="Businesses Grow?"
        subtitle="Discover our comprehensive suite of services designed to elevate your digital presence"
      />

      {/* TODO: تأكد من المحتوى ده، كان مكرر بنفس RatingSection */}
      <ProjectSection
        badgeText="Our Projects"
        title1="A Showcase of"
        title2="Our Recent Work"
        subtitle="Explore some of the projects we've delivered for our clients"
        seeAllHref="#projects"
        seeAllText="View All Projects"
      />

      <WorkerSection
        badgeText="Our Client"
        title1="Meet Our"
        title2="Expert Team"
        subtitle="Dedicated professionals delivering exceptional results"
        // Workers={workers}
      />

      {/* anchor target — متربط مباشرة بـ HomePage primaryHref أو أي link تاني فيه #contact-home-form */}
      <div
        id="contact-home-form"
        style={{ margin: 0, padding: 0, height: 0 }}
      />

      {/* TODO: تأكد من المحتوى ده، كان نفس عنوان RatingSection برضو */}
      <ContactSection
        badgeText="Get In Touch"
        title1="Let's Build"
        title2="Something Great Together"
        subtitle="Reach out to discuss your next project with our team"
        contactData={contactData}
      />
    </div>
  );
};

export default React.memo(Homepage);
