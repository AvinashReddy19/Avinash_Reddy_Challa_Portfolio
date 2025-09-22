// src/lib/ai/types.ts
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";

export interface AgentState {
  messages: BaseMessage[];
  context: string;
  response: string;
  error?: string;
}
