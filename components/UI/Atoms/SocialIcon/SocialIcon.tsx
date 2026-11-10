import React from "react";
import styles from "./SocialIcon.module.css";
import { SocialIconProps } from "@/types/Generals/iconsTypes";

/** Social tile: the SVG is used as a mask so it can take the brand colour. */
const SocialIcon: React.FC<SocialIconProps> = ({ icon, label, showLabel = false, alt = "Social icon" }) => (
  <span className={styles.wrapper}>
    <span className={styles.tile}>
      <span
        className={styles.glyph}
        style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
        role="img"
        aria-label={alt}
      />
    </span>
    {showLabel && label && <span className={styles.label}>{label}</span>}
  </span>
);

export default SocialIcon;
