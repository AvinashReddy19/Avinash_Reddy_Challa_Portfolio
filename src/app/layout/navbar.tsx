// src/app/layout/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/ai-assistant", label: "AI Assistant" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Navlink component with hover and active effects
  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => {
    const isActive = pathname === href;
    
    return (
      <Link href={href} onClick={() => mobile && setOpen(false)}>
        <div className="relative">
          <span
            className={`${
              isActive
                ? "text-primary font-medium"
                : "text-foreground/70 hover:text-foreground"
            } transition-colors ${mobile ? "text-lg" : "text-sm"}`}
          >
            {label}
          </span>
          {isActive && (
            <motion.div
              layoutId="navbar-indicator"
              className="absolute bottom-[-5px] left-0 right-0 h-[3px] bg-primary rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </div>
      </Link>
    );
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full backdrop-blur-sm transition-all duration-200 ${
        scrolled ? "bg-background/90 border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-bold text-xl transition-colors hover:text-primary flex items-center gap-1.5"
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center -rotate-5"
            >
              <span className="text-primary font-bold text-lg">A</span>
            </motion.div>
            <span>Avinash Reddy</span>
          </Link>
          
          <div className="ml-2 hidden lg:block">
            <Badge variant="outline" className="bg-primary/5 text-xs">AI Engineer</Badge>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {routes.map((route) => (
            <NavLink key={route.href} href={route.href} label={route.label} />
          ))}
          
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col pt-10">
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            
            <div className="mb-8">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center -rotate-5">
                  <span className="text-primary font-bold text-2xl">A</span>
                </div>
                <div>
                  <div className="font-bold text-xl">Avinash Reddy</div>
                  <Badge variant="outline" className="mt-1 text-xs">AI Engineer</Badge>
                </div>
              </Link>
            </div>
            
            <nav className="flex flex-col gap-6 mt-4">
              <AnimatePresence>
                {routes.map((route) => (
                  <motion.div
                    key={route.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NavLink href={route.href} label={route.label} mobile />
                  </motion.div>
                ))}
              </AnimatePresence>
            </nav>
            
            <div className="mt-auto flex flex-col gap-4 py-4">
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm text-muted-foreground">Switch Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}