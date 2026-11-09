"use client";
import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Grid,
  LayoutGrid,
  Users,
  Phone,
  MessageSquare,
} from "lucide-react";
import { LanguageButton } from "@/components/UI/Atoms/Button/LanguageButton";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useClientTranslation from "@/hooks/useClientTranslation";
import { SUPPORTED_LOCALES, isSupportedLocale, localeFromPath } from "@/lib/i18n";
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from "@/lib/site";

const Header = () => {
  const { t } = useClientTranslation("navlink");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = localeFromPath(pathname);

  const homeHref = `/${currentLocale}`;
  // The contact block lives on the home page (#contact-section).
  const startProjectHref = `/${currentLocale}#contact-section`;

  // First path segment after the locale ("" on the home page).
  const activeSegment = isSupportedLocale(pathname?.split("/")[1])
    ? (pathname?.split("/")[2] ?? "")
    : "";

  const closeMenu = () => setIsMenuOpen(false);

  // Slightly raised look once the page has scrolled.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the drawer is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { key: "home", segment: "", href: homeHref, icon: <Home size={20} /> },
    {
      key: "services",
      segment: "service",
      href: `/${currentLocale}/service`,
      icon: <Briefcase size={20} />,
    },
    {
      key: "businessSolutions",
      segment: "businessSolutions",
      href: `/${currentLocale}/businessSolutions`,
      icon: <Grid size={20} />,
    },
    {
      key: "portfolio",
      segment: "portfolio",
      href: `/${currentLocale}/portfolio`,
      icon: <LayoutGrid size={20} />,
    },
    {
      key: "aboutus",
      segment: "aboutus",
      href: `/${currentLocale}/aboutus`,
      icon: <Users size={20} />,
    },
    {
      key: "contact",
      segment: "contact",
      href: `/${currentLocale}/contact`,
      icon: <Phone size={20} />,
    },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContainer}>
        <Link
          href={homeHref}
          className={styles.logo}
          onClick={closeMenu}
          aria-label="Go to homepage"
        >
          <Image
            src="/assets/logo2.svg"
            alt="Axuraa logo"
            className={styles.logoImage}
            width={150}
            height={60}
            priority
          />
        </Link>

        {/* Mobile Sidebar Drawer Overlay */}
        <div
          className={`${styles.mobileOverlay} ${isMenuOpen ? styles.mobileOverlayOpen : ""}`}
          onClick={() => setIsMenuOpen(false)}
        />

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          {/* Mobile Drawer Header */}
          <div className={styles.mobileDrawerHeader}>
            <Link
              href={homeHref}
              onClick={closeMenu}
              aria-label="Go to homepage"
            >
              <Image
                src="/assets/logo2.svg"
                alt="Axuraa logo"
                className={styles.logoImage}
                width={120}
                height={48}
                priority
              />
            </Link>
            <button
              className={styles.closeToggle}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className={styles.scrollableContainer}>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.key} className={styles.navItem}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${
                      activeSegment === link.segment ||
                      // case studies belong to the portfolio section
                      (link.segment === "portfolio" && activeSegment === "case-study")
                        ? styles.active
                        : ""
                    }`}
                    aria-current={activeSegment === link.segment ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    <span className={styles.navIcon}>{link.icon}</span>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              {SUPPORTED_LOCALES.length > 1 && (
                <li
                  className={`${styles.mobileLanguageItem} ${isMenuOpen ? styles.visible : ""}`}
                >
                  <div className={styles.mobileLanguageButton}>
                    <LanguageButton />
                  </div>
                </li>
              )}
            </ul>

            {/* Mobile Drawer Footer (Visible only on mobile) */}
            <div className={styles.mobileDrawerFooter}>
              <Link
                href={startProjectHref}
                className={styles.startProjectBtn}
                onClick={(e) => {
                  closeMenu();
                  const element = document.getElementById("contact-section");
                  // Already on the home page: smooth-scroll instead of navigating.
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <MessageSquare size={18} className={styles.btnIcon} />
                {t("start_project", "Start a Project")}
              </Link>

              <div className={styles.contactCards}>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className={styles.contactCard}>
                  <div className={styles.contactIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Call us</span>
                    <span className={styles.contactValue}>{CONTACT_PHONE}</span>
                  </div>
                </a>

                <a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactCard}>
                  <div className={styles.contactIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Email us</span>
                    <span className={styles.contactValue}>{CONTACT_EMAIL}</span>
                  </div>
                </a>
              </div>

              <div className={styles.socialIcons}>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  aria-label="X (Twitter)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className={styles.desktopLanguageBtn}>
          {SUPPORTED_LOCALES.length > 1 && <LanguageButton />}
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
