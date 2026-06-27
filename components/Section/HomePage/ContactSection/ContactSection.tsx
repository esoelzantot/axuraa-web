// components/Section/HomePage/ContactSection/ContactSection.tsx
"use client";

import React from "react";
import styles from "./ContactSection.module.css";
import StatusBadge from "@/components/UI/Atoms/StatusBadge/StatusBadge";
import Typography from "@/components/UI/Atoms/Typography/Typography";
import ContactInfoCard from "@/components/UI/Atoms/ContactForm/ContactInfoCard";
import SocialIcon from "@/components/UI/Atoms/SocialIcon/SocialIcon";
import ContactForm from "@/components/UI/Atoms/ContactForm/ContactForm";
import { ContactSectionProps } from "@/types/HomePage/contactTypes";
import { SocialLink } from "@/service/Contact/contactinformation";

const ICON_MAP: Record<string, string> = {
  facebook: "/assets/SocialMedia/facebook.svg",
  instagram: "/assets/SocialMedia/Instagram.svg",
  linkedin: "/assets/SocialMedia/linkedin.svg",
  tiktok: "/assets/SocialMedia/Tiktok.svg",
  twitter: "/assets/SocialMedia/twitter.svg",
  x: "/assets/SocialMedia/twitter.svg",
};

interface ExtendedContactSectionProps extends ContactSectionProps {
  contactData?: any; // passed from parent, no fetching needed
}

const ContactSection: React.FC<ExtendedContactSectionProps> = ({
  badgeText,
  title1,
  title2,
  subtitle,
  showLinks = true,
  contactData,
}) => {
  const socialIcons = contactData?.socialLinks?.length
    ? contactData.socialLinks.map((link: SocialLink, i: number) => ({
        id: i + 1,
        icon:
          ICON_MAP[link.name.toLowerCase()] ||
          link.icon ||
          "/assets/Vector.svg",
        label: link.name.charAt(0).toUpperCase() + link.name.slice(1),
        url: link.url,
      }))
    : [
        {
          id: 1,
          icon: "/assets/SocialMedia/Instagram.svg",
          label: "Instagram",
          url: "#",
        },
      ];

  return (
    <section id="contact-section" className={styles.ContactSection}>
      <div className={styles.ContactGrid}>
        <div className={styles.Contantinfo}>
          <StatusBadge text="Contact Us" style={{}} />

          <Typography
            variant="h1"
            component="h1"
            className={`${styles.title} ${styles.mainTitle}`}
          >
            <span style={{ color: "#FFFFFF" }}>Let's build something</span>
            <span
              style={{
                color: "#D04A1D",
                background: "linear-gradient(90deg, #D04A1D 0%, #902501 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              extraordinary.
            </span>
          </Typography>

          <div className={styles.subtitle}>
            <Typography
              variant="body1"
              component="p"
              className={styles.subtitle}
            >
              Have a project in mind? We'd love to hear about it.
            </Typography>
          </div>

          {/* ✅ نقلهم هنا جوا Contantinfo */}
          <div className={styles.contactFormWrapper}>
            <ContactInfoCard
              icon="/assets/PhoneIcon.svg"
              label="Phone"
              value={contactData?.phone || "+1 (555) 123-4567"}
              onClick={() => {
                window.location.href = `tel:${contactData?.phone || ""}`;
              }}
            />
            <ContactInfoCard
              icon="/assets/EmailIcon.svg"
              label="Email"
              value={contactData?.emails?.[0]?.email || "contact@company.com"}
              onClick={() => {
                window.open(
                  `mailto:${contactData?.emails?.[0]?.email || ""}`,
                  "_blank",
                );
              }}
            />
          </div>

          {showLinks && (
            <div className={styles.socialIconsContainer}>
              {socialIcons.map((social: any) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <SocialIcon icon={social.icon} showLabel alt={social.label} />
                </a>
              ))}
            </div>
          )}
        </div>
        {/* ✅ الـ form لوحده */}
        <div className={styles.Contantform}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
