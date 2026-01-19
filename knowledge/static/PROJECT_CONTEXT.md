# Project Context

> **This file is human-maintained.** Update it when project scope changes.

## What Is This Project?

This is a **template project** for building AI agent applications that run on Azure AI Foundry.
The orchestration system uses Claude to generate production-ready code targeting the Azure AI Foundry platform.

## Target Platform

- **Runtime**: Azure AI Foundry Agent Service
- **Authentication**: Azure Identity (Microsoft Entra ID)
- **Observability**: Application Insights via OpenTelemetry
- **Models**: OpenAI models (gpt-4o, gpt-4o-mini) via Foundry Agent Service

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  - Chat interface for user interaction                       │
│  - Agent status and conversation history                     │
│  - Azure AD authentication (MSAL)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                 │
│  - REST API endpoints                                        │
│  - Azure AI Agents SDK integration                           │
│  - Thread and conversation management                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Azure AI Foundry                           │
│  - Agent Service (managed agents)                            │
│  - Model deployments (gpt-4o)                                │
│  - Application Insights (tracing)                            │
└─────────────────────────────────────────────────────────────┘
```

## Template Usage

1. Duplicate this project for a new use case
2. Update PROJECT_PLAN.md with specific agent requirements
3. Run the orchestration to generate code
4. Deploy to Azure AI Foundry

## Target Users

- Primary: End users interacting with AI agents via web UI
- Secondary: Developers extending/customizing agents

## Non-Goals

- Direct Claude model integration (use Azure AI Foundry's supported models)
- Custom model fine-tuning
- On-premise deployment

## Constraints

- Must use Azure AI Foundry Agent Service
- Must authenticate via Azure Identity
- Must follow Azure SDK patterns and conventions

## Success Criteria

- Agents are visible and manageable in Azure AI Foundry portal
- Conversations are tracked in Application Insights
- Frontend provides seamless chat experience
- Code is production-ready and follows Azure best practices

---

## Azure Environment Details

**Primary Resource**: AIDevPlayground
- **Endpoint**: `https://AIDevPlayground-resource.services.ai.azure.com/api/projects/AIDevPlayground`
- **Region**: Australia East
- **Resource Group**: F5AI-asc-export

**Deployment Targets**:
- Backend: Azure App Service (`agent-api-dev`)
- Frontend: Azure Static Web Apps (`agent-frontend-dev`)

**Authentication**:
- Frontend: MSAL with Azure AD (Tenant: Fusion5AI)
- Backend: DefaultAzureCredential (Managed Identity in production)

**Required RBAC for Agent API**:
- Role: `Azure AI Developer` or `Cognitive Services OpenAI Contributor`
- Scope: AIDevPlayground-resource

---

*Last updated: 2025-01-19*
