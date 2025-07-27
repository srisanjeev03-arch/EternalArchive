import {
  MessageSquare, FileText, Zap, PenTool, CheckCircle2, Languages,
  Volume2, Heart, Briefcase, Eye, Image, FilePlus, Scissors,
  Minimize, RefreshCw, ScanText, Lock, RotateCw, Droplets,
  Edit3, FileSignature, Type, Mail, Repeat, ClipboardList,
  Snowflake, MessageCircle, Folder, Users, Reply
} from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'ai' | 'pdf' | 'email';
}

export const aiTools: Tool[] = [
  {
    id: 'text-summarizer',
    title: 'AI Text Summarizer',
    description: 'Condense long texts into concise, meaningful summaries while preserving key information.',
    icon: FileText,
    category: 'ai'
  },
  {
    id: 'gpt-chatbot',
    title: 'GPT-powered Chatbot',
    description: 'Have intelligent conversations with an advanced AI assistant for any topic or question.',
    icon: MessageSquare,
    category: 'ai'
  },
  {
    id: 'code-assistant',
    title: 'Code Assistant',
    description: 'Get help with programming, code review, debugging, and technical solutions.',
    icon: Zap,
    category: 'ai'
  },
  {
    id: 'content-generator',
    title: 'Content Generator',
    description: 'Create engaging blog posts, ads, captions, and product descriptions with AI.',
    icon: PenTool,
    category: 'ai'
  },
  {
    id: 'grammar-checker',
    title: 'Grammar & Style Checker',
    description: 'Improve your writing with advanced grammar correction and style suggestions.',
    icon: CheckCircle2,
    category: 'ai'
  },
  {
    id: 'translator',
    title: 'AI Translator',
    description: 'Translate text between multiple languages with context and tone awareness.',
    icon: Languages,
    category: 'ai'
  },
  {
    id: 'text-to-speech',
    title: 'Text-to-Speech Generator',
    description: 'Convert text into natural-sounding speech with various voice options.',
    icon: Volume2,
    category: 'ai'
  },
  {
    id: 'sentiment-analyzer',
    title: 'Sentiment Analyzer',
    description: 'Analyze the emotional tone and sentiment of text content.',
    icon: Heart,
    category: 'ai'
  },
  {
    id: 'resume-optimizer',
    title: 'Resume Optimizer',
    description: 'Enhance your resume with AI-powered suggestions and formatting improvements.',
    icon: Briefcase,
    category: 'ai'
  },
  {
    id: 'screen-analyzer',
    title: 'Screen/Text Analyzer',
    description: 'Analyze screenshots or text input for insights and information extraction.',
    icon: Eye,
    category: 'ai'
  },
  {
    id: 'image-generator',
    title: 'Image Generator',
    description: 'Create stunning images from text descriptions using advanced AI models.',
    icon: Image,
    category: 'ai'
  }
];

export const pdfTools: Tool[] = [
  {
    id: 'merge-pdf',
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into a single document with custom ordering.',
    icon: FilePlus,
    category: 'pdf'
  },
  {
    id: 'split-pdf',
    title: 'Split PDFs',
    description: 'Extract specific pages or split PDF into multiple separate documents.',
    icon: Scissors,
    category: 'pdf'
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality for easier sharing.',
    icon: Minimize,
    category: 'pdf'
  },
  {
    id: 'convert-pdf',
    title: 'Convert to/from PDF',
    description: 'Convert PDFs to DOCX, PPT, JPG and other formats, or create PDFs from various files.',
    icon: RefreshCw,
    category: 'pdf'
  },
  {
    id: 'ocr-scanner',
    title: 'OCR Scanner',
    description: 'Extract text from scanned PDFs and images with optical character recognition.',
    icon: ScanText,
    category: 'pdf'
  },
  {
    id: 'pdf-password',
    title: 'Password Add/Remove',
    description: 'Secure your PDFs with passwords or remove existing password protection.',
    icon: Lock,
    category: 'pdf'
  },
  {
    id: 'page-reorder',
    title: 'Page Reordering',
    description: 'Rearrange, duplicate, or delete pages in your PDF documents.',
    icon: RefreshCw,
    category: 'pdf'
  },
  {
    id: 'rotate-pages',
    title: 'Rotate Pages',
    description: 'Rotate PDF pages to the correct orientation for better viewing.',
    icon: RotateCw,
    category: 'pdf'
  },
  {
    id: 'add-watermark',
    title: 'Add Watermark',
    description: 'Add text or image watermarks to protect and brand your PDF documents.',
    icon: Droplets,
    category: 'pdf'
  },
  {
    id: 'pdf-annotator',
    title: 'PDF Annotator',
    description: 'Highlight, underline, add comments and annotations to PDF documents.',
    icon: Edit3,
    category: 'pdf'
  },
  {
    id: 'fill-sign-pdf',
    title: 'Fill & Sign PDFs',
    description: 'Fill out PDF forms and add digital signatures electronically.',
    icon: FileSignature,
    category: 'pdf'
  },
  {
    id: 'pdf-to-text',
    title: 'PDF to Text',
    description: 'Extract all text content from PDF documents for editing or analysis.',
    icon: Type,
    category: 'pdf'
  },
  {
    id: 'pdf-metadata',
    title: 'Edit PDF Metadata',
    description: 'View and modify PDF properties like title, author, subject, and keywords.',
    icon: Edit3,
    category: 'pdf'
  }
];

export const emailTools: Tool[] = [
  {
    id: 'email-generator',
    title: 'Email Generator',
    description: 'Create professional business, casual, or formal emails with AI assistance.',
    icon: Mail,
    category: 'email'
  },
  {
    id: 'email-rewriter',
    title: 'Email Rewriter',
    description: 'Improve email clarity, tone, and professionalism with intelligent rewriting.',
    icon: Repeat,
    category: 'email'
  },
  {
    id: 'email-summarizer',
    title: 'Email Summarizer',
    description: 'Summarize long email threads and conversations into key points.',
    icon: ClipboardList,
    category: 'email'
  },
  {
    id: 'cold-email-generator',
    title: 'Cold Email Generator',
    description: 'Create effective cold outreach emails for sales and networking.',
    icon: Snowflake,
    category: 'email'
  },
  {
    id: 'smart-reply',
    title: 'Smart Reply Suggestions',
    description: 'Get AI-powered reply suggestions for quick and appropriate responses.',
    icon: MessageCircle,
    category: 'email'
  },
  {
    id: 'email-templates',
    title: 'Email Template Manager',
    description: 'Create, save, and manage reusable email templates for different purposes.',
    icon: Folder,
    category: 'email'
  },
  {
    id: 'bulk-personalizer',
    title: 'Bulk Email Personalizer',
    description: 'Personalize bulk emails using CSV data for mass customization.',
    icon: Users,
    category: 'email'
  },
  {
    id: 'follow-up-creator',
    title: 'Follow-Up Email Creator',
    description: 'Generate appropriate follow-up emails for various scenarios and timings.',
    icon: Reply,
    category: 'email'
  }
];

export const allTools = [...aiTools, ...pdfTools, ...emailTools];