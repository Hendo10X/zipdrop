"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "motion/react";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await authClient.signIn.email({
        email: values.email,
        password: values.password,
      }, {
        onSuccess: () => {
            toast.success("Login successful");
            router.push("/dashboard");
        },
        onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to login");
        }
      });
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to login");
    } finally {
        setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
      <div className="w-full space-y-4">
        {/* Email Input */}
        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#40800C] transition-colors duration-300">
            <Mail size={18} />
          </div>
          <input
            {...form.register("email")}
            type="email"
            placeholder="Email@example.com"
            className="w-full bg-[#E5E5E5] text-hendogray placeholder:text-gray-500 px-12 py-3.5 rounded-4xl text-sm focus:outline-none focus:ring-2 focus:ring-[#61EB76] focus:bg-[#E5E5E5]/80 transition-all duration-300 ease-out"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs ml-4 mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#40800C] transition-colors duration-300">
            <Lock size={18} />
          </div>
          <input
            {...form.register("password")}
            type="password"
            placeholder="Password"
            className="w-full bg-[#E5E5E5] text-hendogray placeholder:text-gray-500 px-12 py-3.5 rounded-4xl text-sm focus:outline-none focus:ring-2 focus:ring-[#61EB76] focus:bg-[#E5E5E5]/80 transition-all duration-300 ease-out"
          />
           {form.formState.errors.password && (
            <p className="text-red-500 text-xs ml-4 mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>
      </div>

      {/* Forgot Password */}
      <div className="w-full text-right text-sm text-hendogray/60">
        Forgot your password? <span className="underline decoration-hendogray/40 cursor-pointer">Well that sucks.</span>
      </div>

      {/* Login Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="bg-[#61EB76] text-[#40800C] px-8 py-3 rounded-full text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden w-full mt-4"
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="flex items-center gap-2"
          variants={{
            initial: { y: 0, opacity: 1 },
            hover: { y: -20, opacity: 0 }
          }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Log in"}
        </motion.div>

        <motion.div
          className="flex items-center gap-2 absolute inset-0 justify-center"
          variants={{
            initial: { y: 20, opacity: 0 },
            hover: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
           {loading ? <Loader2 className="animate-spin" /> : "Log in"}
        </motion.div>
      </motion.button>
    </form>
  );
}
