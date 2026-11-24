import React from "react";
import styles from "./ChatBot.module.css";

// Links, emails and international phone numbers inside an answer.
const LINKABLE = /(https?:\/\/[^\s<>"']+|[\w.+-]+@[\w-]+\.[\w.-]+|\+\d[\d ()-]{7,}\d)/g;

const linkify = (text: string): React.ReactNode[] =>
  text.split(LINKABLE).map((part, i) => {
    // `split` with one group puts the matches at the odd positions
    if (i % 2 === 0) return part;
    const value = part.replace(/[.,!?)\]،؛؟]+$/, "");
    const rest = part.slice(value.length);
    const isUrl = /^https?:/.test(value);
    const href = isUrl
      ? value
      : value.includes("@")
        ? `mailto:${value}`
        : `tel:${value.replace(/[^\d+]/g, "")}`;
    return (
      <React.Fragment key={i}>
        <a
          href={href}
          dir="ltr"
          className={styles.inlineLink}
          {...(isUrl && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {value}
        </a>
        {rest}
      </React.Fragment>
    );
  });

const BULLET = /^\s*[-•]\s+/;

/** Plain-text answer as paragraphs and lists. Never renders HTML. */
const MessageText: React.FC<{ text: string }> = ({ text }) => {
  const blocks: { list: boolean; lines: string[] }[] = [];
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    const list = BULLET.test(line);
    const last = blocks[blocks.length - 1];
    if (list && last?.list) last.lines.push(line.replace(BULLET, ""));
    else blocks.push({ list, lines: [list ? line.replace(BULLET, "") : line] });
  }

  return (
    <>
      {blocks.map((block, i) =>
        block.list ? (
          <ul key={i} className={styles.messageList} dir="auto">
            {block.lines.map((line, j) => (
              <li key={j} dir="auto">
                {linkify(line)}
              </li>
            ))}
          </ul>
        ) : (
          <p key={i} className={styles.messageText} dir="auto">
            {linkify(block.lines[0])}
          </p>
        ),
      )}
    </>
  );
};

export default MessageText;
