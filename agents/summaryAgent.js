import Anthropic from "@anthropic-ai/sdk";

export async function summaryAgent(jsonInput) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 600,
    system: "You summarise extracted information for an executive audience. Respond in bullet points.",
    messages: [
      { role: "user", content: jsonInput }
    ]
  });

  return response.content[0].text;
}
