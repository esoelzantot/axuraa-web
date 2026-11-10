import React from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import styles from "./ContactInfoCard.module.css";
import { ContactInfoCardProps } from "@/types/Generals/cardTypes";

/** Phone / email card in the contact block. Renders a link when `href` is given. */
const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon, label, value, href, onClick }) => {
  const lower = `${icon} ${label}`.toLowerCase();
  const Icon = lower.includes("phone") ? Phone : lower.includes("mail") ? Mail : null;

  const content = (
    <>
      <span className={styles.iconContainer} aria-hidden="true">
        {Icon ? (
          <Icon size={22} strokeWidth={1.9} />
        ) : (
          <Image src={icon} alt="" width={24} height={24} className={styles.iconImage} />
        )}
      </span>
      <span className={styles.textContainer}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <ArrowUpRight size={16} />
      </span>
    </>
  );

  return href ? (
    <a href={href} className={styles.contactCard} onClick={onClick}>
      {content}
    </a>
  ) : (
    <div className={styles.contactCard} onClick={onClick}>
      {content}
    </div>
  );
};

export default React.memo(ContactInfoCard);
