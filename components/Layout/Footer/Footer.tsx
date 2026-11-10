import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";
import LocalizedLink from "@/components/UI/Atoms/LocalizedLink/LocalizedLink";
import { getAllServices, filterServices } from "@/service/Services/services";
import { DEFAULT_LOCALE, localize } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/site";

const COMPANY_LINKS = [
  { name: "About Us", href: "/aboutus" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/service" },
  { name: "Business Solutions", href: "/businessSolutions" },
  { name: "Contact", href: "/contact" },
];

const SOCIALS = [
  { icon: "/assets/linkeninicon.svg", href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: "/assets/Xicon.svg", href: SOCIAL_LINKS.twitter, label: "X (Twitter)" },
];

const ColumnTitle = ({ title }: { title: string }) => (
  <h3 className={styles.columnTitle}>
    <span className={styles.columnMark} aria-hidden="true" />
    {title}
  </h3>
);

/**
 * Server component: services are fetched once on the server (and cached)
 * instead of on every page view in the browser.
 */
const Footer = async () => {
  const currentYear = new Date().getFullYear();
  // The root layout has no locale param; only one locale is shipped for now.
  const locale = DEFAULT_LOCALE;
  const { data: services } = await getAllServices(locale);

  const serviceLinks = filterServices(services, "service");
  const solutionLinks = filterServices(services, "solution");

  return (
    <footer className={styles.footer}>
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Brand & Social */}
            <div className={styles.brandSection} data-reveal="up">
              <div className={styles.brand}>
                <Image
                  src="/assets/FooterLogo.png"
                  alt="Axuraa logo"
                  width={71}
                  height={71}
                  className={styles.logo}
                />
                <p className={styles.brantlogo}>AXURAA</p>
              </div>
              <p className={styles.description}>
                We transform your digital vision into reality through innovative web development,
                mobile apps, UI/UX design, and digital marketing solutions.
              </p>
              <div className={styles.socialLinks}>
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className={styles.socialIcon}
                      style={{ maskImage: `url(${social.icon})`, WebkitMaskImage: `url(${social.icon})` }}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className={styles.linksSection} data-reveal-stagger>
              <div className={styles.footerColumn}>
                <ColumnTitle title="Company" />
                <ul className={styles.linkList}>
                  {COMPANY_LINKS.map((link) => (
                    <li key={link.href}>
                      <LocalizedLink href={link.href} className={styles.link}>
                        {link.name}
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>

              {serviceLinks.length > 0 && (
                <div className={styles.footerColumn}>
                  <ColumnTitle title="Services" />
                  <ul className={styles.linkList}>
                    {serviceLinks.map((service) => (
                      <li key={service._id}>
                        <LocalizedLink href={`/service/${service._id}`} className={styles.link}>
                          {localize(service.title, locale)}
                        </LocalizedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {solutionLinks.length > 0 && (
                <div className={styles.footerColumn}>
                  <ColumnTitle title="Products" />
                  <ul className={styles.linkList}>
                    {solutionLinks.map((service) => (
                      <li key={service._id}>
                        <LocalizedLink href={`/service/${service._id}`} className={styles.link}>
                          {localize(service.title, locale)}
                        </LocalizedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Oversized outlined wordmark */}
        <span className={styles.watermark} aria-hidden="true">
          AXURAA
        </span>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p className={styles.bottomContentTitle}>© {currentYear} AXURAA. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <LocalizedLink href="/privacy-policy" className={styles.legalLink}>
                Privacy Policy
              </LocalizedLink>
              <span className={styles.separator} aria-hidden="true" />
              <LocalizedLink href="/terms-of-service" className={styles.legalLink}>
                Terms of Service
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
