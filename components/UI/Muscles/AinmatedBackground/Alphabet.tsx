"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Alphabet.module.css";
import A from "@/public/assets/letters/A.svg";
import R from "@/public/assets/letters/R.svg";
import X from "@/public/assets/letters/X.svg";
import U from "@/public/assets/letters/U.svg";
import Q from "@/public/assets/letters/Q.svg"; // stylised lowercase "a"

/*
  About hero background: the AXURAA letters as soft glowing glyphs.
  They fly in one by one, then each keeps drifting on its own slow path;
  on desktop they also shift with the cursor (parallax by depth).
  Positions are percentages around the edges, so the centred hero text
  stays clear at every screen size.
*/

interface Glyph {
  src: typeof A;
  /** left / top in % of the hero */
  x: number;
  y: number;
  /** left / top in % on phones (clear bands above and below the text) */
  mx: number;
  my: number;
  /** size in rem (desktop); scaled down by CSS on small screens */
  size: number;
  /** parallax depth (bigger = moves more) */
  depth: number;
  /** float path variant (1–3) and duration in s */
  path: 1 | 2 | 3;
  dur: number;
  /** hide on small screens to keep the text area clean */
  desktopOnly?: boolean;
}

const GLYPHS: Glyph[] = [
  { src: A, x: 6, y: 52, mx: 9, my: 21, size: 9, depth: 18, path: 1, dur: 13 },
  { src: X, x: 14, y: 76, mx: 14, my: 92, size: 7.5, depth: 26, path: 2, dur: 11 },
  { src: U, x: 84, y: 54, mx: 86, my: 93, size: 6, depth: 22, path: 3, dur: 12 },
  { src: R, x: 80, y: 14, mx: 90, my: 19, size: 9.5, depth: 14, path: 2, dur: 15 },
  { src: Q, x: 22, y: 18, mx: 28, my: 15, size: 5, depth: 30, path: 3, dur: 10 },
  { src: Q, x: 74, y: 78, mx: 50, my: 95, size: 5, depth: 28, path: 1, dur: 12 },
  { src: A, x: 92, y: 30, mx: 92, my: 30, size: 5.5, depth: 34, path: 2, dur: 14, desktopOnly: true },
];

interface AlphabetProps {
  className?: string;
  /** Kept for API compatibility with AnimatedBackground; motion no longer depends on hover. */
  isHovered?: boolean;
}

const Alphabet: React.FC<AlphabetProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor parallax (fine pointers only, not under reduced motion).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const px = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1 … 1
        const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.alphabet} ${className || ""}`} aria-hidden="true">
      {GLYPHS.map((g, i) => (
        <div
          key={i}
          className={`${styles.glyph} ${g.desktopOnly ? styles.desktopOnly : ""}`}
          style={
            {
              "--x": `${g.x}%`,
              "--y": `${g.y}%`,
              "--mx": `${g.mx}%`,
              "--my": `${g.my}%`,
              "--size": `${g.size}rem`,
              "--depth": g.depth,
              "--i": i,
              "--dur": `${g.dur}s`,
            } as React.CSSProperties
          }
        >
          <div className={styles.parallax}>
            <div className={`${styles.float} ${styles[`path${g.path}`]}`}>
              <Image src={g.src} alt="" fill sizes="10rem" className={styles.img} priority={i < 3} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alphabet;
