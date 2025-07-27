import React, { useState } from 'react';
import TextInput from './TextInput';
import ProcessButton from './ProcessButton';
import ResultDisplay from './ResultDisplay';

interface AdvancedTextToolProps {
  inputLabel: string;
  inputPlaceholder: string;
  processLabel: string;
  onProcess: (input: string, options?: any) => Promise<string>;
  resultTitle?: string;
  showOptions?: boolean;
  options?: Array<{
    key: string;
    label: string;
    type: 'select' | 'checkbox' | 'number';
    options?: string[];
    defaultValue?: any;
  }>;
}

const AdvancedTextTool: React.FC<AdvancedTextToolProps> = ({
  inputLabel,
  inputPlaceholder,
  processLabel,
  onProcess,
  resultTitle = 'Result',
  showOptions = false,
  options = []
}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [toolOptions, setToolOptions] = useState<Record<string, any>>({});

  React.useEffect(() => {
    const defaultOptions: Record<string, any> = {};
    options.forEach(option => {
      defaultOptions[option.key] = option.defaultValue;
    });
    setToolOptions(defaultOptions);
  }, [options]);

  const handleProcess = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    try {
      const output = await onProcess(input, toolOptions);
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

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resultTitle.toLowerCase().replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateOption = (key: string, value: any) => {
    setToolOptions(prev => ({ ...prev, [key]: value }));
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
      
      {showOptions && options.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Options</h4>
          {options.map(option => (
            <div key={option.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {option.label}
              </label>
              {option.type === 'select' && (
                <select
                  value={toolOptions[option.key] || ''}
                  onChange={(e) => updateOption(option.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {option.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {option.type === 'checkbox' && (
                <input
                  type="checkbox"
                  checked={toolOptions[option.key] || false}
                  onChange={(e) => updateOption(option.key, e.target.checked)}
                  className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              )}
              {option.type === 'number' && (
                <input
                  type="number"
                  value={toolOptions[option.key] || ''}
                  onChange={(e) => updateOption(option.key, parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              )}
            </div>
          ))}
        </div>
      )}
      
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
          onDownload={handleDownload}
          isCopied={isCopied}
        />
      )}
    </div>
  );
};

export default AdvancedTextTool;