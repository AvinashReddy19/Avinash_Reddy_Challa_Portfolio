import Link from "next/link"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/95">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="font-bold text-lg">Avinash Reddy Challa</h2>
            <p className="text-muted-foreground text-sm mt-1">
              AI Engineer & Software Developer
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://instagram.com/your-instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="mailto:avinash.challa2003@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Avinash Reddy Challa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}