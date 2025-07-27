import React from 'react';
import { Copy, Download, CheckCircle } from 'lucide-react';

interface ResultDisplayProps {
  result: string;
  title?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  isCopied?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  title = 'Result',
  onCopy,
  onDownload,
  isCopied = false
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
        <div className="flex space-x-2">
          {onCopy && (
            <button
              onClick={onCopy}
              className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              title="Copy to clipboard"
            >
              {isCopied ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
          {onDownload && (
            <button
              onClick={onDownload}
              className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800">
        <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-mono">
          {result}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;