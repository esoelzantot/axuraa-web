import type { Locale } from "@/lib/i18n";
import { getDictionary, type Dictionary } from "./index";

/** Texts edited in the dashboard: dotted dictionary path → replacement. */
export type Overrides = Readonly<Record<string, unknown>>;

export const NO_OVERRIDES: Overrides = {};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Values the code depends on, so not every string will do. */
const CHECKS: Record<string, (value: unknown) => boolean> = {
  "caseStudy.dateLocale": (value) => {
    try {
      return Intl.DateTimeFormat.supportedLocalesOf(value as string).length > 0;
    } catch {
      return false;
    }
  },
};

/** True when `value` can stand in for `sample`. Lists may have any length. */
const sameShape = (value: unknown, sample: unknown): boolean => {
  if (typeof sample === "string") return typeof value === "string";
  if (Array.isArray(sample)) {
    return Array.isArray(value) && value.every((item) => sample.some((s) => sameShape(item, s)));
  }
  if (isObject(sample)) {
    return (
      isObject(value) &&
      Object.entries(sample).every(([key, s]) =>
        // `type` names the kind of a block (legal pages), it is not a text
        key === "type" ? value[key] === s : sameShape(value[key], s),
      )
    );
  }
  return false;
};

const isBlank = (value: unknown) =>
  (typeof value === "string" && value.trim() === "") || (Array.isArray(value) && value.length === 0);

/**
 * Returns `base` with the matching overrides in place. Only paths that exist in
 * `base` are read; blank values and values of another shape keep the built-in text.
 * `sample` is the shape to accept when `base` alone does not show every variant.
 */
export const applyOverrides = <T extends object>(
  base: T,
  overrides: Overrides,
  prefix = "",
  sample: unknown = base,
): T => {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(base)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const shape = isObject(sample) ? sample[key] : undefined;
    if (path === "cms") {
      result[key] = value;
    } else if (isObject(value)) {
      result[key] = applyOverrides(value, overrides, path, shape);
    } else {
      const override = Object.prototype.hasOwnProperty.call(overrides, path) ? overrides[path] : undefined;
      const usable = !isBlank(override) && sameShape(override, shape) && (CHECKS[path]?.(override) ?? true);
      result[key] = usable ? override : value;
    }
  }
  return result as T;
};

const merged = new WeakMap<Overrides, Partial<Record<Locale, Dictionary>>>();

/** Dictionary of a locale with its overrides (merged once per overrides object). */
export const mergeDictionary = (locale: Locale, overrides: Overrides = NO_OVERRIDES): Dictionary => {
  const cached = merged.get(overrides) ?? {};
  merged.set(overrides, cached);
  return (cached[locale] ??= applyOverrides(getDictionary(locale), overrides));
};
