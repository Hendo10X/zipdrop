"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import Link from "next/link";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.2, 
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen 
            ? "bg-[#61EB76] text-[#40800C]" 
            : "bg-[#E5E5E5] hover:bg-[#d4d4d4] text-hendogray"
        } px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm font-medium transition-colors dm-sans z-50 relative w-[80px] h-[36px] flex items-center justify-center overflow-hidden`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "menu"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute"
          >
            {isOpen ? "Close" : "Menu"}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full right-0 mt-2 w-48 bg-[#E5E5E5] rounded-xl overflow-hidden z-40"
          >
            <div className="flex flex-col p-2">
              <nav className="flex flex-col gap-1">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/navigation/about" },
                  { label: "Blog", href: "#" },
                  { label: "FAQ", href: "/navigation/faq" },
                  { label: "Login", href: "#" },
                ].map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-center text-hendogray hover:bg-black/5 rounded-lg transition-colors text-sm font-medium dm-sans"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
