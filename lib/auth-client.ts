import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  // Use same-origin in production to avoid CORS/network errors
  baseURL: process.env.BETTER_AUTH_URL || "",
});
