"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
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
        <Image
          src={AVATAR}
          alt=""
          width={64}
          height={64}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
        />
      </button>
    );
  }

  return (
    <div className={styles.chatContainer} role="dialog" aria-label="AI Assistant chat">
      <div className={styles.chatHeader}>
        <div className={styles.headerContent}>
          <div className={styles.botAvatar}>
            <div className={styles.avatarIcon}>
              <Image
                src={AVATAR}
                alt=""
                width={30}
                height={30}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
          </div>
          <div className={styles.headerInfo}>
            <h3 className={styles.botName}>AI Assistant</h3>
            <p className={styles.botStatus}>{isSending ? "Typing…" : "Online"}</p>
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

      <div
        className={`${styles.messagesContainer} ${!showSuggestions ? styles.messagesContainerExpanded : ""}`}
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.botMessage}`}
          >
            {message.sender === "bot" && (
              <Image
                src={AVATAR}
                alt=""
                width={30}
                height={30}
                style={{ objectFit: "cover", borderRadius: "50%", marginRight: "10px" }}
              />
            )}
            <div className={styles.messageContent}>
              <div className={styles.messageTextContainer}>
                <p className={styles.messageText}>{message.text}</p>
                <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
        {isSending && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <div className={styles.messageContent}>
              <div className={styles.messageTextContainer}>
                <p className={styles.messageText}>…</p>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
              <path
                d="M17.3654 -0.0550202L0.320516 9.77844C-0.3451 10.1609 -0.260519 11.0876 0.401419 11.3671L4.31053 13.0072L14.8758 3.69596C15.0781 3.51577 15.3649 3.79158 15.1921 4.00119L6.33312 14.7945V17.7548C6.33312 18.6227 7.38119 18.9647 7.89603 18.3358L10.2312 15.4932L14.8133 17.4128C15.3355 17.6334 15.9312 17.3061 16.0268 16.7435L18.6746 0.856984C18.7996 0.114142 18.0016 -0.422764 17.3654 -0.0550202Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
