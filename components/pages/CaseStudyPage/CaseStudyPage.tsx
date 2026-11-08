// components/pages/CaseStudyPage/CaseStudyPage.tsx
"use client";

import React from "react";
import { ExternalLink, Package } from "lucide-react";
import styles from "./CaseStudyPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProjectItem, Testimonial } from "@/service/Projects/projects";
import { Locale, localize } from "@/lib/i18n";

interface CaseStudyPageProps {
  project: ProjectItem;
  locale: Locale;
}

interface TestimonialDisplay {
  text: string;
  author: string;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ project, locale }) => {
  const router = useRouter();
  // All data transformation happens here — no fetching, no loading states
  const caseStudy = {
    title: localize(project.title, locale) || "Case Study",
    subtitle: localize(project.subTitle, locale),
    overview: localize(project.overview, locale),

    features:
      project.features?.map((f) => ({
        icon: f.icon || null,
        title: localize(f.title, locale),
        description: localize(f.description, locale),
      })) || [],

    tags: (project.services ?? [])
      .map((s) => localize(s?.services_id?.title, locale))
      .filter(Boolean),

    client: project.client_id?.name || "Client",
    projectManager: project.project_manager || "Project Manager",
    timeframe: project.start_work
      ? new Date(project.start_work).toLocaleDateString(
          locale === "ar" ? "ar-EG" : "en-US",
        )
      : "Timeframe",
    team: `${project.team_members?.length || 0} team members`,
    location: project.location || "Location",
    url_deployment: project.url_deployment || null,

    results:
      project.case_study_results?.map((r) => ({
        metric: localize(r.description, locale),
        value: r.value,
      })) || [],
    testimonials:
      project.testimonials?.map((t: Testimonial) => ({
        text: localize(t.message, locale),
        author: t.client_id?.name || "Anonymous",
      })) || [],

    mainImage: project.main_image_url ?? null,
    secondImage: project.second_image_url ?? null,
  };

  // Domain shown in the frame's address bar (falls back to the site's own domain)
  const frameHost = (() => {
    try {
      return caseStudy.url_deployment
        ? new URL(caseStudy.url_deployment).hostname.replace(/^www\./, "")
        : "axuraa.com";
    } catch {
      return "axuraa.com";
    }
  })();

  const projectDetails = [
    {
      icon: "/assets/ProjectDetailscard/client.svg",
      label: "Client:",
      value: caseStudy.client,
    },
    {
      icon: "/assets/ProjectDetailscard/client.svg", // TODO: add a dedicated manager.svg
      label: "Project Manager:",
      value: caseStudy.projectManager,
    },
    {
      icon: "/assets/ProjectDetailscard/time.svg",
      label: "Timeframe:",
      value: caseStudy.timeframe,
    },
    {
      icon: "/assets/ProjectDetailscard/team.svg",
      label: "Team:",
      value: caseStudy.team,
    },
    {
      icon: "/assets/ProjectDetailscard/location.svg",
      label: "Location:",
      value: caseStudy.location,
    },
  ];

  const handlePrototype = () => {
    if (caseStudy.url_deployment)
      window.open(caseStudy.url_deployment, "_blank", "noopener,noreferrer");
  };

  const handleContact = () => {
    router.push(`/${locale}/contact#contact-form`);
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbContent}>
          <Link href={`/${locale}`} className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbDivider}>&gt;</span>
          <Link href={`/${locale}/portfolio`} className={styles.breadcrumbLink}>
            Portfolio
          </Link>
          <span className={styles.breadcrumbDivider}>&gt;</span>
          <span className={styles.currentPage}>{caseStudy.title}</span>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Main Content */}
          <div>
            {/* Hero */}
            <section className={styles.hero}>
              <div className={styles.text}>
                <h1 className={styles.title}>{caseStudy.title}</h1>
                <p className={styles.subtitle}>{caseStudy.subtitle}</p>
              </div>

              <div className={styles.tags}>
                {caseStudy.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {caseStudy.mainImage && (
                <figure className={styles.frame}>
                  <div className={styles.frameGlow} aria-hidden="true" />
                  <div className={styles.frameWindow}>
                    <div className={styles.frameBar} aria-hidden="true">
                      <span className={styles.frameDots}>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className={styles.frameUrl}>{frameHost}</span>
                    </div>
                    <div className={styles.frameScreen}>
                      <Image
                        src={caseStudy.mainImage}
                        alt={caseStudy.title ?? "Project image"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 900px"
                        className={styles.frameImage}
                        priority
                      />
                    </div>
                  </div>
                </figure>
              )}
            </section>

            {/* Overview */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.overviewIconContainer}>
                  <Image
                    src="/assets/OverviewIcon.png"
                    alt="Overview"
                    width={24}
                    height={24}
                    className={styles.overviewIcon}
                  />
                </div>
                <h2 className={styles.sectionTitle}>OVERVIEW</h2>
              </div>
              <p className={styles.sectionText}>{caseStudy.overview}</p>
            </section>

            {/* Key Features */}
            <section className={styles.section2}>
              <div className={styles.sectionHeader2}>
                <div className={styles.overviewIconContainer}>
                  <Image
                    src="/assets/Sparkling.png"
                    alt="Features"
                    width={24}
                    height={24}
                    className={styles.overviewIcon}
                  />
                </div>
                <h2 className={styles.sectionTitle2}>Key Features</h2>
              </div>
              <p className={styles.sectionText2}>
                A comprehensive suite of features designed to optimize the
                experience for merchants and customers alike.
              </p>
              <div className={styles.featuresGrid}>
                {caseStudy.features.map((feature, idx) => (
                  <div key={idx} className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      {feature.icon ? (
                        <Image
                          src={feature.icon}
                          alt="Feature icon"
                          width={24}
                          height={24}
                          className={styles.overviewIcon}
                        />
                      ) : (
                        <Package className={styles.featureIcon} />
                      )}
                    </div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Results */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Case Study Results</h3>
              <div className={styles.results}>
                {caseStudy.results.map((result, idx) => (
                  <div key={idx} className={styles.resultItem}>
                    <div className={styles.resultValue}>{result.value}</div>
                    <div className={styles.resultLabel}>{result.metric}</div>
                  </div>
                ))}
              </div>
              <button
                className={styles.button}
                onClick={handlePrototype}
                disabled={!caseStudy.url_deployment}
                title={caseStudy.url_deployment ? undefined : "Prototype not available"}
              >
                Show prototype <ExternalLink className={styles.buttonIcon} />
              </button>
            </div>

            {/* Consultation */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Free Project Consultation</h3>
              <p className={styles.freeProjectText}>
                Get a comprehensive evaluation of your project goals and digital
                strategy with our complimentary assessment.
              </p>
              <button className={styles.button} onClick={handleContact}>
                Schedule Free Assessment{" "}
                <ExternalLink className={styles.buttonIcon} />
              </button>
            </div>

            {/* Testimonials */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Client Testimonials</h3>
              <div className={styles.testimonials}>
                {caseStudy.testimonials.map(
                  (testimonial: TestimonialDisplay, idx: number) => (
                    <div key={idx} className={styles.testimonial}>
                      <div className={styles.testimonialAvatar}>
                        <Image
                          src="/assets/imsges.png"
                          alt="Avatar"
                          width={40}
                          height={40}
                          className={styles.testimonialAvatar}
                        />
                      </div>
                      <div className={styles.testimonialContent}>
                        <p className={styles.testimonialText}>
                          &quot;{testimonial.text}&quot;
                        </p>
                        <p className={styles.testimonialAuthor}>
                          {testimonial.author}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className={styles.ProjectDetailscard}>
              <h3 className={styles.detailsTitle}>Project Details</h3>
              <div className={styles.details}>
                {projectDetails.map((detail, index) => (
                  <div key={index} className={styles.detailItem}>
                    <Image
                      src={detail.icon}
                      alt=""
                      width={14}
                      height={16}
                      className={styles.detailIcon}
                    />
                    <span className={styles.detailLabel}>{detail.label}</span>
                    <span className={styles.detailValue}>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default React.memo(CaseStudyPage);
