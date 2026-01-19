# Tech Stack

> **This file is human-maintained.** Agents must follow these choices exactly.

## Approved Technologies

### Azure AI Foundry Agent Service (Required)
| Category | Choice | Notes |
|----------|--------|-------|
| Agent SDK | @azure/ai-agents | Azure AI Agents client (TESTED) |
| Identity | @azure/identity | DefaultAzureCredential for auth |
| Telemetry | @azure/monitor-opentelemetry | Application Insights integration |
| Resource | AIDevPlayground | Foundry resource in F5AI-asc-export |
| Models | gpt-4o-mini | Available through Foundry Agent Service |

### Azure OpenAI (Alternative - Direct API)
| Category | Choice | Notes |
|----------|--------|-------|
| OpenAI SDK | @azure/openai | For direct Azure OpenAI calls (not agents) |
| Identity | @azure/identity | For Managed Identity |
| Models | gpt-4o-mini | Deployment on F5devazureopenai |

### Backend
| Category | Choice | Notes |
|----------|--------|-------|
| Runtime | Node.js 20+ | LTS version |
| Language | TypeScript | Strict mode enabled |
| Framework | Express.js | Simple REST API |
| Validation | zod | Schema validation |
| Environment | dotenv | Local dev only, use Azure App Settings in prod |

### Frontend
| Category | Choice | Notes |
|----------|--------|-------|
| Framework | React 18 | Functional components only |
| Language | TypeScript | Strict mode enabled |
| Build Tool | Vite | Fast dev server |
| Auth | @azure/msal-react | Azure AD authentication |
| Styling | Plain CSS or CSS Modules | No heavy frameworks |
| HTTP Client | fetch | Native, no axios |

### Development
| Category | Choice | Notes |
|----------|--------|-------|
| Package Manager | npm | No yarn, no pnpm |
| Testing | Jest + @testing-library/react | Unit and integration |
| Linting | ESLint + Prettier | Consistent formatting |
| Git Hooks | husky + lint-staged | Pre-commit checks |

### Deployment
| Category | Choice | Notes |
|----------|--------|-------|
| Backend | Azure App Service | Or Azure Functions |
| Frontend | Azure Static Web Apps | With Azure AD integration |
| CI/CD | GitHub Actions | Azure deployment workflows |

## Required Environment Variables

### Backend (.env)
```bash
# Azure AI Foundry Agent Service (Primary)
# IMPORTANT: Use the FULL project endpoint, not just the base URL
AZURE_AI_FOUNDRY_ENDPOINT=https://AIDevPlayground-resource.services.ai.azure.com/api/projects/AIDevPlayground
# Uses DefaultAzureCredential - run `az login` for local dev

# Azure OpenAI (Alternative - Direct API)
AZURE_OPENAI_ENDPOINT=https://f5devazureopenai.cognitiveservices.azure.com/
AZURE_OPENAI_API_KEY=<get-from-azure-portal-or-use-managed-identity>
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini

# CORS
FRONTEND_URL=https://victorious-sand-021b65c10.4.azurestaticapps.net

# Server
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3001
VITE_AZURE_CLIENT_ID=da72658b-6d30-4e97-b1f6-19ba4d297f7b
VITE_AZURE_TENANT_ID=0e7fe07a-d721-4163-b144-7a802243cfb5
```

### Production URLs
```bash
# Backend: https://agent-api-dev.azurewebsites.net
# Frontend: https://victorious-sand-021b65c10.4.azurestaticapps.net
```

## Forbidden Dependencies

**Do NOT add these under any circumstances:**

### Backend
- `@anthropic-ai/sdk` — Use Azure AI Foundry, not direct Anthropic
- `mongoose` — No MongoDB, use Azure services
- `passport` — Use @azure/identity instead
- `socket.io` — Use polling or Azure SignalR if real-time needed
- `express-session` — Use Azure AD tokens, not sessions

### Frontend
- `axios` — Use native fetch
- `@mui/material` — Too heavy, use plain CSS
- `styled-components` — Use CSS Modules if needed
- `redux` — Use React Context or zustand if state management needed
- Any non-MSAL auth libraries

## Adding New Dependencies

Before adding ANY new dependency:
1. Check if it's forbidden above
2. Check if Azure SDK provides the functionality
3. Check if native/existing solution works
4. If truly needed, add to this file first with justification

---

*Last updated: 2025-01-19*
