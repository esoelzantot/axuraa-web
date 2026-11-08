import { ProjectItem } from "@/service/Projects/projects";
import { ServiceItem } from "@/service/Services/services";
import { Locale, localize } from "@/lib/i18n";

export interface TransformedProject {
  id: string;
  title: string;
  subTitle: string;
  /** All service categories of the project (deduplicated). */
  categories: string[];
  /** First category, used for the badge. */
  category: string;
  percentage: string;
  description: string;
  imageUrl: string;
}

export function transformProjects(
  projects: ProjectItem[],
  services: ServiceItem[],
  locale: Locale = "en",
): TransformedProject[] {
  const serviceLabel = new Map<string, string>();
  for (const service of services) {
    serviceLabel.set(
      service._id,
      localize(service.subtitle, locale) || localize(service.title, locale) || "General",
    );
  }

  return projects.map((project) => {
    const categories = Array.from(
      new Set(
        (project.services || []).map((s) => {
          const id = s?.services_id?._id;
          return (
            (id && serviceLabel.get(id)) || localize(s?.services_id?.title, locale) || "General"
          );
        }),
      ),
    );
    if (categories.length === 0) categories.push(project.technology_stack?.[0] || "General");

    const firstResult = project.case_study_results?.[0];
    return {
      id: project._id,
      title: localize(project.title, locale) || "Untitled",
      subTitle: localize(project.subTitle, locale),
      categories,
      category: categories[0],
      percentage: firstResult?.value || "+50%",
      description: localize(firstResult?.description, locale) || "Project description",
      imageUrl: project.main_image_url || "/assets/ProjectImage.png",
    };
  });
}
