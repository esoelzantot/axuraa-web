import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";
import LocalizedLink from "@/components/UI/Atoms/LocalizedLink/LocalizedLink";
import { getAllServices, filterServices } from "@/service/Services/services";
import { Locale, localize } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { SOCIAL_LINKS } from "@/lib/site";

const COMPANY_LINKS = [
  { key: "about", href: "/aboutus" },
  { key: "portfolio", href: "/portfolio" },
  { key: "services", href: "/service" },
  { key: "businessSolutions", href: "/businessSolutions" },
  { key: "contact", href: "/contact" },
] as const;

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
const Footer = async ({ locale }: { locale: Locale }) => {
  const currentYear = new Date().getFullYear();
  const t = getDictionary(locale);
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
                {/* One logo per theme: the light one has dark ink where the dark one is white */}
                <Image
                  src="/assets/axuraa-logo.png"
                  alt={t.common.logoAlt}
                  width={71}
                  height={71}
                  className={`${styles.logo} ${styles.logoForDark}`}
                />
                <Image
                  src="/assets/axuraa-logo-light.png"
                  alt=""
                  width={71}
                  height={71}
                  className={`${styles.logo} ${styles.logoForLight}`}
                />
                <p className={styles.brantlogo}>AXURAA</p>
              </div>
              <p className={styles.description}>
                {t.footer.description}
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
                <ColumnTitle title={t.footer.company} />
                <ul className={styles.linkList}>
                  {COMPANY_LINKS.map((link) => (
                    <li key={link.href}>
                      <LocalizedLink href={link.href} className={styles.link}>
                        {t.footer.links[link.key]}
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>

              {serviceLinks.length > 0 && (
                <div className={styles.footerColumn}>
                  <ColumnTitle title={t.footer.services} />
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
                  <ColumnTitle title={t.footer.products} />
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
            <p className={styles.bottomContentTitle}>{t.footer.rights(currentYear)}</p>
            <div className={styles.legalLinks}>
              <LocalizedLink href="/privacy-policy" className={styles.legalLink}>
                {t.footer.privacy}
              </LocalizedLink>
              <span className={styles.separator} aria-hidden="true" />
              <LocalizedLink href="/terms-of-service" className={styles.legalLink}>
                {t.footer.terms}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
