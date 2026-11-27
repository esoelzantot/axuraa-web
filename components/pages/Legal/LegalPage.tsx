import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, Layers, Mail } from "lucide-react";
import styles from "./LegalPage.module.css";
import LegalToc, { type TocItem } from "./LegalToc";
import { getLegalUi, type LegalBlock, type LegalDoc } from "@/lib/dictionaries/legal";
import type { Locale } from "@/lib/i18n";

type Kind = "privacy" | "terms";

const HREF: Record<Kind, string> = { privacy: "privacy-policy", terms: "terms-of-service" };
const CONTACT_EMAIL = "info@axuraa.com";

/** Privacy: a shield with a keyhole. Terms: a signed and sealed document. */
const Emblem = ({ kind }: { kind: Kind }) => (
  <svg className={styles.emblem} viewBox="0 0 160 160" fill="none" aria-hidden="true">
    {kind === "privacy" ? (
      <>
        <path className={styles.emSoft} d="M80 14l52 18v40c0 34-22 60-52 74-30-14-52-40-52-74V32z" />
        <path className={styles.emLine} d="M80 28l40 14v31c0 26-17 46-40 58-23-12-40-32-40-58V42z" />
        <circle className={styles.emAccent} cx="80" cy="74" r="11" />
        <path className={styles.emAccentFill} d="M75 84h10l3 22H72z" />
      </>
    ) : (
      <>
        <rect className={styles.emSoft} x="34" y="18" width="84" height="112" rx="12" transform="rotate(-6 76 74)" />
        <rect className={styles.emLine} x="40" y="22" width="84" height="112" rx="12" />
        <path className={styles.emFaint} d="M56 46h52M56 60h52M56 74h36" />
        <path className={styles.emAccent} d="M56 104c8-10 12-10 14-2s6 8 12-4" />
        <circle className={styles.emSeal} cx="112" cy="116" r="18" />
        <path className={styles.emSealMark} d="M104 116l6 6 11-12" />
      </>
    )}
  </svg>
);

const Block = ({ block }: { block: LegalBlock }) => {
  switch (block.type) {
    case "p":
      return <p className={styles.paragraph}>{block.text}</p>;
    case "h3":
      return <h3 className={styles.subTitle}>{block.text}</h3>;
    case "list":
      return (
        <ul className={styles.list}>
          {block.items.map((item, j) => (
            <li key={j} className={styles.listItem}>
              <span className={styles.tick} aria-hidden="true">
                <Check size={13} strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "email":
      return (
        <p className={styles.paragraph}>
          {block.label}{" "}
          <a href={`mailto:${block.email}`} className={styles.mailLink} dir="ltr">
            <Mail size={15} aria-hidden="true" />
            {block.email}
          </a>
        </p>
      );
  }
};

/** "3. Legal Basis" -> { number: "03", title: "Legal Basis" } (falls back to the position). */
const splitTitle = (raw: string, index: number) => {
  const match = raw.match(/^\s*(\d+)[.)]\s*(.*)$/);
  const n = match ? Number(match[1]) : index + 1;
  return { number: String(n).padStart(2, "0"), title: match ? match[2] : raw };
};

const countWords = (doc: LegalDoc) =>
  [doc.intro, ...doc.sections.flatMap((s) => [s.title, ...s.blocks.flatMap((b) => ("items" in b ? b.items : "text" in b ? [b.text] : [b.label]))])]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

/**
 * Legal document page (Privacy Policy / Terms of Service), in either language.
 * Built for reading and trust: a calm hero, a switch between the two documents,
 * a table of contents that follows the reader, numbered sections and a way to ask.
 */
const LegalPage = ({ doc, kind, locale }: { doc: LegalDoc; kind: Kind; locale: Locale }) => {
  const ui = getLegalUi(locale);
  const sections = doc.sections.map((s, i) => ({ ...s, ...splitTitle(s.title, i), id: `section-${i + 1}` }));
  const toc: TocItem[] = sections.map(({ id, number, title }) => ({ id, number, title }));
  const minutes = Math.max(1, Math.round(countWords(doc) / 200));

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>{ui.eyebrow}</span>
          <h1 className={styles.title}>{doc.title}</h1>
          <p className={styles.intro}>{doc.intro}</p>
          <ul className={styles.meta}>
            <li>
              <Layers size={15} aria-hidden="true" />
              {ui.sections(sections.length)}
            </li>
            <li>
              <Clock size={15} aria-hidden="true" />
              {ui.readTime(minutes)}
            </li>
          </ul>
        </div>
        <Emblem kind={kind} />
      </header>

      <nav className={styles.switch} aria-label={ui.docsNav}>
        {(Object.keys(HREF) as Kind[]).map((k) => (
          <Link
            key={k}
            href={`/${locale}/${HREF[k]}`}
            className={`${styles.switchItem} ${k === kind ? styles.switchActive : ""}`}
            aria-current={k === kind ? "page" : undefined}
          >
            {ui.names[k]}
          </Link>
        ))}
      </nav>

      <div className={styles.body}>
        <LegalToc items={toc} label={ui.onThisPage} />

        <article className={styles.content}>
          {sections.map((section) => (
            <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
              <span className={styles.number} aria-hidden="true">
                {section.number}
              </span>
              <div className={styles.sectionBody}>
                <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
                  {section.title}
                </h2>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}

          <aside className={styles.ask}>
            <div>
              <h2 className={styles.askTitle}>{ui.questionsTitle}</h2>
              <p className={styles.askText}>{ui.questionsText}</p>
            </div>
            <div className={styles.askActions}>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.askMail} dir="ltr">
                <Mail size={16} aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <Link href={`/${locale}/contact`} className={styles.askButton}>
                {ui.contactUs}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </article>
      </div>
    </div>
  );
};

export default LegalPage;
