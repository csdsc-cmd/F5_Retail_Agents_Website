# Azure Configuration

## Azure AI Foundry (Primary)

| Property | Value |
|----------|-------|
| **Project Endpoint** | `https://AIDevPlayground-resource.services.ai.azure.com/api/projects/AIDevPlayground` |
| **Resource Name** | AIDevPlayground-resource |
| **Project Name** | AIDevPlayground |
| **Region** | Australia East (`australiaeast`) |
| **Resource Group** | F5AI-asc-export |
| **API Key** | `<REDACTED - see Azure Portal>` |

## Created Resources

| Resource | Name | URL/ID |
|----------|------|--------|
| **Backend App Service** | agent-api-dev | https://agent-api-dev.azurewebsites.net |
| **Frontend Static Web App** | agent-frontend-dev | https://victorious-sand-021b65c10.4.azurestaticapps.net |
| **Backend App Registration** | agent-api-dev | `9c4b8808-7d94-4f1a-a5ba-5b5eac476207` |
| **Frontend App Registration** | agent-frontend-dev | `da72658b-6d30-4e97-b1f6-19ba4d297f7b` |
| **Managed Identity** | agent-api-dev | `6df92aea-3d69-4df9-ab3c-4bb3ed7713f1` |

## Azure OpenAI (Alternative - Direct API)

| Property | Value |
|----------|-------|
| **Endpoint** | https://f5devazureopenai.cognitiveservices.azure.com/ |
| **Deployment** | gpt-4o-mini |
| **Resource** | F5devazureopenai |
| **Resource Group** | F5AI-asc-export |

## Authentication

| Property | Value |
|----------|-------|
| **Tenant ID** | `0e7fe07a-d721-4163-b144-7a802243cfb5` |
| **Frontend Client ID** | `da72658b-6d30-4e97-b1f6-19ba4d297f7b` |
| **Backend Client ID** | `9c4b8808-7d94-4f1a-a5ba-5b5eac476207` |

## Redirect URIs (Frontend App)
- http://localhost:5173
- http://localhost:5173/auth/callback
- https://victorious-sand-021b65c10.4.azurestaticapps.net
- https://victorious-sand-021b65c10.4.azurestaticapps.net/auth/callback

---

## Required RBAC Role for Azure AI Foundry Agents

To create and manage agents programmatically, your user/service principal needs:

**Role**: `Azure AI Developer` or `Cognitive Services OpenAI Contributor`
**Scope**: AIDevPlayground resource

```bash
# Grant Azure AI Developer role to your user (Drew.Alexander@fusion5.com.au)
az role assignment create \
  --assignee "Drew.Alexander@fusion5.com.au" \
  --role "Azure AI Developer" \
  --scope "/subscriptions/d22144c2-f1c1-4351-b95a-8baa016c60d1/resourceGroups/F5AI-asc-export/providers/Microsoft.CognitiveServices/accounts/AIDevPlayground-resource"

# Or grant to the App Service Managed Identity for production
az role assignment create \
  --assignee 6df92aea-3d69-4df9-ab3c-4bb3ed7713f1 \
  --role "Azure AI Developer" \
  --scope "/subscriptions/d22144c2-f1c1-4351-b95a-8baa016c60d1/resourceGroups/F5AI-asc-export/providers/Microsoft.CognitiveServices/accounts/AIDevPlayground-resource"
```

**Required Data Action**: `Microsoft.CognitiveServices/accounts/AIServices/agents/write`

---

## Temporary Auth Solution (Azure OpenAI Direct)

For direct Azure OpenAI calls (alternative to Agent Service):
- API key is stored in App Service configuration
- When you get RBAC permissions, switch to Managed Identity (more secure)

### To Switch to Managed Identity Later:
```bash
# Have someone with permissions run:
az role assignment create \
  --assignee 6df92aea-3d69-4df9-ab3c-4bb3ed7713f1 \
  --role "Cognitive Services OpenAI User" \
  --scope /subscriptions/d22144c2-f1c1-4351-b95a-8baa016c60d1/resourceGroups/F5AI-asc-export/providers/Microsoft.CognitiveServices/accounts/F5devazureopenai

# Then remove API key from app settings and use DefaultAzureCredential in code
```

---

## Deployment Tokens

### Static Web App Deployment Token
```
<REDACTED - see Azure Portal>
```

Use this in GitHub Actions as `AZURE_STATIC_WEB_APPS_API_TOKEN` secret.

### App Service Deployment
Use ZIP deploy or get publish profile from Azure Portal.

---

## Quick Deploy Commands

### Backend
```bash
cd backend
npm run build
zip -r deploy.zip dist package.json package-lock.json

az webapp deploy \
  --name agent-api-dev \
  --resource-group F5AI-asc-export \
  --src-path deploy.zip \
  --type zip
```

### Frontend
```bash
cd frontend
npm run build

# Using SWA CLI
npm install -g @azure/static-web-apps-cli
swa deploy ./dist \
  --deployment-token <REDACTED - see Azure Portal>
```

---

*Generated: 2025-01-19*
