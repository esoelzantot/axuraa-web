/**
 * Small fetch wrapper shared by every service:
 * - request timeout (a slow backend can no longer hang a page render)
 * - Next.js data cache (`revalidate`) for GET requests made on the server
 * - safe body parsing (HTML error pages no longer throw inside `response.json()`)
 * - one error shape for every call
 */

export const DEFAULT_REVALIDATE = 60; // seconds
const DEFAULT_TIMEOUT_MS = 15_000;

export type HttpResult<T> =
  | { ok: true; status: number; json: T }
  | { ok: false; status: number; error: string };

interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  /** Seconds to cache a GET in the Next.js data cache, or `false` to skip the cache. */
  revalidate?: number | false;
  timeoutMs?: number;
}

const errorMessage = (json: unknown, fallback: string): string => {
  if (json && typeof json === "object") {
    const j = json as { message?: unknown; errors?: unknown };
    if (Array.isArray(j.errors) && j.errors.length) return j.errors.join(", ");
    if (typeof j.message === "string" && j.message) return j.message;
  }
  return fallback;
};

export async function http<T = unknown>(
  url: string,
  {
    method = "GET",
    body,
    revalidate = DEFAULT_REVALIDATE,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  }: RequestOptions = {},
): Promise<HttpResult<T>> {
  const init: RequestInit = {
    method,
    headers:
      body === undefined
        ? { Accept: "application/json" }
        : { Accept: "application/json", "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  };

  if (method === "GET") {
    if (revalidate === false) init.cache = "no-store";
    else init.next = { revalidate };
  }

  try {
    const response = await fetch(url, init);
    const text = await response.text();
    let json: unknown = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: errorMessage(json, `Request failed (${response.status})`),
      };
    }
    if (json === null) {
      return { ok: false, status: response.status, error: "Invalid response from server" };
    }
    return { ok: true, status: response.status, json: json as T };
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "TimeoutError";
    const message = timedOut
      ? "The server took too long to respond"
      : error instanceof Error
        ? error.message
        : "Network error";
    console.error(`[api] ${method} ${url} failed: ${message}`);
    return { ok: false, status: 0, error: message };
  }
}

/** Unwraps `{ status, data }` envelopes; returns the body itself when there is no envelope. */
export const unwrap = <T>(json: unknown): T =>
  (json && typeof json === "object" && "data" in json
    ? (json as { data: T }).data
    : json) as T;
