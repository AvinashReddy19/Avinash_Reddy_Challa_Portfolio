
// src/lib/ai/models.ts
import { ChatGroq } from "@langchain/groq";

export function getGroqModel() {
  // Check if Groq API key is configured
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  
  // Initialize the Groq model with Llama 3 (8B parameter version)
  return new ChatGroq({
    model: "llama3-8b-8192", // 8K context window
    temperature: 0.5,
  });
}