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
      className={`${styles.startButton} ${className}`}
      onClick={(e) => {
        console.log("StartButton clicked!");
        if (onClick) onClick(e);
      }}
      {...props}
    >
      <span className={styles.buttonContent}>
        <span className={styles.buttonText}>{children}</span>
        <span className={styles.iconWrapper}>
          <Image
            src="/assets/StartIconButtom.svg"
            alt="Start"
            width={24}
            height={24}
          />
        </span>
      </span>
    </button>
  );
};

export default React.memo(StartButton);
