'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './ChatBot.module.css';
import { askChatBot } from '../../../../service/ChatBot/ChatBot';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showDivider, setShowDivider] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageDividerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const divider = messageDividerRef.current;
    if (!divider) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (messageDividerRef.current) {
        messageDividerRef.current.scrollLeft += e.deltaY;
      }
    };

    divider.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      divider.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleDividerClick = async (text: string) => {
    setShowDivider(false); // Hide divider after click
    
    // Create and send message directly
    const newMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Call API for bot response
    try {
      const response = await askChatBot(text, 'en');
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setShowDivider(false);
      setInputText('');
      
      try {
        // Call the API to get bot response
        const botResponse = await askChatBot(inputText, 'en');
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse.answer,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error getting bot response:', error);
        
        // Fallback response
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button 
        className={styles.chatToggle}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <img 
          src="/assets/chatbot/f23588ca444ab18fb9cc8f5c53c79a764d32ef58.jpg" 
          alt="Chat bot" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '1234.568px',
          }}
        />
      </button>
    );
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.headerContent}>
          <div className={styles.botAvatar}>
            <div className={styles.avatarIcon}>
              <img 
                src="/assets/chatbot/f23588ca444ab18fb9cc8f5c53c79a764d32ef58.jpg" 
                alt="Chat bot" 
                width="30" 
                height="30" 
                style={{ 
                  objectFit: 'cover',
                  borderRadius: '50%'
                }}
              />
            </div>
          </div>
          <div className={styles.headerInfo}>
            <h3 className={styles.botName}>AI Assistant</h3>
            <p className={styles.botStatus}>Online</p>
          </div>
          <button 
            className={styles.closeButton}
            onClick={toggleChat}
            aria-label="Close chat"
            type="button"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>
      </div>

      <div className={`${styles.messagesContainer} ${!showDivider ? styles.messagesContainerExpanded : ''}`}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}
          >
            {message.sender === 'bot' && (
              <img 
                src="/assets/chatbot/f23588ca444ab18fb9cc8f5c53c79a764d32ef58.jpg" 
                alt="AI Assistant" 
                width="30" 
                height="30" 
                style={{ 
                  objectFit: 'cover',
                  borderRadius: '50%',
                  marginBottom: '0px',
                  justifyContent: 'end',
                  alignItems: 'end',
                  marginRight:'10px'
                }}
              />
            )}
            <div className={styles.messageContent}>
              <div className={styles.messageTextContainer}>
                <p className={styles.messageText}>{message.text}</p>
                <span className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showDivider && (
        <div ref={messageDividerRef} className={styles.messageDivider}>
          <div className={styles.dividerGrid}>
            {[
            { text: 'who are Axuraa oofofofoof', key: '1' },
            { text: 'what services do you offer', key: '2' },
            { text: 'how can I contact you', key: '3' },
            { text: 'what is your pricing', key: '4' },
            { text: 'do you have portfolio', key: '5' },
            { text: 'how long does it take', key: '6' },
            ].map(item => (
              <button 
                key={item.key} 
                className={styles.dividerButton}
                onClick={() => handleDividerClick(item.text)}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={styles.messageInput}
            aria-label="Type message"
          />
          <button 
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className={styles.sendButton}
            aria-label="Send message"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <g clipPath="url(#clip0_1444_2320)">
                <path d="M17.3654 -0.0550202L0.320516 9.77844C-0.3451 10.1609 -0.260519 11.0876 0.401419 11.3671L4.31053 13.0072L14.8758 3.69596C15.0781 3.51577 15.3649 3.79158 15.1921 4.00119L6.33312 14.7945V17.7548C6.33312 18.6227 7.38119 18.9647 7.89603 18.3358L10.2312 15.4932L14.8133 17.4128C15.3355 17.6334 15.9312 17.3061 16.0268 16.7435L18.6746 0.856984C18.7996 0.114142 18.0016 -0.422764 17.3654 -0.0550202Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_1444_2320">
                  <rect width="18.8285" height="18.8285" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatBot);
