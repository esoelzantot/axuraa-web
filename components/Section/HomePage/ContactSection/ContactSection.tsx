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
import type { ContactData } from "@/components/pages/Contact/Contact";
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from "@/lib/site";

const ICON_MAP: Record<string, string> = {
  facebook: "/assets/SocialMedia/facebook.svg",
  instagram: "/assets/SocialMedia/Instagram.svg",
  linkedin: "/assets/SocialMedia/linkedin.svg",
  tiktok: "/assets/SocialMedia/Tiktok.svg",
  twitter: "/assets/SocialMedia/twitter.svg",
  x: "/assets/SocialMedia/twitter.svg",
};

interface ExtendedContactSectionProps extends ContactSectionProps {
  contactData?: ContactData | null; // passed from the server page, no fetching here
}

const ContactSection: React.FC<ExtendedContactSectionProps> = ({
  badgeText,
  title1,
  title2,
  subtitle,
  showLinks = true,
  contactData,
}) => {
  const phone = contactData?.phone || CONTACT_PHONE;
  const email = contactData?.emails?.[0]?.email || CONTACT_EMAIL;

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
          url: SOCIAL_LINKS.instagram,
        },
      ];

  return (
    <section id="contact-section" className={styles.ContactSection}>
      <div className={styles.ContactGrid}>
        <div className={styles.Contantinfo}>
          <StatusBadge text={badgeText} />

          <Typography
            variant="h1"
            component="h2"
            className={`${styles.title} ${styles.mainTitle}`}
          >
            <span style={{ color: "#FFFFFF" }}>{title1}</span>
            <span
              style={{
                color: "#D04A1D",
                background: "linear-gradient(90deg, #D04A1D 0%, #902501 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title2}
            </span>
          </Typography>

          <div className={styles.subtitle}>
            <Typography
              variant="body1"
              component="p"
              className={styles.subtitle}
            >
              {subtitle}
            </Typography>
          </div>

          {/* ✅ نقلهم هنا جوا Contantinfo */}
          <div className={styles.contactFormWrapper}>
            <ContactInfoCard
              icon="/assets/PhoneIcon.svg"
              label="Phone"
              value={phone}
              onClick={() => {
                window.location.href = `tel:${phone.replace(/[^+\d]/g, "")}`;
              }}
            />
            <ContactInfoCard
              icon="/assets/emailicon.svg"
              label="Email"
              value={email}
              onClick={() => {
                window.location.href = `mailto:${email}`;
              }}
            />
          </div>

          {showLinks && (
            <div className={styles.socialIconsContainer}>
              {socialIcons.map((social) => (
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

        <div className={styles.Contantform}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
