import fs from "fs/promises";

// === ROBUST JSON PARSING ===
export async function parseJSON(text, retryFn = null, maxRetries = 1) {
  const cleaners = [
    (t) => t,
    (t) => t.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim(),
    (t) => t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1),
    (t) => t.slice(t.indexOf("["), t.lastIndexOf("]") + 1),
  ];

  for (const clean of cleaners) {
    try {
      const cleaned = clean(text);
      if (cleaned) {
        return JSON.parse(cleaned);
      }
    } catch {}
  }

  // If we have a retry function and retries left, try again
  if (retryFn && maxRetries > 0) {
    console.log("   ⚠️  JSON parse failed, retrying agent...");
    const newResult = await retryFn();
    return parseJSON(newResult, null, 0);
  }

  console.error("❌ JSON parse failed after all attempts");
  return { error: true, raw: text.slice(0, 200) };
}

// === TIMEOUT PROTECTION ===
export async function withTimeout(promise, ms = 120000, label = "API call") {
  const timeout = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error(`${label} timed out after ${ms / 1000}s`)),
      ms
    )
  );
  return Promise.race([promise, timeout]);
}

// === FILE CACHE ===
const fileCache = new Map();

export async function readFileCached(filePath) {
  if (fileCache.has(filePath)) {
    return fileCache.get(filePath);
  }
  try {
    const content = await fs.readFile(filePath, "utf-8");
    fileCache.set(filePath, content);
    return content;
  } catch {
    return "";
  }
}

export function clearFileCache() {
  fileCache.clear();
}

// === CODE DIFF DISPLAY ===
export function showCodeDiff(original, improved) {
  const origLines = original.split("\n");
  const newLines = improved.split("\n");

  const added = newLines.length - origLines.length;
  const changed = newLines.filter((line, i) => origLines[i] !== line).length;

  console.log(
    `   📊 Diff: ${added >= 0 ? "+" : ""}${added} lines, ~${changed} lines changed`
  );

  // Show first significant change
  for (let i = 0; i < Math.min(origLines.length, newLines.length); i++) {
    if (origLines[i] !== newLines[i]) {
      console.log(`   📍 First change at line ${i + 1}:`);
      console.log(`      - ${origLines[i]?.slice(0, 60) || "(empty)"}...`);
      console.log(`      + ${newLines[i]?.slice(0, 60) || "(empty)"}...`);
      break;
    }
  }
}

// === PRE-FLIGHT CHECKS ===
export async function preflight(config) {
  const checks = [];

  // API key
  if (!process.env.ANTHROPIC_API_KEY) {
    checks.push("❌ ANTHROPIC_API_KEY not set in .env");
  }

  // Plan file
  if (config.planPath) {
    try {
      await fs.access(config.planPath);
    } catch {
      checks.push(`❌ PROJECT_PLAN.md not found at ${config.planPath}`);
    }
  }

  // Project directory
  if (config.projectPath) {
    try {
      await fs.access(config.projectPath);
    } catch {
      checks.push(`❌ Project directory not found: ${config.projectPath}`);
    }
  }

  if (checks.length > 0) {
    console.log("\n🚨 Pre-flight checks failed:\n");
    checks.forEach((c) => console.log(`   ${c}`));
    console.log("\n");
    return false;
  }

  console.log("✅ Pre-flight checks passed\n");
  return true;
}

// === CONFIG LOADER ===
export function loadConfig() {
  return {
    projectPath:
      process.env.PROJECT_PATH ||
      "/Users/drewalexander/Desktop/pest-control-scheduler",
    maxIterations: parseInt(process.env.MAX_ITERATIONS) || 3,
    minPassScore: parseInt(process.env.MIN_PASS_SCORE) || 70,
    apiTimeout: parseInt(process.env.API_TIMEOUT) || 120000,
  };
}
