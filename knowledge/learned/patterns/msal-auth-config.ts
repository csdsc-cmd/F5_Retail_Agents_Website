/**
 * MSAL Authentication Configuration Pattern for Azure AI Foundry
 *
 * This is the approved pattern for configuring Azure AD authentication
 * in React applications using @azure/msal-react.
 */

import { Configuration, LogLevel } from "@azure/msal-browser";

// Environment variables (Vite) - with fallback defaults for Fusion5AI tenant
const clientId = import.meta.env.VITE_AZURE_CLIENT_ID || "da72658b-6d30-4e97-b1f6-19ba4d297f7b";
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID || "0e7fe07a-d721-4163-b144-7a802243cfb5";
const redirectUri = import.meta.env.VITE_REDIRECT_URI || window.location.origin;

if (!clientId || !tenantId) {
  throw new Error("Missing required Azure AD configuration. Check VITE_AZURE_CLIENT_ID and VITE_AZURE_TENANT_ID.");
}

/**
 * MSAL configuration object
 */
export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
    postLogoutRedirectUri: redirectUri,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "sessionStorage", // Use sessionStorage for better security
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return; // Never log PII
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          case LogLevel.Info:
            // Only log info in development
            if (import.meta.env.DEV) {
              console.info(message);
            }
            break;
        }
      },
      logLevel: import.meta.env.DEV ? LogLevel.Verbose : LogLevel.Error
    }
  }
};

/**
 * Scopes for API access
 * Update the API scope to match your backend App Registration
 */
export const apiScopes = {
  // Scope for calling your backend API
  backend: [`api://${clientId}/.default`]
};

/**
 * Login request configuration
 */
export const loginRequest = {
  scopes: ["openid", "profile", "email", ...apiScopes.backend]
};

/**
 * Token request for API calls
 */
export const tokenRequest = {
  scopes: apiScopes.backend
};
