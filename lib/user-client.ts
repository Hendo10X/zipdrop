import { authClient } from "@/lib/auth-client";

export const getUserClient = async () => {
  try {
    const session = await authClient.getSession();
    return session?.data?.user ?? null;
  } catch (error) {
    console.error("Failed to fetch client session:", error);
    return null;
  }
};
