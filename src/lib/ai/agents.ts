import { StateGraph, END } from "@langchain/langgraph";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { SYSTEM_PROMPT } from "./prompt-templates";
import { getGroqModel } from "./models";
import { resumeData } from "../data/resume-data";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

// Define the AgentState interface
export interface AgentState {
  messages: (AIMessage | HumanMessage)[];
  context: string;
  response: string;
  error?: string;
}

// Helper function to check if user is asking about resume topics
function getRelevantContextFromResume(message: string): string {
  const lowerMessage = message.toLowerCase();
  let context = "";
  if (lowerMessage.includes("skill") || lowerMessage.includes("technolog")) {
    context += "Skills: " + Object.entries(resumeData.skills)
      .map(([category, skills]) => `${category}: ${skills.join(", ")}`).join("\n");
  }
  if (lowerMessage.includes("project")) {
    context += "\nProjects: " + resumeData.projects
      .map(project => `${project.title}: ${project.description.slice(0, 100)}...`).join("\n");
  }
  if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
    context += "\nExperience: " + resumeData.experience
      .map(exp => `${exp.position} at ${exp.company} (${exp.period})`).join("\n");
  }
  return context;
}

// Node that extracts context from resume
async function extractContext(state: AgentState): Promise<Partial<AgentState>> {
  const lastMsg = state.messages[state.messages.length - 1];
  let context = "";
  if (lastMsg && lastMsg.type === "human") {
    context = getRelevantContextFromResume(lastMsg.content?.toString() || "");
  }
  return { context }; // Only returns the changed field
}

// Node that generates response using Groq model
async function generateResponse(state: AgentState): Promise<Partial<AgentState>> {
  try {
    const model = getGroqModel();
    let enhancedSystemPrompt = SYSTEM_PROMPT;
    if (state.context && state.context.length > 0) {
      enhancedSystemPrompt += "\n\nRelevant Information for this query:\n" + state.context;
    }
    const enhancedPrompt = ChatPromptTemplate.fromMessages([
      ["system", enhancedSystemPrompt],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);
    const chain = RunnableSequence.from([
      enhancedPrompt,
      model,
      new StringOutputParser(),
    ]);
    const lastMessage = state.messages[state.messages.length - 1];
    const userInput = lastMessage?.content?.toString() || "";
    const response = await chain.invoke({
      input: userInput,
      history: state.messages.slice(0, -1),
    });
    return { response, error: undefined };
  } catch (error) {
    return {
      error: "Error generating response: " + (error as Error).message,
      response: "I'm sorry, I encountered an error while generating a response.",
    };
  }
}

// Node that updates chat history
async function updateHistory(state: AgentState): Promise<Partial<AgentState>> {
  const newMessage = new AIMessage(state.response);
  return { messages: [...state.messages, newMessage] }; // Only messages updated
}

// Channel mapping for StateGraph (each state property)
const agentStateChannels = {
  messages: {
    update: (prev: (AIMessage | HumanMessage)[], next: (AIMessage | HumanMessage)[]) => next,
    default: () => [],
  },
  context: {
    update: (prev: string, next: string) => next,
    default: () => "",
  },
  response: {
    update: (prev: string, next: string) => next,
    default: () => "",
  },
  error: {
    update: (prev: string | undefined, next: string | undefined) => next,
    default: () => undefined,
  },
};

// Main export: create and compile the workflow
export async function createPortfolioAssistant() {
  // Instantiate StateGraph with correct channel mapping
  const workflow = new StateGraph<AgentState>(agentStateChannels);

  workflow.addNode("extractContext", extractContext);
  workflow.addNode("generateResponse", generateResponse);
  workflow.addNode("updateHistory", updateHistory);

  workflow.addEdge("extractContext", "generateResponse");
  workflow.addEdge("generateResponse", "updateHistory");
  workflow.addEdge("updateHistory", END);

  workflow.setEntryPoint("extractContext");
  return workflow.compile();
}
