# Azure Deployment - Complete Setup

## Created Resources Summary

| Resource Type | Name | URL/Endpoint |
|---------------|------|--------------|
| **Backend App Service** | agent-api-dev | https://agent-api-dev.azurewebsites.net |
| **Frontend Static Web App** | agent-frontend-dev | https://victorious-sand-021b65c10.4.azurestaticapps.net |
| **Backend App Registration** | agent-api-dev | Client ID: `9c4b8808-7d94-4f1a-a5ba-5b5eac476207` |
| **Frontend App Registration** | agent-frontend-dev | Client ID: `da72658b-6d30-4e97-b1f6-19ba4d297f7b` |
| **Managed Identity** | agent-api-dev | Principal: `6df92aea-3d69-4df9-ab3c-4bb3ed7713f1` |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│          Static Web App (agent-frontend-dev)                │
│     https://victorious-sand-021b65c10.4.azurestaticapps.net │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  React + Vite + TypeScript                          │   │
│  │  MSAL Authentication (Azure AD)                     │   │
│  │  Client ID: da72658b-6d30-4e97-b1f6-19ba4d297f7b   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTPS
┌─────────────────────────────────────────────────────────────┐
│            App Service (agent-api-dev)                      │
│           https://agent-api-dev.azurewebsites.net           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Express.js + TypeScript                            │   │
│  │  Node.js 20 LTS                                     │   │
│  │  Managed Identity enabled                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ API Key (temporary)
┌─────────────────────────────────────────────────────────────┐
│              Azure OpenAI (F5devazureopenai)                │
│     https://f5devazureopenai.cognitiveservices.azure.com/   │
│                                                             │
│  Model Deployment: gpt-4o-mini                              │
│  Resource Group: F5AI-asc-export                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Configuration

### Azure AD Tenant
| Property | Value |
|----------|-------|
| Tenant ID | `0e7fe07a-d721-4163-b144-7a802243cfb5` |
| Tenant Name | Fusion5AI |
| Domain | Fusion5.ai |

### Frontend App Registration
| Property | Value |
|----------|-------|
| Display Name | agent-frontend-dev |
| Client ID | `da72658b-6d30-4e97-b1f6-19ba4d297f7b` |
| Sign-in Audience | AzureADMyOrg (single tenant) |
| Redirect URIs | See below |

**Redirect URIs:**
- `http://localhost:5173` (local dev)
- `http://localhost:5173/auth/callback`
- `https://victorious-sand-021b65c10.4.azurestaticapps.net`
- `https://victorious-sand-021b65c10.4.azurestaticapps.net/auth/callback`

### Backend App Registration
| Property | Value |
|----------|-------|
| Display Name | agent-api-dev |
| Client ID | `9c4b8808-7d94-4f1a-a5ba-5b5eac476207` |
| Sign-in Audience | AzureADMyOrg |

---

## Environment Configuration

### Backend App Settings (Already Configured)

The following are set in Azure App Service configuration:

| Setting | Value |
|---------|-------|
| `AZURE_OPENAI_ENDPOINT` | https://f5devazureopenai.cognitiveservices.azure.com/ |
| `AZURE_OPENAI_API_KEY` | (configured - API key) |
| `AZURE_OPENAI_DEPLOYMENT` | gpt-4o-mini |
| `NODE_ENV` | production |
| `FRONTEND_URL` | https://victorious-sand-021b65c10.4.azurestaticapps.net |

### Local Development (.env files)

**backend/.env**
```bash
AZURE_OPENAI_ENDPOINT=https://f5devazureopenai.cognitiveservices.azure.com/
AZURE_OPENAI_API_KEY=<get-from-azure-portal>
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
FRONTEND_URL=http://localhost:5173
PORT=3001
NODE_ENV=development
```

**frontend/.env**
```bash
VITE_API_URL=http://localhost:3001
VITE_AZURE_CLIENT_ID=da72658b-6d30-4e97-b1f6-19ba4d297f7b
VITE_AZURE_TENANT_ID=0e7fe07a-d721-4163-b144-7a802243cfb5
```

**frontend/.env.production**
```bash
VITE_API_URL=https://agent-api-dev.azurewebsites.net
VITE_AZURE_CLIENT_ID=da72658b-6d30-4e97-b1f6-19ba4d297f7b
VITE_AZURE_TENANT_ID=0e7fe07a-d721-4163-b144-7a802243cfb5
```

---

## Deployment Commands

### Deploy Backend

```bash
cd backend

# Build
npm run build

# Package
zip -r deploy.zip dist package.json package-lock.json

# Deploy
az webapp deploy \
  --name agent-api-dev \
  --resource-group F5AI-asc-export \
  --src-path deploy.zip \
  --type zip
```

### Deploy Frontend

```bash
cd frontend

# Build for production
npm run build

# Deploy using SWA CLI
npm install -g @azure/static-web-apps-cli

swa deploy ./dist \
  --deployment-token "3669af9b999ee171e2fbdbb57f76f90f68dfa6cd1e1356dbcd0a49ed20b7443504-23703036-9245-416f-9b0d-30a4ab6efd5c0102831021b65c10"
```

---

## Temporary Auth: API Key

Since RBAC assignment permissions are not available, the backend uses API key authentication for Azure OpenAI.

**Security Note**: API keys are stored in App Service configuration, which is:
- Encrypted at rest
- Not visible in logs
- Accessible only to the application

### Future: Switch to Managed Identity

When RBAC permissions become available:

```bash
# Have someone with Owner/User Access Administrator run:
az role assignment create \
  --assignee 6df92aea-3d69-4df9-ab3c-4bb3ed7713f1 \
  --role "Cognitive Services OpenAI User" \
  --scope /subscriptions/d22144c2-f1c1-4351-b95a-8baa016c60d1/resourceGroups/F5AI-asc-export/providers/Microsoft.CognitiveServices/accounts/F5devazureopenai
```

Then update backend code to use `DefaultAzureCredential`:
```typescript
import { DefaultAzureCredential } from "@azure/identity";
const credential = new DefaultAzureCredential();
const client = new AzureOpenAI({ endpoint, credential });
```

---

## Deployment Tokens & Secrets

### Static Web App Deployment Token
```
3669af9b999ee171e2fbdbb57f76f90f68dfa6cd1e1356dbcd0a49ed20b7443504-23703036-9245-416f-9b0d-30a4ab6efd5c0102831021b65c10
```

For GitHub Actions, add as secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`

### App Service Deployment
Get publish profile from Azure Portal or use:
```bash
az webapp deployment list-publishing-profiles \
  --name agent-api-dev \
  --resource-group F5AI-asc-export \
  --xml
```

---

## GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run build
      - run: zip -r deploy.zip dist package.json package-lock.json

      - uses: azure/webapps-deploy@v2
        with:
          app-name: agent-api-dev
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: ./backend/deploy.zip

  deploy-frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run build
        env:
          VITE_API_URL: https://agent-api-dev.azurewebsites.net
          VITE_AZURE_CLIENT_ID: da72658b-6d30-4e97-b1f6-19ba4d297f7b
          VITE_AZURE_TENANT_ID: 0e7fe07a-d721-4163-b144-7a802243cfb5

      - uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: upload
          app_location: ./frontend
          output_location: dist
```

---

## Monitoring

### View Backend Logs
```bash
az webapp log tail --name agent-api-dev --resource-group F5AI-asc-export
```

### View App Service Metrics
```bash
az monitor metrics list \
  --resource /subscriptions/d22144c2-f1c1-4351-b95a-8baa016c60d1/resourceGroups/F5AI-asc-export/providers/Microsoft.Web/sites/agent-api-dev \
  --metric "Http5xx,Http4xx,Requests" \
  --interval PT1H
```

---

## Quick Reference

| What | Command/URL |
|------|-------------|
| Backend URL | https://agent-api-dev.azurewebsites.net |
| Frontend URL | https://victorious-sand-021b65c10.4.azurestaticapps.net |
| Azure Portal | https://portal.azure.com |
| View backend logs | `az webapp log tail --name agent-api-dev -g F5AI-asc-export` |
| Deploy backend | `az webapp deploy --name agent-api-dev -g F5AI-asc-export --src-path deploy.zip --type zip` |
| OpenAI endpoint | https://f5devazureopenai.cognitiveservices.azure.com/ |

---

*Created: 2025-01-19*
*Subscription: Dev (d22144c2-f1c1-4351-b95a-8baa016c60d1)*
*Resource Group: F5AI-asc-export*
