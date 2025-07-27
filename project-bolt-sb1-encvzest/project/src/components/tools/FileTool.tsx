import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ProcessButton from './ProcessButton';

interface FileToolProps {
  title: string;
  description: string;
  acceptedFiles: string;
  multiple?: boolean;
  onProcess: (files: FileList) => Promise<void>;
}

const FileTool: React.FC<FileToolProps> = ({
  title,
  description,
  acceptedFiles,
  multiple = false,
  onProcess
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (files: FileList) => {
    setSelectedFiles(Array.from(files));
  };

  const handleProcess = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsProcessing(true);
    try {
      const fileList = new DataTransfer();
      selectedFiles.forEach(file => fileList.items.add(file));
      await onProcess(fileList.files);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">{title}</h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">{description}</p>
      </div>
      
      <FileUpload
        label="Select Files"
        accept={acceptedFiles}
        multiple={multiple}
        onFilesSelected={handleFilesSelected}
        selectedFiles={selectedFiles}
      />
      
      <ProcessButton
        onClick={handleProcess}
        isProcessing={isProcessing}
        disabled={selectedFiles.length === 0}
        label="Process Files"
        className="w-full"
      />
    </div>
  );
};

export default FileTool;