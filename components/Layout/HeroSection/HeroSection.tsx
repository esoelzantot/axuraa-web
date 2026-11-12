"use client";
import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import Typography from "@/components/UI/Atoms/Typography/Typography";
import StartButton from "@/components/UI/Atoms/Button/StartButton";
import ViewButton from "@/components/UI/Atoms/Button/ViewButton";
import Badge from "@/components/UI/Atoms/Badge/Badge";
import Image from "next/image";
import StatusBadge from "@/components/UI/Atoms/StatusBadge/StatusBadge";
import AnimatedBackground from "@/components/UI/Muscles/AinmatedBackground/AnimatedBackground";
import { useRouter } from "next/navigation";
import useDictionary from "@/hooks/useDictionary";
import { getHomePartners, PartnerItem } from "@/service/partners/partners";

interface HeroSectionProps {
  title1?: string;
  title2?: string;
  subtitle1?: string;
  subtitle2?: string;
  badgeText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  /** Defaults to the current locale's contact form. */
  primaryHref?: string;
  /** Defaults to the current locale's portfolio. */
  secondaryHref?: string;
  backgroundType: "Hexagon" | "Circle" | "Alphabet";
  /**
   * Minimum height of the hero section. This is applied as `minHeight`
   * (not a fixed `height`) so the section can always grow to fit its
   * content — e.g. on mobile landscape where the viewport height is
   * short but the content is taller than the visible viewport.
   */
  height?: string;
  showBackgroundDots?: boolean;
  showAnimatedCircles?: boolean;
  showBadge?: boolean;
  showStatusBadge?: boolean;
  showTrustedSection?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  showEllipseDecorations?: boolean;
  /** Partners fetched on the server. When omitted they are fetched in the browser. */
  partners?: PartnerItem[];
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const FALLBACK_PARTNERS: PartnerItem[] = [
  { id: 1, name: "SkyTech", icon: "skytech.svg" },
  { id: 2, name: "ChainBlock", icon: "chainblock.svg" },
  { id: 3, name: "NexusPoint", icon: "nexuspoint.svg" },
  { id: 4, name: "Apex", icon: "apex.svg" },
  { id: 5, name: "Velocity", icon: "velocity.svg" },
];

// Maps API icon names to local asset filenames
const ICON_MAPPING: Record<string, string> = {
  "skytech.svg": "/assets/SkyTecIcon.svg",
  "chainblock.svg": "/assets/ChicnBlockIcon.svg",
  "nexuspoint.svg": "/assets/NexusPointIcon.svg",
  "apex.svg": "/assets/AplexIcon.svg",
  "velocity.svg": "/assets/VelocityIcon.svg",
};

const toCompany = (partner: PartnerItem) => {
  const rawIcon = partner.icon || partner.logo || "";
  const src =
    ICON_MAPPING[rawIcon.toLowerCase()] ||
    (rawIcon.startsWith("http") || rawIcon.startsWith("/") ? rawIcon : `/assets/${rawIcon}`);
  const website = partner.website?.trim();
  return {
    src,
    alt: partner.name,
    name: partner.name,
    width: 100,
    href: website ? (website.startsWith("http") ? website : `https://${website}`) : undefined,
  };
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title1: title1Prop,
  title2: title2Prop,
  subtitle1: subtitle1Prop,
  subtitle2: subtitle2Prop,
  badgeText: badgeTextProp,
  primaryButtonText: primaryButtonTextProp,
  secondaryButtonText: secondaryButtonTextProp,
  primaryHref: primaryHrefProp,
  secondaryHref: secondaryHrefProp,
  height = "100dvh",
  showAnimatedCircles = true,
  showBadge = true,
  showStatusBadge = true,
  showTrustedSection = true,
  showPrimaryButton = true,
  showSecondaryButton = true,
  partners: partnersProp,
  onPrimaryClick,
  onSecondaryClick,
  backgroundType = "Hexagon",
}) => {
  const router = useRouter();
  const { t, locale } = useDictionary();
  // Page-supplied text wins; otherwise the localized defaults.
  const title1 = title1Prop ?? t.hero.defaultTitle1;
  const title2 = title2Prop ?? t.hero.defaultTitle2;
  const subtitle1 = subtitle1Prop ?? t.hero.defaultSubtitle;
  const subtitle2 = subtitle2Prop ?? t.hero.trustedBy;
  const badgeText = badgeTextProp ?? t.hero.availableBadge;
  const primaryButtonText = primaryButtonTextProp ?? t.common.startProject;
  const secondaryButtonText = secondaryButtonTextProp ?? t.common.viewOurWork;
  const primaryHref = primaryHrefProp ?? `/${locale}/contact#contact-form`;
  const secondaryHref = secondaryHrefProp ?? `/${locale}/portfolio`;

  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fetchedPartners, setFetchedPartners] = useState<PartnerItem[] | null>(null);

  // Start entrance animations after the first paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Only fetch in the browser when the server did not provide partners.
  const needsPartners = showTrustedSection && !partnersProp;
  useEffect(() => {
    if (!needsPartners) return;
    let cancelled = false;
    getHomePartners().then((result) => {
      if (cancelled) return;
      setFetchedPartners(
        result.success && result.data?.partners.length ? result.data.partners : FALLBACK_PARTNERS,
      );
    });
    return () => {
      cancelled = true;
    };
  }, [needsPartners]);

  const partners = partnersProp?.length ? partnersProp : (fetchedPartners ?? []);
  const companiesToShow = partners.map(toCompany);

  /** Smooth-scrolls when the target is on this page, otherwise client-side navigates (Next scrolls to the hash). */
  const navigate = (href: string) => {
    const [path, hash] = href.split("#");
    if (hash && (!path || path === window.location.pathname)) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(href);
  };

  return (
    <section
      className={styles.hero}
      style={{ minHeight: height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showAnimatedCircles && (
        <AnimatedBackground
          type={backgroundType}
          className={styles.animatedBackground}
          isHovered={isHovered}
        />
      )}

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
            className={mounted ? styles.fadeInUp : ""}
          >
            {showBadge && <Badge text={badgeText} show={true} reveal={false} />}
            {showStatusBadge && <StatusBadge text={t.hero.whoWeAre} reveal={false} />}
          </div>

          {/* Title */}
          <div className={styles.titleWrapper}>
            <Typography
              variant="h1"
              component="h1"
              animation={mounted ? "textUp" : undefined}
              align="center"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: "#ffffff",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {title1}
              </span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #d04a1d 0%, #fffdfd 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {title2}
              </span>
            </Typography>
          </div>

          {/* Subtitle */}
          <div className={styles.subtitle}>
            <Typography
              variant="body1"
              component="p"
              animation={mounted ? "textUp" : undefined}
              color="var(--color-azure-65, #9CA3AF)"
              align="center"
              stagger={1}
            >
              {subtitle1}
            </Typography>
          </div>

          {/* CTA Buttons */}
          {(showPrimaryButton || showSecondaryButton) && (
            <div
              className={`${styles.ctaButtons} ${mounted ? styles.fadeInUp : ""}`}
              style={{ animationDelay: "0.5s" }}
            >
              {showPrimaryButton && (
                <StartButton
                  onClick={() =>
                    onPrimaryClick ? onPrimaryClick() : navigate(primaryHref)
                  }
                >
                  {primaryButtonText}
                </StartButton>
              )}
              {showSecondaryButton && (
                <ViewButton
                  onClick={() =>
                    onSecondaryClick ? onSecondaryClick() : navigate(secondaryHref)
                  }
                >
                  {secondaryButtonText}
                </ViewButton>
              )}
            </div>
          )}
        </div>

        {/* Trusted Section */}
        {showTrustedSection && companiesToShow.length > 0 && (
          <div
            className={`${styles.trustedSection} ${mounted ? styles.fadeInUp : ""}`}
            style={{ animationDelay: "0.7s" }}
          >
            <Typography
              variant="body2"
              component="p"
              color="var(--color-grey-46, #6B7280)"
              align="center"
              style={{
                fontWeight: 600,
                letterSpacing: "0.025em",
              }}
            >
              {subtitle2}
            </Typography>

            <div className={styles.companiesGrid}>
              {companiesToShow.map((company) => (
                <a
                  key={company.name}
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.companyLogo}
                >
                  <Image
                    src={company.src}
                    alt={company.alt}
                    width={company.width}
                    height={24}
                    // Remote logos may come from any host the backend chooses.
                    unoptimized={company.src.startsWith("http")}
                  />
                  <Typography
                    variant="body1"
                    component="span"
                    color="var(--color-azure-84, #D1D5DB)"
                    style={{
                      fontWeight: 700,
                      marginLeft: "8px",
                    }}
                  >
                    {company.name}
                  </Typography>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
