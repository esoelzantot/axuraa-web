"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ScrollComponents.module.css";
import { ScrollComponentProps } from "@/types/Generals/scrollTypes";
import useDictionary from "@/hooks/useDictionary";

const COPIES = 3; // [clone] [real] [clone] → seamless loop in both directions
const AUTOPLAY_MS = 3500;
const RESUME_AFTER_MS = 4000; // pause autoplay this long after the user interacts

/**
 * Infinite card carousel.
 * - Native horizontal scrolling (touch swipe, trackpad, shift + wheel) with scroll-snap
 * - Mouse drag on desktop, prev / next buttons, arrow keys
 * - Autoplay one card at a time; pauses on hover, focus, interaction,
 *   when off-screen or the tab is hidden, and is off under reduced motion
 * The track is always laid out LTR (stable scrollLeft maths); items keep the page direction.
 */
export const HorizontalScroll: React.FC<ScrollComponentProps> = ({ children, className = "", style }) => {
  const { t } = useDictionary();
  const viewportRef = useRef<HTMLDivElement>(null);
  const items = React.Children.toArray(children);
  const count = items.length;

  const hovered = useRef(false);
  const visible = useRef(false);
  const lastInteraction = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  /** Width of one full set of cards (distance between the same card in two sets). */
  const setWidth = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp || count === 0) return 0;
    const cells = vp.querySelectorAll<HTMLElement>("[data-cell]");
    return cells[count] ? cells[count].offsetLeft - cells[0].offsetLeft : 0;
  }, [count]);

  /** Distance from one card to the next. */
  const step = useCallback(() => {
    const vp = viewportRef.current;
    const cells = vp?.querySelectorAll<HTMLElement>("[data-cell]");
    return cells && cells.length > 1 ? cells[1].offsetLeft - cells[0].offsetLeft : 0;
  }, []);

  /** Instantly move by ±one set so the real (middle) set stays in view. */
  const recenter = useCallback(() => {
    const vp = viewportRef.current;
    const w = setWidth();
    if (!vp || !w) return;
    let jump = 0;
    if (vp.scrollLeft < w * 0.5) jump = w;
    else if (vp.scrollLeft > w * 1.5) jump = -w;
    if (jump) vp.scrollTo({ left: vp.scrollLeft + jump, behavior: "instant" });
  }, [setWidth]);

  const go = useCallback(
    (dir: 1 | -1) => {
      const vp = viewportRef.current;
      if (!vp) return;
      recenter();
      vp.scrollBy({ left: dir * step(), behavior: "smooth" });
    },
    [recenter, step],
  );

  const touch = () => {
    lastInteraction.current = Date.now();
  };

  // Start on the real (middle) set and keep it centred when the size changes.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || count === 0) return;
    const place = () => vp.scrollTo({ left: setWidth(), behavior: "instant" });
    place();
    const ro = new ResizeObserver(place);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [count, setWidth]);

  // Loop seamlessly once a scroll settles.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!drag.current) recenter();
      }, 140);
    };
    vp.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      vp.removeEventListener("scroll", onScroll);
    };
  }, [recenter]);

  // Autoplay (only while on screen, idle and allowed).
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.3 });
    io.observe(vp);
    const id = setInterval(() => {
      const idle = Date.now() - lastInteraction.current > RESUME_AFTER_MS;
      const focused = vp.contains(document.activeElement);
      if (reduce.matches || document.hidden || !visible.current || hovered.current || focused || drag.current || !idle) return;
      go(1);
    }, AUTOPLAY_MS);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [count, go]);

  // Mouse drag (touch and pen use native scrolling).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !viewportRef.current) return;
    drag.current = { x: e.clientX, left: viewportRef.current.scrollLeft, moved: false };
    touch();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const vp = viewportRef.current;
    if (!d || !vp) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
      vp.setPointerCapture(e.pointerId);
    }
    if (d.moved) vp.scrollLeft = d.left - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    const vp = viewportRef.current;
    drag.current = null;
    if (!d || !vp) return;
    if (vp.hasPointerCapture(e.pointerId)) vp.releasePointerCapture(e.pointerId);
    if (!d.moved) return;
    setDragging(false);
    // Snap to the nearest card in the drag direction.
    const s = step();
    const moved = vp.scrollLeft - d.left;
    const cards = Math.abs(moved) < s * 0.15 ? 0 : Math.sign(moved) * Math.max(1, Math.round(Math.abs(moved) / s));
    vp.scrollTo({ left: d.left + cards * s, behavior: "smooth" });
    touch();
  };

  // A click that ends a drag must not open links inside the cards.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      touch();
      go(e.key === "ArrowRight" ? 1 : -1);
    }
  };

  if (count === 0) return null;

  return (
    <div className={`${styles.carousel} ${className}`} style={style}>
      <div
        ref={viewportRef}
        className={`${styles.viewport} ${dragging ? styles.dragging : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.common.carousel}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
        onTouchStart={touch}
        onWheel={touch}
      >
        <div className={styles.track}>
          {Array.from({ length: COPIES }, (_, copy) =>
            items.map((child, i) => {
              const clone = copy !== 1;
              return (
                <div
                  key={`${copy}-${i}`}
                  data-cell
                  className={styles.item}
                  aria-hidden={clone || undefined}
                  inert={clone || undefined}
                >
                  {child}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {count > 1 && (
        <div className={styles.controls} dir="ltr">
          <button
            type="button"
            className={styles.navBtn}
            aria-label={t.common.previous}
            onClick={() => {
              touch();
              go(-1);
            }}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label={t.common.next}
            onClick={() => {
              touch();
              go(1);
            }}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};
