import Anthropic from "@anthropic-ai/sdk";

export async function codeReviewAgent(codeContent, fileName) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2000,
    system: `You are an expert code reviewer. Analyze code for:
- Potential bugs and edge cases
- Performance improvements
- Security vulnerabilities
- Code quality and best practices
- Readability and maintainability
Provide specific, actionable feedback.`,
    messages: [
      { role: "user", content: `Review this ${fileName}:\n\n${codeContent}` }
    ]
  });

  return response.content[0].text;
}
