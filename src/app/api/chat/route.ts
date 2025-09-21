// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createPortfolioAssistant } from "@/lib/ai/assistant";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// In-memory chat history store
const CHAT_HISTORY: Record<string, Array<HumanMessage | AIMessage>> = {};

export async function POST(request: NextRequest) {
  try {
    const { message, chatId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if Groq API key is configured
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Create the portfolio assistant
    const assistant = createPortfolioAssistant();

    // Get or initialize chat history
    if (!CHAT_HISTORY[chatId]) {
      CHAT_HISTORY[chatId] = [];
    }
    
    // Add the new user message
    const userMessage = new HumanMessage(message);
    
    // Generate a response
    const response = await assistant.generateResponse(
      message, 
      CHAT_HISTORY[chatId]
    );
    
    // Create assistant message
    const assistantMessage = new AIMessage(response);
    
    // Update the conversation history
    CHAT_HISTORY[chatId] = [
      ...CHAT_HISTORY[chatId],
      userMessage,
      assistantMessage
    ];
    
    // Keep only the last 10 messages to prevent context window issues
    if (CHAT_HISTORY[chatId].length > 20) {
      CHAT_HISTORY[chatId] = CHAT_HISTORY[chatId].slice(-20);
    }

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Something went wrong", details: errorMessage },
      { status: 500 }
    );
  }
}