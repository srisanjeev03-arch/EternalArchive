import React from 'react';
import { Loader2, Play } from 'lucide-react';

interface ProcessButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  disabled?: boolean;
  label: string;
  className?: string;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({
  onClick,
  isProcessing,
  disabled = false,
  label,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      className={`flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed ${className}`}
    >
      {isProcessing ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Play className="w-5 h-5" />
      )}
      <span>{isProcessing ? 'Processing...' : label}</span>
    </button>
  );
};

export default ProcessButton;