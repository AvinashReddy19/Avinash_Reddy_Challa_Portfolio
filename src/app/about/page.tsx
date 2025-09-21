// src/app/about/page.tsx
import { Briefcase, GraduationCap, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tighter mb-4 md:text-4xl">
        About Me
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Profile Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center mb-6">
                  {/* Replace with actual profile picture */}
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-primary/10">
                    {/* <Image 
                      src="/images/profile.jpg" 
                      alt="Avinash Reddy Challa" 
                      fill 
                      className="object-cover"
                    /> */}
                  </div>
                  <h2 className="font-bold mt-4">Avinash Reddy Challa</h2>
                  <p className="text-sm text-muted-foreground">AI Engineer & Software Developer</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Email:</div>
                  <div className="text-right">avinash.challa2003@gmail.com</div>
                  <div className="font-medium">Phone:</div>
                  <div className="text-right">+91-7416937354</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Chaitanaya Bharathi Institute of Technology</h3>
                  <p className="text-sm text-muted-foreground">B.E. - Computer Science and Engineering (AI and ML)</p>
                  <p className="text-sm">Dec 2021 - May 2025 (Expected)</p>
                  <p className="text-sm font-medium mt-1">CGPA: 8.9/10.0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Top 10 teams from CBIT for the Smart India Hackathon 2023</li>
                <li>• Peak LeetCode rating of 1600+, top 20% globally</li>
                <li>• 2-star Coder status on CodeChef (highest rating: 1532)</li>
                <li>• Top rank of 1818 in TS-EAMCET examination</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Professional Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                I am an AI Engineer and Software Developer specializing in creating intelligent, user-friendly applications. My expertise spans voice AI systems, full-stack development, and data integration solutions. I &apos; m passionate about building technology that combines cutting-edge AI capabilities with robust, scalable architecture to solve real-world problems.
              </p>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* 10xR */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h3 className="font-bold text-lg">Software Developer - AI Engineer</h3>
                    <div className="flex items-center mt-1 sm:mt-0">
                      <Badge>10xR</Badge>
                      <span className="text-sm text-muted-foreground ml-2">May 2024 - Present</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Architected a multilingual AI Voice Agent using LiveKit, integrating STT (Deepgram, Google) and TTS (Google, Cartesia) for real-time communication in 5+ languages with &lt;300ms latency</li>
                    <li>• Engineered a Voice Agent Monitoring System with Twilio integration, analyzing call recordings through speaker diarization, latency tracking, and interruption detection</li>
                    <li>• Designed and implemented a Multi-Agentic Chat Interface with Voltagent, enabling autonomous voice agents to collaborate and handle complex workflows</li>
                    <li>• Integrated Trigger.dev for workflow orchestration and lifecycle monitoring</li>
                    <li>• Developed a custom MCP for MongoDB–Google Sheets sync, enabling automated two-way data updates</li>
                    <li>• Developed a Document Content Extraction Service with Chunkr + OCR, reducing retrieval latency</li>
                  </ul>
                </div>

                {/* Hacktober Fest */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h3 className="font-bold text-lg">Open Source Contributor</h3>
                    <div className="flex items-center mt-1 sm:mt-0">
                      <Badge>GitHub - Hacktober Fest</Badge>
                      <span className="text-sm text-muted-foreground ml-2">October 2023</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Developed responsive web pages using Shadcn UI components, improving the user interface for cricket fans on the Howzat website during the ICC Mens Cricket World Cup 2023.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Skills */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Programming Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">Java</Badge>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Frontend Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React.js</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">HTML5</Badge>
                    <Badge variant="secondary">CSS3</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                    <Badge variant="secondary">shadcn/ui</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Backend Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">Express.js</Badge>
                    <Badge variant="secondary">FastAPI</Badge>
                    <Badge variant="secondary">Spring Boot</Badge>
                    <Badge variant="secondary">RESTful APIs</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Databases & Cloud</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">MongoDB</Badge>
                    <Badge variant="secondary">MySQL</Badge>
                    <Badge variant="secondary">Supabase</Badge>
                    <Badge variant="secondary">AWS</Badge>
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">Terraform</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">AI & Integration</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">LangChain</Badge>
                    <Badge variant="secondary">LangGraph</Badge>
                    <Badge variant="secondary">Voltagent</Badge>
                    <Badge variant="secondary">Model Context Protocol (MCP)</Badge>
                    <Badge variant="secondary">OCR</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}