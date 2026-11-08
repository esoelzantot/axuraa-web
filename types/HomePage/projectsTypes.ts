import { ProjectItem } from "@/service/Projects/projects";
import { ServiceItem } from "@/service/Services/services";
import { Locale } from "@/lib/i18n";

/** ProjectSection component props — @/components/Section/HomePage/ProjectSection/ProjectSection.tsx */
export interface ProjectSectionProps {
  badgeText: string;
  title1: string;
  title2: string;
  subtitle: string;
  projects: ProjectItem[];
  /** Used to resolve each project's category labels. */
  services: ServiceItem[];
  locale: Locale;
  seeAllText?: string;
}
