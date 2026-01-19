/**
 * Azure AI Foundry Express Routes Pattern
 *
 * This is the approved pattern for creating Express API endpoints
 * that interact with Azure AI Agents.
 */

import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { agentService } from "../services/agentService";

const router = Router();

// Request validation schemas
const CreateThreadSchema = z.object({
  agentName: z.string().optional()
});

const SendMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty")
});

// Custom error class for API errors
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Validation middleware factory
function validate<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.errors
      });
    }
    req.body = result.data;
    next();
  };
}

/**
 * POST /api/threads
 * Create a new conversation thread
 */
router.post(
  "/threads",
  validate(CreateThreadSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const threadId = await agentService.createThread();
      res.status(201).json({
        data: { threadId }
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/threads/:threadId/messages
 * Send a message and get agent response
 */
router.post(
  "/threads/:threadId/messages",
  validate(SendMessageSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { threadId } = req.params;
      const { message } = req.body;

      const response = await agentService.chat(threadId, message);

      res.json({
        data: {
          userMessage: message,
          assistantMessage: response
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/threads/:threadId/messages
 * Get conversation history
 */
router.get(
  "/threads/:threadId/messages",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { threadId } = req.params;
      const messages = await agentService.getConversationHistory(threadId);

      res.json({
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/threads/:threadId
 * End a conversation and clean up
 */
router.delete(
  "/threads/:threadId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { threadId } = req.params;
      await agentService.endConversation(threadId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/health
 * Health check endpoint
 */
router.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

export default router;
