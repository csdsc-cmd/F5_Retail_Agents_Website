import Anthropic from "@anthropic-ai/sdk";

export async function summaryAgent(jsonInput) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 600,
    system: "You summarise extracted information for an executive audience. Respond in bullet points.",
    messages: [
      { role: "user", content: jsonInput }
    ]
  });

  return response.content[0].text;
}
