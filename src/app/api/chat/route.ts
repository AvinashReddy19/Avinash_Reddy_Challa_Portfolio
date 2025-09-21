// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createPortfolioAssistant } from "@/lib/ai/agent";
import { ChatMessage } from "@/lib/ai/types";

// This is a simple in-memory store for the chat history
// In a production environment, you'd use a database
const CHAT_HISTORY: Record<string, ChatMessage[]> = {};

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

    // Create or retrieve the assistant
    const assistant = await createPortfolioAssistant();

    // Get or initialize chat history
    if (!CHAT_HISTORY[chatId]) {
      CHAT_HISTORY[chatId] = [];
    }
    
    // Get the current messages
    const currentMessages = CHAT_HISTORY[chatId];
    
    // Add the new user message
    const newUserMessage: ChatMessage = {
      role: "human",
      content: message,
    };
    
    const updatedMessages = [...currentMessages, newUserMessage];

    // Execute the agent
    const result = await assistant.invoke({
      messages: updatedMessages,
      context: "",
      response: "",
    });

    // Update the chat history
    CHAT_HISTORY[chatId] = result.messages;

    // Extract the assistant's response (the last message)
    const assistantResponse = result.messages[result.messages.length - 1];

    return NextResponse.json({
      response: assistantResponse.content,
    });
  } catch (error: any) {
    console.error("Error in chat endpoint:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}