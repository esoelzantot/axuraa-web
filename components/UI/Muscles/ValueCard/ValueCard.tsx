import React from "react";
import Image from "next/image";
import { Handshake, Lightbulb, Rocket, ShieldCheck, type LucideIcon } from "lucide-react";
import styles from "./ValueCard.module.css";
import { ValueCardProps } from "@/types/Generals/cardTypes";

// Pick a matching icon from the value's title; fall back to the given image.
const ICON_RULES: [RegExp, LucideIcon][] = [
  [/innovat|idea|creativ/i, Lightbulb],
  [/integrity|trust|transparen|secur/i, ShieldCheck],
  [/partner|team|collab/i, Handshake],
  [/agile|fast|speed|deliver|execution/i, Rocket],
];

/** "Why Axuraa" value card: numbered, icon tile, title, text, growing accent line. */
const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, index }) => {
  const Icon = ICON_RULES.find(([re]) => re.test(title))?.[1];

  return (
    <article className={styles.card}>
      {typeof index === "number" && (
        <span className={styles.num} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span className={styles.iconWrapper} aria-hidden="true">
        {Icon ? (
          <Icon size={24} strokeWidth={1.8} />
        ) : (
          <Image src={icon} alt="" width={26} height={26} />
        )}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.accentLine} aria-hidden="true" />
    </article>
  );
};

export default React.memo(ValueCard);
