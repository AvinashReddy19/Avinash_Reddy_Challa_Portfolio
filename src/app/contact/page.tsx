// src/app/contact/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Instagram, Mail, Send, CheckCircle, User, MessageCircleIcon, AtSign, Loader2, Cpu } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleFocus = (field: string) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real implementation, you would send the form data to your server or a form service
    // For demo purposes, we'll simulate a successful submission after a delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  // Animated background
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Set canvas to full width/height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Draw animated gradient background
    const drawBackground = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradients with time-based animation
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time * 0.0005) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.0005) * 100,
        0,
        canvas.width * 0.3 + Math.sin(time * 0.0005) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.0005) * 100,
        canvas.width * 0.6
      );
      
      gradient1.addColorStop(0, 'rgba(100, 100, 150, 0.08)');
      gradient1.addColorStop(1, 'rgba(100, 100, 150, 0)');
      
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.sin(time * 0.0004 + 2) * 100,
        canvas.height * 0.7 + Math.cos(time * 0.0004 + 2) * 100,
        0,
        canvas.width * 0.7 + Math.sin(time * 0.0004 + 2) * 100,
        canvas.height * 0.7 + Math.cos(time * 0.0004 + 2) * 100,
        canvas.width * 0.5
      );
      
      gradient2.addColorStop(0, 'rgba(120, 80, 180, 0.05)');
      gradient2.addColorStop(1, 'rgba(120, 80, 180, 0)');
      
      // Draw the gradients
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Continue animation
      animationFrameId = requestAnimationFrame(drawBackground);
    };

    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    drawBackground(0);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Social link component with animation
  const SocialLink = ({ href, icon: Icon, title, subtitle, index }: { href: string; icon: React.ElementType; title: string; subtitle: string; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Link href={href} target="_blank" rel="noopener noreferrer">
          <Card className="h-full hover:border-primary/20 transition-all duration-200 hover:shadow-md group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 rounded-full p-3 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{title}</h3>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Animated background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      
      <div className="container py-12 md:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Badge className="mb-4">Let's Talk</Badge>
          <h1 className="text-3xl font-bold tracking-tighter mb-4 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Have a question or interested in working together? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden">
              {/* Decorative gradient line */}
              <div className="h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircleIcon className="h-5 w-5 text-primary" />
                  Send a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Thank you for reaching out. I'll review your message and get back to you as soon as possible.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="mt-2"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <div className="relative">
                        <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors ${activeField === 'name' ? 'text-primary' : ''}`}>
                          <User className="h-4 w-4" />
                        </div>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          className={`pl-10 transition-all ${activeField === 'name' ? 'ring-primary/30 ring-2' : ''}`}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors ${activeField === 'email' ? 'text-primary' : ''}`}>
                          <AtSign className="h-4 w-4" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          className={`pl-10 transition-all ${activeField === 'email' ? 'ring-primary/30 ring-2' : ''}`}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <div className={`absolute left-3 top-3 text-muted-foreground transition-colors ${activeField === 'subject' ? 'text-primary' : ''}`}>
                          <Mail className="h-4 w-4" />
                        </div>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Subject of your message"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => handleFocus('subject')}
                          onBlur={handleBlur}
                          className={`pl-10 transition-all ${activeField === 'subject' ? 'ring-primary/30 ring-2' : ''}`}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <div className={`absolute left-3 top-3 text-muted-foreground transition-colors ${activeField === 'message' ? 'text-primary' : ''}`}>
                          <MessageCircleIcon className="h-4 w-4" />
                        </div>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          className={`resize-none pl-10 transition-all ${activeField === 'message' ? 'ring-primary/30 ring-2' : ''}`}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full group" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information and Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Card */}
            <Card className="relative overflow-hidden">
              {/* Decorative gradient line */}
              <div className="h-1.5 bg-gradient-to-r from-primary/50 via-primary/90 to-primary/50" />
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Here&apos;s how you can reach me directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                  <div className="bg-background rounded-full p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:avinash.challa2003@gmail.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      avinash.challa2003@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="bg-background rounded-full p-2">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Available For</p>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      <Badge variant="secondary" className="text-xs">Full-time Opportunities</Badge>
                      <Badge variant="secondary" className="text-xs">Freelance Projects</Badge>
                      <Badge variant="secondary" className="text-xs">Collaborations</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Connect Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-4">Connect With Me</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SocialLink
                  href="https://github.com/AvinashReddy19"
                  icon={Github}
                  title="GitHub"
                  subtitle="View my code repositories"
                  index={0}
                />
                <SocialLink
                  href="https://linkedin.com/in/avinash-reddy-challa"
                  icon={Linkedin}
                  title="LinkedIn"
                  subtitle="Connect professionally"
                  index={1}
                />
                <SocialLink
                  href="https://instagram.com/avinash_reddy_challa"
                  icon={Instagram}
                  title="Instagram"
                  subtitle="Follow me"
                  index={2}
                />
              </div>
            </motion.div>
            
            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-medium text-foreground mb-1">What is your typical response time?</h3>
                    <p className="text-sm text-muted-foreground">
                      I typically respond to inquiries within 24-48 hours during weekdays.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Are you available for remote work?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes, I'm comfortable working remotely and have experience collaborating with distributed teams.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">What's your preferred collaboration method?</h3>
                    <p className="text-sm text-muted-foreground">
                      I'm flexible with tools like Slack, Discord, MS Teams, or any platform that works best for your team.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}