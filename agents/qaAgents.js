import Anthropic from "@anthropic-ai/sdk";
import { knowledgeLoader } from "../utils/knowledgeLoader.js";

// === QUALITY GATE AGENT ===
export async function qualityGateAgent(code, fileName, context) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  // Load relevant knowledge
  let projectKnowledge = "";
  try {
    projectKnowledge = await knowledgeLoader.loadMinimal();
  } catch (error) {}
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 2000,
    system: `You are a strict quality gate reviewer. Evaluate code against PRODUCTION STANDARDS.

${projectKnowledge}

CRITICAL CHECKS:
1. ✅ No syntax errors
2. ✅ Follows project conventions from CODING STANDARDS above
3. ✅ Proper error handling
4. ✅ No security vulnerabilities
5. ✅ Includes necessary imports
6. ✅ Follows DRY principles
7. ✅ Has clear comments
8. ✅ Consistent naming conventions
9. ✅ No hardcoded values (use env vars)
10. ✅ Proper validation
11. ✅ Uses ONLY approved technologies from TECH STACK above

OUTPUT FORMAT (JSON only):
{
  "approved": true/false,
  "score": 0-100,
  "issues": [
    {"severity": "critical|high|medium|low", "issue": "description", "line": number, "fix": "suggestion"}
  ],
  "strengths": ["what's good"],
  "recommendations": ["improvements"]
}

Return ONLY valid JSON, no other text.`,
    messages: [
      { role: "user", content: `File: ${fileName}\n\nCode:\n${code}\n\nContext:\n${context}` }
    ]
  });

  return response.content[0].text.trim();
}

// === ARCHITECTURE CONSISTENCY AGENT ===
export async function architectureConsistencyAgent(code, fileName, projectPlan) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  // Load relevant knowledge
  let projectKnowledge = "";
  try {
    projectKnowledge = await knowledgeLoader.loadMinimal();
  } catch (error) {}
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 2000,
    system: `You are an architecture consistency checker. Verify code follows the PROJECT PLAN and TECH STACK.

${projectKnowledge}

CHECK:
1. Matches architecture recommendations
2. Uses ONLY technologies from TECH STACK above
3. Does NOT use any FORBIDDEN dependencies
4. Follows established patterns
5. Uses correct database (check TECH STACK)
6. Uses correct API structure
7. Consistent with existing codebase
8. Implements all required features
9. No deviation from plan without reason

OUTPUT FORMAT (JSON only):
{
  "consistent": true/false,
  "deviations": [
    {"type": "database|api|pattern|feature|tech_stack", "description": "what's wrong", "severity": "critical|high|medium|low"}
  ],
  "alignment": "How well it matches the plan (0-100)",
  "suggestions": ["how to improve alignment"]
}

Return ONLY valid JSON.`,
    messages: [
      { role: "user", content: `File: ${fileName}\n\nCode:\n${code}\n\nProject Plan:\n${projectPlan}` }
    ]
  });

  return response.content[0].text.trim();
}

// === INTEGRATION VALIDATION AGENT ===
export async function integrationValidationAgent(code, fileName, relatedFiles) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 2000,
    system: `You are an integration validator. Check if code INTEGRATES PROPERLY with related files.

VALIDATE:
1. Imports are correct and available
2. Function signatures match usage
3. Data structures are compatible
4. API contracts are maintained
5. Database schemas match
6. No circular dependencies
7. Proper error propagation

OUTPUT FORMAT (JSON only):
{
  "integrated": true/false,
  "issues": [
    {"type": "import|signature|data|api|schema", "description": "problem", "impact": "critical|high|medium|low"}
  ],
  "dependencies": ["files this depends on"],
  "compatibilityScore": 0-100
}

Return ONLY valid JSON.`,
    messages: [
      { role: "user", content: `File: ${fileName}\n\nCode:\n${code}\n\nRelated Files:\n${relatedFiles}` }
    ]
  });

  return response.content[0].text.trim();
}

// === SECURITY AUDIT AGENT ===
export async function securityAuditAgent(code, fileName) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  // Load security lessons
  let securityLessons = "";
  try {
    securityLessons = await knowledgeLoader.loadRelevantLessons('api');
  } catch (error) {}
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 1500,
    system: `You are a security auditor. Find SECURITY VULNERABILITIES.

${securityLessons ? `## KNOWN SECURITY LESSONS (from past audits)\n${securityLessons}\n\n` : ''}

CHECK FOR:
1. SQL injection vulnerabilities - USE PARAMETERIZED QUERIES ONLY
2. XSS vulnerabilities
3. Authentication/authorization issues
4. Exposed sensitive data
5. Insecure dependencies
6. Hardcoded secrets
7. CORS misconfigurations
8. Input validation gaps
9. Rate limiting needs
10. Logging sensitive data

OUTPUT FORMAT (JSON only):
{
  "secure": true/false,
  "vulnerabilities": [
    {"type": "sql|xss|auth|data|config", "severity": "critical|high|medium|low", "description": "issue", "fix": "solution"}
  ],
  "securityScore": 0-100
}

Return ONLY valid JSON.`,
    messages: [
      { role: "user", content: `File: ${fileName}\n\nCode:\n${code}` }
    ]
  });

  return response.content[0].text.trim();
}

// === BEST PRACTICES AGENT ===
export async function bestPracticesAgent(code, fileName, fileType) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  // Load relevant lessons for this file type
  let relevantLessons = "";
  try {
    const taskType = fileType.includes('react') ? 'frontend' : 'backend';
    relevantLessons = await knowledgeLoader.loadRelevantLessons(taskType);
  } catch (error) {}
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 1500,
    system: `You are a best practices enforcer for ${fileType}.

${relevantLessons ? `## LESSONS LEARNED (from past reviews)\n${relevantLessons}\n\n` : ''}

EVALUATE:
1. Code organization and structure
2. Naming conventions
3. Documentation quality
4. Error handling patterns
5. Performance considerations
6. Maintainability
7. Testability
8. Code reusability
9. SOLID principles
10. Framework-specific best practices

OUTPUT FORMAT (JSON only):
{
  "followsBestPractices": true/false,
  "violations": [
    {"category": "naming|structure|docs|error|perf", "issue": "description", "severity": "high|medium|low", "fix": "suggestion"}
  ],
  "practiceScore": 0-100,
  "highlights": ["what's done well"]
}

Return ONLY valid JSON.`,
    messages: [
      { role: "user", content: `File: ${fileName}\n\nType: ${fileType}\n\nCode:\n${code}` }
    ]
  });

  return response.content[0].text.trim();
}

// === CODE IMPROVEMENT AGENT ===
// 🚀 UPGRADED TO OPUS 4 - This is the agent that fixes code when QA fails
export async function codeImprovementAgent(code, fileName, allFeedback) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  // Load full knowledge for the fixer - it needs everything
  let projectKnowledge = "";
  try {
    projectKnowledge = await knowledgeLoader.loadForTask(fileName, "fix code");
  } catch (error) {}
  
  const response = await client.messages.create({
    model: "claude-opus-4-5-20251101",  // 🚀 OPUS 4 - Most powerful for fixing complex issues
    max_tokens: 8000,  // 🔥 DOUBLED for comprehensive rewrites
    system: `You are an EXPERT code improvement specialist with DEEP expertise in production systems. 

${projectKnowledge}

---

Your mission: REWRITE this code to fix EVERY SINGLE issue mentioned in the feedback while making it EXCEPTIONAL.

MANDATORY REQUIREMENTS:
- Use ONLY technologies from the TECH STACK above
- Follow ALL coding standards from the CODING STANDARDS above
- Learn from ALL lessons learned above - do NOT repeat past mistakes
- Use APPROVED PATTERNS as templates where applicable

MANDATORY FIXES:
- Address EVERY issue from feedback (critical, high, medium, and low priority)
- Fix ALL security vulnerabilities immediately
- Add comprehensive error handling with specific error messages
- Implement ALL missing validations
- Add detailed comments explaining complex logic
- Follow ALL best practices for the language/framework
- Ensure code is production-ready and maintainable

QUALITY STANDARDS:
- Code must be syntactically perfect
- All imports must be correct and complete
- Variable names must be descriptive and follow conventions
- Error messages must be user-friendly and actionable
- Edge cases must be handled explicitly
- Performance must be optimized
- Security must be paramount

CRITICAL INSTRUCTIONS:
- Maintain ALL original functionality while improving
- Do NOT skip any feedback item - address them ALL
- Do NOT take shortcuts - implement comprehensive solutions
- Do NOT leave TODOs or placeholders
- Add extensive inline documentation
- Use modern, idiomatic code patterns
- Optimize for both readability and performance

OUTPUT REQUIREMENTS:
Return ONLY the complete, improved code with NO explanations, NO markdown fences, NO preamble.
The code must be ready to save and run immediately.
Every line must serve a purpose.
Every issue from feedback must be resolved.`,
    messages: [
      { 
        role: "user", 
        content: `File: ${fileName}\n\n=== ORIGINAL CODE ===\n${code}\n\n=== FEEDBACK FROM 5 QA AGENTS ===\n${allFeedback}\n\n=== YOUR TASK ===\nRewrite the code above, fixing EVERY issue mentioned in the feedback. Make it production-ready and exceptional.` 
      }
    ]
  });

  return response.content[0].text.trim();
}
