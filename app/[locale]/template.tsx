/**
 * Re-mounted on every navigation, so each page fades in.
 * Opacity only (see .page-enter in globals.css): no transform, so fixed
 * and sticky elements inside pages keep working during the transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
