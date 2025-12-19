"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GetStartedButton() {
  return (
    <Link href="/verify">
      <motion.button
        className="bg-[#61EB76] text-[#40800C] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-medium flex items-center justify-center gap-2 font-bold dm-sans relative overflow-hidden"
        initial="initial"
        whileHover="hover"
      >
      <motion.div
        className="flex items-center gap-2"
        variants={{
          initial: { y: 0, opacity: 1 },
          hover: { y: -20, opacity: 0 }
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        Get started
        <ArrowRight size={18} />
      </motion.div>

      <motion.div
        className="flex items-center gap-2 absolute inset-0 justify-center"
        variants={{
          initial: { y: 20, opacity: 0 },
          hover: { y: 0, opacity: 1 }
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        Get started
        <ArrowRight size={18} />
      </motion.div>
      </motion.button>
    </Link>
  );
}
