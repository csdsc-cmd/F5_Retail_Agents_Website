import fs from "fs/promises";
import path from "path";

const CHECKPOINT_DIR = path.join(process.cwd(), ".checkpoints");

export class CheckpointManager {
  constructor(pipelineName = "qa-pipeline") {
    this.pipelineName = pipelineName;
    this.checkpointPath = path.join(CHECKPOINT_DIR, `${pipelineName}.json`);
    this.state = null;
  }

  async init() {
    // Ensure checkpoint directory exists
    try {
      await fs.mkdir(CHECKPOINT_DIR, { recursive: true });
    } catch {}
    
    // Try to load existing checkpoint
    await this.load();
    return this;
  }

  async load() {
    try {
      const data = await fs.readFile(this.checkpointPath, "utf-8");
      this.state = JSON.parse(data);
      return this.state;
    } catch {
      this.state = null;
      return null;
    }
  }

  async save(state) {
    this.state = {
      ...state,
      updatedAt: new Date().toISOString(),
    };
    await fs.writeFile(this.checkpointPath, JSON.stringify(this.state, null, 2));
  }

  async clear() {
    try {
      await fs.unlink(this.checkpointPath);
      this.state = null;
      console.log("   🗑️  Checkpoint cleared");
    } catch {}
  }

  hasCheckpoint() {
    return this.state !== null;
  }

  // Get completed task indices
  getCompletedTasks() {
    return this.state?.completedTasks || [];
  }

  // Get results from completed tasks
  getResults() {
    return this.state?.results || [];
  }

  // Check if a specific task index is complete
  isTaskComplete(index) {
    return this.getCompletedTasks().includes(index);
  }

  // Get checkpoint summary for display
  getSummary() {
    if (!this.state) return null;
    
    const completed = this.getCompletedTasks().length;
    const total = this.state.totalTasks || "?";
    const lastTask = this.state.lastCompletedTask || "Unknown";
    const updatedAt = this.state.updatedAt 
      ? new Date(this.state.updatedAt).toLocaleString() 
      : "Unknown";
    
    return {
      completed,
      total,
      lastTask,
      updatedAt,
      mode: this.state.mode,
      phaseName: this.state.phaseName,
    };
  }

  // Create initial checkpoint state
  async start(config) {
    await this.save({
      mode: config.mode,
      phaseName: config.phaseName,
      totalTasks: config.totalTasks,
      taskList: config.taskList,
      completedTasks: [],
      results: [],
      startedAt: new Date().toISOString(),
    });
  }

  // Mark a task as complete and save result
  async completeTask(index, taskPath, result) {
    const completedTasks = [...this.getCompletedTasks(), index];
    const results = [...this.getResults(), { index, taskPath, ...result }];
    
    await this.save({
      ...this.state,
      completedTasks,
      results,
      lastCompletedTask: taskPath,
    });
  }

  // Mark pipeline as finished
  async finish() {
    await this.save({
      ...this.state,
      finished: true,
      finishedAt: new Date().toISOString(),
    });
  }
}

// Display resume prompt
export function displayResumePrompt(summary) {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║              📌 CHECKPOINT FOUND                         ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  console.log(`   Mode: ${summary.mode}${summary.phaseName ? ` (${summary.phaseName})` : ""}`);
  console.log(`   Progress: ${summary.completed}/${summary.total} tasks completed`);
  console.log(`   Last completed: ${summary.lastTask}`);
  console.log(`   Saved at: ${summary.updatedAt}`);
  console.log("\n   Options:");
  console.log("   • Run with --resume to continue from checkpoint");
  console.log("   • Run with --fresh to start over");
  console.log("");
}

export const checkpoint = new CheckpointManager();
