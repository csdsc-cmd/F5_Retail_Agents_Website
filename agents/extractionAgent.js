import Anthropic from "@anthropic-ai/sdk";

export async function extractionAgent(text) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 900,
    system: "You extract key facts, entities, numbers, and insights. Return JSON only.",
    messages: [
      { role: "user", content: text }
    ]
  });

  return response.content[0].text;
}
