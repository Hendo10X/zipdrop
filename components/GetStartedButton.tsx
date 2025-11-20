"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function GetStartedButton() {
  return (
    <motion.button
      className="bg-[#61EB76] text-[#40800C] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 font-bold dm-sans"
      whileHover={{ 
        borderRadius: "8px",
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      Get started
      <ArrowRight size={18} />
    </motion.button>
  );
}
