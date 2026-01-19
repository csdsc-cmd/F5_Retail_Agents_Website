# Glossary

> **This file is human-maintained.** Domain-specific terms for this project.

## Azure AI Foundry Terms

| Term | Definition |
|------|------------|
| **Agent** | An AI assistant created via the Azure AI Agents SDK with specific instructions and optional tools |
| **Thread** | A conversation session between a user and an agent; contains message history |
| **Run** | A single execution of an agent on a thread; processes messages and generates responses |
| **Message** | A single communication unit within a thread (user input or assistant response) |
| **Tool** | A capability attached to an agent (code_interpreter, file_search, or custom function) |
| **Project Endpoint** | The Azure URL for your Foundry project: `https://<resource>.services.ai.azure.com/api/projects/<project>` |
| **Model Deployment** | A deployed model instance (e.g., gpt-4o) that agents use for inference |

## Azure Identity Terms

| Term | Definition |
|------|------------|
| **Entra ID** | Microsoft's identity platform (formerly Azure Active Directory / Azure AD) |
| **DefaultAzureCredential** | SDK class that automatically tries multiple auth methods (managed identity, CLI, env vars) |
| **Service Principal** | An identity for automated processes/applications to authenticate with Azure |
| **Managed Identity** | Azure-managed identity for services; no credentials to manage |
| **MSAL** | Microsoft Authentication Library; used in frontend for user authentication |
| **Bearer Token** | JWT token included in API requests for authentication |

## Application Architecture Terms

| Term | Definition |
|------|------------|
| **AgentsClient** | The main SDK client for Azure AI Agents operations |
| **AgentService** | Our wrapper class that simplifies AgentsClient usage |
| **API Route** | Express endpoint that handles HTTP requests (e.g., `/api/threads`) |
| **Middleware** | Express function that processes requests before route handlers |

## Frontend Terms

| Term | Definition |
|------|------------|
| **ChatInterface** | Main React component for user-agent conversations |
| **useAgent** | Custom hook for managing agent interactions |
| **Token Acquisition** | Process of getting an access token from MSAL for API calls |

## Observability Terms

| Term | Definition |
|------|------------|
| **Application Insights** | Azure monitoring service for logs, metrics, and traces |
| **OpenTelemetry** | Standard for distributed tracing and metrics |
| **Span** | A single operation within a trace (e.g., one API call) |
| **Trace** | End-to-end record of a request through the system |

## Orchestration Terms (This Project's Build System)

| Term | Definition |
|------|------------|
| **Orchestrator** | Script that coordinates multiple Claude agents to generate code |
| **QA Pipeline** | Process that generates code then runs 5 QA agents in parallel |
| **Knowledge Base** | Files in `/knowledge` that provide context to code generation agents |
| **Checkpoint** | Saved state allowing pipeline to resume after interruption |

---

*Last updated: [DATE]*
*Add terms as the project evolves.*
