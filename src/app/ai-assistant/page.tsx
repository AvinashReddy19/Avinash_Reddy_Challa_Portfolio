
// src/app/ai-assistant/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, User, RefreshCw, Info, Loader2 } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

const exampleQuestions = [
  "What are Avinash's main skills?",
  "Tell me about his experience with AI voice agents",
  "What projects has he worked on?",
  "What technologies does he use for backend development?",
  "What is his educational background?",
  "What achievements does Avinash have?",
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: "Hello! I'm AviAssist, Avinash's portfolio assistant. I can answer questions about his skills, experience, projects, and education. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatId, setChatId] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate a unique chat ID when the component mounts
  useEffect(() => {
    setChatId(uuidv4())
  }, [])

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }, [messages])

  // Handle sending a message
  const handleSendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real implementation, you'd call your API
      // This is a simulation for demo purposes
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          chatId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      
      // Add an error message
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "system",
          content: "I'm sorry, there was an error processing your request. Please try again later.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle pressing Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Reset the chat
  const resetChat = () => {
    setChatId(uuidv4())
    setMessages([
      {
        id: "welcome",
        role: "system",
        content: "Hello! I'm AviAssist, Avinash's portfolio assistant. I can answer questions about his skills, experience, projects, and education. How can I help you today?",
        timestamp: new Date(),
      },
    ])
  }

  // Handle clicking an example question
  const handleExampleClick = (question: string) => {
    setInput(question)
    inputRef.current?.focus()
  }

  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tighter mb-4 md:text-4xl">
        AI Assistant Demo
      </h1>
      <p className="text-muted-foreground max-w-2xl mb-8">
        Meet AviAssist, an AI-powered assistant built with LangGraph. Ask questions about Avinash's skills, experience, projects, or education.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <Card className="lg:col-span-2 h-[600px] flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>AviAssist</CardTitle>
                <CardDescription>
                  Avinash's portfolio assistant
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    } items-start gap-2 max-w-[80%]`}
                  >
                    <Avatar className={`h-8 w-8 mt-0.5 ${message.role === "system" ? "bg-muted" : ""}`}>
                      {message.role === "user" ? (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      ) : message.role === "assistant" ? (
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback>
                          <Info className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.role === "assistant"
                          ? "bg-muted"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex flex-row items-start gap-2 max-w-[80%]">
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <CardFooter className="pt-0 pb-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                ref={inputRef}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-grow"
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Reset Chat"
                onClick={resetChat}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* About Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About AviAssist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AviAssist is powered by LangGraph and Groq's Llama 3 model. This combination provides a fast, responsive AI experience with the advanced multi-agent capabilities of LangGraph.
              </p>
              <p>
                This assistant has been trained on Avinash's resume data and can answer questions about his:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Professional experience</li>
                <li>Projects and achievements</li>
                <li>Technical skills</li>
                <li>Education and background</li>
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
              <p className="text-sm text-muted-foreground italic">
                Note: This is a demonstration of agentic AI capabilities. In a production environment, the assistant would be trained on more comprehensive data and could handle more complex tasks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {exampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-2 px-3 text-left"
                    onClick={() => handleExampleClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
