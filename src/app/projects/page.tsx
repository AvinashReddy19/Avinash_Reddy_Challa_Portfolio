// src/app/projects/page.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { projectsData, Project } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const filteredProjects = selectedCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory)

  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tighter mb-4 md:text-4xl">
        My Projects
      </h1>
      <p className="text-muted-foreground max-w-2xl mb-8">
        A collection of my work in AI engineering, full-stack development, and integration solutions. These projects showcase my experience in building intelligent, scalable applications.
      </p>

      {/* Project Categories */}
      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
            All Projects
          </TabsTrigger>
          <TabsTrigger value="ai" onClick={() => setSelectedCategory("ai")}>
            AI Projects
          </TabsTrigger>
          <TabsTrigger value="fullstack" onClick={() => setSelectedCategory("fullstack")}>
            Full-Stack
          </TabsTrigger>
          <TabsTrigger value="integration" onClick={() => setSelectedCategory("integration")}>
            Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card id={project.id} className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        {/* Replace with actual project images in production */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
          <span className="font-bold text-lg">{project.title.split(" ")[0]}</span>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 5 && (
            <Badge variant="outline">+{project.tags.length - 5}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {project.longDescription?.slice(0, 120)}
          {project.longDescription && project.longDescription.length > 120 && "..."}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        {project.githubUrl && (
          <Button variant="outline" size="sm" asChild>
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1 h-3.5 w-3.5" />
              GitHub
            </Link>
          </Button>
        )}
        {project.demoUrl && (
          <Button variant="outline" size="sm" asChild>
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3.5 w-3.5" />
              Demo
            </Link>
          </Button>
        )}
        {(!project.githubUrl && !project.demoUrl) && (
          <span className="text-sm text-muted-foreground italic">Private Project</span>
        )}
      </CardFooter>
    </Card>
  )
}
