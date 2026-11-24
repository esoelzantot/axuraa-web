"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./EmptyState.module.css";
import EmptyScene, { type EmptyKind } from "./EmptyScene";
import { Locale } from "@/lib/i18n";
import useDictionary from "@/hooks/useDictionary";

interface EmptyStateProps {
  kind: EmptyKind;
  locale: Locale;
  /** Heading level that fits the page outline. */
  as?: "h2" | "h3";
  /** Use the "nothing in this filter" wording, with a button that clears the filter. */
  onClearFilter?: () => void;
}

/**
 * Shown in place of a list that has nothing in it: a scene that tells what the
 * section is about, a short message and one next step.
 */
const EmptyState = ({ kind, locale, as: Heading = "h3", onClearFilter }: EmptyStateProps) => {
  const { t } = useDictionary();
  const copy = onClearFilter ? t.empty.filter : t.empty[kind];

  return (
    <div className={styles.empty} role="status">
      <EmptyScene kind={kind} />

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
