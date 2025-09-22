// src/lib/data/projects-data.ts
export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: "ai" | "fullstack" | "integration" | "other";
};

export const projectsData: Project[] = [
  {
    id: "healthcare-platform",
    title: "10xR Multi-Agentic Healthcare Platform",
    description: "A production-grade healthcare management platform with field visit scheduling, care plan management, and automated communication.",
    longDescription: "Built a production-grade healthcare management platform enabling field visit scheduling, care plan management, and automated healthcare worker communication. Developed a comprehensive analytics dashboard, care plan reports, and an incident reporting system with optimized Spring Boot backend. Created a chat-based agent creation interface using VoltAgent's multi-agentic framework, leveraging contextual reasoning, structured response generation, and sales-focused task automation.",
    tags: ["Next.js", "MongoDB", "TypeScript", "Java Spring Boot", "VoltAgent"],
    category: "ai",
    featured: true,
  },
  {
    id: "voice-analytics",
    title: "Voice AI Analytics & Transcription Platform",
    description: "Full-stack analytics system for AI voice call analysis with stereo audio processing and automated transcription services.",
    longDescription: "Architected a full-stack analytics system for AI voice call analysis with stereo audio processing, automated transcription services, and sophisticated conversation evaluation. Implemented cloud-based processing pipelines using AWS SQS for task queuing, Google Vertex AI for audio analysis, and scalable storage solutions handling audio files via DigitalOcean Spaces. Engineered a comprehensive evaluation framework leveraging OpenAI and Deepgram APIs to detect speech patterns, analyze agent performance, and provide real-time metrics including latency, interruptions, and scenario-based evaluations.",
    tags: ["Node.js", "TypeScript", "Python", "AWS", "OpenAI", "Deepgram"],
    category: "ai",
    featured: true,
  },
  {
    id: "mongodb-sheets",
    title: "MongoDB Sheets Integration Platform",
    description: "Scalable data integration platform connecting MongoDB with Google Sheets with secure authentication and multi-tenant support.",
    longDescription: "Built a scalable data integration platform connecting MongoDB with Google Sheets, featuring credential management, secure authentication, and support for multi-tenant synchronization. Developed a FastMCP-based API enabling batch operations, data transformation mappings, and real-time bidirectional sync with robust error handling.",
    tags: ["Python", "MongoDB", "Google Sheets API", "FastAPI", "AsyncIO"],
    category: "integration",
    featured: true,
  },
  {
    id: "research-assistant",
    title: "Smart Research Assistant",
    description: "Full-stack document analysis system leveraging RAG with LangChain and FAISS vector store for intelligent querying of PDF documents.",
    longDescription: "Architected a full-stack document analysis system leveraging RAG (Retrieval-Augmented Generation) with LangChain and FAISS vector store to enable intelligent querying of PDF documents with accurate source citations. Implemented an optimized document processing pipeline with auto-chunking strategies, custom embedding fallbacks, and batch processing for large documents. Developed a responsive Next.js frontend with a real-time chat interface, drag-and-drop document upload capabilities, and document summarization features.",
    tags: ["Next.js", "FastAPI", "LangChain", "RAG", "FAISS", "Groq API", "Docker"],
    category: "ai",
  },
  {
    id: "linkedin-analyzer",
    title: "Recruiter Helper: LinkedIn Profile Analyzer",
    description: "Automated tool for capturing LinkedIn profiles and matching candidates against job descriptions using OpenAI APIs.",
    longDescription: "Developed an automated tool using Selenium WebDriver to navigate LinkedIn profiles, capture full-page screenshots, and extract text with Tesseract OCR for seamless data collection. Integrated OpenAI GPT API to summarize extracted profile information and match candidates against job descriptions, providing data-driven hiring recommendations.",
    tags: ["Python", "Selenium", "Tesseract OCR", "OpenAI API"],
    category: "ai",
  },
  {
    id: "test-buddy",
    title: "TestBuddy: Online Test Conducting Platform",
    description: "Full-stack web application for educators to create and manage coding questions, with real-time code evaluation.",
    longDescription: "Developed a full-stack web application for educators to create, manage, and assess a large number of coding questions, significantly boosting teaching capabilities. Implemented a real-time code evaluation and instant feedback system for students, resulting in a 50% reduction in assessment time and improved learning outcomes. Created a comprehensive dashboard for students to track performance metrics with 95% data accuracy for informed learning progress.",
    tags: ["React", "MongoDB", "Node.js", "Express.js", "RESTful APIs"],
    category: "fullstack",
  },
  {
    id: "skin-disease",
    title: "Skin Disease Detection",
    description: "CNN-based model for skin disease detection with an intuitive web interface for image uploads and real-time detection results.",
    longDescription: "Designed and trained a Convolutional Neural Network (CNN) model for skin disease detection, achieving 83% accuracy on diverse test datasets. Built an intuitive web interface using HTML/CSS for streamlined image uploads and real-time, precise skin disease detection results. Developed a Flask-based backend for efficient data processing and API communication with the frontend, improving application responsiveness.",
    tags: ["TensorFlow", "Python", "Flask", "HTML/CSS"],
    category: "ai",
  },
];