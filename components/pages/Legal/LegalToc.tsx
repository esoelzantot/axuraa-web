"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./LegalPage.module.css";

export interface TocItem {
  id: string;
  number: string;
  title: string;
}

/**
 * Table of contents: sticky beside the text on wide screens, a collapsible
 * list on phones. Highlights the section being read.
 */
const LegalToc = ({ items, label }: { items: TocItem[]; label: string }) => {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const index = Math.max(0, items.findIndex((i) => i.id === active));

  return (
    <nav className={styles.toc} aria-label={label}>
      <button
        type="button"
        className={styles.tocToggle}
        aria-expanded={open}
        aria-controls="legal-toc-list"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{label}</span>
        <span className={styles.tocCount}>
          {index + 1}/{items.length}
        </span>
        <ChevronDown size={18} className={styles.tocChevron} aria-hidden="true" />
      </button>

      <p className={styles.tocLabel}>{label}</p>
      <span className={styles.tocProgress} aria-hidden="true">
        <span style={{ transform: `scaleY(${(index + 1) / items.length})` }} />
      </span>

      <ol id="legal-toc-list" className={`${styles.tocList} ${open ? styles.tocOpen : ""}`}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${styles.tocLink} ${item.id === active ? styles.tocActive : ""}`}
              aria-current={item.id === active ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className={styles.tocNum}>{item.number}</span>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default LegalToc;
