// src/lib/ai/assistant.ts
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatGroq } from "@langchain/groq";
import { SYSTEM_PROMPT } from "./prompt-templates";
import { getGroqModel } from "./model";
import { BaseMessage } from "@langchain/core/messages";
import { resumeData } from "../data/resume-data";

// Helper function to extract relevant context from a messagee
function getRelevantContextFromResume(message: string) {
  const lowerMessage = message.toLowerCase();
  let context = "";
  
  // Check if asking about skills
  if (lowerMessage.includes("skill") || lowerMessage.includes("technolog")) {
    context += "Skills: " + Object.entries(resumeData.skills)
      .map(([category, skills]) => `${category}: ${skills.join(", ")}`)
      .join("\n");
  }
  
  // Check if asking about projects
  if (lowerMessage.includes("project")) {
    context += "\nProjects: " + resumeData.projects
      .map(project => `${project.title}: ${project.description.slice(0, 100)}...`)
      .join("\n");
  }
  
  // Check if asking about experience
  if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
    context += "\nExperience: " + resumeData.experience
      .map(exp => `${exp.position} at ${exp.company} (${exp.period})`)
      .join("\n");
  }
  
  return context;
}

// Create and configure the portfolio assistant
export class PortfolioAssistant {
  private model: ChatGroq;
  private basePrompt: ChatPromptTemplate;
  
  constructor() {
    // Initialize the model
    this.model = getGroqModel();
    
    // Create the base prompt template
    this.basePrompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_PROMPT],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);
  }
  
  // Method to generate a response based on conversation history
  async generateResponse(message: string, history: BaseMessage[] = []): Promise<string> {
    try {
      // Extract relevant context from the message
      const relevantContext = getRelevantContextFromResume(message);
      
      // Enhance the system prompt if we have relevant context
      let enhancedSystemPrompt = SYSTEM_PROMPT;
      if (relevantContext && relevantContext.length > 0) {
        enhancedSystemPrompt += "\n\nRelevant Information for this query:\n" + relevantContext;
      }
      
      // Create an enhanced prompt with the additional context
      const enhancedPrompt = ChatPromptTemplate.fromMessages([
        ["system", enhancedSystemPrompt],
        new MessagesPlaceholder("history"),
        ["human", "{input}"],
      ]);
      
      // Create the chain
      const chain = RunnableSequence.from([
        enhancedPrompt,
        this.model,
        new StringOutputParser(),
      ]);
      
      // Generate the response
      const response = await chain.invoke({
        input: message,
        history,
      });
      
      return response;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I'm sorry, I encountered an error while generating a response. Please try again in a moment.";
    }
  }
}

// Export a singleton instance
export const createPortfolioAssistant = () => {
  return new PortfolioAssistant();
};