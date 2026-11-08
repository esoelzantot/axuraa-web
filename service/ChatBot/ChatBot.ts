import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";

export interface ChatBotResponse {
  status: string;
  answer: string;
  lang: string;
}

/** Throws when the bot cannot answer, so the UI can show its own fallback message. */
export const askChatBot = async (
  question: string,
  lang: string = "en",
): Promise<ChatBotResponse> => {
  const res = await http<ChatBotResponse>(ENDPOINTS.ChatBot.ask(lang), {
    method: "POST",
    body: { question: question.trim() },
    timeoutMs: 30_000,
  });
  if (!res.ok) throw new Error(res.error);
  if (typeof res.json?.answer !== "string") throw new Error("Invalid chatbot response");
  return res.json;
};
