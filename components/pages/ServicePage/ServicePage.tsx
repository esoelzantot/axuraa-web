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
import { getDictionary } from "@/lib/dictionaries";

interface Props {
  service: ServiceItem;
  locale: Locale;
}

// Step icons, in the order of t.serviceDetail.steps
const STEP_ICONS: LucideIcon[] = [Search, PenTool, Code2, FlaskConical, Rocket];
// Which package is highlighted (index into t.serviceDetail.packages)
const POPULAR_PACKAGE = 1;

const ServicePage: React.FC<Props> = ({ service, locale }) => {
  const contactHref = `/${locale}/contact#contact-form`;
  const t = getDictionary(locale);
  const d = t.serviceDetail;

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
        title1={getStr(service.title, locale) || d.fallbackTitle}
        title2=""
        subtitle1={getStr(service.description, locale) || d.fallbackDescription}
        badgeText={t.hero.innovationBadge}
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
            <SectionHead id="sp-what" eyebrow={d.overview} title={d.whatWeDo} align="start" />
            <p className={styles.lead} data-reveal="up">
              {getStr(service.what_we_do?.description, locale) ||
                d.whatWeDoFallback}
            </p>
            <ul className={styles.units} data-reveal-stagger="left">
              {(units.length ? units : [d.unitFallback]).map((unit, i) => (
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
            <aside className={styles.techCard} data-reveal="right" aria-labelledby="sp-tech">
              <span className={styles.techGlow} aria-hidden="true" />
              <h3 id="sp-tech" className={styles.techTitle}>
                {d.technologies}
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
            eyebrow={d.featuresEyebrow}
            title={d.featuresTitle}
            intro={
              getStr(service.description_features, locale) ||
              d.featuresIntro
            }
          />
          {features.length > 0 && (
            <div className={styles.featureGrid} data-reveal-stagger>
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
            eyebrow={d.processEyebrow}
            title={d.processTitle}
            intro={d.processIntro}
          />
          <ol className={styles.steps} data-reveal-stagger="zoom">
            {d.steps.map(({ title, description }, i) => {
              const Icon = STEP_ICONS[i] ?? Rocket;
              return (
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
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- Success Stories ---------- */}
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="sp-stories">
        <div className={styles.inner}>
          <SectionHead
            id="sp-stories"
            eyebrow={d.storiesEyebrow}
            title={d.storiesTitle}
            intro={
              getStr(service.description_stories, locale) ||
              d.storiesIntro
            }
          />

          {successStories.length > 0 && (
            <div
              className={`${styles.storyGrid} ${successStories.length === 1 ? styles.storySolo : ""}`}
              data-reveal-stagger
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
                      {t.common.viewCaseStudy}
                      <span className={styles.storyArrow} aria-hidden="true">
                        <ArrowUpRight size={18} />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <figure className={styles.testimonial} data-reveal="zoom">
            <Quote className={styles.quoteMark} size={36} aria-hidden="true" />
            <blockquote className={styles.quoteText}>
              &ldquo;{d.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className={styles.quoteAuthor}>
              <span className={styles.avatar} aria-hidden="true">
                {d.testimonial.name.split(" ").map((w) => w.charAt(0)).slice(0, 2).join("")}
              </span>
              <span>
                <strong>{d.testimonial.name}</strong>
                <span className={styles.authorRole}>{d.testimonial.role}</span>
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
            eyebrow={d.packagesEyebrow}
            title={d.packagesTitle}
            intro={d.packagesIntro}
          />
          <div className={styles.packages} data-reveal-stagger>
            {d.packages.map((pkg, pkgIndex) => (
              <article
                key={pkg.title}
                className={`${styles.pkg} ${pkgIndex === POPULAR_PACKAGE ? styles.pkgPopular : ""}`}
              >
                {pkgIndex === POPULAR_PACKAGE && <span className={styles.popular}>{t.common.mostPopular}</span>}
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
                  {t.common.getStarted} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.cta} data-reveal="zoom">
            <span className={styles.ctaPattern} aria-hidden="true" />
            <div className={styles.ctaCopy}>
              <h2 className={styles.ctaTitle}>{d.ctaTitle}</h2>
              <p className={styles.ctaText}>{d.ctaText}</p>
            </div>
            <Link href={contactHref} className={styles.ctaBtn}>
              {d.ctaButton}
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
