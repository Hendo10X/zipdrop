"use client";

import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onSuccess: () => {
        setLoading(false);
        router.push("/"); // Redirect to home or dashboard
      },
      onError: (ctx) => {
        setLoading(false);
        alert(ctx.error.message);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col relative font-sans text-hendogray dm-sans">


      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-[320px] sm:max-w-sm w-full flex flex-col items-center gap-6">
          
          {/* Logo */}
          <div className="mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/">
                    <Image 
                      src="/zipcode.svg" 
                      alt="zipdrop" 
                      width={106} 
                      height={28} 
                      className="h-6 sm:h-8 w-auto"
                      priority
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>click to take me home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333]">Yo! new here?</h1>

          {/* Form */}
          <div className="w-full space-y-4">
            {/* Name Input */}
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#40800C] transition-colors duration-300">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#E5E5E5] text-hendogray placeholder:text-gray-500 px-12 py-3.5 rounded-[32px] text-sm focus:outline-none focus:ring-2 focus:ring-[#61EB76] focus:bg-[#E5E5E5]/80 transition-all duration-300 ease-out"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#40800C] transition-colors duration-300">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#E5E5E5] text-hendogray placeholder:text-gray-500 px-12 py-3.5 rounded-[32px] text-sm focus:outline-none focus:ring-2 focus:ring-[#61EB76] focus:bg-[#E5E5E5]/80 transition-all duration-300 ease-out"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#40800C] transition-colors duration-300">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#E5E5E5] text-hendogray placeholder:text-gray-500 px-12 py-3.5 rounded-[32px] text-sm focus:outline-none focus:ring-2 focus:ring-[#61EB76] focus:bg-[#E5E5E5]/80 transition-all duration-300 ease-out"
              />
            </div>
          </div>

          {/* Create Account Button */}
          <motion.button
            onClick={handleSignUp}
            disabled={loading}
            className="bg-[#61EB76] text-[#40800C] px-8 py-3 rounded-full text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden w-full"
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
              {loading ? "Creating..." : "Create account"}
            </motion.div>

            <motion.div
              className="flex items-center gap-2 absolute inset-0 justify-center"
              variants={{
                initial: { y: 20, opacity: 0 },
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {loading ? "Creating..." : "Create account"}
            </motion.div>
          </motion.button>

          {/* Footer Link */}
          <Link href="#" className="text-sm font-medium text-hendogray/60 transition-colors flex items-center gap-1 group">
            Been here already? 
            <span className="text-hendogray group-hover:text-[#40800C] group-hover:underline decoration-[#61EB76] decoration-2 underline-offset-4 transition-all flex items-center gap-1">
              Sign in <ArrowRight size={14} />
            </span>
          </Link>

        </div>
      </main>
    </div>
  );
}
