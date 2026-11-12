"use client";

import type { CSSProperties } from "react";
import styles from "./PreLoading.module.css";
import useDictionary from "@/hooks/useDictionary";

/*
  Axuraa logo loader.
  The eight logo arms fly in and lock into the mark, then a white "spark"
  (the logo's white arm) travels clockwise around it: each arm lights up,
  pushes outward and settles back, while an orbit arc follows the spark.
*/

// One logo arm (tip toward the center), drawn in a 675 × 677 box.
const VB_W = 675;
const VB_H = 677;
const ARM_PATHS: { d: string; stroke?: boolean }[] = [
  { d: "M248.44 107.798L352.724 33.3108L457.164 114.546L353.114 72.2741L248.44 107.798Z", stroke: true },
  { d: "M360.644 637.317L360.755 93.6185L477.854 140.647L360.644 637.317Z" },
  { d: "M343.644 638.318L343.646 92.6407L224.404 130.763L343.644 638.318Z" },
];

const COUNT = 8;
const ARM_H = 68; // arm length in the -110…110 viewBox
const HUB_GAP = 24; // empty space in the middle of the mark
const ARM_W = ARM_H * (VB_W / VB_H);
const ARM_TRANSFORM = `translate(${-ARM_W / 2} ${-(HUB_GAP + ARM_H)}) scale(${ARM_W / VB_W} ${ARM_H / VB_H})`;

// The logo's white arm points north-east.
const ACCENT_ARM = 1;
const WORDMARK = "AXURAA".split("");

interface PreLoadingProps {
  /** Mark size in px. */
  size?: number;
  /** Show the AXURAA wordmark and progress line under the mark. */
  showWordmark?: boolean;
  className?: string;
}

const PreLoading = ({ size = 120, showWordmark = true, className = "" }: PreLoadingProps) => {
  const { t } = useDictionary();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${styles.loader} ${className}`}
      style={{ "--size": `${size}px` } as CSSProperties}
    >
      <div className={styles.stage} aria-hidden="true">
        <span className={styles.halo} />
        <span className={styles.track} />
        <span className={styles.orbit} />

        <svg className={styles.mark} viewBox="-110 -110 220 220" overflow="visible">
          {Array.from({ length: COUNT }, (_, i) => (
            <g key={i} transform={`rotate(${(i * 360) / COUNT})`}>
              <g className={styles.arm} style={{ "--i": i } as CSSProperties}>
                <g className={`${styles.spark} ${i === ACCENT_ARM ? styles.accent : ""}`}>
                  <g transform={ARM_TRANSFORM}>
                    {ARM_PATHS.map((p, pi) => (
                      <path
                        key={pi}
                        d={p.d}
                        fill="currentColor"
                        stroke={p.stroke ? "currentColor" : undefined}
                        strokeWidth={p.stroke ? 2 : undefined}
                        strokeLinejoin="round"
                      />
                    ))}
                  </g>
                </g>
              </g>
            </g>
          ))}
        </svg>
      </div>

      {showWordmark && (
        <>
          <p className={styles.word} dir="ltr" aria-hidden="true">
            {WORDMARK.map((c, i) => (
              <span key={i} style={{ "--i": i } as CSSProperties}>
                {c}
              </span>
            ))}
          </p>
          <span className={styles.bar} aria-hidden="true" />
        </>
      )}

      <span className={styles.srOnly}>{t.common.loading}</span>
    </div>
  );
};

export default PreLoading;
