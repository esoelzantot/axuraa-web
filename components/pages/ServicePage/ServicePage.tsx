// components/pages/ServicePage/ServicePage.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  FlaskConical,
  PenTool,
  Quote,
  Rocket,
  Search,
  type LucideIcon,
} from "lucide-react";
import styles from "./ServicePage.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import SectionHead from "@/components/Layout/SectionHead/SectionHead";
import ServiceIcon from "@/components/UI/Atoms/ServiceIcon/ServiceIcon";
import { ServiceItem } from "@/service/serviceId/serviceId";
import { Locale, localize as getStr } from "@/lib/i18n";

interface Props {
  service: ServiceItem;
  locale: Locale;
}

const developmentProcess: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Discovery", description: "We analyze your requirements and create a detailed project plan.", icon: Search },
  { title: "Design", description: "Our designers create wireframes and UI/UX designs for your approval.", icon: PenTool },
  { title: "Development", description: "Our developers bring the design to life with clean, efficient code.", icon: Code2 },
  { title: "Testing", description: "We thoroughly test all features to ensure quality and performance.", icon: FlaskConical },
  { title: "Launch & Support", description: "We deploy your project and provide ongoing support and maintenance.", icon: Rocket },
];

const servicePackages = [
  {
    title: "Starter Package",
    description: "Perfect for small businesses",
    features: [
      "5 pages website",
      "Mobile responsive",
      "Basic SEO",
      "Contact form",
      "1 month support",
      "E-commerce integration",
      "Analytics dashboard",
    ],
    isPopular: false,
  },
  {
    title: "Professional Package",
    description: "Ideal for growing businesses",
    features: [
      "10 pages website",
      "Mobile responsive",
      "Advanced SEO",
      "Contact form",
      "3 months support",
      "E-commerce integration",
      "Analytics dashboard",
    ],
    isPopular: true,
  },
  {
    title: "Enterprise Package",
    description: "For large scale businesses",
    features: [
      "Unlimited pages",
      "Mobile responsive",
      "Premium SEO",
      "Advanced forms",
      "6 months support",
      "E-commerce integration",
      "Analytics dashboard",
    ],
    isPopular: false,
  },
];

const ServicePage: React.FC<Props> = ({ service, locale }) => {
  const contactHref = `/${locale}/contact#contact-form`;

  const features =
    service.features?.map((f) => ({
      title: getStr(f.title, locale),
      description: getStr(f.description, locale),
      icon: f.icon || "",
    })) ?? [];

  const successStories =
    service.projects
      ?.map((sp) => sp.projects_id)
      // a link can outlive its project; skip dangling references
      .filter((p): p is NonNullable<typeof p> => Boolean(p?._id))
      .map((p) => ({
        id: p._id,
        title: getStr(p.title, locale),
        description: getStr(p.overview, locale),
        image: p.main_image_url || "",
        metrics:
          p.case_study_results?.map((r) => ({
            label: getStr(r.description, locale),
            value: r.value,
          })) ?? [],
      })) ?? [];

  const technologies = service.technologies_used?.map((t) => t.name) ?? [];
  const units = (service.what_we_do?.units ?? []).map((u) => getStr(u, locale)).filter(Boolean);

  return (
    <div className={styles.page}>
      <HeroSection
        primaryHref={contactHref}
        title1={getStr(service.title, locale) || "Service"}
        title2=""
        subtitle1={getStr(service.description, locale) || "Service description"}
        badgeText="INNOVATION IN PROGRESS"
        showBackgroundDots={false}
        showAnimatedCircles={true}
        showBadge={false}
        showTrustedSection={false}
        showPrimaryButton={true}
        showSecondaryButton={false}
        showEllipseDecorations={true}
        showStatusBadge={true}
        backgroundType="Circle"
        height="70vh"
      />

      {/* ---------- What We Do + Technologies ---------- */}
      <section className={styles.section} aria-labelledby="sp-what">
        <div className={`${styles.inner} ${styles.whatGrid}`}>
          <div className={styles.whatMain}>
            <SectionHead id="sp-what" eyebrow="Overview" title="What We Do" align="start" />
            <p className={styles.lead}>
              {getStr(service.what_we_do?.description, locale) ||
                "Our experts build exceptional digital experiences."}
            </p>
            <ul className={styles.units}>
              {(units.length ? units : ["Custom application and platform development"]).map((unit, i) => (
                <li key={i} className={styles.unit}>
                  <span className={styles.unitCheck} aria-hidden="true">
                    <Check size={14} strokeWidth={2.75} />
                  </span>
                  <span>{unit}</span>
                </li>
              ))}
            </ul>
          </div>

          {technologies.length > 0 && (
            <aside className={styles.techCard} aria-labelledby="sp-tech">
              <span className={styles.techGlow} aria-hidden="true" />
              <h3 id="sp-tech" className={styles.techTitle}>
                Technologies Used
              </h3>
              <ul className={styles.techList}>
                {technologies.map((tech) => (
                  <li key={tech} className={styles.techChip}>
                    {tech}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>

      {/* ---------- Features & Capabilities ---------- */}
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="sp-features">
        <div className={styles.inner}>
          <SectionHead
            id="sp-features"
            eyebrow="Our Features"
            title="Features & Capabilities"
            intro={
              getStr(service.description_features, locale) ||
              "Comprehensive services designed to build and scale your digital presence."
            }
          />
          {features.length > 0 && (
            <div className={styles.featureGrid}>
              {features.map((f, i) => (
                <article key={i} className={styles.featureCard}>
                  <span className={styles.featureNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.featureIcon}>
                    <ServiceIcon
                      icon={f.icon}
                      title={f.title}
                      sizes="52px"
                      imageClassName={styles.featureImg}
                      svgClassName={styles.featureSvg}
                    />
                  </span>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureText}>{f.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- Development Process ---------- */}
      <section className={styles.section} aria-labelledby="sp-process">
        <div className={styles.inner}>
          <SectionHead
            id="sp-process"
            eyebrow="Our Process"
            title="Our Development Process"
            intro="A systematic approach that ensures a high-quality product through discovery, design, implementation, and support."
          />
          <ol className={styles.steps}>
            {developmentProcess.map(({ title, description, icon: Icon }, i) => (
              <li key={title} className={styles.step}>
                <span className={styles.stepMarker}>
                  <span className={styles.stepIcon} aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <span className={styles.stepNum}>{i + 1}</span>
                </span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Success Stories ---------- */}
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="sp-stories">
        <div className={styles.inner}>
          <SectionHead
            id="sp-stories"
            eyebrow="Our Stories"
            title="Success Stories"
            intro={
              getStr(service.description_stories, locale) ||
              "Real results demonstrating measurable improvements in digital performance."
            }
          />

          {successStories.length > 0 && (
            <div
              className={`${styles.storyGrid} ${successStories.length === 1 ? styles.storySolo : ""}`}
            >
              {successStories.map((story) => (
                <article key={story.id} className={styles.storyCard}>
                  <div className={styles.storyMedia}>
                    {!story.image && (
                      <span className={styles.storyPlaceholder} aria-hidden="true">
                        {story.title.charAt(0)}
                      </span>
                    )}
                    {story.image && (
                      <Image
                        src={story.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 92vw, 540px"
                        className={styles.storyImg}
                        unoptimized={
                          story.image.startsWith("http") && !story.image.includes("res.cloudinary.com")
                        }
                      />
                    )}
                    <span className={styles.storyShade} aria-hidden="true" />
                  </div>
                  <div className={styles.storyBody}>
                    <h3 className={styles.storyTitle}>{story.title}</h3>
                    <p className={styles.storyText}>{story.description}</p>
                    {story.metrics.length > 0 && (
                      <dl className={styles.metrics}>
                        {story.metrics.slice(0, 4).map((m, i) => (
                          <div key={i} className={styles.metric}>
                            <dt>{m.label}</dt>
                            <dd>{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <Link href={`/${locale}/case-study/${story.id}`} className={styles.storyLink}>
                      View case study
                      <span className={styles.storyArrow} aria-hidden="true">
                        <ArrowUpRight size={18} />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <figure className={styles.testimonial}>
            <Quote className={styles.quoteMark} size={36} aria-hidden="true" />
            <blockquote className={styles.quoteText}>
              &ldquo;The team completely transformed our online presence. Their design sense is
              brilliant, and the development process was smooth and transparent.&rdquo;
            </blockquote>
            <figcaption className={styles.quoteAuthor}>
              <span className={styles.avatar} aria-hidden="true">
                SJ
              </span>
              <span>
                <strong>Sarah Johnson</strong>
                <span className={styles.authorRole}>CEO, TechStart Inc.</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Service Packages + CTA ---------- */}
      <section className={styles.section} aria-labelledby="sp-packages">
        <div className={styles.inner}>
          <SectionHead
            id="sp-packages"
            eyebrow="Our Packages"
            title="Service Packages"
            intro="Choose the solution that fits your business needs."
          />
          <div className={styles.packages}>
            {servicePackages.map((pkg) => (
              <article
                key={pkg.title}
                className={`${styles.pkg} ${pkg.isPopular ? styles.pkgPopular : ""}`}
              >
                {pkg.isPopular && <span className={styles.popular}>Most Popular</span>}
                <h3 className={styles.pkgTitle}>{pkg.title}</h3>
                <p className={styles.pkgText}>{pkg.description}</p>
                <ul className={styles.pkgList}>
                  {pkg.features.map((feature) => (
                    <li key={feature}>
                      <span className={styles.unitCheck} aria-hidden="true">
                        <Check size={13} strokeWidth={2.75} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={contactHref} className={styles.pkgBtn}>
                  Get Started <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.cta}>
            <span className={styles.ctaPattern} aria-hidden="true" />
            <div className={styles.ctaCopy}>
              <h2 className={styles.ctaTitle}>Free Project Consultation</h2>
              <p className={styles.ctaText}>
                Get a comprehensive evaluation of your project goals with our complimentary
                assessment.
              </p>
            </div>
            <Link href={contactHref} className={styles.ctaBtn}>
              Schedule Free Assessment
              <span className={styles.ctaArrow} aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(ServicePage);
