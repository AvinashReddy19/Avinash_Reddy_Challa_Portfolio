// src/app/layout/footer.tsx
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Social icon component with hover animation
  const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition duration-200"></div>
        <div className="relative bg-background dark:bg-card p-1.5 rounded-full group-hover:scale-110 transition duration-200">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <span className="sr-only">Social Link</span>
    </Link>
  );

  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Intro */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center -rotate-5">
                <span className="text-primary font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-lg">Avinash Reddy</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              AI Engineer & Software Developer specializing in building intelligent, 
              scalable applications with cutting-edge technologies.
            </p>
            <div className="flex gap-3 items-center">
              <SocialIcon href="https://github.com/AvinashReddy19" icon={Github} />
              <SocialIcon href="https://linkedin.com/in/avinash-reddy-challa" icon={Linkedin} />
              <SocialIcon href="https://instagram.com/avinash_reddy_challa" icon={Instagram} />
              <SocialIcon href="mailto:avinash.challa2003@gmail.com" icon={Mail} />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-3 text-sm">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/ai-assistant", label: "AI Assistant" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-1"
                  >
                    <span className="inline-block w-1 h-1 rounded-full bg-primary/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Technologies */}
          <div>
            <h3 className="font-medium mb-3 text-sm">Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                "LangChain", "Next.js", "React", "TypeScript", 
                "MongoDB", "AWS", "Node.js", "Python", "LangGraph",
                "FastAPI", "VoltAgent", "Groq"
              ].map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs bg-primary/5">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-muted flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} Avinash Reddy Challa. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0 items-center">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}