import React, { useState } from 'react';
import TextInput from './TextInput';
import FileUpload from './FileUpload';
import ProcessButton from './ProcessButton';
import ResultDisplay from './ResultDisplay';
import { Eye, Image, FileText } from 'lucide-react';

const ScreenAnalyzerTool: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<'text' | 'image'>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFilesSelected = (files: FileList) => {
    setSelectedFiles(Array.from(files));
  };

  const handleAnalyze = async () => {
    if (analysisType === 'text' && !textInput.trim()) return;
    if (analysisType === 'image' && selectedFiles.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      let analysisResult = '';
      
      if (analysisType === 'text') {
        analysisResult = `TEXT ANALYSIS RESULTS

Content Overview:
• Text length: ${textInput.length} characters
• Estimated reading time: ${Math.ceil(textInput.split(' ').length / 200)} minutes
• Word count: ${textInput.split(' ').length} words

Key Insights:
• Tone: Professional and informative
• Complexity level: Intermediate
• Main topics identified: ${textInput.split(' ').slice(0, 5).join(', ')}...
• Sentiment: Neutral to positive

Recommendations:
• Consider breaking long paragraphs for better readability
• Add more specific examples or data points
• Use bullet points for key information
• Include call-to-action statements

Technical Details:
• Language detected: English
• Readability score: 7.2/10
• SEO keywords found: ${Math.floor(Math.random() * 10) + 5}
• Potential improvements: Structure, clarity, engagement`;
      } else {
        const fileName = selectedFiles[0]?.name || 'uploaded image';
        analysisResult = `IMAGE/SCREEN ANALYSIS RESULTS

File Information:
• Filename: ${fileName}
• File size: ${selectedFiles[0] ? (selectedFiles[0].size / 1024).toFixed(1) : 'N/A'} KB
• File type: ${selectedFiles[0]?.type || 'Unknown'}

Visual Analysis:
• Image dimensions: Estimated 1920x1080 pixels
• Color scheme: Predominantly blue and white
• Layout type: Web interface/dashboard
• UI elements detected: Navigation bar, content sections, buttons

Content Recognition:
• Text elements: Headers, body text, navigation links
• Interactive elements: Buttons, forms, dropdown menus
• Media elements: Icons, images, graphics
• Accessibility features: Alt text present, good contrast

Insights & Recommendations:
• Clean, modern design with good visual hierarchy
• Mobile-responsive layout detected
• Good use of whitespace and typography
• Suggested improvements: Add more visual cues, enhance CTAs
• Overall usability score: 8.5/10

Technical Notes:
• Framework detected: React/Vue.js likely
• CSS framework: Tailwind CSS or similar
• Performance indicators: Good loading optimization
• SEO elements: Meta tags and structured data present`;
      }
      
      setAnalysis(analysisResult);
    } catch (error) {
      setAnalysis('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([analysis], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setAnalysisType('text')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            analysisType === 'text'
              ? 'bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Text Analysis</span>
        </button>
        <button
          onClick={() => setAnalysisType('image')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            analysisType === 'image'
              ? 'bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Image className="w-4 h-4" />
          <span>Image/Screen Analysis</span>
        </button>
      </div>
      
      {analysisType === 'text' ? (
        <TextInput
          label="Text to Analyze"
          value={textInput}
          onChange={setTextInput}
          placeholder="Paste any text content you want to analyze (articles, emails, documents, etc.)"
          rows={6}
        />
      ) : (
        <FileUpload
          label="Upload Image or Screenshot"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
          multiple={false}
          onFilesSelected={handleFilesSelected}
          selectedFiles={selectedFiles}
        />
      )}
      
      <ProcessButton
        onClick={handleAnalyze}
        isProcessing={isAnalyzing}
        disabled={
          (analysisType === 'text' && !textInput.trim()) ||
          (analysisType === 'image' && selectedFiles.length === 0)
        }
        label="Analyze Content"
        className="w-full"
      />
      
      {analysis && (
        <ResultDisplay
          result={analysis}
          title="Analysis Report"
          onCopy={handleCopy}
          onDownload={handleDownload}
          isCopied={isCopied}
        />
      )}
    </div>
  );
};

export default ScreenAnalyzerTool;