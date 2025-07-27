import React, { useRef } from 'react';
import { Upload, File } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept: string;
  multiple?: boolean;
  onFilesSelected: (files: FileList) => void;
  selectedFiles?: File[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  multiple = false,
  onFilesSelected,
  selectedFiles = []
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-400 dark:hover:border-yellow-500 transition-colors"
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Click to upload {multiple ? 'files' : 'file'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {accept.split(',').join(', ')}
        </p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {Array.from(selectedFiles).map((file, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <File className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
              <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;