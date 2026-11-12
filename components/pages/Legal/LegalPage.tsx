import React from "react";
import styles from "./LegalPage.module.css";
import type { LegalDoc } from "@/lib/dictionaries/legal";

const BulletIcon = () => (
  <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 1.66675C5.4 1.66675 1.66666 5.40008 1.66666 10.0001C1.66666 14.6001 5.4 18.3334 10 18.3334C14.6 18.3334 18.3333 14.6001 18.3333 10.0001C18.3333 5.40008 14.6 1.66675 10 1.66675ZM8.33333 15L3.33333 10.0001L4.55 8.78341L8.33333 12.5584L15.45 5.44175L16.6667 6.66675L8.33333 15Z"
      fill="#D04A1D"
    />
  </svg>
);

/** Renders a structured legal document (Privacy Policy / Terms of Service) in either language. */
const LegalPage = ({ doc }: { doc: LegalDoc }) => (
  <div className={styles.pageContainer}>
    <div className={styles.contentWrapper}>
      <h1 className={styles.mainTitle}>{doc.title}</h1>
      <p className={styles.introText}>{doc.intro}</p>

      {doc.sections.map((section) => (
        <section key={section.title} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          {section.blocks.map((block, i) => {
            switch (block.type) {
              case "p":
                return (
                  <p key={i} className={styles.paragraph}>
                    {block.text}
                  </p>
                );
              case "h3":
                return (
                  <h3 key={i} className={styles.subTitle}>
                    {block.text}
                  </h3>
                );
              case "list":
                return (
                  <ul key={i} className={styles.list}>
                    {block.items.map((item) => (
                      <li key={item} className={styles.listItem}>
                        <BulletIcon />
                        <span className={styles.itemText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              case "email":
                return (
                  <p key={i} className={styles.paragraph}>
                    {block.label}{" "}
                    <a href={`mailto:${block.email}`} className={styles.contactLink} dir="ltr">
                      {block.email}
                    </a>
                  </p>
                );
            }
          })}
        </section>
      ))}
    </div>
  </div>
);

export default LegalPage;
