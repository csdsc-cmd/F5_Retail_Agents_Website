import Anthropic from "@anthropic-ai/sdk";

export async function testingAgent(codeToTest, testFramework = "jest") {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2000,
    system: `You are a testing specialist. Generate comprehensive tests:
- Unit tests for individual functions
- Integration tests for workflows
- Edge cases and error scenarios
- Mock external dependencies
- Use ${testFramework} framework`,
    messages: [
      { role: "user", content: `Generate tests for:\n\n${codeToTest}` }
    ]
  });

  return response.content[0].text;
}
