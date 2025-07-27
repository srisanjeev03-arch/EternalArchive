import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'ai' | 'pdf' | 'email';
  onClick: () => void;
  isActive?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  category,
  onClick,
  isActive = false
}) => {
  const getCategoryColor = () => {
    switch (category) {
      case 'ai':
        return 'from-blue-500 to-purple-600';
      case 'pdf':
        return 'from-red-500 to-pink-600';
      case 'email':
        return 'from-green-500 to-teal-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`group relative p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg text-left w-full ${
        isActive
          ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-500 shadow-lg'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor()} shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-xl pointer-events-none" />
      )}
    </button>
  );
};

export default ToolCard;