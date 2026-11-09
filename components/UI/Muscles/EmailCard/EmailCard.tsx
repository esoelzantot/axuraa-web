import React from "react";
import { ArrowUpRight, BadgeDollarSign, Headphones, Info, Mail, type LucideIcon } from "lucide-react";
import styles from "./EmailCard.module.css";

interface EmailCardProps {
  name: string;
  email: string;
  description: string;
  icon: string;
  index?: number;
  className?: string;
}

const ICONS: Record<string, LucideIcon> = {
  info: Info,
  support: Headphones,
  sales: BadgeDollarSign,
  email: Mail,
};

/** Department email card (Contact page). The whole card is a mailto link. */
const EmailCard: React.FC<EmailCardProps> = ({
  name,
  email,
  description,
  icon,
  index,
  className = "",
}) => {
  const Icon = ICONS[(icon || name).toLowerCase()] ?? Mail;

  return (
    <a href={`mailto:${email}`} className={`${styles.card} ${className}`}>
      {typeof index === "number" && (
        <span className={styles.num} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span className={styles.tile} aria-hidden="true">
        <Icon size={24} strokeWidth={1.75} />
      </span>
      <h3 className={styles.title}>{name}</h3>
      {description && <p className={styles.description}>{description}</p>}
      <span className={styles.footer}>
        <span className={styles.address}>
          <Mail size={15} aria-hidden="true" />
          <span>{email}</span>
        </span>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </span>
    </a>
  );
};

export default EmailCard;
