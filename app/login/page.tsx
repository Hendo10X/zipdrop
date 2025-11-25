"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333]">Hey! Jump in</h1>

          {/* Login Form */}
          <LoginForm />

          {/* Footer Link */}
          <Link href="/sign-up" className="text-sm font-medium text-hendogray/60 transition-colors flex items-center gap-1 group">
            Are you new here? 
            <span className="text-hendogray group-hover:text-[#40800C] group-hover:underline decoration-[#61EB76] decoration-2 underline-offset-4 transition-all flex items-center gap-1">
              Get started <ArrowRight size={14} />
            </span>
          </Link>

        </div>
      </main>
    </div>
  );
}
