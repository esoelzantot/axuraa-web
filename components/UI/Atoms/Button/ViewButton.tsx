import React from "react";
import { Play } from "lucide-react";
import styles from "./ViewButton.module.css";
import { ViewButtonProps } from "@/types/Generals/buttonTypes";

/** Secondary CTA: glassy surface, gradient hairline border, play tile that fills on hover. */
const ViewButton: React.FC<ViewButtonProps> = ({ children, className = "", onClick, ...props }) => (
  <button type="button" className={`${styles.viewButton} ${className}`} onClick={onClick} {...props}>
    <span className={styles.buttonText}>{children}</span>
    <span className={styles.iconWrapper} aria-hidden="true">
      <Play size={15} strokeWidth={2.25} className={styles.playIcon} />
    </span>
  </button>
);

export default React.memo(ViewButton);
