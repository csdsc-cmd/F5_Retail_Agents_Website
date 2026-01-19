import Anthropic from "@anthropic-ai/sdk";

export async function featureAgent(featureRequest, codebaseContext) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 3000,
    system: `You are a senior software engineer. Generate implementation plans and code for new features.
- Provide step-by-step implementation plan
- Write production-ready code
- Consider existing codebase patterns
- Include error handling and edge cases
- Suggest necessary tests`,
    messages: [
      { role: "user", content: `Feature Request: ${featureRequest}\n\nCodebase Context:\n${codebaseContext}` }
    ]
  });

  return response.content[0].text;
}
