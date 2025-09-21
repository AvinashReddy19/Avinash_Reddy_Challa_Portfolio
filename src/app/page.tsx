// src/app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Cpu, LineChart, Zap } from "lucide-react"
import { FeaturedProjects } from "@/components/home/featured-projects"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center">
        <div className="container px-4 md:px-6 space-y-10 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Avinash Reddy Challa
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 dark:text-zinc-400 md:text-xl">
              AI Engineer & Software Developer specializing in building intelligent, scalable applications
            </p>
          </div>
          <div className="mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button asChild className="h-11 px-8">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-8">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            My Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <Cpu className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">AI Engineering</h3>
              <p className="text-muted-foreground">
                Developing intelligent systems with LangChain, LangGraph, and integration of various AI models.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <Code className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Full-Stack Development</h3>
              <p className="text-muted-foreground">
                Building responsive web applications with Next.js, React, and modern backend technologies.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <Zap className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Voice AI Systems</h3>
              <p className="text-muted-foreground">
                Creating multilingual voice agents with STT/TTS integration and real-time communication capabilities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <LineChart className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Data Integration</h3>
              <p className="text-muted-foreground">
                Developing custom solutions for MongoDB, Google Sheets, and automated data workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            Let's Build Something Amazing Together
          </h2>
          <p className="mx-auto max-w-[700px] text-zinc-500 dark:text-zinc-400 mb-8">
            Interested in working together or want to learn more about my experience?
          </p>
          <Button asChild className="h-11 px-8">
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}