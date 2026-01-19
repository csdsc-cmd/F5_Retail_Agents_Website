import { researchAgent } from "./agents/researchAgent.js";
import { extractionAgent } from "./agents/extractionAgent.js";
import { summaryAgent } from "./agents/summaryAgent.js";
import dotenv from "dotenv";
dotenv.config();

async function orchestrate(question) {
  console.log("Running Research Agent...");
  const research = await researchAgent(question);

  console.log("\nRunning Extraction Agent...");
  const extracted = await extractionAgent(research);

  console.log("\nRunning Summary Agent...");
  const summary = await summaryAgent(extracted);

  return {
    question,
    research,
    extracted,
    summary
  };
}

// Example run:
orchestrate("Explain dynamic job scheduling for pest control crews.").then(result => {
  console.log("\n=== FINAL OUTPUT ===\n");
  console.log(result.summary);
});
