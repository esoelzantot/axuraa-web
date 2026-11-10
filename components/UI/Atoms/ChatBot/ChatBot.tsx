"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { MessagesSquare, Send, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./ChatBot.module.css";
import { askChatBot } from "@/service/ChatBot/ChatBot";
import { localeFromPath } from "@/lib/i18n";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

const AVATAR = "/assets/chatbot/f23588ca444ab18fb9cc8f5c53c79a764d32ef58.jpg";
const ERROR_TEXT = "Sorry, I encountered an error. Please try again.";

const SUGGESTIONS = [
  "Who are Axuraa?",
  "What services do you offer?",
  "How can I contact you?",
  "What is your pricing?",
  "Do you have a portfolio?",
  "How long does a project take?",
];

let messageSeq = 0;
const createMessage = (text: string, sender: Message["sender"]): Message => ({
  id: `${Date.now()}-${++messageSeq}`,
  text,
  sender,
  timestamp: Date.now(),
});

const formatTime = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const BotAvatar = ({ size }: { size: number }) => (
  <span className={styles.avatar} style={{ width: size, height: size }}>
    <Image src={AVATAR} alt="" width={size} height={size} className={styles.avatarImg} />
  </span>
);

const ChatBot: React.FC = () => {
  const lang = localeFromPath(usePathname());
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  // Vertical wheel scrolls the suggestions row horizontally. Re-attached whenever the
  // row is mounted (the chat starts closed, so a mount-only effect never found it).
  useEffect(() => {
    const row = suggestionsRef.current;
    if (!isOpen || !showSuggestions || !row) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      row.scrollLeft += e.deltaY;
    };
    row.addEventListener("wheel", handleWheel, { passive: false });
    return () => row.removeEventListener("wheel", handleWheel);
  }, [isOpen, showSuggestions]);

  // Escape closes the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const openChat = () => {
    setIsOpen(true);
    setMessages((prev) =>
      prev.length
        ? prev
        : [createMessage("Hello! I'm your AI assistant. How can I help you today?", "bot")],
    );
  };

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isSending) return;

      setMessages((prev) => [...prev, createMessage(text, "user")]);
      setShowSuggestions(false);
      setInputText("");
      setIsSending(true);

      try {
        const response = await askChatBot(text, lang);
        setMessages((prev) => [...prev, createMessage(response.answer, "bot")]);
      } catch {
        setMessages((prev) => [...prev, createMessage(ERROR_TEXT, "bot")]);
      } finally {
        setIsSending(false);
      }
    },
    [isSending, lang],
  );

  if (!isOpen) {
    return (
      <button className={styles.chatToggle} onClick={openChat} aria-label="Open chat" type="button">
        <span className={styles.toggleRing} aria-hidden="true" />
        <span className={styles.togglePing} aria-hidden="true" />
        <span className={styles.toggleCore} aria-hidden="true">
          <MessagesSquare className={styles.toggleIcon} size={26} strokeWidth={1.9} />
          <Sparkles className={styles.toggleSpark} size={14} strokeWidth={2.2} />
        </span>
        <span className={styles.toggleDot} aria-hidden="true" />
        <span className={styles.toggleTip} aria-hidden="true">
          Ask our AI
        </span>
      </button>
    );
  }

  return (
    <div className={styles.chatContainer} role="dialog" aria-label="AI Assistant chat">
      <div className={styles.chatHeader}>
        <span className={styles.headerGlow} aria-hidden="true" />
        <div className={styles.headerContent}>
          <div className={styles.botAvatar}>
            <BotAvatar size={42} />
            <span className={styles.onlineDot} aria-hidden="true" />
          </div>
          <div className={styles.headerInfo}>
            <h3 className={styles.botName}>
              AI Assistant <Sparkles size={14} className={styles.nameSpark} aria-hidden="true" />
            </h3>
            <p className={styles.botStatus}>{isSending ? "Typing…" : "Online · replies instantly"}</p>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            type="button"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>
      </div>

      <div className={styles.messagesContainer} aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.botMessage}`}
          >
            {message.sender === "bot" && <BotAvatar size={28} />}
            <div className={styles.messageContent}>
              <div className={styles.messageTextContainer}>
                <p className={styles.messageText}>{message.text}</p>
              </div>
              <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        {isSending && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <BotAvatar size={28} />
            <div className={styles.messageContent}>
              <div className={`${styles.messageTextContainer} ${styles.typing}`} aria-label="Assistant is typing">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showSuggestions && (
        <div ref={suggestionsRef} className={styles.messageDivider}>
          <div className={styles.dividerGrid}>
            {SUGGESTIONS.map((text) => (
              <button
                key={text}
                type="button"
                className={styles.dividerButton}
                onClick={() => send(text)}
                disabled={isSending}
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
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className={styles.messageInput}
            aria-label="Type message"
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className={styles.sendButton}
            aria-label="Send message"
          >
            <Send size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
