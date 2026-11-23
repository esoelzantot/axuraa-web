"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, FolderOpen, Layers, Code, MessageCircle } from "lucide-react";
import styles from "./EmptyState.module.css";
import { Locale } from "@/lib/i18n";
import useDictionary from "@/hooks/useDictionary";

const ICONS = { services: Code, solutions: Layers, projects: FolderOpen, feedback: MessageCircle };

interface EmptyStateProps {
  kind: keyof typeof ICONS;
  locale: Locale;
  /** Heading level that fits the page outline. */
  as?: "h2" | "h3";
  /** Use the "nothing in this filter" wording, with a button that clears the filter. */
  onClearFilter?: () => void;
}

/**
 * Shown in place of a list that has nothing in it. The mark is the logo's
 * eight arms around the section's icon, with a light travelling over them.
 */
const EmptyState = ({ kind, locale, as: Heading = "h3", onClearFilter }: EmptyStateProps) => {
  const { t } = useDictionary();
  const copy = onClearFilter ? t.empty.filter : t.empty[kind];
  const Icon = ICONS[kind];

  return (
    <div className={styles.empty} role="status">
      <div className={styles.mark} aria-hidden="true">
        <svg viewBox="-60 -60 120 120" fill="currentColor">
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <path className={styles.arm} style={{ "--i": i } as CSSProperties} d="M0-33L4.5-51 0-59-4.5-51z" />
            </g>
          ))}
        </svg>
        <Icon className={styles.icon} size={30} strokeWidth={1.6} />
      </div>

      <Heading className={styles.title}>{copy.title}</Heading>
      <p className={styles.text}>{copy.text}</p>

      {onClearFilter ? (
        <button type="button" className={styles.action} onClick={onClearFilter}>
          {t.empty.showAll}
        </button>
      ) : (
        <Link href={`/${locale}/contact#contact-form`} className={styles.action}>
          {t.common.startProject}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
