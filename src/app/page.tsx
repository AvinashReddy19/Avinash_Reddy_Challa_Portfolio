// src/app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Cpu, Database, ExternalLink, Github, MessageCircle, Zap } from "lucide-react";

// Need to install:
// npm install framer-motion typewriter-effect
import Typewriter from 'typewriter-effect';

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Particle background effect
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
    let mousePosition = { x: 0, y: 0 };
    let isMouseMoving = false;
    let lastMouseMoveTime = Date.now();

    // Set canvas to full width/height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [] as Particle[];
      const particleCount = Math.floor(window.innerWidth * window.innerHeight / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1
        } as Particle);
      }
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
      isMouseMoving = true;
      lastMouseMoveTime = Date.now();
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Check if mouse stopped moving
      if (Date.now() - lastMouseMoveTime > 100) {
        isMouseMoving = false;
      }
      
      particles.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // If mouse is moving, attract particles towards mouse
        if (isMouseMoving) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const forceX = dx / distance * 0.5;
            const forceY = dy / distance * 0.5;
            particle.speedX += forceX * 0.2;
            particle.speedY += forceY * 0.2;
          }
        }
        
        // Apply friction to prevent excessive speed
        particle.speedX *= 0.98;
        particle.speedY *= 0.98;
        
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
        
        // Draw connections between nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const particle2 = particles[j];
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(170, 170, 190, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Skill card component
  type SkillCardProps = {
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
    delay?: number;
  };

  const SkillCard = ({ icon: Icon, title, description, delay = 0 }: SkillCardProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -5,
          boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
        }}
        className="relative overflow-hidden"
      >
        <Card className="h-full bg-card/50 backdrop-blur-sm border-card/10 hover:border-primary/20 transition-colors">
          <CardContent className="p-6">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Project card component
  type ProjectCardProps = {
    title: string;
    description: string;
    tags: string[];
    delay?: number;
  };

  const ProjectCard = ({ title, description, tags, delay = 0 }: ProjectCardProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="group relative"
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        
        <Card className="h-full hover:border-primary/20 transition-all group-hover:translate-y-[-5px] duration-300">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description.substring(0, 120)}...</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline">+{tags.length - 3}</Badge>
              )}
            </div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" className="p-2 h-8 w-8 rounded-full">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">View project</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  
  // Featured projects data
  const featuredProjects = [
    {
      title: "10xR Multi-Agentic Healthcare Platform",
      description: "A production-grade healthcare management platform with field visit scheduling, care plan management, and automated communication.",
      tags: ["Next.js", "MongoDB", "TypeScript", "Java Spring Boot", "VoltAgent"],
    },
    {
      title: "Voice AI Analytics & Transcription Platform",
      description: "Full-stack analytics system for AI voice call analysis with stereo audio processing and automated transcription services.",
      tags: ["Node.js", "TypeScript", "AWS", "OpenAI", "Deepgram"],
    },
    {
      title: "MongoDB Sheets Integration Platform",
      description: "Scalable data integration platform connecting MongoDB with Google Sheets with secure authentication and multi-tenant support.",
      tags: ["Python", "MongoDB", "Google Sheets API", "FastAPI", "AsyncIO"],
    },
  ];

  return (
    <div className="relative">
      {/* Interactive Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      
      {/* Hero Section */}
      <motion.section
        style={{ 
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY
        }}
        className="relative min-h-[90vh] flex flex-col justify-center items-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-3xl opacity-50 -z-10" />
        
        <div className="container px-4 md:px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-3 py-1 text-sm">AI Engineer & Software Developer</Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            Avinash Reddy Challa
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-[32px] text-xl md:text-2xl text-muted-foreground mx-auto max-w-[700px] mb-8"
          >
            <Typewriter
              options={{
                strings: [
                  'Building intelligent, scalable applications',
                  'Specializing in AI & voice systems',
                  'Creating full-stack solutions',
                  'Connecting data across platforms'
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Button asChild className="w-full sm:w-auto min-w-[160px]">
              <Link href="/projects">
                View Projects
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto min-w-[160px]">
              <Link href="/contact">
                Get in Touch
                <MessageCircle className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex justify-center"
            >
              <motion.div 
                animate={{ 
                  y: [0, 5, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
                className="w-1.5 h-3 bg-primary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Skills Overview Section */}
      <section className="relative py-24 bg-muted/30 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute top-0 inset-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl -z-10" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Expertise</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                My Technical Skills
              </span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillCard
              icon={Cpu}
              title="AI Engineering"
              description="Developing intelligent systems with LangChain, LangGraph, and integration of various AI models."
              delay={0.1}
            />
            <SkillCard
              icon={Code}
              title="Full-Stack Development"
              description="Building responsive web applications with Next.js, React, and modern backend technologies."
              delay={0.2}
            />
            <SkillCard
              icon={Zap}
              title="Voice AI Systems"
              description="Creating multilingual voice agents with STT/TTS integration and real-time communication capabilities."
              delay={0.3}
            />
            <SkillCard
              icon={Database}
              title="Data Integration"
              description="Developing custom solutions for MongoDB, Google Sheets, and automated data workflows."
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
        </div>
        
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4 md:mb-0"
            >
              <Badge className="mb-4">Portfolio</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md">
                Explore some of my recent work and technical achievements
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="ghost" className="group">
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={index * 0.1 + 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Element */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent -z-10" />
        
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6">Let's Connect</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Something Amazing Together?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Whether you're looking for an AI Engineer for your next project or want to discuss innovative ideas,
                I'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/contact">
                    Start a Conversation
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href="/about">
                    View My Resume
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}