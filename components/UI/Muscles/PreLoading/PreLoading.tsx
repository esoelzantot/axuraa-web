"use client";

import { useId } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Size = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface PerLoadingProps {
  size?: Size;
  color?: string;
  totalMs?: number;
  stepPx?: number;
  pulseDurationMs?: number;
  count?: number;
  hubGap?: number;
  className?: string;
  label?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<string, number> = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

/**
 * ─── HOW TO SWAP IN YOUR OWN ARROW SVG ───────────────────────────────────────
 *
 * 1. Open your arrow SVG file (e.g. icons-arrow.svg)
 * 2. Find the viewBox attribute → update VB_W and VB_H below
 * 3. Copy every <path d="..."> value and add it to ARROW_PATHS
 * 4. If your arrow points RIGHT or DOWN, add `localRotate` below to correct it
 *    (the system expects the arrow tip to point UPWARD / toward negative Y)
 *
 * Current values use the original Axuraa arrow paths as a working placeholder.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const VB_W = 675; // ← replace with your SVG's viewBox width
const VB_H = 677; // ← replace with your SVG's viewBox height

// If your arrow points in a different direction, set this to rotate it:
// 0 = tip up (correct), 90 = tip right, 180 = tip down, -90 = tip left
const LOCAL_ROTATE = 0;

const ARROW_PATHS: { d: string; stroke?: boolean }[] = [
  // ← paste your path(s) here; keep stroke:true only for the arrowhead outline
  {
    d: "M248.44 107.798L352.724 33.3108L457.164 114.546L353.114 72.2741L248.44 107.798Z",
    stroke: true,
  },
  {
    d: "M360.644 637.317L360.755 93.6185L477.854 140.647L360.644 637.317Z",
  },
  {
    d: "M343.644 638.318L343.646 92.6407L224.404 130.763L343.644 638.318Z",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PerLoading({
  size = "lg",
  color = "#D04A1D",
  totalMs = 3000,
  stepPx = 60,
  pulseDurationMs = 300,
  count = 8,
  hubGap = 30,
  className = "",
  label = "Loading",
}: PerLoadingProps) {
  const px = typeof size === "number" ? size : (SIZE_MAP[size] ?? SIZE_MAP.md);
  const uid = useId().replace(/:/g, "_");

  // Arrow dimensions in SVG units. The outer viewBox is 220×220 (-110 to 110).
  // arrowH controls how long each arrow appears; aspect ratio is preserved.
  const arrowH = 65;
  const arrowW = arrowH * (VB_W / VB_H);

  // Scale the raw path coordinates into our arrowW × arrowH box
  const scaleX = arrowW / VB_W;
  const scaleY = arrowH / VB_H;

  // Tip sits at y = -hubGap; tail at y = -(hubGap + arrowH); centered on x = 0
  const offsetX = -arrowW / 2;
  const offsetY = -(hubGap + arrowH);

  /**
   * Keyframe timing — fixed vs previous version:
   *
   * Each arrow owns an equal slice of the cycle (100% / count).
   * pulseDurationMs is clamped to 80% of that slice so arrows never overlap.
   * Peak is exactly halfway through the pulse window.
   * Everything returns cleanly to 0 before the next arrow fires.
   */
  const slotPct = 100 / count;
  const pulsePct = Math.min((pulseDurationMs / totalMs) * 100, slotPct * 0.8);

  const keyframes = Array.from({ length: count }, (_, i) => {
    const fireAt = i * slotPct;
    const peakAt = fireAt + pulsePct / 2;
    const endAt = fireAt + pulsePct;

    return `
@keyframes ${uid}_p${i} {
  0%,             ${fireAt.toFixed(3)}% { transform: translateY(0px); }
  ${peakAt.toFixed(3)}%                 { transform: translateY(${-stepPx}px); }
  ${endAt.toFixed(3)}%, 100%            { transform: translateY(0px); }
}`;
  }).join("\n");

  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: px, height: px }}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          ${keyframes}
        }
        @media (prefers-reduced-motion: reduce) {
          .${uid}_arrow { animation-play-state: paused !important; }
        }
      `}</style>

      <svg
        width={px}
        height={px}
        viewBox="-110 -110 220 220"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        overflow="visible"
      >
        {Array.from({ length: count }, (_, i) => {
          const angleDeg = (i * 360) / count;

          return (
            <g key={i} transform={`rotate(${angleDeg})`}>
              {/* Animated layer — translateY is radially outward in the rotated space */}
              <g
                className={`${uid}_arrow`}
                style={{
                  animation: `${uid}_p${i} ${totalMs}ms ease-in-out infinite`,
                  transformOrigin: "0 0",
                }}
              >
                {/*
                 * Position + scale the arrow paths into place.
                 * No SVG import or SVGR needed — paths are inlined directly.
                 * To swap your own SVG: update VB_W, VB_H, and ARROW_PATHS above.
                 */}
                <g
                  transform={`
                    translate(${offsetX}, ${offsetY})
                    scale(${scaleX}, ${scaleY})
                    rotate(${LOCAL_ROTATE}, ${VB_W / 2}, ${VB_H / 2})
                  `}
                >
                  {ARROW_PATHS.map((p, pi) => (
                    <path
                      key={pi}
                      d={p.d}
                      fill={color}
                      stroke={p.stroke ? color : undefined}
                      strokeWidth={p.stroke ? 2 : undefined}
                      strokeLinejoin="round"
                    />
                  ))}
                </g>
              </g>
            </g>
          );
        })}
      </svg>
    </span>
  );
}
