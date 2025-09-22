// src/app/layout/theme-toggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full bg-primary/10 backdrop-blur-sm border-transparent hover:bg-primary/20 transition-all"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === "dark" ? 45 : 0,
            opacity: theme === "dark" ? 0 : 1,
            scale: theme === "dark" ? 0 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === "light" ? -45 : 0,
            opacity: theme === "light" ? 0 : 1,
            scale: theme === "light" ? 0 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>
    </Button>
  );
}