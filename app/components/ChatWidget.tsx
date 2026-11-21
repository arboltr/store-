"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "model";
  content: string;
}

const SUGGESTIONS = [
  "¿Qué camiseta me recomiendas para salir de noche?",
  "¿Cómo combinar la camiseta Tye-Die de tul?",
  "Busco básicos por menos de 10 €",
  "¿Qué opciones de manga asimétrica tenéis?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "¡Hola! ✦ Soy tu asistente personal de moda de Bershka impulsado por Gemini. ¿Buscas un look especial, dudas sobre combinaciones o necesitas ayuda para elegir tu estilo?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content:
              data.error ||
              "Ups, no pude conectarme con el estilista en este momento. Inténtalo de nuevo en unos instantes.",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "Error de conexión. Por favor verifica tu red e inténtalo de nuevo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
      {/* CHAT WINDOW */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "64px",
            right: 0,
            width: "360px",
            maxWidth: "calc(100vw - 32px)",
            height: "500px",
            maxHeight: "calc(100vh - 120px)",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.16)",
            border: "1px solid #e5e5e5",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              backgroundColor: "#111111",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                ✦
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}>
                  Bershka Stylist
                </div>
                <div style={{ fontSize: "10px", color: "#a3a3a3", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      display: "inline-block",
                    }}
                  />
                  Gemini AI Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                fontSize: "20px",
                cursor: "pointer",
                padding: "2px 6px",
                lineHeight: 1,
                opacity: 0.8,
              }}
              title="Cerrar chat"
            >
              ×
            </button>
          </div>

          {/* Messages list */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "#fafafa",
            }}
          >
            {messages.map((m, index) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "10px 14px",
                      borderRadius: isUser ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                      backgroundColor: isUser ? "#111111" : "#ffffff",
                      color: isUser ? "#ffffff" : "#111111",
                      fontSize: "12px",
                      lineHeight: "1.45",
                      border: isUser ? "none" : "1px solid #eaeaea",
                      boxShadow: isUser ? "none" : "0 1px 3px rgba(0,0,0,0.03)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}

            {/* Loading typing indicator */}
            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 2px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #eaeaea",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#888888",
                      animation: "pulse 1s infinite alternate",
                    }}
                  />
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#888888",
                      animation: "pulse 1s infinite alternate 0.2s",
                    }}
                  />
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#888888",
                      animation: "pulse 1s infinite alternate 0.4s",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Suggestion chips if only 1 message exists */}
            {messages.length === 1 && (
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "10px", color: "#888888", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                  Sugerencias rápidas:
                </span>
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    style={{
                      textAlign: "left",
                      fontSize: "11px",
                      padding: "8px 10px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "6px",
                      color: "#333333",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input field */}
          <div
            style={{
              padding: "12px 14px",
              backgroundColor: "#ffffff",
              borderTop: "1px solid #eaeaea",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <input
              type="text"
              placeholder="Pregúntale a tu estilista Bershka..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              style={{
                flex: 1,
                fontSize: "12px",
                padding: "8px 12px",
                border: "1px solid #dcdcdc",
                borderRadius: "20px",
                outline: "none",
                backgroundColor: "#fcfcfc",
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: input.trim() && !isLoading ? "#111111" : "#cccccc",
                color: "#ffffff",
                border: "none",
                cursor: input.trim() && !isLoading ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.15s ease",
              }}
              title="Enviar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          backgroundColor: "#111111",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.22)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease, background-color 0.2s ease",
          position: "relative",
        }}
        title="Bershka AI Stylist"
      >
        {isOpen ? (
          <span style={{ fontSize: "22px", lineHeight: 1 }}>×</span>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "16px", lineHeight: 1 }}>✦</span>
            <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.08em", marginTop: "2px" }}>
              AI
            </span>
          </div>
        )}

        {/* Small notification dot if closed */}
        {!isOpen && (
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#ff3e6c",
              border: "2px solid #ffffff",
            }}
          />
        )}
      </button>
    </div>
  );
}
