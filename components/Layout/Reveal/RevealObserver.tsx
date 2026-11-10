"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal engine (renders nothing).
 *
 *  - `data-reveal="up|zoom|left|right|clip|fade"` animates one element.
 *  - `data-reveal-stagger` (optionally `="zoom"` / `="left"`) animates each
 *    direct child, one after another.
 *
 * Everything runs through the Web Animations API: the engine never writes
 * attributes, classes or inline styles, so it can't cause hydration
 * mismatches and React re-renders can't undo it. Elements below the fold
 * are held hidden by a paused opacity animation; when one scrolls into view
 * the hold is swapped for the reveal. Content already on screen at first
 * load is left as is (no flicker). Without JS everything is simply visible.
 * Reduced motion gets a short fade with no movement.
 */

type Variant = "up" | "zoom" | "left" | "right" | "clip" | "fade" | "rise" | "pop";

const FRAMES: Record<Variant, Keyframe[]> = {
  up: [
    { opacity: 0, transform: "translate3d(0, 42px, 0)", filter: "blur(8px)" },
    { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0px)" },
  ],
  zoom: [
    { opacity: 0, transform: "scale(0.92)", filter: "blur(10px)" },
    { opacity: 1, transform: "scale(1)", filter: "blur(0px)" },
  ],
  left: [
    { opacity: 0, transform: "translate3d(-56px, 0, 0)", filter: "blur(6px)" },
    { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0px)" },
  ],
  right: [
    { opacity: 0, transform: "translate3d(56px, 0, 0)", filter: "blur(6px)" },
    { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0px)" },
  ],
  clip: [
    { opacity: 0.2, clipPath: "inset(0 0 100% 0 round 24px)", transform: "translate3d(0, 28px, 0) scale(1.03)" },
    { opacity: 1, clipPath: "inset(0 0 0% 0 round 0px)", transform: "translate3d(0, 0, 0) scale(1)" },
  ],
  fade: [{ opacity: 0 }, { opacity: 1 }],
  // stagger children: rise with a slight 3D tilt
  rise: [
    {
      opacity: 0,
      transform: "perspective(1000px) translate3d(0, 56px, 0) rotateX(12deg) scale(0.96)",
      filter: "blur(4px)",
    },
    { opacity: 1, transform: "perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) scale(1)", filter: "blur(0px)" },
  ],
  pop: [
    { opacity: 0, transform: "scale(0.85) translate3d(0, 18px, 0)", filter: "blur(6px)" },
    { opacity: 1, transform: "scale(1) translate3d(0, 0, 0)", filter: "blur(0px)" },
  ],
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const STEP_MS = 90;

interface Target {
  variant: Variant;
  delay: number;
  hold?: Animation;
}

const RevealObserver = () => {
  useEffect(() => {
    if (typeof Element.prototype.animate !== "function") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rtl = document.documentElement.dir === "rtl";
    // Content on screen during the first moments of a full page load stays put.
    const initialLoad = performance.now() < 4000;
    const startedAt = performance.now();

    const targets = new WeakMap<Element, Target>();

    const reveal = (el: Element) => {
      const t = targets.get(el);
      if (!t) return;
      t.hold?.cancel();
      t.hold = undefined;
      let variant = t.variant;
      if (rtl && (variant === "left" || variant === "right")) variant = variant === "left" ? "right" : "left";
      el.animate(reduced ? FRAMES.fade : FRAMES[variant], {
        duration: reduced ? 600 : variant === "clip" ? 1100 : 900,
        delay: reduced ? 0 : t.delay,
        easing: reduced ? "ease" : EASE,
        fill: "backwards", // nothing lingers afterwards, so hover transforms keep working
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          reveal(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const register = (el: Element, variant: Variant, delay: number) => {
      if (targets.has(el)) return;
      const rect = el.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      // Already visible on the first screen of a fresh load: leave it alone.
      if (onScreen && initialLoad && performance.now() - startedAt < 1500) {
        targets.set(el, { variant, delay });
        return;
      }
      const hold = el.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1000, fill: "forwards" });
      hold.pause();
      targets.set(el, { variant, delay, hold });
      io.observe(el);
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        register(el, (el.dataset.reveal as Variant) || "up", 0);
      });
      document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        const kind = group.dataset.revealStagger;
        const variant: Variant = kind === "zoom" ? "pop" : kind === "left" ? "left" : "rise";
        Array.from(group.children).forEach((child, i) => register(child, variant, (i % 6) * STEP_MS));
      });
    };

    scan();

    // Client-side navigation and late data add new nodes: rescan (once per frame).
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
};

export default RevealObserver;
