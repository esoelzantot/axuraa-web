import React from "react";
import Image from "next/image";
import {
  Bot,
  Calculator,
  CalendarDays,
  ClipboardList,
  Cloud,
  Code2,
  GraduationCap,
  Monitor,
  Network,
  Paintbrush,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** The CMS stores some icons as names (Font Awesome style); map them to vector icons. */
const NAMED_ICONS: Record<string, LucideIcon> = {
  cloud: Cloud,
  "cash-register": Calculator,
  "clipboard-list": ClipboardList,
  "shopping-cart": ShoppingCart,
  "calendar-alt": CalendarDays,
  calendar: CalendarDays,
  "graduation-cap": GraduationCap,
  tools: Wrench,
  wrench: Wrench,
  "paint-brush": Paintbrush,
  robot: Bot,
  sitemap: Network,
  code: Code2,
  mobile: Smartphone,
  desktop: Monitor,
};

interface ServiceIconProps {
  /** Image URL/path or an icon name from the CMS. */
  icon?: string;
  title: string;
  imageClassName?: string;
  svgClassName?: string;
  /** `sizes` hint for the image (the parent must be position: relative). */
  sizes?: string;
}

/**
 * Renders a service icon from the CMS: an image (URL or /path) fills its
 * relatively-positioned parent; an icon name renders the matching vector icon.
 */
const ServiceIcon = ({ icon, title, imageClassName, svgClassName, sizes = "64px" }: ServiceIconProps) => {
  const value = icon?.trim() ?? "";
  if (value.startsWith("http") || value.startsWith("/")) {
    const remote = value.startsWith("http") && !value.includes("res.cloudinary.com");
    return (
      <Image
        src={value}
        alt=""
        fill
        sizes={sizes}
        className={imageClassName}
        unoptimized={remote}
        aria-hidden="true"
      />
    );
  }
  const Icon = NAMED_ICONS[value.toLowerCase()] ?? Sparkles;
  return <Icon className={svgClassName} aria-label={title} strokeWidth={1.75} />;
};

export default ServiceIcon;
