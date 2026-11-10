import React from "react";
import { Sparkles } from "lucide-react";
import styles from "./SectionHead.module.css";

interface SectionHeadProps {
  /** Small uppercase pill above the title. */
  eyebrow: string;
  /** Title; its last word gets the brand gradient. */
  title: string;
  intro?: string;
  /** id for aria-labelledby on the parent section. */
  id?: string;
  align?: "center" | "start";
  className?: string;
}

/** Section heading used across inner pages: eyebrow pill, accented title, intro line. */
const SectionHead: React.FC<SectionHeadProps> = ({
  eyebrow,
  title,
  intro,
  id,
  align = "center",
  className = "",
}) => {
  const words = title.trim().split(/\s+/);
  const last = words.pop();

  return (
    <header
      className={`${styles.head} ${align === "start" ? styles.start : ""} ${className}`}
      data-reveal="up"
    >
      <span className={styles.eyebrow}>
        <Sparkles size={13} aria-hidden="true" /> {eyebrow}
      </span>
      <h2 id={id} className={styles.title}>
        {words.length > 0 && <>{words.join(" ")} </>}
        <span className={styles.accent}>{last}</span>
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
};

export default SectionHead;
