"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, MessagesSquare, RotateCcw, Send, Sparkles, SquarePen, X } from "lucide-react";
import styles from "./ChatBot.module.css";
import MessageText from "./MessageText";
import LocalizedLink from "@/components/UI/Atoms/LocalizedLink/LocalizedLink";
import {
  askChatBot,
  ChatBotError,
  type ChatErrorReason,
  type ChatLink,
  type ChatTurn,
} from "@/service/ChatBot/ChatBot";
import useDictionary from "@/hooks/useDictionary";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  link?: ChatLink | null;
  /** Set on a failed answer; the text then comes from the dictionary. */
  error?: ChatErrorReason;
}

interface Conversation {
  messages: Message[];
  suggestions: string[];
}

const AVATAR = "/assets/chatbot/f23588ca444ab18fb9cc8f5c53c79a764d32ef58.jpg";
const STORAGE_KEY = "axuraa-chat";
const MAX_STORED = 40;

const PATHS: Record<ChatLink, string> = {
  contact: "/contact",
  solutions: "/businessSolutions",
  portfolio: "/portfolio",
  about: "/aboutus",
};

let messageSeq = 0;
const createMessage = (
  sender: Message["sender"],
  text: string,
  extra: Partial<Message> = {},
): Message => ({
  id: `${Date.now()}-${++messageSeq}`,
  sender,
  text,
  timestamp: Date.now(),
  ...extra,
});

const formatTime = (timestamp: number, locale: string) =>
  new Date(timestamp).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

/** The conversation survives reloads within the tab. Storage may be blocked. */
const loadConversation = (): Conversation | null => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as Partial<Conversation> | null;
    if (!saved || !Array.isArray(saved.messages)) return null;
    const messages = saved.messages.filter(
      (m) =>
        m &&
        typeof m.id === "string" &&
        typeof m.text === "string" &&
        typeof m.timestamp === "number" &&
        (m.sender === "user" || m.sender === "bot"),
    );
    const suggestions = Array.isArray(saved.suggestions)
      ? saved.suggestions.filter((s) => typeof s === "string")
      : [];
    return { messages, suggestions };
  } catch {
    return null;
  }
};

const saveConversation = (conversation: Conversation) => {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...conversation, messages: conversation.messages.slice(-MAX_STORED) }),
    );
  } catch {
    // The chat works without it.
  }
};

/** Answered turns only: a failed question would confuse the assistant. */
const toHistory = (messages: Message[]): ChatTurn[] => {
  const turns: ChatTurn[] = [];
  messages.forEach((message, i) => {
    if (message.error) return;
    if (message.sender === "user" && (!messages[i + 1] || messages[i + 1].error)) return;
    turns.push({ role: message.sender === "user" ? "user" : "assistant", text: message.text });
  });
  return turns;
};

const BotAvatar = ({ size }: { size: number }) => (
  <span className={styles.avatar} style={{ width: size, height: size }}>
    <Image src={AVATAR} alt="" width={size} height={size} className={styles.avatarImg} />
  </span>
);

const ChatBot: React.FC = () => {
  const { t, locale: lang } = useDictionary();
  const c = t.chat;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const restored = useRef(false);
  // Number of the running request; 0 when idle. A new chat makes older answers stale.
  const request = useRef(0);
  const requestSeq = useRef(0);

  // Nothing asked yet: offer the starter questions, in the current language.
  const chips = suggestions.length > 0 ? suggestions : messages.length === 0 ? c.suggestions : [];
  const showChips = chips.length > 0 && !isSending;
  const lastMessage = messages[messages.length - 1];
  const failed = Boolean(lastMessage?.error);

  useEffect(() => {
    if (restored.current && !isSending) saveConversation({ messages, suggestions });
  }, [messages, suggestions, isSending]);

  // Scrolls only the list; scrollIntoView also moved the page behind it.
  useEffect(() => {
    const list = listRef.current;
    if (!isOpen || !list) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ top: list.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages, isSending, isOpen, showChips]);

  // Vertical wheel scrolls the suggestions row horizontally. Re-attached whenever the
  // row is mounted (the chat starts closed, so a mount-only effect never found it).
  useEffect(() => {
    const row = suggestionsRef.current;
    if (!isOpen || !showChips || !row) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      // In RTL the row scrolls towards negative values
      row.scrollLeft += getComputedStyle(row).direction === "rtl" ? -e.deltaY : e.deltaY;
    };
    row.addEventListener("wheel", handleWheel, { passive: false });
    return () => row.removeEventListener("wheel", handleWheel);
  }, [isOpen, showChips]);

  // Escape closes the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Focus moves into the chat and back to its button. On touch screens focusing
  // the field would open the keyboard over the conversation.
  useEffect(() => {
    if (isOpen && window.matchMedia("(hover: hover)").matches) inputRef.current?.focus();
    if (!isOpen && wasOpen.current) toggleRef.current?.focus();
    wasOpen.current = isOpen;
  }, [isOpen]);

  // The answer of an unmounted chat is dropped.
  useEffect(
    () => () => {
      request.current = -1;
    },
    [],
  );

  const openChat = () => {
    if (!restored.current) {
      restored.current = true;
      const saved = loadConversation();
      if (saved) {
        setMessages(saved.messages);
        setSuggestions(saved.suggestions);
      }
    }
    setIsOpen(true);
  };

  const newChat = () => {
    request.current = 0;
    setIsSending(false);
    setMessages([]);
    setSuggestions([]);
    setInputText("");
    inputRef.current?.focus();
  };

  const ask = useCallback(
    async (text: string, before: Message[]) => {
      const id = ++requestSeq.current;
      request.current = id;
      setIsSending(true);
      setSuggestions([]);

      let reply: Message;
      let next: string[] = [];
      try {
        const answer = await askChatBot(text, lang, toHistory(before));
        reply = createMessage("bot", answer.answer, { link: answer.link });
        next = answer.suggestions;
      } catch (error) {
        reply = createMessage("bot", "", {
          error: error instanceof ChatBotError ? error.reason : "unavailable",
        });
      }
      if (request.current !== id) return;
      request.current = 0;
      setMessages((prev) => [...prev, reply]);
      setSuggestions(next);
      setIsSending(false);
    },
    [lang],
  );

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || request.current > 0) return;
    setMessages([...messages, createMessage("user", text)]);
    setInputText("");
    void ask(text, messages);
  };

  const retry = () => {
    if (request.current > 0 || !failed) return;
    const kept = messages.slice(0, -1);
    const question = kept[kept.length - 1];
    if (question?.sender !== "user") return;
    setMessages(kept);
    void ask(question.text, kept.slice(0, -1));
  };

  if (!isOpen) {
    return (
      <button
        ref={toggleRef}
        className={styles.chatToggle}
        onClick={openChat}
        aria-label={c.open}
        type="button"
      >
        <span className={styles.toggleRing} aria-hidden="true" />
        <span className={styles.togglePing} aria-hidden="true" />
        <span className={styles.toggleCore} aria-hidden="true">
          <MessagesSquare className={styles.toggleIcon} size={26} strokeWidth={1.9} />
          <Sparkles className={styles.toggleSpark} size={14} strokeWidth={2.2} />
        </span>
        <span className={styles.toggleDot} aria-hidden="true" />
        <span className={styles.toggleTip} aria-hidden="true">
          {c.tooltip}
        </span>
      </button>
    );
  }

  const errorText = { busy: c.errorBusy, offline: c.errorOffline, unavailable: c.error };
  const linkText: Record<ChatLink, string> = {
    contact: c.linkContact,
    solutions: c.linkSolutions,
    portfolio: c.linkPortfolio,
    about: c.linkAbout,
  };

  return (
    <div className={styles.chatContainer} role="dialog" aria-label={c.dialog}>
      <div className={styles.chatHeader}>
        <span className={styles.headerGlow} aria-hidden="true" />
        <div className={styles.headerContent}>
          <div className={styles.botAvatar}>
            <BotAvatar size={42} />
            <span
              className={`${styles.onlineDot} ${failed ? styles.offlineDot : ""}`}
              aria-hidden="true"
            />
          </div>
          <div className={styles.headerInfo}>
            <h3 className={styles.botName}>
              {c.name} <Sparkles size={14} className={styles.nameSpark} aria-hidden="true" />
            </h3>
            <p className={styles.botStatus}>
              {isSending ? c.typing : failed ? c.unavailable : c.online}
            </p>
          </div>
          {messages.length > 0 && (
            <button
              className={styles.closeButton}
              onClick={newChat}
              aria-label={c.newChat}
              title={c.newChat}
              type="button"
            >
              <SquarePen className={styles.closeIcon} />
            </button>
          )}
          <button
            className={`${styles.closeButton} ${styles.closeSpin}`}
            onClick={() => setIsOpen(false)}
            aria-label={c.close}
            type="button"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>
      </div>

      <div ref={listRef} className={styles.messagesContainer} role="log" aria-live="polite">
        {/* Not part of the conversation, so it follows the page language */}
        <div className={`${styles.message} ${styles.botMessage}`}>
          <BotAvatar size={28} />
          <div className={styles.messageContent}>
            <div className={styles.messageTextContainer}>
              <MessageText text={c.greeting} />
            </div>
          </div>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.botMessage}`}
          >
            {message.sender === "bot" && <BotAvatar size={28} />}
            <div className={styles.messageContent}>
              <div
                className={`${styles.messageTextContainer} ${message.error ? styles.errorMessage : ""}`}
              >
                <MessageText text={message.error ? errorText[message.error] : message.text} />
              </div>
              {message.error && message === lastMessage && (
                <div className={styles.actions}>
                  <button type="button" className={styles.action} onClick={retry}>
                    <RotateCcw size={13} aria-hidden="true" /> {c.retry}
                  </button>
                  <LocalizedLink href={PATHS.contact} className={styles.action}>
                    {c.linkContact} <ArrowUpRight size={13} aria-hidden="true" />
                  </LocalizedLink>
                </div>
              )}
              {message.link && !message.error && (
                <div className={styles.actions}>
                  <LocalizedLink href={PATHS[message.link]} className={styles.action}>
                    {linkText[message.link]} <ArrowUpRight size={13} aria-hidden="true" />
                  </LocalizedLink>
                </div>
              )}
              <span className={styles.messageTime}>{formatTime(message.timestamp, lang)}</span>
            </div>
          </div>
        ))}
        {isSending && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <BotAvatar size={28} />
            <div className={styles.messageContent}>
              <div
                className={`${styles.messageTextContainer} ${styles.typing}`}
                role="img"
                aria-label={c.typingLabel}
              >
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        )}
      </div>

      {showChips && (
        <div ref={suggestionsRef} className={styles.messageDivider}>
          <div className={styles.dividerGrid}>
            {chips.map((text) => (
              <button
                key={text}
                type="button"
                className={styles.dividerButton}
                dir="auto"
                onClick={() => send(text)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        className={styles.inputContainer}
        onSubmit={(e) => {
          e.preventDefault();
          send(inputText);
        }}
      >
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={c.placeholder}
            className={styles.messageInput}
            aria-label={c.inputLabel}
            // `auto` follows the typed text; the placeholder follows the page
            dir={inputText ? "auto" : undefined}
            maxLength={1000}
            autoComplete="off"
            enterKeyHint="send"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className={styles.sendButton}
            aria-label={c.send}
          >
            <Send size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
