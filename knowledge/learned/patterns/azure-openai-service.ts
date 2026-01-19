/**
 * Azure OpenAI Service Pattern
 *
 * This is the approved pattern for interacting with Azure OpenAI.
 * Uses API key authentication (temporary) with Managed Identity as future upgrade.
 */

import { AzureOpenAI } from "@azure/openai";

// Types
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

// Environment configuration
const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
const apiKey = process.env.AZURE_OPENAI_API_KEY!;
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4o-mini";

if (!endpoint || !apiKey) {
  throw new Error("Missing AZURE_OPENAI_ENDPOINT or AZURE_OPENAI_API_KEY");
}

// Initialize client with API key
const client = new AzureOpenAI({
  endpoint,
  apiKey,
  apiVersion: "2024-08-01-preview",
});

/**
 * ChatService - Manages conversations with Azure OpenAI
 */
export class ChatService {
  private conversationHistory: Map<string, ChatMessage[]> = new Map();
  private systemPrompt: string;

  constructor(systemPrompt: string) {
    this.systemPrompt = systemPrompt;
  }

  /**
   * Create a new conversation
   */
  createConversation(): string {
    const conversationId = crypto.randomUUID();
    this.conversationHistory.set(conversationId, []);
    return conversationId;
  }

  /**
   * Send a message and get a response
   */
  async chat(conversationId: string, userMessage: string, options: ChatCompletionOptions = {}): Promise<string> {
    // Get or create conversation history
    let history = this.conversationHistory.get(conversationId);
    if (!history) {
      history = [];
      this.conversationHistory.set(conversationId, history);
    }

    // Build messages array
    const messages: ChatMessage[] = [
      { role: "system", content: options.systemPrompt || this.systemPrompt },
      ...history,
      { role: "user", content: userMessage }
    ];

    // Call Azure OpenAI
    const response = await client.chat.completions.create({
      model: deploymentName,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
    });

    const assistantMessage = response.choices[0]?.message?.content || "";

    // Update history
    history.push({ role: "user", content: userMessage });
    history.push({ role: "assistant", content: assistantMessage });

    return assistantMessage;
  }

  /**
   * Get conversation history
   */
  getHistory(conversationId: string): ChatMessage[] {
    return this.conversationHistory.get(conversationId) || [];
  }

  /**
   * Clear conversation history
   */
  clearConversation(conversationId: string): void {
    this.conversationHistory.delete(conversationId);
  }

  /**
   * Get all active conversation IDs
   */
  getActiveConversations(): string[] {
    return Array.from(this.conversationHistory.keys());
  }
}

// Export a factory function
export function createChatService(systemPrompt: string): ChatService {
  return new ChatService(systemPrompt);
}
