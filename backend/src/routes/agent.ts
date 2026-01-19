import { Router, Request, Response } from "express";
import { z } from "zod";
import * as agent from "../services/foundryAgent.js";

export const agentRoutes = Router();

// Request schemas
const StartConversationSchema = z.object({
  name: z.string().optional().default("Assistant"),
  instructions: z.string().optional().default("You are a helpful AI assistant."),
});

const ChatSchema = z.object({
  message: z.string().min(1),
});

/**
 * POST /api/agent/start
 * Start a new conversation with an agent
 */
agentRoutes.post("/start", async (req: Request, res: Response) => {
  try {
    const body = StartConversationSchema.parse(req.body);

    const conversationId = await agent.startConversation({
      name: body.name,
      instructions: body.instructions,
    });

    res.json({ conversationId });
  } catch (error) {
    console.error("Error starting conversation:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to start conversation",
    });
  }
});

/**
 * POST /api/agent/:conversationId/chat
 * Send a message and get a response
 */
agentRoutes.post("/:conversationId/chat", async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const body = ChatSchema.parse(req.body);

    const response = await agent.chat(conversationId, body.message);

    res.json({ response });
  } catch (error) {
    console.error("Error in chat:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Chat failed",
    });
  }
});

/**
 * GET /api/agent/:conversationId/history
 * Get conversation history
 */
agentRoutes.get("/:conversationId/history", async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const history = await agent.getHistory(conversationId);

    res.json({ history });
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to get history",
    });
  }
});

/**
 * DELETE /api/agent/:conversationId
 * End a conversation
 */
agentRoutes.delete("/:conversationId", async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    await agent.endConversation(conversationId);

    res.json({ success: true });
  } catch (error) {
    console.error("Error ending conversation:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to end conversation",
    });
  }
});

/**
 * GET /api/agent/conversations
 * List all active conversations
 */
agentRoutes.get("/conversations", (_req: Request, res: Response) => {
  const conversations = agent.listConversations();
  res.json({ conversations });
});
