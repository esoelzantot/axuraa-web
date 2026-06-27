"use client";

import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
// import Typography from '@/components/UI/Atoms/Typography/Typography';
import FooterColumnHeader from './FooterColumnHeader';
import { getAllServices, ServiceItem } from '@/service/Services/services';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const currentLocale = pathname ? (pathname.split('/')[1] || 'en') : 'en';

  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const result = await getAllServices('en');
      if (result.success && result.data) {
        setServices(result.data);
      }
    };
    fetchServices();
  }, []);

  const companyLinks = [
    { name: 'About Us', href: 'aboutus' },
    { name: 'Portfolio', href: 'portfolio' },
    { name: 'Case Studies', href: 'portfolio' },
    { name: 'Services', href: 'service' },
    { name: 'Contact', href: 'contact' }
  ];

  // const socialLinks = [
  //   { icon: Linkedin, href: '#', label: 'LinkedIn' },
  //   { icon: Twitter, href: '#', label: 'Twitter' },
  //   { icon: Github, href: '#', label: 'GitHub' }
  // ];
  const socialLinks = [
    {
      icon: '/assets/linkeninicon.svg',
      href: '#',
      label: 'LinkedIn'
    },
    {
      icon: '/assets/Xicon.svg',
      href: '#',
      label: 'Twitter'
    },
    {
      icon: '/assets/githupicon.svg',
      href: '#',
      label: 'GitHub'
    }
  ];
  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Left Section: Brand & Social */}
            <div className={styles.brandSection}>
              <div className={styles.brand}>
                <img
                  src="/assets/FooterLogo.png"
                  alt="Axuraa Logo"
                  className={styles.logo}
                />
                <h1 className={styles.brantlogo}>AXURAA</h1>
              </div>
              <p className={styles.description}>
                We transform your digital vision into reality through innovative web development, mobile apps, UI/UX design, and digital marketing solutions.
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      width={24}
                      height={24}
                      className={styles.socialIcon}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Section: Link Columns */}
            <div className={styles.linksSection}>
              {/* Company Column */}
              <div className={styles.footerColumn}>
                <FooterColumnHeader title="Company" />
                <ul className={styles.linkList}>
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={`/${currentLocale}/${link.href}`} className={styles.link}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Column */}
              <div className={styles.footerColumn}>
                <FooterColumnHeader title="Services" />
                <ul className={styles.linkList}>
                  {services
                    .filter((service) => service.type === 'service' && service.is_active)
                    .map((service) => (
                      <li key={service._id}>
                        <Link href={`/${currentLocale}/service/${service._id}`} className={styles.link}>
                          {service.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Products Column (Repurposed from Contact) */}
              <div className={styles.footerColumn}>
                <FooterColumnHeader title="Products" />
                <ul className={styles.linkList}>
                  {services
                    .filter((service) => service.type === 'solution' && service.is_active)
                    .map((service) => (
                      <li key={service._id}>
                        <Link href={`/${currentLocale}/service/${service._id}`} className={styles.link} style={{ whiteSpace: 'nowrap' }}>
                          {service.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            {/* <Typography 
              variant="body1"
              style={{
                color: 'var(--white-55, var(--color-white-55, rgba(255, 255, 255, 0.55)))',
                fontSize: '26.25px',
                fontStyle: 'normal',
                fontWeight: 'var(--font-weight-400, 400)',
                lineHeight: '37.5px',
                margin: 0
              }}
              className={styles.bottomContentTitle}
            >
              © {currentYear} AXURAA. All rights reserved.
            </Typography> */}
            <p className={styles.bottomContentTitle}>  © {currentYear} AXURAA. All rights reserved. </p>
            <div className={styles.legalLinks}>
              {/* <Typography 
                component="a" 
                // href="#" 
                className={styles.legalLink}
                style={{
                  color: 'var(--white-55, var(--color-white-55, rgba(255, 255, 255, 0.55)))',
                  fontSize: '26.25px',
                  fontStyle: 'normal',
                  fontWeight: 'var(--font-weight-400, 400)',
                  lineHeight: '37.5px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                Privacy Policy
              </Typography> */}
              {/* <Typography 
                component="span" 
                className={styles.separator}
                style={{
                  color: 'var(--white-35, var(--color-white-35, rgba(255, 255, 255, 0.35)))',
                  fontSize: '26.25px',
                  fontStyle: 'normal',
                  fontWeight: 'var(--font-weight-400, 400)',
                  lineHeight: '45px',
                  margin: '0 10px'
                }}
              >
                |
              </Typography> */}
              {/* <Typography 
                component="a" 
                // href="#terms" 
                className={styles.legalLink}
                style={{
                  color: 'var(--white-55, var(--color-white-55, rgba(255, 255, 255, 0.55)))',
                  fontSize: '26.25px',
                  fontStyle: 'normal',
                  fontWeight: 'var(--font-weight-400, 400)',
                  lineHeight: '37.5px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                Terms of Service
              </Typography> */}

              <Link href={`/${currentLocale}/privacy-policy`} className={styles.legalLink}> Privacy Policy </Link>
              <p className={styles.separator}> | </p>
              <Link href={`/${currentLocale}/terms-of-service`} className={styles.legalLink}> Terms of Service </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);