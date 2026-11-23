/** True for an uploaded image (http or https URL) rather than an icon name or a local file. */
export const isIconUrl = (icon: string | null | undefined): icon is `http${string}` =>
  typeof icon === "string" && /^https?:\/\//i.test(icon);
