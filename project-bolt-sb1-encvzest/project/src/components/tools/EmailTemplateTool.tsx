import React, { useState } from 'react';
import TextInput from './TextInput';
import ProcessButton from './ProcessButton';
import ResultDisplay from './ResultDisplay';
import { Plus, Trash2, Edit3, Save } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
}

const EmailTemplateTool: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Meeting Request',
      subject: 'Meeting Request - [Topic]',
      body: 'Hi [Name],\n\nI hope this email finds you well. I would like to schedule a meeting to discuss [topic]. Would you be available for a [duration] meeting sometime next week?\n\nPlease let me know your availability.\n\nBest regards,\n[Your Name]',
      category: 'Business'
    },
    {
      id: '2',
      name: 'Follow-up',
      subject: 'Following up on [Topic]',
      body: 'Hi [Name],\n\nI wanted to follow up on our previous conversation about [topic]. Have you had a chance to review the information I shared?\n\nI\'m happy to answer any questions you might have.\n\nLooking forward to hearing from you.\n\nBest regards,\n[Your Name]',
      category: 'Business'
    }
  ]);
  
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    body: '',
    category: 'Business'
  });
  const [showNewForm, setShowNewForm] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsEditing(false);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setNewTemplate({
      name: template.name,
      subject: template.subject,
      body: template.body,
      category: template.category
    });
    setSelectedTemplate(template);
    setIsEditing(true);
    setShowNewForm(true);
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.subject.trim() || !newTemplate.body.trim()) return;
    
    if (isEditing && selectedTemplate) {
      setTemplates(prev => prev.map(t => 
        t.id === selectedTemplate.id 
          ? { ...t, ...newTemplate }
          : t
      ));
      setSelectedTemplate({ ...selectedTemplate, ...newTemplate });
    } else {
      const template: EmailTemplate = {
        id: Date.now().toString(),
        ...newTemplate
      };
      setTemplates(prev => [...prev, template]);
    }
    
    setNewTemplate({ name: '', subject: '', body: '', category: 'Business' });
    setShowNewForm(false);
    setIsEditing(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
  };

  const handleCopy = () => {
    if (selectedTemplate) {
      const emailContent = `Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.body}`;
      navigator.clipboard.writeText(emailContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (selectedTemplate) {
      const emailContent = `Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.body}`;
      const blob = new Blob([emailContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTemplate.name.toLowerCase().replace(/\s+/g, '_')}_template.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Templates</h3>
        <button
          onClick={() => {
            setShowNewForm(true);
            setIsEditing(false);
            setNewTemplate({ name: '', subject: '', body: '', category: 'Business' });
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-medium rounded-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>New Template</span>
        </button>
      </div>
      
      {/* Template List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedTemplate?.id === template.id
                ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.subject}</p>
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded mt-2">
                  {template.category}
                </span>
              </div>
              <div className="flex space-x-1 ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTemplate(template);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTemplate(template.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* New/Edit Template Form */}
      {showNewForm && (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            {isEditing ? 'Edit Template' : 'Create New Template'}
          </h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Meeting Request"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="Business">Business</option>
                  <option value="Personal">Personal</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject Line
              </label>
              <input
                type="text"
                value={newTemplate.subject}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="e.g., Meeting Request - [Topic]"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <TextInput
              label="Email Body"
              value={newTemplate.body}
              onChange={(value) => setNewTemplate(prev => ({ ...prev, body: value }))}
              placeholder="Write your email template here. Use [Name], [Topic], etc. for placeholders..."
              rows={6}
            />
            
            <div className="flex space-x-3">
              <button
                onClick={handleSaveTemplate}
                disabled={!newTemplate.name.trim() || !newTemplate.subject.trim() || !newTemplate.body.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Update' : 'Save'} Template</span>
              </button>
              
              <button
                onClick={() => {
                  setShowNewForm(false);
                  setIsEditing(false);
                  setNewTemplate({ name: '', subject: '', body: '', category: 'Business' });
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Selected Template Display */}
      {selectedTemplate && !showNewForm && (
        <ResultDisplay
          result={`Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.body}`}
          title={`Template: ${selectedTemplate.name}`}
          onCopy={handleCopy}
          onDownload={handleDownload}
          isCopied={isCopied}
        />
      )}
    </div>
  );
};

export default EmailTemplateTool;