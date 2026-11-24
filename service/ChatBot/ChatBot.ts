import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";

/** Website pages the assistant may point to. */
export type ChatLink = "contact" | "solutions" | "portfolio" | "about";
const CHAT_LINKS: readonly string[] = ["contact", "solutions", "portfolio", "about"];

export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

export interface ChatBotReply {
  answer: string;
  /** Follow-up questions the visitor may ask next. */
  suggestions: string[];
  link: ChatLink | null;
}

/** `busy`: too many questions. `offline`: no connection. `unavailable`: anything else. */
export type ChatErrorReason = "busy" | "offline" | "unavailable";

export class ChatBotError extends Error {
  constructor(public readonly reason: ChatErrorReason) {
    super(reason);
    this.name = "ChatBotError";
  }
}

// Limits of the API
const MAX_HISTORY = 8;
const MAX_TURN_CHARS = 2000;

/** Throws a `ChatBotError` when the bot cannot answer. */
export const askChatBot = async (
  question: string,
  lang: string = "en",
  history: ChatTurn[] = [],
): Promise<ChatBotReply> => {
  const turns = history
    .slice(-MAX_HISTORY)
    .map(({ role, text }) => ({ role, text: text.slice(0, MAX_TURN_CHARS) }));

  const res = await http<{ answer?: unknown; suggestions?: unknown; link?: unknown }>(
    ENDPOINTS.ChatBot.ask(lang),
    {
      method: "POST",
      body: { question: question.trim(), ...(turns.length > 0 && { history: turns }) },
      timeoutMs: 30_000,
    },
  );

  if (!res.ok) {
    if (res.status === 429) throw new ChatBotError("busy");
    const offline = typeof navigator !== "undefined" && navigator.onLine === false;
    throw new ChatBotError(offline ? "offline" : "unavailable");
  }

  const { answer, suggestions, link } = res.json;
  if (typeof answer !== "string" || !answer.trim()) throw new ChatBotError("unavailable");
  return {
    answer,
    // Older backends send neither field
    suggestions: Array.isArray(suggestions)
      ? suggestions.filter((s): s is string => typeof s === "string" && s.trim() !== "")
      : [],
    link: typeof link === "string" && CHAT_LINKS.includes(link) ? (link as ChatLink) : null,
  };
};
