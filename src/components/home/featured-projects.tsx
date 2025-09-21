// src/components/home/featured-projects.tsx
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

// This would be imported from your data file in a real implementation
const featuredProjects = [
  {
    id: "healthcare-platform",
    title: "10xR Multi-Agentic Healthcare Platform",
    description: "A production-grade healthcare management platform with field visit scheduling, care plan management, and automated communication.",
    tags: ["Next.js", "MongoDB", "TypeScript", "VoltAgent", "Spring Boot"],
    imageUrl: "/images/projects/healthcare-platform.jpg",
  },
  {
    id: "voice-analytics",
    title: "Voice AI Analytics & Transcription Platform",
    description: "Full-stack analytics system for AI voice call analysis with stereo audio processing and automated transcription services.",
    tags: ["Node.js", "TypeScript", "AWS", "OpenAI", "Deepgram"],
    imageUrl: "/images/projects/voice-analytics.jpg",
  },
  {
    id: "mongodb-sheets",
    title: "MongoDB Sheets Integration Platform",
    description: "Scalable data integration platform connecting MongoDB with Google Sheets with secure authentication and multi-tenant support.",
    tags: ["Python", "MongoDB", "Google Sheets API", "FastAPI", "AsyncIO"],
    imageUrl: "/images/projects/mongodb-sheets.jpg",
  },
]

export function FeaturedProjects() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">
              Featured Projects
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Explore some of my recent work and technical achievements
            </p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link href="/projects">
              View all projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48 w-full">
                {/* Replace with actual project images */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="font-bold text-lg">{project.title.split(" ")[0]}</span>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline">+{project.tags.length - 3}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="ghost" size="sm" className="ml-auto">
                  <Link href={`/projects#${project.id}`}>
                    Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}