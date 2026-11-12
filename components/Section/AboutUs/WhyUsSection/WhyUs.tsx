import React from "react";
import styles from "./WhyUs.module.css";
import Card from "@/components/UI/Muscles/ValueCard/ValueCard";
import SectionHeader from "@/components/Layout/SectionHeader/SectionHeader";
import StatusBadge from "@/components/UI/Atoms/StatusBadge/StatusBadge";
import { Handshake, Lightbulb, Rocket, ShieldCheck, type LucideIcon } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

// Icons for the four values, in dictionary order.
const VALUE_ICONS: LucideIcon[] = [Lightbulb, ShieldCheck, Handshake, Rocket];
const VALUE_IMAGES = ["/assets/psychology.svg", "/assets/shield.svg", "/assets/group.svg", "/assets/rocket.svg"];

const WhyUs: React.FC<{ locale: Locale }> = ({ locale }) => {
  const w = getDictionary(locale).about.why;

  return (
    <section className={styles.whyUsSection} aria-labelledby="why-us-heading">
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header} data-reveal="up">
          <StatusBadge text={w.badge} className={styles.badge} />
          <SectionHeader
            title1=""
            title2={w.title}
            subtitle={w.subtitle}
          />
        </div>

        {/* Cards Grid */}
        <div className={styles.cardsGrid} data-reveal-stagger>
          {w.items.map((value, index) => (
            <Card
              key={index}
              index={index}
              icon={VALUE_IMAGES[index]}
              lucideIcon={VALUE_ICONS[index]}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyUs);
