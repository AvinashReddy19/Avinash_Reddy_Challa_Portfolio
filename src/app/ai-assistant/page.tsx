// src/app/ai-assistant/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, RefreshCw, Info, Loader2, ChevronRight, MessageSquareIcon, DownloadCloud } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
};

const exampleQuestions = [
  "What are Avinash's main skills?",
  "Tell me about his experience with AI voice agents",
  "What projects has he worked on?",
  "What technologies does he use for backend development?",
  "What is his educational background?",
  "What achievements does Avinash have?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: "Hello! I'm AviAssist, Avinash's portfolio assistant. I can answer questions about his skills, experience, projects, and education. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState("");
  const [messagesEnd, setMessagesEnd] = useState<HTMLDivElement | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate a unique chat ID when the component mounts
  useEffect(() => {
    setChatId(uuidv4());
  }, []);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, messagesEnd]);

  // Particle background
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    
    // Set canvas to full width/height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.2 + 0.1
        });
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

  // Handle sending a message
  const handleSendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading) return;

    // For demonstration purposes, hide info panel when user sends first message
    if (showInfo) {
      setShowInfo(false);
    }

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real implementation, you'd call your API
      // This is a simulation for demo purposes
      setTimeout(() => {
        let response = "";
        
        // Simple response based on message content (for demo)
        const lowerMessage = messageText.toLowerCase();
        
        if (lowerMessage.includes("skill") || lowerMessage.includes("technologies") || lowerMessage.includes("tech")) {
          response = "Avinash's core technical skills include:\n\n• AI Engineering: LangChain, LangGraph, and Voltagent for multi-agent systems\n• Voice AI: STT/TTS integration with LiveKit, Deepgram, and Google for multilingual capabilities\n• Full-Stack: Next.js, React, Node.js, Spring Boot, and MongoDB\n• Data Integration: Custom solutions for MongoDB, Google Sheets, and automated workflows\n\nHe's particularly skilled in architecting voice-based AI systems with sub-300ms latency.";
        }
        else if (lowerMessage.includes("voice") || lowerMessage.includes("agent")) {
          response = "Avinash has extensive experience with voice AI agents. At 10xR, he architected a multilingual voice agent using LiveKit that integrates STT (Deepgram, Google) and TTS (Google, Cartesia) for real-time communication in 5+ languages with <300ms latency.\n\nHe also engineered a Voice Agent Monitoring System with Twilio integration that analyzes call recordings through speaker diarization, latency tracking, and interruption detection.\n\nHis work includes a Multi-Agentic Chat Interface with Voltagent that enables autonomous voice agents to collaborate and handle complex workflows.";
        }
        else if (lowerMessage.includes("project")) {
          response = "Avinash has worked on several impressive projects:\n\n1. 10xR Multi-Agentic Healthcare Platform - A production-grade healthcare management platform with field visit scheduling, care plan management, and automated communication.\n\n2. Voice AI Analytics & Transcription Platform - Full-stack analytics for AI voice call analysis with stereo audio processing.\n\n3. MongoDB Sheets Integration Platform - Scalable data integration connecting MongoDB with Google Sheets with secure authentication.\n\n4. Smart Research Assistant - A RAG-based document analysis system using LangChain and FAISS vector store.\n\nWould you like more details about any specific project?";
        }
        else if (lowerMessage.includes("education") || lowerMessage.includes("college") || lowerMessage.includes("university")) {
          response = "Avinash is currently pursuing a Bachelor of Engineering (B.E.) in Computer Science and Engineering with specialization in AI and ML at Chaitanya Bharathi Institute of Technology. He's expected to graduate in May 2025 and maintains an impressive CGPA of 8.9/10.0.";
        }
        else if (lowerMessage.includes("achievement") || lowerMessage.includes("award")) {
          response = "Avinash has several notable achievements:\n\n• Selected as one of the top 10 teams from CBIT for the Smart India Hackathon 2023\n• Achieved a peak rating of 1600+ on LeetCode, ranking in the top 20% globally\n• Attained 2-star Coder status on CodeChef with a highest rating of 1532\n• Secured a top rank of 1818 in the highly competitive TS-EAMCET examination";
        }
        else if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
          response = "Avinash currently works as a Software Developer and AI Engineer at 10xR (since May 2024) where he:\n\n• Architects multilingual voice agents with <300ms latency\n• Engineers voice analytics platforms with Twilio integration\n• Develops multi-agentic systems with Voltagent\n• Creates custom data integration solutions\n\nHe also contributed to open source during Hacktober Fest in October 2023, developing responsive UI components for a cricket website.";
        }
        else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
          response = "You can contact Avinash via:\n\nEmail: avinash.challa2003@gmail.com\nPhone: +91-7416937354\n\nOr use the contact form on this website to send him a message directly.";
        }
        else {
          response = "Thanks for your interest in Avinash's portfolio! I'm AviAssist, an AI assistant trained on Avinash's resume data. I can tell you about his skills, projects, experience, and education.\n\nWhat specific aspect of Avinash's background would you like to learn more about?";
        }

        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add an error message
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "system",
          content: "I'm sorry, there was an error processing your request. Please try again later.",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  };

  // Handle pressing Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset the chat
  const resetChat = () => {
    setChatId(uuidv4());
    setMessages([
      {
        id: "welcome",
        role: "system",
        content: "Hello! I'm AviAssist, Avinash's portfolio assistant. I can answer questions about his skills, experience, projects, and education. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setShowInfo(true);
  };

  // Handle clicking an example question
  const handleExampleClick = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  // Render message with proper formatting
  const renderMessage = (message: Message) => {
    // Convert line breaks to JSX
    const formattedContent = message.content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < message.content.split('\n').length - 1 && <br />}
      </span>
    ));

    return (
      <div
        key={message.id}
        className={`flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex ${
            message.role === "user" ? "flex-row-reverse" : "flex-row"
          } items-start gap-3 max-w-[85%]`}
        >
          <Avatar className={`h-8 w-8 mt-1 ${message.role === "system" ? "bg-muted" : ""}`}>
            <AvatarFallback className={`${message.role === "user" ? "bg-primary/10 text-primary" : message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              {message.role === "user" ? (
                <User className="h-4 w-4" />
              ) : message.role === "assistant" ? (
                <Bot className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
          <div
            className={`rounded-lg px-4 py-3 text-sm ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : message.role === "assistant"
                ? "bg-card border shadow-sm"
                : "bg-muted/50 border"
            }`}
          >
            <div className="whitespace-pre-wrap">{formattedContent}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Background particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      
      <div className="container py-12 md:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tighter mb-2 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            AI Assistant Demo
          </h1>
          <Badge className="mb-4">Powered by LangGraph</Badge>
        </motion.div>
        
        <p className="text-muted-foreground max-w-2xl mb-8">
          Meet AviAssist, an AI-powered assistant built with LangGraph and Groq&apos;s Llama 3 model. Ask questions about Avinash&apos;s skills, experience, projects, or education.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <Card className="lg:col-span-2 h-[650px] flex flex-col relative overflow-hidden">
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>AviAssist</CardTitle>
                  <CardDescription>
                    Avinash&apos;s portfolio assistant
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <AnimatePresence>
              {showInfo && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-20 left-0 right-0 bottom-16 flex items-center justify-center z-10 pointer-events-none"
                >
                  <Card className="max-w-md mx-auto bg-card/60 backdrop-blur-sm border-primary/10">
                    <CardContent className="pt-6 text-center">
                      <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Bot className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">How can I help you?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Ask me anything about Avinash&apos;s skills, experience, projects, or education.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Try one of the example questions to get started
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
            
            <ScrollArea className="flex-grow p-4 relative">
              <div className="space-y-4" ref={scrollAreaRef}>
                {messages.map(message => renderMessage(message))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex flex-row items-start gap-3 max-w-[85%]">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-3 bg-card border shadow-sm min-h-[40px] min-w-[60px] flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        >
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={el => setMessagesEnd(el)} />
              </div>
            </ScrollArea>
            
            <CardFooter className="pt-2 pb-4 border-t">
              <div className="flex w-full items-center space-x-2">
                <Input
                  ref={inputRef}
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-grow shadow-sm"
                />
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="group"
                >
                  <span>Send</span>
                  <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Reset Chat"
                  onClick={resetChat}
                  className="rounded-full"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Reset Chat</span>
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* About Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary via-primary/70 to-primary/30" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    About AviAssist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    AviAssist is powered by LangGraph and Groq&apos;s Llama 3 model. This combination provides a fast, responsive AI experience with the advanced multi-agent capabilities of LangGraph.
                  </p>
                  <p>
                    This assistant has been trained on Avinash&apos;s resume data and can answer questions about his:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Professional experience and work history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Project details and technical achievements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Skills, technologies, and expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Educational background and qualifications</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-3 rounded-md mt-4">
                    <p className="text-sm font-medium">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">LangGraph</Badge>
                      <Badge variant="outline">Llama 3 (via Groq)</Badge>
                      <Badge variant="outline">Next.js</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Button variant="outline" size="sm" className="text-xs w-full">
                      <DownloadCloud className="h-3 w-3 mr-1" />
                      Technical Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquareIcon className="h-5 w-5 text-primary" />
                    Example Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {exampleQuestions.map((question, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="justify-start h-auto py-2 px-3 text-left w-full text-sm hover:bg-primary/10 hover:text-primary group border-primary/10"
                          onClick={() => handleExampleClick(question)}
                        >
                          <ChevronRight className="h-3 w-3 mr-2 text-primary group-hover:translate-x-1 transition-transform" />
                          {question}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <div className="h-1 mt-2 bg-gradient-to-r from-primary/30 via-primary/70 to-primary" />
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xs text-muted-foreground text-center px-4"
            >
              <p className="italic">
                Note: This is a demonstration of agentic AI capabilities. In a production environment, the assistant would be trained on more comprehensive data and could handle more complex tasks.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}