import { auth } from "@/lib/auth"; // Assuming auth is exported from lib/auth
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
