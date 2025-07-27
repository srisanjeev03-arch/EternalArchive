import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import CategoryTabs, { Category } from './components/CategoryTabs';
import ToolGrid from './components/ToolGrid';
import ToolModal from './components/ToolModal';
import BasicTool from './components/tools/BasicTool';
import ChatTool from './components/tools/ChatTool';
import FileTool from './components/tools/FileTool';
import AdvancedTextTool from './components/tools/AdvancedTextTool';
import ImageGeneratorTool from './components/tools/ImageGeneratorTool';
import TextToSpeechTool from './components/tools/TextToSpeechTool';
import ResumeOptimizerTool from './components/tools/ResumeOptimizerTool';
import ScreenAnalyzerTool from './components/tools/ScreenAnalyzerTool';
import EmailTemplateTool from './components/tools/EmailTemplateTool';
import BulkPersonalizerTool from './components/tools/BulkPersonalizerTool';
import { aiTools, pdfTools, emailTools, Tool } from './data/tools';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('ai');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const getToolsByCategory = (category: Category): Tool[] => {
    switch (category) {
      case 'ai':
        return aiTools;
      case 'pdf':
        return pdfTools;
      case 'email':
        return emailTools;
      default:
        return [];
    }
  };

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleCloseModal = () => {
    setSelectedTool(null);
  };

  const simulateAIProcess = async (input: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `This is a demo response for "${input}". In a real implementation, this would connect to actual AI services like OpenAI GPT, Google's AI, or other providers to process your request with intelligent results.`;
  };

  const simulateFileProcess = async (files: FileList): Promise<void> => {
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    alert(`Successfully processed ${files.length} file(s). In a real implementation, this would perform the actual file operations.`);
  };

  const renderToolContent = (tool: Tool) => {
    switch (tool.id) {
      case 'gpt-chatbot':
        return <ChatTool />;
      
      case 'text-summarizer':
        return (
          <AdvancedTextTool
            inputLabel="Text to Summarize"
            inputPlaceholder="Paste your long text here..."
            processLabel="Summarize Text"
            onProcess={simulateAIProcess}
            resultTitle="Summary"
            showOptions={true}
            options={[
              {
                key: 'length',
                label: 'Summary Length',
                type: 'select',
                options: ['Short', 'Medium', 'Long'],
                defaultValue: 'Medium'
              },
              {
                key: 'bullets',
                label: 'Use Bullet Points',
                type: 'checkbox',
                defaultValue: false
              }
            ]}
          />
        );
      
      case 'code-assistant':
        return (
          <AdvancedTextTool
            inputLabel="Code or Programming Question"
            inputPlaceholder="Describe your coding problem or paste your code..."
            processLabel="Get Code Help"
            onProcess={simulateAIProcess}
            resultTitle="Code Solution"
            showOptions={true}
            options={[
              {
                key: 'language',
                label: 'Programming Language',
                type: 'select',
                options: ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Other'],
                defaultValue: 'JavaScript'
              },
              {
                key: 'includeComments',
                label: 'Include Comments',
                type: 'checkbox',
                defaultValue: true
              }
            ]}
          />
        );
      
      case 'content-generator':
        return (
          <AdvancedTextTool
            inputLabel="Content Brief"
            inputPlaceholder="Describe what content you need (e.g., blog post about AI, product description for shoes, social media caption)"
            processLabel="Generate Content"
            onProcess={simulateAIProcess}
            resultTitle="Generated Content"
            showOptions={true}
            options={[
              {
                key: 'contentType',
                label: 'Content Type',
                type: 'select',
                options: ['Blog Post', 'Product Description', 'Social Media', 'Email', 'Ad Copy'],
                defaultValue: 'Blog Post'
              },
              {
                key: 'tone',
                label: 'Tone',
                type: 'select',
                options: ['Professional', 'Casual', 'Friendly', 'Formal', 'Creative'],
                defaultValue: 'Professional'
              },
              {
                key: 'wordCount',
                label: 'Target Word Count',
                type: 'number',
                defaultValue: 300
              }
            ]}
          />
        );
      
      case 'grammar-checker':
        return (
          <AdvancedTextTool
            inputLabel="Text to Check"
            inputPlaceholder="Enter your text for grammar and style checking..."
            processLabel="Check Grammar"
            onProcess={simulateAIProcess}
            resultTitle="Corrected Text"
            showOptions={true}
            options={[
              {
                key: 'checkType',
                label: 'Check Type',
                type: 'select',
                options: ['Grammar Only', 'Grammar + Style', 'Full Review'],
                defaultValue: 'Grammar + Style'
              },
              {
                key: 'suggestions',
                label: 'Show Suggestions',
                type: 'checkbox',
                defaultValue: true
              }
            ]}
          />
        );
      
      case 'translator':
        return (
          <AdvancedTextTool
            inputLabel="Text to Translate"
            inputPlaceholder="Enter text in any language..."
            processLabel="Translate"
            onProcess={simulateAIProcess}
            resultTitle="Translation"
            showOptions={true}
            options={[
              {
                key: 'targetLanguage',
                label: 'Target Language',
                type: 'select',
                options: ['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean'],
                defaultValue: 'Spanish'
              },
              {
                key: 'tone',
                label: 'Translation Tone',
                type: 'select',
                options: ['Formal', 'Casual', 'Business', 'Academic'],
                defaultValue: 'Formal'
              }
            ]}
          />
        );
      
      case 'text-to-speech':
        return <TextToSpeechTool />;
      
      case 'sentiment-analyzer':
        return (
          <AdvancedTextTool
            inputLabel="Text to Analyze"
            inputPlaceholder="Enter text to analyze sentiment..."
            processLabel="Analyze Sentiment"
            onProcess={simulateAIProcess}
            resultTitle="Sentiment Analysis"
            showOptions={true}
            options={[
              {
                key: 'analysisType',
                label: 'Analysis Type',
                type: 'select',
                options: ['Basic Sentiment', 'Detailed Emotions', 'Business Context'],
                defaultValue: 'Basic Sentiment'
              }
            ]}
          />
        );
      
      case 'resume-optimizer':
        return <ResumeOptimizerTool />;
      
      case 'screen-analyzer':
        return <ScreenAnalyzerTool />;
      
      case 'image-generator':
        return <ImageGeneratorTool />;
      
      case 'merge-pdf':
        return (
          <FileTool
            title="Merge Multiple PDFs"
            description="Select multiple PDF files to merge them into a single document. Files will be combined in the order you select them."
            acceptedFiles=".pdf"
            multiple={true}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'split-pdf':
        return (
          <FileTool
            title="Split PDF"
            description="Upload a PDF file to split it into separate pages or extract specific page ranges."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'compress-pdf':
        return (
          <FileTool
            title="Compress PDF"
            description="Reduce the file size of your PDF while maintaining quality. Perfect for sharing or storage."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'convert-pdf':
        return (
          <FileTool
            title="Convert PDF"
            description="Convert PDFs to various formats (DOCX, PPT, JPG) or create PDFs from other file types."
            acceptedFiles=".pdf,.docx,.pptx,.jpg,.jpeg,.png"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'ocr-scanner':
        return (
          <FileTool
            title="OCR Text Extraction"
            description="Extract text from scanned PDFs and images using optical character recognition."
            acceptedFiles=".pdf,.jpg,.jpeg,.png,.bmp,.tiff"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'pdf-password':
        return (
          <FileTool
            title="PDF Password Protection"
            description="Add password protection to PDFs or remove existing passwords from your documents."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'page-reorder':
        return (
          <FileTool
            title="Reorder PDF Pages"
            description="Rearrange, duplicate, or delete specific pages in your PDF documents."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'rotate-pages':
        return (
          <FileTool
            title="Rotate PDF Pages"
            description="Rotate pages in your PDF to the correct orientation (90°, 180°, 270°)."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'add-watermark':
        return (
          <FileTool
            title="Add Watermark"
            description="Add text or image watermarks to your PDF documents for branding or protection."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'pdf-annotator':
        return (
          <FileTool
            title="PDF Annotation"
            description="Add highlights, underlines, comments, and annotations to your PDF documents."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'fill-sign-pdf':
        return (
          <FileTool
            title="Fill & Sign PDFs"
            description="Fill out PDF forms and add digital signatures to complete your documents."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'pdf-to-text':
        return (
          <FileTool
            title="PDF to Text Conversion"
            description="Extract all text content from PDF documents for editing or analysis."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'pdf-metadata':
        return (
          <FileTool
            title="Edit PDF Metadata"
            description="View and modify PDF properties including title, author, subject, and keywords."
            acceptedFiles=".pdf"
            multiple={false}
            onProcess={simulateFileProcess}
          />
        );
      
      case 'email-generator':
        return (
          <AdvancedTextTool
            inputLabel="Email Requirements"
            inputPlaceholder="Describe the email you need (e.g., business inquiry, follow-up, thank you note, complaint, etc.)"
            processLabel="Generate Email"
            onProcess={simulateAIProcess}
            resultTitle="Generated Email"
            showOptions={true}
            options={[
              {
                key: 'emailType',
                label: 'Email Type',
                type: 'select',
                options: ['Business', 'Casual', 'Formal', 'Follow-up', 'Thank You', 'Complaint'],
                defaultValue: 'Business'
              },
              {
                key: 'tone',
                label: 'Tone',
                type: 'select',
                options: ['Professional', 'Friendly', 'Direct', 'Polite'],
                defaultValue: 'Professional'
              }
            ]}
          />
        );
      
      case 'email-rewriter':
        return (
          <AdvancedTextTool
            inputLabel="Email to Rewrite"
            inputPlaceholder="Paste your email draft here for improvement..."
            processLabel="Rewrite Email"
            onProcess={simulateAIProcess}
            resultTitle="Rewritten Email"
            showOptions={true}
            options={[
              {
                key: 'focus',
                label: 'Focus On',
                type: 'select',
                options: ['Clarity', 'Professionalism', 'Brevity', 'Friendliness'],
                defaultValue: 'Clarity'
              },
              {
                key: 'keepOriginalTone',
                label: 'Keep Original Tone',
                type: 'checkbox',
                defaultValue: true
              }
            ]}
          />
        );
      
      case 'email-summarizer':
        return (
          <AdvancedTextTool
            inputLabel="Email Thread to Summarize"
            inputPlaceholder="Paste the long email thread or conversation here..."
            processLabel="Summarize Thread"
            onProcess={simulateAIProcess}
            resultTitle="Email Summary"
            showOptions={true}
            options={[
              {
                key: 'summaryType',
                label: 'Summary Type',
                type: 'select',
                options: ['Key Points', 'Action Items', 'Full Summary'],
                defaultValue: 'Key Points'
              }
            ]}
          />
        );
      
      case 'cold-email-generator':
        return (
          <AdvancedTextTool
            inputLabel="Cold Email Details"
            inputPlaceholder="Describe your cold email purpose, target audience, and key message..."
            processLabel="Generate Cold Email"
            onProcess={simulateAIProcess}
            resultTitle="Cold Email"
            showOptions={true}
            options={[
              {
                key: 'industry',
                label: 'Target Industry',
                type: 'select',
                options: ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Other'],
                defaultValue: 'Technology'
              },
              {
                key: 'approach',
                label: 'Approach Style',
                type: 'select',
                options: ['Direct', 'Consultative', 'Value-First', 'Relationship-Building'],
                defaultValue: 'Value-First'
              }
            ]}
          />
        );
      
      case 'smart-reply':
        return (
          <AdvancedTextTool
            inputLabel="Email to Reply To"
            inputPlaceholder="Paste the email you received and want to reply to..."
            processLabel="Generate Reply Suggestions"
            onProcess={simulateAIProcess}
            resultTitle="Reply Suggestions"
            showOptions={true}
            options={[
              {
                key: 'replyType',
                label: 'Reply Type',
                type: 'select',
                options: ['Quick Response', 'Detailed Response', 'Polite Decline', 'Request More Info'],
                defaultValue: 'Quick Response'
              }
            ]}
          />
        );
      
      case 'email-templates':
        return <EmailTemplateTool />;
      
      case 'bulk-personalizer':
        return <BulkPersonalizerTool />;
      
      case 'follow-up-creator':
        return (
          <AdvancedTextTool
            inputLabel="Follow-up Context"
            inputPlaceholder="Describe the original interaction and what you're following up about..."
            processLabel="Create Follow-up"
            onProcess={simulateAIProcess}
            resultTitle="Follow-up Email"
            showOptions={true}
            options={[
              {
                key: 'timing',
                label: 'Follow-up Timing',
                type: 'select',
                options: ['First Follow-up', 'Second Follow-up', 'Final Follow-up'],
                defaultValue: 'First Follow-up'
              },
              {
                key: 'urgency',
                label: 'Urgency Level',
                type: 'select',
                options: ['Low', 'Medium', 'High'],
                defaultValue: 'Medium'
              }
            ]}
          />
        );
      
      default:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <tool.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {tool.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {tool.description}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                This tool is currently in development. The interface will include all the necessary controls and features for {tool.title.toLowerCase()}. In a production version, this would be a fully functional tool with appropriate input methods, processing capabilities, and result display.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI & PDF Toolkit for the Modern Web
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Powerful suite of AI tools, PDF utilities, and email assistants designed to streamline your workflow and boost productivity.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          
          <ToolGrid
            tools={getToolsByCategory(activeCategory)}
            onToolSelect={handleToolSelect}
            selectedTool={selectedTool}
          />
        </main>
        
        {selectedTool && (
          <ToolModal
            isOpen={!!selectedTool}
            onClose={handleCloseModal}
            title={selectedTool.title}
            icon={selectedTool.icon}
          >
            {renderToolContent(selectedTool)}
          </ToolModal>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;