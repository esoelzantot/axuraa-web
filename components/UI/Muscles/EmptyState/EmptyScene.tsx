import styles from "./EmptyState.module.css";

export type EmptyKind = "services" | "solutions" | "projects" | "feedback";

/* One line-art scene per section (260 × 160). Neutrals are theme tokens and the
   accent is the brand orange. Only the accent piece drifts, slowly: nothing
   spins, pulses or fills up, so a scene never reads as "loading". */

/** What we make: a web screen, a phone, a design curve and an AI spark. */
const Services = () => (
  <>
    <rect className={styles.solid} x="66" y="32" width="116" height="78" rx="12" />
    <path className={styles.soft} d="M66 52h116" />
    <circle className={styles.accentFill} cx="79" cy="42" r="3" />
    <circle className={styles.softFill} cx="89" cy="42" r="3" />
    <circle className={styles.softFill} cx="99" cy="42" r="3" />
    <path className={styles.accent} d="M108 70l-11 11 11 11M130 70l11 11-11 11M122 66l-7 30" />
    <path className={styles.line} d="M116 110v14M100 126h40" />

    <g className={styles.drift}>
      <rect className={styles.solid} x="168" y="66" width="38" height="68" rx="9" />
      <path className={styles.soft} d="M182 73h10" />
      <rect className={styles.accentSoft} x="175" y="82" width="24" height="18" rx="5" />
      <path className={styles.soft} d="M175 109h24M175 118h15" />
    </g>

    <path className={styles.accent} d="M30 118C30 84 44 72 58 72" />
    <path className={styles.soft} d="M30 118V88M58 72H36" />
    <rect className={styles.node} x="26" y="114" width="8" height="8" rx="2" />
    <rect className={styles.node} x="54" y="68" width="8" height="8" rx="2" />

    <path className={styles.accentFill} d="M214 26c1.5 9 4.5 12 13.5 13.5-9 1.5-12 4.5-13.5 13.5-1.5-9-4.5-12-13.5-13.5 9-1.5 12-4.5 13.5-13.5z" />
  </>
);

interface CubeProps {
  x: number;
  y: number;
  variant: "plain" | "accent" | "ghost";
}

/** Isometric block; (x, y) is the far corner of its top face. */
const Cube = ({ x, y, variant }: CubeProps) => {
  const top = `M${x} ${y}l26 15-26 15-26-15z`;
  const left = `M${x - 26} ${y + 15}l26 15v28l-26-15z`;
  const right = `M${x} ${y + 30}l26-15v28l-26 15z`;
  if (variant === "ghost") return <path className={styles.ghost} d={top + left + right} />;
  const accent = variant === "accent";
  return (
    <>
      <path className={accent ? styles.cubeTop : styles.solid} d={top} />
      <path className={accent ? styles.cubeLeft : styles.solid} d={left} />
      <path className={accent ? styles.cubeRight : styles.shade} d={right} />
    </>
  );
};

/** A system made of blocks, with the piece that completes it hovering over its slot. */
const Solutions = () => (
  <>
    <Cube x={130} y={58} variant="plain" />
    <Cube x={104} y={73} variant="plain" />
    <Cube x={156} y={73} variant="plain" />
    <Cube x={130} y={88} variant="ghost" />
    <g className={styles.drift}>
      <Cube x={130} y={12} variant="accent" />
    </g>
  </>
);

/** A gallery wall: frames hung and lit, with no picture in the middle one yet. */
const Projects = () => (
  <>
    <g transform="rotate(-7 58 88)">
      <path className={styles.soft} d="M44 60l14-12 14 12" />
      <rect className={styles.solid} x="26" y="60" width="64" height="54" rx="8" />
      <path className={styles.soft} d="M36 102l14-17 10 11 7-8 13 14" />
    </g>
    <g transform="rotate(7 202 88)">
      <path className={styles.soft} d="M188 60l14-12 14 12" />
      <rect className={styles.solid} x="170" y="60" width="64" height="54" rx="8" />
      <path className={styles.soft} d="M182 76h40M182 88h40M182 100h22" />
    </g>
    <g className={styles.sway}>
      <path className={styles.accent} d="M106 46l24-22 24 22" />
      <circle className={styles.accentFill} cx="130" cy="22" r="4.5" />
      <rect className={styles.frame} x="78" y="46" width="104" height="86" rx="10" />
      <rect className={styles.ghost} x="90" y="58" width="80" height="62" rx="5" />
      <circle className={styles.accentSoft} cx="150" cy="75" r="7" />
      <path className={styles.accent} d="M97 112l22-27 15 17 10-11 19 21" />
    </g>
  </>
);

const STAR = "M0-9l2.7 5.7 6.2.8-4.6 4.3 1.2 6.2L0 5-5.5 8l1.2-6.2-4.6-4.3 6.2-.8z";

/** A testimonial card shaped as a speech bubble: quote mark and stars, still unwritten. */
const Feedback = () => (
  <>
    <path
      className={styles.solid}
      d="M150 22h62a14 14 0 0 1 14 14v28a14 14 0 0 1-14 14h-4l-2 14-14-14h-42a14 14 0 0 1-14-14V36a14 14 0 0 1 14-14z"
    />
    <path className={styles.soft} d="M194 42h18M194 54h18" />
    <path
      className={styles.frame}
      d="M60 38h108a16 16 0 0 1 16 16v48a16 16 0 0 1-16 16H92l-22 20 2-20H60a16 16 0 0 1-16-16V54a16 16 0 0 1 16-16z"
    />
    <path className={styles.accentFill} d="M62 70c0-9 5-15 13-17l1.5 4c-4 1.5-6 4-6 7.5h6v14H62zM82 70c0-9 5-15 13-17l1.5 4c-4 1.5-6 4-6 7.5h6v14H82z" />
    <path className={styles.soft} d="M112 64h52M112 76h36" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} className={styles.star} transform={`translate(${72 + i * 22} 99)`} d={STAR} />
    ))}
    <g className={styles.drift}>
      <circle className={styles.accentFill} cx="196" cy="112" r="17" />
      <path className={styles.heart} d="M196 121c-7-5-10-8.5-10-12.5a5 5 0 0 1 10-1.5 5 5 0 0 1 10 1.5c0 4-3 7.5-10 12.5z" />
    </g>
  </>
);

const SCENES = { services: Services, solutions: Solutions, projects: Projects, feedback: Feedback };

const EmptyScene = ({ kind }: { kind: EmptyKind }) => {
  const Scene = SCENES[kind];
  return (
    <svg className={styles.scene} viewBox="0 0 260 160" fill="none" aria-hidden="true">
      <Scene />
    </svg>
  );
};

export default EmptyScene;
