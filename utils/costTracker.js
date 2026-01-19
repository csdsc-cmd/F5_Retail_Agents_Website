// Pricing per 1M tokens (as of Jan 2025)
const PRICING = {
  "claude-opus-4-20250514": { input: 15, output: 75 },
  "claude-sonnet-4-5-20250929": { input: 3, output: 15 },
  "claude-haiku-4-5-20251001": { input: 0.8, output: 4 },
};

class CostTracker {
  constructor() {
    this.calls = [];
    this.sessionStart = new Date();
  }

  track(model, inputTokens, outputTokens, agentName = "unknown") {
    const prices = PRICING[model] || { input: 3, output: 15 };
    const cost = (inputTokens * prices.input + outputTokens * prices.output) / 1_000_000;
    this.calls.push({
      model,
      inputTokens,
      outputTokens,
      cost,
      agentName,
      timestamp: new Date(),
    });
    return cost;
  }

  summary() {
    const total = this.calls.reduce((sum, c) => sum + c.cost, 0);
    const totalInput = this.calls.reduce((sum, c) => sum + c.inputTokens, 0);
    const totalOutput = this.calls.reduce((sum, c) => sum + c.outputTokens, 0);

    const byModel = {};
    const byAgent = {};

    this.calls.forEach((c) => {
      byModel[c.model] = (byModel[c.model] || 0) + c.cost;
      byAgent[c.agentName] = (byAgent[c.agentName] || 0) + c.cost;
    });

    return {
      totalCost: `$${total.toFixed(4)}`,
      totalTokens: { input: totalInput, output: totalOutput },
      byModel: Object.fromEntries(
        Object.entries(byModel).map(([k, v]) => [k, `$${v.toFixed(4)}`])
      ),
      byAgent: Object.fromEntries(
        Object.entries(byAgent).map(([k, v]) => [k, `$${v.toFixed(4)}`])
      ),
      callCount: this.calls.length,
      duration: `${((new Date() - this.sessionStart) / 1000).toFixed(1)}s`,
    };
  }

  printSummary() {
    const s = this.summary();
    console.log("\n💰 COST SUMMARY");
    console.log("═".repeat(40));
    console.log(`   Total Cost: ${s.totalCost}`);
    console.log(`   API Calls: ${s.callCount}`);
    console.log(`   Duration: ${s.duration}`);
    console.log(`   Tokens: ${s.totalTokens.input.toLocaleString()} in / ${s.totalTokens.output.toLocaleString()} out`);
    console.log("\n   By Model:");
    Object.entries(s.byModel).forEach(([model, cost]) => {
      const shortName = model.includes("opus") ? "Opus 4" : model.includes("sonnet") ? "Sonnet 4.5" : model;
      console.log(`      ${shortName}: ${cost}`);
    });
    console.log("\n   By Agent:");
    Object.entries(s.byAgent).forEach(([agent, cost]) => {
      console.log(`      ${agent}: ${cost}`);
    });
    console.log("");
  }

  reset() {
    this.calls = [];
    this.sessionStart = new Date();
  }
}

export const costTracker = new CostTracker();
