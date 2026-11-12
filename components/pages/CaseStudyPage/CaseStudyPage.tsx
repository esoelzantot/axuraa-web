"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  MapPin,
  Package,
  Quote,
  Sparkles,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import styles from "./CaseStudyPage.module.css";
import { ProjectItem, Testimonial } from "@/service/Projects/projects";
import { Locale, localize } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

interface CaseStudyPageProps {
  project: ProjectItem;
  locale: Locale;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "A";

/** Splits the title so its last word can carry the brand gradient. */
const splitTitle = (title: string) => {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return { lead: "", last: title };
  return { lead: words.slice(0, -1).join(" "), last: words[words.length - 1] };
};

const QUOTES_PREVIEW = 2;

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ project, locale }) => {
  const [showAllQuotes, setShowAllQuotes] = useState(false);
  const t = getDictionary(locale);
  const c = t.caseStudy;
  // All data transformation happens here — no fetching, no loading states
  const caseStudy = {
    title: localize(project.title, locale) || c.fallbackTitle,
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
    client: project.client_id?.name || "—",
    projectManager: project.project_manager || "—",
    timeframe: project.start_work
      ? new Date(project.start_work).toLocaleDateString(c.dateLocale, {
          year: "numeric",
          month: "short",
        })
      : "—",
    team: c.teamMembers(project.team_members?.length || 0),
    location: project.location || "—",
    url: project.url_deployment || null,
    results:
      project.case_study_results?.map((r) => ({
        metric: localize(r.description, locale),
        value: r.value,
      })) || [],
    testimonials:
      project.testimonials?.map((q: Testimonial) => ({
        text: localize(q.message, locale),
        author: q.client_id?.name || c.anonymous,
        company: q.client_id?.company_name || "",
      })) || [],
    mainImage: project.main_image_url ?? null,
  };

  // Domain shown in the frame's address bar (falls back to the site's own domain)
  const frameHost = (() => {
    try {
      return caseStudy.url ? new URL(caseStudy.url).hostname.replace(/^www\./, "") : "axuraa.com";
    } catch {
      return "axuraa.com";
    }
  })();

  const details: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: UserRound, label: c.client, value: caseStudy.client },
    { icon: Briefcase, label: c.projectManager, value: caseStudy.projectManager },
    { icon: CalendarDays, label: c.started, value: caseStudy.timeframe },
    { icon: UsersRound, label: c.team, value: caseStudy.team },
    { icon: MapPin, label: c.location, value: caseStudy.location },
  ];

  const { lead, last } = splitTitle(caseStudy.title);
  const quotes = showAllQuotes
    ? caseStudy.testimonials
    : caseStudy.testimonials.slice(0, QUOTES_PREVIEW);
  const hiddenQuotes = caseStudy.testimonials.length - QUOTES_PREVIEW;
  const contactHref = `/${locale}/contact#contact-form`;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <nav className={styles.breadcrumb} aria-label={c.breadcrumb}>
          <Link href={`/${locale}`}>{t.nav.home}</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href={`/${locale}/portfolio`}>{t.nav.portfolio}</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{caseStudy.title}</span>
        </nav>
      </div>

      <div className={styles.layout}>
        {/* Main content */}
        <main className={styles.main}>
          {/* Hero */}
          <section className={styles.hero}>
            <span className={styles.heroGlow} aria-hidden="true" />
            <span className={styles.eyebrow}>
              <Sparkles size={14} aria-hidden="true" /> {t.common.caseStudy}
            </span>
            <h1 className={styles.title}>
              {lead && <>{lead} </>}
              <span className={styles.titleAccent}>{last}</span>
            </h1>
            {caseStudy.subtitle && <p className={styles.subtitle}>{caseStudy.subtitle}</p>}

            {caseStudy.tags.length > 0 && (
              <ul className={styles.tags} aria-label={t.nav.services}>
                {caseStudy.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {caseStudy.mainImage && (
              <figure className={styles.frame} data-reveal="clip">
                <span className={styles.frameGlow} aria-hidden="true" />
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
                      alt={caseStudy.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className={styles.frameImage}
                      priority
                    />
                  </div>
                </div>
              </figure>
            )}
          </section>

          {/* Overview */}
          <section className={styles.block} aria-labelledby="cs-overview" data-reveal="up">
            <div className={styles.blockHead}>
              <span className={styles.blockNum}>01</span>
              <h2 id="cs-overview" className={styles.blockTitle}>
                {c.overview}
              </h2>
            </div>
            <p className={styles.overview}>{caseStudy.overview}</p>
          </section>

          {/* Key Features */}
          {caseStudy.features.length > 0 && (
            <section className={styles.block} aria-labelledby="cs-features" data-reveal="up">
              <div className={styles.blockHead}>
                <span className={styles.blockNum}>02</span>
                <h2 id="cs-features" className={styles.blockTitle}>
                  {c.keyFeatures}
                </h2>
              </div>
              <p className={styles.blockIntro}>{c.featuresIntro}</p>
              <div className={styles.features} data-reveal-stagger>
                {caseStudy.features.map((feature, idx) => (
                  <article key={idx} className={styles.feature}>
                    <span className={styles.featureIcon}>
                      {feature.icon ? (
                        <Image src={feature.icon} alt="" width={26} height={26} />
                      ) : (
                        <Package size={22} aria-hidden="true" />
                      )}
                    </span>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureText}>{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar} data-reveal-stagger>
          {/* Results */}
          <section className={styles.panel} aria-labelledby="cs-results">
            <h2 id="cs-results" className={styles.panelTitle}>
              {c.results}
            </h2>
            {caseStudy.results.length > 0 && (
              <div className={styles.results} data-reveal-stagger="zoom">
                {caseStudy.results.map((r, idx) => (
                  <div key={idx} className={styles.result}>
                    <span className={styles.resultValue}>{r.value}</span>
                    <span className={styles.resultLabel}>{r.metric}</span>
                  </div>
                ))}
              </div>
            )}
            {caseStudy.url ? (
              <a
                href={caseStudy.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.panelBtn}
              >
                {c.showPrototype} <ExternalLink size={18} aria-hidden="true" />
              </a>
            ) : (
              <span
                className={`${styles.panelBtn} ${styles.disabled}`}
                aria-disabled="true"
                title={c.prototypeUnavailable}
              >
                {c.prototypeUnavailable}
              </span>
            )}
          </section>

          {/* Consultation */}
          <section className={styles.cta} aria-labelledby="cs-cta">
            <span className={styles.ctaPattern} aria-hidden="true" />
            <h2 id="cs-cta" className={styles.ctaTitle}>
              {c.ctaTitle}
            </h2>
            <p className={styles.ctaText}>{c.ctaText}</p>
            <Link href={contactHref} className={styles.ctaBtn}>
              {c.ctaButton}
              <span className={styles.ctaArrow} aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </section>

          {/* Testimonials */}
          {caseStudy.testimonials.length > 0 && (
            <section className={styles.panel} aria-labelledby="cs-testimonials">
              <h2 id="cs-testimonials" className={styles.panelTitle}>
                {c.testimonials}
              </h2>
              <div className={styles.quotes}>
                {quotes.map((t, idx) => (
                  <figure key={idx} className={styles.quote}>
                    <Quote className={styles.quoteMark} size={22} aria-hidden="true" />
                    <blockquote className={styles.quoteText}>{t.text}</blockquote>
                    <figcaption className={styles.quoteAuthor}>
                      <span className={styles.avatar} aria-hidden="true">
                        {initials(t.author)}
                      </span>
                      <span>
                        <strong>{t.author}</strong>
                        {t.company && <span className={styles.company}>{t.company}</span>}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              {hiddenQuotes > 0 && (
                <button
                  type="button"
                  className={styles.moreBtn}
                  aria-expanded={showAllQuotes}
                  onClick={() => setShowAllQuotes((v) => !v)}
                >
                  {showAllQuotes ? c.showLess : c.showMore(hiddenQuotes)}
                </button>
              )}
            </section>
          )}

          {/* Project Details */}
          <section className={styles.panel} aria-labelledby="cs-details">
            <h2 id="cs-details" className={styles.panelTitle}>
              {c.details}
            </h2>
            <dl className={styles.details}>
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className={styles.detail}>
                  <dt>
                    <span className={styles.detailIcon} aria-hidden="true">
                      <Icon size={16} />
                    </span>
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default React.memo(CaseStudyPage);
