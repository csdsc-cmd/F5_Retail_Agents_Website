/**
 * Design Director Agent
 *
 * A senior design director persona that reviews UI/UX implementations
 * against modern design principles and brand guidelines.
 *
 * Reviews: Visual hierarchy, spacing, typography, color usage,
 * accessibility, responsiveness, micro-interactions, and overall UX.
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Design Director persona
const DESIGN_DIRECTOR_SYSTEM = `You are a Senior Design Director with 20 years of experience in digital product design.
You have worked at top agencies and in-house at companies like Apple, Airbnb, and Stripe.

Your design philosophy:
- Clean, modern aesthetics with purposeful whitespace
- Strong visual hierarchy that guides the user's eye
- Consistent spacing and alignment systems
- Typography that is both beautiful and highly readable
- Colors that evoke emotion and reinforce brand identity
- Micro-interactions that delight without distracting
- Accessibility as a core principle, not an afterthought
- Mobile-first responsive design

When reviewing designs, you are:
- Direct and honest - you don't sugarcoat issues
- Specific with feedback - you give exact recommendations
- Prioritized - you focus on what matters most for impact
- Actionable - every critique comes with a solution

You evaluate against these criteria:
1. VISUAL HIERARCHY: Is it clear what's most important?
2. SPACING: Is whitespace used effectively? Is rhythm consistent?
3. TYPOGRAPHY: Is text readable, sized appropriately, with good contrast?
4. COLOR: Does it follow the brand? Are CTAs prominent?
5. CONSISTENCY: Are patterns repeated correctly across components?
6. RESPONSIVENESS: Will it work on all screen sizes?
7. ACCESSIBILITY: Can everyone use this? Contrast, focus states, etc.
8. MICRO-INTERACTIONS: Are hover/focus states engaging but not distracting?
9. USER FLOW: Is the experience intuitive?
10. BRAND ALIGNMENT: Does it feel like Fusion5?

Output your review as JSON with this structure:
{
  "overallScore": 1-10,
  "approved": boolean,
  "summary": "one sentence overall assessment",
  "criticalIssues": [
    {
      "component": "file or component name",
      "issue": "specific problem description",
      "fix": "exact code change or design direction to fix",
      "priority": "critical|high|medium|low"
    }
  ],
  "improvements": [
    {
      "component": "file or component name",
      "current": "what it does now",
      "suggested": "what it should do instead",
      "impact": "why this matters"
    }
  ],
  "positives": ["things that are working well"],
  "focusAreas": ["top 3 areas to address in next iteration"]
}

Be approved (approved: true) only when overallScore >= 8 and there are no critical issues.`;

/**
 * Load all frontend source files for review
 */
async function loadFrontendCode(projectRoot) {
  const frontendPath = path.join(projectRoot, "frontend", "src");
  const files = {};

  async function readDir(dir, prefix = "") {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.join(prefix, entry.name);

        if (entry.isDirectory()) {
          // Skip node_modules and dist
          if (!["node_modules", "dist", ".vite"].includes(entry.name)) {
            await readDir(fullPath, relativePath);
          }
        } else if (entry.isFile() && /\.(tsx?|css|html)$/.test(entry.name)) {
          try {
            const content = await fs.readFile(fullPath, "utf-8");
            files[relativePath] = content;
          } catch (e) {
            // Skip unreadable files
          }
        }
      }
    } catch (e) {
      // Directory doesn't exist
    }
  }

  await readDir(frontendPath);
  return files;
}

/**
 * Load design system files
 */
async function loadDesignSystem(projectRoot) {
  const designPath = path.join(projectRoot, "frontend", "src", "design");
  const files = {};

  try {
    const entries = await fs.readdir(designPath);
    for (const entry of entries) {
      if (entry.endsWith(".ts")) {
        const content = await fs.readFile(path.join(designPath, entry), "utf-8");
        files[entry] = content;
      }
    }
  } catch (e) {
    // Design directory doesn't exist
  }

  return files;
}

/**
 * Run design review
 */
export async function designDirectorReview(projectRoot, options = {}) {
  const { previousFeedback = null, iteration = 1 } = options;

  console.log("🎨 Design Director reviewing frontend...");

  // Load all frontend code
  const frontendFiles = await loadFrontendCode(projectRoot);
  const designSystem = await loadDesignSystem(projectRoot);

  if (Object.keys(frontendFiles).length === 0) {
    return {
      overallScore: 0,
      approved: false,
      summary: "No frontend code found to review",
      criticalIssues: [{
        component: "frontend",
        issue: "No frontend code exists",
        fix: "Create the frontend components according to the project plan",
        priority: "critical"
      }],
      improvements: [],
      positives: [],
      focusAreas: ["Create basic frontend structure"]
    };
  }

  // Build the review prompt
  let prompt = `# Design Review - Iteration ${iteration}

## Design System
${Object.entries(designSystem).map(([name, content]) =>
  `### ${name}\n\`\`\`typescript\n${content}\n\`\`\``
).join("\n\n")}

## Frontend Code to Review
${Object.entries(frontendFiles).map(([name, content]) =>
  `### ${name}\n\`\`\`${name.endsWith('.css') ? 'css' : 'typescript'}\n${content}\n\`\`\``
).join("\n\n")}

`;

  if (previousFeedback) {
    prompt += `
## Previous Feedback (Iteration ${iteration - 1})
The following issues were identified in the last review. Check if they have been addressed:

${JSON.stringify(previousFeedback, null, 2)}

Focus especially on whether the critical issues and focus areas have been resolved.
`;
  }

  prompt += `
## Instructions
Review the frontend code from a design perspective. Evaluate:
1. Visual hierarchy and layout structure
2. Spacing consistency (padding, margins, gaps)
3. Typography choices and readability
4. Color usage and brand alignment with Fusion5 (orange to purple gradient theme)
5. Component consistency and reusability
6. Responsive design implementation
7. Accessibility (contrast, focus states, semantic HTML)
8. Micro-interactions and hover states
9. Overall user experience flow
10. Modern design patterns and best practices

Be specific about file names and exact code changes needed.
Focus on the most impactful improvements first.

Respond with JSON only, no additional text.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-5-20251101",
      max_tokens: 8192,
      system: DESIGN_DIRECTOR_SYSTEM,
      messages: [{ role: "user", content: prompt }]
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Parse JSON response
    let review;
    try {
      // Try direct parse
      review = JSON.parse(text);
    } catch (e) {
      // Try extracting JSON from markdown
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        review = JSON.parse(jsonMatch[1]);
      } else {
        // Try finding JSON object
        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");
        if (start !== -1 && end !== -1) {
          review = JSON.parse(text.slice(start, end + 1));
        } else {
          throw new Error("Could not parse design review response");
        }
      }
    }

    return review;

  } catch (error) {
    console.error("Design review error:", error.message);
    return {
      overallScore: 0,
      approved: false,
      summary: `Error during design review: ${error.message}`,
      criticalIssues: [],
      improvements: [],
      positives: [],
      focusAreas: ["Fix the error and retry"]
    };
  }
}

/**
 * Format review for console output
 */
export function formatDesignReview(review) {
  const lines = [];

  lines.push("\n╔══════════════════════════════════════════════════════════╗");
  lines.push("║              🎨 DESIGN DIRECTOR REVIEW                   ║");
  lines.push("╚══════════════════════════════════════════════════════════╝\n");

  const scoreEmoji = review.overallScore >= 8 ? "✅" : review.overallScore >= 5 ? "⚠️" : "❌";
  lines.push(`${scoreEmoji} Overall Score: ${review.overallScore}/10`);
  lines.push(`📝 ${review.summary}\n`);

  if (review.approved) {
    lines.push("🎉 APPROVED - Design meets quality standards!\n");
  } else {
    lines.push("🔄 NOT YET APPROVED - Improvements needed\n");
  }

  if (review.criticalIssues?.length > 0) {
    lines.push("🚨 CRITICAL ISSUES:");
    review.criticalIssues.forEach((issue, i) => {
      lines.push(`   ${i + 1}. [${issue.component}] ${issue.issue}`);
      lines.push(`      Fix: ${issue.fix}`);
    });
    lines.push("");
  }

  if (review.improvements?.length > 0) {
    lines.push("📋 IMPROVEMENTS:");
    review.improvements.slice(0, 5).forEach((imp, i) => {
      lines.push(`   ${i + 1}. [${imp.component}] ${imp.current}`);
      lines.push(`      → ${imp.suggested}`);
    });
    lines.push("");
  }

  if (review.positives?.length > 0) {
    lines.push("✨ POSITIVES:");
    review.positives.forEach(pos => {
      lines.push(`   • ${pos}`);
    });
    lines.push("");
  }

  if (review.focusAreas?.length > 0) {
    lines.push("🎯 FOCUS AREAS FOR NEXT ITERATION:");
    review.focusAreas.forEach((area, i) => {
      lines.push(`   ${i + 1}. ${area}`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Build design feedback prompt for code generation
 */
export function buildDesignFeedbackPrompt(review) {
  if (review.approved) {
    return "The Design Director has APPROVED the current design. No design changes needed.";
  }

  let prompt = `## 🎨 Design Director Feedback (Score: ${review.overallScore}/10)

${review.summary}

`;

  if (review.criticalIssues?.length > 0) {
    prompt += "### Critical Issues to Fix:\n";
    review.criticalIssues.forEach((issue, i) => {
      prompt += `${i + 1}. **${issue.component}**: ${issue.issue}\n`;
      prompt += `   - Fix: ${issue.fix}\n`;
    });
    prompt += "\n";
  }

  if (review.improvements?.length > 0) {
    prompt += "### Improvements to Make:\n";
    review.improvements.forEach((imp, i) => {
      prompt += `${i + 1}. **${imp.component}**: Change from "${imp.current}" to "${imp.suggested}"\n`;
      prompt += `   - Impact: ${imp.impact}\n`;
    });
    prompt += "\n";
  }

  if (review.focusAreas?.length > 0) {
    prompt += "### Priority Focus Areas:\n";
    review.focusAreas.forEach((area, i) => {
      prompt += `${i + 1}. ${area}\n`;
    });
  }

  return prompt;
}

export default { designDirectorReview, formatDesignReview, buildDesignFeedbackPrompt };
