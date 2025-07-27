import React, { useState } from 'react';
import TextInput from './TextInput';
import ProcessButton from './ProcessButton';
import ResultDisplay from './ResultDisplay';

interface BasicToolProps {
  inputLabel: string;
  inputPlaceholder: string;
  processLabel: string;
  onProcess: (input: string) => Promise<string>;
  resultTitle?: string;
}

const BasicTool: React.FC<BasicToolProps> = ({
  inputLabel,
  inputPlaceholder,
  processLabel,
  onProcess,
  resultTitle = 'Result'
}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleProcess = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    try {
      const output = await onProcess(input);
      setResult(output);
    } catch (error) {
      setResult('An error occurred while processing your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <TextInput
        label={inputLabel}
        value={input}
        onChange={setInput}
        placeholder={inputPlaceholder}
        rows={6}
      />
      
      <ProcessButton
        onClick={handleProcess}
        isProcessing={isProcessing}
        disabled={!input.trim()}
        label={processLabel}
        className="w-full"
      />
      
      {result && (
        <ResultDisplay
          result={result}
          title={resultTitle}
          onCopy={handleCopy}
          isCopied={isCopied}
        />
      )}
    </div>
  );
};

export default BasicTool;