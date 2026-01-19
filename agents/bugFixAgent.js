import Anthropic from "@anthropic-ai/sdk";

export async function bugFixAgent(bugDescription, relevantCode) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2000,
    system: `You are a debugging expert. Analyze bugs and provide fixes:
- Identify root cause
- Explain why the bug occurs
- Provide corrected code
- Suggest prevention strategies
- Include test cases to prevent regression`,
    messages: [
      { role: "user", content: `Bug: ${bugDescription}\n\nRelevant Code:\n${relevantCode}` }
    ]
  });

  return response.content[0].text;
}
