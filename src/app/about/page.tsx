// src/app/about/page.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Award, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  User, 
  Code, 
  Database, 
  Server, 
  Cpu,
  ExternalLink,
  Download,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  // Animated background
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
        canvas.width * 0.3 + Math.sin(time * 0.001) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.001) * 100,
        0,
        canvas.width * 0.3 + Math.sin(time * 0.001) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.001) * 100,
        canvas.width * 0.6
      );
      
      gradient1.addColorStop(0, 'rgba(100, 100, 150, 0.1)');
      gradient1.addColorStop(1, 'rgba(100, 100, 150, 0)');
      
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.sin(time * 0.0008 + 2) * 100,
        canvas.height * 0.7 + Math.cos(time * 0.0008 + 2) * 100,
        0,
        canvas.width * 0.7 + Math.sin(time * 0.0008 + 2) * 100,
        canvas.height * 0.7 + Math.cos(time * 0.0008 + 2) * 100,
        canvas.width * 0.5
      );
      
      gradient2.addColorStop(0, 'rgba(120, 80, 180, 0.07)');
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

  // Skill component with progress indicator
  type SkillBarProps = { name: string; level: number; index?: number };
  const SkillBar = ({ name, level, index = 0 }: SkillBarProps) => {
    const percentage = `${level}%`;
    
    return (
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-between mb-1">
          <span className="text-sm">{name}</span>
          <span className="text-xs text-muted-foreground">{percentage}</span>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            className="bg-primary h-2.5 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: percentage }}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.05 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
    );
  };

  // Experience card with animation
  type ExperienceCardProps = {
    position: string;
    company: string;
    period: string;
    responsibilities: string[];
    index: number;
  };
  const ExperienceCard = ({ position, company, period, responsibilities, index }: ExperienceCardProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        viewport={{ once: true }}
        className="mb-8 relative"
      >
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px] bg-muted">
          <div className="absolute top-6 left-[-5px] w-3 h-3 rounded-full bg-primary" />
        </div>
        
        <div className="md:ml-8 relative">
          <div className="bg-card rounded-lg border shadow-sm p-5 hover:border-primary/20 transition-colors">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h3 className="font-bold text-lg">{position}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-primary/10">{company}</Badge>
                <span className="text-sm text-muted-foreground">{period}</span>
              </div>
            </div>
            <ul className="space-y-2 text-sm mt-4">
              {responsibilities.map((item, idx) => (
                <li key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
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
      
      {/* Header Section */}
      <motion.section
        style={{ opacity: headerOpacity }}
        className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl opacity-50 -z-10" />
        
        <div className="container">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Profile Sidebar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/3 lg:w-1/4"
            >
              <Card className="sticky top-20">
                <CardHeader className="text-center">
                  {/* Profile image placeholder */}
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-20 w-20 text-primary/40" />
                  </div>
                  <CardTitle>Avinash Reddy Challa</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">AI Engineer & Software Developer</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs font-medium">Email</p>
                        <a href="mailto:avinash.challa2003@gmail.com" className="text-sm hover:text-primary transition-colors">
                          avinash.challa2003@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs font-medium">Phone</p>
                        <p className="text-sm">+91-7416937354</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs font-medium">Location</p>
                        <p className="text-sm">Hyderabad, India</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-center pt-2">
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Resume
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-2/3 lg:w-3/4"
            >
              <h1 className="text-3xl font-bold tracking-tighter mb-4 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                About Me
              </h1>
              <Badge className="mb-6">My Story</Badge>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <p className="text-lg leading-relaxed">
                    I am an AI Engineer and Software Developer specializing in creating intelligent, user-friendly applications. 
                    My expertise spans voice AI systems, full-stack development, and data integration solutions.
                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                    I&apos;m passionate about building technology that combines cutting-edge AI capabilities with robust, 
                    scalable architecture to solve real-world problems. My focus areas include LangChain-based AI agents,
                    multilingual voice systems, and creating seamless data pipelines.
                  </p>
                </CardContent>
              </Card>

              <Tabs defaultValue="experience" className="w-full">
                <TabsList className="mb-6 bg-background/50 border w-full justify-start">
                  <TabsTrigger 
                    value="experience" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger 
                    value="skills" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Skills
                  </TabsTrigger>
                  <TabsTrigger 
                    value="education" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievements" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Achievements
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="experience" className="space-y-6 min-h-[400px]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Work Experience</h2>
                  </div>
                  
                  <div className="relative md:border-l md:border-muted md:pl-6">
                    {/* 10xR Experience */}
                    <ExperienceCard 
                      index={0}
                      position="Software Developer - AI Engineer"
                      company="10xR"
                      period="May 2024 - Present"
                      responsibilities={[
                        "Architected a multilingual AI Voice Agent using LiveKit, integrating STT (Deepgram, Google) and TTS (Google, Cartesia) for real-time communication in 5+ languages with <300ms latency",
                        "Engineered a Voice Agent Monitoring System with Twilio integration, analyzing call recordings through speaker diarization, latency tracking, and interruption detection",
                        "Designed and implemented a Multi-Agentic Chat Interface with Voltagent, enabling autonomous voice agents to collaborate and handle complex workflows",
                        "Integrated Trigger.dev for workflow orchestration and lifecycle monitoring",
                        "Developed a custom MCP for MongoDB–Google Sheets sync, enabling automated two-way data updates",
                        "Developed a Document Content Extraction Service with Chunkr + OCR, reducing retrieval latency",
                      ]}
                    />
                    
                    {/* Open Source Contribution */}
                    <ExperienceCard 
                      index={1}
                      position="Open Source Contributor"
                      company="GitHub - Hacktober Fest"
                      period="October 2023"
                      responsibilities={[
                        "Developed responsive web pages using Shadcn UI components, improving the user interface for cricket fans on the Howzat website during the ICC Mens Cricket World Cup 2023."
                      ]}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6 min-h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Programming Languages */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Code className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold">Programming Languages</h2>
                      </div>
                      <Card>
                        <CardContent className="p-4 pt-6">
                          <SkillBar name="TypeScript/JavaScript" level={90} index={0} />
                          <SkillBar name="Python" level={85} index={1} />
                          <SkillBar name="Java" level={75} index={2} />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Frontend Technologies */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <ExternalLink className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold">Frontend Technologies</h2>
                      </div>
                      <Card>
                        <CardContent className="p-4 pt-6">
                          <SkillBar name="React.js" level={90} index={0} />
                          <SkillBar name="Next.js" level={88} index={1} />
                          <SkillBar name="Tailwind CSS" level={85} index={2} />
                          <SkillBar name="HTML5/CSS3" level={92} index={3} />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Backend Technologies */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Server className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold">Backend Technologies</h2>
                      </div>
                      <Card>
                        <CardContent className="p-4 pt-6">
                          <SkillBar name="Node.js" level={88} index={0} />
                          <SkillBar name="Express.js" level={85} index={1} />
                          <SkillBar name="FastAPI" level={80} index={2} />
                          <SkillBar name="Spring Boot" level={75} index={3} />
                          <SkillBar name="RESTful APIs" level={90} index={4} />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Databases & Cloud */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Database className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold">Databases & Cloud</h2>
                      </div>
                      <Card>
                        <CardContent className="p-4 pt-6">
                          <SkillBar name="MongoDB" level={90} index={0} />
                          <SkillBar name="MySQL" level={82} index={1} />
                          <SkillBar name="AWS" level={78} index={2} />
                          <SkillBar name="Docker" level={75} index={3} />
                          <SkillBar name="Terraform" level={70} index={4} />
                        </CardContent>
                      </Card>
                    </div>

                    {/* AI & Integration */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-4">
                        <Cpu className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold">AI & Integration</h2>
                      </div>
                      <Card>
                        <CardContent className="p-4 pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <SkillBar name="LangChain" level={92} index={0} />
                              <SkillBar name="LangGraph" level={88} index={1} />
                              <SkillBar name="Voltagent" level={85} index={2} />
                            </div>
                            <div>
                              <SkillBar name="Model Context Protocol (MCP)" level={90} index={3} />
                              <SkillBar name="OCR" level={80} index={4} />
                              <SkillBar name="LiveKit SDK" level={85} index={5} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="min-h-[400px]">
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Education</h2>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative border-l border-muted pl-6"
                  >
                    <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-primary" />
                    
                    <Card className="mb-6 hover:border-primary/20 transition-colors">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-bold mb-2">Chaitanaya Bharathi Institute of Technology</h3>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                          <div>
                            <p className="text-muted-foreground">
                              B.E. - Computer Science and Engineering (AI and ML)
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge>CGPA: 8.9/10.0</Badge>
                            <span className="text-sm text-muted-foreground">Dec 2021 - May 2025 (Expected)</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2 text-sm">
                          <p>
                            <strong>Relevant Coursework:</strong> Artificial Intelligence, Machine Learning, 
                            Data Structures and Algorithms, Database Management Systems, Computer Networks.
                          </p>
                          <p>
                            <strong>Activities:</strong> Member of Neural Nexus CBIT, Web Development Lead at CBIT Photography Club.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="achievements" className="min-h-[400px]">
                  <div className="flex items-center gap-2 mb-6">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Achievements</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Card className="h-full hover:border-primary/20 transition-colors">
                        <CardContent className="flex items-start gap-4 p-6">
                          <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">Smart India Hackathon 2023</h3>
                            <p className="text-sm text-muted-foreground">
                              Selected as one of the top 10 teams from CBIT for the Smart India Hackathon 2023
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <Card className="h-full hover:border-primary/20 transition-colors">
                        <CardContent className="flex items-start gap-4 p-6">
                          <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                            <Code className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">LeetCode Rating</h3>
                            <p className="text-sm text-muted-foreground">
                              Achieved a peak rating of 1600+ on LeetCode, ranking in the top 20 percent globally
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Card className="h-full hover:border-primary/20 transition-colors">
                        <CardContent className="flex items-start gap-4 p-6">
                          <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                            <Code className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">CodeChef Status</h3>
                            <p className="text-sm text-muted-foreground">
                              Attained 2-star Coder status on CodeChef with a highest rating of 1532
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <Card className="h-full hover:border-primary/20 transition-colors">
                        <CardContent className="flex items-start gap-4 p-6">
                          <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">TS-EAMCET Rank</h3>
                            <p className="text-sm text-muted-foreground">
                              Secured a top rank of 1818 in the highly competitive TS-EAMCET examination
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}