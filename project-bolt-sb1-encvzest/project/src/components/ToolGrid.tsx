import React from 'react';
import ToolCard from './ToolCard';
import { Tool } from '../data/tools';

interface ToolGridProps {
  tools: Tool[];
  onToolSelect: (tool: Tool) => void;
  selectedTool?: Tool;
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools, onToolSelect, selectedTool }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          category={tool.category}
          onClick={() => onToolSelect(tool)}
          isActive={selectedTool?.id === tool.id}
        />
      ))}
    </div>
  );
};

export default ToolGrid;