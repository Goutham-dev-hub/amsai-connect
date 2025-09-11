import { Configuration, PopupRequest } from "@azure/msal-browser";

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || "",
    authority: import.meta.env.VITE_AZURE_AUTHORITY || "",
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case import.meta.env.DEV ? 0 : 3:
            console.log(message);
            break;
        }
      },
    },
  },
};

// Add scopes here for ID token to be used at Microsoft Graph API endpoints.
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
};

// Graph API endpoint
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};