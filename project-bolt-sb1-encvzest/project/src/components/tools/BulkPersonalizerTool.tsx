import React, { useState } from 'react';
import TextInput from './TextInput';
import FileUpload from './FileUpload';
import ProcessButton from './ProcessButton';
import ResultDisplay from './ResultDisplay';
import { Users, Download, FileSpreadsheet } from 'lucide-react';

interface PersonalizationData {
  [key: string]: string;
}

const BulkPersonalizerTool: React.FC = () => {
  const [emailTemplate, setEmailTemplate] = useState('');
  const [csvData, setCsvData] = useState<PersonalizationData[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [personalizedEmails, setPersonalizedEmails] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFilesSelected = (files: FileList) => {
    setSelectedFiles(Array.from(files));
    
    // Parse CSV file
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const data: PersonalizationData[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim());
            const row: PersonalizationData = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || '';
            });
            data.push(row);
          }
        }
        setCsvData(data);
      };
      reader.readAsText(file);
    }
  };

  const handlePersonalize = async () => {
    if (!emailTemplate.trim() || csvData.length === 0) return;
    
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let result = '';
      csvData.forEach((row, index) => {
        let personalizedEmail = emailTemplate;
        
        // Replace placeholders with actual data
        Object.keys(row).forEach(key => {
          const placeholder = `[${key}]`;
          personalizedEmail = personalizedEmail.replace(new RegExp(placeholder, 'g'), row[key]);
        });
        
        result += `EMAIL ${index + 1}:\n`;
        result += `To: ${row.email || row.Email || 'N/A'}\n`;
        result += `Subject: ${personalizedEmail.split('\n')[0]}\n\n`;
        result += personalizedEmail + '\n\n';
        result += '---\n\n';
      });
      
      setPersonalizedEmails(result);
    } catch (error) {
      setPersonalizedEmails('An error occurred while personalizing emails. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(personalizedEmails);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([personalizedEmails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personalized-emails-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sampleCSV = `name,email,company,position
John Doe,john@example.com,TechCorp,Developer
Jane Smith,jane@example.com,StartupInc,Manager
Bob Johnson,bob@example.com,BigCorp,Director`;

  const downloadSampleCSV = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">How it works</h3>
            <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>1. Create your email template with placeholders like [name], [company], [position]</li>
              <li>2. Upload a CSV file with your contact data</li>
              <li>3. Generate personalized emails for each contact</li>
            </ol>
            <button
              onClick={downloadSampleCSV}
              className="flex items-center space-x-2 mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Sample CSV</span>
            </button>
          </div>
        </div>
      </div>
      
      <TextInput
        label="Email Template"
        value={emailTemplate}
        onChange={setEmailTemplate}
        placeholder="Subject: Hello [name]!

Hi [name],

I hope this email finds you well. I noticed you work at [company] as a [position], and I wanted to reach out about...

Best regards,
Your Name"
        rows={8}
      />
      
      <FileUpload
        label="Upload CSV File"
        accept=".csv"
        multiple={false}
        onFilesSelected={handleFilesSelected}
        selectedFiles={selectedFiles}
      />
      
      {csvData.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            CSV Data Preview ({csvData.length} contacts)
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  {Object.keys(csvData[0] || {}).map(header => (
                    <th key={header} className="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 3).map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-600">
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="py-2 px-3 text-gray-600 dark:text-gray-400">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {csvData.length > 3 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                ... and {csvData.length - 3} more contacts
              </p>
            )}
          </div>
        </div>
      )}
      
      <ProcessButton
        onClick={handlePersonalize}
        isProcessing={isProcessing}
        disabled={!emailTemplate.trim() || csvData.length === 0}
        label="Generate Personalized Emails"
        className="w-full"
      />
      
      {personalizedEmails && (
        <ResultDisplay
          result={personalizedEmails}
          title="Personalized Emails"
          onCopy={handleCopy}
          onDownload={handleDownload}
          isCopied={isCopied}
        />
      )}
    </div>
  );
};

export default BulkPersonalizerTool;