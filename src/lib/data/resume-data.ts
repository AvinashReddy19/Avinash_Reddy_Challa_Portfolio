// src/lib/data/resume-data.ts
export const resumeData = {
    personalInfo: {
      name: "Avinash Reddy Challa",
      email: "avinash.challa2003@gmail.com",
      phone: "+91-7416937354",
      title: "AI Engineer & Software Developer",
    },
    education: {
      university: "Chaitanaya Bharathi Institute of Technology",
      degree: "Bachelor of Engineering - Computer Science and Engineering (AI and ML)",
      period: "December 2021 - May 2025",
      location: "Hyderabad, India",
      gpa: "8.9/10.0",
    },
    experience: [
      {
        position: "Software Developer - AI Engineer",
        company: "10xR",
        period: "May 2024 - Present",
        responsibilities: [
          "Architected a multilingual AI Voice Agent using LiveKit, integrating STT (Deepgram, Google) and TTS (Google, Cartesia) for real-time communication in 5+ languages with <300ms latency",
          "Engineered a Voice Agent Monitoring System with Twilio integration, analyzing call recordings through speaker diarization, latency tracking, and interruption detection",
          "Designed and implemented a Multi-Agentic Chat Interface with Voltagent, enabling autonomous voice agents to collaborate and handle complex workflows, improving automation efficiency and scalability",
          "Integrated Trigger.dev for workflow orchestration and lifecycle monitoring from a UI standpoint",
          "Developed a custom MCP for MongoDB–Google Sheets sync, enabling automated two-way data updates",
          "Developed a Document Content Extraction Service with Chunkr + OCR, reducing retrieval latency by chunking PDFs into searchable units",
          "Delivered full-stack features with Next.js frontend, Spring Boot backend, and MongoDB, building responsive UIs using Shadcn UI",
        ],
      },
      {
        position: "Open Source Contributor (Howzat - Frontend)",
        company: "Hacktober Fest - GitHub",
        period: "October 2023",
        responsibilities: [
          "Developed responsive web pages using Shadcn UI components, improving the user interface for cricket fans on the Howzat website during the ICC Men's Cricket World Cup 2023",
        ],
      },
    ],
    projects: [
      {
        title: "10xR Multi-Agentic Healthcare Platform",
        description: "Built a production-grade healthcare management platform enabling field visit scheduling, care plan management, and automated healthcare worker communication. Developed a comprehensive analytics dashboard, care plan reports, and an incident reporting system with optimized Spring Boot backend. Created a chat-based agent creation interface using VoltAgent's multi-agentic framework, leveraging contextual reasoning, structured response generation, and sales-focused task automation.",
        technologies: ["Next.js", "MongoDB", "TypeScript", "Java Spring Boot", "VoltAgent"],
      },
      {
        title: "Voice AI Analytics & Transcription Platform",
        description: "Architected a full-stack analytics system for AI voice call analysis with stereo audio processing, automated transcription services, and sophisticated conversation evaluation. Implemented cloud-based processing pipelines using AWS SQS for task queuing, Google Vertex AI for audio analysis, and scalable storage solutions handling audio files via DigitalOcean Spaces. Engineered a comprehensive evaluation framework leveraging OpenAI and Deepgram APIs to detect speech patterns, analyze agent performance, and provide real-time metrics including latency, interruptions, and scenario-based evaluations.",
        technologies: ["Node.js", "TypeScript", "Python", "AWS", "OpenAI", "Deepgram"],
      },
      {
        title: "MongoDB Sheets Integration Platform",
        description: "Built a scalable data integration platform connecting MongoDB with Google Sheets, featuring credential management, secure authentication, and support for multi-tenant synchronization. Developed a FastMCP-based API enabling batch operations, data transformation mappings, and real-time bidirectional sync with robust error handling.",
        technologies: ["Python", "MongoDB", "Google Sheets API", "FastAPI", "AsyncIO"],
      },
      {
        title: "Smart Research Assistant",
        description: "Architected a full-stack document analysis system leveraging RAG (Retrieval-Augmented Generation) with LangChain and FAISS vector store to enable intelligent querying of PDF documents with accurate source citations. Implemented an optimized document processing pipeline with auto-chunking strategies, custom embedding fallbacks, and batch processing for large documents, resulting in a system that handles documents of varying sizes efficiently. Developed a responsive Next.js frontend with a real-time chat interface, drag-and-drop document upload capabilities, and document summarization features, complemented by a FastAPI backend with comprehensive error handling and a containerized deployment pipeline.",
        technologies: ["Next.js", "FastAPI", "LangChain", "RAG", "FAISS", "Groq API", "Docker"],
      },
      {
        title: "Recruiter Helper: Automated LinkedIn Profile Analyzer",
        description: "Developed an automated tool using Selenium WebDriver to navigate LinkedIn profiles, capture full-page screenshots, and extract text with Tesseract OCR for seamless data collection. Integrated OpenAI GPT API to summarize extracted profile information and match candidates against job descriptions, providing data-driven hiring recommendations.",
        technologies: ["Python", "Selenium", "Tesseract OCR", "OpenAI API"],
      },
      {
        title: "TestBuddy: Online Test Conducting Platform",
        description: "Developed a full-stack web application for educators to create, manage, and assess a large number of coding questions, significantly boosting teaching capabilities. Implemented a real-time code evaluation and instant feedback system for students, resulting in a 50% reduction in assessment time and improved learning outcomes. Created a comprehensive dashboard for students to track performance metrics with 95% data accuracy for informed learning progress.",
        technologies: ["React", "MongoDB", "Node.js", "Express.js", "RESTful APIs"],
      },
      {
        title: "Skin Disease Detection",
        description: "Designed and trained a Convolutional Neural Network (CNN) model for skin disease detection, achieving 83% accuracy on diverse test datasets. Built an intuitive web interface using HTML/CSS for streamlined image uploads and real-time, precise skin disease detection results. Developed a Flask-based backend for efficient data processing and API communication with the frontend, improving application responsiveness.",
        technologies: ["TensorFlow", "Python", "Flask", "HTML/CSS"],
      },
    ],
    skills: {
      programmingLanguages: ["Python", "Java", "JavaScript", "TypeScript"],
      frontendTechnologies: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "shadcn/ui"],
      backendTechnologies: ["Node.js", "Express.js", "FastAPI", "Spring Boot", "RESTful APIs"],
      databasesAndCloud: ["MongoDB", "MySQL", "Supabase", "Amazon Web Services (AWS)", "Docker", "Terraform"],
      aiAndIntegration: ["LangChain", "LangGraph", "Voltagent", "Model Context Protocol (MCP)", "OCR"],
      developmentTools: ["Git", "GitHub", "Electron", "Selenium", "LiveKit SDK", "Google Sheets API"],
    },
    achievements: [
      "Selected as one of the top 10 teams from CBIT for the Smart India Hackathon 2023",
      "Achieved a peak rating of 1600+ on LeetCode, ranking in the top 20 percent globally",
      "Attained 2-star Coder status on CodeChef with a highest rating of 1532",
      "Served as Web Development Lead at Neural Nexus CBIT, mentoring junior developers",
      "Led coverage for 'Shruthi' and 50+ events as General Secretary of CBIT Photography Club",
      "Secured a top rank of 1818 in the highly competitive TS-EAMCET examination",
    ],
    interests: ["AI and Machine Learning", "Full-Stack Development", "Voice AI Systems", "Data Integration", "Open Source"],
  };