import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./StartButton.module.css";
import { StartButtonProps } from "@/types/Generals/buttonTypes";

/** Primary CTA: brand gradient, light sweep on hover, arrow tile that flips to white. */
const StartButton: React.FC<StartButtonProps> = ({ children, className = "", onClick, ...props }) => (
  <button type="button" className={`${styles.startButton} ${className}`} onClick={onClick} {...props}>
    <span className={styles.buttonText}>{children}</span>
    <span className={styles.iconWrapper} aria-hidden="true">
      <ArrowRight size={18} strokeWidth={2.25} />
    </span>
  </button>
);

export default React.memo(StartButton);
