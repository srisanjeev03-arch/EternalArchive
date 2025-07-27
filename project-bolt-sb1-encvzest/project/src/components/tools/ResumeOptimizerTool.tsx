import React, { useState } from 'react';
import TextInput from './TextInput';
import ProcessButton from './ProcessButton';
import ResultDisplay from './ResultDisplay';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  optimizedVersion: string;
}

const ResumeOptimizerTool: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleOptimize = async () => {
    if (!resumeText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate resume analysis
      const mockAnalysis: ResumeAnalysis = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        strengths: [
          'Strong technical skills section',
          'Quantified achievements with metrics',
          'Relevant work experience',
          'Clear formatting and structure'
        ],
        improvements: [
          'Add more action verbs to bullet points',
          'Include relevant keywords from job description',
          'Expand on leadership experiences',
          'Add certifications or training'
        ],
        optimizedVersion: `OPTIMIZED RESUME

${resumeText}

[OPTIMIZED SECTIONS]
• Enhanced bullet points with stronger action verbs
• Added relevant keywords: ${jobDescription ? 'based on job requirements' : 'industry-standard terms'}
• Improved formatting for ATS compatibility
• Quantified achievements where possible
• Strengthened professional summary`
      };
      
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Resume optimization error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (analysis) {
      navigator.clipboard.writeText(analysis.optimizedVersion);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (analysis) {
      const blob = new Blob([analysis.optimizedVersion], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `optimized-resume-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <TextInput
        label="Current Resume Content"
        value={resumeText}
        onChange={setResumeText}
        placeholder="Paste your current resume content here..."
        rows={8}
      />
      
      <TextInput
        label="Job Description (Optional)"
        value={jobDescription}
        onChange={setJobDescription}
        placeholder="Paste the job description to optimize your resume for this specific role..."
        rows={4}
      />
      
      <ProcessButton
        onClick={handleOptimize}
        isProcessing={isAnalyzing}
        disabled={!resumeText.trim()}
        label="Optimize Resume"
        className="w-full"
      />
      
      {analysis && (
        <div className="space-y-6">
          {/* Score Card */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Resume Score</h3>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {analysis.score}/100
              </div>
            </div>
            <div className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>
          
          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <h4 className="font-medium text-green-800 dark:text-green-200">Strengths</h4>
              </div>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="flex items-center mb-3">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                <h4 className="font-medium text-orange-800 dark:text-orange-200">Improvements</h4>
              </div>
              <ul className="space-y-2">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-orange-700 dark:text-orange-300 flex items-start">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Optimized Resume */}
          <ResultDisplay
            result={analysis.optimizedVersion}
            title="Optimized Resume"
            onCopy={handleCopy}
            onDownload={handleDownload}
            isCopied={isCopied}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeOptimizerTool;