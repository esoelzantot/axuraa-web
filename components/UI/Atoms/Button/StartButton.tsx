import React from "react";
import Image from "next/image";
import styles from "./StartButton.module.css";
import { StartButtonProps } from "@/types/Generals/buttonTypes";

const StartButton: React.FC<StartButtonProps> = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`${styles.startButton} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className={styles.buttonContent}>
        <span className={styles.buttonText}>{children}</span>
        <span className={styles.iconWrapper}>
          <Image
            src="/assets/StartIconButtom.svg"
            alt=""
            width={24}
            height={24}
            style={{ objectFit: "contain" }}
          />
        </span>
      </span>
    </button>
  );
};

export default React.memo(StartButton);
