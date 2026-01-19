# Project Implementation Plan Template

> **Instructions:** Duplicate this template and fill in the sections for your specific use case.
> The orchestration agents will use this plan to generate Azure AI Foundry code.

---

## Project Overview

### Project Name
[YOUR PROJECT NAME]

### Description
[2-3 sentences describing what this AI agent application does]

### Target Users
- Primary: [Who will use this application?]
- Secondary: [Other users?]

---

## Agent Configuration

### Agent Name
[Name of the AI agent, e.g., "Customer Support Agent", "Code Review Assistant"]

### Agent Instructions
```
[Detailed instructions for the agent's behavior and personality]

Example:
You are a helpful customer support agent for [Company Name]. You help users with:
- Product questions
- Order status inquiries
- Technical troubleshooting

Always be polite, concise, and helpful. If you don't know something, say so.
```

### Agent Tools (Optional)
- [ ] `code_interpreter` - Execute Python code
- [ ] `file_search` - Search through uploaded files
- [ ] Custom functions (define below)

### Custom Functions (if any)
```typescript
// Example custom function definition
{
  name: "lookup_order",
  description: "Look up order status by order ID",
  parameters: {
    type: "object",
    properties: {
      order_id: { type: "string", description: "The order ID to look up" }
    },
    required: ["order_id"]
  }
}
```

---

## Backend Requirements

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/threads | Create new conversation |
| POST | /api/threads/:id/messages | Send message, get response |
| GET | /api/threads/:id/messages | Get conversation history |
| DELETE | /api/threads/:id | End conversation |
| GET | /api/health | Health check |

### Additional Endpoints (Custom)
[List any project-specific endpoints needed]

### External Integrations (Optional)
- [ ] Database connection (specify: PostgreSQL, Cosmos DB, etc.)
- [ ] External APIs (list them)
- [ ] Azure services (Storage, Key Vault, etc.)

---

## Frontend Requirements

### Pages/Views

| Page | Route | Description |
|------|-------|-------------|
| Chat | / | Main chat interface |
| History | /history | Conversation history (optional) |
| Settings | /settings | User preferences (optional) |

### UI Components

1. **ChatInterface** (Required)
   - Message input
   - Message list (user + assistant)
   - Loading indicator
   - Error handling

2. **Additional Components** (Optional)
   [List any project-specific components]

### Styling Requirements
- [ ] Light/Dark mode
- [ ] Mobile responsive
- [ ] Brand colors: [specify if any]

---

## Authentication Requirements

### Azure AD Configuration
- [ ] Single tenant (internal app)
- [ ] Multi-tenant (external users)

### Permissions/Scopes
- `openid`
- `profile`
- `api://[backend-app-id]/.default`

---

## Deployment Configuration

### Azure Resources Required
- [ ] Azure AI Foundry project
- [ ] App Service (backend)
- [ ] Static Web App (frontend)
- [ ] Application Insights
- [ ] Key Vault (optional)

### Environment Variables

**Backend:**
```
AZURE_FOUNDRY_PROJECT_ENDPOINT=
MODEL_DEPLOYMENT_NAME=gpt-4o
APPLICATIONINSIGHTS_CONNECTION_STRING=
```

**Frontend:**
```
VITE_API_URL=
VITE_AZURE_CLIENT_ID=
VITE_AZURE_TENANT_ID=
```

---

## Implementation Phases

### Phase 1: Backend Foundation
- [ ] Set up Express.js with TypeScript
- [ ] Configure Azure Identity
- [ ] Create AgentService wrapper
- [ ] Implement core API endpoints
- [ ] Add error handling middleware
- [ ] Set up Application Insights tracing

### Phase 2: Agent Configuration
- [ ] Create agent with instructions
- [ ] Configure tools (if any)
- [ ] Test agent via API
- [ ] Implement custom functions (if any)

### Phase 3: Frontend Development
- [ ] Set up React + Vite + TypeScript
- [ ] Configure MSAL authentication
- [ ] Create ChatInterface component
- [ ] Connect to backend API
- [ ] Add loading/error states
- [ ] Style components

### Phase 4: Integration & Testing
- [ ] End-to-end testing
- [ ] Authentication flow testing
- [ ] Error scenario testing
- [ ] Performance testing

### Phase 5: Deployment
- [ ] Configure GitHub Actions
- [ ] Deploy backend to App Service
- [ ] Deploy frontend to Static Web App
- [ ] Verify Application Insights
- [ ] Test in production

---

## Success Criteria

- [ ] Agent responds correctly to user messages
- [ ] Conversations are tracked in Azure portal
- [ ] Authentication works for intended users
- [ ] Application Insights shows traces
- [ ] No console errors in production
- [ ] Response time < 5 seconds

---

## Notes for Orchestration Agents

- Follow patterns in `/knowledge/learned/patterns/`
- Use TypeScript strict mode
- Follow coding standards in `/knowledge/static/CODING_STANDARDS.md`
- Do NOT use forbidden dependencies (see TECH_STACK.md)
- All code must compile without errors
- Include proper error handling

---

*Template Version: 1.0*
*Last Updated: [DATE]*
