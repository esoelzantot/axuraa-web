// lib/transformProjects.ts
import { ProjectItem } from "@/service/Projects/projects";
import { ServiceItem } from "@/service/Services/services";

export interface TransformedProject {
  id: string;
  title: string;
  subTitle: string;
  categories: string[]; // ← array instead of single string
  category: string; // ← keep for display (first one)
  percentage: string;
  description: string;
  imageUrl: string;
}
// Handles both plain strings and LocalizedField objects
function getString(field: unknown, locale: "en" | "ar"): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const f = field as Record<string, string>;
    return f[locale] || f["en"] || Object.values(f)[0] || "";
  }
  return "";
}

export function transformProjects(
  projects: ProjectItem[],
  services: ServiceItem[],
  locale: "en" | "ar" = "en",
): TransformedProject[] {
  const serviceSubtitleMap = new Map<string, string>();
  for (const service of services) {
    serviceSubtitleMap.set(
      service._id,
      service.subtitle || service.title || "General",
    );
  }

  return projects.map((project) => {
    const categories = (project.services || [])
      .map((s) => {
        const id = s?.services_id?._id;
        return id ? serviceSubtitleMap.get(id) || "General" : "General";
      })
      .filter((c, i, arr) => arr.indexOf(c) === i); // dedupe

    return {
      id: project._id,
      title: getString(project.title, locale) || "Untitled",
      subTitle: getString(project.subTitle, locale) || "",
      categories,
      category: categories[0] || "General", // for badge display
      percentage: project.case_study_results?.[0]?.value || "+50%",
      description:
        getString(project.case_study_results?.[0]?.description, locale) ||
        "Project description",
      imageUrl: project.main_image_url || "/assets/ProjectImage.png",
    };
  });
}
