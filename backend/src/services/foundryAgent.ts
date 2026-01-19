/**
 * Azure AI Foundry Agent Service
 *
 * Manages agents, threads, and conversations using Azure AI Agents.
 * Uses DefaultAzureCredential for authentication (requires az login for local dev).
 */

import {
  AgentsClient,
  type Agent,
  type AgentThread,
  type ThreadMessage,
  type MessageContent,
  type MessageTextContent,
} from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

// Environment configuration
const endpoint = process.env.AZURE_AI_FOUNDRY_ENDPOINT;

if (!endpoint) {
  throw new Error("Missing AZURE_AI_FOUNDRY_ENDPOINT environment variable");
}

// Initialize client with DefaultAzureCredential
// For local dev: run `az login` first
// For production: uses Managed Identity
const client = new AgentsClient(endpoint, new DefaultAzureCredential());

// Types
export interface AgentConfig {
  name: string;
  instructions: string;
  model?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// In-memory storage for agents and threads
const agentCache = new Map<string, string>(); // conversationId -> agentId
const threadCache = new Map<string, string>(); // conversationId -> threadId

/**
 * Create a new agent for a conversation
 */
export async function createAgent(config: AgentConfig): Promise<string> {
  const agent: Agent = await client.createAgent(config.model || "gpt-4o-mini", {
    name: config.name,
    instructions: config.instructions,
  });

  return agent.id;
}

/**
 * Create a new conversation thread
 */
export async function createThread(): Promise<string> {
  const thread: AgentThread = await client.threads.create();
  return thread.id;
}

/**
 * Start a new conversation with an agent
 */
export async function startConversation(agentConfig: AgentConfig): Promise<string> {
  const conversationId = crypto.randomUUID();

  // Create agent and thread
  const agentId = await createAgent(agentConfig);
  const threadId = await createThread();

  // Cache them
  agentCache.set(conversationId, agentId);
  threadCache.set(conversationId, threadId);

  return conversationId;
}

/**
 * Send a message and get a response
 */
export async function chat(conversationId: string, userMessage: string): Promise<string> {
  const agentId = agentCache.get(conversationId);
  const threadId = threadCache.get(conversationId);

  if (!agentId || !threadId) {
    throw new Error(`Conversation ${conversationId} not found`);
  }

  // Add user message to thread
  await client.messages.create(threadId, "user", userMessage);

  // Create run and wait for completion
  const run = await client.runs.create(threadId, agentId);

  // Poll for completion
  let runStatus = await client.runs.get(threadId, run.id);
  while (runStatus.status === "queued" || runStatus.status === "in_progress") {
    await new Promise(resolve => setTimeout(resolve, 500));
    runStatus = await client.runs.get(threadId, run.id);
  }

  if (runStatus.status !== "completed") {
    throw new Error(`Run failed with status: ${runStatus.status}`);
  }

  // Get the assistant's response
  const messagesResponse = client.messages.list(threadId);
  const messages: ThreadMessage[] = [];
  for await (const msg of messagesResponse) {
    messages.push(msg);
  }

  const assistantMessages = messages.filter(
    (m: ThreadMessage) => m.role === "assistant"
  );

  if (assistantMessages.length === 0) {
    return "";
  }

  // Get the most recent assistant message
  const lastMessage = assistantMessages[0];
  const textContent = lastMessage.content.find((c: MessageContent) => c.type === "text") as MessageTextContent | undefined;

  if (textContent) {
    return textContent.text.value;
  }

  return "";
}

/**
 * Get conversation history
 */
export async function getHistory(conversationId: string): Promise<ChatMessage[]> {
  const threadId = threadCache.get(conversationId);

  if (!threadId) {
    return [];
  }

  const messagesResponse = client.messages.list(threadId);
  const messages: ThreadMessage[] = [];
  for await (const msg of messagesResponse) {
    messages.push(msg);
  }

  return messages
    .filter((m: ThreadMessage) => m.role === "user" || m.role === "assistant")
    .map((m: ThreadMessage) => {
      const textContent = m.content.find((c: MessageContent) => c.type === "text") as MessageTextContent | undefined;
      return {
        role: m.role as "user" | "assistant",
        content: textContent ? textContent.text.value : "",
      };
    })
    .reverse();
}

/**
 * End a conversation (cleanup)
 */
export async function endConversation(conversationId: string): Promise<void> {
  const agentId = agentCache.get(conversationId);
  const threadId = threadCache.get(conversationId);

  if (threadId) {
    await client.threads.delete(threadId);
    threadCache.delete(conversationId);
  }

  if (agentId) {
    await client.deleteAgent(agentId);
    agentCache.delete(conversationId);
  }
}

/**
 * List active conversations
 */
export function listConversations(): string[] {
  return Array.from(agentCache.keys());
}
