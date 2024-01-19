import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "056181f4-ad0e-4a39-b90d-6ec61c368eee",
    authority:
      "https://login.microsoftonline.com/ac228f1a-5052-4c38-a6f2-6846014a42c4",
    redirectUri: "http://localhost:3000", // Your redirect URI
  },
  cache: {
    cacheLocation: "localStorage", // Cache location
    storeAuthStateInCookie: false, // Set this to true if using IE11
  },
};

const pca = new PublicClientApplication(msalConfig);

export default pca;
