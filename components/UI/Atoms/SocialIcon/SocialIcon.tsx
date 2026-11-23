import React from "react";
import { isIconUrl } from "@/lib/icons";
import styles from "./SocialIcon.module.css";
import { SocialIconProps } from "@/types/Generals/iconsTypes";

/**
 * Social tile: a local SVG is used as a mask so it can take the brand colour.
 * An uploaded icon is shown as it is (masks need CORS headers from other hosts).
 */
const SocialIcon: React.FC<SocialIconProps> = ({ icon, label, showLabel = false, alt = "Social icon" }) => (
  <span className={styles.wrapper}>
    <span className={styles.tile}>
      {isIconUrl(icon) ? (
        // eslint-disable-next-line @next/next/no-img-element -- small icon from the CMS (any host)
        <img src={icon} alt={alt} width={22} height={22} style={{ objectFit: "contain" }} />
      ) : (
        <span
          className={styles.glyph}
          style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
          role="img"
          aria-label={alt}
        />
      )}
    </span>
    {showLabel && label && <span className={styles.label}>{label}</span>}
  </span>
);

export default SocialIcon;
