import React from "react";
import SectionHead from "@/components/Layout/SectionHead/SectionHead";
import EmailCard from "@/components/UI/Muscles/EmailCard/EmailCard";
import styles from "./EmailSection.module.css";

interface ContactData {
  name: string;
  email: string;
  description: string;
  icon: string;
}

interface EmailSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  contacts: ContactData[];
  className?: string;
}

const EmailSection: React.FC<EmailSectionProps> = ({
  eyebrow = "Email Us",
  title = "Contact via Email",
  subtitle = "Choose the appropriate section for your inquiry.",
  contacts,
  className = "",
}) => {
  if (contacts.length === 0) return null;

  return (
    <section className={`${styles.emailSection} ${className}`} aria-labelledby="contact-email">
      <div className={styles.container}>
        <SectionHead id="contact-email" eyebrow={eyebrow} title={title} intro={subtitle} />

        <div className={styles.cardsGrid}>
          {contacts.map((contact, index) => (
            <EmailCard
              key={`${contact.email}-${index}`}
              index={index}
              name={contact.name}
              email={contact.email}
              description={contact.description}
              icon={contact.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
