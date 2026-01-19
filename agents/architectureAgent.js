import Anthropic from "@anthropic-ai/sdk";

export async function architectureAgent(projectStructure, analysisGoal) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2500,
    system: `You are a software architect. Analyze codebases and provide architectural insights:
- Identify design patterns
- Suggest improvements to structure
- Evaluate scalability concerns
- Recommend refactoring opportunities
- Assess technical debt`,
    messages: [
      { role: "user", content: `Project Structure:\n${projectStructure}\n\nAnalysis Goal: ${analysisGoal}` }
    ]
  });

  return response.content[0].text;
}
