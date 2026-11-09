import React from "react";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import EmailCard from "@/components/UI/Muscles/EmailCard/EmailCard";
import styles from "./EmailSection.module.css";

interface ContactData {
  name: string;
  email: string;
  description: string;
  icon: string;
}

interface EmailSectionProps {
  title1?: string;
  title2?: string;
  subtitle?: string;
  contacts: ContactData[];
  className?: string;
}

const EmailSection: React.FC<EmailSectionProps> = ({
  title1 = "Contact via",
  title2 = "email",
  subtitle = "Choose the appropriate section for your inquiry",
  contacts,
  className = "",
}) => {
  if (contacts.length === 0) return null;

  return (
    <section className={`${styles.emailSection} ${className}`}>
      <div className={styles.container}>
        <SectionHeader
          title1={title1}
          title2={title2}
          subtitle={subtitle}
          titleColor="#FFFFFF"
          textAlign="center"
        />

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
