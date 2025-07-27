import React, { useState } from 'react';
import TextInput from './TextInput';
import ProcessButton from './ProcessButton';
import { Download, RefreshCw } from 'lucide-react';

const ImageGeneratorTool: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageStyle, setImageStyle] = useState('realistic');
  const [imageSize, setImageSize] = useState('1024x1024');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate image generation with a placeholder
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Using a placeholder service for demo
      const width = imageSize.split('x')[0];
      const height = imageSize.split('x')[1];
      const placeholderUrl = `https://picsum.photos/${width}/${height}?random=${Date.now()}`;
      setGeneratedImage(placeholderUrl);
    } catch (error) {
      console.error('Image generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="space-y-6">
      <TextInput
        label="Image Description"
        value={prompt}
        onChange={setPrompt}
        placeholder="Describe the image you want to generate (e.g., 'A serene mountain landscape at sunset with a lake reflection')"
        rows={3}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Style
          </label>
          <select
            value={imageStyle}
            onChange={(e) => setImageStyle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="realistic">Realistic</option>
            <option value="artistic">Artistic</option>
            <option value="cartoon">Cartoon</option>
            <option value="abstract">Abstract</option>
            <option value="vintage">Vintage</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Size
          </label>
          <select
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="512x512">512x512 (Square)</option>
            <option value="1024x1024">1024x1024 (Square)</option>
            <option value="1024x768">1024x768 (Landscape)</option>
            <option value="768x1024">768x1024 (Portrait)</option>
          </select>
        </div>
      </div>
      
      <ProcessButton
        onClick={handleGenerate}
        isProcessing={isGenerating}
        disabled={!prompt.trim()}
        label="Generate Image"
        className="w-full"
      />
      
      {generatedImage && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Image</span>
            <div className="flex space-x-2">
              <button
                onClick={handleRegenerate}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              Prompt: "{prompt}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGeneratorTool;