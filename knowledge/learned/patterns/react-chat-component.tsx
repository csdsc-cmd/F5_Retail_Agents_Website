/**
 * React Chat Interface Pattern for Azure AI Foundry
 *
 * This is the approved pattern for building chat UIs
 * that interact with Azure AI Agents via the backend API.
 */

import { useState, useRef, useEffect, FormEvent } from "react";
import { useMsal } from "@azure/msal-react";
import "./ChatInterface.css";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  apiUrl: string;
}

// API client with auth
async function fetchWithAuth(
  url: string,
  token: string,
  options: RequestInit = {}
): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response;
}

export function ChatInterface({ apiUrl }: ChatInterfaceProps) {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auth
  const { instance, accounts } = useMsal();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Get auth token
  async function getToken(): Promise<string> {
    const request = {
      scopes: [`api://${import.meta.env.VITE_AZURE_CLIENT_ID}/.default`],
      account: accounts[0]
    };

    const response = await instance.acquireTokenSilent(request);
    return response.accessToken;
  }

  // Create a new conversation thread
  async function createThread(): Promise<string> {
    const token = await getToken();
    const response = await fetchWithAuth(`${apiUrl}/api/threads`, token, {
      method: "POST",
      body: JSON.stringify({})
    });
    const data = await response.json();
    return data.data.threadId;
  }

  // Send message handler
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setError(null);
    setIsLoading(true);

    // Add user message immediately for responsiveness
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const token = await getToken();

      // Create thread if this is the first message
      let currentThreadId = threadId;
      if (!currentThreadId) {
        currentThreadId = await createThread();
        setThreadId(currentThreadId);
      }

      // Send message to API
      const response = await fetchWithAuth(
        `${apiUrl}/api/threads/${currentThreadId}/messages`,
        token,
        {
          method: "POST",
          body: JSON.stringify({ message: trimmedInput })
        }
      );

      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.data.assistantMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      // Remove the optimistic user message on error
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
      setInput(trimmedInput); // Restore input so user can retry
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  // Start new conversation
  function handleNewChat() {
    setMessages([]);
    setThreadId(null);
    setError(null);
    inputRef.current?.focus();
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>AI Assistant</h1>
        <button onClick={handleNewChat} className="new-chat-btn">
          New Chat
        </button>
      </header>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="empty-state">
            <p>Start a conversation with the AI assistant.</p>
          </div>
        )}

        {messages.map(message => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message assistant loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="input-form">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
          className="message-input"
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
}
