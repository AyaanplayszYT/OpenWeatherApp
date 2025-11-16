import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2, Maximize2, Loader, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  MAX_MESSAGES_PER_HOUR: 30,
  MAX_MESSAGES_PER_MINUTE: 5,
  COOLDOWN_BETWEEN_MESSAGES: 1000, // milliseconds
};

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI weather assistant. Ask me anything about the weather, or get suggestions for outdoor activities based on current conditions!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 380, y: window.innerHeight - 500 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const apiKey = import.meta.env.VITE_OPENROUTERKEY;
      
      if (!apiKey) {
        return "API key not configured. Please set VITE_OPENROUTERKEY in your .env file.";
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful weather assistant. Answer questions about weather, suggest outdoor activities based on weather conditions, and provide weather-related tips. Keep responses concise and friendly. Use emojis to make responses more engaging.",
            },
            ...messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            {
              role: "user",
              content: userMessage,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("OpenRouter error:", error);
        return "Sorry, I had trouble thinking about that. Please try again! 🤔";
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm not sure how to respond to that. 🤔";
    } catch (error) {
      console.error("AI response error:", error);
      return "Sorry, I encountered an error. Please try again! 🤔";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Check rate limits
    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTime;

    // Cooldown check
    if (timeSinceLastMessage < RATE_LIMIT_CONFIG.COOLDOWN_BETWEEN_MESSAGES) {
      const waitTime = Math.ceil(
        (RATE_LIMIT_CONFIG.COOLDOWN_BETWEEN_MESSAGES - timeSinceLastMessage) / 1000
      );
      setRateLimitError(`Please wait ${waitTime}s before sending another message`);
      setTimeout(() => setRateLimitError(null), 3000);
      return;
    }

    // Per-minute check
    if (messageCount >= RATE_LIMIT_CONFIG.MAX_MESSAGES_PER_MINUTE) {
      setRateLimitError("Too many messages! Please wait a moment before sending more.");
      setTimeout(() => setRateLimitError(null), 5000);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setLastMessageTime(now);
    setMessageCount((prev) => prev + 1);

    // Reset message count every minute
    setTimeout(() => {
      setMessageCount(0);
    }, 60000);

    try {
      const aiResponseText = await generateAIResponse(input);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again! 🤔",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform duration-200"
        title="Open AI Chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div
      ref={chatRef}
      className="fixed z-50 w-96 h-[500px] glass-card rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header - Draggable */}
      <div
        onMouseDown={handleMouseDown}
        className="bg-white/20 backdrop-blur-md border-b border-white/20 p-4 flex items-center justify-between cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Weather AI Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-0 h-auto hover:bg-white/10"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="p-0 h-auto hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500/50 text-white"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/20 p-4 bg-white/10 backdrop-blur-md space-y-2">
            {rateLimitError && (
              <div className="flex items-center gap-2 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-xs text-red-200">
                <AlertCircle className="w-4 h-4" />
                {rateLimitError}
              </div>
            )}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Loader className="w-3 h-3 animate-spin" />
                AI is thinking...
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-white/40 mb-2">
              <span>Messages: {messageCount}/{RATE_LIMIT_CONFIG.MAX_MESSAGES_PER_MINUTE} per min</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                placeholder="Ask me anything..."
                disabled={isLoading || rateLimitError !== null}
                className="flex-1 bg-white/20 text-white placeholder:text-white/50 border border-white/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                disabled={isLoading || rateLimitError !== null}
                className="bg-blue-500/70 hover:bg-blue-500/90 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
