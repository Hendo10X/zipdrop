"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      router.push("/");
      router.refresh();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className="w-full block px-4 py-2 text-center text-hendogray hover:bg-black/5 rounded-lg transition-colors text-sm font-medium dm-sans"
      disabled={isLoading}
      onClick={handleLogout}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Logout"}
    </button>
  );
}
