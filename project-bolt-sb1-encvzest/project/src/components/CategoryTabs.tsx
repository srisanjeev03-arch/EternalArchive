import React from 'react';
import { Brain, FileText, Mail } from 'lucide-react';

export type Category = 'ai' | 'pdf' | 'email';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  const tabs = [
    { id: 'ai' as Category, label: 'AI Tools', icon: Brain, count: 11 },
    { id: 'pdf' as Category, label: 'PDF Tools', icon: FileText, count: 13 },
    { id: 'email' as Category, label: 'Email Tools', icon: Mail, count: 8 },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeCategory === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onCategoryChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isActive
                ? 'bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              isActive
                ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;