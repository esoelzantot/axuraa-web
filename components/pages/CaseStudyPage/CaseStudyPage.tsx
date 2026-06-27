// components/pages/CaseStudyPage/CaseStudyPage.tsx
"use client";

import React from "react";
import { ExternalLink, Package } from "lucide-react";
import styles from "./CaseStudyPage.module.css";
import ProjectButton from "@/components/UI/Atoms/ProjectButton/ProjectButton";
import Image from "next/image";
import { ProjectItem, Testimonial } from "@/service/Projects/projects";

interface CaseStudyPageProps {
  project: ProjectItem;
  locale: "en" | "ar";
}

interface TestimonialDisplay {
  text: string;
  author: string;
}

const preImage = "/assets/OverviewIcon.png";

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ project, locale }) => {
  // All data transformation happens here — no fetching, no loading states
  const caseStudy = {
    title:
      typeof project.title === "string"
        ? project.title
        : project.title?.[locale] || project.title?.en,

    subtitle:
      typeof project.subTitle === "string"
        ? project.subTitle
        : project.subTitle?.[locale] || project.subTitle?.en || "",

    overview:
      typeof project.overview === "string"
        ? project.overview
        : project.overview?.[locale] || project.overview?.en || "",

    features:
      project.features?.map((f) => ({
        icon: f.icon || null,
        title:
          typeof f.title === "string"
            ? f.title
            : f.title?.[locale] || f.title?.en || "",
        description:
          typeof f.description === "string"
            ? f.description
            : f.description?.[locale] || f.description?.en || "",
      })) || [],

    tags:
      project.services?.map((s) => {
        const t = s.services_id.title;
        return typeof t === "string" ? t : t?.[locale] || t?.en || "";
      }) || [],

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
        metric: r.description,
        value: r.value,
      })) || [],
    testimonials:
      project.testimonials?.map((t: Testimonial) => ({
        text:
          typeof t.message === "string"
            ? t.message
            : t.message?.[locale] || t.message?.en || "",
        author: t.client_id?.name || "Anonymous",
      })) || [],

    mainImage: project.main_image_url ?? null,
    secondImage: project.second_image_url ?? null,
  };

  // console.log("results:", caseStudy.results);
  // console.log("project results:", project.case_study_results);

  const projectDetails = [
    {
      icon: "/assets/ProjectDetailscard/client.svg",
      label: "Client:",
      value: caseStudy.client,
    },
    {
      icon: "/assets/ProjectDetailscard/client.svg",
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
      window.open(caseStudy.url_deployment, "_blank");
  };

  const handleContact = () => {
    window.location.href = `/${locale}/contact#contact-form`;
  };

  console.log("CaseStudyPage data:", {
    title: caseStudy.title,
    subtitle: caseStudy.subtitle,
    overview: caseStudy.overview,
    features: caseStudy.features,
    tags: caseStudy.tags,
    client: caseStudy.client,
    projectManager: caseStudy.projectManager,
    timeframe: caseStudy.timeframe,
    team: caseStudy.team,
    location: caseStudy.location,
    url_deployment: caseStudy.url_deployment,
    results: caseStudy.results,
    testimonials: caseStudy.testimonials,
    mainImage: caseStudy.mainImage,
    secondImage: caseStudy.secondImage,
  });

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbContent}>
          <a href={`/${locale}`} className={styles.breadcrumbLink}>
            Home
          </a>
          <span className={styles.breadcrumbDivider}>&gt;</span>
          <a href={`/${locale}/portfolio`} className={styles.breadcrumbLink}>
            Portfolio
          </a>
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
                  <ProjectButton
                    key={idx}
                    variant="outline"
                    style={{
                      display: "flex",
                      padding: "2.167px 8.247px 1.464px 10.26px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      border: "0 solid #E5E7EB",
                      backgroundColor: "#D04A1D",
                      color: "#FFF",
                      fontSize: "12.667px",
                      fontWeight: 400,
                      lineHeight: "18.297px",
                      margin: 0,
                    }}
                  >
                    {tag}
                  </ProjectButton>
                ))}
              </div>

              {caseStudy.mainImage && (
                <div className={styles.preview}>
                  <Image
                    src={caseStudy.mainImage}
                    alt={caseStudy.title ?? "Project image"}
                    width={1200}
                    height={600}
                    className={styles.previewImage}
                    priority
                  />
                </div>
              )}
            </section>

            {/* Overview */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.overviewIconContainer}>
                  <Image
                    src="/assets/OverviewIcon.png"
                    alt="Overview"
                    width={30}
                    height={30}
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
                    width={30}
                    height={30}
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
                          width={30}
                          height={30}
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
              <button className={styles.button} onClick={handlePrototype}>
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
              <h3 className={styles.cardTitle}>Project Details</h3>
              <div className={styles.details}>
                {projectDetails.map((detail, index) => (
                  <div key={index} className={styles.detailItem}>
                    <Image
                      src={detail.icon}
                      alt=""
                      width={8.488}
                      height={9.701}
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
