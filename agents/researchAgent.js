import Anthropic from "@anthropic-ai/sdk";

export async function researchAgent(question) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 900,
    system: "You are a research sub-agent. Provide concise, structured analysis.",
    messages: [
      { role: "user", content: question }
    ]
  });

  return response.content[0].text;
}
