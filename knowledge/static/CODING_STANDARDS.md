# Coding Standards

> **This file is human-maintained.** Defines how we write code in this project.

## Language

**TypeScript is required** for all backend and frontend code. Use strict mode.

```json
// tsconfig.json essentials
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `ChatInterface.tsx` |
| Hooks | camelCase, use prefix | `useAgent.ts` |
| Utilities | camelCase | `agentUtils.ts` |
| Types/Interfaces | PascalCase | `types.ts` containing `AgentConfig` |
| API routes | camelCase | `agents.ts` |
| Services | camelCase + Service | `agentService.ts` |
| Config files | camelCase | `azureConfig.ts` |

## Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── config/          # Azure and app configuration
│   │   ├── services/        # Azure AI Agents SDK wrappers
│   │   ├── routes/          # Express route handlers
│   │   ├── middleware/      # Auth, error handling, tracing
│   │   ├── types/           # TypeScript interfaces
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API client
│   │   ├── types/           # TypeScript interfaces
│   │   ├── auth/            # MSAL configuration
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
└── PROJECT_PLAN.md
```

## Azure AI Agents SDK Patterns

### Client Initialization
```typescript
import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new AgentsClient(
  process.env.AZURE_FOUNDRY_PROJECT_ENDPOINT!,
  new DefaultAzureCredential()
);
```

### Agent Creation
```typescript
const agent = await client.createAgent(modelDeploymentName, {
  name: "agent-name",
  instructions: "You are a helpful assistant...",
  tools: [{ type: "code_interpreter" }]  // optional
});
```

### Thread and Message Pattern
```typescript
// Create thread for conversation
const thread = await client.threads.create();

// Add user message
await client.messages.create(thread.id, "user", userInput);

// Run agent and wait for completion
const run = await client.runs.createAndPoll(thread.id, agent.id);

// Get response
const messages = client.messages.list(thread.id);
```

### Always Clean Up
```typescript
// Delete thread when conversation ends
await client.threads.delete(thread.id);

// Delete agent when no longer needed (if dynamically created)
await client.deleteAgent(agent.id);
```

## Error Handling

### Backend API Errors
```typescript
import { RestError } from "@azure/core-rest-pipeline";

try {
  const result = await client.messages.create(...);
  return result;
} catch (error) {
  if (error instanceof RestError) {
    console.error(`Azure API error: ${error.code} - ${error.message}`);
    throw new ApiError(error.statusCode || 500, error.message);
  }
  throw error;
}
```

### Express Error Middleware
```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err instanceof ApiError ? err.statusCode : 500).json({
    error: err.message || "Internal server error"
  });
});
```

## API Endpoints

### Naming Convention
- Use REST conventions: `/api/agents`, `/api/threads`, `/api/messages`
- Use plural nouns: `/api/agents` not `/api/agent`
- Use path params for IDs: `/api/threads/:threadId/messages`

### Standard Response Format
```typescript
// Success
res.json({ data: result });

// Error
res.status(400).json({ error: "Validation failed", details: errors });

// Paginated
res.json({ data: items, pagination: { total, page, limit } });
```

## Frontend Patterns

### MSAL Authentication
```typescript
import { useMsal } from "@azure/msal-react";

const { instance, accounts } = useMsal();

// Get token for API calls
const token = await instance.acquireTokenSilent({
  scopes: ["api://your-backend-app-id/.default"],
  account: accounts[0]
});
```

### API Calls with Auth
```typescript
const response = await fetch(`${API_URL}/api/agents`, {
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});
```

### React Component Structure
```typescript
// 1. Imports
import { useState, useEffect } from "react";

// 2. Types
interface Props { ... }

// 3. Component
export function ComponentName({ prop }: Props) {
  // 3a. State
  const [state, setState] = useState<Type>(initial);

  // 3b. Effects
  useEffect(() => { ... }, [deps]);

  // 3c. Handlers
  const handleAction = async () => { ... };

  // 3d. Render
  return ( ... );
}
```

## Comments

- Explain **WHY**, not **WHAT**
- Use JSDoc for public functions and complex types
- Bad: `// Create agent`
- Good: `// Create a persistent agent so we can reuse it across conversations`

## Testing

### Backend Tests
```typescript
describe("AgentService", () => {
  it("should create an agent with correct configuration", async () => {
    // Arrange
    const config = { name: "test", instructions: "..." };

    // Act
    const agent = await agentService.create(config);

    // Assert
    expect(agent.id).toBeDefined();
    expect(agent.name).toBe(config.name);
  });
});
```

### Frontend Tests
```typescript
import { render, screen } from "@testing-library/react";

test("renders chat input", () => {
  render(<ChatInterface />);
  expect(screen.getByPlaceholderText("Type a message...")).toBeInTheDocument();
});
```

---

*Last updated: [DATE]*
