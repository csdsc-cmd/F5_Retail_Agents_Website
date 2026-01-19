import Anthropic from "@anthropic-ai/sdk";
import { knowledgeLoader } from "../utils/knowledgeLoader.js";

export async function codeGeneratorAgent(task, context, fileType = "javascript", filePath = "") {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  // Load relevant knowledge for this task
  let projectKnowledge = "";
  try {
    projectKnowledge = await knowledgeLoader.loadForTask(filePath, task);
  } catch (error) {
    console.warn("   ⚠️  Could not load project knowledge:", error.message);
  }
  
  const systemPrompt = `You are an expert code generator. Generate clean, production-ready code based on the task description.

${projectKnowledge}

---

File Type: ${fileType}
File Path: ${filePath}
Context: ${context}

CRITICAL REQUIREMENTS:
- Return ONLY the code, no explanations or markdown fences
- Include necessary imports
- Follow the TECH STACK and CODING STANDARDS from the knowledge base above
- Learn from any LESSONS LEARNED shown above - do NOT repeat past mistakes
- Use APPROVED PATTERNS as templates when applicable
- Add helpful comments
- Ensure code is complete and ready to use
- For React components, use functional components with hooks
- For backend code, include proper error handling
- Use modern JavaScript/ES6+ syntax

FORMATTING:
- DO NOT wrap code in \`\`\`javascript or \`\`\` blocks
- DO NOT add any preamble or explanation
- Start directly with the code
- Return raw code only`;

  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 8000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Generate code for this task:\n\n${task}`
      }
    ]
  });

  let code = response.content[0].text.trim();
  
  // Remove markdown code fences if present
  code = code.replace(/^```[\w]*\n/gm, '');
  code = code.replace(/\n```$/gm, '');
  code = code.trim();
  
  return code;
}

export async function planParserAgent(planContent) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  // Load minimal knowledge for context
  let projectKnowledge = "";
  try {
    projectKnowledge = await knowledgeLoader.loadMinimal();
  } catch (error) {
    // Silent fail - plan parsing doesn't strictly need knowledge
  }
  
  const systemPrompt = `You are a project plan parser. Extract tasks from a project plan document and return them as a JSON array.

${projectKnowledge}

CRITICAL REQUIREMENTS:
- Return ONLY valid JSON, no explanations
- NO markdown fences (no \`\`\`json)
- NO preamble or postamble
- Start with [ and end with ]
- Each task must have: phase, title, description, filePath, fileType, action

Example format:
[
  {
    "phase": "Phase 1: Fix App.js",
    "title": "Restore simple App.js structure",
    "description": "Replace complex App.js with simple version that just renders PestControlScheduler component",
    "filePath": "frontend/src/App.js",
    "fileType": "react",
    "action": "modify"
  }
]

File types: react, javascript, css, model, route, controller
Actions: create, modify`;

  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 8000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Parse this project plan and extract all implementation tasks as JSON:\n\n${planContent}`
      }
    ]
  });

  let jsonText = response.content[0].text.trim();
  
  // Remove markdown fences if present
  jsonText = jsonText.replace(/^```json\s*/i, '');
  jsonText = jsonText.replace(/^```\s*/i, '');
  jsonText = jsonText.replace(/\s*```$/i, '');
  jsonText = jsonText.trim();
  
  return jsonText;
}
