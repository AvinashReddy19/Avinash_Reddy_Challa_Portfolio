// src/lib/ai/models.ts
import { ChatGroq } from "@langchain/groq";

export function getGroqModel() {
  // Check if Groq API key is configured
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  
  // Initialize the Groq model with Mixtral
  return new ChatGroq({
    model: "llama-3.3-70b-versatile",   // ✅ updated to Mixtral
    temperature: 0.5,
  });
}