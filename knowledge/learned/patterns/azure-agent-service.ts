/**
 * Azure AI Foundry Agent Service Pattern
 *
 * This is the approved pattern for creating and managing agents
 * using the Azure AI Agents SDK.
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

// Types
export interface AgentConfig {
  name: string;
  instructions: string;
  model?: string;
  tools?: AgentTool[];
}

export interface AgentTool {
  type: "code_interpreter" | "file_search" | "function";
  function?: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Initialize client once and reuse
const projectEndpoint = process.env.AZURE_FOUNDRY_PROJECT_ENDPOINT!;
const modelDeploymentName = process.env.MODEL_DEPLOYMENT_NAME || "gpt-4o";

const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

/**
 * AgentService - Wrapper for Azure AI Agents SDK
 *
 * Provides simplified interface for common agent operations.
 */
export class AgentService {
  private agentId: string | null = null;

  /**
   * Create or get an agent with the specified configuration
   */
  async getOrCreateAgent(config: AgentConfig): Promise<string> {
    if (this.agentId) {
      return this.agentId;
    }

    const agent = await client.createAgent(config.model || modelDeploymentName, {
      name: config.name,
      instructions: config.instructions,
      tools: config.tools?.map(t => ({ type: t.type, ...t.function && { function: t.function } }))
    });

    this.agentId = agent.id;
    console.log(`Created agent: ${agent.id}`);
    return agent.id;
  }

  /**
   * Start a new conversation thread
   */
  async createThread(): Promise<string> {
    const thread = await client.threads.create();
    console.log(`Created thread: ${thread.id}`);
    return thread.id;
  }

  /**
   * Send a message and get the agent's response
   */
  async chat(threadId: string, userMessage: string): Promise<string> {
    if (!this.agentId) {
      throw new Error("Agent not initialized. Call getOrCreateAgent first.");
    }

    // Add user message to thread
    await client.messages.create(threadId, "user", userMessage);

    // Run the agent and wait for completion
    const run = await client.runs.createAndPoll(threadId, this.agentId, {
      pollingOptions: { intervalInMs: 1000 }
    });

    if (run.status !== "completed") {
      throw new Error(`Run failed with status: ${run.status}`);
    }

    // Get the assistant's response (most recent message)
    const messagesIterator = client.messages.list(threadId);
    for await (const message of messagesIterator) {
      if (message.role === "assistant") {
        const textContent = message.content.find(c => c.type === "text");
        if (textContent && "text" in textContent) {
          return textContent.text.value;
        }
      }
    }

    throw new Error("No assistant response found");
  }

  /**
   * Get full conversation history for a thread
   */
  async getConversationHistory(threadId: string): Promise<ConversationMessage[]> {
    const messages: ConversationMessage[] = [];
    const messagesIterator = client.messages.list(threadId);

    for await (const message of messagesIterator) {
      const textContent = message.content.find(c => c.type === "text");
      if (textContent && "text" in textContent) {
        messages.push({
          role: message.role as "user" | "assistant",
          content: textContent.text.value,
          timestamp: new Date(message.createdAt)
        });
      }
    }

    // Return in chronological order
    return messages.reverse();
  }

  /**
   * End a conversation and clean up resources
   */
  async endConversation(threadId: string): Promise<void> {
    await client.threads.delete(threadId);
    console.log(`Deleted thread: ${threadId}`);
  }

  /**
   * Clean up the agent (call when shutting down)
   */
  async cleanup(): Promise<void> {
    if (this.agentId) {
      await client.deleteAgent(this.agentId);
      console.log(`Deleted agent: ${this.agentId}`);
      this.agentId = null;
    }
  }
}

// Export singleton instance for simple use cases
export const agentService = new AgentService();
