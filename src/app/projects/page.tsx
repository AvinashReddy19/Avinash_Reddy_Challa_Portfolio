// src/app/projects/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { projectsData, type Project } from "@/lib/data/projects-data";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  
  const filteredProjects = projectsData
    .filter(project => {
      if (selectedCategory === "all") return true;
      return project.category === selectedCategory;
    })
    .filter(project => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });

  // Handle clicking outside modal to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setActiveProject(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Background particles
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Particle = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    };

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Set canvas to full width/height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [] as Particle[];
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.1
        } as Particle);
      }
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around canvas edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170, 170, 190, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Project detail modal
  type ProjectModalProps = { project: Project | null };
  const ProjectModal = ({ project }: ProjectModalProps) => {
    if (!project) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-card relative max-w-3xl w-full rounded-xl border shadow-lg overflow-hidden"
        >
          {/* Modal header with gradient */}
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
            <h2 className="text-2xl font-bold">{project.title}</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
            
            <p className="text-muted-foreground mb-6">{project.longDescription || project.description}</p>
            
            <div className="flex flex-wrap gap-4 justify-end">
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
              {project.demoUrl && (
                <Button asChild>
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
              <Button variant="ghost" onClick={() => setActiveProject(null)}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Project card with animations
  type ProjectCardProps = { project: Project; index: number };
  const ProjectCard = ({ project, index }: ProjectCardProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card className="h-full overflow-hidden hover:border-primary/30 transition-colors duration-300 relative">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <CardContent className="p-6">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{project.tags.length - 3}</Badge>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setActiveProject(project)}
              >
                View Details
                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              {/* Links to demo/github */}
              <div className="absolute top-3 right-3 flex gap-2">
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Demo</span>
                    </Button>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <>
      <div className="relative">
        {/* Background particle effect */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30"
        />
        
        <div className="container py-12 md:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <Badge className="mb-4">Portfolio</Badge>
              <h1 className="text-3xl font-bold tracking-tighter mb-4 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                My Projects
              </h1>
              <p className="text-muted-foreground max-w-2xl mb-8">
                A collection of my work in AI engineering, full-stack development, and integration solutions.
                These projects showcase my experience in building intelligent, scalable applications.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 w-full min-w-[250px]"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Project Categories */}
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="mb-6 bg-background/50 border">
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedCategory("all")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                onClick={() => setSelectedCategory("ai")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                AI Projects
              </TabsTrigger>
              <TabsTrigger 
                value="fullstack" 
                onClick={() => setSelectedCategory("fullstack")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Full-Stack
              </TabsTrigger>
              <TabsTrigger 
                value="integration" 
                onClick={() => setSelectedCategory("integration")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Integration
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <h3 className="text-lg font-medium mb-2">No projects found</h3>
                    <p className="text-muted-foreground">Try changing your search query or filter</p>
                    <Button variant="outline" className="mt-4" onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
      
      {/* Project detail modal */}
      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} />}
      </AnimatePresence>
    </>
  );
}